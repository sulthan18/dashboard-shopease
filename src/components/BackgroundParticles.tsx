import React from "react";

export default function BackgroundParticles() {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <div key={index} className="particle"></div>
            ))}
        </>
    );
}
