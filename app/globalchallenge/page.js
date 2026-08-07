'use client';
import React, { useEffect, useState, useRef } from 'react';

function CountUpText({ text, trigger, duration = 1400 }) {
  const [display, setDisplay] = useState(text);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const match = text.match(/[\d.]+/);

    if (!trigger || !match) {
      if (!trigger) hasAnimated.current = false;
      setDisplay(text);
      return;
    }

    if (hasAnimated.current) {
      setDisplay(text);
      return;
    }
    hasAnimated.current = true;

    const numStr = match[0];
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const prefix = text.slice(0, match.index);
    const suffix = text.slice(match.index + numStr.length);

    let startTime = null;
    let frameId;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, text, duration]);

  return <span>{display}</span>;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
function GalleryRow({ item, index, isLast }) {
  const [ref, inView] = useInView(0.3);
  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="kaq-gallery-row"
      style={{
        position: 'relative',
        width: '100%',
        height: '600px', // 세로 높이를 확실하게 지정
        display: 'flex',
        alignItems: 'center',
        justifyContent: reversed ? 'flex-start' : 'flex-end',
        marginBottom: isLast ? 0 : '200px',
      }}
    >
      {/* 이미지 영역 */}
      <div
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          opacity: inView ? 1 : 0,
          transform: inView ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <img
          src={`https://picsum.photos/seed/${item.img}/1200/800`}
          alt={item.kor}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* 텍스트 영역: mix-blend-mode로 신비한 색상 반전 효과 */}
      <div
        style={{
          position: 'absolute',
          [reversed ? 'right' : 'left']: '10%', // 이미지와 겹치게 배치
          width: '50%',
          zIndex: 2,
          // 핵심: 배경과 대비되는 색상 반전
          mixBlendMode: 'difference', 
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(50px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}
      >
        <span style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '900',
          letterSpacing: '4px',
          color: '#ffffff', // 반전 모드에서는 흰색이 보색으로 작용
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          {item.eng}
        </span>
        <h2 style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: '900',
          lineHeight: '1.1',
          letterSpacing: '-3px',
          color: '#ffffff',
          margin: 0,
        }}>
          {item.kor}
        </h2>
      </div>
    </div>
  );
}

