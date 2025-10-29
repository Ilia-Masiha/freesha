import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full px-10 py-3 shadow-2xl">
      <div></div>
      <div></div>
      <div>
        <Link href="/signup">Signup</Link>/
        <Link href="/signin">Signin</Link>
      </div>
    </header>
  );
}
 
export default Header;