"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/store";
import Link from "next/link";

const Footer = () => {
  const theme = useThemeStore((state) => state.theme);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div
      className={`flex flex-col justify-start ${theme ? "text-white" : "text-[#181A2A]"}`}
    >
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-[18px] leading-[28px] font-semibold">About</h2>
          <p
            className={`mt-[5px] text-[16px] leading-[24px] ${theme ? "text-[#97989F]" : "text-[#696A75]"} w-[280px]`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
          <div className="flex flex-row justify-start mt-[25px]">
            <h3 className="text-[16px] leading-[24px] font-semibold">Email</h3>
            <h4
              className={`text-[16px] leading-[24px] font-normal ${theme ? "text-[#BABABF]" : "text-[#181A2A]"}`}
            >
              {" "}
              : info@jstemplate.net
            </h4>
          </div>
          <div className="flex flex-row justify-start">
            <h3 className="text-[16px] leading-[24px] font-semibold">Phone</h3>
            <h4
              className={`text-[16px] leading-[24px] font-normal ${theme ? "text-[#BABABF]" : "text-[#181A2A]"}`}
            >
              {" "}
              : 880 123 456 789
            </h4>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h2 className="text-[18px] leading-[28px] font-semibold mb-[5px]">
              Quick Link
            </h2>
            <Link
              href="/blogs"
              className={`text-[16px]  leading-[24px] mt-[8px] font-normal ${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"}`}
            >
              Home
            </Link>
            <Link
              href="/blogs/add-blog"
              className={`text-[16px] leading-[24px] mt-[8px] font-normal ${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"}`}
            >
              Write a blog
            </Link>
            <Link
              href="/blogs/my-blogs"
              className={`text-[16px] leading-[24px] mt-[8px] font-normal ${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"}`}
            >
              My blogs
            </Link>

            <p
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className={`text-[16px] leading-[24px] mt-[8px] font-normal ${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"}`}
            >
              Contact
            </p>
          </div>

          <div className="ml-[80px]">
            <h2 className="text-[18px] leading-[28px] font-semibold mb-[12px]">
              Category
            </h2>

            {categories?.map((category) => (
              <div key={category?.id}>
                <h3
                  className={`text-[16px]  leading-[24px] mt-[8px] font-normal ${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"}`}
                >
                  {category?.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-col mt-[65px] w-full rounded border-[1px] border-zinc-400"></div>
      <div className="flex flex-row justify-between mt-[30px]">
        <div className="flex flex-row justify-start">
          <img
            src={theme ? "/icons/union2.svg" : "/icons/logo.svg"}
            className="w-[50px] h-[50px] "
          />
          <div>
            <div className="flex flex-row justify-start">
              <h3 className="ml-[5px] text-[20px] leading-[28px]">Meta</h3>
              <h2 className="text-[20px] leading-[28px] font-extrabold">
                Blog
              </h2>
            </div>
            <h3 className="ml-[5px] text-[16px] leading-[24px]">
              © JS Template 2023. All Rights Reserved.
            </h3>
          </div>
        </div>

        <div className="flex flex-row justify-start mt-[15px]">
          <h3
            className={`${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"} text-[16px] leading-[24px]`}
          >
            Terms of Use
          </h3>
          <h3
            className={`${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"}  text-[16px] leading-[24px] ml-[30px]`}
          >
            Privacy Policy
          </h3>
          <h3
            className={`${theme ? "text-[#BABABF]" : "text-[#3B3C4A]"}  text-[16px] leading-[24px] ml-[30px]`}
          >
            Cookie Policy
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
