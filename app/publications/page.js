'use client';
import React, { useEffect, useState, useRef } from 'react';

// 자판이 쳐지는 효과 서브 컴포넌트
function TypingText({ text, speed = 40, delay = 0, trigger = false }) {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    // 이미 타이핑을 완전히 마쳤다면 상태 유지
    if (hasCompleted) return;

    if (!trigger) {
      setDisplayText('');
      setIsStarted(false);
      return;
    }

    const timeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, trigger, hasCompleted]);

  useEffect(() => {
    if (hasCompleted || !isStarted || !trigger) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setHasCompleted(true); // 최초 1회 입력 완료 표시
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, isStarted, trigger, hasCompleted]);

  return (
    <span style={{ whiteSpace: 'pre-line' }}>
      {hasCompleted ? text : displayText}
      {!hasCompleted && trigger && (
        <span 
          className="cursor" 
          style={{ 
            opacity: displayText.length < text.length ? 1 : 0, 
            transition: 'opacity 0.2s', 
            color: '#0052ff' 
          }}
        >
          |
        </span>
      )}
    </span>
  );
}

export default function PublicationsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [visitedIds, setVisitedIds] = useState(new Set()); 
  const [showBlackhole, setShowBlackhole] = useState(true); 
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const sectionRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };
  
  const papersSectionRef = useRef(null); 

  const researches = [
    {
      id: 1,
      title: '고객맞춤형\nAI 프롬프트',
      titleEn: 'PROMPT',
      desc: '고객이 필요한 AI 프롬프트를 제공합니다.\n대중모델, 자체모델, 개별모델을 만들어\nAI 기술의 사유화를 연구합니다.',
      align: 'flex-start', // 좌측 배치
      bgText: 'AI PRIVATIZATION'
    },
    {
      id: 2,
      title: '공간안전품질\n대시보드',
      titleEn: 'SAFETY CLOCK',
      desc: '인간은 시간이 필요할 때 시계를 만들었습니다.\n그럼에도 불구, 공간 안전이 중요한 현재 시점에 공간의 안전시계가 없습니다.\n공간안전품질의 대시보드 표준화를 연구합니다.',
      align: 'flex-end', // 우측 배치
      bgText: 'SPATIAL DASHBOARD'
    },
    {
      id: 3,
      title: '디지털트윈\n개발 및 구축',
      titleEn: 'DIGITAL TWIN',
      desc: 'AI는 센서를 기반으로 데이터 축적이 가능할 때 가장 효과적입니다.\n측정(M), 추적(T), 연결(C), 통합(I)을 연구합니다.\nMTCI를 통해서만 미래의 신뢰를 확보할 수 있습니다.',
      align: 'flex-start', // 좌측 배치
      bgText: 'MTCI ARCHITECTURE'
    },
  ];

  const papers = [
    {
      id: 1,
      year: '2025',
      title: '프롬프트 난이도 조절을 통한 맞춤형 AI 학습 제공 시스템 및 방법',
      originalTitle: 'SYSTEM AND METHOD OF PROVIDING CUSTOMIZED ARTIFICIAL INTELLIGENCE LEARNING BY ADJUSTING PROMPT DIFFICULTY',
      journal: '특허출원 (특허-2025-0196159)',
    },
    {
      id: 2,
      year: '2025',
      title: '품질척도 통합 대시보드 시각화 시스템 및 방법',
      originalTitle: 'SYSTEM AND METHOD FOR VISUALIZING INTEGRATED QUALITY MEASURES DASHBOARD',
      journal: '특허출원 (특허-2025-0153697)',
    },
    {
      id: 3,
      year: '2025',
      title: '공간품질 관리를 위한 디지털 트윈 기반 센서 배치 지원 장치 및 방법',
      originalTitle: 'APPARATUS AND METHOD OF SUPPORTING SENSOR ARRANGEMENT BASED ON DIGITAL TWIN FOR SPATIAL QUALITY MANAGEMENT',
      journal: '특허출원 (특허-2025-0157432)',
    },
  ];

  useEffect(() => {
    setIsMounted(true);
    const observers = [];

    const researchOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
    };
    
    researches.forEach((item) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveId(item.id);
          setVisitedIds((prev) => new Set([...prev, item.id]));
        }
      }, researchOptions);
      
      const target = sectionRefs[item.id]?.current;
      if (target) {
        observer.observe(target);
        observers.push({ observer, target });
      }
    });

    const papersOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', 
      threshold: 0.01,
    };

    const papersObserver = new IntersectionObserver(([entry]) => {
      setShowBlackhole(!entry.isIntersecting);
    }, papersOptions);

    if (papersSectionRef.current) {
      papersObserver.observe(papersSectionRef.current);
      observers.push({ observer: papersObserver, target: papersSectionRef.current });
    }
    
    return () => {
      observers.forEach(({ observer, target }) => {
        if (target) observer.unobserve(target);
      });
    };
  }, []);

  const getParticleColor = (id, type) => {
    if (id === 1) return type === 1 ? '#0052ff' : '#00a3ff'; 
    if (id === 2) return type === 1 ? '#7e9ee1' : '#a1ccff'; 
    return type === 1 ? '#2f38bc' : '#3b9cf6'; 
  };

  // 블랙홀 애니메이션 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const particleCount = 650;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * (window.innerWidth * 0.35) + 60;
        particlesRef.current.push({
          angle: Math.random() * Math.PI * 2,
          radius,
          speed: (Math.random() * 0.01 + 0.005) * (160 / radius),
          size: Math.random() * 2.2 + 0.6,
          baseColorType: Math.random() > 0.75 ? 1 : 0,
        });
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.75;
      const centerY = canvas.height * 0.5;

      particlesRef.current.forEach((p) => {
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.fillStyle = getParticleColor(activeId || 1, p.baseColorType);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.angle += p.speed;
        p.radius -= 0.35;

        if (p.radius < 15) {
          p.radius = Math.random() * (canvas.width * 0.35) + 100;
          p.angle = Math.random() * Math.PI * 2;
        }
      });

      ctx.fillStyle = '#fafcff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(0, 82, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeId]); 

  return (
    <div style={{
      backgroundColor: '#ffffff',
      color: '#0f172a',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      letterSpacing: '-1px',
      overflowX: 'hidden'
    }}>
      
      {/* 은은한 배경 대형 워터마크 */}
      <div style={{
        position: 'fixed',
        top: '10vh',
        left: '-5vw',
        fontSize: 'clamp(10rem, 25vw, 28rem)',
        fontWeight: '900',
        color: 'rgba(15, 23, 42, 0.03)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        lineHeight: 0.8
      }}>
        연구혁신
      </div>
      <div style={{
        position: 'fixed',
        bottom: '5vh',
        right: '-5vw',
        fontSize: 'clamp(8rem, 20vw, 22rem)',
        fontWeight: '900',
        color: 'rgba(15, 23, 42, 0.025)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        lineHeight: 0.8
      }}>
        思考·技術
      </div>

      {/* 백그라운드 블랙홀 캔버스 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: (isMounted && showBlackhole) ? 0.9 : 0,
        transform: showBlackhole ? 'scale(1)' : 'scale(0.95)', 
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      </div>

      {/* 메인 타이포그래피 레이아웃 */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        padding: '0 4vw' 
      }}>
        
        {/* 상단 메인 거대 서체 헤더 영역 */}
        <div style={{
          paddingTop: '16vh',
          paddingBottom: '10vh',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          {/* 메인 타이틀 */}
          <h1 style={{ 
            fontSize: 'clamp(3.5rem, 8vw, 8.5rem)', 
            fontWeight: '900', 
            lineHeight: '0.9', 
            color: '#0f172a', 
            margin: 0, 
            letterSpacing: '-3px',
            textTransform: 'uppercase'
          }}>
            Research<br/>
            <span style={{ color: '#0052ff', fontStyle: 'italic', fontWeight: '300' }}>And</span><br/>
            INNOVATION
          </h1>

          <div style={{ maxWidth: '580px', marginTop: '32px' }}>
            <p style={{ 
              color: '#475569', 
              fontSize: '1.2rem', 
              lineHeight: '1.85', 
              margin: '0', 
              fontWeight: '400', 
              wordBreak: 'keep-all',
              marginTop: '10px',
            }}>
              <TypingText 
                text={`KAQ는 인공지능과 DX에 기반하여 가치 있는 연구혁신에 도전합니다.\n실험실창업 기업으로서 사실 기반 연구에 기초하여 기술 사업화로 승부합니다.`}
                speed={45}
                delay={500}
                trigger={isMounted}
              />
            </p>
          </div>
        </div>

        {/* 본문 항목들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30vh', paddingTop: '35vh', paddingBottom: '30vh' }}>
          {researches.map((item) => {
            const isActive = activeId === item.id;
            const hasBeenVisited = visitedIds.has(item.id);
            const primaryColor = getParticleColor(item.id, 1);

            return (
              <div
                key={item.id}
                ref={sectionRefs[item.id]}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: item.align,
                  width: '100%',
                  position: 'relative',
                  opacity: isActive ? 1 : 0.2,
                  filter: isActive ? 'blur(0px)' : 'blur(4px)',
                  transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(50px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* 배경 오버레이 고스트 서체 */}
                <div style={{
                  position: 'absolute',
                  top: '-8vh',
                  fontSize: 'clamp(5rem, 14vw, 16rem)',
                  fontWeight: '900',
                  color: 'rgba(15, 23, 42, 0.035)',
                  zIndex: -1,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap'
                }}>
                  {item.bgText}
                </div>

                <div style={{ maxWidth: '850px', width: '100%' }}>
                  <span style={{ 
                    fontSize: '14px', 
                    fontFamily: 'monospace', 
                    fontWeight: '800', 
                    letterSpacing: '4px', 
                    color: primaryColor,
                    display: 'block',
                    marginBottom: '10px'
                  }}>
                    [{item.titleEn}]
                  </span>

                  <h2 style={{ 
                    fontSize: 'clamp(3rem, 7vw, 7.5rem)', 
                    fontWeight: '900', 
                    color: '#0f172a', 
                    margin: '0 0 24px 0', 
                    lineHeight: '0.95',
                    letterSpacing: '-3px',
                    whiteSpace: 'pre-line'
                  }}>
                    {item.title}
                  </h2>

                  <p style={{ 
                    color: '#334155', 
                    fontSize: '1.35rem', 
                    lineHeight: '1.8', 
                    margin: 0, 
                    fontWeight: '400',
                    wordBreak: 'keep-all',
                    minHeight: '100px'
                  }}>
                    <TypingText 
                      text={item.desc} 
                      speed={30} 
                      delay={150}
                      trigger={hasBeenVisited} 
                    />
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '100px 0' }} />

        {/* 하단 지식재산권 섹션 */}
        <div ref={papersSectionRef} style={{ maxWidth: '1100px', margin: '0 auto 160px auto', position: 'relative', zIndex: 3 }}>
          <div style={{ marginBottom: '60px' }}>
            <span style={{ fontSize: '13px', color: '#0052ff', fontWeight: '700', letterSpacing: '3px', display: 'block', marginBottom: '12px' }}>PATENTS & PUBLICATIONS</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', letterSpacing: '-2px', margin: 0, color: '#0f172a' }}>
              지식재산 및 연구 성과
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {papers.map((paper) => (
              <div 
                key={paper.id}
                style={{
                  display: 'flex',
                  gap: '40px',
                  padding: '40px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  alignItems: 'flex-start',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid #0052ff';
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 82, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid #e2e8f0';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
                }}
              >
                <div style={{ width: '80px', flexShrink: 0 }}>
                  <span style={{ fontSize: '32px', fontWeight: '900', color: '#0052ff', fontFamily: 'monospace' }}>
                    {paper.year}
                  </span>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {paper.type}
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                      {paper.journal}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: 0, lineHeight: '1.4' }}>
                    {paper.title}
                  </h3>

                  <span style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic', display: 'block' }}>
                    "{paper.originalTitle}"
                  </span>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}