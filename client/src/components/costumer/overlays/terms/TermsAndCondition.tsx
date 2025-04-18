import { LogOut, Handshake } from "lucide-react";
import React, { useState } from "react";
interface TermsAndConditionProps {
    setIsTermsAndCondition: React.Dispatch<React.SetStateAction<boolean>>;
}

const sections = [
    {
        title: "1. Acceptance of Terms",
        content:
            "By accessing or using this website or service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using the website or services.",
    },
    {
        title: "2. Use of the Service",
        content:
            "You agree to use this website or service solely for lawful purposes and in a manner that does not infringe on the rights of others or interfere with their ability to use and enjoy the website or service.",
    },
    {
        title: "3. Accounts",
        content:
            "Providing an email address when submitting a review is entirely optional. However, certain information—such as card details and the cardholder's name—may be collected as part of processing online payments. All personal and transactional information is handled securely and used solely for payment processing and related purposes.",
    },
    {
        title: "4. Intellectual Property",
        content:
            "You may not copy, reproduce, or distribute any content without permission.",
    },
    {
        title: "5. Limitation and Liability",
        content:
            "We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use of our website or services.",
    },
];

const TermsAndCondition = ({
    setIsTermsAndCondition,
}: TermsAndConditionProps) => {
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
                <Handshake />
                <h1 className="text-[1.6rem]">Terms and Condition</h1>
                <i
                    className="absolute right-4 opacity-70"
                    onClick={() => setIsTermsAndCondition(false)}
                >
                    <LogOut size={20} />
                </i>
            </div>
            <div className="flex flex-col gap-3 p-6 h-[70vh] w-[90vw] mt-4 bg-gradient-to-b from-lightbrown to-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                <p className="text-white/65 font-extralight leading-5">
                    These Terms and Conditions govern your use of our website
                    and services. By accessing or using our website, you agree
                    to be bound by these terms.
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

export default TermsAndCondition;
