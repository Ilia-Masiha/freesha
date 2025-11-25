import Title from "@/common/Title";
import LanguagesSelector from "@/components/Profile/LanguagesSelector";
import ResumeUploader from "@/components/Profile/ResumeUploader";
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
      <article className="mt-16 flex flex-col gap-y-10">
        <SkillsSelector />
        <LanguagesSelector />
        <ResumeUploader />
      </article>
    </section>
  );
};

export default Resume;
