import Btn from "@/common/Btn";
import Title from "@/common/Title";
import DateInput from "@/components/DateInput";
import FormInput from "@/components/FormInput";
import TextArea from "@/components/TextArea";
import { PiUserDuotone } from "react-icons/pi";

const PersonalInformation = () => {
  return (
    <section>
      <Title
        text="اطلاعات شخصی"
        icon={<PiUserDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
    <article className="mt-16">
      <form className="grid grid-cols-9 gap-x-5 gap-y-7 mt-10 items-start">
        <FormInput className="col-span-3" label="نام" name="name" />
        <FormInput className="col-span-3" label="عنوان شغلی" name="jobTitle" />
        <DateInput className="col-span-3" label="تاریخ تولد" name="birthDate" />
        <TextArea className="col-span-6" label="آدرس" name="address" />
        <div className="col-span-9">
          <Btn text="به روزرسانی" type="submit" />
        </div>
      </form>
    </article>
    </section>
  );
};

export default PersonalInformation;
