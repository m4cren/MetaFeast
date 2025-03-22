interface Props {
    message: string;
}

const RequestNotification = ({ message }: Props) => {
    return (
        <div className="h-[4rem] rounded-2xl bg-white flex flex-row items-center justify-between px-2 w-full notification-animation">
            <p className="text-black">{message}</p>

            <div className="flex flex-row items-center space-x-2">
                <button className="bg-red-400 p-2 rounded-2xl cursor-pointer">
                    Deny
                </button>
                <button className="bg-green-400 p-2 rounded-2xl cursor-pointer">
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RequestNotification;
