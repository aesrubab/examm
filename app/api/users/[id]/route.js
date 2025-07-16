import { createClient } from "@/utils/supabase/server";

export async function GET(req, { params }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data, error } = await supabase
    .from("auth.users")
    .select("*")
    .eq("id", id)
    .single();

  return new Response(
    JSON.stringify({
      user: data,
      message: "User with id returned succesfully!",
    }),
    {
      headers: { "Content-type": "application/json" },
    }
  );
}