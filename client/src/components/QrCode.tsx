import { useEffect, useState } from "react";
import useServerAddress from "../../useServerAddress";

import QRCode from "react-qr-code";
import AdminLandingTemplate from "./admin/AdminLandingTemplate";

const QrCode = () => {
    const [localIp, setLocalIp] = useState<string>("");
    const { port, host } = useServerAddress();

    useEffect(() => {
        setLocalIp(`${host}:${port}`);
    }, []);
    return (
        <AdminLandingTemplate
            description={
                <p className="text-softblack text-[1.5rem] font-semibold relative">
                    Powered by <br />
                    Paymong{" "}
                    <img
                        className="scale-15 absolute -top-[17%] -right-[38%] rounded-full"
                        src="/images/paymongo.jpg"
                        alt=""
                    />
                </p>
            }
            content={
                <div className="relative">
                    <img
                        className="scale-150 translate-y-[20%]"
                        src="/images/phone_border.png"
                        alt=""
                    />
                    <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        {" "}
                        <p className="w-full text-center text-softblack font-semibold mb-4 text-[1.2rem]">
                            {localIp}
                        </p>
                        {localIp && (
                            <QRCode
                                value={localIp}
                                size={390}
                                className="[box-shadow:-6px_6px_10px_rgba(0,0,0,0.6)] rounded-3xl"
                            />
                        )}
                    </span>
                </div>
            }
        />
    );
};

export default QrCode;
