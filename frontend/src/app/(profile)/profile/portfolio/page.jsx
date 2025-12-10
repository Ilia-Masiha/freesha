"use client";
import Empty from "@/common/Empty";
import Title from "@/common/Title";
import { PiCodeDuotone } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const Portfolio = () => {
  return (
    <section className="h-full relative">
      <Title
        text="نمونه کارها"
        icon={<PiCodeDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-16">
        <Empty text="هیچ نمونه کاری وجود ندارد" />
      </article>
      <Link href="/profile/portfolio/add">
        <button className="cursor-pointer absolute bottom-0 left-0  p-4 rounded-full bg-secondary text-txt-secondary text-3xl transition-all duration-300 hover:rotate-180">
          <FaPlus />
        </button>
      </Link>
    </section>
  );
};

export default Portfolio;
