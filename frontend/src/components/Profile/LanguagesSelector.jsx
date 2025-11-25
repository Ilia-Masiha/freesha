"use client";
import { useState, useMemo } from "react";
import { languagesData } from "@/constants/languages";
import Select from "../Select";

const LanguagesSelector = ({ initialLanguages = [] }) => {
  const [selectedLanguages, setSelectedLanguages] = useState(initialLanguages);

  const languageOptions = useMemo(() => {
    return languagesData.map((language) => ({
      value: language,
      label: language,
    }));
  }, []);

  const selectedValues = useMemo(() => {
    return selectedLanguages.map((language) => ({
      value: language,
      label: language,
    }));
  }, [selectedLanguages]);

  const handleChange = (selectedOptions) => {
    const selectedLanguagesArray = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    setSelectedLanguages(selectedLanguagesArray);
  };

  return (
    <div className="w-full">
      <div className="w-[50%] flex flex-col items-start justify-center">
        <label
          htmlFor="languages"
          className="text-txt text-sm font-semibold mb-1.5"
        >
            زبان های مسلط
        </label>
        <Select
          name="languages"
          isMulti={true}
          options={languageOptions}
          value={selectedValues}
          onChange={handleChange}
          placeholder="لیست زبان ها"
        />
      </div>
    </div>
  );
};

export default LanguagesSelector;
