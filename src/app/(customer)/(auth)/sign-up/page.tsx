"use client";

import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { SignUp } from "../lib/actions";
import Link from "next/link";

const initialFormState: ActionResult = {
    error: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
        >
            {pending ? "Loading..." : "Sign Up to My Account"}
        </button>
    );
}

export default function SignUpPage() {
    const [state, formAction] = useFormState(SignUp, initialFormState);

    return (
        <div id="signup" className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col">
            <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
                <form
                    action={formAction}
                    className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
                >
                    <div className="flex items-center shrink-0 justify-center mb-4">
                        <img
                            src="assets/logos/logo.svg"
                            alt="icon"
                            className="w-12 h-12 mr-2"
                        />
                        <span className="text-[#002fff] font-bold text-2xl">Shopease</span>
                    </div>
                    <h1 className="font-bold text-2xl text-black leading-[34px]">Sign Up</h1>

                    {state.error !== "" && (
                        <div className="border border-red-300 text-red-500 p-3 rounded">
                            <h4 className="font-semibold">Error</h4>
                            <p className="text-sm">{state.error}</p>
                        </div>
                    )}

                    <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                        <div className="flex shrink-0">
                            <img src="assets/icons/profile-circle.svg" alt="icon" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                            placeholder="Write your complete name"
                        />
                    </div>
                    <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                        <div className="flex shrink-0">
                            <img src="assets/icons/sms.svg" alt="icon" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                            placeholder="Write your email address"
                        />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
                            <div className="flex shrink-0">
                                <img src="assets/icons/lock.svg" alt="icon" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                                placeholder="Write your password"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <SubmitButton />
                        <Link
                            href="/sign-in"
                            className="p-[12px_24px] bg-white rounded-full text-black text-center font-semibold border border-[#E5E5E5]"
                        >
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
