"use client";
import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { useThemeStore } from "@/store";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useSearchStore } from "@/store";
import Loading from "@/components/loading";

const page = () => {
  const theme = useThemeStore((state) => state.theme);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const search = useSearchStore((state) => state.search);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const getUserNow = async () => {
    try {
      setUserLoading(true);
      const supabase = createClient();
      const myUser = await supabase.auth.getUser();
      setUser(myUser.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setUserLoading(false);
    }
  };

  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/author-blogs/${user.id}?page=${page}&search=${search}`
      );
      const data = await response.json();
      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pagination = () => {
    if (totalPages > page) {
      setPage((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    getUserNow();
  }, []);

  useEffect(() => {
    if (user?.id) {
      getBlogs();
    }
  }, [user, page]);

  useEffect(() => {
    if (user?.id) {
      getBlogs();
    }
    setPage(1);
  }, [search]);

  return (
    <div
      className={`${theme ? "bg-[#181A2A] text-white" : "bg-white text-[#181A2A]"}`}
    >
      <div
        className={`mt-[30px] py-[50px] text-center w-full ${theme ? "bg-[#242535]" : "bg-[#F6F6F7]"} rounded-[12px]`}
      >
        {userLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          user?.email && (
            <h1 className="font-medium text-[20px] leading-[28px] ">
              {user?.email}
            </h1>
          )
        )}
      </div>
      <h2 className="font-bold text-[24px] leading-[28px] mt-[40px]">
        Latest Post
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="mt-[40px] grid grid-cols-3 gap-[20px]">
          {blogs?.map((blog) => (
            <Link
              href={`/blogs/${blog?.id}`}
              key={blog?.id}
              className="w-full border-[1px] border-[#E8E8EA] rounded-[12px] p-[15px] flex flex-col justify-between"
            >
              <header>
                {blog?.thumbnail && (
                  <img
                    src={blog?.thumbnail}
                    className="w-full h-[250px] object-cover rounded-[6px]"
                  />
                )}
                {blog?.categories?.name && (
                  <div className="w-fit mt-[25px] px-[10px] py-[5px] bg-[#4B6BFB0D]">
                    <h3 className="text-[14px] text-[#4B6BFB] leading-[20px] font-medium">
                      {blog?.categories?.name}
                    </h3>
                  </div>
                )}
              </header>
              {blog?.title && (
                <main>
                  <p className="w-fit text-[24px] leading-[28px] font-semibold mt-[15px]">
                    {blog?.title}
                  </p>
                </main>
              )}
              <footer>
                <div className="w-fit flex flex-row mt-[20px]">
                  <img
                    src="https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
                    className="w-[40px] h-[40px] rounded-[100px]"
                  />
                  <div className="flex flex-col ml-[10px]">
                    {blog?.authors?.email && (
                      <h3 className="text-[15px] leading-[20px] font-medium text-[#97989F]">
                        {blog?.authors?.email}
                      </h3>
                    )}
                    {blog?.created_at && (
                      <h3 className="text-[15px] leading-[20px] font-medium text-[#97989F]">
                        {format(new Date(blog?.created_at), "d MMMM yyyy")}
                      </h3>
                    )}
                  </div>
                </div>
              </footer>
            </Link>
          ))}
        </div>
      )}

      <div className="w-full flex flex-row justify-center">
        <button
          disabled={totalPages > page ? false : true}
          onClick={pagination}
          className="w-fit border-[1px] rounded-[10px] px-[30px] py-[10px] mt-[40px] text-[16px] leading-[24px] font-medium text-[#696A75]"
        >
          Load More
        </button>
        <img
          onClick={() => setPage(1)}
          src={theme ? "/icons/reset2.svg" : "/icons/reset.svg"}
          className="mt-[40px] ml-[20px]"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default page;
