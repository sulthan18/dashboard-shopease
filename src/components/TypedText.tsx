"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface TypedTextProps {
    strings: string[];
}

export default function TypedText({ strings }: TypedTextProps) {
    const typedTextRef = useRef(null);

    useEffect(() => {
        const typedOptions = {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: "|",
            smartBackspace: true,
        };

        const typed = new Typed(typedTextRef.current, typedOptions);

        return () => {
            typed.destroy();
        };
    }, [strings]);

    return <span ref={typedTextRef} className="text-white"></span>;
}
