'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function GlobalChallengePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [textScrollProgress, setTextScrollProgress] = useState(0); 
  const [paperScrollProgress, setPaperScrollProgress] = useState(0); 
  
  const globeContainerRef = useRef(null);
  const textTrackRef = useRef(null);
  const paperTrackRef = useRef(null);

  // 구글 리서치 텍스트 스펙 동기화
  const highlightSentence = "NCS 국제 표준 수립, DSQ 국제 수출, Korea 안전 품질 국제 체험까지. 인간과 AI가 함께하는 글로벌 여정에 참여하세요.";
  const textWords = highlightSentence.split(' ');

  // image_e0c45e.png 대시보드 무드 데이터
  const stats = [
    { value: '120+', label: 'OVERALL BALANCE', unit: ' %p 향상', desc: '120개국 파트너 네트워크 구축' },
    { value: '450K+', label: 'DETECTION POWER', unit: ' %p 향상', desc: '45만 건 이상의 글로벌 인증 검증' },
    { value: '99.8%', label: 'ANALYSIS RELIABILITY', unit: ' %p 향상', desc: '사실 기반 AI 프롬프트 신뢰도' },
    { value: 'TOP 1', label: 'DX INNOVATION', unit: ' 통합 향상', desc: '실험실 창업 DX 혁신 기업 도약' }
  ];

  useEffect(() => {
    setIsMounted(true);

    // 이중 스크롤 리셋 잠금 유지
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // [영어 문장 중앙 고립 및 고정 상태 발광 픽스 수식]
      if (textTrackRef.current) {
        // 부모 레일의 화면 대비 상대적 top 위치 계측으로 오차 원천 차단
        const rect = textTrackRef.current.getBoundingClientRect();
        const absoluteTop = rect.top + scrollY;
        const totalScrollableDist = textTrackRef.current.offsetHeight - window.innerHeight;
        
        // 화면에 완전히 달라붙는 스티키 활성화 구간 프로그레스 연산 (0.00 ~ 1.00)
        const textProgress = Math.min(1, Math.max(0, (scrollY - absoluteTop) / totalScrollableDist));
        setTextScrollProgress(textProgress);
      }

      if (paperTrackRef.current) {
        const textTrackEnd = textTrackRef.current 
          ? textTrackRef.current.offsetTop + textTrackRef.current.offsetHeight 
          : paperTrackRef.current.offsetTop;

        // 영어 문장이 100% 다 하얘진 바로 그 지점(textTrackEnd)부터 사선 패널 애니메이션이 시작되도록 연결 고리 동기화
        const startTrigger = textTrackEnd - window.innerHeight;
        
        // 회전 가동 범위를 느긋하게 소모하도록 분모 900 버퍼 주입
        const paperProgress = Math.min(1, Math.max(0, (scrollY - startTrigger) / 900));
        setPaperScrollProgress(paperProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3D 도트 지구 가동 엔진
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!globeContainerRef.current || !ctx) return;

    globeContainerRef.current.appendChild(canvas);
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = 2300; 
    const particles = [];
    let globeRadius = Math.min(width, height) * 0.38;

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

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      globeRadius = Math.min(width, height) * 0.38;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      rotationY += 0.0015 + mouseX * 0.08;
      rotationX += (mouseY - rotationX) * 0.05;

      const centerX = width * 0.68;
      const centerY = height * 0.45;

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
          ctx.arc(projX, projY, Math.max(0.6, 1.8 * scale), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflowX = 'unset';
      document.body.style.overflowY = 'unset';
      if (globeContainerRef.current) {
        globeContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  // 느리고 웅장하게 대각선 패널이 원래 각도(일자)로 수평 변환 정착되도록 가속도 마일스톤 제어
  const paperTranslateY = Math.max(0, 500 - paperScrollProgress * 500); 
  const paperRotation = -12 + (paperScrollProgress * 12); 

  return (
    <div style={{
      backgroundColor: '#2861fd', 
      color: '#ffffff', 
      minHeight: '100vh',
      boxSizing: 'border-box', 
      fontFamily: 'sans-serif',
      position: 'relative',
      padding: '180px 0 0 0', 
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
          opacity: isMounted ? Math.max(0.12, 1 - textScrollProgress * 1.5) : 0, 
          transition: 'opacity 0.2s ease-out',
        }}
      />

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>
        
        {/* ================= 상단 타이틀 및 비대칭 글로벌 비전 main 글귀 섹션 ================= */}
        <div style={{
          maxWidth: '680px', 
          marginBottom: '100px',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(25px)',
          transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <span style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '30px'  }}>
              KAQ GLOBAL CHALLENGE
            </span>
            <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)', marginLeft: '10px', marginTop: '30px' }}></span>
          </div>
          <h1 style={{ fontSize: '50px', fontWeight: '900', lineHeight: '1.25', letterSpacing: '-2px', margin: 0, color: '#ffffff', marginBottom: '60px' }}>
            경계를 넘어, <br />세계 표준으로 향하는 이노베이션
          </h1>
          <p style={{ fontSize: '17px', color: '#f0f4ff', opacity: 0.9, lineHeight: '1.8', margin: '28px 0 0 0', wordBreak: 'keep-all' }}>
            KAQ는 독보적인 사실 기반 인공지능 기술과 DX 솔루션을 결합하여 글로벌 시장의 새로운 패러다임을 설계합니다. 세계 무대에서 검증받은 데이터 신뢰성으로 인류의 안전과 기술 주권을 수호합니다.
          </p>
        </div>
      </div>

      {/* ================= 스크롤바가 내려가는 동안 화면 중앙에 완벽 고립되어 물드는 텍스트 구간 ================= */}
      <div ref={textTrackRef} style={{ height: '1400px', position: 'relative', margin: '0', zIndex: 2 }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center', 
          padding: '0 40px',
          maxWidth: '1300px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
          <div style={{ maxWidth: '1080px', width: '100%' }}>
            <p style={{ 
              fontSize: '44px', 
              fontWeight: '700', 
              lineHeight: '1.65', 
              letterSpacing: '-1.5px',
              wordBreak: 'keep-all',
              margin: 0
            }}>
              {textWords.map((word, index) => {
                // 단어별 정확한 상대 가중 임계점 수식 대조
                const wordThreshold = index / textWords.length;
                const isLit = textScrollProgress >= wordThreshold;

                return (
                  <span 
                    key={index}
                    style={{
                      color: isLit ? '#ffffff' : 'rgba(255, 255, 255, 0.22)', 
                      textShadow: isLit ? '0 0 20px rgba(255,255,255,0.45)' : 'none', 
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'inline-block',
                      marginRight: '15px'
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>

      {/* ================= 영어 문장이 다 켜지면 그제서야 대각선에서 진입하여 일직선 평면 완착하는 프리미엄 대시보드 존 ================= */}
      <div ref={paperTrackRef} style={{ position: 'relative', width: '100%', boxSizing: 'border-box', zIndex: 5 }}>
        <div style={{
          width: '100vw',
          backgroundColor: '#ffffff', 
          boxShadow: '0 -40px 80px rgba(0, 0, 0, 0.08)',
          transformOrigin: 'left top', // 사선 종이 넘김 축의 중심 정렬 규격
          transform: `translateY(${paperTranslateY}px) rotate(${paperRotation}deg)`,
          transition: 'transform 0.18s cubic-bezier(0.1, 0.7, 0.15, 1)', 
          padding: '160px 40px 200px 40px',
          boxSizing: 'border-box'
        }}>
          
          <div style={{ maxWidth: '1300px', margin: '0 auto', boxSizing: 'border-box' }}>

            <div ref={paperTrackRef} style={{ position: 'relative', zIndex: 5, backgroundColor: '#ffffff', color: '#000', transformOrigin: 'left top', transform: `translateY(${paperTranslateY}px) rotate(${paperRotation}deg)`, transition: 'transform 0.2s ease', padding: '140px 60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '80px' }}>숫자로 입증하는 KAQ 글로벌 신뢰도</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ borderTop: '2px solid #000', paddingTop: '24px' }}>
                <div style={{ fontSize: '11px', color: '#718096', fontWeight: '800', marginBottom: '20px' }}>// {stat.label}</div>
                <div style={{ fontSize: '56px', fontWeight: '900', color: '#0052ff', marginBottom: '14px' }}>{stat.value}<span style={{fontSize: '18px', fontWeight: '600'}}>{stat.unit}</span></div>
                <p style={{ fontSize: '14px', color: '#2d3748', fontWeight: '600' }}>{stat.desc}</p>
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