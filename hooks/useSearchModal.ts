import { LoginModalStore } from "@/types/types";
import { create } from "zustand";

export const useSearchModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))