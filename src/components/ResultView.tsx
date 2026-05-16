/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Users, 
  Zap,
  RotateCcw
} from "lucide-react";
import { QUESTIONS } from "../constants";
import { AttemptData } from "../types";

interface ResultViewProps {
  userName: string;
  groupName: string;
  attempts: AttemptData[];
  onRestart: () => void;
}

export default function ResultView({ userName, groupName, attempts, onRestart }: ResultViewProps) {
  // Filter for only final attempts or correct ones to show user's journey
  const summary = QUESTIONS.map((q, idx) => {
    const questionAttempts = attempts.filter(a => a.questionIndex === idx);
    const lastAttempt = questionAttempts[questionAttempts.length - 1];
    const isCorrect = lastAttempt?.isCorrect || false;
    
    return {
      word: q.word,
      status: isCorrect ? "정답" : "오답/포기",
      userAnswers: questionAttempts.map(a => a.selectedAnswer).join(", "),
      correctAnswer: q.meaning,
      tries: questionAttempts.length
    };
  });

  const correctCount = summary.filter(s => s.status === "정답").length;
  const accuracy = Math.round((correctCount / QUESTIONS.length) * 100);

  // Mock rankings for feeling of competition
  const mockGroupRankings = [
    { name: "혜윰(Hye-yum)", score: 98, time: "4분 12초" },
    { name: groupName, score: accuracy, time: "5분 30초" },
    { name: "마중물", score: 85, time: "6분 20초" },
    { name: "가온누리", score: 70, time: "7분 45초" }
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="inline-block p-4 rounded-full bg-yellow-100 text-yellow-600 mb-6">
          <Trophy size={48} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-3">축하합니다, 품사 마스터!</h1>
        <p className="text-slate-600 text-lg">
          {userName} 학생의 노력이 결실을 맺었습니다. 모둠원들과 결과를 공유해보세요!
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="lesson-card bg-indigo-600 text-white text-center">
          <Zap className="mx-auto mb-2 opacity-80" />
          <p className="text-indigo-100 text-sm font-medium">나의 정답률</p>
          <h2 className="text-3xl font-black">{accuracy}%</h2>
        </div>
        <div className="lesson-card bg-white text-center border-indigo-100 border-2">
          <CheckCircle2 className="mx-auto mb-2 text-emerald-500" />
          <p className="text-slate-500 text-sm font-medium">맞힌 문제</p>
          <h2 className="text-3xl font-black text-slate-900">{correctCount} / {QUESTIONS.length}</h2>
        </div>
        <div className="lesson-card bg-white text-center border-indigo-100 border-2">
          <Award className="mx-auto mb-2 text-amber-500" />
          <p className="text-slate-500 text-sm font-medium">나의 랭킹</p>
          <h2 className="text-3xl font-black text-slate-900">상위 {100 - accuracy}%</h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Detailed Table */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-indigo-600" />
            문항별 상세 결과
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">단어</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">나의 선택</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">정답</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">결과</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {summary.map((row) => (
                  <tr key={row.word} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{row.word}</td>
                    <td className="p-4 text-slate-600 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {row.userAnswers.split(", ").map((ans, i, arr) => (
                          <span key={i} className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            i === arr.length - 1 && row.status === '정답' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-red-100 text-red-700'
                          }`}>
                            {ans}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                        {row.correctAnswer}
                      </span>
                    </td>
                    <td className="p-4">
                      {row.status === "정답" ? (
                        <CheckCircle2 className="text-emerald-500" size={20} />
                      ) : (
                        <XCircle className="text-red-500" size={20} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rankings Card */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="text-indigo-600" />
            모둠별 명예의 전당
          </h3>
          <div className="lesson-card">
            <div className="space-y-4">
              {mockGroupRankings.map((rank, idx) => (
                <div 
                  key={rank.name} 
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    rank.name === groupName ? 'bg-indigo-50 border border-indigo-200' : 'bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full font-black ${
                      idx === 0 ? 'bg-yellow-400 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{rank.name}</p>
                      <p className="text-[10px] text-slate-500 italic">기록 {rank.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-indigo-600">{rank.score}점</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onRestart}
            className="w-full mt-6 quiz-btn bg-slate-100 text-slate-600 flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            처음부터 다시 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
