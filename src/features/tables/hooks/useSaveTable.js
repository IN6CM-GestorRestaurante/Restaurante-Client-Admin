import { useTablesStore } from "../store/adminStore";

export const useSaveTable = () => {
  const createTable = useTablesStore((s) => s.createTable);
  const updateTable = useTablesStore((s) => s.updateTable);

  const saveTable = async (data, tableId = null) => {
    const payload = {
      branch: data.branch,
      number: data.number,
      capacity: Number(data.capacity),
      location: data.location,
      description: data.description || undefined,
      availabilitySchedules: (data.schedules || []).map((s) => ({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    };

    if (tableId) {
      await updateTable(tableId, payload);
    } else {
      await createTable(payload);
    }
  };

  return { saveTable };
};
