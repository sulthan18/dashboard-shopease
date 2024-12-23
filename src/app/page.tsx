"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackgroundParticles from "@/components/BackgroundParticles";
import TypedText from "@/components/TypedText";
import ActionButton from "@/components/ActionButton";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleButtonClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/dashboard/sign-in");
    }, 1000);
  };

  return (
    <div className={`page-transition ${isExiting ? "exit" : ""}`}>
      <div className="flex items-center justify-center min-h-screen flex-col animated-background">
        <BackgroundParticles />

        <h1 className="mb-4 text-2xl font-bold text-white">
          Welcome to Shopease Dashboard
        </h1>

        <div className="typed-text-container">
          <TypedText
            strings={[
              "Streamline your operations with ease.",
              "Monitor and optimize every aspect of your store.",
              "Achieve operational excellence.",
              "Empower your business with real-time data.",
            ]}
          />
        </div>

        <ActionButton
          text="Get Started"
          onClick={handleButtonClick}
          className="text-white button-transition mt-6"
        />
      </div>
    </div>
  );
}
