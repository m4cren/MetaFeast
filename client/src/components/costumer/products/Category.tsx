import { memo } from "react";

interface Props {
    category: string;
    icon: React.ComponentType<{ size?: number }>;
    selected: string;
}

const Category: React.FC<Props> = ({ icon: Icon, category, selected }) => {
    const isSelected = selected == category;
    return (
        <div
            className={`${isSelected && "category-btn "} [box-shadow:2px_2px_3px_rgba(0,0,0,0.25)_inset] active:scale-95 active:opacity-95  transition duration-200 gap-[0.1rem] min-w-[6.5rem] h-[3.35rem] min-[390px]:min-w-[8rem] min-[390px]:h-[3.7rem] brown-gradient-to-b flex flex-col justify-center rounded-lg items-center `}
        >
            <p className="text-primary text-shadow-md">
                <Icon size={19} />
            </p>
            <p className="text-primary text-shadow-md text-[rgba(255,255,255,0.7)] min-[390px]:text-[0.8rem] text-[0.67rem] font-extralight">
                {category}
            </p>
        </div>
    );
};

export default memo(Category);
