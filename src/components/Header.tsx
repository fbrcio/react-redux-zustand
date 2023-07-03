import { useCurrentLesson, useStore } from "../zustand-store"

export function Header() {
  const isLoading = useStore(store => store.isLoading)

  const { currentLesson, currentModule } = useCurrentLesson()

  return (
    <>
      { isLoading ? (
        <div className="flex flex-col gap-1 space-y-2.5 animate-pulse max-w-lg">
          <div className="h-2.5 w-44 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
          <span className="text-sm text-zinc-400">{currentModule?.title}</span>
        </div>
      ) }
    </>
  )
}