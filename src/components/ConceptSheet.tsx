/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, Info, CheckCircle2 } from "lucide-react";

const conceptData = [
  {
    title: "1. 형태 (Form)",
    description: "단어의 형태가 변하는지 여부에 따른 분류",
    items: [
      { name: "가변어", detail: "문장에서 정황에 따라 형태가 변함 (예: 먹다, 먹고, 먹으니)" },
      { name: "불변어", detail: "항상 일정한 형태를 유지함 (예: 하늘, 매우, 의)" }
    ]
  },
  {
    title: "2. 기능 (Function)",
    description: "문장 안에서 단어가 하는 역할에 따른 분류",
    items: [
      { name: "체언", detail: "문장의 주체 역할을 함 (명사, 대명사, 수사)" },
      { name: "용언", detail: "주체를 서술하는 역할을 함 (동사, 형용사)" },
      { name: "수식언", detail: "다른 말을 꾸며주는 역할을 함 (관형사, 부사)" },
      { name: "관계언", detail: "낱말 사이의 관계를 나타냄 (조사)" },
      { name: "독립언", detail: "다른 성분과 관계없이 독립적으로 쓰임 (감탄사)" }
    ]
  },
  {
    title: "3. 의미 (Meaning)",
    description: "단어가 가진 의미의 성격에 따른 분류 (9품사)",
    items: [
      { name: "명사, 대명사, 수사", detail: "이름, 대신하는 말, 수량" },
      { name: "동사, 형용사", detail: "움직임, 상태/성질" },
      { name: "관형사, 부사", detail: "체언 꾸밈, 용언/문장 꾸밈" },
      { name: "조사", detail: "관계 표시" },
      { name: "감탄사", detail: "놀람, 느낌, 부름" }
    ]
  }
];

export default function ConceptSheet({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
          중학교 국어: 품사 단원
        </span>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">품사 마스터 챌린지</h1>
        <p className="text-slate-600 text-lg">
          단어의 갈래인 '품사'를 배우고, 친구들과 힘을 합쳐 퀴즈를 풀어보세요!
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {conceptData.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="lesson-card flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <BookOpen size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{section.title}</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 italic">{section.description}</p>
            <ul className="space-y-4 flex-grow">
              {section.items.map((item) => (
                <li key={item.name} className="flex gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={16} />
                  <div>
                    <p className="font-bold text-slate-800 leading-tight mb-1">{item.name}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 flex gap-4 items-start"
      >
        <div className="p-2 rounded-full bg-amber-100 text-amber-600">
          <Info size={24} />
        </div>
        <div>
          <h3 className="font-bold text-amber-900 mb-1">우리 모둠의 규칙</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            모둠원 **모두가 정답**을 맞춰야 다음 문제로 넘어갈 수 있습니다. 
            모르는 친구가 있다면 '핵심 기본 개념'을 보고 서로 가르쳐주며 학습해보세요!
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center">
        <button 
          onClick={onStart}
          className="quiz-btn primary-btn px-12 text-lg transform hover:scale-105"
        >
          챌린지 시작하기
        </button>
      </div>
    </div>
  );
}
