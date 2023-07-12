<script setup lang="ts">
import { CFG } from '../config'
import { ref } from 'vue'
// import { $ref } from 'vue/macros'

const $log = ref<HTMLElement>()
const $prompt = ref<HTMLElement>()
const $models = ref<HTMLDivElement>()

let log: HTMLElement
let prompt: HTMLTextAreaElement

const headers = new Headers(
  {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CFG.K1 + CFG.K2,
    // 'OpenAI-Organization': CFG.ORG_ID,
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

const chat = async () => {
  console.log(CFG.API.COMPLETION)
  log.innerHTML = 'Loading...'
  const data = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      'model': "gpt-3.5-turbo",
      "messages": [{ "role": "user", "content": "Say this is a test!" }],
      "temperature": 0.7
    })
  }
  console.log(data)
  const response = await fetch(CFG.API.CHAT, data)
  const json = await response.json()
  log.innerHTML = json.choices[0].message.content
}

window.onload = async () => {
  console.log('onload')
  log = $log.value as HTMLElement
  prompt = $prompt.value as HTMLTextAreaElement
}

</script>

<template>
  <div>
    <h1 id="title">== ChatGPT PoC == </h1>
    <h3 id="author">T.Shiozaki 2023/7/12</h3>
    <button type="button" @click="listmodels()">OPENAI モデル一覧取得</button>
    <div id="models" ref="$models"></div>
    <br>
    <button type="button" @click="chat()">Chat</button><br>
    <textarea id="prompt" ref="$prompt">    </textarea>
    <br>
    <br>
    <div id="log" ref="$log"></div>
  </div>
</template>

<style scoped>
#title {
  margin-bottom: 0px;
}

#author {
  text-align: right;
  margin: 0px 0px 20px 200px;
  color: #35495e;
}

#models {
  display: flexbox;
  width: 100%;
  height: auto;
  margin: 10px 0px 10px 0px;
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
