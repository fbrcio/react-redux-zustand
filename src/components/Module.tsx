import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { Lesson } from "./Lesson";
import { useStore } from "../zustand-store";

interface ModuleProps {
  title: string
  moduleIndex: number
  amountOfLessons: number
}

export function Module({ title, moduleIndex, amountOfLessons }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, lessons, isLoading, play } = useStore(store => {
    return {
      currentLessonIndex: store.currentLessonIndex,
      currentModuleIndex: store.currentModuleIndex,
      isLoading: store.isLoading,
      play: store.play,
      lessons: store.course?.modules[moduleIndex].lessons
    }
  })

  return (
    <>
      { isLoading ? (
        <div className="animate-pulse" >
          <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
            <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950"></div>

            <div className="flex flex-col gap-1">
              <div className="block w-32 h-2 bg-zinc-700 rounded-full"></div>
              <div className="block w-16 h-1.5 bg-zinc-700 rounded-full"></div>
            </div>

            <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 translate-transform" />
          </div>
        </div>
      ) : (
        <Collapsible.Root className="group" defaultOpen={moduleIndex === 0} >
          <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
            <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-sm">
              {moduleIndex + 1}
            </div>

            <div className="flex flex-col gap-1 text-left">
              <strong className="text-sm">{title}</strong>
              <span className="text-xs text-zinc-400">
                {amountOfLessons >= 2 ? `${amountOfLessons} aulas` : `${amountOfLessons} aula`}
              </span>
            </div>

            <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 translate-transform" />
          </Collapsible.Trigger>
          
          <Collapsible.Content>
            <nav className="relative flex flex-col gap-4 p-6">
              {lessons && lessons.map((lesson, lessonIndex) => {
                  const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex

                  return (
                    <Lesson 
                      key={lesson.id}
                      title={lesson.title}
                      duration={lesson.duration}
                      isCurrent={isCurrent}
                      onPlay={() => play([moduleIndex, lessonIndex])}
                    />
                  ) 
                })}
            </nav>
          </Collapsible.Content>
        </Collapsible.Root>
      ) }
    </>
  )
}