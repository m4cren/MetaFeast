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
                    className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-3 bg-gradient-to-t from-darkbrown to-lightbrown [box-shadow:0_0_3px_rgba(0,0,0,0.4)_inset,0_0_8px_rgba(0,0,0,0.3)] backdrop-blur-[10px] rounded-2xl  hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
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
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-3 bg-gradient-to-t from-darkbrown to-lightbrown [box-shadow:0_0_3px_rgba(0,0,0,0.4)_inset,0_0_8px_rgba(0,0,0,0.3)] backdrop-blur-[10px] rounded-2xl hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <Cctv />
                            <p className="text-[1.25rem] w-max">Left View</p>
                        </button>
                        <button
                            onClick={handleViewTwo}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-3 backdrop-blur-[10px] rounded-2xl bg-gradient-to-t from-darkbrown to-lightbrown [box-shadow:0_0_3px_rgba(0,0,0,0.4)_inset,0_0_8px_rgba(0,0,0,0.3)] hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <Cctv />
                            <p className="text-[1.25rem] w-max">Right View</p>
                        </button>
                        <button
                            onClick={handleDefaultView}
                            className=" w-fit text-white text-shadow-lg text-[2rem] gap-2 flex flex-row items-center p-3 bg-gradient-to-t from-darkbrown to-lightbrown [box-shadow:0_0_3px_rgba(0,0,0,0.4)_inset,0_0_8px_rgba(0,0,0,0.3)] backdrop-blur-[10px] rounded-2xl  hover:scale-105 transition duration-200 active:scale-95 cursor-pointer"
                        >
                            <Cctv />
                            <p className="text-[1.25rem] w-max">Counter</p>
                        </button>
                    </>
                ) : null}
            </div>
        )
    );
};

export default memo(ViewControl);
