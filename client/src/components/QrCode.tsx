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
                    <span className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        {" "}
                        <p className="w-full  letter tracking-widest   text-softblack font-bold mb-4 text-[1.25rem] typing-demo">
                            19x.xxx.3x.:6x69
                        </p>
                        {localIp && (
                            <QRCode
                                value={localIp}
                                size={390}
                                className=" rounded-3xl "
                                bgColor="#f5f5f500"
                                fgColor="#2c2c2c"
                                level="M"
                            />
                        )}
                    </span>
                </div>
            }
        />
    );
};

export default QrCode;
