import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  animation: fadeIn 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const ExamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const ExamCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeIn 0.6s ease-out;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
`;

const ExamIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  ${ExamCard}:hover & {
    transform: scale(1.1);
  }
`;

const ExamTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ExamInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 12px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const TakeExamButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  padding: 8px 16px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #667eea;
`;

const ProgressIcon = styled.span`
  margin-right: 8px;
  font-size: 1rem;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
`;

const PastExamPage: React.FC = () => {
  const navigate = useNavigate();

  const getExamButtonText = (examNumber: string) => {
    const savedProgress = localStorage.getItem(`exam_progress_기출복원_${examNumber}`);
    return savedProgress ? '이어서 응시하기' : '응시하기';
  };

  const handleTakeExam = (examNumber: string) => {
    const isAuthenticated = localStorage.getItem('bookAuthenticated') === 'true';
    if (!isAuthenticated) {
      alert('도서 인증이 필요합니다. 마이페이지에서 도서 인증을 완료해주세요.');
      navigate('/my-page');
      return;
    }
    navigate(`/exam?type=기출복원&number=${examNumber}`);
  };

  const handleBackToProblemStudy = () => {
    navigate('/problem-study');
  };

  const examData = [
    {
      number: '45회',
      icon: '📊',
      questions: 50,
      time: '90분',
      difficulty: '보통'
    },
    {
      number: '46회',
      icon: '📈',
      questions: 50,
      time: '90분',
      difficulty: '보통'
    },
    {
      number: '47회',
      icon: '📉',
      questions: 50,
      time: '90분',
      difficulty: '보통'
    }
  ];

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBackToProblemStudy}>
          ← 문제학습으로
        </BackButton>
        <Title>📚 기출복원 문제</Title>
        <Subtitle>실제 시험 문제를 복원하여 제공합니다</Subtitle>
      </Header>

      <ExamGrid>
        {examData.map((exam, index) => (
          <ExamCard key={exam.number}>
            <ExamIcon>{exam.icon}</ExamIcon>
            <ExamTitle>{exam.number} 기출문제</ExamTitle>
            
            {localStorage.getItem(`exam_progress_기출복원_${exam.number}`) && (
              <ProgressIndicator>
                <ProgressIcon>⏳</ProgressIcon>
                진행 중
              </ProgressIndicator>
            )}
            
            <ExamInfo>
              <InfoItem>
                <InfoLabel>문제 수</InfoLabel>
                <InfoValue>{exam.questions}문제</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>시간</InfoLabel>
                <InfoValue>{exam.time}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>난이도</InfoLabel>
                <InfoValue>{exam.difficulty}</InfoValue>
              </InfoItem>
            </ExamInfo>
            
            <TakeExamButton onClick={() => handleTakeExam(exam.number)}>
              {getExamButtonText(exam.number)}
            </TakeExamButton>
          </ExamCard>
        ))}
      </ExamGrid>

      <BottomNavigation />
    </Container>
  );
};

export default PastExamPage;
