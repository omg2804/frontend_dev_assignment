'use client'
import { memo } from "react"
import Image from "next/image"
import { WorkerType } from "@/types/workers"

interface WorkerCardProps {
  worker: WorkerType
}

const WorkerCard = memo(({ worker }: WorkerCardProps) => {
  const isPriority = worker.id !== undefined && worker.id <= 10

  return (
    <article className="w-full max-w-[250px] bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out">
      <div className="w-full h-48 relative">
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          className="object-cover"
          {...(isPriority ? { priority: true } : { loading: "lazy" })}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {worker.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{worker.service}</p>
        <p className="mt-2 font-medium text-gray-800 dark:text-gray-100">
          ₹{Math.round(worker.pricePerDay * 1.18)} / day
        </p>
      </div>
    </article>
  )
})
WorkerCard.displayName = "WorkerCard"
export default WorkerCard
