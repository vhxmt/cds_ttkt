import Image from 'next/image';

interface UserInfoProps {
  name: string;
  title: string;
  mail: string;
  tel: string;
  imageUrl: string;
}

export default function UserInfo({ name, title, mail, tel, imageUrl }: UserInfoProps) {
  return (
    <div className="flex items-start mb-4 p-4 border border-white">
      <div className="information flex-1">
        <h3 className="name font-semibold">{name}</h3>
        <p>{title}</p>
        <p>Mail: {mail}</p>
        <p>Tel: {tel}</p>
      </div>
      <div className="avatar w-24 h-32 bg-gray-300">
        <Image
          src={imageUrl}
          alt={`Avatar of ${name}`}
          width={96}
          height={128}
          className="object-cover"
        />
      </div>
    </div>
  );
}
