interface Props {
    category: string;
    icon: React.ComponentType<{ size?: number }>;
}

const Category: React.FC<Props> = ({ icon: Icon, category }) => {
    return (
        <div className="gap-[0.1rem] min-w-[8rem] h-[4rem] bg-gradient-to-t to-[#9A7E57] from-[#665237] flex flex-col justify-center rounded-xl items-center">
            <p className="text-primary text-shadow-lg">
                <Icon size={30} />
            </p>
            <p className="text-primary text-shadow-lg text-white/80 text-[0.8rem] font-extralight">
                {category}
            </p>
        </div>
    );
};

export default Category;
