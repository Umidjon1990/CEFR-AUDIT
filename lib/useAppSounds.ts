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
        playClick: () => playSound('/sounds/click.mp3', 0.3),
        playHover: () => playSound('/sounds/swoosh.mp3', 0.1),
        playBubble: () => playSound('/sounds/bubble.mp3', 0.4),
        playCorrect: () => playSound('/sounds/correct.mp3', 0.3),
        playSuccess: () => playSound('/sounds/success.mp3', 0.4),
        startBgMusic,
        stopBgMusic
    };
}
