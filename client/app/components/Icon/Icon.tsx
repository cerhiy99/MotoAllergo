import Image from 'next/image';

interface IconProps {
  src: string;
  alt: string;
  size?: number;
}

export default function Icon({ src, alt, size = 24 }: IconProps) {
  return <Image src={src} alt={alt} width={size} height={size} unoptimized />;
}
