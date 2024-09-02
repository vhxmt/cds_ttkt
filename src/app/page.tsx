import Image from "next/image";
import CooperationSection from "@/components/frame/CooperationSection";
import cooperationData from "@/data/cooperations.json";
import contentData from "@/data/homePage.json";  

const { domesticCooperation, internationalCooperation } = cooperationData;
const { banner, introduction, strategicGoals } = contentData;  

export default function Home() {
    return (
        <main className="relative min-h-screen bg-gray-100 dark:bg-white">
            <div className="relative w-full h-[400px] overflow-hidden">
                <Image
                    src={banner.src}  // Use the image source from the JSON data
                    alt={banner.alt}   
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                />
            </div>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    {introduction.title} 
                </h1>
                <p className="mb-4">
                    {introduction.description} 
                </p>
                <h2 className="text-xl font-semibold mb-2">
                    {strategicGoals.title}  
                </h2>
                <ul className="list-disc list-inside mb-4">
                    {strategicGoals.items.map((item, index) => (  
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <CooperationSection 
                title={domesticCooperation.title} 
                items={domesticCooperation.items} 
            />

            {/* International Cooperation Section */}
            <CooperationSection 
                title={internationalCooperation.title} 
                items={internationalCooperation.items} 
            />
        </main>
    );
}
