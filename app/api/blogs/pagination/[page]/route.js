import { createClient } from "@/utils/supabase/server";

export async function GET(req, { params }) {
  const page = parseInt(params.page || 1);
  const search = req.nextUrl.searchParams.get("search") || "";
  const limit = 6;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select(`*,authors(*),categories(id,name)`)
    .ilike("title", `%${search}%`)
    .range(from, to);

  
  const { count, error2 } = await supabase
    .from("blogs")
    .select("*", { count: "exact", head: true })
    .ilike("title", `%${search}%`);

  const pages = count / limit;

  return new Response(
    JSON.stringify({
      blogs: data,
      totalPages: pages,
      message: "All blogs returned succesfully!",
    }),
    {
      headers: { "Content-type": "application/json" },
    }
  );
}
