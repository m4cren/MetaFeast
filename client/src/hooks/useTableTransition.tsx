import useFrameProvider from "../frames/useFrameProvider";

interface Props {
    setSelectedTable: React.Dispatch<React.SetStateAction<string>>;
    setIsPicking: React.Dispatch<React.SetStateAction<boolean>>;
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
}

const useTableTransition = ({
    setSelectedTable,
    setIsPicking,
    setCamPos,
    setCamRot,
}: Props) => {
    const { select_table_Frames } = useFrameProvider();
    const transitionToTable = (table_id: string) => {
        switch (table_id) {
            case "A_1":
                setSelectedTable("A_1");
                setCamPos(select_table_Frames.table_A_1.frame1.pos);
                setCamRot(select_table_Frames.table_A_1.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_1.frame2.pos);
                    setCamRot(select_table_Frames.table_A_1.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_2":
                setSelectedTable("A_2");
                setCamPos(select_table_Frames.table_A_2.frame1.pos);
                setCamRot(select_table_Frames.table_A_2.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_2.frame2.pos);
                    setCamRot(select_table_Frames.table_A_2.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_3":
                setSelectedTable("A_3");
                setCamPos(select_table_Frames.table_A_3.frame1.pos);
                setCamRot(select_table_Frames.table_A_3.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_3.frame2.pos);
                    setCamRot(select_table_Frames.table_A_3.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_4":
                setSelectedTable("A_4");
                setCamPos(select_table_Frames.table_A_4.frame1.pos);
                setCamRot(select_table_Frames.table_A_4.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_4.frame2.pos);
                    setCamRot(select_table_Frames.table_A_4.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_5":
                setSelectedTable("A_5");
                setCamPos(select_table_Frames.table_A_5.frame1.pos);
                setCamRot(select_table_Frames.table_A_5.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_5.frame2.pos);
                    setCamRot(select_table_Frames.table_A_5.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_6":
                setSelectedTable("A_6");
                setCamPos(select_table_Frames.table_A_6.frame1.pos);
                setCamRot(select_table_Frames.table_A_6.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_6.frame2.pos);
                    setCamRot(select_table_Frames.table_A_6.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_7":
                setSelectedTable("A_7");
                setCamPos(select_table_Frames.table_A_7.frame1.pos);
                setCamRot(select_table_Frames.table_A_7.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_7.frame2.pos);
                    setCamRot(select_table_Frames.table_A_7.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_8":
                setSelectedTable("A_8");
                setCamPos(select_table_Frames.table_A_8.frame1.pos);
                setCamRot(select_table_Frames.table_A_8.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_8.frame2.pos);
                    setCamRot(select_table_Frames.table_A_8.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_9":
                setSelectedTable("A_9");
                setCamPos(select_table_Frames.table_A_9.frame1.pos);
                setCamRot(select_table_Frames.table_A_9.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_9.frame2.pos);
                    setCamRot(select_table_Frames.table_A_9.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_10":
                setSelectedTable("A_10");
                setCamPos(select_table_Frames.table_A_10.frame1.pos);
                setCamRot(select_table_Frames.table_A_10.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_10.frame2.pos);
                    setCamRot(select_table_Frames.table_A_10.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_11":
                setSelectedTable("A_11");
                setCamPos(select_table_Frames.table_A_11.frame1.pos);
                setCamRot(select_table_Frames.table_A_11.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_11.frame2.pos);
                    setCamRot(select_table_Frames.table_A_11.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_12":
                setSelectedTable("A_12");
                setCamPos(select_table_Frames.table_A_12.frame1.pos);
                setCamRot(select_table_Frames.table_A_12.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_12.frame2.pos);
                    setCamRot(select_table_Frames.table_A_12.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_13":
                setSelectedTable("A_13");
                setCamPos(select_table_Frames.table_A_13.frame1.pos);
                setCamRot(select_table_Frames.table_A_13.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_13.frame2.pos);
                    setCamRot(select_table_Frames.table_A_13.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_14":
                setSelectedTable("A_14");
                setCamPos(select_table_Frames.table_A_14.frame1.pos);
                setCamRot(select_table_Frames.table_A_14.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_14.frame2.pos);
                    setCamRot(select_table_Frames.table_A_14.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_15":
                setSelectedTable("A_15");
                setCamPos(select_table_Frames.table_A_15.frame1.pos);
                setCamRot(select_table_Frames.table_A_15.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_15.frame2.pos);
                    setCamRot(select_table_Frames.table_A_15.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "A_16":
                setSelectedTable("A_16");
                setCamPos(select_table_Frames.table_A_16.frame1.pos);
                setCamRot(select_table_Frames.table_A_16.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_A_16.frame2.pos);
                    setCamRot(select_table_Frames.table_A_16.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_1":
                setSelectedTable("B_1");
                setCamPos(select_table_Frames.table_B_1.frame1.pos);
                setCamRot(select_table_Frames.table_B_1.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_1.frame2.pos);
                    setCamRot(select_table_Frames.table_B_1.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_2":
                setSelectedTable("B_2");
                setCamPos(select_table_Frames.table_B_2.frame1.pos);
                setCamRot(select_table_Frames.table_B_2.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_2.frame2.pos);
                    setCamRot(select_table_Frames.table_B_2.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_3":
                setSelectedTable("B_3");
                setCamPos(select_table_Frames.table_B_3.frame1.pos);
                setCamRot(select_table_Frames.table_B_3.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_3.frame2.pos);
                    setCamRot(select_table_Frames.table_B_3.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_4":
                setSelectedTable("B_4");
                setCamPos(select_table_Frames.table_B_4.frame1.pos);
                setCamRot(select_table_Frames.table_B_4.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_4.frame2.pos);
                    setCamRot(select_table_Frames.table_B_4.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_5":
                setSelectedTable("B_5");
                setCamPos(select_table_Frames.table_B_5.frame1.pos);
                setCamRot(select_table_Frames.table_B_5.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_5.frame2.pos);
                    setCamRot(select_table_Frames.table_B_5.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_6":
                setSelectedTable("B_6");
                setCamPos(select_table_Frames.table_B_6.frame1.pos);
                setCamRot(select_table_Frames.table_B_6.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_6.frame2.pos);
                    setCamRot(select_table_Frames.table_B_6.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_7":
                setSelectedTable("B_7");
                setCamPos(select_table_Frames.table_B_7.frame1.pos);
                setCamRot(select_table_Frames.table_B_7.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_7.frame2.pos);
                    setCamRot(select_table_Frames.table_B_7.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_8":
                setSelectedTable("B_8");
                setCamPos(select_table_Frames.table_B_8.frame1.pos);
                setCamRot(select_table_Frames.table_B_8.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_8.frame2.pos);
                    setCamRot(select_table_Frames.table_B_8.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_9":
                setSelectedTable("B_9");
                setCamPos(select_table_Frames.table_B_9.frame1.pos);
                setCamRot(select_table_Frames.table_B_9.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_9.frame2.pos);
                    setCamRot(select_table_Frames.table_B_9.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_10":
                setSelectedTable("B_10");
                setCamPos(select_table_Frames.table_B_10.frame1.pos);
                setCamRot(select_table_Frames.table_B_10.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_10.frame2.pos);
                    setCamRot(select_table_Frames.table_B_10.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_11":
                setSelectedTable("B_11");
                setCamPos(select_table_Frames.table_B_11.frame1.pos);
                setCamRot(select_table_Frames.table_B_11.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_11.frame2.pos);
                    setCamRot(select_table_Frames.table_B_11.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_12":
                setSelectedTable("B_12");
                setCamPos(select_table_Frames.table_B_12.frame1.pos);
                setCamRot(select_table_Frames.table_B_12.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_12.frame2.pos);
                    setCamRot(select_table_Frames.table_B_12.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
            case "B_13":
                setSelectedTable("B_13");
                setCamPos(select_table_Frames.table_B_13.frame1.pos);
                setCamRot(select_table_Frames.table_B_13.frame1.rot);

                setTimeout(() => {
                    setCamPos(select_table_Frames.table_B_13.frame2.pos);
                    setCamRot(select_table_Frames.table_B_13.frame2.rot);

                    setIsPicking(true);
                }, 1100);
                break;
        }
    };
    return transitionToTable;
};

export default useTableTransition;
