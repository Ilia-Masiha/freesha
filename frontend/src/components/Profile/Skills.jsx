"use client";
import Title from "@/common/Title";
import { useState } from "react";
import { PiCodeDuotone } from "react-icons/pi";
import dynamic from "next/dynamic";
const ReactSelect = dynamic(() => import("react-select"), {
  ssr: false,
});


const options = [
  { value: "react.js", label: "react.js" },
  { value: "Next.js", label: "Next.js" },
  { value: "Node.js", label: "Node.js" },
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  return (
    <article className="mt-16">
      <Title text="مهارت ها" icon={<PiCodeDuotone className="text-2xl" />} />
      <form className="mt-10">
        <ReactSelect
          isMulti
          defaultValue={skills}
          onChange={setSkills}
          options={options}
        />
      </form>
    </article>
  );
};

export default Skills;
