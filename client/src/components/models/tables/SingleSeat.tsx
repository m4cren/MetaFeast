import { useGLTF } from "@react-three/drei";
interface Props {
    position: [number, number, number];
    tableID: string;
}
const SingleSeat = ({ position, tableID }: Props) => {
    const model = useGLTF("/models/single_seat_packed.glb");

    return (
        <object3D position={position} onClick={() => alert(tableID)}>
            <primitive object={model.scene.clone()} />
        </object3D>
    );
};

export default SingleSeat;
