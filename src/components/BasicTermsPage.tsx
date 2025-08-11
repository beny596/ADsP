import React, { useState, useMemo } from 'react';
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
                radial-gradient(circle at 20% 20%, rgba(230, 230, 250, 0.1) 0%, transparent 50%);
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

const SearchContainer = styled.div`
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
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 20px 25px;
  border: 3px solid rgba(255, 105, 180, 0.3);
  border-radius: 20px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'VT323', monospace;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: #FF69B4;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 4px rgba(255, 105, 180, 0.2);
    transform: scale(1.02);
  }
  
  &::placeholder {
    color: #999;
    font-weight: 400;
  }
`;

const TermsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const TermsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

const TermCard = styled.div<{ isSelected: boolean }>`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 240, 245, 0.95) 50%, 
    rgba(255, 228, 225, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 25px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 20px rgba(255, 105, 180, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.8),
    inset 0 -2px 0 rgba(255, 105, 180, 0.3);
  border: 3px solid ${props => props.isSelected ? '#FF1493' : '#FF69B4'};
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
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 
      0 15px 30px rgba(255, 105, 180, 0.4),
      inset 0 2px 0 rgba(255, 255, 255, 0.9),
      inset 0 -2px 0 rgba(255, 105, 180, 0.4);
    border-color: #FF1493;
    
    &::before {
      opacity: 0.3;
    }
  }
  
  &:nth-child(odd) {
    animation-delay: 0.1s;
  }
  
  &:nth-child(even) {
    animation-delay: 0.2s;
  }
`;

