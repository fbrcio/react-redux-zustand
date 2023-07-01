import ReactPlayer from "react-player";
import { useCurrentLesson } from "../store";
import { useDispatch } from "react-redux";
import { next } from "../store/slices/player";

export function Video() {
  const dispatch = useDispatch()

  const { currentLesson } = useCurrentLesson()
  
  function handlePlayNextVideo() {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        onEnded={handlePlayNextVideo}
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
      />
    </div>
  )
}