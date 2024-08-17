import Image from 'next/image';
import Link from 'next/link';

interface NewsItem {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

interface NewsSectionProps {
  newsItems: NewsItem[];
}

export default function NewsSection({ newsItems }: NewsSectionProps) {
  return (
    <>
      {newsItems.map((item, index) => (
        <div key={index} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold mb-2">
            <Link href={item.link} className="flex items-center space-x-2 text-blue-600 hover:underline">
              <Image alt={item.title} src={item.imageUrl} width={32} height={32} className="w-8 h-8 object-cover" />
              <span>{item.title}</span>
            </Link>
          </h3>
          <div className="text-gray-700 mb-2">
            <p className="mb-2">{item.description}</p>
            <Link href={item.link} className="text-blue-600 hover:underline">
              Chi tiết
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
