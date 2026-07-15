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
      padding: '160px 40px 0 40px', 
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

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative' }}>
        
        {/* ================= 상단 메인 헤더 & 타이틀 섹션 ================= */}
        <div style={{ 
          marginBottom: '50px',
          textAlign: 'left', 
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          <span style={{ fontSize: '14px', color: '#888', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '14px', textTransform: 'uppercase', paddingLeft: '2px' }}>
            k-ai-station 서비스
          </span>
          <h1 style={{ fontSize: '46px', fontWeight: '800', lineHeight: '1.25', letterSpacing: '-2px', color: '#111111', margin: 0 }}>
            누구나 쉽게 사용하는 AI
          </h1>
        </div>

        {/* ================= 5대 서비스 카드 그리드 (Flex 중앙 배치 개선 완료) ================= */}
        <div style={{
          display: 'flex',
          justifyContent: 'center', 
          width: '100%',
          marginBottom: '140px'
        }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '40px', 
            justifyContent: 'center', 
            width: '100%',
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? 'translateY(0)' : 'translateY(25px)',
            transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.15s'
          }}>
            {aiModes.map((mode) => {
              const isHovered = hoveredCardId === mode.id;
              return (
                <a 
                  href={mode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={mode.id}
                  onMouseEnter={() => setHoveredCardId(mode.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  style={{ 
                    backgroundColor: '#1a1d24', 
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column',
                    textDecoration: 'none',
                    boxShadow: isHovered ? '0 30px 50px rgba(0, 82, 255, 0.18)' : '0 8px 30px rgba(0, 0, 0, 0.06)',
                    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                    border: isHovered ? '1px solid #0052ff' : '1px solid #252932',
                    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                    cursor: 'pointer',
                    flex: '1 1 calc(33.333% - 40px)', 
                    minWidth: '320px',
                    maxWidth: '380px'
                  }}
                >
                  <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={mode.image} 
                      alt={mode.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                      }} 
                    />
                  </div>

                  <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px' }}>
                    <div>
                      <h3 style={{ fontSize: '21px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
                        {mode.title}
                      </h3>
                      <p style={{ color: '#adb5bd', fontSize: '14px', lineHeight: '1.65', margin: 0 }}>
                        {mode.desc}
                      </p>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'flex-end', 
                      alignItems: 'center',
                      transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                      transition: 'transform 0.3s ease'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={isHovered ? '#0052ff' : '#9ea7af'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* 미들 섹션 분리선 */}
        <hr style={{ border: 'none', borderTop: '1px solid rgba(0, 82, 255, 0.1)', margin: '60px 0 100px 0' }} />

        {/* ================= 2단 연구성과/이노베이션 레이아웃 영역 ================= */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          gap: '100px',
          alignItems: 'start',
          position: 'relative',
          paddingBottom: '100px' 
        }}>
          
          {/* 대형 갤러리 이미지 영역 */}
          <div style={{ 
            position: 'sticky', 
            top: '180px', 
            width: '100%', 
            height: '620px', 
            overflow: 'hidden',
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)', 
            borderRadius: '20px 20px 0 20px',
            boxShadow: '0 40px 70px rgba(0, 50, 255, 0.04)',
            zIndex: 10,
            backgroundColor: '#f7f9fc',
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? 'translateX(0) scale(1)' : 'translateX(-60px) scale(0.97)',
            transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)'
          }}>
            {researches.map((item) => (
              <div 
                key={item.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: activeId === item.id ? 1 : 0,
                  transform: activeId === item.id ? 'scale(1)' : 'scale(1.03)',
                  transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                  zIndex: activeId === item.id ? 2 : 1
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>

          {/* 스크롤 설명 텍스트 영역 */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '160px',
            paddingBottom: 'calc(50vh - 280px)',
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? 'translateX(0)' : 'translateX(60px)',
            transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.1s'
          }}>
            
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '16px', textTransform: 'uppercase' }}>연구 개요</span>
              <h2 style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.3', color: '#111111', margin: '0 0 20px 0', letterSpacing: '-1.5px' }}>
                RESEARCH & INNOVATION
              </h2>
              <p style={{ color: '#444444', fontSize: '16.5px', lineHeight: '1.75', margin: 0 }}>
                KAQ는 인공지능과 DX에 기반하여 가치 있는 연구혁신에 도전하고 있습니다. 실험실창업 기업으로서 사실 기반 연구에 기초하여 기술 사업화로 승부합니다.
              </p>
            </div>

            {researches.map((item) => (
              <div 
                key={item.id}
                ref={sectionRefs[item.id]} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '24px',
                  borderTop: '1px solid rgba(0, 82, 255, 0.1)',
                  paddingTop: '60px',
                  opacity: activeId === item.id ? 1 : 0.45, 
                  transform: activeId === item.id ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                <span style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: 'bold', color: '#0052ff', letterSpacing: '1.5px' }}>
                  STEP 0{item.id}
                </span>

                <h2 style={{ 
                  fontSize: '36px', 
                  fontWeight: '800', 
                  lineHeight: '1.3', 
                  color: '#111111', 
                  margin: 0,
                  letterSpacing: '-1.5px'
                }}>
                  {item.title}
                </h2>

                <p style={{ 
                  color: '#222222', 
                  fontSize: '17px', 
                  lineHeight: '1.85', 
                  margin: 0 
                }}>
                  {item.desc}
                </p>

                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: '15px 0 0 0', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '20px' 
                }}>
                  {item.details.map((detail, index) => {
                    const splitIdx = detail.indexOf(':');
                    const boldPart = detail.substring(0, splitIdx + 1);
                    const normalPart = detail.substring(splitIdx + 1);

                    return (
                      <li key={index} style={{ 
                        fontSize: '14.5px', 
                        lineHeight: '1.85', 
                        color: '#444444',
                        position: 'relative',
                        paddingLeft: '18px'
                      }}>
                        <span style={{ position: 'absolute', left: 0, top: '0px', color: '#0052ff', fontWeight: 'bold' }}>•</span>
                        <strong style={{ color: '#111111', fontWeight: '700' }}>{boldPart}</strong>{normalPart}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}