import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

const TABLE_POSITION = [
    [19, 3.98, -17.5],
    [19, 3.98, -20.25],
    [19, 3.98, -23],
    [21, 3.98, -17.5],
    [21, 3.98, -20.25],
    [21, 3.98, -23],
    [17.75, 0.76, -18.5],
    [17.75, 0.76, -21],
    [17.75, 0.76, -23.5],
    [19.4, 0.76, -18.5],
    [19.4, 0.76, -21],
    [19.4, 0.76, -23.5],
];
const TABLE_ID = [
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
    "B11",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
];

type TableProp = {
    position: number[];
    table_id: string;
};
const DoubleSeat = () => {
    const model = useGLTF("/models/two_seat_packed.glb");
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

export default DoubleSeat;
