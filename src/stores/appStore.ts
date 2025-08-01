import { create } from "zustand";

interface UserSession {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface AppState {
    dataChanged: boolean;
    user: UserSession | null;
    setUser: (user: UserSession | null) => void;
    toggleDataChanged: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    dataChanged: false,
    user: null,
    setUser: (user) => set({ user }),
    toggleDataChanged: () =>
        set((state) => ({ dataChanged: !state.dataChanged })),
}));
