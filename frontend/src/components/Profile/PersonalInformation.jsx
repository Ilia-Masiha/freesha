import Title from "@/common/Title";
import FormInput from "../FormInput";
import { PiUserDuotone } from "react-icons/pi";
import DateInput from "../DateInput";
import TextArea from "../TextArea";

const PersonalInformation = () => {
  return (
    <article className="mt-16">
      <Title
        text="اطلاعات شخصی"
        icon={<PiUserDuotone className="text-2xl" />}
      />
      <form className="grid grid-cols-9 gap-x-10 gap-y-7 mt-10 items-start">
        <FormInput className="col-span-3" label="نام" name="name" />
        <FormInput className="col-span-3" label="عنوان شغلی" name="jobTitle" />
        <DateInput className="col-span-3" label="تاریخ تولد" name="birthDate" />
        <TextArea className="col-span-6" label="آدرس" name="آدرس" />
        <div className="col-span-9">
          <button className="px-4 py-2 rounded-lg bg-primary-500 text-white cursor-pointer">
            به روزرسانی
          </button>
        </div>
      </form>
    </article>
  );
};

export default PersonalInformation;
