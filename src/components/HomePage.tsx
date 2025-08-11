import React, { useState } from 'react';
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
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const RabbitImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const TitleContainer = styled.div`
  text-align: left;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TitleLine1 = styled(Title)`
  font-size: 2.5rem;
  margin-bottom: 5px;
`;

const TitleLine2 = styled(Title)`
  font-size: 1.8rem;
  opacity: 0.9;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-top: 10px;
`;

const TabContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 8px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  gap: 8px;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 24px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'transparent'};
  color: ${props => props.active ? '#fff' : '#666'};
  box-shadow: ${props => props.active 
    ? '0 4px 15px rgba(102, 126, 234, 0.3)' 
    : 'none'};
  
  &:hover {
    transform: ${props => props.active ? 'translateY(-2px)' : 'translateY(-1px)'};
    box-shadow: ${props => props.active 
      ? '0 6px 20px rgba(102, 126, 234, 0.4)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  }
`;

const PurchaseButton = styled.button`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
  }
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.6s ease-out;
`;

const BookSection = styled.div`
  text-align: center;
`;

const BookTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BookDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;
`;

const ScheduleSection = styled.div``;

const ScheduleTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ScheduleItem = styled.div`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
  }
`;

const ScheduleDate = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const ScheduleDescription = styled.div`
  font-size: 1rem;
  opacity: 0.9;
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
  max-width: 400px;
  width: 90%;
  text-align: center;
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
`;

const StoreButton = styled.button`
  width: 100%;
  padding: 16px;
  margin: 8px 0;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:nth-child(2) {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
    
    &:hover {
      box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
    }
  }
  
  &:nth-child(3) {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
    
    &:hover {
      box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
    }
  }
  
  &:nth-child(4) {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    box-shadow: 0 4px 15px rgba(250, 112, 154, 0.3);
    
    &:hover {
      box-shadow: 0 6px 20px rgba(250, 112, 154, 0.4);
    }
  }
`;

const CloseButton = styled.button`
  background: #f8f9fa;
  color: #666;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #e9ecef;
    transform: translateY(-1px);
  }
`;

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'schedule'>('book');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handlePurchaseClick = () => {
    setShowPurchaseModal(true);
  };

  const handleStoreClick = (store: string) => {
    const urls = {
      'yes24': 'https://www.yes24.com/Product/Goods/123456789',
      'kyobo': 'https://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=123456789',
      'aladin': 'https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=123456789',
      'coupang': 'https://www.coupang.com/vp/products/123456789'
    };
    
    window.open(urls[store as keyof typeof urls], '_blank');
    setShowPurchaseModal(false);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <RabbitImage 
            src="/토끼.png" 
            alt="Golden Rabbit" 
            onError={(e) => {
              // 이미지가 없을 경우 이모지로 대체
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <TitleContainer>
            <TitleLine1>골든래빗</TitleLine1>
            <TitleLine2>
              <span style={{ 
                fontSize: '2.2rem', 
                fontWeight: '900',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
              }}>빠</span>르게{' '}
              <span style={{ 
                fontSize: '2.2rem', 
                fontWeight: '900',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
              }}>따</span>는 ADsP
            </TitleLine2>
          </TitleContainer>
        </HeaderContent>
        <Subtitle>데이터 분석 준전문가 자격증 합격을 위한 최고의 학습 도구</Subtitle>
      </Header>

      <TabContainer>
        <TabButton 
          active={activeTab === 'book'} 
          onClick={() => setActiveTab('book')}
        >
          📖 도서 소개
        </TabButton>
        <TabButton 
          active={activeTab === 'schedule'} 
          onClick={() => setActiveTab('schedule')}
        >
          📅 시험 일정
        </TabButton>
        <PurchaseButton onClick={handlePurchaseClick}>
          🛒 도서 구매
        </PurchaseButton>
      </TabContainer>

      {activeTab === 'book' && (
        <ContentCard>
          <BookSection>
            <BookTitle>🎯 ADsP 완벽 대비 교재</BookTitle>
            <BookDescription>
              데이터 분석 준전문가(ADsP) 자격증 시험을 위한 최신 교재입니다. 
              체계적인 학습 커리큘럼과 실전 문제를 통해 합격을 보장합니다.
              <br /><br />
              📊 3개 과목 완벽 커버<br />
              📝 기출문제 + 모의고사<br />
              💡 상세한 해설과 팁<br />
              🎯 합격률 90% 이상
            </BookDescription>
          </BookSection>
        </ContentCard>
      )}

      {activeTab === 'schedule' && (
        <ContentCard>
          <ScheduleSection>
            <ScheduleTitle>📅 2024년 ADsP 시험 일정</ScheduleTitle>
            <ScheduleItem>
              <ScheduleDate>🎯 1차 시험</ScheduleDate>
              <ScheduleDescription>2024년 3월 23일 (토)</ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleDate>🎯 2차 시험</ScheduleDate>
              <ScheduleDescription>2024년 6월 22일 (토)</ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleDate>🎯 3차 시험</ScheduleDate>
              <ScheduleDescription>2024년 9월 21일 (토)</ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleDate>🎯 4차 시험</ScheduleDate>
              <ScheduleDescription>2024년 12월 21일 (토)</ScheduleDescription>
            </ScheduleItem>
          </ScheduleSection>
        </ContentCard>
      )}

      {showPurchaseModal && (
        <Modal onClick={() => setShowPurchaseModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>🛒 도서 구매</ModalTitle>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              원하시는 온라인 서점을 선택해주세요
            </p>
            <StoreButton onClick={() => handleStoreClick('yes24')}>
              📚 예스24
            </StoreButton>
            <StoreButton onClick={() => handleStoreClick('kyobo')}>
              📖 교보문고
            </StoreButton>
            <StoreButton onClick={() => handleStoreClick('aladin')}>
              🏰 알라딘
            </StoreButton>
            <StoreButton onClick={() => handleStoreClick('coupang')}>
              🛍️ 쿠팡
            </StoreButton>
            <CloseButton onClick={() => setShowPurchaseModal(false)}>
              취소
            </CloseButton>
          </ModalContent>
        </Modal>
      )}

      <BottomNavigation />
    </Container>
  );
};

export default HomePage;
