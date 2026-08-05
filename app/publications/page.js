'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function PublicationsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('연구프로젝트');

  // 애니메이션 가시성 상태 관리
  const [researchVisible, setResearchVisible] = useState([false, false, false]);
  const researchItemRefs = [useRef(null), useRef(null), useRef(null)];

  // 각 섹션 이동을 위한 Ref 생성
  const topRef = useRef(null);
  const researchRef = useRef(null);
  const papersRef = useRef(null);

  const tabs = [
    { name: '연구프로젝트', ref: researchRef },
    { name: '지식재산/성과', ref: papersRef },
  ];

  const researches = [
    {
      id: 1,
      title: '고객맞춤형 AI 프롬프트',
      titleEn: 'PROMPT',
      desc: '고객이 필요한 AI 프롬프트를 제공합니다. 대중모델, 자체모델, 개별모델을 만들어 AI 기술의 사유화를 연구합니다.',
      image: '/Gallery1.png'
    },
    {
      id: 2,
      title: '공간안전품질 대시보드',
      titleEn: 'SAFETY CLOCK',
      desc: '인간은 시간이 필요할 때 시계를 만들었습니다. 그럼에도 불구, 공간 안전이 중요한 현재 시점에 공간의 안전시계가 없습니다. 공간안전품질의 대시보드 표준화를 연구합니다.',
      image: '/Gallery2.png'
    },
    {
      id: 3,
      title: '디지털트윈 개발 및 구축',
      titleEn: 'DIGITAL TWIN',
      desc: 'AI는 센서를 기반으로 데이터 축적이 가능할 때 가장 효과적입니다. 측정(M), 추적(T), 연결(C), 통합(I)을 연구합니다. MTCI를 통해서만 미래의 신뢰를 확보할 수 있습니다.',
      image: '/Gallery3.png'
    },
  ];

  const papers = [
    {
      id: 1,
      title: '프롬프트 난이도 조절을 통한 맞춤형 AI 학습 제공 시스템 및 방법',
      desc: '특허출원 (특허-2025-0196159) | SYSTEM AND METHOD OF PROVIDING CUSTOMIZED ARTIFICIAL INTELLIGENCE LEARNING',
    },
    {
      id: 2,
      title: '품질척도 통합 대시보드 시각화 시스템 및 방법',
      desc: '특허출원 (특허-2025-0153697) | SYSTEM AND METHOD FOR VISUALIZING INTEGRATED QUALITY MEASURES DASHBOARD',
    },
    {
      id: 3,
      title: '공간품질 관리를 위한 디지털 트윈 기반 센서 배치 지원 장치 및 방법',
      desc: '특허출원 (특허-2025-0157432) | APPARATUS AND METHOD OF SUPPORTING SENSOR ARRANGEMENT BASED ON DIGITAL TWIN',
    },
  ];

  // 탭 클릭 시 부드럽게 스크롤 이동하는 함수
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

  // 스크롤 위치에 따라 상단 탭 파란색 활성화 상태 자동 변경 및 관찰자 설정
  useEffect(() => {
    setIsMounted(true);
    const handleScrollActiveTab = () => {
      const scrollPosition = window.scrollY + 250;
      const researchEl = researchRef.current;
      const papersEl = papersRef.current;

      if (papersEl && scrollPosition >= papersEl.offsetTop) {
        setActiveTab('지식재산/성과');
      } else if (researchEl) {
        setActiveTab('연구프로젝트');
      }
    };

    window.addEventListener('scroll', handleScrollActiveTab, { passive: true });

    // 연구 프로젝트 아이템별 스크롤 애니메이션 관찰자
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observers = researchItemRefs.map((ref, index) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setResearchVisible((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }
      }, observerOptions);

      if (ref.current) observer.observe(ref.current);
      return { observer, ref: ref.current };
    });

    return () => {
      window.removeEventListener('scroll', handleScrollActiveTab);
      observers.forEach(({ observer, ref }) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div ref={topRef} style={{ backgroundColor: '#fff', color: '#111', padding: '140px 20px 120px 20px', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ================= 소개 페이지 상단 UI 그대로 적용한 헤더 영역 ================= */}
        <div style={{ marginBottom: '0px' }}>
          
          {/* 1. 상단 대표 타이틀 영역 */}
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: '#0052ff', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '16px', textTransform: 'uppercase' }}>
              Research & Innovation
            </span>
            <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.35', letterSpacing: '-2px', color: '#111', margin: 0 }}>
              KAQ는 인공지능과 DX에 기반하여 <br />
              가치 있는 연구혁신에 도전합니다.
            </h1>
          </div>

          {/* 2. 서브 탭 메뉴 */}
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

          {/* 3. 와이드 비주얼 배너 */}
          <div style={{
            width: '100%',
            height: '400px',
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
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80" 
              alt="Research Visual Showcase" 
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

        {/* ================= [연구 프로젝트 섹션 (애니메이션 적용)] ================= */}
        <div ref={researchRef} style={{ scrollMarginTop: '120px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '120px 0 60px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
            {researches.map((item, index) => {
              const isVisible = researchVisible[index];

              return (
                <div 
                  key={item.id}
                  ref={researchItemRefs[index]}
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
                    gap: '70px',
                    alignItems: 'center',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  {/* 텍스트 영역 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', order: index % 2 === 1 ? 2 : 1 }}>
                    <div>
                      <span style={{ fontSize: '13px', color: '#0052ff', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
                        [{item.titleEn}]
                      </span>
                      <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#111', margin: '0 0 16px 0', letterSpacing: '-1px', whiteSpace: 'pre-line', lineHeight: '1.3' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.8', margin: 0, wordBreak: 'keep-all' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* 이미지 영역 */}
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    height: '380px', 
                    overflow: 'hidden',
                    borderRadius: '12px',
                    backgroundColor: '#f5f7fa',
                    order: index % 2 === 1 ? 1 : 2,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80";
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= [지식재산 및 연구 성과 섹션] ================= */}
        <div ref={papersRef} style={{ scrollMarginTop: '120px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '120px 0 60px 0' }} />

          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: '#0052ff', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '12px', textTransform: 'uppercase' }}>
              Patents & Publications
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', margin: 0, color: '#111' }}>
              지식재산 및 연구 성과
            </h2>
          </div>

          <hr style={{ border: 'none', borderTop: '3px solid #eee', margin: '30px 0 0 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {papers.map((paper, index) => (
              <div 
                key={paper.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '30px',
                  padding: '32px 0',
                  borderBottom: '1px solid #eee',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ 
                  fontSize: '20px', 
                  fontWeight: '800', 
                  color: '#0052ff', 
                  fontFamily: 'monospace' 
                }}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: '#111', 
                    margin: 0, 
                    lineHeight: '1.4',
                    letterSpacing: '-0.5px',
                    wordBreak: 'keep-all'
                  }}>
                    {paper.title}
                  </h3>

                  <p style={{ 
                    fontSize: '14px', 
                    color: '#666', 
                    margin: 0, 
                    lineHeight: '1.6',
                    wordBreak: 'keep-all',
                    fontWeight: '400'
                  }}>
                    {paper.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}