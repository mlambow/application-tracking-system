import { Skeleton } from "~/components/ui/skeleton"

const SkeletonLoader = () => {
  return (
    <div >

      {/* summary */}
      <section className=" space-y-6 py-3">
        <div className="rounded-xl w-full">
          <div className="flex sm:flex-row flex-col items-center pb-4 gap-6">
            <Skeleton className="w-40 h-20 rounded-2xl bg-gray-200" />
            <div>
              <Skeleton className="w-32 h-6 mb-4 bg-gray-200" />
              <Skeleton className="w-56 h-4 bg-gray-200" />
            </div>
          </div>
          <Skeleton className="w-full h-16 mb-3 bg-gray-200" />
          <Skeleton className="w-full h-16 mb-3 bg-gray-200" />
          <Skeleton className="w-full h-16 mb-3 bg-gray-200" />
          <Skeleton className="w-full h-16 bg-gray-200" />
        </div>
        <div className="rounded-2xl w-full to-light-white py-2 flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <Skeleton className="w-12 h-10 bg-gray-200"/>
            <Skeleton className="w-36 h-6 bg-gray-200" />
          </div>

          {/* ATS */}
          <div>
            <Skeleton className="w-full h-6 mb-3 bg-gray-200" />
            <Skeleton className="w-full h-6 mb-3 bg-gray-200" />
            <Skeleton className="w-full h-6 mb-3 bg-gray-200" />
            <Skeleton className="w-full h-6 mb-3 bg-gray-200" />
            <Skeleton className="w-full h-6 mb-3 bg-gray-200" />
            <Skeleton className="w-full h-6 mb-3 bg-gray-200" />
            <Skeleton className="w-full h-6 bg-gray-200" />
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center bg-gray-200 animate-pulse rounded-2xl p-4">
            <Skeleton className="w-36 h-8 bg-gray-100"/>
            <Skeleton className="w-12 h-6 bg-gray-100 ml-4" />
          </div>
          <div className="flex gap-2 items-center bg-gray-200 animate-pulse rounded-2xl p-4">
            <Skeleton className="w-36 h-8 bg-gray-100"/>
            <Skeleton className="w-12 h-6 bg-gray-100 ml-4" />
          </div>
          <div className="flex gap-2 items-center bg-gray-200 animate-pulse rounded-2xl p-4">
            <Skeleton className="w-36 h-8 bg-gray-100"/>
            <Skeleton className="w-12 h-6 bg-gray-100 ml-4" />
          </div>
          <div className="flex gap-2 items-center bg-gray-200 animate-pulse rounded-2xl p-4">
            <Skeleton className="w-36 h-8 bg-gray-100"/>
            <Skeleton className="w-12 h-6 bg-gray-100 ml-4" />
          </div>
        </div>
      </section>
      </div>
  )
}

export default SkeletonLoader