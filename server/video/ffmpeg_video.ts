import ffmpeg from 'fluent-ffmpeg'

/**
 * @param filePath
 * @returns
 */
export const getMP3Duration = async (filePath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        console.error('Error reading mp3 file:', err)
        reject(err) // Reject the promise with the error
        return
      }
      const duration = metadata.format.duration
      resolve(duration!) // Resolve the promise with the duration
    })
  })
}

type InputNewVideo = {
  picture_file: string
  srt_file: string
  audio_file: string
  duration: number
  folder: string
}
/**
 *
 * @param picture_file
 * @param srt_file
 * @param audio_file
 * @param duration
 */

export const newVideo = async ({
  picture_file,
  srt_file,
  audio_file,
  duration,
  folder,
}: InputNewVideo): Promise<string> => {
  const file_name = Math.floor(10000 + Math.random() * 90000).toString()

  return new Promise((resolve, reject) => {
    const command = ffmpeg()

    command.size('500x1000')
    command.input('public/minecraft.mp4').videoFilter([
      'fade=in:0:125',
      `subtitles=${srt_file}:force_style='Fontname=Arial,Fontsize=15,OutlineColour=&H80000000,PrimaryColour=&H03fcff,BorderStyle=4,"
          "BackColour=&H80000000,Outline=1,Shadow=0,MarginV=10,Alignment=10,Bold=-1'`,
    ])

    command.input(audio_file)

    command.duration(duration)

    command
      .outputOptions([
        '-map',
        '0:v:0', // Map the first video stream from the first input
        '-map',
        '1:a:0', // Map the first audio stream from the second input
      ])
      .outputOptions('-pix_fmt yuv420p')
      .outputOptions('-c:v libx264')
      .outputOptions('-c:a aac')
      .outputOptions('-shortest')
      .output(`public/${folder}/${file_name}.mp4`)
      .on('end', () => {
        console.log('ok')
        resolve(`${folder}/${file_name}.mp4`)
      })
      .on('error', (err) => {
        reject(err)
        throw err
        console.error('Error during video creation:', err)
      })

      .run()
  })
}
