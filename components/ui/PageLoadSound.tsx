"use client";

import { useEffect } from "react";
import useSound from "use-sound";

export default function PageLoadSound() {
    const [play] = useSound('/sounds/hover.mp3', { volume: 0.1 }); // Subtle entrance sound

    useEffect(() => {
        play();
    }, [play]);

    return null;
}
