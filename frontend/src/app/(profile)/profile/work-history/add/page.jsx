"use client";
import Btn from "@/common/Btn";
import Title from "@/common/Title";
import DateInput from "@/components/DateInput";
import FormInput from "@/components/FormInput";
import TextArea from "@/components/TextArea";
import { PiClockUserDuotone } from "react-icons/pi";

const AddWorkHistory = () => {
  return (
    <section>
      <Title
        text="افزودن سابقه کاری"
        icon={<PiClockUserDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-16">
        <form className="grid grid-cols-9 gap-5 items-start">
          <FormInput
            className="col-span-6"
            label="عنوان شغلی"
            name="jobTitle"
          />
          <FormInput className="col-span-6" label="شرکت" name="company" />
          <DateInput
            className="col-span-4"
            label="تاریخ شروع"
            name="startDate"
          />
          <DateInput
            className="col-span-4"
            label="تاریخ پایان"
            name="startDate"
          />
          <TextArea className="col-span-8" label="توضیحات" name="description" />
          <div className="col-span-9">
            <Btn text="به روزرسانی" type="submit" />
          </div>
        </form>
      </article>
    </section>
  );
};

export default AddWorkHistory;
