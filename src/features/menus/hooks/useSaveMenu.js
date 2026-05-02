import { useMenusStore } from "../../menus/store/adminStore";

export const useSaveMenu = () => {
  const createMenu = useMenusStore((s) => s.createMenu);
  const updateMenu = useMenusStore((s) => s.updateMenu);

  const saveMenu = async (data, menuId = null) => {
    const formData = new FormData();

    formData.append("restaurant", data.restaurant);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("ingredients", data.ingredients);
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
