import { fetchProducts } from "@/api/product";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

interface Product {
  id: string;
  titre: string;
  description: string;
  prix: number;
  quantite: number;
  image_url: string;
}

export default function ProductsScroll() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await fetchProducts();
      if (response && Array.isArray(response)) {
        setProducts(response);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul className="flex flex-col gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                title: product.titre,
                description: product.description,
                price: product.prix,
                quantity: product.quantite,
                imageUrl: product.image_url,
              }}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
}
