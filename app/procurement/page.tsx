import Link from "next/link";

async function getOrders() {
  const res = await fetch("http://localhost:3000/api/orders", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProcurementDashboard() {
  const orders = await getOrders();

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Orders Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id}>
              <td className="border p-2">{order.item}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                {order.status === "Created" && (
                  <form action={`/api/orders/${order.id}/receive`} method="POST">
                    <button className="bg-green-500 text-white px-3 py-1 rounded">
                      Receive
                    </button>
                  </form>
                )}
                {order.status === "Received" && (
                  <form action={`/api/orders/${order.id}/disperse`} method="POST">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">
                      Disperse
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
