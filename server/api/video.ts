import z from 'zod'
import { generateVideo } from '../video'

/**
 *
 *
 */
export default defineEventHandler(async (event) => {
  const userSchema = z.object({
    title: z.string(),
    text: z.string(),
    orientation: z.enum(['horizontal', 'vertical']),
    voice: z.string(),
  })

  const result = await readValidatedBody(event, (body) =>
    userSchema.safeParse(body)
  )
  if (!result.success) throw result.error.issues

  const { title, text, orientation, voice } = result.data

  const videoName = await generateVideo({ title, text, orientation, voice })

  return {
    status: 'ok' as const,
    hello: 'world',
    video: videoName,
  }
})
