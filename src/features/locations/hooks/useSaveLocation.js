import { useLocationsStore } from "../../locations/store/adminStore";

export const useSaveLocation = () => {
  const createLocation = useLocationsStore((s) => s.createLocation);
  const updateLocation = useLocationsStore((s) => s.updateLocation);

  const saveLocation = async (data, locationId = null) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("descripcion", data.descripcion);
    formData.append("address", data.address);
    formData.append("openingTime", data.openingTime);
    formData.append("closingTime", data.closingTime);
    formData.append("category", data.category);
    formData.append("averagePrice", data.averagePrice);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("state", data.state);

    if (data.photos?.length > 0) {
      formData.append("image", data.photos[0]);
    }

    if (locationId) {
      await updateLocation(locationId, formData);
    } else {
      await createLocation(formData);
    }
  };

  return { saveLocation };
};
