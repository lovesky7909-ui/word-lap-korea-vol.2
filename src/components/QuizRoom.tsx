/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Lightbulb, 
  MessageCircle, 
  ChevronRight, 
  AlertCircle,
  HelpCircle,
  X,
  CheckCircle2
} from "lucide-react";
import { QUESTIONS, Meaning, Function, Form } from "../constants";
import { AttemptData } from "../types";

interface QuizRoomProps {
  userName: string;
  groupName: string;
  onFinish: (attempts: AttemptData[]) => void;
}

export default function QuizRoom({ userName, groupName, onFinish }: QuizRoomProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [attempts, setAttempts] = useState<AttemptData[]>([]);
  const [currentTry, setCurrentTry] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [wrongSelection, setWrongSelection] = useState<string>("");
  const [reasonText, setReasonText] = useState("");
  const [reasonType, setReasonType] = useState<"form" | "function" | "meaning">("meaning");
  const [feedback, setFeedback] = useState<{ type: "success" | "info" | null; msg: string }>({ type: null, msg: "" });

  const currentQuestion = QUESTIONS[currentIdx];

  const handleAnswer = (selected: Meaning) => {
    const isCorrect = selected === currentQuestion.meaning;

    if (isCorrect) {
      const newAttempt: AttemptData = {
        id: Math.random().toString(36).substr(2, 9),
        groupId: groupName,
        userId: userName,
        userName: userName,
        questionIndex: currentIdx,
        word: currentQuestion.word,
        selectedAnswer: selected,
        isCorrect: true,
        reason: "",
        reasonType: "meaning",
        timestamp: Date.now()
      };
      
      const updatedAttempts = [...attempts, newAttempt];
      setAttempts(updatedAttempts);
      setFeedback({ 
        type: "success", 
        msg: "와우! 품사의 달인이군요! 모둠의 승리에 한 발짝 다가갔어요!" 
      });

      // Advance after a delay
      setTimeout(() => {
        if (currentIdx < QUESTIONS.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setCurrentTry(1);
          setShowHint(false);
          setFeedback({ type: null, msg: "" });
        } else {
          onFinish(updatedAttempts);
        }
      }, 2000);
    } else {
      setWrongSelection(selected);
      if (currentTry >= 4) {
        setFeedback({ 
          type: "info", 
          msg: "기회를 모두 사용했어요. 다음 문제로 넘어갑니다." 
        });
        setTimeout(() => {
          const skipAttempt: AttemptData = {
            id: Math.random().toString(36).substr(2, 9),
            groupId: groupName,
            userId: userName,
            userName: userName,
            questionIndex: currentIdx,
            word: currentQuestion.word,
            selectedAnswer: selected,
            isCorrect: false,
            reason: "기회 초과",
            reasonType: "meaning",
            timestamp: Date.now()
          };
          const updated = [...attempts, skipAttempt];
          setAttempts(updated);
          if (currentIdx < QUESTIONS.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setCurrentTry(1);
            setShowHint(false);
            setFeedback({ type: null, msg: "" });
          } else {
            onFinish(updated);
          }
        }, 2000);
      } else {
        setShowReasonModal(true);
      }
    }
  };

  const submitReason = () => {
    const failedAttempt: AttemptData = {
      id: Math.random().toString(36).substr(2, 9),
      groupId: groupName,
      userId: userName,
      userName: userName,
      questionIndex: currentIdx,
      word: currentQuestion.word,
      selectedAnswer: wrongSelection,
      isCorrect: false,
      reason: reasonText,
      reasonType: reasonType,
      timestamp: Date.now()
    };

    setAttempts(prev => [...prev, failedAttempt]);
    setCurrentTry(prev => prev + 1);
    setShowReasonModal(false);
    setReasonText("");
    setFeedback({ 
      type: "info", 
      msg: "아쉬워요! 하지만 다시 생각하면 충분히 맞힐 수 있어요. 친구들과 상의해 볼까요?" 
    });
    setTimeout(() => setFeedback({ type: null, msg: "" }), 3000);
  };

  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-sm font-bold text-indigo-600 mb-1">{groupName} 모둠</h2>
          <p className="text-lg font-bold text-slate-800">{userName} 학생의 도전</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 mb-1">진행 상황</p>
          <p className="text-xl font-black text-indigo-600">{currentIdx + 1} / {QUESTIONS.length}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-indigo-600"
        />
      </div>

      {/* Question Card */}
      <motion.div 
        key={currentIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lesson-card mb-8 text-center"
      >
        <p className="text-sm text-slate-500 mb-2">다음 단어의 품사는 무엇일까요?</p>
        <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tight">
          {currentQuestion.word}
        </h1>

        <div className="flex justify-center gap-4 mb-4">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 text-amber-700 text-sm font-semibold hover:bg-amber-100 transition-colors"
          >
            <Lightbulb size={16} />
            핵심 기본 개념 힌트
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-bold">
            <HelpCircle size={16} />
            도전 기회: {currentTry} / 4
          </div>
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl mt-2 text-left">
                <p className="text-amber-900 font-medium">💡 힌트: {currentQuestion.hint}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Answer Board */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {Object.values(Meaning).map((m) => (
          <button
            key={m}
            onClick={() => handleAnswer(m)}
            className="quiz-btn bg-white border-2 border-slate-100 hover:border-indigo-500 hover:text-indigo-600 transition-all font-bold text-slate-700 py-4"
          >
            {m}
          </button>
        ))}
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback.type && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-xl text-center font-bold shadow-lg ${
              feedback.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'
            }`}
          >
            {feedback.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reason Modal */}
      <AnimatePresence>
        {showReasonModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="text-red-500" />
                  오답 근거 분석
                </h3>
                <button onClick={() => setShowReasonModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X />
                </button>
              </div>

              <p className="text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                '{currentQuestion.word}'을(를) <span className="font-bold text-red-500">[{wrongSelection}]</span>(이)라고 생각한 이유를 분석해볼까요?
              </p>

              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">어떤 기준에서 틀렸나요?</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['form', 'function', 'meaning'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setReasonType(type)}
                      className={`py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                        reasonType === type 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {type === 'form' ? '형태' : type === 'function' ? '기능' : '의미'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-2">이유를 서술해주세요</label>
                <textarea
                  value={reasonText}
                  onChange={(e) => setReasonText(e.target.value)}
                  placeholder="예: 형태가 변하지 않아서 불변어라고 생각했어요."
                  className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none h-32 resize-none text-slate-800"
                />
              </div>

              <button
                disabled={!reasonText.trim()}
                onClick={submitReason}
                className="w-full quiz-btn primary-btn"
              >
                분석 완료하고 다시 도전
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
