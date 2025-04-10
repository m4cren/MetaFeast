import { CircleAlert } from "lucide-react";

interface DenyConfirmationProps {
    setIsDenyConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    handleDeny: (
        tableSelected: string,
        costumerName: string,
        message: string,
    ) => void;
    costumer_name: string;
    table_selected: string;
}

const DenyConfirmation = ({
    setIsDenyConfirm,
    handleDeny,
    costumer_name,
    table_selected,
}: DenyConfirmationProps) => {
    return (
        <div className="bg-black/40 fixed w-full h-screen flex items-center justify-center z-10 cursor-copy">
            <div className="bg-white/90 rounded-3xl w-[65vw] h-[20rem] flex flex-col items-center justify-center gap-8 pointer-events-auto pop-up-animation">
                <CircleAlert size={50} />
                <h1 className="text-4xl">
                    Please select the appropriate reason:
                </h1>

                <div className="flex flex-row items-center gap-8">
                    <button
                        onClick={() => {
                            setIsDenyConfirm(false);
                            handleDeny(
                                table_selected,
                                costumer_name,
                                "Someone has already occupied the table",
                            );
                        }}
                        className="px-4 py-2 font-light text-primary text-[1.1rem] bg-gradient-to-t text-shadow-md from-darkbrown to-lightbrown rounded-2xl cursor-pointer [box-shadow:-2px_2px_5px_rgba(0,0,0,0.4)]"
                    >
                        Someone has already occupied the table
                    </button>
                    <button
                        onClick={() => {
                            setIsDenyConfirm(false);
                            handleDeny(
                                table_selected,
                                costumer_name,
                                "The table appears unoccupied (no person detected)",
                            );
                        }}
                        className="px-4 py-2 font-light text-primary text-[1.1rem] bg-gradient-to-t text-shadow-md from-darkbrown to-lightbrown rounded-2xl cursor-pointer [box-shadow:-2px_2px_5px_rgba(0,0,0,0.4)]"
                    >
                        The table appears unoccupied (no person detected)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DenyConfirmation;
