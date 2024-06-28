import ProductCard from '@/components/products/ProductCard';
import prisma from '@/db/prisma';
import { type Product } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { type Metadata } from 'next';

type Params = {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const id = params.category;

    // fetch data
    const category = await prisma.category.findFirstOrThrow({
      where: {
        slug: id,
      },
    });

    return {
      title: `Order - ${category?.name}`,
      description: `Informacion de la categoria ${category?.name}}`,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.message);
    }

    return {
      title: 'Order - Categoria no encontrada',
      description: 'No se pudo encontrar la categoria seleccionada',
    };
  }
}

async function getProductos(category: string): Promise<Product[]> {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
}

export default async function OrderDinamicPage({
  params: { category },
}: Params) {
  const products = await getProductos(category);

  return (
    <>
      <h1 className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
