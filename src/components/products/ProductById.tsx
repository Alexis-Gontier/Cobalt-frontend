import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, addToCart } from "@/api/products";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/layouts/MainLayout";
import { useToast } from "@/hooks/use-toast";
export default function ProductById() {
  const userId: string | null = localStorage.getItem("userId");
  const refreshCart = useCart();

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
  const { toast } = useToast();
  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product.id, userId || "");
      refreshCart();
      toast({
        title: "Product added to cart",
        description: "The product has been added to the cart successfully.",
      });
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Impossible de récupérer le produit." + err);
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
      <img
        src={product.image_url}
        alt={product.titre}
        className="w-full h-auto drop-shadow-md"
      />
      <div className="h-full px-4 flex flex-col justify-center gap-16 md:p-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.titre}</h1>
          <Button
            className="flex justify-between cursor-pointer"
            onClick={handleAddToCart}
          >
            <span>Add to cart</span>
            <span>{product.prix}$</span>
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-md">Description</h2>
          <Separator />
          <p className="text-sm text-gray-500 italic">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
