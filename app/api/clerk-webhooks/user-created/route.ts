import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Clerk user data
  const clerkId = body?.data?.id;
  const email = body?.data?.email_addresses?.[0]?.email_address;

  if (!clerkId || !email) {
    return NextResponse.json({ error: "Missing clerk data" }, { status: 400 });
  }

  // insert into Supabase
  const { data, error } = await fetch("https://tzgpqoeibaopbwzndusg.supabase.co/rest/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      clerk_id: clerkId,
      email: email,
      vaultTier: "none"
    })
  }).then(r => r.json());

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
