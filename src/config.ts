
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
  CHAT_MODELS: [
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-16k',
    'gpt-3.5-turbo-16k-0613',
    'gpt-4',
    'gpt-4-0613',
    'gpt-4-32k',
    'gpt-4-32k-0613',
  ],
  PROMPTS:
    [
      {
        name: 'お笑いのネタ作成',
        instructions: 'userからの質問に対してassistantはできるだけふざけた回答をしてuserを笑わせてください。ただし、回答は100文字以内で。',
        samples: [],
        prompts: '最高の上司とはどんな人？',
      },
      {
        name: '俳句作成',
        instructions: '五七五の形式で美しい俳句を作ってください。季語を１つは必ず入れてください。既存の有名な俳句とは違うものを作ってください。',
        samples: [],
        prompts: '',
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
      {
        name: '問題作成',
        instructions: '中学校2年生の数学の問題と解答を作成しなさい。',
        samples: [],
        prompts: '',
      },
      {
        name: '文章要約',
        instructions: 'userが入力した文章を要約してください。',
        samples: [],
        prompts: 'それではパネルセッション第一部を始めさせていただきます。第一部のテーマは生成AIが切り開く未来です。 それでは登壇者の皆様をご紹介いたします。モデレーターはTMI総合法律事務所パートナー弁護士宮川美津子様です。 パネリストをご紹介いたします。経済産業大臣西村康俊様。 ソフトバンクグループ代表取締役会長兼社長執行役員孫正義様。 オープンAIチャットGPT開発チーム幹部シェイングー様。 松尾豊東京大学大学院工学系研究科教授松尾先生は内閣府AI戦略会議の座長でもいらっしゃいます。 それでは宮川様よろしくお願いいたします。 では座って失礼させていただきます。 第一部のモデレーターを務めさせていただきます弁護士の宮川美津子でございます。 第一部は生成AIが切り開く未来というタイトルで、チャットGPTに代表される生成AIがビジネスや教育の現場に浸透する中で、 爆発的な産業の発展も期待される一方、人間の代名詞である高度な知的活動がAIにとって変わられるのではないかという危惧が呈されています。 今後の生成AIの発展に日本の産業はどう関わっていくべきか、経済界、政界、アカデミアの皆様で議論を行うセッションとなります。 第一部の進行ですが、このセッションは著名な方ばかりですので、典型的な自己紹介は省略しまして、 パネルディスカッションに先立ちまして、4名のパネリストの皆様に、それぞれ5分程度、生成AIとの関わりについてお話しいただき、 その後残りの30分で3つのテーマ、生成AIの利活用、生成AIの発展を支えるインフラの問題、そして生成AIのリスクへの対応についてディスカッションいただく予定です。 まずは西村大臣には、日頃生成AIとどのように付き合っておられるかについてお話しいただければと思います。 はい、皆さんこんにちは。西村でございます。 この生成AI、半年前、あるいは去年の年末ぐらいからですかね、それまであんまり誰も気づかなかった。 もちろん日本でもいろいろと開発を進めてきている方々、スタートアップを含めてあったんですけれども、私もものすごい衝撃を受けました。 この1,2年で働き方、特にホワイトカラーの事務職の仕事が圧倒的に変わるというか、ものすごくうまく使えば生産性を上げられる、革命的な知覚変動のような、そうした動きになるというふうに思っています。 もちろん今日議論になるいくつかの課題を乗り越えていかなきゃいけないんですけれども、それは乗り越えて、ぜひこれを日本の将来の持続的な成長につなげていきたい、そんな思いでおります。 ビル・ゲイツさんがまさにインターネットや携帯電話と同じぐらい革命的だ、あるいはサマーズさんというハーバードの先生、財務長官もアメリカで勤められました。電気とか火を人類が使ったのと同じぐらいのインパクトがあるという言い方をしている通り、私もまさに革命的なことが起こる、そんな思いを持っております。 そんな中で日々このニュースに接しない日はないですし、私もほぼ毎日開発している方々、あるいは企業、スタートアップ、大企業、いろんな人と意見交換を重ねてきています。 今日もこの機会、私は本当に楽しみにして、孫さんも若い頃はよく会ってたんですけど、久しぶりにお会いして、今日はまた孫正義夫氏を聞けるなと思って楽しみにしているんですけれども、いずれにしても、なんとなくアメリカが先行しているように皆さんは思っておられると思いますが、日本も先頭集団にいますので、マナソンに例えれば42キロ、今、これまた孫さんと考え違うかもしれません。 私はまだ5キロ、10キロ、これからいろんなことがある。その先頭集団にいますから、決して第二集団、第三集団ではないと認識をしています。すでに多くの企業、スタートアップも、我々もいろんな形で応援してきていますが、今日そんな議論をさせていただければと思いますが、 計算省としてですね、私の立場で、まさにこの生成AIを開発するいろんなタイプのもの、そして計算基盤であるとか、データの整備であるとか、しっかりと先頭集団、そして世界をリードする、そんな企業、そんな技術を生み出していきたいというふうに思っています。 ありがとうございました。それでは次は孫さん。先日ソフトバンクグループ株式会社の株主総会で、AI時代の到来と将来の展望について厚く語っておられましたが、その一端をぜひご紹介いただきたいと思います。お願いします。 まず最初にですね、皆さんに大きなピクチャーでものを見てほしいと思うんですけれども、考えてみてください。 人間と、平均的な人間とですね、最も賢い魚と、どっちが賢いかと。 哲学的な意味じゃなくて、科学的な意味で言っているんですけれども、どんなにトレーニングした、どんなに鍛えられた魚でもですね、平均的な人間の脳細胞の活動には絶対勝てないと思うんですね。 じゃあ魚に、中にはすごい賢いものがいるとかいう人がいるかもしれませんので、念のためにもう一つ聞きます。 どんなに賢い蝶々、鍛えられた蝶々と平均的な人間と比べて、どちらが賢いかと。 まさか蝶々の方が賢いと。蝶々は道具を使えるとか、蝶々は言葉をしゃべれるとか、コンピューターを使えるとかいう人はいないと思うんですね。 ちなみに人間の脳細胞のニューロンの数と、魚の脳細胞、ニューロンの数ですね、何倍かというと約1万倍ですね。 蝶々と人類の差は約40万倍、100万倍に至らないぐらいの差ですね。 蚊も蝶々もだいたい同じようなものですね。 一番賢い蚊が平均的に人間より賢いという人はいないと思うんですけど。 これは基本的に脳細胞の数、ニューロンの数とその生命体が持っている知恵だとか知識の差というのはおおむね比例するんだろうと思うんですね。 やはり脳細胞が複雑でたくさんあるから、ものを学んだり考えたりすることができるということだと思います。 つい最近までですね、AIはどのくらい賢いのかと、AIの限界どのくらいかと、AIで東大に入学試験に通るのかというのを試しておられた方々がいましたけれども、見事に失敗したという話聞きましたけれども、なぜかというと、その読解力がないんだという説明でした。 私はえーっと思ったんですね。それはAIに限界があったんじゃなくて、そのAIをやっていたチームに限界があっただけなんじゃないかと。別にAIに限界があったわけではないということを見事に証明されたのは、現に今のGPT-4はアメリカで少なくとも、医学、法学、数学、物理学、科学、いろいろな大学の入学試験でですね、 トップ10%レベルぐらいの上位で合格していると。3.5の時は通らなかったんですね。4になって見事に全部合格しているという状況であります。 つまりほとんど平均的な人類よりは、もうすでにGPT-4は大学にことごとく入学できる。まず僕は絶対医学とか法学とか同時に全部合格するということは間違いなくできないと思うんですね。 全部の科目をアクロスで合格できるだけの知恵だとか知識は僕は持っていませんけれども、平均的な人はそうだと思うんですね。 そのGPT-4が1だとして、1の知恵の能力、知識の能力があるとして、今から10年後に何倍ぐらいこの脳細胞の働き、これが増えるかと。 脳細胞の数、その脳細胞を活用した知恵、これがどのくらい能力が増えるかというと、100万倍を超えると思います。 つまり今のGPT-4がすでに平均的人間のレベルの入学試験に通るレベルということは平均的人間のレベルを同等ぐらい、あるいはそれ以上あるとして、そこから100万倍になるのがたった10年かからずしてなると。 僕は今もう断言できます。なぜならいろいろ具体的にそこに様々に見ているからですね。 10年以内に100万倍になると。つまり人間対蝶々以上の差になると。さらにその10年後にはその1000倍ぐらいには少なくともいくでしょうということは1兆倍になるということですね。 100万倍の1000倍、1兆倍。1兆倍の差がついたら、もはやAIは人間より賢いのかとか、どの分野で人間はAIより賢いのかとか、そういう議論をすることがそもそも虚しくなるぐらい圧倒的差になるということであります。 圧倒的差になった時代、しかもそれが我々がもしかしたら生きている間の時に起きると。少なくとも我々の子供の時代には間違いなく起きると。ちょうどそのシンギュラリティのクロスポイントに我々は今生きているということだと。 だとすると、人間そのものの在り方。人間は今まで地上で一番賢い動物だったんですけれども、そうでなくなる時代が来ると。その時に果たして人間の幸せとは何か、人間の仕事とは何か、調和とは何か、平和とは何か、そういうようなことを根底から考え直す。 そういうテーマを我々はまさに議論し始める、そういう必要がある時期が来たというふうに思います。 ソンさんありがとうございました。今、生成AIの将来についてお話いただきましたが、ここで松尾先生にお話をいただいて、併せて同じ研究者としてのシェイン・グーさん、ご存知でいらっしゃいますので、簡単にご紹介もいただければと思います。 生成AI、非常に大きなポテンシャルがあるというふうに思っています。 現状の生成AIの技術を少し解説しますと、画像系とテキスト系、大きく二つあります。 画像に関してはディフュージョンモデルという、深層学習、ディープラーニングの技術が使われることが多いです。 それからテキスト、自然言語に関してはトランスフォーマーというものが使われる場合が多くて、これは2017年にGoogleの研究者らが提案したものなんですけれども、これが大規模に使われている。 特にスケーリングロー、スケール速というのが発見され、大きなパラメータのモデルを使えば使うほど性能が上がるということで、より巨大なモデルを使い、より多くのデータ、よりパワフルな計算機で学習をさせるというような競争が始まっています。 それが非常に大規模化しているということで、1750億パラメータ、GPT-3、GPT-4は分かりませんけれども、何兆パラメータかという感じに増えてきています。 今、孫さんがおっしゃったように、まだまだ実は人間の脳のパラメータ数には及んでいないんですが、いずれ近いうちに追いつき、またすぐに追い越すということになるんだというふうに思っています。 現状のこういった生成AIの技術だけ考えても、相当大きな範囲で産業社会にインパクトがあるというふうに思っています。 インターネットでも、スマホでも、トランジスタ、電気のようなものでも、何でも一緒なんですけれども、技術のシーズというのがあって、それが社会に伝播し、社会を大きく変えるまで時差があります。 時差があるんだけれども、それが行き渡っていくうちに、どんどん波が大きくなって、非常に大きな変化になって現れると。 インターネットも技術としては小さい技術だったかもしれませんが、非常に大きく我々の生活を変えたと。 生成AIも今の技術、まだこの技術が出てほんの零明期なんですけれども、それだけでもこれだけ我々の社会に影響を与え始めている。 これが隅々まで行き渡れば、どんな影響になるのか、非常に巨大だと。 しかも、これがまだこれで終わりではなくて、技術がどんどん進展します。 と同時に、今、その社長がおっしゃったように、計算機のパワーもどんどん増大していくということで、本当に大きなことがこれから起こってくるんだというふうに思っています。 そういった中で、我々どうしていくべきか、どういうふうな社会を作っていきたいのかということは、しっかり考えていかないといけませんし、 その活用の仕方とか、そういったことも議論していくべき状況なんだろうというふうに思っています。 はい。私の話はそれで、ちょっとシェンさんをご紹介しますと、シェン・グーさんですね。 トロント大の学部を出たんですけれども、そこでヒントン先生に指導を受けて、その後ケンブリッジでPhDを取得されています。 その後、Googleブレインに入って、ロボットのチームを立ち上げたりして、今年の初めからオープンAIに移って、チャットGPTの開発の幹部をされているということで、 要するに、このディープラーニング時代、生成AI時代の最も良いキャリアというか、一番中心地を歩み続けているという方で、 あと研究成果としても、教科学習とか生成AIの基本的な部分での非常に大きな研究成果を挙げている方です。 はい。紹介はこのぐらいでお願いします。 ありがとうございました。 じゃあ、シェンさん引き続きまして、シェンさんのお立場から何か、今の段階でお話しいただけること、簡単にお願いします。 はい。呼んでいただき、本当に光栄です。 2つ話します。1つ目はチャットGPTの未来。大人の事情で詳しいことは言えないんですけど、中小企業研究者から言うと、僕は知能は2つあると思うんですよね。 1つは自動的な、内在的な知能。それは世界を観測して予測し続けます。そして、能動的な、外部的な知能。これは自分の行動によって自分が思い描いた未来を引き出す能力。 今のGPT、こういうモデルは、ほとんどの学習は自動的なデータから来ています。 ただ、半年前にチャットGPTが出て、一気に人と汎用性人工知能が人類史上初めて一緒に働き始めたんですよね。 一緒に生活して、一緒に働いて、一緒に研究して、一緒に発明して、それがもう始まっています。 そのデータによって、人とAIのデータによって、AIがどういう風に進化し続けるか、人がどういう風に進化し続けるか、すごく楽しみです。 2つ目、日本と生成AIについて。 日本はオープンAI、そして生成にとってすごく重要な役割を果たせると思っています。 それは本当に岸田将とか、いろんな人が話された、日本のこのすごく絶妙な積極性と慎重さのバランス、そしてそれに対しての世界の信頼。 日本はチャットGPTが出てから、サムさんが訪問した初めての国です。 そして現段階で唯一、オープンAIができる。',
      },
      {
        name: '株価分析',
        instructions: 'userが入力した日経平均株価の日次データを分析し、傾向について報告しなさい。また、将来の見通しも報告しなさい。',
        samples: [],
        prompts: 'データ日付	終値	始値	高値	安値\n\
2023/6/1	31148.01	30886.01	31185.05	30853.44\n\
2023/6/2	31524.22	31300.72	31555.54	31257.01\n\
2023/6/5	32217.43	31864.12	32217.43	31798.72\n\
2023/6/6	32506.78	31988.37	32534.47	31933.87\n\
2023/6/7	31913.74	32618.78	32708.53	31913.74\n\
2023/6/8	31641.27	31877.79	32035.95	31420.45\n\
2023/6/9	32265.17	31927.38	32304.04	31898.75\n\
2023/6/12	32434	32412.12	32517.68	32280.54\n\
2023/6/13	33018.65	32668.95	33127.36	32638.21\n\
2023/6/14	33502.42	33331.47	33665.52	33203.95\n\
2023/6/15	33485.49	33493.69	33767.13	33386.01\n\
2023/6/16	33706.08	33399.15	33772.76	33186.93\n\
2023/6/19	33370.42	33768.69	33772.89	33231.56\n\
2023/6/20	33388.91	33269.57	33474.74	33089.02\n\
2023/6/21	33575.14	33200.63	33657.87	33154.68\n\
2023/6/22	33264.88	33438.01	33641.46	33232.19\n\
2023/6/23	32781.54	33458.35	33533.47	32575.56\n\
2023/6/26	32698.81	32647.08	32884.73	32392.72\n\
2023/6/27	32538.33	32629.96	32689.1	32306.99\n\
2023/6/28	33193.99	32807.84	33193.99	32642.87\n\
2023/6/29	33234.14	33306.84	33527.98	33185.2\n\
2023/6/30	33189.04	33068.36	33232.89	32918.77\n\
2023/7/3	33753.33	33517.6	33762.81	33510.55\n\
2023/7/4	33422.52	33512.26	33576.45	33338.78\n\
2023/7/5	33338.7	33165.06	33389.22	33041.14\n\
2023/7/6	32773.02	33058.4	33079.45	32637.72\n\
2023/7/7	32388.42	32450.64	32730.25	32327.9\n\
2023/7/10	32189.73	32393.46	32558.98	32065.63\n\
2023/7/11	32203.57	32434.67	32468.7	32084.42\n\
2023/7/12	31943.93	32280.05	32312.03	31791.71\n\
2023/7/13	32419.33	32106.05	32484.4	31952.98\n\
2023/7/14	32391.26	32587.9	32780.63	32225.37\n\
2023/7/18	32493.89	32457.18	32714.59	32338.3\n\
2023/7/19	32896.03	32812.36	32896.03	32671.03\n\
',
      },
      {
        name: '資料作成',
        instructions: 'userが入力したお題に従って、５項目の目次を箇条書きで作成しなさい。各項目の概要も簡単に説明しなさい。',
        samples: [],
        prompts: '映像人物再照合サービスの事業戦略',
      },
      {
        name: 'カスタム',
        instructions: '',
        samples: [],
        prompts: '',
      },
    ],
  AUDIO_LANGUAGES: [
    { text: '', value: '' },
    { text: '日本語', value: 'ja' },
    { text: '韓国語', value: 'ko' },
    { text: '中国語', value: 'zh' },
    { text: '英語', value: 'en' },
  ]
}
