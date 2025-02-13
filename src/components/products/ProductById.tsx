import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "@/api/products";

export default function ProductById() {
  interface Product {
    id: string;
    titre: string;
    description: string;
    prix: number;
    quantite: number;
    image_url: string;
  }

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Impossible de récupérer le produit.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Produit introuvable.</p>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <img src={product.image_url} alt={product.titre} className="w-full h-auto" />
      <div className="h-full px-4 flex flex-col justify-center gap-4 md:p-16">
        <h1>{product.titre}</h1>
        <p>{product.description}</p>
        <p>Quantité: {product.quantite}</p>
        <p>Prix: {product.prix}€</p>
      </div>
    </div>
  );
}
