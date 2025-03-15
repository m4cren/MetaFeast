import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

const TABLE_POSITION = [
    [14.2, 0.76, -18.3],
    [14.2, 0.76, -19.6],
    [14.2, 0.76, -20.9],
    [14.2, 0.76, -22.2],
    [14.2, 0.76, -23.5],
    [14.2, 0.76, -24.8],
];
const TABLE_ID = ["A1", "A2", "A3", "A4", "A5", "A6"];

type TableProp = {
    position: number[];
    table_id: string;
};
const SingleSeat = () => {
    const model = useGLTF("/models/single_seat_packed.glb");

    const [table, setTable] = useState<TableProp[]>([]);

    useEffect(() => {
        const setTableProp = () => {
            const temp: TableProp[] = [];
            for (let i = 0; i < TABLE_ID.length; i++) {
                let newValue = {
                    position: TABLE_POSITION[i],
                    table_id: TABLE_ID[i],
                };

                temp.push(newValue);
            }

            setTable(temp);
        };

        setTableProp();
    }, []);

    const handleClick = (table_id: string) => {
        alert(table_id);
    };

    return table.map(({ position, table_id }, index) => (
        <object3D
            key={index}
            position={[position[0], position[1], position[2]]}
            onClick={() => handleClick(table_id)}
        >
            <primitive object={model.scene.clone()} />
        </object3D>
    ));
};

export default SingleSeat;
