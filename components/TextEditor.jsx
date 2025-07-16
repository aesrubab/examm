"use client";

import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import { useThemeStore } from "@/store";

export default function TextEditor({ setBlogBody }) {
  const theme = useThemeStore((state) => state.theme);


  return (
    <div className={`w-[700px] overflow-hidden h-[350px] mt-[20px] pb-[30px] text-[16px] leading-[28px] ${theme ? "text-white": "text-[#232536]"} border-[2px] border-gray-500 rounded-[5px]`}>
      <SimpleEditor setBlogBody={setBlogBody} />
    </div>
  );
}
