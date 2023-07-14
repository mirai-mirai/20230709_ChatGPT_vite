<script setup lang="ts">
import { jsx } from 'vue/jsx-runtime';
import { CFG } from '../config'
import { queuePostFlushCb, ref } from 'vue'


const headers = new Headers(
  {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CFG.K1 + CFG.K2,
    // 'OpenAI-Organization': CFG.ORG_ID,
  }
)

const $models = ref<HTMLDivElement>()
const listmodels = async () => {
  // 結果表示用の関数
  const dispResult = (res: string) => {
    ($models.value as HTMLDivElement).innerText = res
  }
  dispResult('Loading...')

  // データ取得
  console.clear()
  console.log(CFG.API.MODELS)
  const response: Response | void = await fetch(
    CFG.API.MODELS, { method: 'GET', headers }
  )

  // 結果の表示
  const json = await response!.json()
  console.log(json)
  let result = ''
  json.data.forEach(({ id }: { id: string }) => {
    result = result == '' ? id : result + ', ' + id
  })
  dispResult(result)
}

// つっこんでもらう
const $tukkomiQ = ref<HTMLElement>()
const $tukkomiA = ref<HTMLDivElement>()
const tukkomi = async () => {
  console.clear()
  const dispResult = (res: string) => {
    ($tukkomiA.value as HTMLDivElement).innerHTML = res
  }
  dispResult('Loading...')

  const question = ($tukkomiQ.value as HTMLTextAreaElement).value

  const messages = [
    {
      "role": "system",
      "content": "userがぼけるので、assistantは漫才風に突っ込んでください。"
    },
    {
      "role": "user",
      "content": "ふとんがふっとんだ"
    },
    {
      "role": "assistant",
      "content": "なんでやねん"
    },
    {
      "role": "user",
      "content": question
    },
  ]

  const body = JSON.stringify({
    'model': "gpt-3.5-turbo",
    messages,
    "temperature": 0.7
  })
  console.log(body)
  const response = await fetch(
    CFG.API.CHAT,
    {
      method: 'POST',
      headers,
      body
    })
  const json = await response.json()
  dispResult(json.choices[0].message.content)
}

// ぼけてもらう
const $bokeQ = ref<HTMLElement>()
const $bokeA = ref<HTMLDivElement>()
const bokete = async () => {
  console.clear()
  const dispResult = (res: string) => {
    ($bokeA.value as HTMLDivElement).innerHTML = res
  }
  dispResult('Loading...')

  const question = ($bokeQ.value as HTMLTextAreaElement).value

  const messages = [
    {
      "role": "system",
      "content": "userからの質問に対してassistantはできるだけふざけた回答をしてuserを笑わせてください。ただし、回答は100文字以内で。"
    },
    {
      "role": "user",
      "content": "ナルシスト漁師の特徴を教えてください"
    },
    {
      "role": "assistant",
      "content": "キャッチ＆キス＆リリース"
    },
    {
      "role": "user",
      "content": "すんごいエロい名前を考えてください"
    },
    {
      "role": "assistant",
      "content": "アーナルデ シメツケネッガー"
    },
    {
      "role": "user",
      "content": "初めてドラゴンを退治しに行くのですが、アドバイスをお願いします"
    },
    {
      "role": "assistant",
      "content": "口の中にマヨネーズを投げ込むと火を吹かなくなるよ"
    },
    {
      "role": "user",
      "content": question
    },

  ]

  const body = JSON.stringify({
    'model': "gpt-3.5-turbo",
    messages,
    "temperature": 0.7
  })
  console.log(body)
  const response = await fetch(
    CFG.API.CHAT,
    {
      method: 'POST',
      headers,
      body
    })
  const json = await response.json()
  dispResult(json.choices[0].message.content)
}

// 俳句作成
const $haikuQ = ref<HTMLElement>()
const $haikuA = ref<HTMLDivElement>()
const haiku = async () => {
  console.clear()
  const dispResult = (res: string) => {
    ($haikuA.value as HTMLDivElement).innerHTML = res
  }
  dispResult('Loading...')

  const question = ($haikuQ.value as HTMLTextAreaElement).value

  const messages = [
    {
      "role": "system",
      "content": "userからのお題に対してassistantは五七五の形式で美しい俳句を作ってください。俳句の最初の文字はuserが指定した文字列で開始します。"
    },
    {
      "role": "user",
      "content": "柿食えば"
    },
    {
      "role": "assistant",
      "content": "柿食えば　鐘が鳴るなり　法隆寺"
    },
    {
      "role": "user",
      "content": "古池や"
    },
    {
      "role": "assistant",
      "content": "古池や　蛙飛び込む　水の音"
    },
    {
      "role": "user",
      "content": question
    },

  ]

  const body = JSON.stringify({
    'model': "gpt-3.5-turbo",
    messages,
    "temperature": 0.7
  })
  console.log(body)
  const response = await fetch(
    CFG.API.CHAT,
    {
      method: 'POST',
      headers,
      body
    })
  const json = await response.json()
  dispResult(json.choices[0].message.content)
}

// 画像作成
const $imgGenQ = ref<HTMLElement>()
const $imgGenA = ref<HTMLElement>()
const $imgGenR = ref<HTMLImageElement>()
const imgGen = async () => {
  console.clear()
  const dispResult = (res: string) => {
    ($imgGenA.value as HTMLDivElement).innerHTML = res
  }
  dispResult('Loading...')

  const prompt = ($imgGenQ.value as HTMLTextAreaElement).value

  const body = JSON.stringify(
    {
      prompt,
      size: '256x256',
      response_format: "url"
    })

  console.log(body)

  const response = await fetch(
    CFG.API.IMG_GEN,
    {
      method: 'POST',
      headers,
      body
    })
  const json = await response.json()
  dispResult('Received')
  $imgGenR.value!.src = json.data[0].url

}

