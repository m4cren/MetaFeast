import { useCameraTransition } from "../hooks/useCameraTransition";

const CameraController = ({
    position,
    rotation,
}: {
    position: [number, number, number];
    rotation: [number, number, number];
}) => {
    useCameraTransition(position, rotation);
    return null;
};

export default CameraController;
