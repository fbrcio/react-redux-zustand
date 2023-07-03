import * as React from 'react'
import { MessageCircle } from 'lucide-react'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Player() {
  const { course, isLoading, load } = useStore(store => {
    return {
      course: store.course,
      isLoading: store.isLoading,
      load: store.load
    }
  })

  const { currentLesson, currentModule } = useCurrentLesson()

  React.useEffect(() => {
    if (currentLesson && currentModule) {
      document.title = `Assistindo: ${currentLesson.title} | Módulo: ${currentModule.title}`
    }
  }, [useCurrentLesson])

  React.useEffect(() => {
    load()  
  }, [])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle />  
            Deixar Feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          
          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-950">
            {isLoading ? (
              <Module 
                key={'loading-state'}
                moduleIndex={1}
                title={'Loading'}
                amountOfLessons={0}
              />
            ) : (
              course?.modules && course.modules.map((module, index) => (
                <Module 
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}