const TermWord = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TermExplanation = styled.p<{ isVisible: boolean }>`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
  margin: 0;
  max-height: ${props => props.isVisible ? '200px' : '0'};
  opacity: ${props => props.isVisible ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  padding: ${props => props.isVisible ? '12px 0' : '0'};
  border-top: ${props => props.isVisible ? '1px solid rgba(102, 126, 234, 0.2)' : 'none'};
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  color: #666;
  font-size: 1.1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const BasicTermsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

  const terms = [
    { word: '가설검정', explanation: '통계적 추론에서 모집단에 대한 가설을 설정하고, 표본 자료를 통해 그 가설의 진위를 판단하는 과정입니다.' },
    { word: '강화학습', explanation: '에이전트가 환경과 상호작용하며 보상을 최대화하는 정책을 학습하는 머신러닝 방법입니다.' },
    { word: '결측값', explanation: '데이터에서 관측되지 않았거나 기록되지 않은 값으로, 데이터 분석 시 특별한 처리가 필요합니다.' },
    { word: '경계값분석', explanation: '입력값의 경계에서 발생할 수 있는 오류를 찾기 위한 테스트 기법입니다.' },
    { word: '계층적군집화', explanation: '데이터를 계층 구조로 군집화하는 방법으로, 트리 형태의 군집 구조를 만듭니다.' },
    { word: '공분산', explanation: '두 변수 간의 선형 관계를 측정하는 통계량으로, 양의 값은 양의 상관관계를 나타냅니다.' },
    { word: '관리도', explanation: '프로세스의 품질을 모니터링하고 이상을 감지하기 위한 통계적 도구입니다.' },
    { word: '교차검증', explanation: '모델의 성능을 평가하기 위해 데이터를 여러 번 나누어 검증하는 방법입니다.' },
    { word: '구간추정', explanation: '모집단의 모수를 구간으로 추정하는 통계적 방법입니다.' },
    { word: '군집분석', explanation: '유사한 특성을 가진 객체들을 그룹으로 분류하는 비지도학습 방법입니다.' },
    { word: '기대값', explanation: '확률변수가 취할 수 있는 값들의 평균으로, 확률분포의 중심을 나타냅니다.' },
    { word: '기술통계', explanation: '데이터의 특성을 요약하고 설명하는 통계적 방법입니다.' },
    { word: '기준화', explanation: '데이터를 특정 범위로 변환하여 비교 가능하게 만드는 과정입니다.' },
    { word: '나이브베이즈', explanation: '베이즈 정리를 기반으로 한 분류 알고리즘으로, 독립성 가정을 사용합니다.' },
    { word: '내적일관성', explanation: '측정 도구의 문항들이 동일한 개념을 측정하는 정도를 나타내는 신뢰도 지표입니다.' },
    { word: '노이즈', explanation: '데이터에서 의미 있는 정보가 아닌 무작위적인 변동이나 오차를 의미합니다.' },
    { word: '다중공선성', explanation: '회귀분석에서 독립변수들 간에 높은 상관관계가 존재하는 현상입니다.' },
    { word: '다중회귀분석', explanation: '여러 개의 독립변수를 사용하여 종속변수를 예측하는 통계적 방법입니다.' },
    { word: '단순회귀분석', explanation: '하나의 독립변수를 사용하여 종속변수를 예측하는 통계적 방법입니다.' },
    { word: '대응표본검정', explanation: '동일한 대상에 대해 두 번 측정한 자료를 비교하는 통계적 검정 방법입니다.' },
    { word: '데이터마이닝', explanation: '대용량 데이터에서 의미 있는 패턴이나 규칙을 발견하는 과정입니다.' },
    { word: '데이터웨어하우스', explanation: '의사결정 지원을 위해 통합되고 정리된 데이터 저장소입니다.' },
    { word: '독립표본검정', explanation: '서로 다른 두 집단의 평균을 비교하는 통계적 검정 방법입니다.' },
    { word: '동적프로그래밍', explanation: '복잡한 문제를 작은 하위 문제로 나누어 해결하는 알고리즘 설계 기법입니다.' },
    { word: '로지스틱회귀', explanation: '종속변수가 범주형일 때 사용하는 회귀분석 방법입니다.' },
    { word: '로버스트통계', explanation: '이상치에 민감하지 않은 통계적 방법들입니다.' },
    { word: '리샘플링', explanation: '기존 데이터에서 반복적으로 표본을 추출하여 통계적 추론을 수행하는 방법입니다.' },
    { word: '머신러닝', explanation: '데이터로부터 패턴을 학습하여 예측이나 분류를 수행하는 인공지능 기법입니다.' },
    { word: '모델평가', explanation: '학습된 모델의 성능을 다양한 지표로 평가하는 과정입니다.' },
    { word: '모집단', explanation: '연구의 대상이 되는 전체 집단을 의미합니다.' },
    { word: '무작위화', explanation: '실험에서 처치를 무작위로 배정하여 편향을 제거하는 방법입니다.' },
    { word: '문자형데이터', explanation: '텍스트 형태로 저장되는 데이터 유형입니다.' },
    { word: '범주형데이터', explanation: '정해진 카테고리로 분류되는 데이터 유형입니다.' },
    { word: '변동계수', explanation: '표준편차를 평균으로 나눈 값으로, 상대적 변동을 측정합니다.' },
    { word: '변수선택', explanation: '모델에 포함할 변수들을 선택하는 과정입니다.' },
    { word: '보간법', explanation: '결측값을 주변 값들을 이용하여 추정하는 방법입니다.' },
    { word: '복원추출', explanation: '표본을 추출한 후 다시 모집단에 포함시켜 추출하는 방법입니다.' },
    { word: '분산', explanation: '데이터의 변동 정도를 측정하는 통계량입니다.' },
    { word: '분산분석', explanation: '여러 집단의 평균을 동시에 비교하는 통계적 방법입니다.' },
    { word: '분위수', explanation: '데이터를 크기 순으로 나열했을 때 특정 위치의 값을 의미합니다.' },
    { word: '불균형데이터', explanation: '클래스 간의 샘플 수가 크게 차이나는 데이터를 의미합니다.' },
    { word: '비모수검정', explanation: '모집단의 분포에 대한 가정이 없는 통계적 검정 방법입니다.' },
    { word: '비지도학습', explanation: '정답 레이블 없이 데이터의 패턴을 찾는 머신러닝 방법입니다.' },
    { word: '사분위수', explanation: '데이터를 4등분한 위치의 값들로, Q1, Q2, Q3로 표시됩니다.' },
    { word: '상관계수', explanation: '두 변수 간의 선형 관계의 강도와 방향을 측정하는 지표입니다.' },
    { word: '상관분석', explanation: '변수들 간의 관계를 분석하는 통계적 방법입니다.' },
    { word: '선형회귀', explanation: '독립변수와 종속변수 간의 선형 관계를 모델링하는 방법입니다.' },
    { word: '설명변수', explanation: '종속변수를 설명하거나 예측하는 데 사용되는 변수입니다.' },
    { word: '성능지표', explanation: '모델의 성능을 평가하는 다양한 측정 지표들입니다.' },
    { word: '수치형데이터', explanation: '계산이 가능한 숫자 형태의 데이터입니다.' },
    { word: '순위상관', explanation: '순위를 이용하여 두 변수 간의 관계를 측정하는 방법입니다.' },
    { word: '시계열분석', explanation: '시간에 따른 데이터의 변화를 분석하는 통계적 방법입니다.' },
    { word: '신뢰구간', explanation: '모집단의 모수가 포함될 가능성이 높은 구간을 의미합니다.' },
    { word: '신뢰도', explanation: '측정 도구가 일관되게 측정하는 정도를 나타내는 지표입니다.' },
    { word: '실험설계', explanation: '실험을 체계적으로 계획하고 수행하는 방법입니다.' },
    { word: '앙상블', explanation: '여러 모델의 예측을 결합하여 성능을 향상시키는 방법입니다.' },
    { word: '이상치', explanation: '다른 데이터와 크게 다른 값을 가진 관측치입니다.' },
    { word: '이진분류', explanation: '두 개의 클래스로 분류하는 문제를 의미합니다.' },
    { word: '인과관계', explanation: '한 변수의 변화가 다른 변수의 변화를 일으키는 관계입니다.' },
    { word: '인공신경망', explanation: '뇌의 신경세포를 모방한 머신러닝 모델입니다.' },
    { word: '자연어처리', explanation: '컴퓨터가 인간의 언어를 이해하고 처리하는 기술입니다.' },
    { word: '정규분포', explanation: '가장 일반적인 연속확률분포로, 종 모양의 대칭 분포입니다.' },
    { word: '정규화', explanation: '데이터를 특정 범위로 변환하는 전처리 과정입니다.' },
    { word: '정확도', explanation: '모델이 올바르게 분류한 비율을 의미합니다.' },
    { word: '제1종오류', explanation: '귀무가설이 참인데 기각하는 오류를 의미합니다.' },
    { word: '제2종오류', explanation: '대립가설이 참인데 귀무가설을 채택하는 오류를 의미합니다.' },
    { word: '조건부확률', explanation: '어떤 사건이 발생한 조건 하에서 다른 사건이 발생할 확률입니다.' },
    { word: '종속변수', explanation: '다른 변수에 의해 영향을 받는 변수입니다.' },
    { word: '주성분분석', explanation: '고차원 데이터를 저차원으로 축소하는 차원 축소 기법입니다.' },
    { word: '지도학습', explanation: '정답 레이블이 있는 데이터로 모델을 학습시키는 방법입니다.' },
    { word: '지지도', explanation: '연관규칙에서 전체 거래 중 해당 규칙을 포함하는 거래의 비율입니다.' },
    { word: '집단화', explanation: '유사한 특성을 가진 데이터를 그룹으로 나누는 과정입니다.' },
    { word: '차원축소', explanation: '고차원 데이터를 저차원으로 변환하는 기법입니다.' },
    { word: '카이제곱검정', explanation: '범주형 데이터의 독립성을 검정하는 비모수 검정 방법입니다.' },
    { word: '컨퍼런스', explanation: '연관규칙에서 조건부 확률을 의미하는 지표입니다.' },
    { word: '클러스터링', explanation: '유사한 특성을 가진 데이터를 그룹으로 분류하는 방법입니다.' },
    { word: '통계적검정', explanation: '모집단에 대한 가설을 표본 자료로 검증하는 과정입니다.' },
    { word: '편향', explanation: '모델의 예측값과 실제값의 평균적인 차이를 의미합니다.' },
    { word: '표본', explanation: '모집단에서 추출된 일부 데이터를 의미합니다.' },
    { word: '표본오차', explanation: '표본을 사용함으로써 발생하는 오차를 의미합니다.' },
    { word: '표준편차', explanation: '데이터의 변동 정도를 측정하는 통계량입니다.' },
    { word: '표준화', explanation: '데이터를 평균 0, 표준편차 1로 변환하는 과정입니다.' },
    { word: '피벗테이블', explanation: '데이터를 요약하고 분석하기 위한 표 형태의 도구입니다.' },
    { word: '하이퍼파라미터', explanation: '모델 학습 전에 설정해야 하는 매개변수들입니다.' },
    { word: '확률분포', explanation: '확률변수가 취할 수 있는 값들과 그 확률을 나타내는 함수입니다.' },
    { word: '확률표본', explanation: '모집단에서 무작위로 추출된 표본을 의미합니다.' },
    { word: '회귀분석', explanation: '변수들 간의 관계를 분석하고 예측하는 통계적 방법입니다.' },
    { word: '효과크기', explanation: '통계적 검정에서 실질적인 의미의 크기를 측정하는 지표입니다.' }
  ];

  const filteredTerms = useMemo(() => {
    return terms
      .filter(term => 
        term.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.explanation.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.word.localeCompare(b.word, 'ko'));
  }, [searchTerm]);

  const handleTermClick = (index: number) => {
    setSelectedTerm(selectedTerm === index ? null : index);
  };

  return (
    <Container>
      <Header>
        <Title>📚 기초 용어</Title>
        <Subtitle>ADsP 관련 핵심 용어 100개를 학습해보세요</Subtitle>
      </Header>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="🔍 용어를 검색해보세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <TermsContainer>
        {filteredTerms.length > 0 ? (
          <TermsGrid>
            {filteredTerms.map((term, index) => (
              <TermCard
                key={index}
                isSelected={selectedTerm === index}
                onClick={() => handleTermClick(index)}
              >
                <TermWord>{term.word}</TermWord>
                <TermExplanation isVisible={selectedTerm === index}>
                  {term.explanation}
                </TermExplanation>
              </TermCard>
            ))}
          </TermsGrid>
        ) : (
          <NoResults>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <div>검색 결과가 없습니다.</div>
            <div style={{ fontSize: '0.9rem', marginTop: '8px', opacity: 0.7 }}>
              다른 검색어를 입력해보세요.
            </div>
          </NoResults>
        )}
      </TermsContainer>

      <BottomNavigation />
    </Container>
  );
};

export default BasicTermsPage;
