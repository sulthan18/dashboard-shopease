import React from "react";
import { Button } from "./ui/button";

interface ActionButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

export default function ActionButton({
    text,
    onClick,
    className,
}: ActionButtonProps) {
    return (
        <Button
            className={`text-white button-transition mt-6 ${className}`}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}
