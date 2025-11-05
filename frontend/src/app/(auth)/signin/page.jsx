"use client";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "@/services/authServices";

const schema = yup
  .object({
    email: yup
      .string()
      .required("ایمیل الزامی است")
      .email("لطفا یک ایمیل معتبر وارد کنید"),
    password: yup
      .string()
      .required("رمز عبور الزامی است")
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  })
  .required();

const Signin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    try {
      const { message } = await login(data);
      toast.success(message);
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section className="flex justify-center pt-4">
      <article className="w-[35%] my-5 rounded-lg bg-bg px-8 py-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold">فریشا</h1>
        <h3 className="w-full mt-8 text-start text-xl font-semibold">ورود</h3>
        <form onSubmit={handleSubmit(loginHandler)} className="w-full mt-5">
          <FormInput
            register={register}
            errors={errors}
            label="ایمیل"
            name="email"
          />
          <FormInput
            register={register}
            errors={errors}
            label="رمز عبور"
            name="password"
            type="password"
          />
          <button
            disabled={!isValid || !isDirty || isSubmitting}
            className="w-full auth rounded-lg py-2 text-white mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-65"
          >
            ورود
          </button>
        </form>
        <Link href="/signup" className="text-sm text-secondary-700 mt-4">
          هنوز ثبت نام نکرده اید؟
          <span className="text-primary-500"> ثبت نام</span>
        </Link>
      </article>
    </section>
  );
};

export default Signin;
