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

/* ------------------------------------------------------------------ */
/*  참고 UI("AI / TECH") 구조:                                         */
/*  1) 사진 위에 옅은 색 라벨(item.eng)을 얹고, 하단 스크림으로 대비 확보 */
/*  2) 사진 옆에 진한 색 큰 헤드라인(item.kor)을 음수 마진으로 살짝 겹침 */
/*  -> mix-blend-mode 없이 순수 레이어링이라 사진 내용과 무관하게 항상   */
/*     안정적으로 보임                                                  */
/* ------------------------------------------------------------------ */
function GalleryRow({ item, index, isLast }) {
  const [ref, inView] = useInView(0.3);
  const reversed = index % 2 === 1;

  // 문장을 행 전체 폭 기준으로 정중앙 정렬. 사진과 겹치는 부분만 다른 색으로
  // 보이게 하기 위해, 사진이 있는 자리(왼쪽 0~42% 또는 오른쪽 58~100%, 고정값)
  // 모양으로 잘라내는 클리핑 마스크를 사진톤 레이어에 씌움.
  const imageClipPath = reversed ? 'inset(0% 0% 0% 58%)' : 'inset(0% 58% 0% 0%)';

  const headingBaseStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: 0,
    fontSize: 'clamp(2.4rem, 5.6vw, 4.6rem)',
    fontWeight: '800',
    lineHeight: '1.1',
    letterSpacing: '-2px',
    wordBreak: 'keep-all',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate(-50%, -50%)' : 'translate(-50%, calc(-50% + 24px))',
    transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
  };

  return (
    <div
      ref={ref}
      className="kaq-gallery-row"
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: isLast ? 0 : '160px',
      }}
    >
      <div
        className="kaq-gallery-row-flex"
        style={{
          display: 'flex',
          flexDirection: reversed ? 'row-reverse' : 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* 이미지 + 오버레이 라벨 */}
        <div
          className="kaq-gallery-row-img"
          style={{
            position: 'relative',
            width: '42%',
            flexShrink: 0,
            aspectRatio: '3 / 4',
            borderRadius: '6px',
            overflow: 'hidden',
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.94)',
            transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src={`https://picsum.photos/seed/${item.img}/900/1200`}
            alt={item.kor}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* 전체 어둡게 깔아주는 톤: 어떤 사진이 들어와도 흰 글자가 항상 잘 읽히도록 */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.22)',
            pointerEvents: 'none',
          }} />

          {/* 하단 스크림: 영문 라벨 대비를 한 번 더 강화 */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '55%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
          }} />

          {/* 사진 위에 얹히는 영문 라벨 */}
          <span style={{
            position: 'absolute',
            left: '8%',
            right: '8%',
            bottom: '7%',
            fontSize: 'clamp(1.2rem, 2.4vw, 1.9rem)',
            fontWeight: '800',
            letterSpacing: '0.5px',
            lineHeight: '1.2',
            color: '#f4f2ea',
            wordBreak: 'keep-all',
          }}>
            {item.eng}
          </span>
        </div>

        {/* 헤딩이 차지할 여백 확보용 (실제 텍스트는 아래 절대 위치 h2가 담당) */}
        <div style={{ flex: 1 }} />
      </div>

      {/* 국문 헤드라인 (흰 글자, 기본 레이어) - 행 전체 기준 정중앙 정렬 */}
      <h2
        className="kaq-gallery-row-text"
        style={{
          ...headingBaseStyle,
          zIndex: 3,
          color: '#eef1f8',
        }}
      >
        {item.kor}
      </h2>

      {/* 동일한 헤딩을 똑같이 정중앙 정렬한 뒤, 사진이 있는 자리 모양으로만
          잘라내서(clip-path) 그 부분만 사진 톤에 가까운 색으로 보이게 함 */}
      <div
        className="kaq-gallery-row-tone"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none',
          clipPath: imageClipPath,
          WebkitClipPath: imageClipPath,
        }}
      >
        <h2
          style={{
            ...headingBaseStyle,
            color: 'rgba(226, 223, 212, 0.92)',
          }}
        >
          {item.kor}
        </h2>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kaq-gallery-row-flex {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .kaq-gallery-row-img {
            width: 100% !important;
            aspect-ratio: 4 / 3 !important;
          }
          .kaq-gallery-row-text {
            position: static !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            white-space: normal !important;
            margin-top: 20px !important;
          }
          .kaq-gallery-row-tone {
            display: none !important;
          }
        }
      `}</style>
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
    { img: 'kaq-narrative-1', eng: 'As you understand', kor: 'NCS 접근방식, 업을 표준으로' },
    { img: 'kaq-narrative-2', eng: 'As you see', kor: 'DSQ Dashboard, 공간안전을 데이터로' },
    { img: 'kaq-narrative-3', eng: 'As you feel', kor: 'K-AI Station, 한국형 AI 프롬프트의 시작' },
    { img: 'kaq-narrative-4', eng: 'As you lead the world', kor: 'Global Challenge, 한국형 AI, 세계를 향해' },
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
      overflow: 'hidden',
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
