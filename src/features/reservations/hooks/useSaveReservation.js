import { useReservationsStore } from "../../reservations/store/adminStore";

export const useSaveReservation = () => {
  const createReservation = useReservationsStore((s) => s.createReservation);
  const updateReservation = useReservationsStore((s) => s.updateReservation);

  const saveReservation = async (data, reservationId = null) => {
    const payload = {
      guestName: data.guestName?.trim(),
      branch: data.branch,
      guestsCount: Number(data.guestsCount || 1),
      date: new Date(data.date).toISOString(),
      tables: Array.isArray(data.tables) ? data.tables : [],
      status: data.status || "Pendiente",
      notes: data.notes?.trim() || "",
    };

    if (reservationId) {
      await updateReservation(reservationId, payload);
    } else {
      await createReservation(payload);
    }
  };

  return { saveReservation };
};
