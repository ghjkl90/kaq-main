'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function ResearchPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeId, setActiveId] = useState(1);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const sectionRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  const aiModes = [
    {
      id: 'senior',
      title: '시니어 모드',
      desc: '어렵지 않아요. 정겨운 AI가 당신의 이야기를 기다립니다.',
      link: 'https://kai-station.com/senior?from=%2Fhome',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'kids',
      title: '어린이 모드',
      desc: '호기심 가득! AI 친구와 함께 상상력을 키워보세요.',
      link: 'https://kai-station.com/kids?from=%2Fhome',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'doran',
      title: '도란도란 모드',
      desc: '도란도란 이야기를 나눠보세요. 따뜻하게 들어주는 AI 친구가 기다립니다.',
      link: 'https://doran-two.vercel.app/',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'ncs',
      title: 'NCS 모드',
      desc: '역량 중심의 직무 표준 맞춤형 가이드를 직관적으로 탐색합니다.',
      link: 'https://kai-station.com/categories/cmq3j1xfy003quvv6j86nh8lb?from=%2Fhome',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'dsq',
      title: 'DSQ 모드',
      desc: '안전품질 및 디지털 매니지먼트 역량을 과학적으로 측정하고 검증합니다.',
      link: 'http://openq.co.kr:8082/',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const researches = [
    {
      id: 1,
      title: '고객맞춤형 AI 프롬프트',
      desc: '고객이 필요한 AI 프롬프트를 제공합니다. 대중모델, 자체모델, 개별모델을 만들어 AI 기술의 사유화를 연구합니다.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      details: [
        '세심하게 설계된 프롬프트 주권: 대형 언어 모델(LLM)의 단순 활용을 넘어, 기업 및 개인 고유의 비즈니스 도메인 지식을 프롬프트 엔지니어링 기술로 자산화하여 독보적인 가치 모델을 창출합니다.',
        '기술의 사유화 및 보안 극대화: 자체 프롬프트 저작권 보호 솔루션을 도입하여, 민감한 비즈니스 노하우가 외부 공유 모델에 노출되지 않도록 최적의 온프레미스/사설 인프라 환경 기술을 연구합니다.'
      ]
    },
    {
      id: 2,
      title: '공간안전품질 대시보드',
      desc: '인간은 시간이 필요할 때 시계를 만들었습니다. 그럼에도 불구하고, 공간 안전이 중요한 현재 시점에 공간의 안전시계 (대시보드)가 없습니다. 공간안전품질의 대시보드 표준화를 연구합니다.',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      details: [
        '공간의 안전시계 표준 수립: 시간의 흐름을 초침으로 나타내듯, 복잡한 공간 품질과 위협 요소를 직관적인 실시간 수치로 계량화하여 누구나 쉽게 인지 가능한 안전 표준 인터페이스를 개발합니다.',
        '예방 중심의 직관적 시각화: 스마트 환경에 부합하는 정밀 대시보드 관제를 설계하여 잠재적 사고 요인을 사전에 모니터링하고 가시화함으로써 일상의 안전 문화를 정립해 갑니다.'
      ]
    },
    {
      id: 3,
      title: '디지털트윈 개발 및 구축',
      desc: 'AI는 센서를 기반으로 데이터 축적이 가능할 때 가장 효과적입니다. 각종 센싱에 필요한 측정(M), 추적(T), 연결(C), 통합(I)을 연구합니다. 즉, MTCI를 통해서만 미래의 신뢰를 확보할 수 있습니다.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      details: [
        '신뢰를 보장하는 MTCI 아키텍처: 사물과 공간의 디지털 가상화의 핵심은 정확한 물리 센서 데이터의 축적입니다. 측정(M), 추적(T), 연결(C), 통합(I)으로 이어지는 전 주기의 신뢰성 보장 모델을 설계합니다.',
        '예측 가능한 미래 가치 보장: 정밀하게 연동된 하드웨어 및 데이터 모니터링 파이프라인을 통하여 고차원적 시뮬레이션을 가능하게 하며 가상 환경과 현실 환경 간의 이질감을 최소화합니다.'
      ]
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px', 
      threshold: 0.1,
    };
    const observers = [];
    researches.forEach((item) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveId(item.id);
        }
      }, observerOptions);
      const target = sectionRefs[item.id].current;
      if (target) {
        observer.observe(target);
        observers.push({ observer, target });
      }
    });
    return () => {
      observers.forEach(({ observer, target }) => {
        if (target) observer.unobserve(target);
      });
    };
  }, []);

  return (
    <div style={{ 
      color: '#111111', 
      padding: '160px 40px 100px 40px', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif',
      position: 'relative',
      background: '#FFFFFF',
      backgroundSize: '400% 400%',
      animation: 'auroraMove 18s ease infinite',
    }}>
      <style>{`
        @keyframes auroraMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ================= 상단 헤더 및 타이틀 섹션 ================= */}
        <div style={{ 
          marginBottom: '80px',
          textAlign: 'center', // 제목 중앙 정렬
          
          transition: 'all 0.8s'
        }}>
          <span style={{ 
            fontSize: '12px', 
            color: '#0052ff', 
            fontWeight: 'bold', 
            letterSpacing: '3px', 
            display: 'block', 
            marginBottom: '16px', 
            textTransform: 'uppercase' 
          }}>
            K-AI-STATION SERVICE
          </span>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '900', 
            color: '#111111', 
            margin: '0 0 20px 0', 
            letterSpacing: '-1.5px' 
          }}>
            나만의 AI를 체험해보세요
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            margin: 0 
          }}>
            당신의 라이프스타일에 최적화된 특별한 대화와 가이드를 경험할 수 있습니다.
          </p>
        </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        
        {/* ================= 5대 서비스 카드: 3개/2개 그리드 + 호버 시 카드 플립 효과 ================= */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center', // 가운데 정렬
          marginBottom: '140px',
          opacity: isMounted ? 1 : 0,
          transition: 'all 0.8s'
        }}>
          {aiModes.map((mode, index) => (
            <div 
              key={mode.id}
              style={{ 
                position: 'relative',
                width: '360px',
                height: '450px',
                borderRadius: '10px',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)',
                overflow: 'hidden',
                cursor: 'pointer',
                flex: '0 0 360px' 
              }}
              onMouseEnter={() => setHoveredCardId(mode.id)}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              {/* 앞면: 이미지와 정보 */}
              <div style={{ 
                width: '100%', height: '100%',
                backgroundImage: `url(${mode.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.4s ease',
                transform: hoveredCardId === mode.id ? 'scale(1.05)' : 'scale(1)'
              }} />

              {/* 뒷면: 호버 시 나타나는 링크 박스 */}
<div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 82, 255, 0.9)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  opacity: hoveredCardId === mode.id ? 1 : 0,
  transition: 'opacity 0.4s ease',
  color: '#ffffff',
  padding: '40px',
  boxSizing: 'border-box'
}}>
  <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 20px 0' }}>
    {mode.title}
  </h3>
  <p style={{ fontSize: '14px', marginBottom: '30px', lineHeight: '1.6', margin: '0 0 30px 0' }}>
    {mode.desc}
  </p>
  <a 
    href={mode.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      padding: '12px 24px',
      border: '1px solid #fff',
      borderRadius: '20px',
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '14px'
    }}
  >
    바로가기
  </a>
</div>
              
              {/* 카드 하단 명칭 (평상시) */}
              <div style={{ 
                position: 'absolute', bottom: '20px', left: '20px', right: '20px',
                backgroundColor: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '12px',
                opacity: hoveredCardId === mode.id ? 0 : 1, transition: 'opacity 0.4s'
              }}>
                <h4 style={{ margin: 0, color: '#111' }}>{mode.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}