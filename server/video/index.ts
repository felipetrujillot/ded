import { ttsGCP } from './text_to_speech'
import { generateSrt, processText } from './subtitles'
import { newVideo, getMP3Duration } from './ffmpeg_video'

type InputGenerateVideo = {
  title: string
  text: string
  orientation: 'horizontal' | 'vertical'
  voice: string
}

/**
 *
 * @param param0
 */
export const generateVideo = async ({
  title,
  text,
  voice,
}: InputGenerateVideo) => {
  const FOLDER_NAME = 'output'

  const fullText = `${title}.
${text}`

  const { processedText, splittedText } = processText(fullText)

  const { filename, timepoints } = await ttsGCP({
    text: processedText,
    filename: 'output.mp3',
    folder: FOLDER_NAME,
    voice: voice,
  })

  if (timepoints?.length === 0)
    throw new Error('No se generaron timepoints para .srt')

  const srt_file = await generateSrt(splittedText, timepoints!, 'output')

  const duration = await getMP3Duration(filename)

  const videoName = await newVideo({
    picture_file: 'public/new.jpg',
    srt_file: srt_file,
    audio_file: filename,
    duration: duration,
    folder: FOLDER_NAME,
  })

  return videoName
}
