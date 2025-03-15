import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

const TABLE_POSITION = [
    [15.3, 0.76, -19],
    [15.3, 0.76, -22.3],
    [21.3, 0.76, -19],
    [21.3, 0.76, -22.3],
    [16.4, 3.98, -18.4],
    [16.4, 3.98, -21.5],
];
const TABLE_ID = ["A7", "A8", "A15", "A16", "B4", "B5"];

type TableProp = {
    position: number[];
    table_id: string;
};
const QuadSeat = () => {
    const model = useGLTF("/models/four_seat_packed.glb");
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

export default QuadSeat;
