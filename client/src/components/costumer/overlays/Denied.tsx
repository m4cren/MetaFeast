import { ShieldX } from "lucide-react";

interface DenyProps {
    denyMessage: string;
}

const Denied = ({ denyMessage }: DenyProps) => {
    return (
        <div className="fixed z-10 w-full gap-2 h-screen flex justify-center items-center flex-col bg-black/20 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]  ">
            <p className=" text-white/65">
                <ShieldX size={170} />
            </p>

            <h1 className="text-primary text-[1.3rem] min-[390px]:text-[1.45rem] text-shadow-md text-center">
                Unfortunately, your request was declined by the owner.
            </h1>
            <p className="text-white/60 text-[0.85rem] min-[390px]:text-[0.95rem] text-shadow-md font-extralight">
                {denyMessage}
            </p>
        </div>
    );
};

export default Denied;
