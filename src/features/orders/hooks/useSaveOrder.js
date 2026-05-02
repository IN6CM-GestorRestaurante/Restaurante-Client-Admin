import { useOrdersStore } from "../../orders/store/adminStore";

export const useSaveOrder = () => {
  const createOrder = useOrdersStore((s) => s.createOrder);
  const updateOrder = useOrdersStore((s) => s.updateOrder);

  const saveOrder = async (data, orderId = null) => {
    const payload = {
      table: data.table,
      restaurant: data.restaurant,
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
