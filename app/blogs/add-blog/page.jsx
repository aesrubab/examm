"use client";

import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import TextEditor from "@/components/TextEditor";

const AddBlog = () => {
  const [form, setForm] = useState({
    title: "",
    category: "category",
    thumbnail: "",
    body: "",
  });

  const [content, setContent] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const theme = useThemeStore((state) => state.theme);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const json = await res.json();
      setCategoryList(json.categories);
    }

    async function fetchUser() {
      const supabase = createClient();
      const userResult = await supabase.auth.getUser();
      setUserInfo(userResult.data.user);
      setForm((prev) => ({ ...prev, author: userResult.data.user.id }));
    }

    fetchCategories();
    fetchUser();
  }, []);

  useEffect(() => {
    setForm((prev) => ({ ...prev, body: content }));
  }, [content]);

  async function submitBlog() {
    if (
      !form.title ||
      form.category === "category" ||
      !form.thumbnail ||
      !form.body
    ) {
      alert("Please fill all the fields!");
      return;
    }

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Blog added successfully!");
      setForm({ title: "", category: "category", thumbnail: "", body: "" });
      setContent("");
    }
  }

  return (
    <div
      className={`w-full flex flex-col items-center ${
        theme ? "bg-[#181A2A] text-white" : "bg-white text-[#232536]"
      }`}
    >
      <h1 className="mt-[50px] text-[48px] leading-[64px] font-bold">
        Write a new blog
      </h1>
      <form className="w-fit flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
        <input
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Add title for blog"
          className="w-[700px] mt-[50px] px-[20px] py-[20px] text-[16px] leading-[28px] text-[#232536] border-[2px] border-gray-500 rounded-[5px]"
        />
        <div className="relative">
          <select
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
            className="appearance-none w-[700px] text-[#232536] mt-[20px] px-[20px] py-[20px] border-[2px] border-gray-500 rounded-[5px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[16px] leading-[28px] bg-white"
          >
            <option value="category" disabled>
              Select category
            </option>
            {categoryList?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 top-[20px] right-[20px] flex items-center text-gray-500">
            ▼
          </div>
        </div>

        <input
          value={form.thumbnail}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, thumbnail: e.target.value }))
          }
          placeholder="Add thumbnail image"
          className="w-[700px] mt-[20px] pl-[20px] py-[20px] text-[16px] leading-[28px] text-[#232536] border-[2px] border-gray-500 rounded-[5px]"
        />
        <TextEditor setBlogBody={setContent} />

        <button
          type="button"
          onClick={submitBlog}
          className="w-full my-[40px] py-[20px] bg-[#FFD050] text-[#232536] text-[24px] leading-[32px] font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
