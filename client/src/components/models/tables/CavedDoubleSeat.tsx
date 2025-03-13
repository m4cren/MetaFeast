import { useGLTF } from "@react-three/drei";

interface Props {
    position: [number, number, number];
    tableID: string;
}

const CavedDoubleSeat = ({ position, tableID }: Props) => {
    const model = useGLTF("/models/two_seat_cave_packed.glb");
    return (
        <object3D position={position} onClick={() => alert(tableID)}>
            <primitive object={model.scene.clone()} />
        </object3D>
    );
};

export default CavedDoubleSeat;
