import { useLocationsStore } from "../../locations/store/adminStore";

export const useSaveLocation = () => {
  const createLocation = useLocationsStore((s) => s.createLocation);
  const updateLocation = useLocationsStore((s) => s.updateLocation);

  const saveLocation = async (data, locationId = null) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.descripcion); // mapped to 'description' as expected by Model
    formData.append("address", data.address);
    formData.append("openingTime", data.openingTime);
    formData.append("closingTime", data.closingTime);
    formData.append("category", data.category);
    formData.append("averagePrice", data.averagePrice);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("isActive", "true");
    formData.append("state", data.state || "Operativa");

    // Normalize phone to E.164 when a local 7-8 digit number is provided (assume +502)
    const phone = String(data.phoneNumber || "").trim();
    let phoneNormalized = phone;
    if (/^\d{7,8}$/.test(phone)) {
      phoneNormalized = `+502${phone}`;
    }
    formData.set("phoneNumber", phoneNormalized);

    if (data.photos?.length > 0) {
      // server expects the file field name to be 'photos' (uploadRestaurantImage.single('photos'))
      formData.append("photos", data.photos[0]);
    } else if (data.removePhoto) {
      formData.append("removePhoto", "true");
    }

    if (locationId) {
      await updateLocation(locationId, formData);
    } else {
      await createLocation(formData);
    }
  };

  return { saveLocation };
};
