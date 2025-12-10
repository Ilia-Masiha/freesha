"use client";
import Btn from "@/common/Btn";
import Title from "@/common/Title";
import DateInput from "@/components/DateInput";
import FormInput from "@/components/FormInput";
import ImageUploader from "@/components/Profile/ImageUploader";
import TextArea from "@/components/TextArea";
import { PiNotepadDuotone } from "react-icons/pi";

const AddEducation = () => {
  return (
    <section>
      <Title
        text="افزودن مدرک تحصیلی"
        icon={<PiNotepadDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-16">
        <form className="grid grid-cols-9 gap-5 items-start">
          <FormInput
            className="col-span-6"
            label="عنوان"
            name="title"
          />
          <DateInput
            className="col-span-4"
            label="تاریخ شروع"
            name="startDate"
          />
          <DateInput
            className="col-span-4"
            label="تاریخ پایان"
            name="endDate"
          />
          <div className="col-span-9 my-5">
          <ImageUploader/>
          </div>
          <div className="col-span-9">
            <Btn text="به روزرسانی" type="submit" />
          </div>
        </form>
      </article>
    </section>
  );
};

export default AddEducation;
