import { getRedditStory } from '../reddit/scrapper'
import z from 'zod'

/**
 *
 *
 */
export default defineEventHandler(async (event) => {
  const userSchema = z.object({
    url: z.string(),
  })

  const result = await readValidatedBody(event, (body) =>
    userSchema.safeParse(body)
  )
  if (!result.success) throw result.error.issues

  const { url } = result.data

  /* const URL =
    'https://www.reddit.com/r/relationship_advice/comments/1fusbnx/my_31m_gf_27f_got_drunk_and_broke_up_with_me_over/'
 */
  return await getRedditStory(url)
})
