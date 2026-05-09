import { useMenusStore } from "../../menus/store/adminStore";

export const useSaveMenu = () => {
  const createMenu = useMenusStore((s) => s.createMenu);
  const updateMenu = useMenusStore((s) => s.updateMenu);

  const saveMenu = async (data, menuId = null) => {
    const formData = new FormData();
    const ingredients = typeof data.ingredients === "string"
      ? data.ingredients.split(",").map((item) => item.trim()).filter(Boolean)
      : Array.isArray(data.ingredients)
        ? data.ingredients
        : [];

    formData.append("branch", data.restaurant); // Send to backend as 'branch'
    formData.append("name", data.name);
    formData.append("description", data.description);
    ingredients.forEach((ingredient) => formData.append("ingredients", ingredient));
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("isActive", data.isActive ?? true);

    if (data.image?.length > 0) {
      formData.append("image", data.image[0]);
    }

    if (menuId) {
      await updateMenu(menuId, formData);
    } else {
      await createMenu(formData);
    }
  };

  return { saveMenu };
};
