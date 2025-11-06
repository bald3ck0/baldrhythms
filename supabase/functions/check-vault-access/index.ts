import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header", hasAccess: false }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { vaultType } = await req.json();

    if (!vaultType) {
      return new Response(
        JSON.stringify({ error: "Missing vaultType", hasAccess: false }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const token = authHeader.replace("Bearer ", "");

    const { data: clerkData, error: clerkError } = await supabase.auth.getUser(token);

    if (clerkError || !clerkData?.user) {
      return new Response(
        JSON.stringify({ error: "Invalid token", hasAccess: false }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const clerkId = clerkData.user.id;

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", clerkId)
      .maybeSingle();

    if (userError || !userData) {
      return new Response(
        JSON.stringify({ hasAccess: false }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { data: accessData, error: accessError } = await supabase
      .from("user_vault_access")
      .select("*")
      .eq("user_id", userData.id)
      .maybeSingle();

    if (accessError) {
      return new Response(
        JSON.stringify({ hasAccess: false }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const hasAccess = accessData?.vault_tier === vaultType ||
                     (vaultType === "royal" && accessData?.vault_tier === "imperial");

    return new Response(
      JSON.stringify({ hasAccess }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, hasAccess: false }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
