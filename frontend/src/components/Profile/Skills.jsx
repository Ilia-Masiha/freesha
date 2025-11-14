"use client";
import Title from "@/common/Title";
import { useState } from "react";
import Select from "react-select";
import { PiCodeDuotone } from "react-icons/pi";

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
        <Select
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
