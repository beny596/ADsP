import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// 향상된 애니메이션 키프레임
const pixelBounce = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

// 개선된 다마고치 스타일 네비게이션
const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 100px;
  background: linear-gradient(135deg, 
    rgba(255, 105, 180, 0.98) 0%, 
    rgba(255, 20, 147, 0.98) 25%, 
    rgba(255, 182, 193, 0.98) 50%, 
    rgba(255, 192, 203, 0.98) 75%, 
    rgba(255, 228, 225, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-top: 3px solid rgba(255, 105, 180, 0.9);
  padding: 12px 20px 18px;
  box-shadow: 
    0 -8px 32px rgba(255, 105, 180, 0.4),
    0 -4px 16px rgba(255, 20, 147, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'VT323', monospace;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.9) 50%, 
      transparent 100%);
    animation: shimmer 3s ease-in-out infinite;
  }
`;

const NavigationList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 12px;
`;

const NavigationItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavigationButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 85px;
  padding: 12px 10px 16px;
  border: 3px solid ${props => props.isActive ? '#FF1493' : '#FF69B4'};
  border-radius: 22px;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #C71585 100%)' 
    : 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)'};
  color: ${props => props.isActive ? '#FFFFFF' : '#8B008B'};
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  font-family: 'VT323', monospace;
  box-shadow: 
    0 6px 0 ${props => props.isActive ? '#C71585' : '#FF1493'},
    0 12px 0 rgba(0, 0, 0, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transform: ${props => props.isActive ? 'translateY(-3px)' : 'translateY(0)'};
  position: relative;
  overflow: visible;
  
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
    transform: translateY(-5px);
    box-shadow: 
      0 8px 0 ${props => props.isActive ? '#C71585' : '#FF1493'},
      0 16px 0 rgba(0, 0, 0, 0.12);
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
      0 3px 0 ${props => props.isActive ? '#C71585' : '#FF1493'},
      0 6px 0 rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.span`
  font-size: 1.6rem;
  margin-bottom: 6px;
  display: block;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  
  ${NavigationButton}:hover & {
    animation: ${pixelBounce} 0.6s ease-in-out;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
`;

const Label = styled.span<{ isActive: boolean }>`
  font-size: 0.9rem;
  font-weight: 600;
  text-shadow: ${props => props.isActive ? '1px 1px 3px rgba(0,0,0,0.4)' : '1px 1px 3px rgba(255,255,255,0.9)'};
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: visible;
  
  ${NavigationButton}:hover & {
    transform: scale(1.08);
    text-shadow: ${props => props.isActive ? '2px 2px 4px rgba(0,0,0,0.5)' : '2px 2px 4px rgba(255,255,255,1)'};
  }
`;

const navigationItems = [
  { path: '/', label: '홈', icon: '🏠' },
  { path: '/problem-study', label: '문제학습', icon: '📝' },
  { path: '/video-study', label: '동영상학습', icon: '🎥' },
  { path: '/basic-terms', label: '기초용어', icon: '📚' },
  { path: '/my-page', label: 'MyPage', icon: '👤' }
];

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationContainer>
      <NavigationList>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavigationItem key={item.path}>
              <NavigationButton
                isActive={isActive}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon>{item.icon}</Icon>
                <Label isActive={isActive}>{item.label}</Label>
              </NavigationButton>
            </NavigationItem>
          );
        })}
      </NavigationList>
    </NavigationContainer>
  );
};

export default BottomNavigation;
