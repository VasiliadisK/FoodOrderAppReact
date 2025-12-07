export async function StoreOrderToBackend(order) {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order: order }),
  });

  // Log the response for debugging
  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to store order to backend");
  }

  const data = await response.json();
  return data;
}
