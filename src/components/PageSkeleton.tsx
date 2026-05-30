import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = () => (
  <div className="rounded-2xl bg-card/20 backdrop-blur-xl border border-white/20 p-7 space-y-4">
    <Skeleton className="w-12 h-12 rounded-xl" />
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

export const TranscriptSkeleton = () => (
  <div className="space-y-4 p-5">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-5 w-8 rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    ))}
  </div>
);

export const PricingCardSkeleton = () => (
  <div className="rounded-2xl bg-card/20 backdrop-blur-xl border border-white/20 p-8 space-y-6">
    <Skeleton className="w-11 h-11 rounded-xl" />
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-10 w-2/3" />
    <Skeleton className="h-12 w-full rounded-full" />
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <section className="pt-32 pb-20">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-48 rounded-full" />
            <Skeleton className="h-14 w-40 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-[400px] w-full rounded-3xl" />
      </div>
    </div>
  </section>
);
