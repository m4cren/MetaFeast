import { memo, useState } from "react";
import { Gi3dStairs } from "react-icons/gi";
import { Cctv } from "lucide-react";
import useAdminCameraControl from "../../../hooks/useAdminCameraControl";

interface Props {
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    isTransitioning: boolean;
    setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewControl = ({
    setCamPos,
    setCamRot,
    isTransitioning,
    setIsTransitioning,
}: Props) => {
    const [floor, setFloor] = useState<number>(1);

    const {
        handleDefaultView,
        handleDownFloor,
        handleUpFloor,
        handleViewOne,
        handleViewTwo,
    } = useAdminCameraControl({
        setCamPos,
        setCamRot,
        setFloor,
        setIsTransitioning,
    });

    return (
        !isTransitioning && (
            <div className="pointer-events-auto  flex flex-row  items-center space-x-5">
                <button
                    onClick={floor === 1 ? handleUpFloor : handleDownFloor}
                    className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                >
                    <Gi3dStairs />

                    <p className="text-[1.25rem] w-max">
                        {floor === 1
                            ? "Go up stairs"
                            : floor === 2
                              ? "Go down stairs"
                              : null}
                    </p>
                </button>
                {floor === 1 ? (
                    <>
                        <button
                            onClick={handleViewOne}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <Cctv />
                            <p className="text-[1.25rem] w-max">View 1</p>
                        </button>
                        <button
                            onClick={handleViewTwo}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <Cctv />
                            <p className="text-[1.25rem] w-max">View 2</p>
                        </button>
                        <button
                            onClick={handleDefaultView}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-2 border-1 bg-white/10 backdrop-blur-[10px] rounded-2xl border-white/20 hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <Cctv />
                            <p className="text-[1.25rem] w-max">Default</p>
                        </button>
                    </>
                ) : null}
            </div>
        )
    );
};

export default memo(ViewControl);
