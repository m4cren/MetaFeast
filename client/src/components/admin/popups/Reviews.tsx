import { LogOut, ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import useServerAddress from "../../../../useServerAddress";
import axios from "axios";
interface ReviewProps {
    setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
}

import { ReviewTypes } from "../../../types/types";

const Reviews = ({ setIsReview }: ReviewProps) => {
    const [isClose, setIsClose] = useState<boolean>(false);
    const [reviews, setReviews] = useState<ReviewTypes[]>([]);
    const { server } = useServerAddress();

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

    const fetchReviews = async () => {
        const headers = {
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.get(`${server}/admin/fetch-reviews`, {
                headers,
            });

            setReviews(response.data.reviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        if (reviews) {
            setTotalReviews(reviews.length);
            let accumulated_ratings = 0;
            reviews.forEach(({ ratings }) => {
                return (accumulated_ratings += ratings);
            });

            let average_rate = accumulated_ratings / reviews.length;
            let rounded_rate = Math.round(average_rate * 2) / 2;
            rounded_rate = parseFloat(rounded_rate.toFixed(1));

            setAvgRatings(rounded_rate);

            let countFive = 0;
            let countFour = 0;
            let countThree = 0;
            let countTwo = 0;
            let countOne = 0;

            reviews.map(({ ratings }) => {
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

            setFiveStarWidth((countFive / reviews.length) * 100);

            setFourStarWidth((countFour / reviews.length) * 100);
            setThreeStarWidth((countThree / reviews.length) * 100);
            setTwoStarWidth((countTwo / reviews.length) * 100);
            setOneStarWidth((countOne / reviews.length) * 100);
        }
    }, [reviews]);

    useEffect(() => {
        if (reviews) {
            console.log(`${fiveStarWidth} five`);
            console.log(`${fourStarWidth} four`);
            console.log(`${threeStarWidth} three`);
            console.log(`${twoStarWidth} two`);
            console.log(`${oneStarWidth} one`);
        }
    }, [reviews]);

    const handleClose = () => {
        setIsClose(true);

        setTimeout(() => {
            setIsReview(false);
            setIsClose(false);
        }, 180);
    };

    return (
        <div className="fixed bg-black/40 backdrop-blur-[4px] w-full h-screen flex justify-center items-center pointer-events-auto">
            <div
                className={`${isClose && "pop-close-animation"} pop-up-animation w-[55vw] py-8 px-15 h-[75vh] bg-gradient-to-b from-darkbrown to-lightbrown rounded-tl-3xl rounded-3xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_8px_rgba(0,0,0,0.3)]`}
            >
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-primary text-[2.6rem] font-medium text-shadow-sm">
                        Reviews
                    </h1>

                    <div className="flex flex-row items-center gap-4">
                        <button className="text-[1.1rem] cursor-pointer font-extralight text-white/85 py-2 px-8 border-1 rounded-md border-white/30 [box-shadow:-2px_2px_4px_rgba(0,0,0,0.2)]">
                            This Year
                        </button>
                        <button className="text-primary cursor-pointer">
                            <ListFilter size={30} />
                        </button>
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
                                Growth in reviews on this year
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
                <ul className="flex flex-col h-[25rem] gap-8 py-8 overflow-y-scroll custom-scrollbar [mask-image:linear-gradient(to_bottom,black_85%,transparent)]">
                    {reviews.map(
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
                                <div className="flex flex-row items-center w-[40%] gap-3 ">
                                    <img
                                        className="w-[4.5rem] h-[4.5rem] bg-darkbrown/50 rounded-md p-1"
                                        src={img_profile_url}
                                        alt=""
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
                                <div className=" w-[60%] flex flex-col gap-4">
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
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Reviews;
