"use client";
import { useState, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { skillsData } from "@/constants/skills";
import Select from "../Select";

const SkillsSelector = ({ control, name = "skills", initialSkills = [] }) => {
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);

  const skillOptions = useMemo(() => {
    return skillsData.map((skill) => ({
      value: skill,
      label: skill,
    }));
  }, []);

  const selectedValues = useMemo(() => {
    return selectedSkills.map((skill) => ({
      value: skill,
      label: skill,
    }));
  }, [selectedSkills]);

  const handleChange = (selectedOptions) => {
    const selectedSkillsArray = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    setSelectedSkills(selectedSkillsArray);
    return selectedSkillsArray;
  };

  return (
    <div className="w-full">
      <div className="w-[50%] flex flex-col items-start justify-center">
        <label
          htmlFor="skills"
          className="text-txt text-sm font-semibold mb-1.5"
        >
          مهارت ها
        </label>
        <Controller
          name={name}
          control={control}
          defaultValue={initialSkills}
          render={({ field }) => (
            <Select
              {...field}
              name={name}
              isMulti={true}
              options={skillOptions}
              value={selectedValues}
              onChange={(selectedOptions) => {
                const newValue = handleChange(selectedOptions);
                field.onChange(newValue);
              }}
              placeholder="لیست مهارت ها"
            />
          )}
        />
      </div>
    </div>
  );
};

export default SkillsSelector;
