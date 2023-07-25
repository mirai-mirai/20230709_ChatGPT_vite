<script setup lang="ts">
import { jsx } from 'vue/jsx-runtime';
import { CFG } from '../config'
import { ref } from 'vue'


const headers = new Headers(
  {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CFG.K1 + CFG.K2,
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

// チャット
const $chatSample = ref<HTMLSelectElement>()
const $chatReceived = ref<HTMLDivElement>()
const $sendPrompt = ref<HTMLButtonElement>()
const $instructions = ref<HTMLTextAreaElement>()
const $gptModel = ref<HTMLSelectElement>()
const $samples = ref<HTMLTextAreaElement>()
const $prompts = ref<HTMLTextAreaElement>()
const chatTemperature = ref<number>(1)
const chatn = ref<number>(1)
const maxTokens = ref<number>(1000)
const completion_tokens = ref<number>(0)
const prompt_tokens = ref<number>(0)
const completion_length = ref<number>(0)
const prompt_length = ref<number>(0)
const htmlData = ref<string[]>([])

const initChat = async () => {
  console.log('initChat')

  // const iFrame = document.createElement('iframe')
  // iFrame.srcdoc = "<html><body>test<button>Click</button></body></html>"
  // $chatReceived.value!.appendChild(iFrame)


  const textareaEls = document.querySelectorAll("textarea");
  textareaEls.forEach((el) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    el.addEventListener("input", () => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    })
  })

  const disp = (msg: string) => { $chatReceived!.value!.innerHTML = msg }


  // 天気情報を取得
  const getWeather = async (lat: number, lon: number) => {
    const args = `?appid=${CFG.K3 + CFG.K4}&lat=${lat}&lon=${lon}&units=metric&lang=ja`
    const URL = CFG.API.WEATHER + args
    console.log(URL)
    const weather = await fetch(CFG.API.WEATHER + args, { method: 'GET' })
    console.log(weather)
    const weatherJson = await weather.json()
    console.log(weatherJson)
    return JSON.stringify(weatherJson.daily)
  }

  const chatModel = $chatSample.value as HTMLSelectElement
  const prompts = CFG.PROMPTS
  prompts.forEach((obj: { name: string }) => {
    const option = document.createElement('option')
    option.text = obj.name
    chatModel.appendChild(option)
  })
  const models = CFG.CHAT_MODELS
  models.forEach((model_name: string) => {
    const option = document.createElement('option')
    option.text = model_name
    $gptModel.value!.appendChild(option)
  })

  // プロンプトの変更イベント
  let functions: Object[] = []
  const setPrompts = () => {
    const example = prompts.find((obj: { name: string }) => obj.name == chatModel.value)
    $instructions.value!.value = example!.instructions
    let sample: string = ''
    let isQuestion: boolean = true
    example!.samples.forEach((s: string) => {
      sample += isQuestion ? `Q:${s}\n` : `A:${s}\n`
      isQuestion = !isQuestion
    })
    $samples.value!.value = sample
    $prompts.value!.value = example!.prompts
    functions = example!.functions ? example!.functions : {}
    console.log(functions)
  }
  setPrompts()
  chatModel.addEventListener('change', setPrompts)

  const sendPrompt = async () => {
    completion_tokens.value = 0
    prompt_tokens.value = 0
    completion_length.value = 0
    prompt_length.value = 0
    disp('Loading...')
    console.clear()
    let messages: Object[] = []
    let promptLength: number = 0

    // Instructions
    messages.push({
      "role": "system",
      "content": $instructions.value?.value
    })
    promptLength += $instructions.value!.value!.length

    // Samples
    const samples = $samples.value?.value.split('\n')
    let isQuestion: boolean = true
    samples?.forEach((s: string) => {
      if (s.length < 2) return
      messages.push({
        "role": isQuestion ? "user" : "assistant",
        "content": s.substring(2)
      })
      isQuestion = !isQuestion
      promptLength += s.substring(2).length
    })

    // Prompts
    messages.push({
      "role": "user",
      "content": $prompts.value?.value
    })
    promptLength += $prompts.value!.value!.length

    // リクエストボディ 
    const bodyJSON: { [key: string]: any } = {
      'model': $gptModel.value!.value,
      messages,
      "temperature": chatTemperature.value,
      "max_tokens": maxTokens.value,
      "n": chatn.value
    }
    if (functions?.length > 0)
      bodyJSON['functions'] = functions

    console.log(JSON.stringify(bodyJSON, null, '\t'))
    const body = JSON.stringify(bodyJSON)
    htmlData.value = []

    const response = await fetch(
      CFG.API.CHAT, { method: 'POST', headers, body })
    const json = await response.json()
    console.log(response)
    console.log(json)
    disp('Received')
    completion_length.value = 0
    type Response = {
      finish_reason: string,
      message: {
        content: string,
        function_call: {
          name: string,
          arguments: string
        }
      }
    }
    json.choices.forEach(async (response: Response, id: number) => {
      // FunctionCallは表示しない
      let content: string = ''
      let res: string = ''

      if (response!.finish_reason == 'function_call') {
        const funcName = response!.message!.function_call.name
        const funcArgsJSON = response!.message!.function_call.arguments
        const funcArgs = JSON.parse(funcArgsJSON)
        console.log(`関数名：${funcName}、引き数：${funcArgsJSON}`)

        content = await getWeather(funcArgs.lat, funcArgs.lon)

        completion_length.value += funcName.length + funcArgsJSON.length
        // 関数の戻り値をAPIに返してやる
        messages.push({
          "role": "function",
          "name": funcName,
          "content": content
        })
        bodyJSON['n'] = 1
        delete bodyJSON['functions']
        console.log(JSON.stringify(bodyJSON, null, '\t'))
        disp('2nd Loading...')
        const body = JSON.stringify(bodyJSON)
        const response2 = await fetch(
          CFG.API.CHAT, { method: 'POST', headers, body })
        const json = await response2.json()
        console.log(response2)
        console.log(json)
        res = json.choices[0].message.content
        completion_length.value += res.length
        content = res.replace(/\n/g, '<br>')
        htmlData.value[id] = content

      } else {
        res = response.message.content ? response.message.content : ''
        completion_length.value += res.length
        if (res.startsWith("<!DOCTYPE")) {
          console.log('iframe')
          const iFrame = document.createElement('iframe')
          iFrame.srcdoc = res
          // iFrame.allow = "fullscreen,camera,Microphone"
          // iFrame.width = "100%"
          // iFrame.height = "300px"
          iFrame.style.backgroundColor = "gray"
          iFrame.onload = () => {
            console.log('iframe loaded')
            console.log(iFrame.contentWindow!.document.body.scrollWidth, iFrame.contentWindow!.document.body.scrollHeight)
            iFrame.style.width = iFrame.contentWindow!.document.body.scrollWidth + "px";
            iFrame.style.height = iFrame.contentWindow!.document.body.scrollHeight + 100 + "px";
            // iFrame.contentWindow?.postMessage('Hello from the parent.', '*')
          }
          $chatReceived.value!.appendChild(iFrame)
        } else {
          content = res.replace(/\n/g, '<br>')
          content = res.replace(/\\"/g, '"')
          content = res.replace(/```/g, '')
          htmlData.value[id] = content
        }
      }
    })
    prompt_length.value = promptLength
    completion_tokens.value = json.usage.completion_tokens
    prompt_tokens.value = json.usage.prompt_tokens
  }

  $sendPrompt.value!.addEventListener('click', sendPrompt)

}


// 画像作成
const $imgGenQ = ref<HTMLElement>()
const $imgGenA = ref<HTMLElement>()
const $imgGenR1 = ref<HTMLImageElement>()
const $imgGenR2 = ref<HTMLImageElement>()
const $imgGenR3 = ref<HTMLImageElement>()
const imgGenSize = ref<string>('256x256')
const imgGenNum = ref<number>(1)
const initImgGen = () => {

}

const imgGen = async () => {
  console.clear()
  const dispResult = (res: string) => {
    ($imgGenA.value as HTMLDivElement).innerHTML = res
  }
  dispResult('Loading...')

  const prompt = ($imgGenQ.value as HTMLTextAreaElement).value
  const response_format = ["url", "b64_json"][1]

  const body = JSON.stringify(
    { prompt, size: imgGenSize.value, n: Number(imgGenNum.value), response_format })
  console.log(body)

  const response = await fetch(
    CFG.API.IMG_GEN, { method: 'POST', headers, body })
  console.log(response)

  const json = await response.json()
  console.log(json)
  const imgTags = [$imgGenR1, $imgGenR2, $imgGenR3]
  imgTags.forEach(($item, i) => {
    console.log(i, json.data.length)
    if (i < json.data.length)
      $item.value!.src = "data:image/png;base64," + json.data[i].b64_json
    else
      $item.value!.src = ""
  })

  dispResult('Received')

}

// 画像編集
const $imgEditQ = ref<HTMLElement>()
const $imgEditA = ref<HTMLElement>()
const $imgEditIn = ref<HTMLImageElement>()
const $imgEditOut1 = ref<HTMLImageElement>()
const $imgEditOut2 = ref<HTMLImageElement>()
const $imgEditOut3 = ref<HTMLImageElement>()
const $imgEditFile = ref<HTMLInputElement>()
const $imgEditCanvas = ref<HTMLCanvasElement>()
const $resetMask = ref<HTMLButtonElement>()
const brushSize = ref<number>(20)
const imgSize = ref<string>('256x256')
const imgNum = ref<number>(1)
let blobUploaded: string

const initImgEdit = () => {
  console.log('initImgEdit')
  const $img = $imgEditIn.value as HTMLImageElement
  const $canvas = $imgEditCanvas.value as HTMLCanvasElement
  const resizeImg = async () => {
    const ratio = Math.min(1, 512 / Math.max($img.width, $img.height))
    const resizedBMP = await createImageBitmap($img, {
      resizeWidth: $img.width * ratio,
      resizeHeight: $img.height * ratio,
      resizeQuality: 'high'
    })
    console.log(`resize: ${$img.width}x${$img.height} -> ${resizedBMP.width}x${resizedBMP.height}`)
    const canvasSize = Math.max(resizedBMP.width, resizedBMP.height)
    $canvas.width = canvasSize
    $canvas.height = canvasSize
    const ctx = $canvas.getContext('2d')!
    ctx.fillStyle = 'black'
    const { width, height } = resizedBMP
    if (width < canvasSize)
      ctx.fillRect(width, 0, canvasSize - width, canvasSize)
    else
      ctx.fillRect(0, height, canvasSize, canvasSize - height)
    ctx.drawImage(resizedBMP, 0, 0)
  }
  $img.onload = resizeImg
  resizeImg()
  let isDrawing: boolean = false
  $canvas.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDrawing) return
    const x = e.offsetX * $canvas.width / $canvas.clientWidth
    const y = e.offsetY * $canvas.height / $canvas.clientHeight
    const s = brushSize.value
    $canvas.getContext('2d')!.clearRect(x - s, y - s, s * 2, s * 2)
  })
  const mouseDown = () => { isDrawing = true }
  const mouseUp = () => { isDrawing = false }
  const cursorOn = () => { $canvas.style.cursor = 'crosshair' }
  const cursorOff = () => { $canvas.style.cursor = 'default' }
  $canvas.addEventListener('mousedown', mouseDown)
  $canvas.addEventListener('mouseup', mouseUp)
  $canvas.addEventListener('mouseenter', cursorOn)
  $canvas.addEventListener('mouseout', () => { mouseUp(); cursorOff() })

  const dropImage = (e: DragEvent) => {
    e.preventDefault()
    const src = e.dataTransfer!.getData('text/plain')
    if (src) {
      $imgEditIn.value!.src = src
      resizeImg()
      return
    }

    if (!e.dataTransfer!.files.length) return
    const file = (e as DragEvent).dataTransfer!.files[0]
    if (!file.type.startsWith('image/')) return
    if (blobUploaded) URL.revokeObjectURL(blobUploaded)
    blobUploaded = URL.createObjectURL(file)
    $imgEditIn.value!.src = blobUploaded
    resizeImg()
    $canvas.style.boxShadow = 'none'
  }

  $canvas.addEventListener('dragover', e => {
    e.preventDefault()
    $canvas.style.boxShadow = '5px 5px 5px 5px #888888'
  })
  $canvas.addEventListener('mouseout', e => {
    $canvas.style.boxShadow = 'none'
  })
  $canvas.addEventListener('mouseup', e => {
    e.preventDefault()
    $canvas.style.boxShadow = 'none'
  })
  $canvas.addEventListener('mouseleave', e => {
    $canvas.style.boxShadow = 'none'
  })
  $canvas.addEventListener('drop', dropImage)

  $resetMask.value!.addEventListener('click', resizeImg)

  const $imgDraggables = [$imgGenR1, $imgGenR2, $imgGenR3, $imgEditOut1, $imgEditOut2, $imgEditOut3]
  $imgDraggables.forEach($item => {
    $item.value!.addEventListener('dragstart', e => {
      e.dataTransfer!.setData('text/plain', $item.value!.src)
    })
  })

}

const uploadImg = () => {
  const file = $imgEditFile.value!.files![0]
  if (blobUploaded) URL.revokeObjectURL(blobUploaded)
  blobUploaded = URL.createObjectURL(file)
  $imgEditIn.value!.src = blobUploaded
}

const imgEdit = async () => {
  console.clear()
  const dispResult = (res: string) => { $imgEditA.value!.innerHTML = res }
  dispResult('Loading...')
  $imgEditOut1.value!.src = ""
  $imgEditOut2.value!.src = ""
  $imgEditOut3.value!.src = ""

  const prompt = ($imgEditQ.value as HTMLTextAreaElement).value
  const body = new FormData();
  const $canvas = $imgEditCanvas.value as HTMLCanvasElement
  $canvas.toBlob(async (blob) => {
    body.append('image', blob!);
    body.append('prompt', prompt);
    body.append('size', imgSize.value);
    body.append('n', imgNum.value.toString());
    body.append('response_format', 'b64_json');
    const headers = new Headers({ 'Authorization': 'Bearer ' + CFG.K1 + CFG.K2 })
    const response = await fetch(
      CFG.API.IMG_EDIT, { method: 'POST', headers, body })
    console.log(response)
    const json = await response.json()
    dispResult('Received')
    $imgEditOut1.value!.src = "data:image/png;base64," + json.data[0].b64_json
    if (json.data.length > 1)
      $imgEditOut2.value!.src = "data:image/png;base64," + json.data[1].b64_json
    if (json.data.length > 2)
      $imgEditOut3.value!.src = "data:image/png;base64," + json.data[2].b64_json
  })
}

const imgVar = async () => {
  console.clear()
  const dispResult = (res: string) => { $imgEditA.value!.innerHTML = res }
  dispResult('Loading...')
  $imgEditOut1.value!.src = ""
  $imgEditOut2.value!.src = ""
  $imgEditOut3.value!.src = ""

  const body = new FormData();
  const $canvas = $imgEditCanvas.value as HTMLCanvasElement
  const headers = new Headers({ 'Authorization': 'Bearer ' + CFG.K1 + CFG.K2 })
  $canvas.toBlob(async (blob) => {
    body.append('image', blob!);
    body.append('size', imgSize.value);
    body.append('n', imgNum.value.toString());
    body.append('response_format', 'b64_json');
    const response = await fetch(
      CFG.API.IMG_VAR, { method: 'POST', headers, body })
    console.log(response)
    const json = await response.json()
    console.log(json)
    dispResult('Received')
    $imgEditOut1.value!.src = "data:image/png;base64," + json.data[0].b64_json
    if (json.data.length > 1)
      $imgEditOut2.value!.src = "data:image/png;base64," + json.data[1].b64_json
    if (json.data.length > 2)
      $imgEditOut3.value!.src = "data:image/png;base64," + json.data[2].b64_json
  })
}

// 音声認識
const $recBtn = ref<HTMLButtonElement>()
const $audio = ref<HTMLAudioElement>()
const $transcript = ref<HTMLButtonElement>()
const $transrate = ref<HTMLButtonElement>()
const $recA = ref<HTMLDivElement>()
const $recA2 = ref<HTMLDivElement>()
const $audioFile = ref<HTMLInputElement>()
const $audioPrompts = ref<HTMLTextAreaElement>()
const audioTemperature = ref<number>(0)
const $language = ref<HTMLSelectElement>()
let mediaRecorder: MediaRecorder | null = null
const audioBlobs: BlobPart[] = []
let audioBlob: Blob | null = null
let blobAudio: string

const initAudio = async () => {
  console.log('initMic')
  const audioFile = $audioFile.value as HTMLInputElement
  audioFile.addEventListener('change', e => {
    const file = audioFile.files![0]
    if (blobAudio) URL.revokeObjectURL(blobUploaded)
    blobAudio = URL.createObjectURL(file)
    $audio.value!.src = blobAudio
  })

  const languages = CFG.AUDIO_LANGUAGES
  languages.forEach((lang: { text: string, value: string }) => {
    const option = document.createElement('option')
    option.text = lang.text
    option.value = lang.value
    $language.value!.appendChild(option)
  })

  const dispResult = (res: string) => {
    ($recA.value as HTMLDivElement).innerHTML = res
  }
  const dispResult2 = (res: string) => {
    ($recA2.value as HTMLDivElement).innerHTML = res
  }
  const startRec = () => {
    $recBtn.value!.innerText = '録音中...'
    mediaRecorder?.start()
    let mimeType = mediaRecorder!.mimeType;
    console.log(mimeType)
  }
  const stopRec = () => {
    $recBtn.value!.innerText = '録音開始'
    mediaRecorder?.stop()
  }

  const recBtn = $recBtn.value as HTMLButtonElement
  recBtn.addEventListener('mousedown', startRec)
  recBtn.addEventListener('mouseup', stopRec)
  recBtn.addEventListener('mouseout', stopRec)
  // const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  // const options = {
  //   audioBitsPerSecond: 128000,
  //   videoBitsPerSecond: 2500000,
  //   mimeType: 'audio/webm;codecs=opus'
  // }

  // mediaRecorder = new MediaRecorder(stream, options)
  // mediaRecorder.addEventListener('dataavailable', e => {
  //   console.log('dataavailable')
  //   audioBlobs.push(e.data)
  // })

  // mediaRecorder.addEventListener('stop', async e => {
  //   const audio = $audio.value as HTMLAudioElement
  //   console.log('stop')
  //   let mimeType = mediaRecorder!.mimeType;
  //   console.log(mimeType)

  //   audioBlob = new Blob(audioBlobs, { type: mimeType })
  //   const audioURL = URL.createObjectURL(audioBlob)
  //   audio.src = audioURL
  //   audio.controls = true
  //   audioBlobs.length = 0
  // })

  const sendAudio = async (type: 'transcript' | 'translate') => {
    const file = audioFile && audioFile.files![0]
    if (!file) return
    console.clear()
    const disp = type == 'transcript' ? dispResult : dispResult2
    disp('Loading...')
    const headers = new Headers({ 'Authorization': 'Bearer ' + CFG.K1 + CFG.K2 })
    const body: FormData = new FormData();
    // body.append('file', audioBlob!);
    body.append('file', file);
    body.append('model', 'whisper-1');
    body.append('response_format', 'verbose_json');
    body.append('temperature', audioTemperature.value.toString());
    if ($audioPrompts.value!.value != '')
      body.append('prompt', $audioPrompts.value!.value);
    if ($language.value!.value != '')
      body.append('language', $language.value!.value);

    const response = await fetch(
      type == 'transcript' ? CFG.API.AUDIO_TRANSCRIPT : CFG.API.AUDIO_TRANSLATE,
      { method: 'POST', headers, body })
    console.log(response)
    const json = await response.json()
    disp(json.text)
    console.log(json)
  }
  $transcript.value!.addEventListener('click', () => { sendAudio('transcript') })
  $transrate.value!.addEventListener('click', () => { sendAudio('translate') })

}


window.onload = () => {
  initChat()
  initImgGen()
  initImgEdit()
  initAudio()
}

</script>

<template>
  <div>

    <!-- タイトル -->
    <h1 id="title">OpenAI-APIの全機能をブラウザから使ってみる </h1>
    <h3 id="author">T.Shiozaki 2023/7/23</h3>

    <!-- モデル一覧 -->
    <div class="card">
      <h3>■モデル一覧 {{ CFG.API.MODELS }}</h3>
      <br>
      <button type="button" @click="listmodels()">OPENAI モデル一覧取得</button>
      <div class="answer" ref="$models"></div>
    </div>

    <!-- Chat -->
    <div class="card">
      <h3>■チャット {{ CFG.API.CHAT }}</h3>
      <br>
      <div>サンプル：</div>
      <select ref="$chatSample"></select><br><br>
      <div>
        <div class="textType">Instructions</div>
        <textarea class="prompt" ref="$instructions"></textarea>
      </div>
      <div>
        <div class="textType">Samples</div>
        <textarea class="prompt" ref="$samples"></textarea>
      </div>
      <div>
        <div class="textType">Prompts</div>
        <textarea class="prompt" ref="$prompts"></textarea>
      </div>
      <div class="label">tempreture</div>
      <input type="range" min="0" max="2" v-model.number="chatTemperature" step=".1" />
      {{ chatTemperature }}
      <br>
      <div class="label">model</div>
      <select ref="$gptModel"></select><br>
      <div class="label">n</div>
      <input type="number" min="1" max="10" v-model.number="chatn" step="1" /><br>
      <div class="label">maxTokens</div>
      <input type="number" min="1" max="2000" v-model.number="maxTokens" step="100" /><br>
      <button type="button" ref="$sendPrompt">送信</button><br>
      <table border="1" bordercolor="#555" padding="2px">
        <tr>
          <td></td>
          <td>文字</td>
          <td>トークン</td>
        </tr>
        <tr>
          <td>プロンプト</td>
          <td>{{ prompt_length }}</td>
          <td>{{ prompt_tokens }}</td>
        </tr>
        <tr>
          <td>レスポンス</td>
          <td>{{ completion_length }}</td>
          <td>{{ completion_tokens }}</td>
        </tr>
      </table><br>
      <div class="answer" ref="$chatReceived"></div>
      <table border=1 bordercolor="#555" padding="2px">
        <tr v-for="(data, idx) in  htmlData ">
          <td width="80px">回答 {{ idx + 1 }}</td>
          <td v-html="data"></td>
        </tr>
      </table>

    </div>

    <!-- 画像生成 -->
    <div class="card">
      <h3>■画像生成 {{ CFG.API.IMG_GEN }}</h3>
      <br>
      <div>プロンプト：</div>
      <textarea class="question" ref="$imgGenQ">{{ CFG.IMG_GEN_PROMPT }}</textarea>
      <br>
      <div>出力画像サイズ</div>
      <input type="radio" id="256" value="256x256" v-model="imgGenSize" />
      <label for="256">256</label>
      <input type="radio" id="512" value="512x512" v-model="imgGenSize" />
      <label for="512">512</label>
      <input type="radio" id="1024" value="1024x1024" v-model="imgGenSize" />
      <label for="1024">1024</label><br>
      <div>出力画像数</div>
      <input type="radio" id="1" value=1 v-model.number="imgGenNum" />
      <label for="1">1</label>
      <input type="radio" id="2" value=2 v-model.number="imgGenNum" />
      <label for="2">2</label>
      <input type="radio" id="3" value=3 v-model.number="imgGenNum" />
      <label for="3">3</label><br>

      <button type="button" @click="imgGen()">画像生成</button><br>
      <div class="answer" ref="$imgGenA"> </div>
      <img class="imgResult" ref="$imgGenR1" draggable="true" />
      <img class="imgResult" ref="$imgGenR2" draggable="true" />
      <img class="imgResult" ref="$imgGenR3" draggable="true" />
    </div>

    <!-- 画像編集 -->
    <div class="card">
      <h3>■画像編集 {{ CFG.API.IMG_EDIT }}</h3>
      <h3>■画像バリエーション {{ CFG.API.IMG_VAR }}</h3>
      <br>
      <input type="file" ref="$imgEditFile" accept="image/*" @change="uploadImg" />
      <br>
      4MB以下の画像をアップロードしてください(ドロップでもOK)<br>
      修正したい箇所を消してください
      <br>
      <img class="imgUpload" ref="$imgEditIn" src="../assets/noimage.png" />
      <canvas class="imgEditCanvas" ref="$imgEditCanvas"></canvas>
      <br>
      消しゴムサイズ<input type="range" min="1" max="50" v-model="brushSize" step="1" />
      {{ brushSize }}<br>
      <button type="button" ref="$resetMask">マスクのクリア</button><br>
      プロンプト：<br>
      <textarea class="question" ref="$imgEditQ">{{ CFG.IMG_EDIT_PROMPT }}</textarea>
      <br>
      <div>出力画像サイズ</div>
      <input type="radio" id="256" value="256x256" v-model="imgSize" />
      <label for="256">256</label>
      <input type="radio" id="512" value="512x512" v-model="imgSize" />
      <label for="512">512</label>
      <input type="radio" id="1024" value="1024x1024" v-model="imgSize" />
      <label for="1024">1024</label><br>
      <div>出力画像数</div>
      <input type="radio" id="1" value=1 v-model.number="imgNum" />
      <label for="1">1</label>
      <input type="radio" id="2" value=2 v-model.number="imgNum" />
      <label for="2">2</label>
      <input type="radio" id="3" value=3 v-model.number="imgNum" />
      <label for="3">3</label><br>
      <button type="button" @click="imgEdit()">画像編集</button>
      <button type="button" @click="imgVar()">画像バリエーション</button><br>
      <div class="answer" ref="$imgEditA"> </div>
      <img class="imgResult" ref="$imgEditOut1" />
      <img class="imgResult" ref="$imgEditOut2" />
      <img class="imgResult" ref="$imgEditOut3" />
    </div>

    <!-- 音声認識 -->
    <div class="card">
      <h3>■音声認識 {{ CFG.API.AUDIO_TRANSCRIPT }}</h3>
      <h3>■音声英訳 {{ CFG.API.AUDIO_TRANSLATE }}</h3>
      <br>
      <button type="button" ref="$recBtn" style="display:none">録音開始</button>
      <input type="file" ref="$audioFile" accept="audio/*" /><br><br>
      <audio controls ref="$audio"></audio><br>
      <div>
        <div class="textType">Prompts</div>
        <textarea class="prompt" ref="$audioPrompts"></textarea>
      </div>
      <div class="label">tempreture</div>
      <input type="range" min="0" max="1" v-model.number="audioTemperature" step=".1" />
      {{ audioTemperature == 0 ? 'auto' : audioTemperature }}
      <br>
      <div class="label">音声の言語</div>
      <select ref="$language"></select><br>
      <button type="button" ref="$transcript">音声認識</button>
      <button type="button" ref="$transrate">音声英訳</button><br>
      <div class="answer" ref="$recA"></div>
      <div class="answer" ref="$recA2"></div>
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
  background-color: #223;
  display: flexbox;
  width: auto;
  height: auto;
  margin: 10px 20px 20px 0px;
  padding: 20px 10px 30px 15px;
  box-shadow: darkslategray 0px 5px 5px 0px;
}

th,
td {
  padding: 0px 10px;
}

.label {
  display: inline-block;
  width: 100px;
  text-align: left;
  margin: 0px 10px 5px 0px;
}

h3 {
  margin: 0px 0px 5px 0px;
}

.prompt {
  width: 80%;
  min-height: 80px;
  margin: 10px 0px 10px 0px;
}


select {
  width: 200px;
}

button {
  width: 200px;
  margin: 10px 10px 10px 0px;
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
  display: none;
}

.imgEditCanvas {
  width: auto;
  max-height: 500px;
  margin: 10px 0px 10px 0px;
}

.imgResult {
  width: auto;
  height: auto;
  margin: 10px 10px 10px 0px;
}
</style>
