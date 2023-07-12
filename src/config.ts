
// Keyが全てstringであることを指定しておく
interface CFG { [key: string]: any }

export const CFG: CFG = {
  // API_KEY: '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',
  K1: 'sk-sXIOadT10v3jVttVw270T3',
  K2: 'BlbkFJ1W7J21U75WU15MvsbJgm',
  ORG_ID: 'org-k42yoMTxV4ogAL4ztJyniOxB',
  API: {
    MODELS: 'https://api.openai.com/v1/models',
    CHAT: 'https://api.openai.com/v1/chat/completions',
    COMPLETION: 'https://api.openai.com/v1/completions',
    ENDPOINT: 'https://api.openai.com/v1/engines/davinci/completions',
  }
}
