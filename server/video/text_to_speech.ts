import textToSpeech from '@google-cloud/text-to-speech/build/src/v1beta1'
import fs from 'fs/promises'

/**
 *
 * @param param0
 * @returns
 */
export const ttsGCP = async ({
  text,
  filename,
  folder,
  voice,
}: {
  text: string
  filename: string
  folder: string
  voice: string
}) => {
  const client = new textToSpeech.TextToSpeechClient()

  enum TimepointType {
    TIMEPOINT_TYPE_UNSPECIFIED = 0,
    SSML_MARK = 1,
  }

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech({
    input: { ssml: text },
    // Select the language and SSML voice gender (optional)
    //voice: { languageCode: 'en-US', name: 'en-US-Journey-F' },
    // select the type of audio encoding
    voice: {
      name: voice,
      languageCode: 'en-US',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      effectsProfileId: ['small-bluetooth-speaker-class-device'],
      pitch: 0,
      speakingRate: 1.1,
    },
    enableTimePointing: [TimepointType.SSML_MARK],
  })
  const fullPath = `public/${folder}/${filename}`

  await fs.mkdir(`public/${folder}`, { recursive: true })

  await fs.writeFile(fullPath, response.audioContent!, 'binary')

  return { filename: fullPath, timepoints: response.timepoints }
}
