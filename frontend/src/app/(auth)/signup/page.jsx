"use client";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { signup } from "@/services/authServices";
import toast from "react-hot-toast";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { FaArrowLeftLong } from "react-icons/fa6";
import { verifyEmail } from "@/services/authServices";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    name: yup
      .string()
      .required("نام کاربری الزامی است")
      .min(6, "نام کاربری باید حداقل ۶ کاراکتر باشد"),
    email: yup
      .string()
      .required("ایمیل الزامی است")
      .email("لطفا یک ایمیل معتبر وارد کنید"),
    password: yup
      .string()
      .required("رمز عبور الزامی است")
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    repeatPassword: yup
      .string()
      .required("تکرار رمز عبور الزامی است")
      .oneOf(
        [yup.ref("password"), null],
        "رمزهای عبور باید مطابقت داشته باشند"
      ),
  })
  .required();

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const signupHandler = async (data) => {
    try {
      const { message } = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setStep(2);
      setEmail(data.email);
      toast.success(message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const emailVerificationHandler = async () => {
    if (otp) {
      try {
        const { message } = await verifyEmail({ email, otp });
        toast.success(message);
        router.push("/");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    } else {
      toast("لطفا کد تایید را وارد کنید", {
        icon: "⚠️",
      });
    }
  };

  if (step === 1)
    return (
      <section className="flex justify-center pt-4">
        <article className="w-[35%] my-5 rounded-lg bg-bg px-8 py-6 flex flex-col items-center">
          <h1 className="text-4xl font-bold">فریشا</h1>
          <h3 className="w-full mt-8 text-start text-xl font-semibold">
            ثبت نام
          </h3>
          <form onSubmit={handleSubmit(signupHandler)} className="w-full mt-5">
            <FormInput
              register={register}
              errors={errors}
              label="نام کاربری"
              name="name"
            />
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
            <FormInput
              register={register}
              errors={errors}
              label="تکرار رمز عبور"
              name="repeatPassword"
              type="password"
            />
            <button
              disabled={!isValid || !isDirty || isSubmitting}
              className="w-full auth rounded-lg py-2 text-white mt-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-65"
            >
              ثبت نام
            </button>
          </form>
          <Link href="/signin" className="text-sm text-secondary-700 mt-4">
            قبلا ثبت نام کرده اید ؟
            <span className="text-primary-500">ورود</span>
          </Link>
        </article>
      </section>
    );
  return (
    <section className="flex justify-center pt-4">
      <article className="w-[35%] my-5 rounded-lg bg-bg px-8 py-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold">فریشا</h1>
        <div className="w-full mt-8 flex justify-between items-center">
          <h3 className="text-xl font-semibold">کد تایید</h3>
          <button
            onClick={() => setStep(1)}
            className="w-10 h-10 rounded-lg bg-primary-300 text-primary-800 cursor-pointer text-lg flex justify-center items-center"
          >
            <FaArrowLeftLong />
          </button>
        </div>
        <div className="mt-5">
          <p className="w-full text-center mb-5">لطفا کد تایید را وارد کنید</p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={5}
            renderSeparator={<span className="text-primary-600">-</span>}
            renderInput={(props) => (
              <input {...props} style={{ width: "2.5rem" }} />
            )}
            inputStyle="inline-block border-2 border-primary-600 rounded-lg outline-none h-10 mx-4 text-center text-lg font-semibold"
            containerStyle="flex flex-row-reverse"
          />
        </div>
        <p className="w-full text-start my-5 text-sm font-semibold mr-2">
          <span className="text-primary-600">90</span> ثانیه تا ارسال مجدد کد
        </p>
        <button
          onClick={emailVerificationHandler}
          className="w-full auth rounded-lg py-2 text-white cursor-pointer"
        >
          تایید
        </button>
      </article>
    </section>
  );
};

export default Signup;
