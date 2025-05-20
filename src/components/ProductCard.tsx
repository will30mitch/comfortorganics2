import Image from "next/image";
import { useState } from "react";
import styles from "../app/home.module.css";

interface ProductCardProps {
  product: any;
  onViewDetails: (product: any) => void;
  onAddToCart: (item: any) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const variations = product.itemData?.variations || [];
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedVariation = variations[selectedIdx]?.itemVariationData;
  const price = selectedVariation?.priceMoney?.amount
    ? Number(selectedVariation.priceMoney.amount) / 100
    : 0;
  const optionName = selectedVariation?.name || product.itemData?.name;

  // Hardcoded image mapping for specific products
  const productImages: Record<string, string> = {
    "Fruity Bites": "/Fruity-bites.jpg",
    "Super Boof": "/Super-boof.jpg",
    "Tropicana Cookies": "/Tropicana-cookies.jpg",
    "Pink Runtz": "/Pink-runtz.jpg",
    "Cereal Milk": "/Cereal-milk.jpg",
    "Mixed Batch": "/Mixed.jpg",
    "Comfort Brownies": "/Comfort-brownies.jpg",
    "Chocolate chip cookies": "/Chocolate-chip.jpg",
    "Cinnamon Toast Crunch": "/Cinnamon-toast.jpg",
    "Pre-rolls": "/Chocolate-chip-cookies.jpg",

    // Add more mappings as needed, e.g. "Super Boof": "/Super-boof.jpg"
  };

  // Use hardcoded image if available, otherwise use product.itemData?.imageUrl, otherwise placeholder
  const imageUrl = productImages[product.itemData?.name] || product.itemData?.imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <Image src={imageUrl} alt={product.itemData?.name} fill style={{ objectFit: "cover" }} />
      </div>
      <div className={styles.productInfo}>
        <h3>{product.itemData?.name}</h3>
        {/* Variations Dropdown */}
        {variations.length > 1 && (
          <select
            value={selectedIdx}
            onChange={e => setSelectedIdx(Number(e.target.value))}
            style={{ marginBottom: '0.5rem', padding: '0.3rem', borderRadius: 6, color: 'black' }}
          >
            {variations.map((v: any, idx: number) => (
              <option key={v.id} value={idx}>
                {v.itemVariationData.name} — $
                {v.itemVariationData.priceMoney?.amount
                  ? (Number(v.itemVariationData.priceMoney.amount) / 100).toFixed(2)
                  : '0.00'}
              </option>
            ))}
          </select>
        )}
        {variations.length === 1 && (
          <p className={styles.price}>${price.toFixed(2)}</p>
        )}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            className={styles.viewButton}
            style={{ minWidth: 140, minHeight: 70, fontSize: 20, fontWeight: 'bold', borderRadius: 32 }}
            onClick={() => onViewDetails(product)}
          >
            View Details
          </button>
          <button
            className={styles.ctaButton}
            style={{ minWidth: 140, minHeight: 70, fontSize: 22, fontWeight: 'bold', borderRadius: 32 }}
            onClick={e => {
              e.stopPropagation();
              onAddToCart({
                id: variations[selectedIdx]?.id || product.id,
                name: product.itemData?.name || 'Product',
                price,
                quantity: 1,
                description: product.itemData?.description,
                variationId: variations[selectedIdx]?.id,
                variationName: optionName,
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 