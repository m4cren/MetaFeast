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
            <div className="bg-white/90 rounded-4xl w-[40vw] h-[20rem] flex flex-col items-center justify-center gap-8 pointer-events-auto pop-up-animation">
                <h1 className="text-4xl">What is the reason?</h1>

                <div className="flex flex-row items-center gap-8">
                    <button
                        onClick={() => {
                            setIsDenyConfirm(false);
                            handleDeny(
                                table_selected,
                                costumer_name,
                                "Someone get there first",
                            );
                        }}
                        className="p-2 border-1 rounded-2xl border-black/50 cursor-pointer"
                    >
                        Someone get there first
                    </button>
                    <button
                        onClick={() => {
                            setIsDenyConfirm(false);
                            handleDeny(
                                table_selected,
                                costumer_name,
                                "There is no human on that table",
                            );
                        }}
                        className="p-2 border-1 rounded-2xl border-black/50 cursor-pointer"
                    >
                        There is no human on that table
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DenyConfirmation;
