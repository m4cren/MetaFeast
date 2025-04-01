import { useEffect, useState } from "react";
import useServerAddress from "../../useServerAddress";

import QRCode from "react-qr-code";

const QrCode = () => {
    const [localIp, setLocalIp] = useState<string>("");
    const { port, host } = useServerAddress();

    useEffect(() => {
        setLocalIp(`${host}:${port}`);
    }, []);
    return (
        <div className="fixed flex justify-center items-center z-20 bg-[#dfdfdf] top-0 left-0 right-0 bottom-0">
            <div className=" p-10 flex flex-col items-center gap-5">
                <h1 className="text-shadow-lg text-dark-primary text-4xl">
                    Scan to Access
                </h1>
                {localIp && <QRCode value={localIp} size={500} />}
                <p className="text-shadow-lg text-dark-secondary">{localIp}</p>
            </div>
        </div>
    );
};

export default QrCode;
