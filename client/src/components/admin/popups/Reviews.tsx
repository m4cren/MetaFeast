import { LogOut, ListFilter } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import useServerAddress from "../../../../useServerAddress";
import axios from "axios";
interface ReviewProps {
    setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
}

import { ReviewTypes } from "../../../types/types";
import useTimeOfDay from "../../../hooks/useTimeOfDay";

const Reviews = ({ setIsReview }: ReviewProps) => {
    const [isClose, setIsClose] = useState<boolean>(false);
    const [reviews, setReviews] = useState<ReviewTypes[] | null>(null);
    const { server } = useServerAddress();
    const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const [totalReviews, setTotalReviews] = useState<number>(0);
    const [avgRatings, setAvgRatings] = useState<number>(0);

    const [fiveStar, setFiveStar] = useState<number>(0);
    const [fourStar, setFourStar] = useState<number>(0);
    const [threeStar, setThreeStar] = useState<number>(0);
    const [twoStar, setTwoStar] = useState<number>(0);
    const [oneStar, setOneStar] = useState<number>(0);

    const [fiveStarWidth, setFiveStarWidth] = useState<number>(0);
    const [fourStarWidth, setFourStarWidth] = useState<number>(0);
    const [threeStarWidth, setThreeStarWidth] = useState<number>(0);
    const [twoStarWidth, setTwoStarWidth] = useState<number>(0);
    const [oneStarWidth, setOneStarWidth] = useState<number>(0);

    const [filteredReviews, setFilteredReviews] = useState<
        ReviewTypes[] | null
    >(null);

    const [starFilter, setStarFilter] = useState<number>(0);
    const [dateFilter, setDateFilter] = useState<string>("All Time");
    const [availableYears, setAvailableYears] = useState<string[]>([]);
    const [isDateFilter, setIsDateFilter] = useState<boolean>(false);

    const { yearNow, monthNow } = useTimeOfDay();

    const fetchReviews = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(`${server}/admin/fetch-reviews`, {
                headers,
            });
            console.log(response.data.reviews);

            if (response.data.reviews) {
                setReviews(response.data.reviews);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        if (reviews) {
            setFilteredReviews(reviews);

            let available_years: string[] = [];

            reviews.map(({ date }, index, reviews) => {
                if (index < reviews.length - 1) {
                    if (
                        date.slice(0, 4) !== reviews[index + 1].date.slice(0, 4)
                    ) {
                        available_years.push(
                            reviews[index + 1].date.slice(0, 4),
                        );
                    }
                }
            });

            setAvailableYears(available_years);
        }
    }, [reviews]);

    useEffect(() => {
        if (!filteredReviews) return;
        setTotalReviews(filteredReviews.length);
        let accumulated_ratings = 0;
        filteredReviews.forEach(({ ratings }) => {
            return (accumulated_ratings += ratings);
        });

        let average_rate = accumulated_ratings / filteredReviews.length;
        let rounded_rate = Math.round(average_rate * 2) / 2;
        rounded_rate = parseFloat(rounded_rate.toFixed(1));

        setAvgRatings(rounded_rate);

        let countFive = 0;
        let countFour = 0;
        let countThree = 0;
        let countTwo = 0;
        let countOne = 0;

        filteredReviews.map(({ ratings }) => {
            if (ratings === 5) {
                countFive += 1;
            }
            if (ratings === 4) {
                countFour += 1;
            }
            if (ratings === 3) {
                countThree += 1;
            }
            if (ratings === 2) {
                countTwo += 1;
            }
            if (ratings === 1) {
                countOne += 1;
            }
        });
        setFiveStar(countFive);
        setFourStar(countFour);
        setThreeStar(countThree);
        setTwoStar(countTwo);
        setOneStar(countOne);

        setFiveStarWidth((countFive / filteredReviews.length) * 100);

        setFourStarWidth((countFour / filteredReviews.length) * 100);
        setThreeStarWidth((countThree / filteredReviews.length) * 100);
        setTwoStarWidth((countTwo / filteredReviews.length) * 100);
        setOneStarWidth((countOne / filteredReviews.length) * 100);
    }, [filteredReviews]);

    const handleClose = () => {
        setIsClose(true);

        setTimeout(() => {
            setIsReview(false);
            setIsClose(false);
        }, 180);
    };

    useEffect(() => {
        if (!reviews) return;
        if (starFilter !== 0) {
            availableYears.forEach((item) => {
                if (dateFilter === item) {
                    const newReviews = reviews.filter(
                        ({ ratings, date }) =>
                            ratings === starFilter && date.includes(item),
                    );
                    setFilteredReviews(newReviews);
                }
            });
            if (dateFilter === "This Year") {
                const newReviews = reviews.filter(
                    ({ ratings, date }) =>
                        ratings === starFilter &&
                        date.includes(yearNow.toString()),
                );
                setFilteredReviews(newReviews);
            } else if (dateFilter === "This Month") {
                const newReviews = reviews.filter(
                    ({ ratings, date }) =>
                        ratings === starFilter &&
                        date.includes(yearNow.toString()) &&
                        date.includes(monthNow.toString().padStart(2, "0")),
                );
                setFilteredReviews(newReviews);
            } else if (dateFilter === "All Time") {
                const newReviews = reviews.filter(
                    ({ ratings }) => ratings === starFilter,
                );
                setFilteredReviews(newReviews);
            }
        } else {
            availableYears.forEach((item) => {
                if (dateFilter === item) {
                    const newReviews = reviews.filter(({ date }) =>
                        date.includes(item),
                    );
                    setFilteredReviews(newReviews);
                }
            });
            if (dateFilter === "This Year") {
                const newReviews = reviews.filter(({ date }) =>
                    date.includes(yearNow.toString()),
                );
                setFilteredReviews(newReviews);
            } else if (dateFilter === "This Month") {
                const newReviews = reviews.filter(
                    ({ date }) =>
                        date.includes(yearNow.toString()) &&
                        date.includes(monthNow.toString().padStart(2, "0")),
                );
                setFilteredReviews(newReviews);
            } else if (dateFilter === "All Time") {
                setFilteredReviews(reviews);
            }
        }
    }, [starFilter, dateFilter]);

    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            <div
                className={`${isClose && "pop-close-animation"} pop-up-animation w-[55vw] py-8 px-15 h-[75vh] bg-gradient-to-b from-darkbrown to-lightbrown rounded-tl-3xl rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            >
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-primary text-[2.6rem] font-medium text-shadow-sm">
                        Reviews
                    </h1>

                    <div className="relative flex flex-row items-center gap-4">
                        <button
                            onClick={() => setIsDateFilter(!isDateFilter)}
                            className="text-[1.1rem] cursor-pointer font-extralight text-white/85 py-2 px-8 border-1 rounded-md border-white/30 [box-shadow:-2px_2px_4px_rgba(0,0,0,0.2)]"
                        >
                            {dateFilter}
                        </button>
                        <button
                            onClick={() => setIsFilter(!isFilter)}
                            className="text-primary cursor-pointer flex flex-row items-center gap-1"
                        >
                            <ListFilter size={30} />
                            <p className="text-secondary">
                                {starFilter === 0
                                    ? "All"
                                    : `${starFilter} star`}
                            </p>
                        </button>
                        {isDateFilter && (
                            <div className="absolute top-[70%] right-[90%] w-[20rem] py-4 px-2 h-fit z-10 rounded-b-2xl rounded-tl-2xl bg-gradient-to-b from-lightbrown to-darkbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row items-center justify-evenly">
                                        <button
                                            onClick={() => {
                                                setDateFilter("All Time");
                                                setIsDateFilter(false);
                                            }}
                                            className={`${dateFilter === "All Time" && "-translate-y-[2px] border-white/35 font-medium font-white/90 translate-x-[2px] [box-shadow:-2px_2px_rgba(255,255,255,0.3)]"} cursor-pointer text-[1rem] font-light py-1 px-2 border-1 border-white/20 rounded-lg text-primary`}
                                        >
                                            All Time
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDateFilter("This Year");
                                                setIsDateFilter(false);
                                            }}
                                            className={`${dateFilter === "This Year" && "-translate-y-[2px] border-white/35 font-medium font-white/90 translate-x-[2px] [box-shadow:-2px_2px_rgba(255,255,255,0.3)]"} cursor-pointer text-[1rem] font-light py-1 px-2 border-1 border-white/20 rounded-lg text-primary`}
                                        >
                                            This Year
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDateFilter("This Month");
                                                setIsDateFilter(false);
                                            }}
                                            className={`${dateFilter === "This Month" && "-translate-y-[2px] border-white/35 font-medium font-white/90 translate-x-[2px] [box-shadow:-2px_2px_rgba(255,255,255,0.3)]"} cursor-pointer text-[1rem] font-light py-1 px-2 border-1 border-white/20 rounded-lg text-primary`}
                                        >
                                            This Month
                                        </button>
                                    </div>

                                    <div className="flex flex-row justify-center">
                                        <details className="px-3 cursor-pointer">
                                            <summary className="text-white/90 font-extralight text-[0.95rem]">
                                                Pick a year
                                            </summary>
                                            <ul className="flex flex-col items-center">
                                                {availableYears.map(
                                                    (item, index) => (
                                                        <li
                                                            key={index}
                                                            className={`${dateFilter === item && "underline"} text-secondary cursor-pointer`}
                                                            onClick={() => {
                                                                setDateFilter(
                                                                    item,
                                                                );
                                                                setIsDateFilter(
                                                                    false,
                                                                );
                                                            }}
                                                        >
                                                            {item}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </details>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        )}
                        {isFilter && (
                            <div className="w-[10rem] z-10 h-fit pb-4 pt-2 top-[70%] px-4 flex flex-col items-center gap-1 absolute rounded-b-2xl rounded-tl-2xl bg-gradient-to-b from-lightbrown to-darkbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]">
                                <h1 className="text-primary border-b-2 text-shadow-md text-[1.3rem] text-center border-white/30 w-full">
                                    Filter
                                </h1>
                                <p
                                    onClick={() => {
                                        setIsFilter(false);
                                        setStarFilter(0);
                                    }}
                                    className={`${starFilter === 0 && "underline"} text-white/70 text-[0.9rem] font-extralight text-shadow-md cursor-pointer hover:text-white/90 hover:underline transition duration-100`}
                                >
                                    All
                                </p>
                                <p
                                    onClick={() => {
                                        setIsFilter(false);
                                        setStarFilter(5);
                                    }}
                                    className={`${starFilter === 5 && "underline"} text-white/70 text-[0.9rem] font-extralight text-shadow-md cursor-pointer hover:text-white/90 hover:underline transition duration-100`}
                                >
                                    5 star review
                                </p>
                                <p
                                    onClick={() => {
                                        setIsFilter(false);
                                        setStarFilter(4);
                                    }}
                                    className={`${starFilter === 4 && "underline"} text-white/70 text-[0.9rem] font-extralight text-shadow-md cursor-pointer hover:text-white/90 hover:underline transition duration-100`}
                                >
                                    4 star review
                                </p>
                                <p
                                    onClick={() => {
                                        setIsFilter(false);
                                        setStarFilter(3);
                                    }}
                                    className={`${starFilter === 3 && "underline"} text-white/70 text-[0.9rem] font-extralight text-shadow-md cursor-pointer hover:text-white/90 hover:underline transition duration-100`}
                                >
                                    3 star review
                                </p>
                                <p
                                    onClick={() => {
                                        setIsFilter(false);
                                        setStarFilter(2);
                                    }}
                                    className={`${starFilter === 2 && "underline"} text-white/70 text-[0.9rem] font-extralight text-shadow-md cursor-pointer hover:text-white/90 hover:underline transition duration-100`}
                                >
                                    2 star review
                                </p>
                                <p
                                    onClick={() => {
                                        setIsFilter(false);
                                        setStarFilter(1);
                                    }}
                                    className={`${starFilter === 1 && "underline"} text-white/70 text-[0.9rem] font-extralight text-shadow-md cursor-pointer hover:text-white/90 hover:underline transition duration-100`}
                                >
                                    1 star review
                                </p>
                            </div>
                        )}
                        <hr />
                        <hr />

                        <button
                            onClick={handleClose}
                            className="text-primary cursor-pointer opacity-80"
                        >
                            <LogOut size={30} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between py-8 border-b-3 border-darkbrown/85">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-primary font-light text-white/80">
                            Total Reviews
                        </h1>
                        <div className="flex flex-col items-start">
                            <h2 className="text-primary text-[2rem] font-medium">
                                {totalReviews}
                            </h2>
                            <p className="text-secondary text-[0.85rem] -mt-1 text-white/50">
                                Growth in reviews on{" "}
                                {dateFilter === "This Year"
                                    ? "this year"
                                    : dateFilter === "This Month"
                                      ? "this month"
                                      : dateFilter === "All Time"
                                        ? "all times"
                                        : dateFilter}
                            </p>
                        </div>
                    </div>
                    <div className="w-[3px] h-25 rounded-2xl bg-darkbrown"></div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-primary font-light text-white/80">
                            Average Rating
                        </h1>
                        <div className="flex flex-col items-start">
                            <div className="flex flex-row items-center gap-4">
                                <h2 className="text-primary text-[2rem] font-medium">
                                    {avgRatings}
                                </h2>
                                <div className="flex flex-row text-primary gap-1">
                                    {avgRatings === 0.5 && (
                                        <>
                                            <FaStarHalfStroke size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 1 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 1.5 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStarHalfStroke size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 2 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 2.5 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStarHalfStroke size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 3 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaRegStar size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 3.5 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStarHalfStroke size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 4 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaRegStar size={25} />
                                        </>
                                    )}
                                    {avgRatings === 4.5 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStarHalfStroke size={25} />
                                        </>
                                    )}
                                    {avgRatings === 5 && (
                                        <>
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                            <FaStar size={25} />
                                        </>
                                    )}
                                </div>
                            </div>

                            <p className="text-secondary text-[0.85rem] -mt-1 text-white/50">
                                Average rating on this year
                            </p>
                        </div>
                    </div>
                    <div className="w-[3px] h-25 rounded-2xl bg-darkbrown"></div>
                    <div className="flex flex-col">
                        <div className="w-[15rem] gap-1 flex flex-row items-center">
                            <i className="text-white/50 flex items-center">
                                <FaStar size={10} />
                            </i>
                            <div className="w-full gap-3 flex flex-row items-center">
                                <p className="text-white/75 text-[0.8rem]">5</p>
                                <span
                                    style={{ width: `${fiveStarWidth}%` }}
                                    className={`bg-white/80  h-[5px] rounded-2xl`}
                                ></span>
                                <p className="text-secondary text-[0.7rem]">
                                    {fiveStar}
                                </p>
                            </div>
                        </div>
                        <div className="w-[15rem] gap-1 flex flex-row items-center">
                            <i className="text-white/50 flex items-center">
                                <FaStar size={10} />
                            </i>
                            <div className="w-full gap-3 flex flex-row items-center">
                                <p className="text-white/75 text-[0.8rem]">4</p>
                                <span
                                    style={{ width: `${fourStarWidth}%` }}
                                    className={`bg-white/80 h-[5px] rounded-2xl`}
                                ></span>
                                <p className="text-secondary text-[0.7rem]">
                                    {fourStar}
                                </p>
                            </div>
                        </div>
                        <div className="w-[15rem] gap-1 flex flex-row items-center">
                            <i className="text-white/50 flex items-center">
                                <FaStar size={10} />
                            </i>
                            <div className="w-full gap-3 flex flex-row items-center">
                                <p className="text-white/75 text-[0.8rem]">3</p>
                                <span
                                    style={{ width: `${threeStarWidth}%` }}
                                    className={`bg-white/80  h-[5px] rounded-2xl`}
                                ></span>
                                <p className="text-secondary text-[0.7rem]">
                                    {threeStar}
                                </p>
                            </div>
                        </div>
                        <div className="w-[15rem] gap-1 flex flex-row items-center">
                            <i className="text-white/50 flex items-center">
                                <FaStar size={10} />
                            </i>
                            <div className="w-full gap-3 flex flex-row items-center">
                                <p className="text-white/75 text-[0.8rem]">2</p>
                                <span
                                    style={{ width: `${twoStarWidth}%` }}
                                    className={`bg-white/80  h-[5px] rounded-2xl`}
                                ></span>
                                <p className="text-secondary text-[0.7rem]">
                                    {twoStar}
                                </p>
                            </div>
                        </div>
                        <div className="w-[15rem] gap-1 flex flex-row items-center">
                            <i className="text-white/50 flex items-center">
                                <FaStar size={10} />
                            </i>
                            <div className="w-full gap-3 flex flex-row items-center">
                                <p className="text-white/75 text-[0.8rem]">1</p>
                                <span
                                    style={{ width: `${oneStarWidth}%` }}
                                    className={`bg-white/80 h-[5px] rounded-2xl`}
                                ></span>
                                <p className="text-secondary text-[0.7rem]">
                                    {oneStar}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="flex flex-col h-[25rem] gap-8 py-8 overflow-y-scroll thin-scrollbar text-[0.9rem] font-extralight [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
                    {filteredReviews?.length !== 0 && filteredReviews ? (
                        filteredReviews.map(
                            (
                                {
                                    name,
                                    img_profile_url,
                                    ratings,
                                    comment,
                                    date,
                                    time_age,
                                    order_items,
                                    total_spend,
                                    email,
                                },
                                index,
                            ) => (
                                <li
                                    key={index}
                                    className="flex flex-row items-start list-none w-full min-h-[10rem] "
                                >
                                    {isProfileLoading && (
                                        <div className="img-loading"></div>
                                    )}
                                    <div
                                        className={`${isProfileLoading && "hidden"} flex flex-row items-center w-[40%] gap-3 `}
                                    >
                                        <img
                                            className="w-[4.5rem] h-[4.5rem] bg-darkbrown/50 rounded-md p-1"
                                            src={img_profile_url}
                                            alt=""
                                            onLoad={() =>
                                                setIsProfileLoading(false)
                                            }
                                        />
                                        <div className="flex flex-col gap-1 w-[50%]  ">
                                            <div className="leading-5">
                                                <h1 className="text-primary text-[1.5rem] font-light">
                                                    {name}
                                                </h1>
                                                <p className="text-white/60 text-[0.75rem] font-extralight">
                                                    {email}
                                                </p>
                                            </div>

                                            <div className=" ">
                                                <p className="text-white/60 text-[0.75rem] font-extralight flex flex-row items-center justify-between w-full ">
                                                    Total Spend:{" "}
                                                    <span>₱ {total_spend}</span>
                                                </p>
                                                <p className="text-white/60 text-[0.75rem] font-extralight flex flex-row items-center justify-between w-full ">
                                                    Order item(s):{" "}
                                                    <span>{order_items}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`${isProfileLoading && "hidden"} w-[60%] flex flex-col gap-4`}
                                    >
                                        <div className="flex flex-row items-end gap-2">
                                            <div className="flex flex-row text-primary gap-2">
                                                {ratings === 1 && (
                                                    <>
                                                        <FaStar size={25} />
                                                        <FaRegStar size={25} />
                                                        <FaRegStar size={25} />
                                                        <FaRegStar size={25} />
                                                        <FaRegStar size={25} />
                                                    </>
                                                )}
                                                {ratings === 2 && (
                                                    <>
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaRegStar size={25} />
                                                        <FaRegStar size={25} />
                                                        <FaRegStar size={25} />
                                                    </>
                                                )}
                                                {ratings === 3 && (
                                                    <>
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaRegStar size={25} />
                                                        <FaRegStar size={25} />
                                                    </>
                                                )}
                                                {ratings === 4 && (
                                                    <>
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaRegStar size={25} />
                                                    </>
                                                )}
                                                {ratings === 5 && (
                                                    <>
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                        <FaStar size={25} />
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-white/50 font-extralight text-[0.75rem] tracking-wider">
                                                {time_age} | {date}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/60 font-extralight text-[0.85rem]">
                                                "{comment}"
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ),
                        )
                    ) : (
                        <h2 className="text-white/50 text-[1rem] font-light text-center w-full py-2">
                            There is no available data
                        </h2>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default memo(Reviews);
