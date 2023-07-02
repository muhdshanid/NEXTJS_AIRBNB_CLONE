import { RegisterModalStore } from "@/types/types";
import { create } from "zustand";

export const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))