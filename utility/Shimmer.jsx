export const Shimmer = () => {
  return (
    <div className="flex flex-col mx-auto w-full max-w-sm rounded-md p-4">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-200"></div>
          <div className="flex pl-1">
            <div className="status status-info bg-[#ccc] animate-bounce"></div>
            <div className="status status-info bg-[#ccc] animate-bounce"></div>
            <div className="status status-info bg-[#ccc] animate-bounce"></div>
          </div>
          <div className="space-y-3">
            <div className="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
