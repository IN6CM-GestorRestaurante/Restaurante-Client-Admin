import { useLocationsStore } from "../../locations/store/adminStore";

export const useSaveLocation = () => {
  const createLocation = useLocationsStore((s) => s.createLocation);
  const updateLocation = useLocationsStore((s) => s.updateLocation);

  const saveLocation = async (data, locationId = null) => {
    const formData = new FormData();

    formData.append("name", String(data.name || "").trim());
    formData.append("description", String(data.descripcion || "").trim()); // mapped to 'description' as expected by Model
    formData.append("address", String(data.address || "").trim());
    formData.append("openingTime", String(data.openingTime || "").trim());
    formData.append("closingTime", String(data.closingTime || "").trim());
    formData.append("category", String(data.category || "").trim());
    formData.append("averagePrice", String(data.averagePrice !== undefined && data.averagePrice !== null ? data.averagePrice : "0").trim());
    formData.append("email", String(data.email || "").trim());
    formData.append("isActive", "true");
    formData.append("state", String(data.state || "Operativa").trim());

    // Normalize phone to E.164 when a local 6-8 digit number is provided (assume +502)
    const phone = String(data.phoneNumber || "").replace(/[\s\-\(\)]/g, "").trim();
    let phoneNormalized = phone;
    if (/^\d{6,8}$/.test(phone)) {
      phoneNormalized = `+502${phone}`;
    }
    formData.append("phoneNumber", phoneNormalized);

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
