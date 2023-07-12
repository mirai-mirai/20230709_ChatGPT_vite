
// Keyが全てstringであることを指定しておく
interface CFG { [key: string]: any }

export const CFG: CFG = {
  OPENAI_API_KEY: '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',
  OPENAI_ORG_ID: 'org-k42yoMTxV4ogAL4ztJyniOxB',
  API: {
    MODELS: 'https://api.openai.com/v1/models',
    CHAT: 'https://api.openai.com/v1/chat/completions',
    COMPLETION: 'https://api.openai.com/v1/completions',
    ENDPOINT: 'https://api.openai.com/v1/engines/davinci/completions',
  }

}
