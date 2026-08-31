'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function CountUpText({ text, trigger, duration = 1400, from }) {
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
    const startValue = from !== undefined ? from : 0;
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
      const current = startValue + (target - startValue) * eased;
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [trigger, text, duration, from]);

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

function splitHeading(kor) {
  const idx = kor.indexOf(',');
  if (idx === -1) return [kor];
  const first = kor.slice(0, idx + 1).trim();
  const second = kor.slice(idx + 1).trim();
  return [first, second];
}

function NarrativeScene({ item, index, total }) {
  const headingLines = splitHeading(item.kor);
  const reversed = index % 2 === 1;
  const sceneRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });
  const imgParallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={sceneRef}
      className="kaq-narrative-scene"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0',
      }}
    >
      <div
        className="kaq-narrative-flex"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: reversed ? 'row-reverse' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '48px',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, flex: '1 1 480px', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: false }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '2px', color: '#8fb4ff' }}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span style={{ width: '1px', height: '12px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: 'rgba(255,255,255,0.75)' }}>
              {item.eng}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: false }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="challenge-narrative-title"
          >
            {headingLines.map((line, li) => (
              <div key={li}>{line}</div>
            ))}
          </motion.h2>
        </div>

        <div style={{ position: 'relative', flex: '1 1 500px', width: '100%', maxWidth: '520px' }}>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-8%',
              [reversed ? 'left' : 'right']: '-6%',
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              fontWeight: '800',
              color: 'rgba(255,255,255,0.06)',
              lineHeight: 1,
              zIndex: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ amount: 0.3, once: false }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: '16px',
              overflow: 'hidden',
              zIndex: 1,
              boxShadow: '0 30px 70px -20px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.12)',
              backgroundColor: '#1b3b8b',
            }}
          >
            <motion.img
              src={item.img}
              alt={item.kor}
              loading="lazy"
              style={{
                width: '100%',
                height: '116%',
                objectFit: 'cover',
                display: 'block',
                y: imgParallaxY,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function GlobalChallengePage() {
  const [isMounted, setIsMounted] = useState(false);
  const globeContainerRef = useRef(null);
  const [statsRef, statsInView] = useInView(0.2);

  const stats = [
    { value: '120+', label: 'OVERALL BALANCE', unit: '%p 향상', desc: '120개국 파트너 네트워크 구축', animate: true },
    { value: '450K+', label: 'DETECTION POWER', unit: '%p 향상', desc: '45만 건 이상의 글로벌 인증 검증', animate: true },
    { value: '99.8%', label: 'ANALYSIS RELIABILITY', unit: '%p 향상', desc: '사실 기반 AI 프롬프트 신뢰도', animate: true },
    { value: 'TOP 1', label: 'DX INNOVATION', unit: '통합 향상', desc: '실험실 창업 DX 혁신 기업 도약', animate: true, countFrom: 9 },
  ];

  const narratives = [
    { img: '/7.png', eng: 'As you understand', kor: 'NCS 접근방식, 업을 표준으로' },
    { img: '/4.png', eng: 'As you see', kor: 'DSQ Dashboard, 공간안전을 데이터로' },
    { img: '/5.png', eng: 'As you feel', kor: 'K-AI Station, 한국형 AI 프롬프트의 시작' },
    { img: '/6.png', eng: 'As you lead the world', kor: 'Global Challenge, 한국형 AI, 세계를 향해' },
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

      const particleCount = width < 768 ? 900 : 1800;
      const particles = [];
      let globeRadius = Math.min(width, height) * 0.40;

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        particles.push({
          baseX: globeRadius * Math.sin(phi) * Math.cos(theta),
          baseY: globeRadius * Math.sin(phi) * Math.sin(theta),
          baseZ: globeRadius * Math.cos(phi),
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

    const timer = requestAnimationFrame(() => { initGlobe(); });
    return () => {
      cancelAnimationFrame(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (globeContainerRef.current) globeContainerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#2861fd',
        color: '#ffffff',
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
      }}
    >
      <style>{`
        @keyframes auroraChallengeBg {
          0% { background-position: 0% 0%; }
          50% { background-position: 50% 100%; }
          100% { background-position: 100% 0%; }
        }

        /* 💻 PC 웹: 원본 42px / 32px 그대로 유지 */
        .challenge-main-title {
          font-size: 42px;
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: -1.5px;
          color: #ffffff;
          margin: 0 0 24px 0;
          word-break: keep-all;
        }
        .challenge-intro-h3 {
          font-size: 32px;
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: -1px;
          margin: 0;
          color: #ffffff;
          word-break: keep-all;
        }
        .challenge-narrative-title {
          font-size: 32px;
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: -1px;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }
        .challenge-stats-h2 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 50px;
          letter-spacing: -1px;
          color: #0f172a;
        }
        .challenge-stat-number {
          font-size: 42px;
          font-weight: 800;
          color: #0052ff;
          line-height: 1;
          letter-spacing: -1px;
          margin-bottom: 10px;
        }

        /* 📱 모바일(768px 이하): 다른 페이지와 정확히 동일한 크기로 축소 */
        @media (max-width: 768px) {
          .challenge-main-title {
            font-size: 24px !important;
            letter-spacing: -1.5px !important;
            margin-bottom: 16px !important;
          }
          .challenge-intro-h3 {
            font-size: 20px !important;
            line-height: 1.4 !important;
          }
          .challenge-narrative-title {
            font-size: 20px !important;
            line-height: 1.4 !important;
          }
          .challenge-stats-h2 {
            font-size: 20px !important;
            margin-bottom: 30px !important;
          }
          .challenge-stat-number {
            font-size: 32px !important;
          }
          .kaq-narrative-scene {
            height: auto !important;
            min-height: auto !important;
            padding: 60px 0 !important;
          }
          .kaq-narrative-flex {
            flex-direction: column !important;
            justify-content: center !important;
            gap: 32px !important;
          }
        }
      `}</style>

      {/* 3D 도트 지구 구체 */}
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

      {/* 헤더 인트로 */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '140px 20px 80px 20px',
          position: 'relative',
          zIndex: 1,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '850px',
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
              KAQ GLOBAL CHALLENGE
            </span>
            <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.25)' }}></span>
          </div>

          <h1 className="challenge-main-title">
            Beyond Research, <br />세계 표준을 선도하는 <br /> Pro-Search
          </h1>

          <p
            style={{
              fontSize: '15px',
              color: '#f0f4ff',
              opacity: 0.9,
              lineHeight: '1.75',
              fontWeight: '400',
              wordBreak: 'keep-all',
              margin: 0,
            }}
          >
            패러다임을 설계합니다. 연구개발을 초월하여, 새로운 글로벌 표준을 지향하는 목표를 갖고 고품질 Pro-Search에 도전합니다.
          </p>
        </div>
      </div>

      {/* 섹션 인트로 라벨 */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px 60px 20px',
          boxSizing: 'border-box',
        }}
      >
        <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.2)', margin: '0 0 50px 0' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '13px',
              fontWeight: '800',
              letterSpacing: '2px',
              color: '#8fb4ff',
              marginBottom: '14px',
              textTransform: 'uppercase',
            }}
          >
            GLOBAL
          </span>
          <h3 className="challenge-intro-h3">
            연구를 넘어, 세계가 참고하는 기준을 만드는 것이 <br />KAQ가 가장 잘하는 일입니다.
          </h3>
        </motion.div>
      </div>

      {/* 내러티브 씬 */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {narratives.map((item, i) => (
          <NarrativeScene key={i} item={item} index={i} total={narratives.length} />
        ))}
      </div>

      {/* 하단 지표 */}
      <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box', zIndex: 5 }}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            boxShadow: '0 -40px 80px rgba(0, 0, 0, 0.08)',
            padding: '100px 20px 120px 20px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
            <div
              ref={statsRef}
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s ease, transform 1s ease',
              }}
            >
              <h2 className="challenge-stats-h2">
                숫자로 입증하는 KAQ 글로벌 신뢰도
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '24px',
                }}
              >
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '30px 24px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '800',
                        color: '#0052ff',
                        letterSpacing: '1.2px',
                        marginBottom: '14px',
                      }}
                    >
                      {stat.label}
                    </div>

                    <div className="challenge-stat-number">
                      {stat.animate ? (
                        <CountUpText text={stat.value} trigger={statsInView} from={stat.countFrom} />
                      ) : (
                        stat.value
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#0052ff',
                        marginBottom: '12px',
                      }}
                    >
                      {stat.unit}
                    </div>

                    <p style={{ fontSize: '14px', color: '#64748b', fontWeight: '400', lineHeight: '1.6', margin: 0 }}>
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