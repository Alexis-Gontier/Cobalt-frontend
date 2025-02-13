type Product = {
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-200 p-4 m-4">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <img src={product.imageUrl} alt={product.title} width={200} />
    </div>
  );
}
