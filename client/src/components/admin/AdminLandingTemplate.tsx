import { Canvas, useFrame } from "@react-three/fiber";
import Landscape from "../models/Landscape";
import { ReactElement, useRef, useState } from "react";
import * as THREE from "three";

interface AdminTemplateProps {
    description: ReactElement;
    content: ReactElement;
}

const Sphere = () => {
    const sphereRef = useRef<THREE.Mesh>(null);
    const [size, setSize] = useState<number>(1);
    const [speed, setSpeed] = useState<number>(0.3);

    const handleHover = () => {
        setSize(1.2);
        setSpeed(0.04);
    };
    const handleOutHover = () => {
        setSize(1);
        setSpeed(0.09);
    };

    useFrame((_, delta) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x += delta * speed;
            sphereRef.current.rotation.y += delta * speed;
            sphereRef.current.rotation.z += delta * speed;
        }
    });

    return (
        <mesh
            ref={sphereRef}
            onPointerEnter={handleHover}
            onPointerLeave={handleOutHover}
        >
            {" "}
            <sphereGeometry args={[2.5 * size, 25, 20, 20]} />
            <meshStandardMaterial color={"brown"} wireframe />
        </mesh>
    );
};

const AdminLandingTemplate = ({ description, content }: AdminTemplateProps) => {
    return (
        <div className="fixed w-full h-screen z-10 bg-[#f5f5f5]">
            <div className="fixed w-full h-screen flex flex-row items-center justify-center z-11">
                <div className="flex flex-col items-center gap-2 justify-center w-[48rem] h-[35rem]">
                    <div className="relative flex flex-row items-center justify-between w-[75%]">
                        <div
                            className={`absolute w-[20rem] h-[20rem] opacity-20   -top-30 -left-40 transition duration-200`}
                        >
                            <Canvas>
                                <ambientLight intensity={0.6} />
                                <Sphere />
                            </Canvas>
                        </div>
                        <h1 className="text-softblack text-[4.5rem] font-bold">
                            Metafeast
                        </h1>
                        <span className="w-[4px] h-[95px] rounded-t-full rounded-b-full bg-softblack "></span>
                        {description}
                    </div>
                    <div>
                        <p className="text-center leading-6 text-softblack text-[1.1rem] font-semibold">
                            An immersive 3D costumer interface tailored for
                            intuitive <br />
                            and engaging restaurant interactions.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 items-center justify-center w-[48rem] h-screen ">
                    {content}
                </div>
            </div>
            <Canvas camera={{ fov: 79 }}>
                <Landscape
                    url="/models/landscape_layers/layer1.glb"
                    color="665236"
                    type="even"
                />
                <Landscape
                    url="/models/landscape_layers/layer2.glb"
                    color="735d3f"
                    type="odd"
                />
                <Landscape
                    url="/models/landscape_layers/layer3.glb"
                    color="806847"
                    type="even"
                />
                <Landscape
                    url="/models/landscape_layers/layer4.glb"
                    color="8d734f"
                    type="odd"
                />
                <Landscape
                    url="/models/landscape_layers/layer5.glb"
                    color="9a7e57"
                    type="even"
                />
            </Canvas>
        </div>
    );
};

export default AdminLandingTemplate;
