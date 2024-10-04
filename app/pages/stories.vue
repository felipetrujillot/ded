<script setup lang="ts">
import { LucideLaptop, LucideSmartphone } from 'lucide-vue-next'

definePageMeta({
  layout: 'user-layout',
})

useHead({
  title: `Palace - New story`,
  meta: [{ name: 'description', content: 'Palace' }],
})

/**
 *
 */
const addForm = ref<{
  title: string
  text: string
  reddit_url: string
  voice:string
  orientation: 'vertical' | 'horizontal'
}>({
  voice: 'en-US-Standard-A',
  reddit_url: '',
  title : `M31 My now exgirlfriend F29 broke up with me in one day, after 7.5 yrs together, what do I do?
`,
text:  `So the title pretty much says it all. But we had a very good 7.5 yrs together with minimal fighting. We own a house together and have 2 dogs & 2 cats. A lot of people envied our relationship for how well we knew each other and complimented each other. Marriage was always the goal but we had some extreme family losses that made us keep delaying. But finally we had picked out an engagement ring about a month prior to this.

`,
  orientation: 'vertical',
})

const video = ref('output/video.mp4')

const page = ref<'form' | 'pending' | 'video'>('form')
const redditStatus = ref<'success' | 'pending' | 'error' | 'none'>('none')
/**
 *
 */
const newVideo = async () => {
  page.value = 'pending'
  const { title, text, orientation ,voice} = addForm.value

  const res = await $fetch('/api/video', {
    method: 'POST',
    body: {
      title: title,
      text: text,
      orientation: orientation,
      voice: voice
    },
  })

  video.value = res.video

  page.value = 'video'
}

/**
 *
 */
const searchReddit = async () => {
  redditStatus.value = 'pending'
  const { reddit_url } = addForm.value

  const res = await $fetch('/api/reddit', {
    method: 'POST',
    body: {
      url: reddit_url,
    },
  })

  addForm.value.text = res.content
  addForm.value.title = res.title
  redditStatus.value = 'success'
}
</script>

<template>
  <div>
    <h1 class="font-medium text-2xl">New story</h1>
    <h2 class="text-muted-foreground text-sm">Add your new story</h2>
  </div>
  <Card v-if="page === 'form'">
    <div class="space-y-2">
      <div class="flex justify-between items-end w-full">
        <div class="w-full">
          <Label for="title">URL Reddit</Label>

          <Input
            v-model="addForm.reddit_url"
            placeholder="https://old.reddit.com/r/relationship_advice/comments/..."
            type="text"
            class="w-full"
          />
        </div>
        <Button @click.prevent="searchReddit">Search</Button>
      </div>
    </div>


    <div>
      <Label>Voice</Label>

      {{addForm.voice}}
      <Select v-model="addForm.voice">
    <SelectTrigger class="w-[200px]">
      <SelectValue placeholder="Select a voice" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Voices</SelectLabel>
        <SelectItem value="en-US-Neural2-A">
              en-US-Neural2-A
        </SelectItem>
        <SelectItem value="en-US-Standard-A">
          en-US-Standard-A
        </SelectItem>
        <SelectItem value="en-US-Standard-B">
                    en-US-Standard-B

        </SelectItem>
        <SelectItem value="en-US-Standard-C">
          en-US-Standard-C
          
        </SelectItem>
        
      </SelectGroup>
    </SelectContent>
  </Select>
    </div>

    <div>
      <Label for="title">Title</Label>
      <VueSkeleton v-if="redditStatus === 'pending'" />
      <Textarea
        v-if="redditStatus === 'success' || redditStatus === 'none'"
        v-model="addForm.title"
        placeholder="Document title"
        required
        type="text"
      />
    </div>

    <div>
      <Label for="text">Descripción</Label>
      <VueSkeleton v-if="redditStatus === 'pending'" />

      <Textarea
        v-if="redditStatus === 'success' || redditStatus === 'none'"
        v-model="addForm.text"
        placeholder="Document title"
        required
        class="min-h-48"
        style="field-sizing: content"
      />
    </div>

    <div>
      <Label for="text">Orientación</Label>

      <div class="flex gap-4">
        <div
          @click.prevent="addForm.orientation = 'vertical'"
          :class="
            addForm.orientation === 'vertical'
              ? 'border-primary '
              : 'border-secondary'
          "
          class="cursor-pointer border border-2 flex flex-col gap-2 items-center justify-center h-40 w-32"
        >
          <div class="text-center flex justify-center flex-col">
            <LucideSmartphone :size="30" />
          </div>
          <div class="text-center flex justify-center flex-col">
            <Label>Vertical</Label>
          </div>
        </div>

        <div
          @click.prevent="addForm.orientation = 'horizontal'"
          :class="
            addForm.orientation === 'horizontal'
              ? 'border-primary '
              : 'border-secondary'
          "
          class="cursor-pointer border border-2 flex flex-col gap-2 items-center justify-center h-40 w-32"
        >
          <div class="text-center flex justify-center flex-col">
            <LucideLaptop :size="30" />
          </div>
          <div class="text-center flex justify-center flex-col">
            <Label>Horizontal</Label>
          </div>
        </div>
      </div>
    </div>
  </Card>
  <div class="text-end" v-if="page === 'form'"">
    <Button @click.prevent="newVideo">Crear Video</Button>
  </div>

  <Card v-if="page === 'pending'">
    <VueSkeleton />
  </Card>

  <Card v-if="page ==='video'">
    <div v-if="video.length > 0">
      <video width="300" controls :src="video" />
    </div>
  </Card>
</template>
