import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full text-xl text-center pb-2">
      <Link href="/">
        <a>Vote</a>
      </Link>
      <span className="p-4">{"-"}</span>
      <Link href="/result">
        <a>Results</a>
      </Link>
    </header>
  );
};

export default Header;
