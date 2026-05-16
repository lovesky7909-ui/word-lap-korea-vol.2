export interface UserProfile {
  uid: string;
  name: string;
}

export interface MemberState {
  name: string;
  answeredCurrent: boolean;
  lastAnswerStatus: "correct" | "wrong" | "idle";
  attemptCount: number;
}

export interface GroupData {
  id: string;
  name: string;
  status: "waiting" | "playing" | "finished";
  currentQuestionIndex: number;
  members: Record<string, MemberState>;
  startTime?: number;
  endTime?: number;
}

export interface AttemptData {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  questionIndex: number;
  word: string;
  selectedAnswer: string;
  isCorrect: boolean;
  reason: string;
  reasonType: "form" | "function" | "meaning";
  timestamp: number;
}
