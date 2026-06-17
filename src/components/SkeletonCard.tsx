export function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border h-full flex flex-col animate-pulse">
      <div className="aspect-[4/3] bg-muted relative">
        <div className="absolute top-3 left-3 w-20 h-6 bg-background rounded-full" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="h-6 bg-muted rounded w-1/2" />
          <div className="h-6 bg-muted rounded w-16" />
        </div>
        <div className="space-y-2 mt-auto">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
