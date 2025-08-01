"use client";

import { useEffect } from "react";
import { useAppStore } from "@/stores/appStore";

interface Props {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
}

export default function SessionSyncProvider({ user }: Props) {
    const setUser = useAppStore((state) => state.setUser);

    useEffect(() => {
        setUser(user);
    }, [user]);

    return null; // Just for syncing, doesn’t render anything
}
