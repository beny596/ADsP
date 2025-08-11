import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

// 향상된 애니메이션 키프레임
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(-1deg); }
  50% { transform: translateY(-12px) rotate(0deg); }
  75% { transform: translateY(-8px) rotate(1deg); }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 105, 180, 0.4)); }
  50% { filter: drop-shadow(0 0 20px rgba(255, 105, 180, 0.8)); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    rgba(255, 240, 245, 0.95) 100%);
  border: 4px solid #FF69B4;
  border-radius: 25px;
  box-shadow: 
    0 15px 0 #FF1493,
    0 30px 0 rgba(0, 0, 0, 0.08),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF69B4, #FF1493, #FF69B4);
    border-radius: 25px;
    z-index: -1;
    opacity: 0.3;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const RabbitImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: contain;
  filter: drop-shadow(0 12px 24px rgba(255, 105, 180, 0.5));
  animation: ${float} 4s ease-in-out infinite, ${glow} 3s ease-in-out infinite;
  border: 4px solid #FF69B4;
  border-radius: 25px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 240, 245, 0.9) 100%);
  padding: 15px;
  box-shadow: 
    0 8px 0 #FF1493,
    0 16px 0 rgba(0, 0, 0, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05) translateY(-5px);
    filter: drop-shadow(0 16px 32px rgba(255, 105, 180, 0.7));
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const TitleLine1 = styled.h1`
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: #FF1493;
  text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.8);
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const TitleLine2 = styled.h1`
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: #8B008B;
  text-shadow: 2px 2px 4px rgba(230, 230, 250, 0.8);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #8B008B;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-top: 8px;
  opacity: 0.9;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 35px;
  flex-wrap: wrap;
  padding: 0 20px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  font-family: 'VT323', monospace;
  font-size: 1.3rem;
  padding: 18px 28px;
  border: 4px solid ${props => props.isActive ? '#FF1493' : '#FF69B4'};
  border-radius: 18px;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #C71585 100%)' 
    : 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)'};
  color: ${props => props.isActive ? '#FFFFFF' : '#8B008B'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-shadow: ${props => props.isActive ? '2px 2px 4px rgba(0,0,0,0.4)' : '2px 2px 4px rgba(255,255,255,0.9)'};
  box-shadow: 
    0 8px 0 ${props => props.isActive ? '#C71585' : '#FF1493'},
    0 16px 0 rgba(0, 0, 0, 0.12),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transform: ${props => props.isActive ? 'translateY(-3px)' : 'translateY(0)'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 12px 0 ${props => props.isActive ? '#C71585' : '#FF1493'},
      0 24px 0 rgba(0, 0, 0, 0.15);
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, #C71585 0%, #FF1493 50%, #FF69B4 100%)' 
      : 'linear-gradient(135deg, #FFC0CB 0%, #FFB6C1 50%, #FFE4E1 100%)'};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 
      0 4px 0 ${props => props.isActive ? '#C71585' : '#FF1493'},
      0 8px 0 rgba(0, 0, 0, 0.12);
  }
`;

const PurchaseButton = styled.button`
  font-family: 'VT323', monospace;
  font-size: 1.3rem;
  padding: 18px 28px;
  border: 4px solid #FFD700;
  border-radius: 18px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
  color: #8B0000;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 8px 0 #FF8C00,
    0 16px 0 rgba(0, 0, 0, 0.12),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 12px 0 #FF8C00,
      0 24px 0 rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #FF8C00 0%, #FFA500 50%, #FFD700 100%);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 
      0 4px 0 #FF8C00,
      0 8px 0 rgba(0, 0, 0, 0.12);
  }
`;

const ContentCard = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 240, 245, 0.95) 100%);
  border: 4px solid #FF69B4;
  border-radius: 25px;
  padding: 35px;
  margin: 25px 0;
  box-shadow: 
    0 15px 0 #FF1493,
    0 30px 0 rgba(0, 0, 0, 0.08),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 1s ease-out;
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF69B4, #FF1493, #FF69B4);
    border-radius: 25px;
    z-index: -1;
    opacity: 0.2;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 20px 0 #FF1493,
      0 40px 0 rgba(0, 0, 0, 0.1);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BookSection = styled.div`
  text-align: center;
