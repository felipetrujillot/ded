import fs from 'fs/promises'
import path from 'path'

/**
 *
 * @param text
 * @returns
 */
export const processText = (text: string) => {
  let newText = ''
  const splittedText = text.split(' ')

  splittedText.forEach((s, k) => {
    newText += `<mark name="_${k}"/>${s} `
  })

  return `<speak>${newText}</speak>`
}

/**
 *
 * @param seconds
 * @returns
 */
const formatSrtTime = (seconds: number) => {
  const date = new Date(seconds * 1000)
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const secs = String(date.getUTCSeconds()).padStart(2, '0')
  const millis = String(date.getUTCMilliseconds()).padStart(3, '0')
  return `${hours}:${minutes}:${secs},${millis}`
}

type Timepoints = {
  markName?: string | null
  timeSeconds?: number | null
}
/**
 *
 * @param timepoints
 * @returns
 */
export const generateSrt = async (
  fullText: string,
  timepoints: Timepoints[],
  folder: string
) => {
  const srt_fullname = `public/${folder}/subtitles.srt`

  const splittedText = fullText.split(' ')

  let srtContent = ''
  timepoints.forEach((point, index) => {
    const startTime = formatSrtTime(point.timeSeconds!)
    const endTime = formatSrtTime(
      index < timepoints!.length - 1
        ? timepoints[index + 1]!.timeSeconds!
        : point.timeSeconds! + 2 // Give 2 seconds at the end of last subtitle
    )

    const processedName = point.markName!.replaceAll(`_`, '')

    srtContent += `${index + 1}\n`
    srtContent += `${startTime} --> ${endTime}\n`
    srtContent += `${splittedText[parseInt(processedName)]}\n\n`
  })

  await fs.writeFile(srt_fullname, srtContent)

  return srt_fullname
}
