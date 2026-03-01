import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, HeadphonesIcon, Leaf, Sprout, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "/cover.webp";
import { useEffect, useState } from "react";
import { api, toApiURL } from "@/lib/api";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  stock?: number;
  category?: string;
};

const Index = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coverSrc, setCoverSrc] = useState<string>("/cover.webp");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (mounted) setError(msg || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={coverSrc}
            onError={() => setCoverSrc(heroBanner)}
            alt="Floral cupcakes cover"
            className="h-full w-full object-cover object-center scale-105 animate-in fade-in zoom-in-105 duration-1000"
            loading="eager"
            fetchPriority="high"
            width="1920"
            height="1080"
          />
          {/* Agricultural gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-green-950/80 via-green-900/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-amber-50/90 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl text-white drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-green-50 font-medium text-sm mb-6">
              {t("brand", "AgroMarket - Plateforme des Fermiers")}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-display text-white">
              Cultivons l'Avenir Ensemble
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-green-50/90 font-light max-w-xl leading-relaxed">
              Achetez directement auprès des fermiers locaux. Produits frais, naturels et de qualité.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/products" aria-label={t("cta.shop")}>
                <Button
                  size="lg"
                  className="bg-green-50 text-green-900 hover:bg-green-100 border-none rounded-full px-8 h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  Explorer les Produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about" aria-label={t("cta.info")}>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8 h-14 text-lg font-medium backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  En Savoir Plus
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-green-900/50 hidden md:block">
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-current rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-100 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50/50 border border-green-100 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-1">
              <div className="p-3 rounded-xl bg-white text-green-600 shadow-sm">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg mb-2 text-green-950">
                  Produits 100% Bio
                </h2>
                <p className="text-sm text-green-900/70 leading-relaxed">
                  Tous nos produits sont cultivés naturellement, sans pesticides ni produits chimiques.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50/50 border border-green-100 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-1 delay-100">
              <div className="p-3 rounded-xl bg-white text-green-600 shadow-sm">
                <Sprout className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg mb-2 text-green-950">
                  Frais du Champ
                </h2>
                <p className="text-sm text-green-900/70 leading-relaxed">
                  Livrés directement du champ. Retrouvez la saveur authentique et la nutritibilité optimale.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50/50 border border-green-100 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-1 delay-200">
              <div className="p-3 rounded-xl bg-white text-green-600 shadow-sm">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-lg mb-2 text-green-950">
                  Soutenez Localement
                </h2>
                <p className="text-sm text-green-900/70 leading-relaxed">
                  Achetez directement aux fermiers. Aucun intermédiaire, prix juste et équitable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-linear-to-b from-white to-green-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="text-green-600 font-medium tracking-wider uppercase text-sm mb-2 block">
              Decouvrez Notre Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-green-950">
              Nos Produits Fermiers
            </h2>
            <p className="text-green-900/60 max-w-2xl mx-auto text-lg font-light">
              Une variété de produits frais et de qualité provenant des meilleures fermes locales
            </p>
          </div>

          {loading && (
            <div className="rounded-2xl bg-card/95 border border-border ring-1 ring-border/60 shadow-lg shadow-primary/10 p-4 sm:p-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[300px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-destructive">
              Error: {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No products available
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              {/* Floral panel wrapper for featured grid */}
              <div className="rounded-2xl bg-green-50/50 border border-green-100 ring-1 ring-green-100/60 shadow-lg shadow-green-100/10 p-4 sm:p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((product) => (
                    <div
                      key={product._id}
                      className="animate-in fade-in slide-in-from-bottom-1 duration-300"
                    >
                      <ProductCard
                        key={product._id}
                        id={product._id}
                        name={product.title}
                        price={product.price}
                        image={toApiURL(product.images?.[0])}
                        category={product.category || ""}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center animate-in fade-in slide-in-from-bottom-1 duration-300 mt-12">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-12 gap-2 shadow-lg hover:shadow-green-200 transition-all duration-300 cursor-pointer"
                  >
                    Voir Tous les Produits
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-green-900 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad576?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display animate-in fade-in slide-in-from-bottom-2 duration-500">
            Rejoignez la Revolution Agricole
          </h2>
          <p className="text-xl mb-10 text-green-100 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
            Que vous soyez fermier, vendeur ou acheteur responsable - ensemble, localisons l'agriculture et soutenons les économies communautaires.
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-green-50 text-green-900 hover:bg-green-100 rounded-full px-10 h-14 text-lg font-medium gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-1 cursor-pointer"
            >
              Commencer Maintenant
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
