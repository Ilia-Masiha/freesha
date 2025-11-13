"use client";
import Title from "@/common/Title";
import TextArea from "../TextArea";
import Btn from "@/common/Btn";

const Biography = () => {
  return (
    <article className="mt-16">
      <Title text="درباره من" icon={<PiInfoDuotone className="text-2xl" />} />
      <form className="mt-10">
        <TextArea label="بیوگرافی" name="bio" />
        <Btn text="به روزرسانی" type="submit" className="mt-7" />
      </form>
    </article>
  );
};

export default Biography;
