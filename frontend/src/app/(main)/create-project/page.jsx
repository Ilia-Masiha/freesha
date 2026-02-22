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
import TagsInputComponent from "@/components/CreateProject/TagsInputComponent";
import Btn from "@/common/Btn";

const options = [
  { label: "سایر حوزه‌های تخصصی", value: 0 },
  { label: "طراحی وب سایت", value: 1 },
  { label: "پایگاه داده", value: 2 },
  { label: "دواپس و رایانش ابری", value: 3 },
  { label: "طراحی اپلیکیشن موبایل", value: 4 },
  { label: "طراحی رابط کاربری و تجربه کاربری", value: 5 },
  { label: "طراحی گرافیک", value: 6 },
  { label: "ویدئو و انیمیشن", value: 7 },
  { label: "نویسندگی و تولید محتوا", value: 8 },
  { label: "بازاریابی دیجیتال", value: 9 },
  { label: "تجارت الکترونیک", value: 10 },
  { label: "توسعه بازی", value: 11 },
  { label: "امنیت سایبری", value: 12 },
  { label: "هوش مصنوعی و یادگیری ماشین", value: 13 },
  { label: "کسب و کار و مدیریت رسانه", value: 14 },
  { label: "آموزش و مشاوره", value: 15 },
  { label: "خدمات تخصصی", value: 16 },
  { label: "آفیس و بهره‌وری", value: 17 },
];

const schema = yup.object({
  title: yup
    .string()
    .required("عنوان پروژه الزامی است")
    .min(2, "عنوان باید حداقل 2 کاراکتر باشد")
    .max(100, "عنوان نمی‌تواند بیشتر از 100 کاراکتر باشد"),
});

const CreateProject = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  return (
    <section className="mx-40 mt-16">
      <Title
        text="ایجاد پروژه"
        icon={<PiFilePlusDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-10">
        <form className="flex flex-col gap-y-6">
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
            />
            <FormInput
              name="budgetHigh"
              errors={errors}
              register={register}
              label="حداکثر بودجه (تومان)"
              className="w-[50%]"
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
                  options={options}
                  value={
                    options.find((option) => option.value === field.value) ||
                    null
                  }
                />
              )}
            />
          </div>
          <div className="w-[60%]">
            <SkillsSelector control={control} label="مهارت های مورد نیاز" />
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
                  onChange={field.onChange}
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
          />
        </form>
      </article>
    </section>
  );
};

export default CreateProject;
