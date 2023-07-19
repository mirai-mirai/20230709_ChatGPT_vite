
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
    AUDIO_TRANSLATE: 'https://api.openai.com/v1/audio/translations',
    MODERATIONS: 'https://api.openai.com/v1/moderations',
  },
  PROMPTS:
    [
      {
        name: 'ボケさせる',
        instructions: 'userからの質問に対してassistantはできるだけふざけた回答をしてuserを笑わせてください。ただし、回答は100文字以内で。',
        samples: [
          'ナルシスト漁師の特徴を教えてください',
          'キャッチ＆キス＆リリース',
          '初めてドラゴンを退治しに行くのですが、アドバイスをお願いします',
          '口の中にマヨネーズを投げ込むと火を吹かなくなるよ',
        ],
        prompts: '最高の上司とはどんな人？',
      },
      {
        name: '俳句の続き作成',
        instructions: 'userからのお題に対してassistantは五七五の形式で美しい俳句を作ってください。俳句の最初の文字はuserが指定した文字列で開始します。既存の有名な俳句とは違うものを作ってください。',
        samples: [
          '柿食えば',
          '柿食えば　鐘が鳴るなり　法隆寺',
        ],
        prompts: '古池や',
      },
    ]
}