`;

const BookTitle = styled.h2`
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 2rem;
  color: #8B008B;
  margin-bottom: 25px;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.4);
  font-weight: 700;
`;

const BookDescription = styled.p`
  font-size: 1.3rem;
  color: #4B0082;
  line-height: 1.7;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.9);
  font-weight: 500;
  opacity: 0.9;
`;

const ScheduleSection = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const ScheduleTitle = styled.h2`
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 2rem;
  color: #8B008B;
  margin-bottom: 25px;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.4);
  font-weight: 700;
`;

const ScheduleItem = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(255, 240, 245, 0.9) 100%);
  border: 3px solid #FF69B4;
  border-radius: 18px;
  padding: 25px;
  margin: 20px 0;
  box-shadow: 
    0 8px 0 #FF1493,
    0 16px 0 rgba(0, 0, 0, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(15px);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FF69B4, #FF1493, #FF69B4);
    border-radius: 18px;
    z-index: -1;
    opacity: 0.15;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 0 #FF1493,
      0 24px 0 rgba(0, 0, 0, 0.12);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(255, 245, 250, 0.95) 100%);
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 9px 0 #FF1493,
      0 18px 0 rgba(0, 0, 0, 0.1);
  }
`;

const ScheduleDate = styled.div`
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 1.1rem;
  color: #FF1493;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  font-weight: 600;
`;

const ScheduleDescription = styled.div`
  font-size: 1.1rem;
  color: #4B0082;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
`;

const CalendarButton = styled.button`
  font-family: 'VT323', monospace;
  font-size: 1rem;
  padding: 12px 20px;
  border: 3px solid #FFD700;
  border-radius: 15px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
  color: #8B0000;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 4px 0 #FF8C00,
    0 8px 0 rgba(0, 0, 0, 0.1);
  margin-top: 15px;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 0 #FF8C00,
      0 12px 0 rgba(0, 0, 0, 0.12);
    background: linear-gradient(135deg, #FF8C00 0%, #FFA500 50%, #FFD700 100%);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 0 #FF8C00,
      0 4px 0 rgba(0, 0, 0, 0.1);
  }
`;

