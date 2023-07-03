import { useAppSelector } from "../store"
import { useCurrentLesson } from "../store/slices/player"

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson()
  const isCourseLoading = useAppSelector(state => state.player.isLoading)

  return (
    <>
      { isCourseLoading ? (
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