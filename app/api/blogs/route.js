import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blogs")
    .select(`*,authors(*),categories(id,name)`);

  return new Response(
    JSON.stringify({
      blogs: data,
      message: "All blogs returned succesfully!",
    }),
    {
      headers: { "Content-type": "application/json" },
    }
  );
}

export async function POST(req) {
  const supabase = await createClient();
  const blog = await req.json();
  const { title, thumbnail, category, body,author } = blog;
  const { data, error } = await supabase.from("blogs").insert({title, thumbnail, category, body,author}).single();

  return new Response(
    JSON.stringify({
      message: "Blog added succesfully!",
    }),
    {
      headers: { "Content-type": "application/json" },
    }
  );
}
