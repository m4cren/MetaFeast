import layout from "../../../styles/layouts/service_review.module.css";
import { ChevronLeft, ChevronRight, DoorOpen, Send } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { PendingPaymentType } from "../../../types/types";
import { useEffect, useState } from "react";
import { BiHappyBeaming } from "react-icons/bi";
import axios from "axios";
import useServerAddress from "../../../../useServerAddress";

interface ReviewProps {
    myOrders: PendingPaymentType | null;
    isReceipt: boolean;
    handleCostumerExit: (costumer_name: string) => void;
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
}: ReviewProps) => {
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
              <div className="fixed gap-4 flex items-center justify-start flex-col  w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] ">
                  <div>
                      <div className="flex flex-row justify-around">
                          <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
                          <div className="w-[8px] bg-gradient-to-t from-darkbrown to-lightbrown h-[2.5rem] min-[390px]:h-[5rem] [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]"></div>
                      </div>
                      <div className="w-[90vw] py-4 min-[390px]:py-6 rounded-2xl bg-gradient-to-b from-lightbrown to-darkbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_2px_rgba(0,0,0,0.3)]">
                          <h1 className="text-primary text-center text-[1.35rem] min-[390px]:text-[1.5rem] font-medium">
                              We'd love your feedbacks
                          </h1>
                      </div>
                  </div>
                  <div className="relative flex overflow-hidden flex-col p-4  items-center bg-gradient-to-t rounded-2xl w-[90vw] h-[75vh] min-[390px]:h-[70vh] from-darkbrown to-lightbrown [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                      <div
                          className={`${layout["product-review"]} h-[50%] w-full`}
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
                              <div className="flex flex-row items-center justify-center gap-4 text-primary">
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
                      <div className="h-[60%]  w-full flex flex-col items-center mt-6">
                          <h1 className="text-primary mb-1 text-[0.95rem] text-center font-light">
                              We'd appreciate your thoughts on our service.
                          </h1>
                          <form
                              onSubmit={handleSubmit}
                              className="w-full flex flex-col gap-2 items-center h-full"
                          >
                              <input
                                  type="email"
                                  value={serviceReview.email}
                                  name="email"
                                  onChange={handleChange}
                                  className="w-full text-[0.8rem] rounded-md px-2 py-1 text-[#2c2c2c] outline-none bg-gradient-to-t from-[#DAE1E5] to-[#EAF2F5]"
                                  placeholder="Your email (optional)"
                              />
                              <textarea
                                  value={serviceReview.comment}
                                  onChange={handleChangeText}
                                  placeholder="Tell us what you enjoyed or what we could improve…"
                                  className="w-full h-[60%] resize-none bg-gradient-to-t from-[#DAE1E5] to-[#EAF2F5] rounded-md outline-none px-2 py-2 text-[#2c2c2c] text-[0.8rem]"
                                  name="comment"
                                  id=""
                              ></textarea>
                              <button className="w-[14rem] flex mt-3 flex-row items-center justify-center bg-gradient-to-b from-lightgreen to-darkgreen rounded-xl px-3 py-3 text-[1rem] text-primary gap-1 [box-shadow:-2px_2px_4px_rgba(0,0,0,0.4)]">
                                  Share my experience <Send />
                              </button>
                          </form>
                      </div>
                  </div>
              </div>
          )
        : isReceipt && (
              <div className="fixed  w-full h-screen bg-transparent backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] flex items-center justify-center ">
                  <div className="bg-gradient-to-b w-[90vw] py-8 flex flex-col items-center gap2 from-lightbrown to-darkbrown rounded-2xl [box-shadow:0_0_5px_rgba(0,0,0,0.6)_inset,0_0_10px_rgba(0,0,0,0.5)]">
                      <i className="text-white/70">
                          <BiHappyBeaming size={200} />
                      </i>
                      <h1 className="text-white text-[1.5rem]">
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
                          className="mt-8 flex flex-row items-center gap-1 [box-shadow:-2px_2px_3px_rgba(0,0,0,0.3)] text-white/80 font-light text-primary text-[0.76rem] min-[390px]:text-[0.86rem] py-2 min-[390px]:py-3 px-6 min-[390px]:px-9 rounded-xl border-1 border-white/20"
                      >
                          Exit
                          <DoorOpen size={15} />
                      </button>
                  </div>
              </div>
          );
};

export default ServiceReview;