export default function GlobalChallengePage() {
  const [isMounted, setIsMounted] = useState(false);
  const globeContainerRef = useRef(null);

  const [galleryRef, galleryInView] = useInView(0.15);
  const [statsRef, statsInView] = useInView(0.2);

  const stats = [
    { value: '120+', label: 'OVERALL BALANCE', unit: '%p 향상', desc: '120개국 파트너 네트워크 구축' },
    { value: '450K+', label: 'DETECTION POWER', unit: '%p 향상', desc: '45만 건 이상의 글로벌 인증 검증' },
    { value: '99.8%', label: 'ANALYSIS RELIABILITY', unit: '%p 향상', desc: '사실 기반 AI 프롬프트 신뢰도' },
    { value: 'TOP 1', label: 'DX INNOVATION', unit: '통합 향상', desc: '실험실 창업 DX 혁신 기업 도약' }
  ];

  const narratives = [
    { img: 'kaq-narrative-1', eng: 'As you understand', kor: '국가직무표준(NCS) 접근 방식, 업의 방식을 정의한다!' },
    { img: 'kaq-narrative-2', eng: 'As you see', kor: '공간안전품질(DSQ) 대시보드, 공간의 안전 품질 수준을 보여준다!' },
    { img: 'kaq-narrative-3', eng: 'As you feel', kor: 'K-AI Station 체험 부스, 한국형 AI 프롬프트를 체험한다!' },
    { img: 'kaq-narrative-4', eng: 'As you lead the world', kor: '한국형 AI로 세계로 나아간다!' },
  ];

  useEffect(() => {
    setIsMounted(true);

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
      let globeRadius = Math.min(width, height) * 0.40;

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        particles.push({
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
        globeRadius = Math.min(width, height) * 0.40;
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
      if (globeContainerRef.current) {
        globeContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div style={{
      backgroundColor: '#2861fd',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      position: 'relative',
      minHeight: '100vh',
      overflowX: 'hidden',
      width: '100%',
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
          opacity: isMounted ? 0.35 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      />

      <div style={{ 
  maxWidth: '1200px', 
  margin: '0 auto', 
  padding: '360px 20px 360px 20px', // 위 360px, 아래 360px 적용
  position: 'relative', 
  zIndex: 1, 
  boxSizing: 'border-box' 
}}>
  <div style={{
    maxWidth: '800px',
    opacity: isMounted ? 1 : 0,
    transform: isMounted ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
      <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
        KAQ GLOBAL CHALLENGE
      </span>
      <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}></span>
    </div>

    <h1 style={{
      fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
      fontWeight: 800,
      lineHeight: 1.35,
      margin: '0 0 24px 0',
      wordBreak: 'keep-all',
      letterSpacing: '-2px',
      color: '#ffffff'
    }}>
      Beyond Research, <br />세계 표준을 선도하는 <br /> Pro-Search
    </h1>

    <p style={{
      fontSize: '16px',
      color: '#f0f4ff',
      opacity: 0.9,
      lineHeight: '1.8',
      fontWeight: '400',
      wordBreak: 'keep-all',
      margin: 0 // 여백 조정을 위해 마진 0 처리
    }}>
      패러다임을 설계합니다. 연구개발을 초월하여, 새로운 글로벌 표준을 지향하는 목표를 갖고 고품질 Pro-Search에 도전합니다.
    </p>
  </div>
</div>

      {/* 갤러리 섹션 */}
      <div
        ref={galleryRef}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px 120px 20px',
          boxSizing: 'border-box',
        }}
      >
        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.2)', margin: '0 0 60px 0' }} />

        <div style={{
          marginBottom: '60px',
          opacity: galleryInView ? 1 : 0,
          transform: galleryInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}>
          <span style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '2px',
            color: '#8fb4ff',
            marginBottom: '16px',
            textTransform: 'uppercase'
          }}>
            GLOBAL
          </span>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '800',
            lineHeight: '1.35',
            letterSpacing: '-1px',
            margin: 0,
            color: '#ffffff',
            wordBreak: 'keep-all'
          }}>
            연구를 넘어, 세계가 참고하는 기준을 만드는 것이 <br />KAQ가 가장 잘하는 일입니다.
          </h3>
        </div>

        <div>
          {narratives.map((item, i) => (
            <GalleryRow key={i} item={item} index={i} isLast={i === narratives.length - 1} />
          ))}
        </div>
      </div>

      {/* 하단 대시보드 및 지표 카운터 영역 */}
      <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box', zIndex: 5 }}>
        <div style={{
          width: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '0 -40px 80px rgba(0, 0, 0, 0.08)',
          padding: '130px 20px 150px 20px',
          boxSizing: 'border-box'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
            <div
              ref={statsRef}
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s ease, transform 1s ease',
              }}
            >
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '50px',
                letterSpacing: '-1px',
                color: '#0f172a'
              }}>
                숫자로 입증하는 KAQ 글로벌 신뢰도
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '30px'
              }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '35px 30px',
                    boxSizing: 'border-box',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      
                      <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', letterSpacing: '2px' }}>
                        {stat.label}
                      </span>
                    </div>

                    <div style={{
                      fontSize: '42px',
                      fontWeight: '800',
                      color: '#0052ff',
                      fontFamily: 'sans-serif',
                      lineHeight: '1',
                      letterSpacing: '-1px',
                      marginBottom: '10px',
                    }}>
                      <CountUpText text={stat.value} trigger={statsInView} />
                    </div>

                    <div style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#0052ff',
                      marginBottom: '15px',
                    }}>
                      {stat.unit}
                    </div>

                    <p style={{ fontSize: '15px', color: '#334155', fontWeight: '400', lineHeight: '1.6', margin: 0 }}>
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
  );
}