
import Image from "next/image";
import Link from "next/link";
import Navitems from "./Navitems";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4">

      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
      </Link>

      <div className="flex items-center gap-8">
        <Navitems />
        <Link href="/sign-in">Sign In</Link>
      </div>

    </nav>
  );
};

export default Navbar;
