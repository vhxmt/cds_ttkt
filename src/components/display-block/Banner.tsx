import Image from 'next/image';

interface BannerProps {
  src: string;
  alt: string;
}

export default function Banner({ src, alt }: BannerProps) {
  return (
    <div className="mb-4">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
}
