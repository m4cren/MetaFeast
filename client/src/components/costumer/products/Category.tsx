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
            className={`${isSelected && "category-btn "} active:scale-95 active:opacity-95  transition duration-200 gap-[0.1rem] min-w-[6.5rem] h-[3.5rem] min-[390px]:min-w-[8rem] min-[390px]:h-[4rem] bg-gradient-to-t to-lightbrown from-darkbrown flex flex-col justify-center rounded-xl items-center `}
        >
            <p className="text-primary text-shadow-lg">
                <Icon size={25} />
            </p>
            <p className="text-primary text-shadow-lg text-white/80 min-[390px]:text-[0.8rem] text-[0.7rem] font-extralight">
                {category}
            </p>
        </div>
    );
};

export default memo(Category);
