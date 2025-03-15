import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

const TABLE_POSITION = [
    [24.3, 3.98, -21.6],
    [24.3, 3.98, -24],
];
const TABLE_ID = ["B12", "B13"];

type TableProp = {
    position: number[];
    table_id: string;
};

const CavedSingleSeat = () => {
    const model = useGLTF("/models/single_seat_cave_packed.glb");

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

export default CavedSingleSeat;
