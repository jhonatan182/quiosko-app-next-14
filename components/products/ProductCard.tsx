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
import { Button } from '../ui/button';

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
        quality={100}
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
        <Button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase"
        >
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}
