import { useTablesStore } from "../../tables/store/adminStore";

export const useSaveTable = () => {
  const createTable = useTablesStore((s) => s.createTable);
  const updateTable = useTablesStore((s) => s.updateTable);

  const saveTable = async (data, tableId = null) => {
    const payload = {
      restaurant: data.restaurant,
      number: data.number,
      capacity: data.capacity,
      location: data.location,
      status: data.status,
      availabilitySchedules: data.availabilitySchedules,
      description: data.description,
    };

    if (tableId) {
      await updateTable(tableId, payload);
    } else {
      await createTable(payload);
    }
  };

  return { saveTable };
};
