import { NextResponse } from "next/server";

let orders: any[] = []; // In-memory; replace with DB in real use

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const { item, quantity } = await req.json();
  const newOrder = {
    id: Date.now().toString(),
    item,
    quantity,
    status: "Created",
  };
  orders.push(newOrder);

  
  return NextResponse.json(newOrder, { status: 201 });
}
