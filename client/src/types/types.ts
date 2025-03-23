export interface TableStatus {
    table_name: string;
    table_status: "Available" | "Occupied";
    table_type: "Single_seat" | "Double_seat" | "Quad_seat";
    table_position: [number, number, number];
    costumer_status: "Available" | "Ordering" | "Eating" | "Billing";
    costumer_name: string;
}

export interface Props {
    cameraFunctions: {
        addPosX: () => void;
        addPosY: () => void;
        addPosZ: () => void;
        addRotX: () => void;
        addRotY: () => void;
        addRotZ: () => void;

        minusPosX: () => void;
        minusPosY: () => void;
        minusPosZ: () => void;
        minusRotX: () => void;
        minusRotY: () => void;
        minusRotZ: () => void;
    };
}

export type NotificationType = {
    message: string;
    costumerName: string;
    tableID: string;
};

export interface SelectTableControl {
    floor: number;
    costumerName: string;
    selectedTable: string;
    setFloor: React.Dispatch<React.SetStateAction<number>>;
    setIsLeftClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setIsRightClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPicking: React.Dispatch<React.SetStateAction<boolean>>;
}
