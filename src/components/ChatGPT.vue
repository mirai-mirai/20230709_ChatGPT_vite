<script setup lang="ts">
import { CFG } from '../config'
import { ref } from 'vue'
import { $ref } from 'vue/macros'

const $log = ref<HTMLElement>()
const $prompt = ref<HTMLElement>()
const $models = ref<HTMLDivElement>()



let log: HTMLElement
let prompt: HTMLTextAreaElement

const headers = new Headers(
  {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CFG.OPENAI_API_KEY,
    // 'OpenAI-Organization': CFG.OPENAI_ORG_ID,
  }
)

const listmodels = async () => {
  // 結果表示用の関数
  const dispResult = (res: string) => {
    ($models.value as HTMLDivElement).innerText = res
  }
  dispResult('Loading...')

  // データ取得
  const response: Response | void = await fetch(
    CFG.API.MODELS, { method: 'GET', headers }
  )

  // 結果の表示
  const json = await response!.json()
  let result = ''
  json.data.forEach(({ id }: { id: string }) => {
    result = result == '' ? id : result + ', ' + id
  })
  dispResult(result)
}

const test = async () => {
  log.innerHTML = 'Loading...'
  const data = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'model': "gpt-3.5-turbo",
      "messages": [{ "role": "user", "content": "Say this is a test!" }],
      "temperature": 0.7
    })
  }
  const response = await fetch(CFG.API.COMPLETION, data)
  const json = await response.json()
  log.innerHTML = json.choices[0].message.content
}

const completions = async () => {
  console.log(CFG.API.COMPLETION)

  log.innerHTML = 'Loading...'
  const data = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + CFG.OPENAI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'model': "gpt-3.5-turbo",
      'prompt': 'this is a test',
      'max_tokens': 150,
    })
  }
  console.log(data)

  const response = await fetch(
    CFG.API.COMPLETION,
    data
    // {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Bearer ' + CFG.OPENAI_API_KEY,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     'model': "gpt-3.5-turbo",
    //     'prompt': 'this is a test',
    //     'max_tokens': 150,
    //   })}
  )
  console.log(response)
  const json = await response.json()
  log.innerHTML = json.choices[0].text
}

const chat = async () => {
  log.innerHTML = 'Loading...'
  const response = await fetch(
    CFG.API.CHAT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CFG.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: prompt.textContent,
      max_tokens: 150,
    })
  })
  const json = await response.json()
  log.innerHTML = json.choices[0].text
}

window.onload = async () => {
  log = $log.value as HTMLElement
  prompt = $prompt.value as HTMLTextAreaElement
}

</script>

<template>
  <div>
    <button type="button" @click="listmodels()">OPENAI モデル一覧取得</button>
    <div id="models" ref="$models"></div>
    <H1>ChatGPT sandbox</H1>
    <textarea id="prompt" ref="$prompt">
      [
   {
    "role": "system",
    "content": "You are a helpful assistant."
   },
   {
    "role": "user",
    "content": "Hello!"
   }
  ]
    </textarea>
    <br>
    <button type="button" @click="test()">テスト</button>
    <button type="button" @click="completions()"> 投稿</button>
    <br>
    <div id="log" ref="$log"></div>
  </div>
</template>

<style scoped>
#models {
  display: flexbox;
  width: 80%;
  height: 300px;
}

#prompt {
  width: 80%;
  height: 50px;
}

#log {
  display: flexbox;
  width: 80%;
  height: 400px;
}
</style>
