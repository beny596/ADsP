import React from 'react';
import styled from 'styled-components';
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

const SubjectContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SubjectCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.6s ease-out;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
`;

const SubjectTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
`;

const ChapterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const ChapterButton = styled.button`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  text-align: left;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ChapterNumber = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 4px;
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
