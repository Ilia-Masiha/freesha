"use client";
import Btn from "@/common/Btn";
import Title from "@/common/Title";
import DateInput from "@/components/DateInput";
import FormInput from "@/components/FormInput";
import TextArea from "@/components/TextArea";
import { PiUserDuotone } from "react-icons/pi";
import { useState } from "react";
import Select from "@/components/Select";

const genderOptions = [
  { value: "1", label: "نامشخص" },
  { value: "3", label: "خانم" },
  { value: "2", label: "آقا" },
];

const PersonalInformation = () => {
  const [gender, setGender] = useState({ value: "1", label: "نامشخص" });

  return (
    <section>
      <Title
        text="اطلاعات شخصی"
        icon={<PiUserDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-16">
        <form className="grid grid-cols-9 gap-5 mt-10 items-start">
          <FormInput className="col-span-3" label="نام" name="name" />
          <FormInput
            className="col-span-3"
            label="عنوان شغلی"
            name="jobTitle"
          />
          <DateInput
            className="col-span-3"
            label="تاریخ تولد"
            name="birthDate"
          />
          <div className="col-span-3">
            <Select
              name="gender"
              label="جنسیت"
              defaultValue={gender}
              onChange={setGender}
              options={genderOptions}
              placeholder="جنسیت..."
            />
          </div>
          <TextArea className="col-span-7" label="آدرس" name="address" />
          <div className="col-span-9">
            <Btn text="به روزرسانی" type="submit" />
          </div>
        </form>
      </article>
    </section>
  );
};

export default PersonalInformation;
