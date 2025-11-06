import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const event = await request.json();

  const priceId = event?.data?.object?.lines?.data?.[0]?.price?.id;
  const email   = event?.data?.object?.customer_details?.email;

  if (!priceId || !email) {
    return NextResponse.json({ error: "missing data" }, { status: 400 });
  }

  let newTier = "none";

  if (priceId === "price_1SOYX5E0ZufYavwtxrwp7X0K") {
    newTier = "signature"; // royal vault
  }

  if (priceId === "price_1SOYZ4E0ZufYavwtSWQE30c6") {
    newTier = "grand"; // imperial vault
  }

  await fetch("https://tzgpqoeibaopbwzndusg.supabase.co/rest/v1/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal"
    },
    body: JSON.stringify({
      vaultTier: newTier
    })
  });

  return NextResponse.json({ success: true });
}
