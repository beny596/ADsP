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

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const MenuCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: fadeIn 0.6s ease-out;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
  
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
`;

const MenuIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  ${MenuCard}:hover & {
    transform: scale(1.1);
  }
`;

const MenuTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MenuDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const MenuButton = styled.button`
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StatsContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  margin-top: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.8s ease-out;
  animation-delay: 0.3s;
`;

const StatsTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 16px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
  }
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 600;
`;

const ProblemStudyPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePastExamClick = () => {
    navigate('/past-exam');
  };

  const handleMockExamClick = () => {
    navigate('/mock-exam');
  };

  return (
    <Container>
      <Header>
        <Title>📝 문제 학습</Title>
        <Subtitle>기출문제와 모의고사로 실전 감각을 키워보세요</Subtitle>
      </Header>

      <MenuContainer>
        <MenuCard onClick={handlePastExamClick}>
          <MenuIcon>📚</MenuIcon>
          <MenuTitle>기출복원 문제</MenuTitle>
          <MenuDescription>
            실제 시험에 출제된 기출문제들을 
            복원하여 제공합니다. 
            시험의 난이도와 출제 경향을 
            파악할 수 있어요.
          </MenuDescription>
          <MenuButton onClick={handlePastExamClick}>
            기출문제 풀기
          </MenuButton>
        </MenuCard>

        <MenuCard onClick={handleMockExamClick}>
          <MenuIcon>🎯</MenuIcon>
          <MenuTitle>모의고사</MenuTitle>
          <MenuDescription>
            실제 시험과 동일한 환경에서 
            연습할 수 있는 모의고사입니다. 
            90분 타이머와 함께 실전 감각을 
            키워보세요.
          </MenuDescription>
          <MenuButton onClick={handleMockExamClick}>
            모의고사 응시
          </MenuButton>
        </MenuCard>
      </MenuContainer>

      <StatsContainer>
        <StatsTitle>📊 학습 통계</StatsTitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>45회</StatNumber>
            <StatLabel>기출문제</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>3회</StatNumber>
            <StatLabel>모의고사</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>50문제</StatNumber>
            <StatLabel>문제 수</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>90분</StatNumber>
            <StatLabel>시험 시간</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsContainer>

      <BottomNavigation />
    </Container>
  );
};

export default ProblemStudyPage;
