import { create } from "zustand";

export const useUIStore = create((set) => ({
  isMobileOpen: false,
  toggleMobileSidebar: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setMobileSidebar: (isOpen) => set({ isMobileOpen: isOpen }),

  modal: null,
  confirm: null,

  OpenModal: (title, message, onClose) => set(
    {
      modal: { title, message, onClose }
    }
  ),

  CloseModal: () => set({ modal: null }),

  openConfirm: (title, message, onConfirm, onCancel) => set({
    confirm: { title, message, onConfirm, onCancel }
  }),

  closeConfirm: () => set({ confirm: null })

}));