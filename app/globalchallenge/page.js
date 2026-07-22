'use client';
import React, { useEffect, useState, useRef } from 'react';


function ScrambleText({ text, trigger }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '%^&*!#$?@0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalFrames = 30; 
    const interval = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      const fixedLength = Math.floor(text.length * progress);

      const newText = text
        .split('')
        .map((char, index) => {
          if (index < fixedLength) return char; 
          if (char === ' ' || char === '.' || char === '+' || char === '\n') return char; 
          return chars[Math.floor(Math.random() * chars.length)]; 
        })
        .join('');

      setDisplayText(newText);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text); 
      }
    }, 45); 

    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span>{displayText}</span>;
}

export default function GlobalChallengePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [textScrollProgress, setTextScrollProgress] = useState(0); 
  const [paperScrollProgress, setPaperScrollProgress] = useState(0); 
  
  const globeContainerRef = useRef(null);
  const textTrackRef = useRef(null);
  const paperTrackRef = useRef(null);

  // 문단 구조별로 자연스럽게 배열 분리
  const highlightSentence = `As you understand
국가직무표준(NCS) 접근 방식, 업의 방식을 정의한다!

As you see
공간안전품질(DSQ) 대시보드, 공간의 안전 품질 수준을 보여준다!

As you feel
K-AI Station 체험 부스, 한국형 AI 프롬프트를 체험한다!

As you lead the world
한국형 AI로 세계로 나아간다!`;

  const textWords = highlightSentence.split(/(\s+)/);


  const stats = [
    { value: '120+', label: 'OVERALL BALANCE', unit: '%p 향상', desc: '120개국 파트너 네트워크 구축' },
    { value: '450K+', label: 'DETECTION POWER', unit: '%p 향상', desc: '45만 건 이상의 글로벌 인증 검증' },
    { value: '99.8%', label: 'ANALYSIS RELIABILITY', unit: '%p 향상', desc: '사실 기반 AI 프롬프트 신뢰도' },
    { value: 'TOP 1', label: 'DX INNOVATION', unit: '통합 향상', desc: '실험실 창업 DX 혁신 기업 도약' }
  ];

  useEffect(() => {
    setIsMounted(true);

    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (textTrackRef.current) {
        const rect = textTrackRef.current.getBoundingClientRect();
        const absoluteTop = rect.top + scrollY;
        const totalScrollableDist = textTrackRef.current.offsetHeight - window.innerHeight;
        const textProgress = Math.min(1, Math.max(0, (scrollY - absoluteTop) / totalScrollableDist));
        setTextScrollProgress(textProgress);
      }

      if (paperTrackRef.current) {
        const textTrackEnd = textTrackRef.current 
          ? textTrackRef.current.offsetTop + textTrackRef.current.offsetHeight 
          : paperTrackRef.current.offsetTop;

        const startTrigger = textTrackEnd - window.innerHeight;
        const paperProgress = Math.min(1, Math.max(0, (scrollY - startTrigger) / 900));
        setPaperScrollProgress(paperProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId;
    let canvas;

    const initGlobe = () => {
      const container = globeContainerRef.current;
      if (!container) return;

      container.innerHTML = '';

      canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      container.appendChild(canvas);

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const particleCount = width < 768 ? 1100 : 2200; 
      const particles = [];
      let globeRadius = Math.min(width, height) * (width < 768 ? 0.40 : 0.40);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        particles.push({
          x: globeRadius * Math.sin(phi) * Math.cos(theta),
          y: globeRadius * Math.sin(phi) * Math.sin(theta),
          z: globeRadius * Math.cos(phi),
          baseX: globeRadius * Math.sin(phi) * Math.cos(theta),
          baseY: globeRadius * Math.sin(phi) * Math.sin(theta),
          baseZ: globeRadius * Math.cos(phi)
        });
      }

      let rotationY = 0;
      let rotationX = 0;
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e) => {
        mouseX = (e.clientX - width / 2) * 0.0004;
        mouseY = (e.clientY - height / 2) * 0.0004;
      };

      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        globeRadius = Math.min(width, height) * (width < 768 ? 0.40 : 0.40);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        
        rotationY += 0.0015 + mouseX * 0.08;
        rotationX += (mouseY - rotationX) * 0.05;

        const centerX = width < 768 ? width * 0.5 : width * 0.72;
        const centerY = height < 768 ? height * 0.38 : height * 0.48;

        particles.forEach((p) => {
          let cosY = Math.cos(rotationY);
          let sinY = Math.sin(rotationY);
          let x1 = p.baseX * cosY - p.baseZ * sinY;
          let z1 = p.baseX * sinY + p.baseZ * cosY;

          let cosX = Math.cos(rotationX);
          let sinX = Math.sin(rotationX);
          let y2 = p.baseY * cosX - z1 * sinX;
          let z2 = p.baseY * sinX + z1 * cosX;

          const perspective = 900;
          const scale = perspective / (perspective + z2);
          const projX = centerX + x1 * scale;
          const projY = centerY + y2 * scale;

          if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
            const alpha = Math.max(0.08, (perspective - z2) / (perspective * 1.3));
            ctx.beginPath();
            ctx.arc(projX, projY, Math.max(0.6, 1.6 * scale), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
            ctx.fill();
          }
        });

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    const timer = requestAnimationFrame(() => {
      initGlobe();
    });

    return () => {
      cancelAnimationFrame(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflowX = 'unset';
      document.body.style.overflowY = 'unset';
      if (globeContainerRef.current) {
        globeContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  const paperTranslateY = Math.max(0, 500 - paperScrollProgress * 500); 
  const paperRotation = -12 + (paperScrollProgress * 12); 

  return (
    <div style={{
      backgroundColor: '#2861fd', 
      color: '#ffffff', 
      minHeight: '100vh',
      boxSizing: 'border-box', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      padding: '200px 0 0 0', 
      background: `
        radial-gradient(circle at 30% 30%, #110ca6 0%, transparent 45%),
        radial-gradient(circle at 80% 40%, #0692a8 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, #1ea9d9 0%, transparent 55%),
        #2861fd
      `,
      backgroundSize: '150% 150%',
      animation: 'auroraChallengeBg 20s ease-in-out infinite alternate',
    }}>
      
      <style>{`
        @keyframes auroraChallengeBg {
          0% { background-position: 0% 0%; }
          50% { background-position: 50% 100%; }
          100% { background-position: 100% 0%; }
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 0 24px !important;
            margin-bottom: 60px !important;
          }
          .text-scroll-track {
            height: 1600px !important;
          }
          .sticky-text-wrapper {
            padding: 30px 20px !important;
          }
          .highlight-text-container {
            font-size: clamp(1.2rem, 4.8vw, 1.8rem) !important;
            line-height: 1.45 !important;
          }
          .paper-section {
            padding: 80px 20px 100px 20px !important;
          }
          .paper-inner {
            padding: 40px 0px !important;
          }
          .dashboard-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
      
      {/* 배경 3D 도트 지구 구체 */}
      <div 
        ref={globeContainerRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0, 
          pointerEvents: 'none',
          opacity: isMounted ? Math.max(0.12, 1 - textScrollProgress * 1.5) : 0, 
          transition: 'opacity 0.2s ease-out',
        }}
      />

      <div className="hero-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>
        <div style={{
          maxWidth: '780px', 
          marginBottom: '100px',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(25px)',
          transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
              KAQ GLOBAL CHALLENGE
            </span>
            <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.25)', marginLeft: '10px' }}></span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.1rem, 4.2vw, 4.5rem)', 
            fontWeight: '900', 
            lineHeight: '1.18', 
            letterSpacing: '-1.5px', 
            margin: 0, 
            color: '#ffffff', 
            marginBottom: '24px',
            wordBreak: 'keep-all'
          }}>
            Beyond Research, <br />세계 표준을 선도하는 <br /> Pro-Search
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)', 
            color: '#f0f4ff', 
            opacity: 0.9, 
            lineHeight: '1.65', 
            margin: 0, 
            fontWeight: '400',
            wordBreak: 'keep-all' 
          }}>
            패러다임을 설계합니다. 연구개발을 초월하여, <br/> 새로운 글로벌 표준을 지향하는 목표를 갖고 고품질 Pro-Search에 도전합니다.
          </p>
        </div>
      </div>

      {/* 스크롤 시 텍스트 불이 켜지는 3D 트랙 */}
      <div ref={textTrackRef} className="text-scroll-track" style={{ height: '2400px', position: 'relative', margin: '0', zIndex: 2 }}>
        <div className="sticky-text-wrapper" style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '80px 40px 40px 40px',
          maxWidth: '1280px',
          margin: '0 auto',
          boxSizing: 'border-box',
          perspective: '1000px'
        }}>
          <div style={{ maxWidth: '1100px', width: '100%' }}>

            <div className="highlight-text-container" style={{ 
              fontSize: 'clamp(1.2rem, 2.2vw, 2.3rem)', 
              fontWeight: '900', 
              lineHeight: '1.38', 
              letterSpacing: '-0.5px',
              wordBreak: 'keep-all',
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {textWords.map((word, index) => {
                const wordThreshold = index / textWords.length;
                const isLit = textScrollProgress >= wordThreshold;

                if (word.includes('\n')) {
                  return <div key={index} style={{ height: '10px' }} />;
                }

                const isEnglishHeader = word.startsWith('As') || word.startsWith('you') || word === 'understand' || word === 'see' || word === 'feel' || word === 'lead' || word === 'the' || word === 'world';

                return (
                  <span 
                    key={index}
                    style={{
                      color: isLit 
                        ? (isEnglishHeader ? '#ffffff' : 'rgba(255, 255, 255, 0.85)') 
                        : 'rgba(255, 255, 255, 0.18)', 
                      
                      textShadow: isLit 
                        ? (isEnglishHeader 
                            ? '0 0 16px rgba(255, 255, 255, 0.9), 0 0 32px rgba(125, 211, 252, 0.8)' 
                            : '0 0 20px rgba(255, 255, 255, 0.5)') 
                        : 'none', 
                      
                      fontWeight: isEnglishHeader ? '800' : '900',
                      
                      transform: isLit ? 'translateZ(0px) translateY(0px)' : 'translateZ(-80px) translateY(12px)',
                      filter: isLit ? 'blur(0px)' : 'blur(2px)',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'inline-block',
                      marginRight: word.trim() === '' ? '0px' : '6px'
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ================= 하단 대시보드 및 지표 카운터 ================= */}
      <div ref={paperTrackRef} style={{ position: 'relative', width: '100%', boxSizing: 'border-box', zIndex: 5 }}>
        <div className="paper-section" style={{
          width: '100%',
          backgroundColor: '#ffffff', 
          boxShadow: '0 -40px 80px rgba(0, 0, 0, 0.08)',
          transformOrigin: 'left top',
          transform: `translateY(${paperTranslateY}px) rotate(${paperRotation}deg)`,
          transition: 'transform 0.18s cubic-bezier(0.1, 0.7, 0.15, 1)', 
          padding: '140px 40px 180px 40px',
          boxSizing: 'border-box'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', boxSizing: 'border-box' }}>
            <div className="paper-inner" style={{ position: 'relative', zIndex: 5, backgroundColor: '#ffffff', color: '#000', padding: '60px 20px' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <h2 style={{ 
                  fontSize: 'clamp(1.6rem, 3.2vw, 3.2rem)', 
                  fontWeight: '900', 
                  marginBottom: '50px',
                  letterSpacing: '-1.5px',
                  color: '#0f172a' 
                }}>
                  숫자로 입증하는 KAQ 글로벌 신뢰도
                </h2>

                <div className="dashboard-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                  gap: '36px' 
                }}>
                  {stats.map((stat, i) => (
                    <div key={i} style={{ borderTop: '3px solid #0f172a', paddingTop: '20px' }}>
                      <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '800', marginBottom: '16px', letterSpacing: '1px' }}>
                        // {stat.label}
                      </div>
                      

                      <div style={{ 
                        fontSize: 'clamp(2.4rem, 4.2vw, 4.5rem)', 
                        fontWeight: '900', 
                        color: '#0052ff', 
                        fontFamily: 'monospace',
                        lineHeight: '1',
                        letterSpacing: '-1.5px'
                      }}>
                        <ScrambleText text={stat.value} trigger={paperScrollProgress > 0.4} />
                      </div>

                      <div style={{ 
                        fontSize: 'clamp(1rem, 1.2vw, 1.3rem)', 
                        fontWeight: '700', 
                        color: '#0052ff',
                        fontFamily: 'sans-serif',
                        marginTop: '10px',
                        marginBottom: '14px',
                        whiteSpace: 'nowrap'
                      }}>
                        {stat.unit}
                      </div>
                      
                      {/* 3. 설명문 */}
                      <p style={{ fontSize: '14px', color: '#334155', fontWeight: '600', lineHeight: '1.5', margin: 0 }}>
                        {stat.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}