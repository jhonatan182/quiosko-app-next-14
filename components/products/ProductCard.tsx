import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/utils';
import { type Product } from '@prisma/client';
import Image from 'next/image';
import AddProductButton from './AddProductButton';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="border bg-white">
      <Image
        width={400}
        height={500}
        src={`/products/${product.image}.jpg`}
        alt={`Imagen platillo ${product.name}`}
      />
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className=" font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
      </CardContent>
      <CardFooter>
        <AddProductButton product={product} />
      </CardFooter>
    </Card>
  );
}
