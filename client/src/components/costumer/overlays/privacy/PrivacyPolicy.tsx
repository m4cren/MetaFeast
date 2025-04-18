import { LogOut, LockKeyhole } from "lucide-react";
import React, { useState } from "react";
interface PrivacyPolicyProps {
    setIsPrivacyPolicy: React.Dispatch<React.SetStateAction<boolean>>;
}

const sections = [
    {
        title: "What information do we collect about you?",
        content:
            "We may collect information such as your nickname or alias, seat/table selections, order details, and basic device data to enhance your experience.",
    },
    {
        title: "How do we use your information?",
        content:
            "We use your data to manage your seating, process orders, improve the user interface, and support service performance.",
    },
    {
        title: "To whom do we disclose your information?",
        content:
            "We only share your information with admin (for approval), service providers helping us maintain the platform.",
    },
];

const PrivacyPolicy = ({ setIsPrivacyPolicy }: PrivacyPolicyProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleSection = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <div className="flex flex-col items-center fixed w-full h-screen z-10 bg-black/40">
            <div className="w-full h-fit flex flex-row justify-around">
                <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
                <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
            </div>
            <div className="relative flex flex-row items-center justify-center gap-2 py-4 w-[90vw] text-primary bg-gradient-to-b from-lightbrown to-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                <LockKeyhole />
                <h1 className="text-[1.6rem]">Privacy Policy</h1>
                <i
                    className="absolute right-4 opacity-70"
                    onClick={() => setIsPrivacyPolicy(false)}
                >
                    <LogOut size={20} />
                </i>
            </div>
            <div className="flex flex-col gap-3 p-6 h-[70vh] w-[90vw] mt-4 bg-gradient-to-b from-lightbrown to-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                <p className="text-white/65 font-extralight leading-5">
                    We want you to know exactly how Metafeast services work and
                    why we need your details. Reviewing our privacy policy will
                    help you continue using the website with peace of mind.
                </p>
                {sections.map((section, index) => (
                    <div key={index} className="border-b border-white/30 pb-2">
                        <button
                            onClick={() => toggleSection(index)}
                            className="w-full text-left font-semibold text-white/90 focus:outline-none"
                        >
                            {section.title}
                        </button>
                        {activeIndex === index && (
                            <div className="mt-2 text-sm font-extralight leading-relaxed text-white/65">
                                {section.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrivacyPolicy;
