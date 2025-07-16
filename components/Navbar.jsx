"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useThemeStore } from "@/store";
import { useSearchStore } from "@/store";
import { supabase } from "@/utils/supabase/client";  // supabase client-ini import et

const Navbar = () => {
  const [mySearch, setMySearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const setSearchStore = useSearchStore((state) => state.setSearch);
  const search = useSearchStore((state) => state.search);

  useEffect(() => {
    setMySearch(search);
  }, [search]);

  useEffect(() => {
    // İstifadəçi sessiyasını yoxla
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };
    checkUser();

    // Sessiya dəyişikliklərinə qulaq as
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div
      className={`flex flex-row justify-between ${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#141624]"}`}
    >
      <div className="flex flex-row justify-start">
        <img
          src={theme ? "/icons/union2.svg" : "/icons/union.svg"}
          className="w-[35px] h-[35px]"
          alt="Logo"
        />
        <h3 className="mt-[4px] ml-[9px] text-[20px]">Meta</h3>
        <h2 className="mt-[4px] ml-[2px] text-[20px] font-bold">Blog</h2>
      </div>

      <div className={`flex flex-row justify-start ${theme ? "text-white" : "text-[#3B3C4A]"} pt-[5px]`}>
        <Link href="/blogs" className="font-normal text-[16px] leading-[24px]">
          Home
        </Link>
        <Link href="/blogs/add-blog" className="font-normal text-[16px] leading-[24px] ml-[40px]">
          Write a Blog
        </Link>
        <Link href="/blogs/my-blogs" className="font-normal text-[16px] leading-[24px] ml-[40px]">
          My Blogs
        </Link>
        <p
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
          className="font-normal text-[16px] leading-[24px] ml-[40px] cursor-pointer"
        >
          Contact
        </p>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row relative">
          <input
            onChange={(e) => {
              setMySearch(e.target.value);
              setSearchStore(e.target.value);
            }}
            value={mySearch}
            className={`w-[180px] text-[14px] ${theme ? "bg-[#242535]" : "bg-[#F4F4F5]"} py-[8px] pl-[10px] pr-[25px] rounded-sm`}
            placeholder="Search..."
          />
          <img
            src="/icons/search.svg"
            className="absolute right-[5px] top-[10px] w-[18px] h-[18px]"
            alt="Search Icon"
          />
        </div>

        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className={`${theme ? "bg-white text-[#141624]" : "bg-black text-white"} ml-[20px] pt-[7px] px-[30px] text-[16px] font-semibold rounded-md`}
            >
              Profile
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setIsLoggedIn(false);
              }}
              className={`${theme ? "bg-white text-[#141624]" : "bg-black text-white"} ml-[10px] pt-[7px] px-[30px] text-[16px] font-semibold rounded-md cursor-pointer`}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/sign-in"
            className={`${theme ? "bg-white text-[#141624]" : "bg-black text-white"} ml-[20px] pt-[7px] px-[40px] text-[16px] font-semibold rounded-md`}
          >
            Login
          </Link>
        )}

        <div className="ml-[20px] pt-[3px]">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
