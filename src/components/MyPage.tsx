import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BottomNavigation from './BottomNavigation';

// 애니메이션 키프레임들
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 6px rgba(255, 105, 180, 0.4)); }
  50% { filter: drop-shadow(0 0 15px rgba(255, 105, 180, 0.7)); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center;
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// 개선된 다마고치 스타일 컴포넌트들
const Container = styled.div`
  min-height: calc(100vh - 90px);
  padding: 20px;
  padding-bottom: 20px;
  margin-bottom: 90px;
  background: linear-gradient(135deg, 
    #FFB6C1 0%, 
    #FFC0CB 20%, 
    #FFE4E1 40%, 
    #F0F8FF 60%, 
    #E6E6FA 80%, 
    #DDA0DD 100%);
  background-attachment: fixed;
  font-family: 'VT323', monospace;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(230, 230, 250, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  padding: 30px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 240, 245, 0.95) 50%, 
    rgba(255, 228, 225, 0.95) 100%);
  border: 4px solid #FF69B4;
  border-radius: 30px;
  box-shadow: 
    0 15px 35px rgba(255, 105, 180, 0.3),
    0 8px 16px rgba(255, 20, 147, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.8),
    inset 0 -2px 0 rgba(255, 105, 180, 0.3);
  backdrop-filter: blur(20px);
  animation: fadeIn 0.8s ease-out;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF69B4, #FF1493, #FF69B4);
    border-radius: 32px;
    z-index: -1;
    opacity: 0.3;
    animation: glow 3s ease-in-out infinite;
  }
`;

const Title = styled.h1`
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 2.5rem;
  color: #8B008B;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.8);
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #4B0082;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  opacity: 0.9;
`;

const SectionContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SectionCard = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 240, 245, 0.95) 50%, 
    rgba(255, 228, 225, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 
    0 15px 35px rgba(255, 105, 180, 0.3),
    0 8px 16px rgba(255, 20, 147, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.8),
    inset 0 -2px 0 rgba(255, 105, 180, 0.3);
  border: 3px solid #FF69B4;
  animation: fadeIn 0.6s ease-out;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF69B4, #FF1493, #FF69B4);
    border-radius: 27px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.3;
  }
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 15px;
  text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.6);
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border: none;
  padding: 20px 25px;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 20px rgba(255, 105, 180, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  font-family: 'VT323', monospace;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      transparent 100%);
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 15px 30px rgba(255, 105, 180, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &:nth-child(2) {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    box-shadow: 
      0 8px 20px rgba(240, 147, 251, 0.4),
      inset 0 2px 0 rgba(255, 255, 255, 0.3);
    
    &:hover {
      box-shadow: 
        0 15px 30px rgba(240, 147, 251, 0.5),
        inset 0 2px 0 rgba(255, 255, 255, 0.4);
    }
  }
`;

const AuthButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  width: 100%;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const AuthMessage = styled.div<{ isSuccess?: boolean }>`
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
  background: ${props => props.isSuccess 
    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' 
    : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'};
  color: white;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  animation: fadeIn 0.4s ease-out;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.4s ease-out;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
`;

const ModalInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  resize: vertical;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ModalButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 12px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:last-child {
    background: #f8f9fa;
    color: #666;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: #e9ecef;
    }
  }
`;

const ExpandableResult = styled.div<{ isExpanded: boolean }>`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ExpandableHeader = styled.div`
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    opacity: 0.9;
  }
`;

const ExpandableContent = styled.div<{ isExpanded: boolean }>`
  max-height: ${props => props.isExpanded ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  padding: ${props => props.isExpanded ? '20px' : '0 20px'};
`;

const ExpandIcon = styled.span<{ isExpanded: boolean }>`
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: rotate(${props => props.isExpanded ? '180deg' : '0deg'});
`;

const QuestionItem = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const QuestionNumber = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const QuestionText = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 12px;
`;

const AnswerInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`;

const AnswerItem = styled.div<{ isCorrect: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => props.isCorrect 
    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' 
    : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'};
  color: white;
`;

const ExplanationText = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
  padding: 12px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const NavigationButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuestionCounter = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #667eea;
`;

const ReportItem = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ReportDate = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ReportStatus = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.status) {
      case 'pending': return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
      case 'processing': return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'completed': return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      default: return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
    }
  }};
  color: white;
`;

const ReportContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;
`;

interface ReportItem {
  id: string;
  content: string;
  date: string;
  status: 'pending' | 'processing' | 'completed';
}

interface WrongAnswer {
  examType: string;
  examNumber: string;
  questionId: number;
  question: string;
  userAnswer: number;
  correctAnswer: number;
  explanation: string;
}

interface BookmarkedQuestion {
  examType: string;
  examNumber: string;
  questionId: number;
  question: string;
  explanation: string;
}

interface ExamResult {
  examType: string;
  examNumber: string;
  totalScore: number;
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
  isPassed: boolean;
  subject1Passed: boolean;
  subject2Passed: boolean;
  subject3Passed: boolean;
  date: string;
}

const MyPage: React.FC = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showWrongAnswersModal, setShowWrongAnswersModal] = useState(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [reportText, setReportText] = useState('');
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<BookmarkedQuestion[]>([]);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [currentWrongAnswerIndex, setCurrentWrongAnswerIndex] = useState(0);
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadExamResults();
    loadReports();
    loadWrongAnswers();
    loadBookmarkedQuestions();
    checkAuthentication();
  }, []);

  const loadExamResults = () => {
    const results: ExamResult[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('exam_result_')) {
        try {
          const result = JSON.parse(localStorage.getItem(key) || '');
          results.push(result);
        } catch (e) {
          console.error('Error parsing exam result:', e);
        }
      }
    }
    setExamResults(results);
  };

  const loadReports = () => {
    const savedReports = localStorage.getItem('reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  };

  const loadWrongAnswers = () => {
    const wrongAnswers: WrongAnswer[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('exam_progress_')) {
        try {
          const examData = JSON.parse(localStorage.getItem(key) || '');
          if (examData.questions) {
            examData.questions.forEach((question: any, index: number) => {
              if (question.selectedAnswer !== undefined && question.selectedAnswer !== question.correctAnswer) {
                wrongAnswers.push({
                  examType: examData.examType,
                  examNumber: examData.examNumber,
                  questionId: index + 1,
                  question: question.question,
                  userAnswer: question.selectedAnswer,
                  correctAnswer: question.correctAnswer,
                  explanation: question.explanation
                });
              }
            });
          }
        } catch (e) {
          console.error('Error parsing exam data:', e);
        }
      }
    }
    setWrongAnswers(wrongAnswers);
  };

  const loadBookmarkedQuestions = () => {
    const bookmarkedQuestions: BookmarkedQuestion[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('exam_progress_')) {
        try {
          const examData = JSON.parse(localStorage.getItem(key) || '');
          if (examData.questions) {
            examData.questions.forEach((question: any, index: number) => {
              if (question.isBookmarked) {
                bookmarkedQuestions.push({
                  examType: examData.examType,
                  examNumber: examData.examNumber,
                  questionId: index + 1,
                  question: question.question,
                  explanation: question.explanation
                });
              }
            });
          }
        } catch (e) {
          console.error('Error parsing exam data:', e);
        }
      }
    }
    setBookmarkedQuestions(bookmarkedQuestions);
  };

  const handleReportSubmit = () => {
    if (reportText.trim()) {
      const newReport: ReportItem = {
        id: Date.now().toString(),
        content: reportText,
        date: new Date().toLocaleDateString('ko-KR'),
        status: 'pending'
      };
      const updatedReports = [...reports, newReport];
      setReports(updatedReports);
      localStorage.setItem('reports', JSON.stringify(updatedReports));
      setReportText('');
      setShowReportModal(false);
    }
  };

  const toggleExpandedResult = (examKey: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(examKey)) {
      newExpanded.delete(examKey);
    } else {
      newExpanded.add(examKey);
    }
    setExpandedResults(newExpanded);
  };

  const handleWrongAnswerNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentWrongAnswerIndex > 0) {
      setCurrentWrongAnswerIndex(currentWrongAnswerIndex - 1);
    } else if (direction === 'next' && currentWrongAnswerIndex < wrongAnswers.length - 1) {
      setCurrentWrongAnswerIndex(currentWrongAnswerIndex + 1);
    }
  };

  const handleBookmarkNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentBookmarkIndex > 0) {
      setCurrentBookmarkIndex(currentBookmarkIndex - 1);
    } else if (direction === 'next' && currentBookmarkIndex < bookmarkedQuestions.length - 1) {
      setCurrentBookmarkIndex(currentBookmarkIndex + 1);
    }
  };

  const checkAuthentication = () => {
    const authenticated = localStorage.getItem('bookAuthenticated') === 'true';
    setIsAuthenticated(authenticated);
  };

  const handleAuthSubmit = () => {
    if (authCode === '0701') {
      setIsAuthenticated(true);
      localStorage.setItem('bookAuthenticated', 'true');
      setAuthMessage('✅ 인증이 완료되었습니다!');
      setTimeout(() => {
        setShowAuthModal(false);
        setAuthMessage('');
        setAuthCode('');
      }, 2000);
    } else {
      setAuthMessage('❌ 잘못된 인증 코드입니다.');
    }
  };

  return (
    <Container>
      <Header>
        <Title>👤 마이 페이지</Title>
        <Subtitle>학습 현황과 개인 설정을 관리하세요</Subtitle>
      </Header>

      <SectionContainer>
        <SectionCard>
          <SectionTitle>
            🔐 도서 인증
          </SectionTitle>
          {!isAuthenticated ? (
            <AuthButton onClick={() => setShowAuthModal(true)}>
              도서 인증하기
            </AuthButton>
          ) : (
            <AuthMessage isSuccess={true}>
              ✅ 인증 완료
            </AuthMessage>
          )}
        </SectionCard>

        <SectionCard>
          <SectionTitle>
            🚨 오류 신고
          </SectionTitle>
          <ButtonGrid>
            <ActionButton onClick={() => setShowReportModal(true)}>
              오류 신고하기
            </ActionButton>
            <ActionButton onClick={() => setShowReportsModal(true)}>
              신고 내역 확인
            </ActionButton>
          </ButtonGrid>
        </SectionCard>

        <SectionCard>
          <SectionTitle>
            📊 시험 결과
          </SectionTitle>
          <ButtonGrid>
            <ActionButton onClick={() => setShowResultsModal(true)}>
              결과 확인하기
            </ActionButton>
            <ActionButton onClick={() => setShowWrongAnswersModal(true)}>
              오답노트 확인
            </ActionButton>
            <ActionButton onClick={() => setShowBookmarksModal(true)}>
              북마크 확인
            </ActionButton>
          </ButtonGrid>
        </SectionCard>
      </SectionContainer>

      {/* 도서 인증 모달 */}
      {showAuthModal && (
        <Modal onClick={() => setShowAuthModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🔐 도서 인증</ModalTitle>
            <p style={{ marginBottom: '20px', color: '#666', textAlign: 'center' }}>
              125페이지 셋째 줄의 숫자를 입력하세요.
            </p>
            <AuthInput
              type="text"
              placeholder="인증 코드 입력"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              maxLength={4}
            />
            {authMessage && (
              <AuthMessage isSuccess={authMessage.includes('완료')}>
                {authMessage}
              </AuthMessage>
            )}
            <div style={{ textAlign: 'center' }}>
              <ModalButton onClick={handleAuthSubmit}>
                인증하기
              </ModalButton>
              <ModalButton onClick={() => setShowAuthModal(false)}>
                취소
              </ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* 오류 신고 모달 */}
      {showReportModal && (
        <Modal onClick={() => setShowReportModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🚨 오류 신고</ModalTitle>
            <ModalInput
              placeholder="발견한 오류나 개선사항을 자세히 작성해주세요..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
            <div style={{ textAlign: 'center' }}>
              <ModalButton onClick={handleReportSubmit}>
                신고하기
              </ModalButton>
              <ModalButton onClick={() => setShowReportModal(false)}>
                취소
              </ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* 신고 내역 모달 */}
      {showReportsModal && (
        <Modal onClick={() => setShowReportsModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>📋 신고 내역</ModalTitle>
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportItem key={report.id}>
                  <ReportHeader>
                    <ReportDate>{report.date}</ReportDate>
                    <ReportStatus status={report.status}>
                      {report.status === 'pending' && '대기중'}
                      {report.status === 'processing' && '처리중'}
                      {report.status === 'completed' && '완료'}
                    </ReportStatus>
                  </ReportHeader>
                  <ReportContent>{report.content}</ReportContent>
                </ReportItem>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                신고 내역이 없습니다.
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <ModalButton onClick={() => setShowReportsModal(false)}>
                닫기
              </ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* 시험 결과 모달 */}
      {showResultsModal && (
        <Modal onClick={() => setShowResultsModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>📊 시험 결과</ModalTitle>
            {examResults.length > 0 ? (
              examResults.map((result) => {
                const examKey = `${result.examType}_${result.examNumber}`;
                const isExpanded = expandedResults.has(examKey);
                return (
                  <ExpandableResult key={examKey} isExpanded={isExpanded}>
                    <ExpandableHeader onClick={() => toggleExpandedResult(examKey)}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                          {result.examType} {result.examNumber}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                          총점: {result.totalScore}/100점 | 
                          {result.isPassed ? ' ✅ 합격' : ' ❌ 불합격'}
                        </div>
                      </div>
                      <ExpandIcon isExpanded={isExpanded}>▼</ExpandIcon>
                    </ExpandableHeader>
                    <ExpandableContent isExpanded={isExpanded}>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ 
                          padding: '12px', 
                          background: 'rgba(102, 126, 234, 0.1)', 
                          borderRadius: '8px',
                          marginBottom: '8px'
                        }}>
                          <strong>1과목 (데이터 이해):</strong> {Math.round((result.subject1Score / 20) * 100)}/100점
                          {result.subject1Passed ? ' ✅' : ' ❌'}
                        </div>
                        <div style={{ 
                          padding: '12px', 
                          background: 'rgba(102, 126, 234, 0.1)', 
                          borderRadius: '8px',
                          marginBottom: '8px'
                        }}>
                          <strong>2과목 (데이터 분석 기획):</strong> {Math.round((result.subject2Score / 20) * 100)}/100점
                          {result.subject2Passed ? ' ✅' : ' ❌'}
                        </div>
                        <div style={{ 
                          padding: '12px', 
                          background: 'rgba(102, 126, 234, 0.1)', 
                          borderRadius: '8px'
                        }}>
                          <strong>3과목 (데이터 분석):</strong> {Math.round((result.subject3Score / 60) * 100)}/100점
                          {result.subject3Passed ? ' ✅' : ' ❌'}
                        </div>
                      </div>
                    </ExpandableContent>
                  </ExpandableResult>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                시험 결과가 없습니다.
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <ModalButton onClick={() => setShowResultsModal(false)}>
                닫기
              </ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* 오답노트 모달 */}
      {showWrongAnswersModal && (
        <Modal onClick={() => setShowWrongAnswersModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>❌ 오답노트</ModalTitle>
            {wrongAnswers.length > 0 ? (
              <>
                <QuestionItem>
                  <QuestionHeader>
                    <QuestionNumber>
                      {wrongAnswers[currentWrongAnswerIndex].examType} {wrongAnswers[currentWrongAnswerIndex].examNumber} - 
                      {wrongAnswers[currentWrongAnswerIndex].questionId}번
                    </QuestionNumber>
                  </QuestionHeader>
                  <QuestionText>
                    {wrongAnswers[currentWrongAnswerIndex].question}
                  </QuestionText>
                  <AnswerInfo>
                    <AnswerItem isCorrect={false}>
                      내 답: {String.fromCharCode(65 + wrongAnswers[currentWrongAnswerIndex].userAnswer)}번
                    </AnswerItem>
                    <AnswerItem isCorrect={true}>
                      정답: {String.fromCharCode(65 + wrongAnswers[currentWrongAnswerIndex].correctAnswer)}번
                    </AnswerItem>
                  </AnswerInfo>
                  <ExplanationText>
                    <strong>해설:</strong> {wrongAnswers[currentWrongAnswerIndex].explanation}
                  </ExplanationText>
                </QuestionItem>
                <NavigationContainer>
                  <NavigationButton
                    onClick={() => handleWrongAnswerNavigation('prev')}
                    disabled={currentWrongAnswerIndex === 0}
                  >
                    이전
                  </NavigationButton>
                  <QuestionCounter>
                    {currentWrongAnswerIndex + 1} / {wrongAnswers.length}
                  </QuestionCounter>
                  <NavigationButton
                    onClick={() => handleWrongAnswerNavigation('next')}
                    disabled={currentWrongAnswerIndex === wrongAnswers.length - 1}
                  >
                    다음
                  </NavigationButton>
                </NavigationContainer>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                오답이 없습니다.
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <ModalButton onClick={() => {
                setShowWrongAnswersModal(false);
                setCurrentWrongAnswerIndex(0);
              }}>
                닫기
              </ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}

      {/* 북마크 모달 */}
      {showBookmarksModal && (
        <Modal onClick={() => setShowBookmarksModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>⭐ 북마크</ModalTitle>
            {bookmarkedQuestions.length > 0 ? (
              <>
                <QuestionItem>
                  <QuestionHeader>
                    <QuestionNumber>
                      {bookmarkedQuestions[currentBookmarkIndex].examType} {bookmarkedQuestions[currentBookmarkIndex].examNumber} - 
                      {bookmarkedQuestions[currentBookmarkIndex].questionId}번
                    </QuestionNumber>
                  </QuestionHeader>
                  <QuestionText>
                    {bookmarkedQuestions[currentBookmarkIndex].question}
                  </QuestionText>
                  <ExplanationText>
                    <strong>해설:</strong> {bookmarkedQuestions[currentBookmarkIndex].explanation}
                  </ExplanationText>
                </QuestionItem>
                <NavigationContainer>
                  <NavigationButton
                    onClick={() => handleBookmarkNavigation('prev')}
                    disabled={currentBookmarkIndex === 0}
                  >
                    이전
                  </NavigationButton>
                  <QuestionCounter>
                    {currentBookmarkIndex + 1} / {bookmarkedQuestions.length}
                  </QuestionCounter>
                  <NavigationButton
                    onClick={() => handleBookmarkNavigation('next')}
                    disabled={currentBookmarkIndex === bookmarkedQuestions.length - 1}
                  >
                    다음
                  </NavigationButton>
                </NavigationContainer>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                북마크된 문제가 없습니다.
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <ModalButton onClick={() => {
                setShowBookmarksModal(false);
                setCurrentBookmarkIndex(0);
              }}>
                닫기
              </ModalButton>
            </div>
          </ModalContent>
        </Modal>
      )}

      <BottomNavigation />
    </Container>
  );
};

export default MyPage;

