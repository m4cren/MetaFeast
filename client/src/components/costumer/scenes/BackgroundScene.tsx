import { Environment, useEnvironment } from "@react-three/drei";

const BackgroundScene = () => {
    const night = useEnvironment({
        files: "/textures/moonless_golf_2k.hdr",
    });

    return (
        <>
            <Environment map={night} background />
        </>
    );
};

export default BackgroundScene;
