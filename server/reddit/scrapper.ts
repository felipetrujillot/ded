import * as cheerio from 'cheerio'

export const getRedditStory = async (url: string) => {
  /* const URL =
    'https://www.reddit.com/r/relationship_advice/comments/1fusbnx/my_31m_gf_27f_got_drunk_and_broke_up_with_me_over/'
 */
  const CLEAN_URL = url.replaceAll('www.reddit.com', 'old.reddit.com')

  const res = await fetch(CLEAN_URL)

  const html = await res.text()

  const $ = cheerio.load(html)

  const title = $('.top-matter .title a.title').text().trim()

  //  const title = linkElement.text().trim()

  const content = $('.expando .usertext-body .md p').text()

  return {
    title: title,
    content: content,
  }
}
