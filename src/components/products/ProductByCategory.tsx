import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductByCategory } from "@/api/products";
import ProductCard from "@/components/ui/ProductCard";

interface Product {
  id: string;
  titre: string;
  description: string;
  prix: number;
  quantite: number;
  image_url: string;
}

export default function ProductByCategory() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const data = await fetchProductByCategory(category);
        setProducts(data);
      } catch (err) {
        setError("Impossible de récupérer les produits.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>Aucun produit trouvé pour cette catégorie.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      title: product.titre,
                      description: product.description,
                      price: product.prix,
                      quantity: product.quantite,
                      imageUrl: product.image_url,
                    }}
                  />
                ))}
    </div>
  );
}
