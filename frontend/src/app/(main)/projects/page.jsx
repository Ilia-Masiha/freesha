"use client";

import SearchInput from "@/components/projects/SearchInput";
import Select from "@/components/Select";
import { categoryOptions } from "@/constants/categories";
import { useState } from "react";

const sortByCreatedAtOptions = [
  { label: "هیچکدام", value: null },
  { label: "جدید به قدیم", value: "latest" },
  { label: "قدیم به جدید", value: "earliest" },
];

const ProjectsPage = () => {
  const [category, setCategory] = useState({
    label: "همه آگهی‌ها",
    value: null,
  });
  const [sort, setSort] = useState({ label: "هیچکدام", value: "" });
  return (
    <section className="mx-40 mt-16">
      <h1 className="font-bold text-2xl">همه پروژه‌ها</h1>

      <article className="w-[80%] mx-auto mt-10">
        <SearchInput />
        <div className="w-full grid grid-cols-12 gap-4 mt-5">
          <div className="col-span-6">
            <Select
              label="دسته بندی"
              options={[
                { label: "همه آگهی‌ها", value: null },
                ...categoryOptions,
              ]}
              placeholder="دسته بندی"
              onChange={setCategory}
              value={category}
            />
          </div>
          <div className="col-span-6">
            <Select
              label="مرتب‌سازی"
              options={sortByCreatedAtOptions}
              placeholder="مرتب سازی"
              onChange={setSort}
              value={sort}
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProjectsPage;
