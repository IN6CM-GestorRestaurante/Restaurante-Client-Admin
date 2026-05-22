import { useMenusStore } from "../../menus/store/adminStore";

export const useSaveMenu = () => {
  const createMenu = useMenusStore((s) => s.createMenu);
  const updateMenu = useMenusStore((s) => s.updateMenu);

  const saveMenu = async (data, menuId = null) => {
    let payload = data;

    // If data is not FormData, we create one (for compatibility with other possible callers)
    if (!(data instanceof FormData)) {
      const formData = new FormData();
      const ingredients = typeof data.ingredients === "string"
        ? data.ingredients.split(",").map((item) => item.trim()).filter(Boolean)
        : Array.isArray(data.ingredients)
          ? data.ingredients
          : [];

      formData.append("branch", data.branch || data.restaurant); 
      formData.append("name", data.name);
      formData.append("description", data.description);
      ingredients.forEach((ingredient) => formData.append("ingredients", ingredient));
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("isActive", data.isActive ?? true);

      if (data.image?.length > 0) {
        formData.append("image", data.image[0]);
      }
      payload = formData;
    }

    if (menuId) {
      await updateMenu(menuId, payload);
    } else {
      await createMenu(payload);
    }
  };

  return { saveMenu };
};
