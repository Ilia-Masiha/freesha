"use client";
import Btn from "@/common/Btn";
import Title from "@/common/Title";
import LanguagesSelector from "@/components/Profile/LanguagesSelector";
import ResumeUploader from "@/components/Profile/ResumeUploader";
import SkillsSelector from "@/components/Profile/SkillsSelector";
import { useGetBasicUserData, useUpdateUser } from "@/hooks/userHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PiFilesDuotone } from "react-icons/pi";
import * as yup from "yup";

const schema = yup.object({
  skills: yup.array().of(yup.string()).default([]).optional(),
  languageNames: yup.array().of(yup.string()).default([]).optional(),
});

const Resume = () => {
  const { mutateAsync } = useUpdateUser();
  const { basicUser, basicUserLoading } = useGetBasicUserData();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      skills: [],
      languageNames: [],
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const updateHandler = async (data) => {
    try {
      const res = await mutateAsync({ id: basicUser.data.id, data });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (basicUserLoading) return <p>loading...</p>;
  return (
    <section>
      <Title
        text="رزومه کاری"
        icon={<PiFilesDuotone className="text-secondary text-3xl" />}
        color="primary"
      />
      <article className="mt-16">
        <form
          onSubmit={handleSubmit(updateHandler)}
          className="flex flex-col gap-y-10"
        >
          <div className="w-[50%]">
            <SkillsSelector control={control} />
          </div>
          <LanguagesSelector control={control} />
          <ResumeUploader />
          <div>
            <Btn text="به روزرسانی" type="submit" />
          </div>
        </form>
      </article>
    </section>
  );
};

export default Resume;
