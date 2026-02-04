"use client";

import useSound from 'use-sound';

// Fallback sounds or actual paths - ensuring it doesn't crash if files missing
// Ideally, we'd have files in /public/sounds/
const clickUrl = '/sounds/click.mp3';
const hoverUrl = '/sounds/hover.mp3';
const successUrl = '/sounds/success.mp3';

export function useAppSounds() {
    const [playClick] = useSound(clickUrl, { volume: 0.5 });
    const [playHover] = useSound(hoverUrl, { volume: 0.2 });
    const [playSuccess] = useSound(successUrl, { volume: 0.6 });

    return { playClick, playHover, playSuccess };
}
