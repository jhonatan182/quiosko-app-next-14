'use client';

import { type Category } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();

  return (
    <Link href={`/order/${category.slug}`}>
      <div
        className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b cursor-pointer hover:bg-amber-500 ${
          params.category === category.slug ? 'bg-amber-400' : ''
        }`}
      >
        <div className="w-16 h-16 relative">
          <Image
            src={`/icon_${category.slug}.svg`}
            alt="Imagen categoria"
            fill
          />
        </div>

        <p className="text-xl font-bold">{category.name}</p>
      </div>
    </Link>
  );
}