// 画像編集
const $imgEditQ = ref<HTMLElement>()
const $imgEditA = ref<HTMLElement>()
const $imgEditOut = ref<HTMLImageElement>()
const $imgEditIn = ref<HTMLImageElement>()
const $imgEditFile = ref<HTMLInputElement>()
let blobUploaded: string
let imgBLob: Blob

const uploadImg = () => {
  constfile = $imgEditFile.value!.files![0]
  if (blobUploaded) URL.revokeObjectURL(blobUploaded)
  blobUploaded = URL.createObjectURL(file)
  $imgEditIn.value!.src = blobUploaded
}

const imgEdit = async () => {
  console.clear()
  const dispResult = (res: string) => { $imgEditA.value!.innerHTML = res }
  dispResult('Loading...')

  const prompt = ($imgEditQ.value as HTMLTextAreaElement).value
  const body = new FormData();
  const imgSize = ['256x256', '512x512', '1024x1024']
  body.append('image', imgBLob);
  body.append('prompt', prompt);
  body.append('size', imgSize[0]);
  body.append('response_format', 'url');
  const headers = new Headers({ 'Authorization': 'Bearer ' + CFG.K1 + CFG.K2 })
  const response = await fetch(
    CFG.API.IMG_EDIT, { method: 'POST', headers, body })
  console.log(response)
  const json = await response.json()
  dispResult('Received')
  $imgEditOut.value!.src = json.data[0].url
}

window.onload = () => {
  const $img = $imgEditIn.value as HTMLImageElement
  const resizeImg = async () => {
    console.log('resize image')
    const resizeRatio = 256 / Math.max($img.width, $img.height)
    const imgUp = await createImageBitmap($img, {
      resizeWidth: $img.width * resizeRatio,
      resizeHeight: $img.height * resizeRatio,
      resizeQuality: 'high'
    })
    const canvas = document.createElement('canvas')
    const { width, height } = imgUp
    console.log(`size: ${width}x${height}`)
    const squareSize = Math.max(width, height)
    canvas.width = squareSize
    canvas.height = squareSize
    const ctx = canvas.getContext('2d')
    ctx!.drawImage(imgUp, 0, 0)
    canvas.toBlob((blob) => { imgBLob = blob! })
  }
  $img.onload = resizeImg
  resizeImg()

}

</script>

<template>
  <div>
    <!-- タイトル -->
    <h1 id="title">== ChatGPT PoC == </h1>
    <h3 id="author">T.Shiozaki 2023/7/12</h3>

    <!-- モデル一覧 -->
    <div class="card">
      <button type="button" @click="listmodels()">OPENAI モデル一覧取得</button>
      <div class="answer" ref="$models"></div>
    </div>

    <!-- 突っ込んで -->
    <div class="card">
      <textarea class="question" ref="$tukkomiQ">この帽子どいつんだ？オランダ</textarea>
      <br>
      <button type="button" @click="tukkomi()">突っ込んで</button><br>
      <div class="answer" ref="$tukkomiA"></div>
    </div>

    <!-- ぼけて -->
    <div class="card">
      <textarea class="question" ref="$bokeQ">最高にかっこいい排便の仕方は？</textarea>
      <br>
      <button type="button" @click="bokete()">ぼけて</button><br>
      <div class="answer" ref="$bokeA"></div>
    </div>

    <!-- 俳句 -->
    <div class="card">
      <textarea class="question" ref="$haikuQ">夏の日は</textarea>
      <br>
      <button type="button" @click="haiku()">俳句作って</button><br>
      <div class="answer" ref="$haikuA"></div>
    </div>

    <!-- 画像生成 -->
    <div class="card">
      <textarea class="question" ref="$imgGenQ">KAMIKAZE fighter</textarea>
      <br>
      <button type="button" @click="imgGen()">画像生成</button><br>
      <div class="answer" ref="$imgGenA"> </div>
      <img class="imgResult" ref="$imgGenR" /><br>
    </div>

    <!-- 画像編集 -->
    <div class="card">
      <input type="file" ref="$imgEditFile" accept="image/*" @change="uploadImg" />
      <br>
      4MB以下の画像をアップロードしてください
      <br>
      <img class="imgUpload" ref="$imgEditIn" src="../assets/banana.png" />
      <button type="button" @click="">マスクのクリア</button><br>
      <textarea class="question" ref="$imgEditQ">an apple is placed around the banana</textarea>
      <br>
      <button type="button" @click="imgEdit()">画像修正</button><br>
      <div class="answer" ref="$imgEditA"> </div>
      <img class="imgResult" ref="$imgEditOut" />
    </div>

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

.card {
  background-color: #f4f4f4;
  display: flexbox;
  width: auto;
  height: auto;
  margin: 10px 0px 20px 0px;
  padding: 5px 10px 10px 10px;
  box-shadow: #d7d7d7 0px 5px 5px 0px;
}

button {
  width: 200px;
  margin: 10px 0px 10px 0px;
}

.question {
  width: 80%;
  height: auto;
  margin: 10px 0px 10px 0px;
}

.answer {
  display: flexbox;
  width: 80%;
  height: auto;
}

.imgUpload {
  width: auto;
  max-height: 300px;
  margin: 10px 0px 10px 0px;
}

.imgResult {
  width: auto;
  height: auto;
  margin: 10px 0px 10px 0px;
}
</style>
