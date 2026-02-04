"use client";

import { useEffect } from "react";

export default function PageLoadSound() {
    useEffect(() => {
        // Soft pop sound on page load
        const audio = new Audio('/sounds/pop.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => { });
    }, []);

    return null;
}
