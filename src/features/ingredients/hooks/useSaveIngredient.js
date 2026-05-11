import { useIngredientsStore } from "../store/adminStore";

export const useSaveIngredient = () => {
  const createIngredient = useIngredientsStore((s) => s.createIngredient);
  const updateIngredient = useIngredientsStore((s) => s.updateIngredient);

  const saveIngredient = async (data, ingredientId = null) => {
    // API expects JSON
    const payload = {
        name: data.name,
        unit: data.unit,
        costPrice: Number(data.costPrice)
    };

    if (ingredientId) {
      await updateIngredient(ingredientId, payload);
    } else {
      await createIngredient(payload);
    }
  };

  return { saveIngredient };
};
