"use client";

import { useCallback, useRef, useEffect } from "react";

let bgMusicRef: HTMLAudioElement | null = null;

export function useAppSounds() {
    const playSound = useCallback((path: string, volume = 0.5) => {
        try {
            const audio = new Audio(path);
            audio.volume = volume;
            audio.play().catch(() => { });
        } catch (e) {
            console.error("Audio init failed:", e);
        }
    }, []);

    const startBgMusic = useCallback(() => {
        if (typeof window === 'undefined') return;
        if (!bgMusicRef) {
            bgMusicRef = new Audio('/sounds/bg-music.mp3');
            bgMusicRef.loop = true;
            bgMusicRef.volume = 0.08;
        }
        bgMusicRef.play().catch(() => { });
    }, []);

    const stopBgMusic = useCallback(() => {
        if (bgMusicRef) {
            bgMusicRef.pause();
            bgMusicRef.currentTime = 0;
        }
    }, []);

    return {
        playClick: () => { }, // Disabled
        playHover: () => { }, // Disabled
        playBubble: () => { }, // Disabled
        playCorrect: () => { }, // Disabled
        playSuccess: () => { }, // Disabled
        startBgMusic,
        stopBgMusic
    };
}
