"use client";

import { useEffect } from "react";

export default function PageLoadSound() {
    useEffect(() => {
        const audio = new Audio('/sounds/bubble.mp3');
        audio.volume = 0.2;
        // Browsers often block autoplay, so we catch the error silently
        audio.play().catch(() => { });
    }, []);

    return null;
}
