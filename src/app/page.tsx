'use client'
import { useState, useEffect, useMemo } from "react"
import { WorkerType } from "@/types/workers"
import WorkerCard from "@/components/WorkerCard"

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Filters
  const [selectedService, setSelectedService] = useState<string>("All")
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const itemsPerPage = 9
  const visiblePageCount = 5

  // Fetch from API
  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("/api/workers", { cache: "force-cache" })
        if (!res.ok) throw new Error("Failed to fetch workers")

        const json: { success: boolean; data: WorkerType[] } = await res.json()
        if (json.success && Array.isArray(json.data)) {
          setWorkersData(json.data)
        } else {
          throw new Error("Invalid API response")
        }
      } catch (err: unknown) {
        console.error("Error loading workers:", err)
        const message = err instanceof Error ? err.message : "Something went wrong"
        setError(message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Extract unique services
  const services = useMemo(
    () => Array.from(new Set(workersData.map(w => w.service))).sort(),
    [workersData]
  )

  // Handle max price input
  const handleMaxPriceChange = (val: string): void => {
    const cleaned = val.replace(/[^\d.]/g, "")
    setMaxPrice(cleaned ? parseFloat(cleaned) : null)
    setCurrentPage(1)
  }

  // Apply filters
  const filteredWorkers = useMemo(() => {
    return workersData
      .filter(w => {
        const basePrice = Number(w.pricePerDay) || 0
        const displayedPrice = Math.round(basePrice * 1.18)
        if (w.id === null) return false
        if (basePrice <= 0) return false
        if (selectedService !== "All" && w.service !== selectedService) return false
        if (maxPrice !== null && displayedPrice > maxPrice) return false
        return true
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, selectedService, maxPrice])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentWorkers = filteredWorkers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.max(1, Math.ceil(filteredWorkers.length / itemsPerPage))

  // Sliding window for page numbers
  let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2))
  let endPage = startPage + visiblePageCount - 1
  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - visiblePageCount + 1)
  }
  const pageNumbers =
    totalPages > 0 ? Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx) : []

  // Reset page if filters reduce results
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [totalPages, currentPage])

  return (
    <main className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Our Workers
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          value={selectedService}
          onChange={e => {
            setSelectedService(e.target.value)
            setCurrentPage(1)
          }}
          className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="All">All Services</option>
          {services.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        <input
          type="text"
          inputMode="numeric"
          placeholder="Max price per day (incl. GST)"
          value={maxPrice ?? ""}
          onChange={e => handleMaxPriceChange(e.target.value)}
          className="px-3 py-2 border rounded w-56 bg-white dark:bg-gray-800 dark:text-gray-200"
        />

        <button
          onClick={() => {
            setSelectedService("All")
            setMaxPrice(null)
            setCurrentPage(1)
          }}
          className="px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:text-gray-200"
        >
          Clear Filters
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-center text-red-500 font-medium mb-6">{error}</div>
      )}

      {/* Workers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <div
                key={i}
                className="h-72 w-full max-w-[250px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
              />
            ))
          : currentWorkers.length > 0
          ? currentWorkers.map(worker => <WorkerCard key={worker.id} worker={worker} />)
          : (
              <div className="col-span-full text-center text-gray-600 dark:text-gray-300 mt-8">
                No workers found with the selected filters.
              </div>
            )}
      </div>

      {/* Pagination */}
      {!loading && filteredWorkers.length > itemsPerPage && (
        <div className="flex flex-wrap justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded border bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-3 py-1 rounded border ${
                pageNumber === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 rounded border bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  )
}

// Fix for ESLint react/display-name
WorkerCard.displayName = "WorkerCard"