const NotificationMessage = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
  font-family: 'VT323', monospace;
  font-size: 1rem;
  font-weight: 600;
  z-index: 10000;
  transform: ${props => props.show ? 'translateX(0)' : 'translateX(400px)'};
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 3px solid rgba(255, 255, 255, 0.3);
  
  &::before {
    content: '📅';
    margin-right: 10px;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${props => props.isOpen ? 'fadeIn' : 'none'} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 5px solid #FF69B4;
  border-radius: 25px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 
    0 15px 0 #FF1493,
    0 30px 0 rgba(0, 0, 0, 0.2);
  animation: modalBounce 0.5s ease-out;
  
  @keyframes modalBounce {
    0% { transform: scale(0.3) translateY(-100px); }
    50% { transform: scale(1.05) translateY(10px); }
    100% { transform: scale(1) translateY(0); }
  }
`;

const ModalTitle = styled.h2`
  font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 1.5rem;
  color: #8B008B;
  margin-bottom: 25px;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
  font-weight: 700;
`;

const StoreButton = styled.button`
  display: block;
  width: 100%;
  margin: 15px 0;
  font-family: 'VT323', monospace;
  font-size: 1.1rem;
  padding: 15px 20px;
  border: 3px solid #FF69B4;
  border-radius: 12px;
  background: linear-gradient(45deg, #FFB6C1, #FFC0CB);
  color: #8B008B;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 4px 0 #FF1493,
    0 8px 0 rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 0 #FF1493,
      0 12px 0 rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg, #FFC0CB, #FFB6C1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 0 #FF1493,
      0 4px 0 rgba(0, 0, 0, 0.1);
  }
`;

const CloseButton = styled.button`
  font-family: 'VT323', monospace;
  font-size: 1rem;
  padding: 12px 20px;
  border: 3px solid #FF69B4;
  border-radius: 10px;
  background: linear-gradient(45deg, #FFB6C1, #FFC0CB);
  color: #8B008B;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 4px 0 #FF1493,
    0 8px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 0 #FF1493,
      0 12px 0 rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 0 #FF1493,
      0 4px 0 rgba(0, 0, 0, 0.1);
  }
`;

// 다마고치 캐릭터 애니메이션 컴포넌트
const TamagotchiCharacter = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  border: 4px solid #FFB6C1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  animation: pixelBounce 2s ease-in-out infinite;
  box-shadow: 
    0 8px 0 #C71585,
    0 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
  
  &:hover {
    animation: pixelPulse 0.5s ease-in-out infinite;
  }
`;

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'schedule'>('book');
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate();

  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  const handleStoreClick = (store: string) => {
    let url = '';
    switch (store) {
      case 'yes24':
        url = 'https://www.yes24.com/Product/Search?domain=ALL&query=ADsP';
        break;
      case 'kyobo':
        url = 'https://search.kyobobook.co.kr/search?keyword=ADsP';
        break;
      case 'aladin':
        url = 'https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=ADsP';
        break;
      case 'coupang':
        url = 'https://www.coupang.com/np/search?q=ADsP';
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addToCalendar = (examType: string, examDate: string, registrationDate: string) => {
    try {
      // 시험 일정을 캘린더에 추가하는 함수
      const createCalendarEvent = () => {
        const event = {
          title: `ADsP ${examType}`,
          description: `데이터 분석 준전문가 ${examType} 시험\n접수: ${registrationDate}\n시험: ${examDate}`,
          startDate: examDate,
          endDate: examDate,
          location: '전국 시험장',
          url: 'https://www.dataq.or.kr'
        };

        // Google Calendar 링크 생성
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${encodeURIComponent(examDate.replace(/-/g, ''))}/${encodeURIComponent(examDate.replace(/-/g, ''))}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;

        // Apple Calendar 링크 생성 (iOS 기기용)
        const appleCalendarUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${examDate.replace(/-/g, '')}T090000%0ADTEND:${examDate.replace(/-/g, '')}T120000%0ASUMMARY:${event.title}%0ADESCRIPTION:${event.description}%0ALOCATION:${event.location}%0AEND:VEVENT%0AEND:VCALENDAR`;

        // 사용자 기기 확인 및 적절한 링크 제공
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);

        if (isIOS) {
          // iOS에서는 Apple Calendar 링크 사용
          const link = document.createElement('a');
          link.href = appleCalendarUrl;
          link.download = 'exam-schedule.ics';
          link.click();
          
          setNotificationMessage('📱 Apple 캘린더에 시험 일정이 추가되었습니다!');
        } else if (isAndroid) {
          // Android에서는 Google Calendar 링크 사용
          window.open(googleCalendarUrl, '_blank');
          setNotificationMessage('📱 Google 캘린더에 시험 일정이 추가되었습니다!');
        } else {
          // 데스크톱에서는 Google Calendar 링크 사용
          window.open(googleCalendarUrl, '_blank');
          setNotificationMessage('💻 Google 캘린더에 시험 일정이 추가되었습니다!');
        }

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      };

      // 사용자에게 알림 권한 요청
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            createCalendarEvent();
          } else {
            createCalendarEvent(); // 권한이 없어도 캘린더 기능은 작동
          }
        });
      } else {
        createCalendarEvent();
      }

    } catch (error) {
      console.error('캘린더 추가 중 오류 발생:', error);
      setNotificationMessage('❌ 캘린더 추가 중 오류가 발생했습니다.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <RabbitImage
            src="/토끼.png"
            alt="Golden Rabbit"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <TitleContainer>
            <TitleLine1>골든래빗</TitleLine1>
            <TitleLine2>
              <span style={{
                fontSize: '2.2rem',
                fontWeight: '700',
                color: '#FFD700',
                textShadow: '2px 2px 4px rgba(255, 215, 0, 0.5)'
              }}>빠</span>르게{' '}
              <span style={{
                fontSize: '2.2rem',
                fontWeight: '700',
                color: '#FFD700',
                textShadow: '2px 2px 4px rgba(255, 215, 0, 0.5)'
              }}>따</span>는 ADsP
            </TitleLine2>
          </TitleContainer>
        </HeaderContent>
        <Subtitle>데이터 분석 준전문가 자격증 합격을 위한 최고의 학습 도구</Subtitle>
      </Header>

      <TabContainer>
        <TabButton isActive={activeTab === 'book'} onClick={() => setActiveTab('book')}>
          📚 도서 소개
        </TabButton>
        <TabButton isActive={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')}>
          📅 시험 일정
        </TabButton>
        <PurchaseButton onClick={handlePurchaseClick}>
          🛒 도서 구매
        </PurchaseButton>
      </TabContainer>

      <ContentCard>
        {activeTab === 'book' ? (
          <BookSection>
            <BookTitle>🎯 ADsP 완벽 대비 도서</BookTitle>
            <BookDescription>
              데이터 분석 준전문가(ADsP) 자격증 취득을 위한 최고의 학습 도서입니다.
              체계적인 이론 정리와 실전 문제를 통해 확실한 합격을 도와드립니다.
              초보자도 쉽게 이해할 수 있도록 구성되어 있으며, 
              실제 시험과 유사한 문제들로 실전 감각을 기를 수 있습니다.
            </BookDescription>
          </BookSection>
        ) : (
          <ScheduleSection>
            <ScheduleTitle>📅 2024년 ADsP 시험 일정</ScheduleTitle>
            <ScheduleItem>
              <ScheduleDate>🎯 1차 시험</ScheduleDate>
              <ScheduleDescription>
                접수: 2024년 2월 19일 ~ 3월 5일<br />
                시험: 2024년 4월 20일 (토요일)<br />
                결과발표: 2024년 5월 20일
              </ScheduleDescription>
              <CalendarButton onClick={() => addToCalendar('1차', '2024-04-20', '2024-02-19 ~ 2024-03-05')}>
                📅 캘린더에 추가
              </CalendarButton>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleDate>🎯 2차 시험</ScheduleDate>
              <ScheduleDescription>
                접수: 2024년 6월 17일 ~ 7월 3일<br />
                시험: 2024년 8월 17일 (토요일)<br />
                결과발표: 2024년 9월 16일
              </ScheduleDescription>
              <CalendarButton onClick={() => addToCalendar('2차', '2024-08-17', '2024-06-17 ~ 2024-07-03')}>
                📅 캘린더에 추가
              </CalendarButton>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleDate>🎯 3차 시험</ScheduleDate>
              <ScheduleDescription>
                접수: 2024년 10월 14일 ~ 10월 30일<br />
                시험: 2024년 12월 14일 (토요일)<br />
                결과발표: 2025년 1월 13일
              </ScheduleDescription>
              <CalendarButton onClick={() => addToCalendar('3차', '2024-12-14', '2024-10-14 ~ 2024-10-30')}>
                📅 캘린더에 추가
              </CalendarButton>
            </ScheduleItem>
          </ScheduleSection>
        )}
      </ContentCard>

      <Modal isOpen={showModal}>
        <ModalContent>
          <ModalTitle>🛒 도서 구매하기</ModalTitle>
          <p style={{ fontSize: '1.1rem', color: '#4B0082', marginBottom: '25px' }}>
            원하시는 서점을 선택해주세요!
          </p>
          <StoreButton onClick={() => handleStoreClick('yes24')}>
            📚 예스24
          </StoreButton>
          <StoreButton onClick={() => handleStoreClick('kyobo')}>
            📖 교보문고
          </StoreButton>
          <StoreButton onClick={() => handleStoreClick('aladin')}>
            📚 알라딘
          </StoreButton>
          <StoreButton onClick={() => handleStoreClick('coupang')}>
            🛒 쿠팡
          </StoreButton>
          <CloseButton onClick={handleCloseModal}>
            닫기
          </CloseButton>
        </ModalContent>
      </Modal>

      {/* 알림 메시지 */}
      <NotificationMessage show={showNotification}>
        {notificationMessage}
      </NotificationMessage>

      {/* 다마고치 캐릭터 */}
      <TamagotchiCharacter onClick={() => alert('안녕하세요! 저는 당신의 학습 친구 다마고치예요! 🥰')}>
        🐰
      </TamagotchiCharacter>

      <BottomNavigation />
    </Container>
  );
};

export default HomePage;
