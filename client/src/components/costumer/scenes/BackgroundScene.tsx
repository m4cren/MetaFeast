import { Environment, useEnvironment } from "@react-three/drei";
import useTimeOfDay from "../../../hooks/useTimeOfDay";

const BackgroundScene = () => {
    const timeOfDay = useTimeOfDay();

    const night = useEnvironment({
        files: "/textures/moonless_golf_2k.hdr",
    });

    const day = useEnvironment({
        files: "/textures/zwartkops_straight_afternoon_2k.hdr",
    });
    console.log(timeOfDay);
    return (
        <>
            <Environment map={night} background />
        </>
    );
};

export default BackgroundScene;
