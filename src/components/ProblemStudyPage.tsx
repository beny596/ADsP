import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  margin: 0;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  font-weight: 600;
  opacity: 0.9;
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const MenuCard = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 240, 245, 0.95) 50%, 
    rgba(255, 228, 225, 0.95) 100%);
  border: 4px solid #FF69B4;
  border-radius: 25px;
  padding: 35px;
  text-align: center;
  box-shadow: 
    0 15px 35px rgba(255, 105, 180, 0.3),
    0 8px 16px rgba(255, 20, 147, 0.2),
    inset 0 2px 0 rgba(255, 255, 255, 0.8),
    inset 0 -2px 0 rgba(255, 105, 180, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: fadeIn 0.8s ease-out;
  backdrop-filter: blur(20px);
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 
      0 25px 50px rgba(255, 105, 180, 0.4),
      0 15px 30px rgba(255, 20, 147, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.9),
      inset 0 -2px 0 rgba(255, 105, 180, 0.4);
    border-color: #FF1493;
  }
  
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
  
  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
`;

const MenuIcon = styled.div`
  font-size: 4.5rem;
  margin-bottom: 25px;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 8px 16px rgba(255, 105, 180, 0.4));
`;

const MenuTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8B008B;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.6);
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MenuDescription = styled.p`
  font-size: 1.2rem;
  color: #4B0082;
  line-height: 1.6;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  font-weight: 500;
  opacity: 0.9;
`;

const MenuButton = styled.button`
  font-family: 'VT323', monospace;
  font-size: 1.1rem;
  padding: 15px 30px;
  border: 3px solid #FF69B4;
  border-radius: 15px;
  background: linear-gradient(45deg, #FFB6C1, #FFC0CB);
  color: #8B008B;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 6px 0 #FF1493,
    0 12px 0 rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 9px 0 #FF1493,
      0 18px 0 rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg, #FFC0CB, #FFB6C1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 3px 0 #FF1493,
      0 6px 0 rgba(0, 0, 0, 0.1);
  }
`;

const StatsContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 4px solid #FFD700;
  border-radius: 20px;
  padding: 25px;
  margin-top: 30px;
  box-shadow: 
    0 10px 0 #FFA500,
    0 20px 0 rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;
`;

const StatsTitle = styled.h2`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.5rem;
  color: #8B0000;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(255, 215, 0, 0.3);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.8);
  border: 3px solid #FFD700;
  border-radius: 15px;
  box-shadow: 
    0 4px 0 #FFA500,
    0 8px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 7px 0 #FFA500,
      0 14px 0 rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 1.8rem;
  color: #FF8C00;
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #8B0000;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
`;

const ProblemStudyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Header>
        <Title>📚 문제 학습</Title>
        <Subtitle>ADsP 자격증 합격을 위한 체계적인 문제 학습</Subtitle>
      </Header>

      <MenuContainer>
        <MenuCard onClick={() => handleMenuClick('/past-exam')}>
          <MenuIcon>📖</MenuIcon>
          <MenuTitle>기출복원 문제</MenuTitle>
          <MenuDescription>
            실제 시험과 유사한 기출문제를 풀어보며 실전 감각을 기릅니다.
            과거 출제된 문제들을 분석하여 핵심 포인트를 파악할 수 있습니다.
          </MenuDescription>
          <MenuButton>응시하기</MenuButton>
        </MenuCard>

        <MenuCard onClick={() => handleMenuClick('/mock-exam')}>
          <MenuIcon>📝</MenuIcon>
          <MenuTitle>모의고사</MenuTitle>
          <MenuDescription>
            실제 시험과 동일한 환경에서 모의고사를 풀어봅니다.
            90분 타이머와 함께 실전 연습을 통해 자신의 실력을 점검하세요.
          </MenuDescription>
          <MenuButton>응시하기</MenuButton>
        </MenuCard>
      </MenuContainer>

      <StatsContainer>
        <StatsTitle>🎯 학습 통계</StatsTitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>85%</StatNumber>
            <StatLabel>평균 정답률</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>12</StatNumber>
            <StatLabel>완료한 시험</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>3</StatNumber>
            <StatLabel>북마크된 문제</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>2.5h</StatNumber>
            <StatLabel>평균 학습시간</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsContainer>

      <BottomNavigation />
    </Container>
  );
};

export default ProblemStudyPage;
