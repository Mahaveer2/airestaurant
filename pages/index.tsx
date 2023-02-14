import Pricing from 'components/Pricing';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';

interface Props {
  products: Product[];
}

export default function PricingPage({ products }: Props) {
  return <Pricing products={products} />;
}

export async function getServerSideProps(): Promise<GetServerSideProps<Props>> {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products
    },
  };
}
