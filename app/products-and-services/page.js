'use client';
import React, { useEffect, useState, useRef } from 'react';

const BUTTON_BASE_STYLE = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '1px solid #E5E7EB',
  backgroundColor: '#FFFFFF', 
  color: '#111827',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  outline: 'none'
};

const BUTTON_HOVER_STYLE = {
  backgroundColor: '#0052FF',
  color: '#FFFFFF',
  borderColor: '#0052FF',
  transform: 'translateY(-2px)'
};

const ICON_STYLE = {
  width: '20px',
  height: '20px',
  strokeWidth: '2'
};

export default function ProductsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('제품 및 서비스');
  
  const scrollRef = useRef(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const topRef = useRef(null);
  const stationRef = useRef(null);
  const dsqRef = useRef(null);

  const stationContentRef = useRef(null);
  const dsqContentRef = useRef(null);

  const [stationVisible, setStationVisible] = useState(false);
  const [dsqVisible, setDsqVisible] = useState(false);

  const tabs = [
    { name: '제품 및 서비스', ref: topRef },
    { name: 'K-AI-STATION', ref: stationRef },
    { name: 'DSQ', ref: dsqRef },
  ];

  const handleTabClick = (tabName, refObj) => {
    setActiveTab(tabName);
    if (refObj && refObj.current) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = refObj.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScrollActiveTab = () => {
      const scrollPosition = window.scrollY + 200; 

      const topEl = topRef.current;
      const stationEl = stationRef.current;
      const dsqEl = dsqRef.current;

      if (dsqEl && scrollPosition >= dsqEl.offsetTop) {
        setActiveTab('DSQ');
      } else if (stationEl && scrollPosition >= stationEl.offsetTop) {
        setActiveTab('K-AI-STATION');
      } else if (topEl) {
        setActiveTab('제품 및 서비스');
      }
    };

    window.addEventListener('scroll', handleScrollActiveTab, { passive: true });
    handleScrollActiveTab(); 
    return () => window.removeEventListener('scroll', handleScrollActiveTab);
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries, setVisibleState) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleState(true);
        }
      });
    };

    const stationObserver = new IntersectionObserver((entries) => observerCallback(entries, setStationVisible), observerOptions);
    const dsqObserver = new IntersectionObserver((entries) => observerCallback(entries, setDsqVisible), observerOptions);

    if (stationContentRef.current) stationObserver.observe(stationContentRef.current);
    if (dsqContentRef.current) dsqObserver.observe(dsqContentRef.current);

    return () => {
      if (stationContentRef.current) stationObserver.unobserve(stationContentRef.current);
      if (dsqContentRef.current) dsqObserver.unobserve(dsqContentRef.current);
    };
  }, []);

  const aiModes = [
    {
      id: 'senior',
      title: '시니어 모드',
      desc: '어렵지 않아요. 정겨운 AI가 당신의 이야기를 기다립니다.',
      link: 'https://kai-station.com/senior?from=%2Fhome',
      image: '/시니어.png'
    },
    {
      id: 'kids',
      title: '어린이 모드',
      desc: '호기심 가득! AI 친구와 함께 상상력을 키워보세요.',
      link: 'https://kai-station.com/kids?from=%2Fhome',
      image: '/주니어.png'
    },
    {
      id: 'doran',
      title: '도란도란 모드',
      desc: '도란도란 이야기를 나눠보세요. 따뜻하게 들어주는 AI 친구가 기다립니다.',
      link: 'https://doran-two.vercel.app/',
      image: '/도란도란.png'
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

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; 
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleScrollClick = (direction) => {
    if (scrollRef.current) {
      const cardWidthWithGap = 280 + 24; 
      const scrollAmount = cardWidthWithGap * 1; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const CarouselButton = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      onMouseEnter={() => setHoveredButton(direction)}
      onMouseLeave={() => setHoveredButton(null)}
      style={{
        ...BUTTON_BASE_STYLE,
        ...(hoveredButton === direction ? BUTTON_HOVER_STYLE : {})
      }}
      aria-label={direction === 'left' ? '이전 카드' : '다음 카드'}
    >
      {direction === 'left' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={ICON_STYLE}>
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={ICON_STYLE}>
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      )}
    </button>
  );

  return (
    <div ref={topRef} style={{ backgroundColor: '#fff', color: '#111', padding: '140px 20px 120px 20px', minHeight: '100vh', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ================= 상단 공통 UI ================= */}
        <div style={{ marginBottom: '0px' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: '#0052ff', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '16px', textTransform: 'uppercase' }}>
              Products & Services
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '800', lineHeight: '1.35', letterSpacing: '-1.5px', color: '#111', margin: 0, wordBreak: 'keep-all' }}>
              KAQ (Korea Academy for Quality), <br />
              월드클래스 AI 프롬프트와 안전품질 솔루션을 <br />
              제공합니다.
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab.name, tab.ref)}
                  style={{
                    backgroundColor: isActive ? '#0052ff' : '#f5f7fa',
                    color: isActive ? '#fff' : '#333',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: '24px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(0,82,255,0.2)' : 'none'
                  }}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          <div style={{
            width: '100%',
            height: 'clamp(240px, 40vh, 400px)',
            backgroundColor: '#050b14',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80" 
              alt="Products Visual" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.5,
                mixBlendMode: 'luminosity'
              }}
            />
          </div>
        </div>

        {/* ================= K-AI-STATION 슬라이드 섹션 ================= */}
        <div ref={stationRef} style={{ scrollMarginTop: '120px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '100px 0 60px 0' }} />
          
          <div 
            ref={stationContentRef}
            style={{ 
              opacity: stationVisible ? 1 : 0,
              transform: stationVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '12px', letterSpacing: '-1px', color: '#0052ff' }}>
                K-AI-STATION SERVICE
              </h2>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: 0, wordBreak: 'keep-all' }}>
                당신의 라이프스타일에 최적화된 대화형 모드와 가이드를 경험할 수 있습니다.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div 
                ref={scrollRef}
                style={{
                  display: 'flex',
                  gap: '24px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  paddingBottom: '20px',
                  scrollBehavior: 'smooth',
                  cursor: 'grab',
                  userSelect: 'none'
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <style>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {aiModes.map((mode) => (
                  <div 
                    key={mode.id}
                    style={{ 
                      flex: '0 0 280px',
                      height: '460px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      position: 'relative',
                      scrollSnapAlign: 'start',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.1)',
                      backgroundColor: '#f1f5f9',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <div style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%', 
                      height: '100%',
                      backgroundColor: '#050b14',
                      backgroundImage: `url(${mode.image})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      zIndex: 1
                    }} />

                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '24px 20px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <h3 style={{ margin: 0, color: '#ffffff', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                        {mode.title}
                      </h3>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {mode.desc}
                      </p>
                      <div style={{ marginTop: '10px' }}>
                        <a 
                          href={mode.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '6px',
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '12px',
                            border: '1px solid rgba(255,255,255,0.4)',
                            transition: 'background-color 0.2s ease'
                          }}
                        >
                          체험하기 &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <CarouselButton direction="left" onClick={() => handleScrollClick('left')} />
                <CarouselButton direction="right" onClick={() => handleScrollClick('right')} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= DSQ 플랫폼 상세 섹션 ================= */}
        <div ref={dsqRef} style={{ scrollMarginTop: '120px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '100px 0 60px 0' }} />
          
          <div 
            ref={dsqContentRef}
            style={{ 
              opacity: dsqVisible ? 1 : 0,
              transform: dsqVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', marginBottom: '12px', letterSpacing: '-1px', color: '#0052ff' }}>
                DSQ PLATFORM
              </h2>
              <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.7', margin: 0, wordBreak: 'keep-all' }}>
                모바일 기반 디지털안전품질 표준 대시보드 및 AI 센싱 안전 생태계 솔루션을 제공합니다.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
              padding: '10px 0'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: '800', color: '#111111', margin: 0, letterSpacing: '-1px', lineHeight: '1.35', wordBreak: 'keep-all' }}>
                  오픈퀄리티(Open Quality) <br/>기술 사업화 제품
                </h3>
                
                <p style={{ fontSize: '15px', color: '#555555', lineHeight: '1.75', margin: 0, maxWidth: '520px', wordBreak: 'keep-all' }}>
                  성균관대학교 스마트품질연구실이 개발한 자산을 토대로 다중이용시설, 전통시장, 스쿨존 등 실제 안전 품질 관리가 시급한 거점에 커스텀 도입 중인 모바일 표준 대시보드입니다.
                </p>
                
                <div style={{ marginTop: '8px' }}>
                  <a 
                    href="http://openq.co.kr:8082/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: '#0052ff',
                      color: '#fff',
                      borderRadius: '7px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      boxShadow: '0 4px 12px rgba(0,82,255,0.2)',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    플랫폼 둘러보기 &rarr;
                  </a>
                </div>
              </div>

              <div style={{
                width: '100%',
                height: 'clamp(220px, 35vh, 340px)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0,0,0,0.08)'
              }}>
                <img 
                  src="/dsq.jpg" 
                  alt="DSQ Platform Preview" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}