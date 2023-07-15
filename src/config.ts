
// Keyが全てstringであることを指定しておく
interface CFG { [key: string]: any }

export const CFG: CFG = {
  K1: 'sk-PCEoc83o19vFaEXzWy0LT',
  K2: '3BlbkFJRA4aYWSljJ5c2rknTgJ3',
  ORG_ID: 'org-k42yoMTxV4ogAL4ztJyniOxB',
  API: {
    MODELS: 'https://api.openai.com/v1/models',
    CHAT: 'https://api.openai.com/v1/chat/completions',
    IMG_GEN: 'https://api.openai.com/v1/images/generations',
    IMG_EDIT: 'https://api.openai.com/v1/images/edits',
    IMG_VAR: 'https://api.openai.com/v1/images/variations',
    AUDIO_TRANSCRIPT: 'https://api.openai.com/v1/audio/transcriptions',
    AUDIO_TRANSLATION: 'https://api.openai.com/v1/audio/transcriptions',
    MODERATIONS: 'https://api.openai.com/v1/moderations',
  }
}
