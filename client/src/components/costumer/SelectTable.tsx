import axios from "axios";
import { memo, useEffect, useState } from "react";
import useServerAddress from "../../hooks/useServerAddress";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { Gi3dStairs } from "react-icons/gi";
interface Props {
    setPhase: React.Dispatch<React.SetStateAction<number>>;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const SelectTable = ({ setPhase, setCamPos, setCamRot }: Props) => {
    const { server } = useServerAddress();
    const [isLeftClicked, setIsLeftClicked] = useState<boolean>(false);
    const [isRightClicked, setIsRightClicked] = useState<boolean>(false);

    useEffect(() => {
        const fetchCostumer = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setPhase(0);
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };

                const response = await axios.get(`${server}/phase-1`, {
                    headers,
                    withCredentials: false,
                });

                console.log(response.data.costumer_name);
            } catch (error) {
                localStorage.removeItem("token");
                setPhase(0);
            }
        };

        fetchCostumer();
    });

    const handleLeftClick = () => {
        setIsLeftClicked(true);
        setIsRightClicked(false);
        setCamPos([19.19999999999998, 3.199999999999999, -18.199999999999992]);
        setCamRot([
            0.10200000000000006, 0.7500000000000002, 0.42000000000000015,
        ]);
    };
    const handleRightClick = () => {
        setIsLeftClicked(false);
        setIsRightClicked(true);
        setCamPos([19.79999999999999, 3.499999999999999, -17.29999999999998]);
        setCamRot([
            0.10200000000000006, -0.3600000000000005, -0.2900000000000002,
        ]);
    };
    const handleMidClick = () => {
        setIsLeftClicked(false);
        setIsRightClicked(false);
        setCamPos([19.19999999999998, 3.6999999999999993, -17.599999999999984]);
        setCamRot([
            0.10200000000000006, 0.029999999999999694, -0.019999999999999914,
        ]);
    };

    const frame_sec = 200;

    const handleNextFloor = () => {
        setCamPos([
            19.499999999999986, 1.6999999999999975, -17.499999999999982,
        ]);
        setCamRot([
            0.10140000000000005, -1.4200000000000013, -0.4500000000000003,
        ]);

        setTimeout(() => {
            setCamPos([
                23.000000000000036, 1.6999999999999975, -16.59999999999997,
            ]);
            setCamRot([
                0.10140000000000005, -1.5300000000000014, -0.4400000000000003,
            ]);

            setTimeout(() => {
                setCamPos([
                    24.00000000000005, 1.8999999999999975, -16.499999999999968,
                ]);
                setCamRot([
                    0.10150000000000005, -1.0000000000000009,
                    -0.4400000000000003,
                ]);
                setTimeout(() => {
                    setCamPos([
                        25.200000000000067, 2.1499999999999972,
                        -16.399999999999967,
                    ]);
                    setCamRot([
                        0.1, -0.16000000000000014, -0.030000000000000027,
                    ]);

                    setTimeout(() => {
                        setCamPos([
                            25.700000000000074, 2.3999999999999964,
                            -17.94999999999999,
                        ]);
                        setCamRot([
                            0.09949999999999999, 0.11999999999999984,
                            -0.030000000000000027,
                        ]);

                        setTimeout(() => {
                            setCamPos([
                                25.800000000000075, 2.999999999999994,
                                -19.200000000000006,
                            ]);
                            setCamRot([
                                0.09929999999999999, 0.9400000000000005,
                                -0.21000000000000008,
                            ]);
                            setTimeout(() => {
                                setCamPos([
                                    24.950000000000063, 3.149999999999993,
                                    -20.600000000000026,
                                ]);
                                setCamRot([
                                    0.10140000000000005, 2.629999999999988,
                                    0.1299999999999999,
                                ]);

                                setTimeout(() => {
                                    setCamPos([
                                        24.05000000000005, 3.149999999999993,
                                        -20.25000000000002,
                                    ]);
                                    setCamRot([
                                        0.10070000000000003, 3.179999999999976,
                                        -0.020000000000000087,
                                    ]);

                                    setTimeout(() => {
                                        setCamPos([
                                            24.250000000000053,
                                            3.9999999999999893,
                                            -18.399999999999995,
                                        ]);
                                        setCamRot([
                                            0.10070000000000003,
                                            2.8299999999999836,
                                            0.1199999999999999,
                                        ]);

                                        setTimeout(() => {
                                            setCamPos([
                                                24.05000000000005,
                                                4.899999999999986,
                                                -16.299999999999965,
                                            ]);
                                            setCamRot([
                                                0.10040000000000002,
                                                0.8800000000000003,
                                                0.07999999999999992,
                                            ]);
                                        }, frame_sec);
                                    }, frame_sec);
                                }, frame_sec);
                            }, frame_sec);
                        }, frame_sec);
                    }, frame_sec);
                }, frame_sec);
            }, frame_sec);
        }, 700);
    };

    return (
        <>
            <div className="w-full flex justify-center items-center p-6 bg-white/10 backdrop-blur-[10px] border-b-2 border-b-white/20">
                <h1 className="text-white text-4xl font-semibold text-shadow-lg">
                    Select Table
                </h1>
            </div>

            <button
                onClick={handleNextFloor}
                className=" text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 fixed top-[95%] left-1/2 translate-x-[-50%] translate-y-[-50%] hover:scale-105 transition-[0.2] active:scale-95 cursor-pointer pointer-events-auto"
            >
                <Gi3dStairs /> <p className="text-[1.25rem]">2nd Floor</p>
            </button>

            {!isLeftClicked && !isRightClicked ? (
                <>
                    <div className="fixed h-screen right-2 top-1/2">
                        <button
                            className="text-white text-shadow-lg text-5xl opacity-60 pointer-events-auto"
                            onClick={handleRightClick}
                        >
                            <FaGreaterThan />
                        </button>
                    </div>
                    <div className="fixed h-screen text-shadow-lg left-2 top-1/2">
                        <button
                            className="text-white text-5xl opacity-60 pointer-events-auto"
                            onClick={handleLeftClick}
                        >
                            <FaLessThan />
                        </button>
                    </div>
                </>
            ) : isLeftClicked && !isRightClicked ? (
                <>
                    <div className="fixed h-screen text-shadow-lg right-2 top-1/2">
                        <button
                            className="text-white text-5xl opacity-60 pointer-events-auto"
                            onClick={handleMidClick}
                        >
                            <FaGreaterThan />
                        </button>
                    </div>
                </>
            ) : !isLeftClicked && isRightClicked ? (
                <>
                    <div className="fixed h-screen text-shadow-lg left-2 top-1/2">
                        <button
                            className="text-white text-5xl opacity-60 pointer-events-auto"
                            onClick={handleMidClick}
                        >
                            <FaLessThan />
                        </button>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default memo(SelectTable);
