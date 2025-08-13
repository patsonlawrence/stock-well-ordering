import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id);
  if (order && order.status === "Created") {
    order.status = "Received";
    return NextResponse.json(order);
  }
  return NextResponse.json({ error: "Order not found or invalid status" }, { status: 400 });
}
