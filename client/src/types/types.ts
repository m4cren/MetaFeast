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

export interface AdminCameraControlProp {
    setCamPos: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setCamRot: React.Dispatch<React.SetStateAction<[number, number, number]>>;
    setIsTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
    setFloor: React.Dispatch<React.SetStateAction<number>>;
}

export type CuisineDetailProps = {
    name: string;
    price: number | undefined;
    quantity: number | undefined;
    img: string;
    type?: "Non-Alcoholic" | "Cocktail" | "Champagne";
};

export interface SelectedCuisineProps {
    setSelectedCuisine: React.Dispatch<React.SetStateAction<string>>;
    productDetails: ProductDetailsType[];
}

export type ProductDetailsType = {
    category:
        | "Appetizers"
        | "Main Course"
        | "Beverages"
        | "Desserts"
        | "Healthy Options"
        | "Soups & Salads"
        | "Pastries"
        | "Savory Breakfast";
    quantity: number;
    food_name: string;
    food_price: number;
    calories: number;
    waiting_time: number;
    img: string;
    description: string;
    details: string;
    type?: "Non-Alcoholic" | "Cocktail" | "Champagne";
    total_orders: number;
    ratings: number;
};

export type OrderType = {
    category: string;
    img: string;
    food_name: string;
    available_quantity: number;
    quantity: number;
    price: number;
    calories: number;
    waiting_time: number;
    base_price: number;
    base_calories: number;
};

export type PendingOrderType = {
    status: string;
    order_time: string;
    total_waiting_time: string;
    costumer_name: string;
    current_table: string;
    is_additional: boolean;

    orders: [
        {
            food_name: string;
            food_category: string;
            img: string;
            price: number;
            quantity: number;
        },
    ];
    additional_orders:
        | [
              {
                  food_name: string;
                  food_category: string;
                  img: string;
                  price: number;
                  quantity: number;
              },
          ]
        | undefined;
};

export type CurrentCostumerType = {
    status: "Ordering" | "Eating" | "Billing";
    costumer_name: string;
    current_table: string;
    time: string;
};

export type PendingPaymentType = {
    payment_id: string;
    costumer_name: string;
    status: "Unconfirmed" | "Confirmed";
    payment_type: "Cash" | "PayMongo";
    table_id: string;
    total_payment: number;

    orders: [
        {
            food_name: string;
            quantity: number;
            price: number;
            img: string;
        },
    ];
    payment_time: string;
    date_and_time: string;
};

export const triviaMessage = [
    "Did you know that egg contains 6-7 grams of protein?",
    "Bananas are rich in magnesium and potassium",
    "You look good, you feel good, you do good",
    "Our system saves the customer's last activity phase",
    "Hydration boosts focus and mood—drink water!",
    "Our smart menu adapts to your past choices",
    "Healthy habits lead to a healthy lifestyle",
    "Your preferences help us serve you better",
    "Small changes make a big difference in health",
    "We remember your favorites, so you don’t have to",
    "Our system ensures a smooth and personalized experience",
];

export type ReviewTypes = {
    email: string;
    name: string;
    ratings: number;
    comment: string;
    date: string;
    time_age: string;
    img_profile_url: string;
    total_spend: number;
    order_items: number;
};

export type HistoryType = {
    costumer_name: string;
    table_seated: string;
    total_payment: number;
    payment_id: string;
    total_order_items: number;
    payment_method: string;
    orders: [
        {
            food_name: string;
            quantity: number;
        },
    ];
    dine_time: string;
};

export type TableDetailTypes = {
    costumer_name: string;
    table_name: string;
    current_costumer_status: string;
    is_available: boolean;
};
