import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const supabase = await createClient();
  const { id: authorId } = params;

  const searchParam = request.nextUrl.searchParams.get("search") ?? "";
  const currentPage = Number(request.nextUrl.searchParams.get("page")) || 1;

  const itemsPerPage = 3;
  const rangeStart = (currentPage - 1) * itemsPerPage;
  const rangeEnd = rangeStart + itemsPerPage - 1;

  const { data: blogList, error } = await supabase
    .from("blogs")
    .select("*,authors(*),categories(id,name)")
    .eq("author", authorId)
    .ilike("title", `%${searchParam}%`)
    .range(rangeStart, rangeEnd);

  const { count: totalCount, error: countError } = await supabase
    .from("blogs")
    .select("id", { count: "exact", head: true })
    .eq("author", authorId)
    .ilike("title", `%${searchParam}%`);

  const totalPages = Math.ceil((totalCount ?? 0) / itemsPerPage);

  return new Response(
    JSON.stringify({
      totalPages,
      blogs: blogList,
      message: "Successfully fetched author's blog list.",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
