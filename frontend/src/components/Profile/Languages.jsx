"use client";
import Title from "@/common/Title";
import { useState } from "react";
import { PiTranslateDuotone } from "react-icons/pi";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});

const options = [
  { value: "اسپانیایی", label: "اسپانیایی" },
  { value: "ترکی", label: "ترکی" },
  { value: "انگلیسی", label: "انگلیسی" },
];

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  return (
    <article className="mt-16">
      <Title
        text="زبان های مسلط"
        icon={<PiTranslateDuotone className="text-2xl" />}
      />
      <form className="mt-10">
        <ReactSelect
          isMulti
          defaultValue={languages}
          onChange={setLanguages}
          options={options}
        />
      </form>
    </article>
  );
};

export default Languages;
