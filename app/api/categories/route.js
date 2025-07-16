import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*");
  
    return new Response(
      JSON.stringify({
        categories: data,
        message: "All Categories returned succesfully!",
      }),
      {
        headers: { "Content-type": "application/json" },
      }
    );
  }