import Title from "@/common/Title";
import SkillsSelector from "@/components/Profile/SkillsSelector";
import { PiFilesDuotone } from "react-icons/pi";

const Resume = () => {
  return (
    <section>
      <Title
        text="رزومه کاری"
        icon={<PiFilesDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-16">
        <SkillsSelector />
      </article>
    </section>
  );
};

export default Resume;
