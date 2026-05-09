import { useOrdersStore } from "../../orders/store/adminStore";

export const useSaveOrder = () => {
  const createOrder = useOrdersStore((s) => s.createOrder);
  const updateOrder = useOrdersStore((s) => s.updateOrder);

  const saveOrder = async (data, orderId = null) => {
    const payload = {
      tables: Array.isArray(data.table) ? data.table : [data.table], // Convert table to tables array
      branch: data.restaurant, // Map restaurant to branch
      items: data.items,
      status: data.status,
    };

    if (orderId) {
      await updateOrder(orderId, payload);
    } else {
      await createOrder(payload);
    }
  };

  return { saveOrder };
};
