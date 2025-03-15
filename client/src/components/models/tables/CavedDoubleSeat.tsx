import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

const TABLE_POSITION = [
    [14, 3.98, -17.5],
    [14, 3.98, -20.2],
    [14, 3.98, -22.9],
];

const TABLE_ID = ["B1", "B2", "B3"];

type TableProp = {
    position: number[];
    table_id: string;
};

const CavedDoubleSeat = () => {
    const model = useGLTF("/models/two_seat_cave_packed.glb") as any;
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
        console.log(table_id);
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

export default CavedDoubleSeat;
