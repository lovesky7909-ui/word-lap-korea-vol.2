/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import ConceptSheet from './components/ConceptSheet';
import QuizRoom from './components/QuizRoom';
import ResultView from './components/ResultView';
import { AttemptData } from './types';
import { Users, User } from 'lucide-react';

type Phase = 'learning' | 'setup' | 'quiz' | 'result';

export default function App() {
  const [phase, setPhase] = useState<Phase>('learning');
  const [userName, setUserName] = useState('');
  const [groupName, setGroupName] = useState('');
  const [attempts, setAttempts] = useState<AttemptData[]>([]);

  const handleStartSetup = () => setPhase('setup');

  const startQuiz = () => {
    if (userName && groupName) {
      setPhase('quiz');
    }
  };

  const finishQuiz = (finalAttempts: AttemptData[]) => {
    setAttempts(finalAttempts);
    setPhase('result');
  };

  const restart = () => {
    setAttempts([]);
    setPhase('learning');
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100">
      <AnimatePresence mode="wait">
        {phase === 'learning' && (
          <motion.div
            key="learning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConceptSheet onStart={handleStartSetup} />
          </motion.div>
        )}

        {phase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto py-20 px-4"
          >
            <div className="lesson-card text-center">
              <div className="mb-8 p-4 rounded-full bg-indigo-100 text-indigo-600 inline-block">
                <Users size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">참가자 정보 입력</h2>
              
              <div className="space-y-4 mb-10 text-left">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <Users size={16} /> 모둠 이름
                  </label>
                  <input 
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="예: 지혜로운 1모둠"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <User size={16} /> 나의 이름
                  </label>
                  <input 
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={startQuiz}
                disabled={!userName || !groupName}
                className="w-full quiz-btn primary-btn"
              >
                도전 시작하기
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizRoom 
              userName={userName} 
              groupName={groupName} 
              onFinish={finishQuiz} 
            />
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultView 
              userName={userName} 
              groupName={groupName} 
              attempts={attempts} 
              onRestart={restart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
