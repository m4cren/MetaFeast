const WaitingPaymentConfirmation = () => {
    return (
        <div className="fixed w-full gap-2 h-screen flex justify-center items-center flex-col bg-black/20 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] ">
            <span className="loader-white translate-y-[-4rem] opacity-70"></span>
            <h1 className="text-primary text-[1.5rem] min-[390px]:text-[1.7rem] text-center text-shadow-md">
                We're just confirming your payment, Please bear with us!
            </h1>
        </div>
    );
};

export default WaitingPaymentConfirmation;
