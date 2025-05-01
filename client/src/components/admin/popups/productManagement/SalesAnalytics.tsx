import {
    Wallet,
    History,
    ChartSpline,
    HandCoins,
    ChartBarBig,
} from "lucide-react";

import { Bar, Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import useServerAddress from "../../../../../useServerAddress";
import axios from "axios";
import { HistoryType } from "../../../../types/types";
import useTimeOfDay from "../../../../hooks/useTimeOfDay";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const SalesAnalytics = () => {
    const [chartType, setChartType] = useState<boolean>(true);
    const { server } = useServerAddress();
    const [historyData, setHistoryData] = useState<HistoryType[]>([]);
    const [filteredHistoryData, setFilteredHistoryData] = useState<
        HistoryType[]
    >([]);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [totalSales, setTotalSales] = useState<number>(0);

    const { yearNow, monthNow } = useTimeOfDay();

    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [availableYears, setAvailableYears] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("Overall");

    const fetchHistoryData = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(`${server}/admin/fetch-history`, {
                headers,
            });

            const datas: HistoryType[] = response.data.histories;

            datas.forEach(
                ({
                    costumer_name,
                    dine_time,
                    orders,
                    payment_id,
                    payment_method,
                    table_seated,
                    total_order_items,
                    total_payment,
                }) => {
                    setHistoryData((prev) => [
                        ...prev,
                        {
                            costumer_name: costumer_name,
                            dine_time: dine_time,
                            orders: orders,
                            payment_id: payment_id,
                            payment_method: payment_method,
                            table_seated: table_seated,
                            total_order_items: total_order_items,
                            total_payment: total_payment,
                            formatted_date: convertTime(dine_time),
                            year: dine_time.slice(0, 4),
                        },
                    ]);
                },
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeFilter = (filterer: string) => {
        if (filterer === "This Year") {
            const filteredHistory = historyData.filter(({ dine_time }) =>
                dine_time.includes(yearNow.toString()),
            );

            setFilteredHistoryData(filteredHistory);
        } else if (filterer === "This Month") {
            const thisMonth = historyData.filter(
                ({ dine_time }) =>
                    dine_time.slice(5, 7) ===
                        monthNow.toString().toString().padStart(2, "0") &&
                    dine_time.includes(yearNow.toString()),
            );

            setFilteredHistoryData(thisMonth);
        } else if (filterer === "Overall") {
            setFilteredHistoryData(historyData);
        } else {
            const filteredHistory = historyData.filter(({ dine_time }) =>
                dine_time.includes(filterer),
            );

            setFilteredHistoryData(filteredHistory);
        }
    };

    useEffect(() => {
        let total_rev = 0;
        let total_sales = filteredHistoryData.length;
        filteredHistoryData.forEach(({ total_payment }) => {
            total_rev += total_payment;
        });

        setTotalRevenue(total_rev);
        setTotalSales(total_sales);
    }, [filteredHistoryData]);

    const convertTime = (date: string) => {
        const getYear = date.slice(0, 4);
        const getMonth = date.slice(5, 7);
        const getDay = date.slice(8, 10);

        return `${
            getMonth === "01"
                ? "Jan"
                : getMonth === "02"
                  ? "Feb"
                  : getMonth === "03"
                    ? "Mar"
                    : getMonth === "04"
                      ? "Apr"
                      : getMonth === "05"
                        ? "May"
                        : getMonth === "06"
                          ? "Jun"
                          : getMonth === "07"
                            ? "Jul"
                            : getMonth === "08"
                              ? "Aug"
                              : getMonth === "09"
                                ? "Sep"
                                : getMonth === "10"
                                  ? "Oct"
                                  : getMonth === "11"
                                    ? "Nov"
                                    : getMonth === "12"
                                      ? "Dec"
                                      : null
        } ${getDay}, ${getYear}`;
    };

    useEffect(() => {
        setFilteredHistoryData(historyData);

        let available_years: string[] = [];

        historyData.map(({ dine_time }, index, reviews) => {
            if (index < reviews.length - 1) {
                if (
                    dine_time.slice(0, 4) !==
                    reviews[index + 1].dine_time.slice(0, 4)
                ) {
                    available_years.push(reviews[index].dine_time.slice(0, 4));
                }
            }
        });

        setAvailableYears(available_years);
    }, [historyData]);

    useEffect(() => {
        console.log(filteredHistoryData);
    }, [filter]);

    useEffect(() => {
        fetchHistoryData();
    }, []);

    const groupedDate = filteredHistoryData.reduce<Record<string, number>>(
        (tot_Pay, current) => {
            const date = current.formatted_date
                ? current.formatted_date
                : "Unknown Date";

            const for_overall = current.year ? current.year : "Unknown Year";

            const for_this_year = current.formatted_date
                ? current.formatted_date.slice(0, 3)
                : "Unknown Month";

            if (filter === "Overall") {
                if (!tot_Pay[for_overall]) {
                    tot_Pay[for_overall] = 0;
                }

                tot_Pay[for_overall] += current.total_payment;
                return tot_Pay;
            } else if (
                filter === "This Year" ||
                availableYears.find((year) => year === filter)
            ) {
                if (!tot_Pay[for_this_year]) {
                    tot_Pay[for_this_year] = 0;
                }

                tot_Pay[for_this_year] += current.total_payment;
                return tot_Pay;
            } else {
                if (!tot_Pay[date]) {
                    tot_Pay[date] = 0;
                }

                tot_Pay[date] += current.total_payment;
                return tot_Pay;
            }
        },
        {},
    );

    return (
        <div className="text-pop-up-animation flex flex-col px-12 py-8 gap-4">
            <div className="relative flex flex-row items-center justify-between">
                <div className="flex flex-col leading-6">
                    <h1 className="text-primary text-[1.75rem] text-shadow-md font-medium">
                        Sales Analytics
                    </h1>
                    <p className=" text-[0.75rem] font-extralight text-white/60">
                        Monitor your sales here
                    </p>
                </div>

                <button
                    onClick={() => setIsFilter(!isFilter)}
                    className="border-1 cursor-pointer border-white/30 rounded-md text-primary text-[1.1rem] font-light py-2 px-12"
                >
                    {filter}
                </button>
                {isFilter && (
                    <div className="absolute flex flex-col items-center gap-2 py-2 px-3 top-[60%] right-[18%] z-10 w-[10rem] h-fit rounded-b-md rounded-tl-md bg-gradient-to-b from-darkbrown to-lightbrown [box-shadow:0_0_3px_rgba(0,0,0,0.3)_inset,0_0_8px_rgba(0,0,0,0.3)]">
                        <h1 className="text-white/80 text-[0.9rem] font-light py-1 w-full text-center border-white/30 border-b-1">
                            Filter Date
                        </h1>
                        <button
                            onClick={() => {
                                setFilter("This Year");
                                setIsFilter(false);
                                handleChangeFilter("This Year");
                            }}
                            className="cursor-pointer text-secondary border-1 rounded-sm py-1 px-3 border-white/20"
                        >
                            This Year
                        </button>
                        <button
                            onClick={() => {
                                setFilter("This Month");
                                setIsFilter(false);
                                handleChangeFilter("This Month");
                            }}
                            className="cursor-pointer text-secondary border-1 rounded-sm py-1 px-3 border-white/20"
                        >
                            This Month
                        </button>
                        <button
                            onClick={() => {
                                setFilter("Overall");
                                setIsFilter(false);
                                handleChangeFilter("Overall");
                            }}
                            className="cursor-pointer text-secondary border-1 rounded-sm py-1 px-3 border-white/20"
                        >
                            Overall
                        </button>

                        <details className="text-secondary flex flex-col items-center">
                            <summary className="cursor-pointer">
                                Select a year
                            </summary>
                            {availableYears.length === 0 && (
                                <p className="text-[0.7rem]">
                                    No data in the past
                                </p>
                            )}
                            {availableYears.map((year, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setFilter(year);
                                        setIsFilter(false);
                                        handleChangeFilter(year);
                                    }}
                                    className="text-[0.7rem] cursor-pointer list-none"
                                >
                                    {year}
                                </li>
                            ))}
                        </details>
                    </div>
                )}
            </div>

            <div className="flex flex-row items-center justify-center gap-4 mt-4">
                <div className="flex flex-row items-center px-10 justify-between bg-gradient-to-t to-lightbrown from-darkbrown gap-2 rounded-lg w-[60%] h-[6.8rem] [box-shadow:-2px_3px_3px_rgba(0,0,0,0.2)]">
                    <div className="flex flex-row items-center gap-2">
                        <div>
                            <button className="bg-darkbrown/40 text-primary rounded-full p-2 h-fit w-fit ">
                                <Wallet size={35} strokeWidth={1.5} />
                            </button>
                        </div>
                        <div className="leading-7">
                            <p className="text-white/65 text-[0.8rem] font-extralight">
                                Total ROI{" "}
                                {filter.includes("This") ||
                                filter.includes("Overall")
                                    ? filter.toLowerCase()
                                    : `on ${filter}`}
                            </p>
                            <h1 className="text-primary text-[1.9rem]">
                                ₱ {totalRevenue.toLocaleString()}
                            </h1>
                        </div>
                    </div>

                    <div className="text-primary ml-10">
                        <ChartSpline
                            size={70}
                            strokeWidth={0.8}
                            opacity={0.8}
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between px-6 bg-gradient-to-t to-lightbrown from-darkbrown gap-2 rounded-lg w-[40%] h-[6.8rem] [box-shadow:-2px_3px_3px_rgba(0,0,0,0.2)]">
                    <div className="flex flex-row items-center gap-2 ">
                        <div>
                            <button className="bg-darkbrown/40 text-primary rounded-full p-2 h-fit w-fit">
                                <History size={35} strokeWidth={1.5} />
                            </button>
                        </div>
                        <div className="leading-9">
                            <p className="text-white/65 text-[0.8rem] font-extralight leading-3">
                                Total Sales{" "}
                                {filter.includes("This") ||
                                filter.includes("Overall")
                                    ? filter.toLowerCase()
                                    : `on ${filter}`}
                            </p>
                            <h1 className="text-primary text-[1.9rem]">
                                {totalSales}
                            </h1>
                        </div>
                    </div>

                    <div className="text-primary">
                        <ChartSpline
                            size={70}
                            strokeWidth={0.8}
                            opacity={0.8}
                        />
                    </div>
                </div>
            </div>

            <div className="border-darkbrown/50 border-2 rounded-lg [box-shadow:-2px_3px_3px_rgba(0,0,0,0.2)] w-full h-[24rem]">
                <div className="flex flex-row items-center justify-between px-8 py-3">
                    <div className="flex flex-row items-center gap-2">
                        <i className="text-primary">
                            <HandCoins size={20} />
                        </i>
                        <h1 className="text-primary font-extralight text-[1.1rem]">
                            Sales Revenue
                        </h1>
                    </div>
                    <button
                        onClick={() => setChartType(!chartType)}
                        className="text-secondary flex flex-row items-center gap-2 border-white/20 border-1 rounded-sm px-2 py-1 cursor-pointer"
                    >
                        {!chartType ? "Line" : "Bar"}
                        {!chartType ? (
                            <ChartSpline size={15} />
                        ) : (
                            <ChartBarBig size={15} />
                        )}
                    </button>
                </div>
                <div className="flex items-center justify-center w-full">
                    {!chartType ? (
                        <Line
                            data={{
                                labels: Object.keys(groupedDate),
                                datasets: [
                                    {
                                        label: "Revenue",
                                        data: Object.values(groupedDate),
                                        borderColor: "#f5f5f575",
                                        tension: 0.4,
                                        borderWidth: 1.5,
                                    },
                                ],
                            }}
                            options={{
                                color: "#f5f5f575",

                                scales: {
                                    x: {
                                        ticks: {
                                            color: "#f5f5f575",
                                            stepSize: 4,
                                        },
                                        grid: {
                                            color: "#f5f5f520",
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            color: "#f5f5f575",
                                        },
                                        grid: {
                                            color: "#f5f5f520",
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <Bar
                            data={{
                                labels: Object.keys(groupedDate),
                                datasets: [
                                    {
                                        label: "Revenue",
                                        data: Object.values(groupedDate),
                                        borderColor: "#f5f5f5",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: 10,
                                        hoverBackgroundColor: "#f5f5f580",
                                    },
                                ],
                            }}
                            options={{
                                color: "#f5f5f5",

                                scales: {
                                    x: {
                                        ticks: {
                                            color: "#f5f5f575",
                                            stepSize: 4,
                                        },
                                        grid: {
                                            color: "#f5f5f520",
                                        },
                                    },
                                    y: {
                                        ticks: {
                                            color: "#f5f5f575",
                                        },
                                        grid: {
                                            color: "#f5f5f520",
                                        },
                                    },
                                },
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesAnalytics;
