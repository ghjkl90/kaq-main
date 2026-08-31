'use client';

import { useState, useEffect, useRef } from 'react';
import { Radio, ChevronDown, Activity, Cpu, ShieldCheck, ArrowLeft, ArrowUpRight, CheckCircle, CheckCircle2, Store, School, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function DSQPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introRatio, setIntroRatio] = useState(0);
  const [summaryRatio, setSummaryRatio] = useState(0);

  const introRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(totalH > 0 ? Math.min(1, Math.max(0, current / totalH)) : 0);

      if (introRef.current) {
        const rect = introRef.current.getBoundingClientRect();
        const introTotal = introRef.current.offsetHeight - window.innerHeight;
        const passed = -rect.top;
        setIntroRatio(introTotal > 0 ? Math.max(0, Math.min(1, passed / introTotal)) : 0);
      }

      if (summaryRef.current) {
        const rect = summaryRef.current.getBoundingClientRect();
        const summaryTotal = summaryRef.current.offsetHeight - window.innerHeight;
        const passed = -rect.top;
        setSummaryRatio(summaryTotal > 0 ? Math.max(0, Math.min(1, passed / summaryTotal)) : 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRange = (val, inMin, inMax, outMin, outMax) => {
    if (val < inMin) return outMin;
    if (val > inMax) return outMax;
    return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
  };

  // Intro 시퀀스 문구 연출
  const seq1Op = introRatio < 0.35 ? getRange(introRatio, 0.0, 0.15, 1, 1) : getRange(introRatio, 0.25, 0.35, 1, 0);
  const seq1Y = introRatio < 0.35 ? getRange(introRatio, 0.0, 0.15, 0, 0) : getRange(introRatio, 0.25, 0.35, 0, -50);

  const seq2Op = introRatio < 0.68 ? getRange(introRatio, 0.35, 0.48, 0, 1) : getRange(introRatio, 0.58, 0.68, 1, 0);
  const seq2Y = introRatio < 0.68 ? getRange(introRatio, 0.35, 0.48, 40, 0) : getRange(introRatio, 0.58, 0.68, 0, -50);

  const seq3Op = getRange(introRatio, 0.68, 0.85, 0, 1);
  const seq3Y = getRange(introRatio, 0.68, 0.85, 40, 0);

  // Spot 핀 연출
  const spot1Op = summaryRatio < 0.4 ? getRange(summaryRatio, 0.05, 0.2, 0, 1) : getRange(summaryRatio, 0.3, 0.4, 1, 0);
  const spot2Op = summaryRatio < 0.72 ? getRange(summaryRatio, 0.4, 0.55, 0, 1) : getRange(summaryRatio, 0.62, 0.72, 1, 0);
  const spot3Op = getRange(summaryRatio, 0.72, 0.88, 0, 1);

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'Pretendard, -apple-system, sans-serif', width: '100%', overflowX: 'hidden' }}>
      
      {/* 상단 스티키 프로그레스 바 */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: 'blur(16px)', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0052cc', textDecoration: 'none', fontSize: '15px', fontWeight: 700 }}>
            <ArrowLeft size={18} /> KAQ 홈으로
          </Link>
          <div style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px', color: '#0f172a' }}>
            DSQ <span style={{ color: '#0052cc' }}>PLATFORM</span>
          </div>
          <a href="#lineup" style={{ backgroundColor: '#0052cc', color: '#ffffff', padding: '9px 24px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 14px rgba(0, 82, 204, 0.25)' }}>
            제품 라인업
          </a>
        </div>
        <div style={{ width: '100%', height: '3px', backgroundColor: '#e2e8f0' }}>
          <div style={{ width: `${scrollProgress * 100}%`, height: '100%', backgroundColor: '#0052cc', transition: 'width 0.1s ease-out' }} />
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#070d19', color: '#ffffff' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(0, 82, 204, 0.45) 0%, rgba(7, 13, 25, 0.95) 75%)',
            transform: `scale(${1 + scrollProgress * 0.25})`,
            transition: 'transform 0.1s ease-out',
            zIndex: 1,
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '880px', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '100px', backgroundColor: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#8fb4ff', fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>
            <Radio size={16} /> DIGITAL SAFETY & QUALITY STANDARD
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-2px', margin: '0 0 24px 0' }}>
            공간의 안전품질을 <br />
            <span style={{ color: '#8fb4ff' }}>디지털로 실시간 공유하다</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 auto 40px auto', maxWidth: '640px', wordBreak: 'keep-all' }}>
            성균관대학교 스마트품질연구실이 개발한 국내 최초 AI 센싱 & 몬드리안 시각화 기반 디지털 안전품질 표준 대시보드
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#8fb4ff', fontSize: '13px', fontWeight: 700 }}>
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={20} />
          </div>
        </div>
      </section>

      {/* 2. 2단 분할 핵심 특장점 */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '140px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ color: '#0052cc', fontSize: '14px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>CORE ADVANTAGE</span>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', margin: '12px 0 0 0', letterSpacing: '-1px' }}>
            기술과 예술의 융합, 과학적 안전 관리
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
          {/* Card 1: 몬드리안 시각화 */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '48px 36px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ height: '220px', backgroundColor: '#f1f5f9', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', position: 'relative', overflow: 'hidden', border: '2px solid #0f172a' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '60%', backgroundColor: '#ef4444', borderRight: '4px solid #0f172a', borderBottom: '4px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px' }}>위험 지수</div>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '40%', backgroundColor: '#3b82f6', borderBottom: '4px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px' }}>실시간 농도</div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60%', height: '40%', backgroundColor: '#ffffff', borderRight: '4px solid #0f172a' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '60%', backgroundColor: '#22c55e', borderTop: '4px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '14px' }}>안전 상태</div>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              몬드리안 기반 <span style={{ color: '#0052cc' }}>시각화 대시보드</span>
            </h3>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.6, margin: 0, wordBreak: 'keep-all' }}>
              공포감을 조성하지 않는 예술적 몬드리안 블록 배치를 통해 다중이용시설 방문객 누구나 한눈에 직관적으로 안전품질 지수를 확인합니다.
            </p>
          </div>

          {/* Card 2: 4대 HOPE & 개인정보보호 */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '48px 36px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}>
            <div style={{ height: '220px', backgroundColor: '#eef4ff', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px', border: '1px solid #c7d9fe' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '100px', fontWeight: 700, color: '#0052cc', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>화재/가스 감지</span>
                <span style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '100px', fontWeight: 700, color: '#0052cc', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>인구밀집도</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '100px', fontWeight: 700, color: '#0052cc', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>소음/공기질</span>
                <span style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '100px', fontWeight: 700, color: '#0052cc', fontSize: '13px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>사생활 얼굴 비식별화</span>
              </div>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              4대 HOPE 위해요인 & <span style={{ color: '#0052cc' }}>프라이버시 보호</span>
            </h3>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.6, margin: 0, wordBreak: 'keep-all' }}>
              사생활 침해 없는 인공지능 비식별화 센싱으로 감시 적대감을 해소하고, 법규와 환경 표준에 맞춘 4대 위해요인을 실시간 방어합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 제품 라인업 비교 */}
      <section id="lineup" style={{ backgroundColor: '#f1f5f9', padding: '140px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: '#0052cc', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>LINEUP</span>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', margin: '12px 0 0 0', letterSpacing: '-1px' }}>
              공간과 목적에 맞춤화된 DSQ-M 라인업
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {[
              {
                type: 'MTP (Public)',
                target: '공공시설 및 대형시설',
                badge: '스탠다드 키오스크',
                points: ['안전품질 수준 실시간 공유', '모바일 장비 위치 및 동선 확인', '비상 이슈 발생 시 경고 알림 전송'],
              },
              {
                type: 'MTC (Customer)',
                target: '다중이용시설 & 스쿨존',
                badge: '맞춤형 사이니지',
                points: ['예술적 몬드리안 감성 디자인', '학생/보호자 안심 알림 서비스', '실시간 인구 과밀 및 보행안전 감지'],
              },
              {
                type: 'MTS (Site)',
                target: '작업현장 및 임시공간',
                badge: '현장관리 포터블',
                points: ['현장 이동식 간편 설치 지원', '중대재해처벌법 대응 지수 관리', '작업 관리자 전용 모바일 연동'],
              },
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '40px 32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'inline-block', backgroundColor: '#ebf3ff', color: '#0052cc', fontSize: '13px', fontWeight: 700, padding: '6px 14px', borderRadius: '100px', marginBottom: '20px' }}>
                    {item.badge}
                  </div>
                  <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0' }}>{item.type}</h3>
                  <p style={{ color: '#64748b', fontSize: '15px', fontWeight: 600, marginBottom: '28px' }}>{item.target}</p>
                  
                  <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#334155', lineHeight: 1.5 }}>
                        <CheckCircle size={18} color="#0052cc" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
                  <a href="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px 0', borderRadius: '12px', backgroundColor: '#0f172a', color: '#ffffff', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
                    도입 사양 문의 <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 개발 스토리 & 실증 사례 */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '140px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ color: '#0052cc', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>STORY & EVIDENCE</span>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', margin: '12px 0 0 0', letterSpacing: '-1px' }}>
              현장 중심 실증과 데이터 기반 검증
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {[
            {
              icon: <Store size={28} color="#0052cc" />,
              title: '전통시장 실시간 화재 예방',
              desc: '점포별 센서 연계와 디지털 사이니지 공유를 통해 상인회-소방서-지자체를 실시간 연결합니다.',
            },
            {
              icon: <School size={28} color="#0052cc" />,
              title: '스쿨존 및 안심거리 구축',
              desc: '교육청 및 지자체 정책과 연계하여 보행 과밀 및 사각지대 위험을 학부모에게 실시간 알림 전송합니다.',
            },
            {
              icon: <Building2 size={28} color="#0052cc" />,
              title: '지하주차장 & 아파트 안전품질',
              desc: '아파트 관리주체와 소방 당국을 연동하여 전기차 충전 구역 등 취약 공간의 질적 지수를 자동 모니터링합니다.',
            },
          ].map((story, sIdx) => (
            <div key={sIdx} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '36px 30px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: '#ebf3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                {story.icon}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>{story.title}</h3>
              <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>{story.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 360 뷰 & 마키 텍스트 패스 */}
      <section style={{ backgroundColor: '#070d19', padding: '120px 0', position: 'relative', overflow: 'hidden', color: '#ffffff' }}>
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', opacity: 0.08, fontSize: '140px', fontWeight: 900, pointerEvents: 'none', width: '100%', display: 'flex', gap: '60px' }}>
          <span>DSQ DIGITAL TWIN SENSING</span>
          <span>OPEN QUALITY STANDARD</span>
          <span>DSQ PLATFORM</span>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
          <span style={{ color: '#8fb4ff', fontSize: '14px', fontWeight: 800, letterSpacing: '2px' }}>DIGITAL TWIN SIMULATION</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, margin: '16px 0 24px 0', letterSpacing: '-1px' }}>
            센서 최적화 알고리즘으로 <br />
            비용은 줄이고 정확도는 극대화
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 40px auto' }}>
            공간의 3차원 디지털 트윈을 선제적으로 구현하여 측정 정확도와 관리 비용의 쌍대 목표를 과학적으로 달성합니다.
          </p>
          <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0052cc', color: '#ffffff', padding: '16px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', boxShadow: '0 10px 30px rgba(0, 82, 204, 0.4)' }}>
            플랫폼 컨설팅 신청하기 <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

    </div>
  );
}
