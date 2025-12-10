"use client";
import Btn from "@/common/Btn";
import Title from "@/common/Title";
import DateInput from "@/components/DateInput";
import FormInput from "@/components/FormInput";
import ImageUploader from "@/components/Profile/ImageUploader";
import TextArea from "@/components/TextArea";
import { PiCodeDuotone } from "react-icons/pi";
import SkillsSelector from "@/components/Profile/SkillsSelector";

const AddPortfolio = () => {
  return (
    <section>
      <Title
        text="افزودن نمونه کار"
        icon={<PiCodeDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-16">
        <form className="grid grid-cols-9 gap-5 items-start">
          <FormInput className="col-span-6" label="عنوان" name="title" />
          <FormInput
            className="col-span-6"
            label="لینک پروژه"
            name="projectUrl"
          />
          <div className="col-span-6">
            <SkillsSelector />
          </div>
          <TextArea label="توضیحات" name="description" className="col-span-9" />
          <div className="col-span-9 my-5">
            <ImageUploader />
          </div>

          <div className="col-span-9">
            <Btn text="به روزرسانی" type="submit" />
          </div>
        </form>
      </article>
    </section>
  );
};

export default AddPortfolio;
