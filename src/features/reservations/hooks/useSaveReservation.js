import { useReservationsStore } from "../../reservations/store/adminStore";

export const useSaveReservation = () => {
  const createReservation = useReservationsStore((s) => s.createReservation);
  const updateReservation = useReservationsStore((s) => s.updateReservation);

  const saveReservation = async (data, reservationId = null) => {
    const payload = {
      user: data.user,
      restaurant: data.restaurant,
      type: data.type,
      table: data.table,
      date: data.date,
      deliveryAddress: data.deliveryAddress,
      items: data.items,
      status: data.status,
      notes: data.notes,
    };

    if (reservationId) {
      await updateReservation(reservationId, payload);
    } else {
      await createReservation(payload);
    }
  };

  return { saveReservation };
};
