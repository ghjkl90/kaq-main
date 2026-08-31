'use client';
import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function AboutPage() {

  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [careersVisible, setCareersVisible] = useState(false);
  

  // 각 섹션 이동을 위한 Ref 생성
  const topRef = useRef(null);
  const visionRef = useRef(null);
  const careersRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // 현재 활성화된 탭 상태
  const [activeTab, setActiveTab] = useState('기업소개');
  const tabs = [
    { name: '기업소개', ref: topRef },
    { name: '핵심가치', ref: visionRef },
    { name: '인재채용', ref: careersRef },
  ];

  // 탭 클릭 시 부드럽게 스크롤 이동하는 함수 (간격 룰 반영)
  const handleTabClick = (tabName, refObj) => {
    setActiveTab(tabName);
    if (refObj && refObj.current) {
      const offset = 100; // 상단 고정 네비게이션 여백 고려
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

  // 스크롤 위치에 따라 상단 탭 파란색 활성화 상태 자동 변경
  useEffect(() => {
    const handleScrollActiveTab = () => {
      const scrollPosition = window.scrollY + 250;

      const topEl = topRef.current;
      const visionEl = visionRef.current;
      const careersEl = careersRef.current;

      if (careersEl && scrollPosition >= careersEl.offsetTop) {
        setActiveTab('인재채용');
      } else if (visionEl && scrollPosition >= visionEl.offsetTop) {
        setActiveTab('핵심가치');
      } else if (topEl) {
        setActiveTab('기업소개');
      }
    };

    window.addEventListener('scroll', handleScrollActiveTab, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollActiveTab);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const leftObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLeftVisible(true);
    }, observerOptions);

    const rightObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRightVisible(true);
    }, observerOptions);

    const careersObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCareersVisible(true);
    }, observerOptions);

    if (leftRef.current) leftObserver.observe(leftRef.current);
    if (rightRef.current) rightObserver.observe(rightRef.current);
    if (careersRef.current) careersObserver.observe(careersRef.current);

    return () => {
      if (leftRef.current) leftObserver.unobserve(leftRef.current);
      if (rightRef.current) rightObserver.unobserve(rightRef.current);
      if (careersRef.current) careersObserver.unobserve(careersRef.current);
    };
  }, []);

  // ================= Careers 관련 상태 및 데이터 =================
  const jobOpenings = [
    { id: 1, title: '풀스택 개발자 (Full-Stack Developer)', type: '경력 3~5년 이상', location: 'Seoul, Korea (Hybrid)' },
    { id: 2, title: 'AI 개발자 (AI Research & Engineer)', type: '신입 / 경력', location: 'Seoul, Korea (Hybrid)' },
    { id: 3, title: '상시 인재 풀 (General Application)', type: '상시 채용', location: 'Seoul, Korea' },
  ];

  // 상단 카운트 계산
  const totalCount = jobOpenings.length;
  const newcomerCount = jobOpenings.filter(job => job.type.includes('신입')).length;
  const careerCount = jobOpenings.filter(job => job.type.includes('경력')).length;
  const alwaysCount = jobOpenings.filter(job => job.type.includes('상시')).length;

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleOpenApply = (jobTitle) => {
    setSelectedJob(jobTitle);
    setIsApplyOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !birthDate || !nationality) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    const templateParams = {
      job_title: selectedJob,
      user_name: name,
      user_birth: birthDate,
      user_nationality: nationality,
      file_url: fileLink || '첨부된 링크 없음',
    };

    emailjs.send('service_jz546gh', 'template_mn5mvrd', templateParams, 'vyRLXyXzHI1yh7Z0m')
    .then(() => {
       alert('지원서가 성공적으로 제출되었습니다!');
       setIsApplyOpen(false);
       setName(''); setBirthDate(''); setNationality(''); setFileLink('');
    })
    .catch((err) => {
       alert('제출 중 오류가 발생했습니다.');
       console.error(err);
    });
  };

  return (
    <div ref={topRef} style={{ backgroundColor: '#fff', color: '#111', padding: '140px 20px 120px 20px', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* 💡 Our Vision 섹션 전용 모바일 반응형 스타일 */}
      <style>{`
        .vision-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: start;
        }
        .vision-img-container {
          position: relative;
          width: 100%;
          height: 520px;
          margin: 0;
          overflow: hidden;
          border-radius: 12px;
        }
        @media (max-width: 900px) {
          .vision-wrapper {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .vision-img-container {
            height: 320px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ================= [기업소개 섹션] 상단 구조 ================= */}
        <div style={{ marginBottom: '0px' }}>
          
          {/* 1. 상단 대표 타이틀 영역 */}
          <div style={{ marginBottom: '40px' }}>
            <span style={{ fontSize: '13px', color: '#0052ff', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '16px', textTransform: 'uppercase' }}>
              Company Introduction
            </span>
            <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.35', letterSpacing: '-2px', color: '#111', margin: 0 }}>
              KAQ (Korea Academy for Quality), <br />
              한국의 탁월한 AI 적용과 안전품질 기술을 <br />
              글로벌 시장으로 전파하고자 합니다.
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
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80" 
              alt="Visual Showcase" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45,
                mixBlendMode: 'luminosity'
              }}
            />
          </div>
        </div>

        {/* ================= [핵심가치 (Our Vision) 섹션] ================= */}
        <div ref={visionRef} style={{ scrollMarginTop: '120px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '120px 0 60px 0' }} />
          
          <div className="vision-wrapper">
            
            <div 
              ref={leftRef}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '50px',
                opacity: leftVisible ? 1 : 0,
                transform: leftVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              <div style={{ padding: '0 4px' }}>
                <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#0052ff', margin: '0 0 24px 0', letterSpacing: '-1px' }}>
                  Our Vision
                </h3>
                <p style={{ color: '#333', fontSize: '16px', fontWeight: '500', lineHeight: '1.85', margin: 0, wordBreak: 'keep-all' }}>
                  AI 프롬프트 저작권과 공간안전품질 대시보드를 통해서 새로운 가치를 공유합니다.
                  <br />
                  <span style={{ color: '#666', fontWeight: '400' }}>AI로 세계의 평화와 고품질 문화를 지향합니다.</span>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '4px', borderTop: '1px solid #f0f0f0', paddingTop: '30px' }}>
                <p style={{ color: '#111', fontSize: '18px', fontWeight: '700', lineHeight: '1.65', margin: 0, wordBreak: 'keep-all' }}>
                  KAQ는 고객과 함께 새로운 가치를 만드는 데 도전합니다. 고객의 AI 저작권과 안전품질 대시보드 가치를 보호합니다.
                </p>
                <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.8', margin: 0, wordBreak: 'keep-all' }}>
                  모두의 AI 시대입니다. AI를 사용하는 것은 큰 가치가 없습니다. 적재적소에 얼마나 가치 있는 프롬프트를 제시할 수 있는가가 본질입니다. AI로 무엇을 어떻게 대화하면 언제 어떤 결과를 얻을 수 있는지를 체험하고 그 권리를 인정해야 합니다. 당신의 AI 가치를 인정받으시기 바랍니다.
                </p>
              </div>
            </div>

            <div 
              ref={rightRef}
              className="vision-img-container"
              style={{ 
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" 
                alt="KAQ Architecture" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* ================= [인재채용 섹션] ================= */}
        <div 
          ref={careersRef}
          style={{
            position: 'relative',
            opacity: careersVisible ? 1 : 0,
            transform: careersVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)',
            scrollMarginTop: '120px'
          }}
        >
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '120px 0 60px 0' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Our Vision과 동일하게 파란색 포인트 적용된 Careers 타이틀 */}
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-1px', color: '#0052ff' }}>
                Careers
            </h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', marginBottom: '30px', maxWidth: '800px' }}>
              KAQ와 함께 디지털 혁신을 이끌어갈 인재를 모십니다. 오픈된 포지션 중 본인에게 적합한 역할이 없다면, 
              &quot;상시 인재 풀&quot;을 통해 이력서를 제출해 주시기 바랍니다. 적합한 포지션이 열릴 시 우선적으로 검토됩니다.
            </p>

            {/* 레퍼런스 스타일의 상단 카운트 바 */}
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '24px', display: 'flex', gap: '16px' }}>
              <span>전체 <strong style={{ color: '#111' }}>{totalCount}</strong></span>
              <span>신입 <strong style={{ color: '#111' }}>{newcomerCount}</strong></span>
              <span>경력 <strong style={{ color: '#111' }}>{careerCount}</strong></span>
              <span>상시 <strong style={{ color: '#111' }}>{alwaysCount}</strong></span>
            </div>

            <hr style={{ border: 'none', borderTop: '3px solid #eee', margin: '30px 0 0 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {jobOpenings.map((job) => {
                const isHovered = hoveredCardId === job.id;

                return (
                  <div 
                    key={job.id} 
                    onMouseEnter={() => setHoveredCardId(job.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => handleOpenApply(job.title)}
                    style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '32px 0',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: isHovered ? '#fafafa' : 'transparent',
                      paddingLeft: isHovered ? '12px' : '0px',
                      paddingRight: isHovered ? '12px' : '0px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: '#888', fontWeight: '500' }}>
                        {job.location} · {job.type}
                      </span>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0', color: '#111', letterSpacing: '-0.5px' }}>
                        {job.title}
                      </h3>
                    </div>
                    
                    {/* 우측 원형 화살표 버튼 */}
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '1px solid',
                      borderColor: isHovered ? '#0052ff' : '#ddd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isHovered ? '#0052ff' : '#fff',
                      color: isHovered ? '#fff' : '#111',
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ================= 지원하기 모달 팝업 ================= */}
      {isApplyOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'relative', color: '#111' }}>
            <button onClick={() => setIsApplyOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', backgroundColor: 'transparent', fontSize: '24px', cursor: 'pointer', color: '#888' }}>&times;</button>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#0052ff' }}>Application</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>지원 직군: <strong>{selectedJob}</strong></p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>성명 *</label>
                <input type="text" required placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>생년월일 *</label>
                <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px', fontFamily: 'sans-serif' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>국적 *</label>
                <input type="text" required placeholder="대한민국" value={nationality} onChange={(e) => setNationality(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>이력서 / 포트폴리오 링크 주소</label>
                <input type="url" placeholder="구글 드라이브, 노션 등 공유 링크 주소를 넣어주세요." value={fileLink} onChange={(e) => setFileLink(e.target.value)} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#0052ff', color: '#fff', border: 'none', borderRadius: '4px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s' }}>지원서 제출하기</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}