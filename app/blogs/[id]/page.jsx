
"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Loading from "@/components/loading";

const Blog = ({ params }) => {
  const { id } = params;
  const [user, setUser] = useState(null);
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const supabase = createClient();
      const myUser = await supabase.auth.getUser();
      if (!myUser?.data?.user?.id) {
        router.push("/sign-in");
      } else {
        setUser(myUser.data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
    getBlog();
  }, []);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center mt-[50px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-[210px]">
      <div className="mt-[30px]">
        {blog?.categories?.name && (
          <div className="w-fit mt-[25px] bg-[#4B6BFB] rounded-[5px]">
            <h3 className="text-[14px] px-[10px] py-[5px] text-white leading-[20px] font-semibold">
              {blog?.categories?.name}
            </h3>
          </div>
        )}
        {blog?.title && (
          <p className="w-fit text-[24px] leading-[28px] font-semibold mt-[15px]">
            {blog?.title}
          </p>
        )}

        <Link
          href={
            user.id == blog?.authors?.id
              ? `/blogs/my-blogs`
              : `/blogs/author-blogs/${blog?.authors?.id || blog?.author}`
          }
          className="w-fit flex flex-row mt-[20px]"
        >
          {blog?.authors?.email && (
            <img
              src="https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
              className="w-[40px] h-[40px] rounded-[100px]"
            />
          )}
          {blog?.authors?.email && (
            <h3 className="text-[16px] leading-[24px] font-medium text-[#97989F] ml-[10px] mt-[10px]">
              {blog?.authors?.email}
            </h3>
          )}
          {blog?.created_at && (
            <h3 className="text-[16px] leading-[24px] font-medium text-[#97989F] ml-[30px] mt-[10px]">
              {format(new Date(blog?.created_at), "d MMMM yyyy")}
            </h3>
          )}
        </Link>
      </div>

      {blog?.thumbnail && (
        <img
          alt={blog?.thumbnail}
          className="w-full h-[450px] rounded-[20px] mt-[30px]"
          src={blog?.thumbnail}
        />
      )}
      <div
        id="headers"
        className="mt-[30px]"
        dangerouslySetInnerHTML={{ __html: blog?.body }}
      />
    </div>
  );
};

export default Blog;
