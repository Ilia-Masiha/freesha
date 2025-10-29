import FormInput from "@/components/FormInput";
import Link from "next/link";

const Signin = () => {
  return (
    <section className="flex justify-center pt-4">
      <article className="w-[35%] my-5 rounded-lg bg-bg px-8 py-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold">فریشا</h1>
        <h3 className="w-full mt-8 text-start text-xl font-semibold">ورود</h3>
        <form className="w-full mt-5">
          <FormInput id="email" label="ایمیل" name="email" />
          <FormInput id="password" label="رمز عبور" name="password" />
          <button className="w-full auth rounded-lg py-2 text-white mt-4 cursor-pointer">
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
