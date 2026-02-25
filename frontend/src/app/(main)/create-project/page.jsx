"use client";
import Title from "@/common/Title";
import FormInput from "@/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { PiFilePlusDuotone } from "react-icons/pi";
import Select from "@/components/Select";
import SkillsSelector from "@/components/Profile/SkillsSelector";
import DateInput from "@/components/DateInput";
import "react-tagsinput/react-tagsinput.css";
import TextArea from "@/components/TextArea";
import TagsInputComponent from "@/components/projects/TagsInputComponent";
import Btn from "@/common/Btn";
import { useCreateProject } from "@/hooks/projectHooks";
import { toEnglishDigits } from "@/utils/toEnglishDigits";
import { categoryOptions } from "@/constants/categories";


const defaultValues = {
  title: "",
  budgetLow: "",
  budgetHigh: "",
  categoryId: "",
  requiredSkills: [],
  deadline: null,
  tags: [],
  description: "",
};

const schema = yup.object({
  title: yup
    .string()
    .required("عنوان پروژه الزامی است")
    .min(2, "عنوان باید حداقل 2 کاراکتر باشد")
    .max(100, "عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد"),
  budgetLow: yup
    .number()
    .typeError("حداقل بودجه باید عدد باشد")
    .required("حداقل بودجه الزامی است")
    .positive("حداقل بودجه باید عدد مثبت باشد")
    .min(500000, "حداقل بودجه باید حداقل ۵۰۰,۰۰۰ تومان باشد"),
  budgetHigh: yup
    .number()
    .typeError("حداکثر بودجه باید عدد باشد")
    .required("حداکثر بودجه الزامی است")
    .positive("حداکثر بودجه باید عدد مثبت باشد")
    .min(500000, "حداکثر بودجه باید حداقل ۵۰۰,۰۰۰ تومان باشد")
    .test(
      "is-greater",
      "حداکثر بودجه باید بزرگتر از حداقل بودجه باشد",
      function (value) {
        const { budgetLow } = this.parent;
        return budgetLow ? value > budgetLow : true;
      },
    ),
  categoryId: yup
    .number()
    .typeError("دسته‌بندی را انتخاب کنید")
    .required("دسته‌بندی پروژه الزامی است")
    .positive("لطفاً یک دسته‌بندی معتبر انتخاب کنید"),
  requiredSkills: yup
    .array()
    .of(yup.string())
    .default([])
    .min(1, "حداقل یک مهارت را انتخاب کنید")
    .required("مهارت‌های مورد نیاز الزامی است"),
  deadline: yup
    .string()
    .required("مهلت پروژه الزامی است")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "فرمت تاریخ باید YYYY-MM-DD باشد")
    .test("is-future", "مهلت پروژه نمی‌تواند در گذشته باشد", function (value) {
      const formattedValue = value.split("-").join("/");
      const today = new Date().toLocaleDateString("fa-IR");
      return (
        new Date(formattedValue).getTime() >
        new Date(toEnglishDigits(today)).getTime()
      );
    }),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, "حداقل یک تگ وارد کنید")
    .max(10, "حداکثر ۱۰ تگ می‌توانید وارد کنید")
    .required("تگ‌ها الزامی هستند"),
  description: yup
    .string()
    .required("توضیحات پروژه الزامی است")
    .min(50, "توضیحات باید حداقل ۵۰ کاراکتر باشد")
    .max(5000, "توضیحات نمی‌تواند بیشتر از ۵۰۰۰ کاراکتر باشد"),
});

const CreateProject = () => {
  const { mutateAsync } = useCreateProject();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const res = await mutateAsync(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mx-40 mt-16">
      <Title
        text="ایجاد پروژه"
        icon={<PiFilePlusDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-10">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-y-6"
        >
          <FormInput
            name="title"
            errors={errors}
            register={register}
            label="عنوان پروژه"
            className="w-[60%]"
          />
          <div className="flex w-[80%] gap-x-4">
            <FormInput
              name="budgetLow"
              errors={errors}
              register={register}
              label="حداقل بودجه (تومان)"
              className="w-[50%]"
              type="number"
            />
            <FormInput
              name="budgetHigh"
              errors={errors}
              register={register}
              label="حداکثر بودجه (تومان)"
              className="w-[50%]"
              type="number"
            />
          </div>
          <div className="w-[60%]">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  name="categoryId"
                  errors={errors}
                  label="دسته بندی"
                  placeholder="دسته بندی ..."
                  onBlur={field.onBlur}
                  onChange={(selected) => {
                    field.onChange(selected ? selected.value : "");
                  }}
                  options={categoryOptions}
                  value={
                    categoryOptions.find((option) => option.value === field.value) ||
                    null
                  }
                />
              )}
            />
          </div>
          <div className="w-[60%]">
            <SkillsSelector
              control={control}
              label="مهارت های مورد نیاز"
              errors={errors}
              name="requiredSkills"
            />
          </div>
          <div className="w-[60%]">
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DateInput
                  {...field}
                  name="deadline"
                  label="مهلت"
                  className="col-span-6"
                  errors={errors}
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    field.onBlur();
                  }}
                />
              )}
            />
          </div>
          <div className="w-[60%]">
            <TagsInputComponent
              control={control}
              errors={errors}
              label="تگ ها"
              name="tags"
            />
          </div>
          <TextArea
            name="description"
            label="توضیحات"
            errors={errors}
            register={register}
            className="w-[75%]"
          />
          <Btn
            text="ایجاد پروژه"
            color="primary"
            type="submit"
            className="w-[30%]"
            disabled={!isValid || !isDirty || isSubmitting}
          />
        </form>
      </article>
    </section>
  );
};

export default CreateProject;
