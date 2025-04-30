import { create } from "zustand";

interface AppState {
    dataChanged: boolean;
    toggleDataChanged: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    dataChanged: false,
    toggleDataChanged: () =>
        set((state) => ({ dataChanged: !state.dataChanged })),
}));
