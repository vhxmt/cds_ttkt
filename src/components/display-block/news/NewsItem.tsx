"use client";

interface NewsItemProps {
    imageSrc: string;
    title: string;
    date: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ imageSrc, title, date }) => {
    return (
        <div className="flex items-center mb-10"> 
            <img 
                src={imageSrc} 
                alt={title} 
                className="w-40 h-32 object-cover mr-12" 
            /> 
            <div>
                <h3 className="font-bold text-lg mb-2 ">{title}</h3> 
                <p className="text-sm text-gray-500">{date}</p>
            </div>
        </div>
    );
};

export default NewsItem;
