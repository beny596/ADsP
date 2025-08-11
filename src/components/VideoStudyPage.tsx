import React from 'react';
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

const SubjectContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const SubjectCard = styled.div`
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

const SubjectTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 25px;
  padding: 20px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: pulse 2s ease-in-out infinite;
`;

const ChapterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ChapterButton = styled.button`
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
  text-align: left;
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
`;

const ChapterNumber = styled.div`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
`;

const ChapterTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const VideoStudyPage: React.FC = () => {
  const subjects = [
    {
      title: '[1과목] 데이터 이해',
      chapters: [
        { title: '1장: 데이터의 이해', url: 'https://www.youtube.com/results?search_query=ADsP+데이터의+이해' },
        { title: '2장: 데이터베이스와 저장 구조', url: 'https://www.youtube.com/results?search_query=ADsP+데이터베이스+저장+구조' },
        { title: '3장: 데이터 거버넌스 및 가치', url: 'https://www.youtube.com/results?search_query=ADsP+데이터+거버넌스+가치' }
      ]
    },
    {
      title: '[2과목] 데이터 분석 기획',
      chapters: [
        { title: '1장: 분석 기획 개요와 절차', url: 'https://www.youtube.com/results?search_query=ADsP+분석+기획+개요+절차' },
        { title: '2장: 데이터 분석 프로젝트 관리', url: 'https://www.youtube.com/results?search_query=ADsP+데이터+분석+프로젝트+관리' },
        { title: '3장: 데이터 활용 전략과 윤리', url: 'https://www.youtube.com/results?search_query=ADsP+데이터+활용+전략+윤리' }
      ]
    },
    {
      title: '[3과목] 데이터 분석',
      chapters: [
        { title: '1장: R 기초와 데이터 처리', url: 'https://www.youtube.com/results?search_query=ADsP+R+기초+데이터+처리' },
        { title: '2장: 통계 분석 기초', url: 'https://www.youtube.com/results?search_query=ADsP+통계+분석+기초' },
        { title: '3장: 추론 통계 및 회귀', url: 'https://www.youtube.com/results?search_query=ADsP+추론+통계+회귀' },
        { title: '4장: 다변량/시계열 분석', url: 'https://www.youtube.com/results?search_query=ADsP+다변량+시계열+분석' },
        { title: '5장: 데이터 마이닝 기초', url: 'https://www.youtube.com/results?search_query=ADsP+데이터+마이닝+기초' }
      ]
    }
  ];

  const handleChapterClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Header>
        <Title>🎥 동영상 학습</Title>
        <Subtitle>각 과목별 핵심 내용을 동영상으로 학습해보세요</Subtitle>
      </Header>

      <SubjectContainer>
        {subjects.map((subject, subjectIndex) => (
          <SubjectCard key={subjectIndex}>
            <SubjectTitle>{subject.title}</SubjectTitle>
            <ChapterGrid>
              {subject.chapters.map((chapter, chapterIndex) => (
                <ChapterButton
                  key={chapterIndex}
                  onClick={() => handleChapterClick(chapter.url)}
                >
                  <ChapterNumber>📚 {chapter.title.split(':')[0]}</ChapterNumber>
                  <ChapterTitle>{chapter.title.split(':')[1]}</ChapterTitle>
                </ChapterButton>
              ))}
            </ChapterGrid>
          </SubjectCard>
        ))}
      </SubjectContainer>

      <BottomNavigation />
    </Container>
  );
};

export default VideoStudyPage;
