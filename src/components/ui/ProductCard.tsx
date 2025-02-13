import {Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

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
    <Link to={`/products/${product.title}`} className="group">
      <Card className="overflow-hidden">
        <div className="w-[100%] overflow-hidden">
          <AspectRatio ratio={16 / 12}>
            <img src={product.imageUrl} alt={product.title} className="object-cover transition-transform duration-300 group-hover:scale-105"/>
          </AspectRatio>
        </div>
        <CardFooter className="flex flex-col gap-2">
          <CardTitle>
            {product.title}
          </CardTitle>
          <CardDescription>
            <p>Price: {product.price} £</p>
            {/* <p>{product.description}</p> */}
            {/* <p>Quantity: {product.quantity}</p> */}
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
