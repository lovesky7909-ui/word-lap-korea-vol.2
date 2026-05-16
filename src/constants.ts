export enum Form {
  Fixed = "불변어",
  Variable = "가변어",
}

export enum Function {
  Substantive = "체언",
  Predicate = "용언",
  Modifier = "수식언",
  Relational = "관계언",
  Independent = "독립언",
}

export enum Meaning {
  Noun = "명사",
  Pronoun = "대명사",
  Number = "수사",
  Verb = "동사",
  Adjective = "형용사",
  Determiner = "관형사",
  Adverb = "부사",
  Postposition = "조사",
  Exclamation = "감탄사",
}

export interface QuestionData {
  id: number;
  word: string;
  form: Form;
  function: Function;
  meaning: Meaning;
  hint: string;
  description: string;
}

export const QUESTIONS: QuestionData[] = [
  {
    id: 1,
    word: "하늘",
    form: Form.Fixed,
    function: Function.Substantive,
    meaning: Meaning.Noun,
    hint: "'구름이 떠 있는 저곳'은 무엇일까요?",
    description: "구체적 대상의 이름을 나타내는 명사입니다."
  },
  {
    id: 2,
    word: "달리다",
    form: Form.Variable,
    function: Function.Predicate,
    meaning: Meaning.Verb,
    hint: "'빠르게 움직이는 행위'를 나타내요.",
    description: "움직임을 나타내며 형태가 변하는 동사입니다."
  },
  {
    id: 3,
    word: "예쁘다",
    form: Form.Variable,
    function: Function.Predicate,
    meaning: Meaning.Adjective,
    hint: "'모습이나 색깔이 곱다'는 성질을 나타내요.",
    description: "성질이나 상태를 나타내며 형태가 변하는 형용사입니다."
  },
  {
    id: 4,
    word: "넷",
    form: Form.Fixed,
    function: Function.Substantive,
    meaning: Meaning.Number,
    hint: "'세 개 다음에 하나 더 보탠 수'예요.",
    description: "수량이나 순서를 나타내는 수사입니다."
  },
  {
    id: 5,
    word: "빨리",
    form: Form.Fixed,
    function: Function.Modifier,
    meaning: Meaning.Adverb,
    hint: "'시간이 얼마 걸리지 않게'라는 뜻으로 다른 말을 꾸며줘요.",
    description: "주로 용언을 꾸며주는 부사입니다."
  },
  {
    id: 6,
    word: "와",
    form: Form.Fixed,
    function: Function.Relational,
    meaning: Meaning.Postposition,
    hint: "'나( ) 너' 사이를 연결해주는 말이에요.",
    description: "낱말 사이의 관계를 나타내주는 조사입니다."
  },
  {
    id: 7,
    word: "저",
    form: Form.Fixed,
    function: Function.Substantive,
    meaning: Meaning.Pronoun,
    hint: "'나'를 낮추어 가리키는 말이에요.",
    description: "이름을 대신하여 가리키는 대명사입니다."
  },
  {
    id: 8,
    word: "헌",
    form: Form.Fixed,
    function: Function.Modifier,
    meaning: Meaning.Determiner,
    hint: "'새'의 반대말로, 뒤에 오는 명사를 꾸며줘요.",
    description: "체언 앞에서 그 내용을 꾸며주는 관형사입니다."
  },
  {
    id: 9,
    word: "어머나",
    form: Form.Fixed,
    function: Function.Independent,
    meaning: Meaning.Exclamation,
    hint: "깜짝 놀랐을 때 나오는 말이에요.",
    description: "부름, 응답, 놀람 등을 나타내는 감탄사입니다."
  },
  {
    id: 10,
    word: "슬프다",
    form: Form.Variable,
    function: Function.Predicate,
    meaning: Meaning.Adjective,
    hint: "'마음이 아프고 괴롭다'는 상태를 나타내요.",
    description: "마음의 상태를 나타내는 형용사입니다."
  }
];
