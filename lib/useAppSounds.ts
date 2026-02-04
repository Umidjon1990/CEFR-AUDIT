"use client";

import { useCallback } from "react";

export function useAppSounds() {
    const playSound = useCallback((path: string, volume = 0.5) => {
        try {
            const audio = new Audio(path);
            audio.volume = volume;
            audio.play().catch(e => console.error("Audio play failed:", e));
        } catch (e) {
            console.error("Audio init failed:", e);
        }
    }, []);

    return {
        playClick: () => playSound('/sounds/click.mp3', 0.5),
        playHover: () => playSound('/sounds/hover.mp3', 0.2),
        playSuccess: () => playSound('/sounds/success.mp3', 0.6)
    };
}
