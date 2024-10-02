"use client";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Switch, useColorMode } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [toggleMenu, setToggleMenu] = useState(true);

  const { data: session } = useSession();

  const pathname = usePathname();
  console.log(session);

  const navItems = [
    {
      linkName: "Home",
      path: "/",
    },
    {
      linkName: "About",
      path: "/about",
    },
    {
      linkName: "Contact",
      path: "/contact",
    },
  ];
  return (
    <header className=" w-full flex flex-col p-3  gap-2 md:flex-row justify-between px-6 h-fit md:items-center md:h-16 shadow-lg  ">
      <div className=" flex justify-between order-[-1] items-center">
        <Link href={"/"}>
          <img
            src="/logo.png"
            alt="Web app logo"
            srcSet=""
            className="h-12 animate-bounce"
          />
        </Link>
        <div
          className=" md:hidden cursor-pointer"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <HamburgerIcon />
        </div>
      </div>
      <hr
        className={` ${
          !toggleMenu ? "hidden" : ""
        } md:hidden border-[1px] border-gray-200`}
      />
      <div
        className={` ${
          !toggleMenu ? "hidden" : ""
        }  md:flex-row flex-col flex items-center gap-4`}
      >
        {navItems.map((navitem, index) => {
          return (
            <div
              key={index}
              className="hover:bg-teal-200 hover:text-red-700 md:hover:bg-inherit w-full md:w-auto cursor-pointer rounded-lg"
            >
              <li className=" p-2 list-none ">
                <Link
                  href={navitem.path}
                  className=" text-md  hover:border-b-2 border-b-blue-600"
                >
                  {navitem.linkName}
                </Link>
              </li>
            </div>
          );
        })}
      </div>
      <div
        className={`flex ${
          !toggleMenu ? "hidden" : ""
        }  justify-center gap-2 items-center`}
      >
        <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        {
          <div className=" cursor-pointer  w-10 h-10 rounded-full border-[1.5px] flex justify-center items-center border-gray-500">
            <img src="/logo.png" className="w-8 h-8 rounded-full" alt="" />
          </div>
        }
        {/* <Link href={pathname==="/sign-up"?"/sign-in":"/sign-up"}>
             <Button  colorScheme='blue'>{pathname==="/sign-up"?"Log In":"Sign Up"}</Button>
        </Link> */}
      </div>
    </header>
  );
};

export default Navbar;
