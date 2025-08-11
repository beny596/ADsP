import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BottomNavigation from './BottomNavigation';

interface Question {
  id: number;
  question: string;
  options: string[];
  selectedAnswer?: number;
  isBookmarked: boolean;
  correctAnswer: number;
  explanation: string;
}

const ExamContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: white;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ExamTitle = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Timer = styled.span<{ isWarning: boolean }>`
  color: ${props => props.isWarning ? '#ffeb3b' : 'white'};
  font-weight: bold;
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const QuestionNavigation = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  max-height: 120px;
  overflow-y: auto;
`;

const QuestionNumber = styled.button<{ 
  isCurrent: boolean; 
  isAnswered: boolean; 
  isBookmarked: boolean;
}>`
  width: 40px;
  height: 40px;
  border: 2px solid ${props => {
    if (props.isCurrent) return '#667eea';
    if (props.isBookmarked) return '#ffd700';
    if (props.isAnswered) return '#28a745';
    return '#e9ecef';
  }};
  background: ${props => {
    if (props.isCurrent) return '#667eea';
    if (props.isBookmarked) return '#fff3cd';
    if (props.isAnswered) return '#d4edda';
    return 'white';
  }};
  color: ${props => {
    if (props.isCurrent) return 'white';
    if (props.isBookmarked) return '#856404';
    if (props.isAnswered) return '#155724';
    return '#666';
  }};
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  &::after {
    content: '${props => props.isBookmarked ? '★' : ''}';
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 12px;
    color: #ffd700;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  padding-bottom: 20px;
  margin-bottom: 90px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const QuestionNumberDisplay = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #667eea;
`;

const BookmarkButton = styled.button<{ isBookmarked: boolean }>`
  background: ${props => props.isBookmarked ? '#ffd700' : 'white'};
  color: ${props => props.isBookmarked ? '#856404' : '#666'};
  border: 2px solid ${props => props.isBookmarked ? '#ffd700' : '#e9ecef'};
  padding: 8px 12px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: #ffd700;
    color: #856404;
    border-color: #ffd700;
  }
`;

const AnswerButton = styled.button`
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  margin-left: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
  }
`;

const AnswerModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const AnswerModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const AnswerTitle = styled.h3`
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  &::before {
    content: '✅';
    margin-right: 10px;
    font-size: 1.5rem;
  }
`;

const CorrectAnswer = styled.div`
  background: #d4edda;
  border: 2px solid #28a745;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  
  strong {
    color: #155724;
  }
`;

const Explanation = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  padding: 15px;
  border-radius: 10px;
  line-height: 1.6;
  color: #333;
