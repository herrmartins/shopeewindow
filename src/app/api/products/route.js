import { getProductModel, serializeProduct } from '../../models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const Product = await getProductModel();
    const rawProducts = await Product.find({}).lean();
    const products = rawProducts.map(serializeProduct);

    return Response.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}