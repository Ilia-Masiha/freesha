import FormInput from "@/components/FormInput";
import Link from "next/link";

const Signup = () => {
  return (
    <section className="flex justify-center pt-4">
      <article className="w-[35%] my-5 rounded-lg bg-bg px-8 py-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold">فریشا</h1>
        <h3 className="w-full mt-8 text-start text-xl font-semibold">
          ثبت نام
        </h3>
        <form className="w-full mt-5">
          <FormInput id="name" label="نام کاربری" name="name" />
          <FormInput id="email" label="ایمیل" name="email" />
          <FormInput id="password" label="رمز عبور" name="password" />
          <FormInput
            id="repeatPassword"
            label="تکرار رمز عبور"
            name="repeatPassword"
          />
          <button className="w-full auth rounded-lg py-2 text-white mt-4 cursor-pointer">
            ثبت نام
          </button>
        </form>
        <Link href="/signin" className="text-sm text-secondary-700 mt-4">
          قبلا ثبت نام کرده اید ؟ <span className="text-primary-500">ورود</span>
        </Link>
      </article>
    </section>
  );
};

export default Signup;
