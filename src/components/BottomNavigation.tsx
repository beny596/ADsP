import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 20px;
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavigationList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
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
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'transparent'};
  color: ${props => props.isActive ? '#fff' : '#666'};
  border: none;
  border-radius: 16px;
  padding: 12px 8px;
  min-width: 60px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.isActive 
    ? '0 4px 15px rgba(102, 126, 234, 0.3)' 
    : 'none'};
  
  &:hover {
    transform: ${props => props.isActive ? 'translateY(-3px)' : 'translateY(-2px)'};
    box-shadow: ${props => props.isActive 
      ? '0 6px 20px rgba(102, 126, 234, 0.4)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)'};
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      : 'rgba(102, 126, 234, 0.1)'};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Icon = styled.span`
  font-size: 1.5rem;
  margin-bottom: 4px;
  display: block;
  transition: all 0.3s ease;
  
  ${NavigationButton}:hover & {
    transform: scale(1.1);
  }
`;

const Label = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
`;

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: '홈', icon: '🏠' },
    { path: '/problem-study', label: '문제학습', icon: '📝' },
    { path: '/video-study', label: '동영상학습', icon: '🎥' },
    { path: '/basic-terms', label: '기초용어', icon: '📚' },
    { path: '/my-page', label: 'MyPage', icon: '👤' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationContainer>
      <NavigationList>
        {navigationItems.map((item) => (
          <NavigationItem key={item.path}>
            <NavigationButton
              isActive={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon>{item.icon}</Icon>
              <Label>{item.label}</Label>
            </NavigationButton>
          </NavigationItem>
        ))}
      </NavigationList>
    </NavigationContainer>
  );
};

export default BottomNavigation;
