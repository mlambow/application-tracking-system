import { Skeleton } from "~/components/ui/skeleton"

const SkeletonImage = () => {
  return (
    <section className="feedback-section w-full h-screen">
        <Skeleton className="h-full max-w-xl:h-fit w-full bg-gray-200 rounded-2xl" />
    </section>
  )
}

export default SkeletonImage