`;

const CloseButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

const QuestionText = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 25px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OptionButton = styled.button<{ isSelected: boolean }>`
  background: ${props => props.isSelected ? '#667eea' : 'white'};
  color: ${props => props.isSelected ? 'white' : '#333'};
  border: 2px solid ${props => props.isSelected ? '#667eea' : '#e9ecef'};
  padding: 15px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-size: 1rem;

  &:hover {
    border-color: #667eea;
    background: ${props => props.isSelected ? '#667eea' : '#f8f9fa'};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const NavButton = styled.button`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResumeModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const TimeUpModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TimeUpModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

const TimeUpTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const TimeUpButton = styled.button`
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

const ExamPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [examType, setExamType] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90분을 초로 변환
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [isMockExam, setIsMockExam] = useState(false);

  // 시험 데이터 초기화
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || '';
    const number = params.get('number') || '';
    setExamType(`${type} ${number}`);
    setIsMockExam(type === '모의고사');

    // 저장된 진행상황 확인
    const savedProgress = localStorage.getItem(`exam_${type}_${number}`);
    
    if (savedProgress) {
      setShowResumeModal(true);
    } else {
      initializeExam();
    }
  }, [location]);

  // 타이머 기능 (모의고사만)
  useEffect(() => {
    if (!isMockExam) return;

    const savedTime = localStorage.getItem(`exam_time_${examType}`);
    if (savedTime) {
      setTimeLeft(parseInt(savedTime));
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowTimeUpModal(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMockExam, examType]);

  // 시간 저장
  useEffect(() => {
    if (isMockExam && timeLeft > 0) {
      localStorage.setItem(`exam_time_${examType}`, timeLeft.toString());
    }
  }, [timeLeft, isMockExam, examType]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const initializeExam = () => {
    const newQuestions: Question[] = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      question: `ADsP ${examType} ${index + 1}번 문제입니다. 데이터 분석과 관련된 이 문제에 대한 답을 선택해주세요.`,
      options: [
        `보기 1: 첫 번째 선택지입니다.`,
        `보기 2: 두 번째 선택지입니다.`,
        `보기 3: 세 번째 선택지입니다.`,
        `보기 4: 네 번째 선택지입니다.`
      ],
      isBookmarked: false,
      correctAnswer: Math.floor(Math.random() * 4), // 임시로 랜덤 정답 설정
      explanation: `이 문제는 데이터 분석의 기본 개념에 관한 문제입니다. 정답은 ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}번입니다. 데이터 분석에서는 이러한 개념을 정확히 이해하는 것이 중요합니다.`
    }));
    setQuestions(newQuestions);
  };

  const handleResumeExam = () => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || '';
    const number = params.get('number') || '';
    const savedProgress = localStorage.getItem(`exam_${type}_${number}`);
    
    if (savedProgress) {
      const { questions: savedQuestions, currentQuestion: savedCurrent } = JSON.parse(savedProgress);
      setQuestions(savedQuestions);
      setCurrentQuestion(savedCurrent);
    }
    setShowResumeModal(false);
  };

  const handleNewExam = () => {
    // 모의고사인 경우 새로 시작 불가
    if (isMockExam) {
      return;
    }
    initializeExam();
    setCurrentQuestion(1);
    setShowResumeModal(false);
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, selectedAnswer: optionIndex } : q
    ));

    // 모의고사인 경우 자동으로 다음 문제로 이동
    if (isMockExam && questionId < 50) {
      setTimeout(() => {
        setCurrentQuestion(questionId + 1);
      }, 500); // 0.5초 후 다음 문제로 이동
    }
  };

  const handleBookmarkToggle = (questionId: number) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, isBookmarked: !q.isBookmarked } : q
    ));
  };

  const handleQuestionNavigation = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 50) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const answeredCount = questions.filter(q => q.selectedAnswer !== undefined).length;
    if (answeredCount < 50) {
      if (window.confirm(`${answeredCount}/50 문제만 답변했습니다. 정말 제출하시겠습니까?`)) {
        alert('시험이 제출되었습니다!');
        // 모의고사인 경우 시간 데이터도 삭제
        if (isMockExam) {
          localStorage.removeItem(`exam_time_${examType}`);
        }
        navigate('/problem-study');
      }
    } else {
      alert('시험이 제출되었습니다!');
      // 모의고사인 경우 시간 데이터도 삭제
      if (isMockExam) {
        localStorage.removeItem(`exam_time_${examType}`);
      }
      navigate('/problem-study');
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleCloseAnswer = () => {
    setShowAnswer(false);
  };

  const handleTimeUpConfirm = () => {
    setShowTimeUpModal(false);
    // 모의고사 페이지로 이동
    navigate('/mock-exam');
  };

  // 진행상황 저장
  useEffect(() => {
    if (questions.length > 0) {
      const params = new URLSearchParams(location.search);
      const type = params.get('type') || '';
      const number = params.get('number') || '';
      localStorage.setItem(`exam_${type}_${number}`, JSON.stringify({
        questions,
        currentQuestion
      }));
    }
  }, [questions, currentQuestion, location]);

  const currentQuestionData = questions.find(q => q.id === currentQuestion);
  const progress = (questions.filter(q => q.selectedAnswer !== undefined).length / 50) * 100;

  if (questions.length === 0 && !showResumeModal) {
    return <div>로딩 중...</div>;
  }

  return (
    <ExamContainer>
      <Header>
        <HeaderTop>
          <ExamTitle>{examType}</ExamTitle>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {isMockExam && (
              <TimerContainer>
                ⏰ 남은 시간: <Timer isWarning={timeLeft <= 600}>{formatTime(timeLeft)}</Timer>
              </TimerContainer>
            )}
            <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
          </div>
        </HeaderTop>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <QuestionNavigation>
          {questions.map((question) => (
            <QuestionNumber
              key={question.id}
              isCurrent={question.id === currentQuestion}
              isAnswered={question.selectedAnswer !== undefined}
              isBookmarked={question.isBookmarked}
              onClick={() => handleQuestionNavigation(question.id)}
            >
              {question.id}
            </QuestionNumber>
          ))}
        </QuestionNavigation>
      </Header>

      <MainContent>
        {currentQuestionData && (
          <QuestionCard>
            <QuestionHeader>
              <QuestionNumberDisplay>문제 {currentQuestionData.id}</QuestionNumberDisplay>
              <div style={{ display: 'flex', gap: '10px' }}>
                <BookmarkButton
                  isBookmarked={currentQuestionData.isBookmarked}
                  onClick={() => handleBookmarkToggle(currentQuestionData.id)}
                >
                  {currentQuestionData.isBookmarked ? '★ 북마크됨' : '☆ 북마크'}
                </BookmarkButton>
                <AnswerButton onClick={handleShowAnswer}>
                  ✅ 정답/해설
                </AnswerButton>
              </div>
            </QuestionHeader>
            
            <QuestionText>{currentQuestionData.question}</QuestionText>
            
            <OptionsContainer>
              {currentQuestionData.options.map((option, index) => (
                <OptionButton
                  key={index}
                  isSelected={currentQuestionData.selectedAnswer === index}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </OptionButton>
              ))}
            </OptionsContainer>

            <NavigationButtons>
              <NavButton 
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 1}
              >
                이전 문제
              </NavButton>
              <NavButton 
                onClick={handleNextQuestion}
                disabled={currentQuestion === 50}
              >
                다음 문제
              </NavButton>
            </NavigationButtons>
          </QuestionCard>
        )}
      </MainContent>

      <ResumeModal isOpen={showResumeModal}>
        <ModalContent>
          <ModalTitle>이어서 응시하시겠습니까?</ModalTitle>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            이전에 진행하던 시험이 있습니다.
            {isMockExam && ' (모의고사는 이어서 응시만 가능합니다)'}
          </p>
          <ModalButton onClick={handleResumeExam}>
            이어서 응시하기
          </ModalButton>
          {!isMockExam && (
            <ModalButton onClick={handleNewExam}>
              새로 시작하기
            </ModalButton>
          )}
        </ModalContent>
      </ResumeModal>

      <AnswerModal isOpen={showAnswer}>
        <AnswerModalContent>
          <AnswerTitle>정답 및 해설</AnswerTitle>
          {currentQuestionData && (
            <>
              <CorrectAnswer>
                <strong>정답: {String.fromCharCode(65 + currentQuestionData.correctAnswer)}번</strong>
              </CorrectAnswer>
              <Explanation>
                <strong>해설:</strong><br />
                {currentQuestionData.explanation}
              </Explanation>
            </>
          )}
          <CloseButton onClick={handleCloseAnswer}>
            닫기
          </CloseButton>
        </AnswerModalContent>
      </AnswerModal>

      <TimeUpModal isOpen={showTimeUpModal}>
        <TimeUpModalContent>
          <TimeUpTitle>⏰ 시험 시간 종료</TimeUpTitle>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            90분 시험 시간이 종료되었습니다.
          </p>
          <TimeUpButton onClick={handleTimeUpConfirm}>
            확인
          </TimeUpButton>
        </TimeUpModalContent>
      </TimeUpModal>

      <BottomNavigation />
    </ExamContainer>
  );
};

export default ExamPage;
