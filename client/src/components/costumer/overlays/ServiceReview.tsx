import layout from "../../../styles/layouts/service_review.module.css";
import { ChevronLeft, ChevronRight, DoorOpen, Send } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { PendingPaymentType } from "../../../types/types";
import React, { useEffect, useState } from "react";
import { BiHappyBeaming } from "react-icons/bi";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";

interface ReviewProps {
    myOrders: PendingPaymentType | null;
    isReceipt: boolean;
    handleCostumerExit: (costumer_name: string) => void;
    totalQuantity: number;
}
type ProductReviewType = {
    food_name: string;
    rating: number;
};

type ServiceReviewType = {
    email: string;
    comment: string;
};
const ServiceReview = ({
    myOrders,
    handleCostumerExit,
    isReceipt,
    totalQuantity,
}: ReviewProps) => {
    const [serviceRating, setServiceRating] = useState<number>(0);

    const [selectedProduct, setSelectedProduct] = useState<number>(0);
    const [imgSlider, setImgSlider] = useState<number>(0);
    const selectedProductName = myOrders?.orders.find(
        (_, index) => index === selectedProduct,
    );

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const [productReview, setProductReview] = useState<ProductReviewType[]>([]);

    const [serviceReview, setServiceReview] = useState<ServiceReviewType>({
        email: "",
        comment: "",
    });

    const { server } = useServerAddress();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServiceReview({ ...serviceReview, [e.target.name]: e.target.value });
    };
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setServiceReview({ ...serviceReview, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServiceReview({
            comment: "",
            email: "",
        });

        const dataToSend = {
            product_ratings: productReview,
            email:
                serviceReview.email.length <= 0
                    ? "Anonymous"
                    : serviceReview.email,
            comment: serviceReview.comment,
            name: myOrders?.costumer_name,
            ratings: serviceRating,
            total_spend: myOrders?.total_payment,
            order_items: totalQuantity,
        };

        const sendToAdmin = async () => {
            try {
                const response = await axios.post(
                    `${server}/admin/recieve-rating`,

                    dataToSend,
                );

                console.dir(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        sendToAdmin();

        setIsSubmitted(true);
    };

    useEffect(() => {
        if (myOrders) {
            const newProductReview = myOrders.orders.map(({ food_name }) => {
                return {
                    food_name: food_name,
                    rating: 0,
                };
            });
            setProductReview(newProductReview);
        }
    }, []);

    const handleStar = (stars: number, product: string) => {
        setProductReview((prev) =>
            prev.map((item) =>
                item.food_name === product ? { ...item, rating: stars } : item,
            ),
        );
    };

    const handleNextProduct = () => {
        if (myOrders) {
            if (selectedProduct < myOrders?.orders.length) {
                setSelectedProduct((prev) => prev + 1);
                setImgSlider((prev) => prev - 100);
            }
        }
    };
    const handlePrevProduct = () => {
        if (myOrders) {
            if (selectedProduct > 0) {
                setSelectedProduct((prev) => prev - 1);
                setImgSlider((prev) => prev + 100);
            }
        }
    };
    return !isSubmitted
        ? isReceipt && (
              <div className="fixed flex items-center justify-end flex-col  w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] ">
                  <div className="relative flex overflow-hidden flex-col p-4 pb-10 min-[390px]:pb-20  items-center bg-gradient-to-t rounded-t-[4rem] w-full h-[95vh] min-[390px]:h-[90vh] from-darkbrown to-lightbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                      <div className="h-[55%]   w-full flex flex-col items-center mt-6 gap-2 min-[390px]:gap-4">
                          <div className="flex flex-col items-center">
                              <h1 className="text-primary text-[1.5rem] min-[390px]:text-[1.65rem]">
                                  How was your experience?
                              </h1>
                              <div className="text-primary flex flex-row scale-90 min-[390px]:scale-100 items-center justify-center gap-2 min-[390px]:gap-4">
                                  {serviceRating === 0 && (
                                      <>
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(1)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(2)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(3)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(4)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(5)
                                              }
                                              size={40}
                                          />
                                      </>
                                  )}
                                  {serviceRating === 1 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(1)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(2)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(3)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(4)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(5)
                                              }
                                              size={40}
                                          />
                                      </>
                                  )}
                                  {serviceRating === 2 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(1)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(2)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(3)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(4)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(5)
                                              }
                                              size={40}
                                          />
                                      </>
                                  )}
                                  {serviceRating === 3 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(1)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(2)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(3)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(4)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(5)
                                              }
                                              size={40}
                                          />
                                      </>
                                  )}
                                  {serviceRating === 4 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(1)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(2)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(3)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(4)
                                              }
                                              size={40}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  setServiceRating(5)
                                              }
                                              size={40}
                                          />
                                      </>
                                  )}
                                  {serviceRating === 5 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(1)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(2)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(3)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(4)
                                              }
                                              size={40}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  setServiceRating(5)
                                              }
                                              size={40}
                                          />
                                      </>
                                  )}
                              </div>
                              <p className="text-white/60 text-[0.65rem] min-[390px]:text-[0.75rem] font-extralight mt-1">
                                  {serviceRating === 1
                                      ? "Very disappointing, Needs major improvement"
                                      : serviceRating === 2
                                        ? "Not great. There's a lot of room for improvement"
                                        : serviceRating === 3
                                          ? "It was okay. Some things were good, others not so much."
                                          : serviceRating === 4
                                            ? "Really good! Just a few things could be better."
                                            : serviceRating === 5
                                              ? "Great 5 star! Can’t get any better than that!"
                                              : ""}
                              </p>
                          </div>
                          <h1 className="text-primary text-[0.85rem] min-[390px]:text-[0.95rem] text-center font-light">
                              We'd appreciate your thoughts on our service.
                          </h1>
                          <form
                              id="reviewForm"
                              onSubmit={handleSubmit}
                              className="w-full flex flex-col gap-2 items-center h-full"
                          >
                              <label
                                  htmlFor="email"
                                  className="w-full text-white/60 font-extralight text-[0.7rem] min-[390px]:text-[0.8rem]"
                              >
                                  Email [optional]
                              </label>
                              <input
                                  type="email"
                                  value={serviceReview.email}
                                  name="email"
                                  id="email"
                                  onChange={handleChange}
                                  className="w-full text-[0.8rem] rounded-md px-2 py-1 text-[#2c2c2c] outline-none bg-gradient-to-t from-[#DAE1E5] to-[#EAF2F5]"
                                  placeholder="Your email (optional)"
                              />
                              <label
                                  htmlFor="comment"
                                  className="w-full text-white/60 font-extralight text-[0.7rem] min-[390px]:text-[0.8rem]"
                              >
                                  Your comments
                              </label>
                              <textarea
                                  value={serviceReview.comment}
                                  required
                                  onChange={handleChangeText}
                                  placeholder="Tell us what you enjoyed or what we could improve…"
                                  className="w-full h-[70%] resize-none bg-gradient-to-t from-[#DAE1E5] to-[#EAF2F5] rounded-md outline-none px-2 py-2 text-[#2c2c2c] text-[0.8rem]"
                                  name="comment"
                                  id="comment"
                              ></textarea>
                          </form>
                      </div>

                      <div
                          className={`${layout["product-review"]} h-[40%] w-full scale-75 min-[390px]:scale-85`}
                      >
                          <div
                              className={`${layout["header"]} flex flex-col items-center justify-center leading-5`}
                          >
                              <p className="text-primary text-[0.9rem] font-extralight text-white/60">
                                  Dish you tried
                              </p>

                              <h1 className="text-primary text-[1.35rem]">
                                  {selectedProductName?.food_name}
                              </h1>
                          </div>
                          <div
                              onClick={handlePrevProduct}
                              className={`${layout["left-btn"]} ${selectedProduct === 0 && "hidden"} flex items-center justify-center text-primary relative z-5`}
                          >
                              <ChevronLeft size={40} />
                          </div>
                          <div
                              onClick={handleNextProduct}
                              className={`${layout["right-btn"]} ${myOrders ? selectedProduct === myOrders?.orders.length - 1 && "hidden" : null} flex items-center justify-center text-primary relative z-5`}
                          >
                              <ChevronRight size={40} />
                          </div>

                          <div
                              className={`${layout["img-slider"]} relative flex flex-row items-center min-[390px]:translate-x-[0] `}
                          >
                              {myOrders?.orders.map(
                                  ({ food_name, img }, index) => (
                                      <img
                                          key={index}
                                          style={{
                                              transform: `translateX(${imgSlider}%)`,
                                          }}
                                          className={`${selectedProductName?.food_name === food_name && " scale-100 blur-none opacity-100 brightness-100 "} opacity-45 brightness-65 scale-95 transition duration-200 blur-[6px]`}
                                          src={`/images/products/${img}`}
                                          alt=""
                                      />
                                  ),
                              )}
                          </div>
                          <div
                              className={`${layout["stars-btn"]} flex flex-col gap-1 relative z-10`}
                          >
                              <div className="flex flex-row items-center justify-center gap-3 text-primary">
                                  {productReview[selectedProduct]?.rating ===
                                      0 && (
                                      <>
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      1,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      2,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      3,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      4,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      5,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                      </>
                                  )}
                                  {productReview[selectedProduct]?.rating ===
                                      1 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      1,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      2,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      3,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      4,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      5,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                      </>
                                  )}
                                  {productReview[selectedProduct]?.rating ===
                                      2 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      1,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      2,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      3,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      4,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      5,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                      </>
                                  )}
                                  {productReview[selectedProduct]?.rating ===
                                      3 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      1,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      2,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      3,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      4,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      5,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                      </>
                                  )}
                                  {productReview[selectedProduct]?.rating ===
                                      4 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      1,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      2,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      3,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      4,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaRegStar
                                              onClick={() =>
                                                  handleStar(
                                                      5,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                      </>
                                  )}
                                  {productReview[selectedProduct]?.rating ===
                                      5 && (
                                      <>
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      1,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      2,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      3,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      4,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                          <FaStar
                                              onClick={() =>
                                                  handleStar(
                                                      5,
                                                      productReview[
                                                          selectedProduct
                                                      ].food_name,
                                                  )
                                              }
                                              size={33}
                                          />
                                      </>
                                  )}
                              </div>
                              <p className="text-white/60 font-extralight text-center text-[0.8rem]">
                                  Tap to rate
                              </p>
                          </div>
                      </div>
                      <button
                          form="reviewForm"
                          className="w-[14rem] flex flex-row items-center justify-center bg-gradient-to-b from-lightgreen to-darkgreen rounded-xl px-2 py-2 min-[390px]:px-3 min-[390px]:py-3 text-[0.85rem] min-[390px]:text-[1rem] text-primary gap-1 [box-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]"
                      >
                          Share my experience <Send />
                      </button>
                  </div>
              </div>
          )
        : isReceipt && (
              <div className="fixed  w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] flex items-center justify-center ">
                  <div className="bg-gradient-to-b w-[90vw] py-8 flex flex-col items-center gap2 from-lightbrown to-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                      <i className="text-white/70 scale-80 min-[390px]:scale-100">
                          <BiHappyBeaming size={200} />
                      </i>
                      <h1 className="text-white text-[1.35rem] min-[390px]:text-[1.5rem]">
                          We appreciate your feedback
                      </h1>
                      <button
                          onClick={() =>
                              handleCostumerExit(
                                  myOrders?.costumer_name
                                      ? myOrders.costumer_name
                                      : "anonymous",
                              )
                          }
                          className="mt-8 flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-6 min-[390px]:py-6 px-12 min-[390px]:px-12 rounded-xl border-1 border-white/20"
                      >
                          Exit
                          <DoorOpen size={15} />
                      </button>
                  </div>
              </div>
          );
};

export default ServiceReview;
