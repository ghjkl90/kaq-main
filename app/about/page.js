'use client';
import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function AboutPage() {
  // 스크롤 감지 및 애니메이션 상태 제어
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [careersVisible, setCareersVisible] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const careersRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15, // 요소가 15% 이상 노출되었을 때 애니메이션 실행
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

  /* ==========================================
     [복구] Key Experts 관련 데이터 (주석 처리)
  ========================================== */
  /*
  const members = [
    {
      id: 1,
      name: '신완선',
      role: 'Director',
      desc: 'AI 기반 시스템 및 최적화 연구 총괄',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: '고재유',
      role: 'Senior Researcher',
      desc: '공간 분석 및 딥러닝 개발',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      name: '임정은',
      role: 'Lead AI Engineer',
      desc: '풀스택 아키텍처 및 플랫폼 설계',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
  ];
  */

  // ================= Careers 관련 상태 및 데이터 =================
  const jobOpenings = [
    { id: 1, title: '풀스택 개발자 (Full-Stack Developer)', type: '신입 / 경력', location: 'Seoul, Korea (Hybrid)' },
    { id: 2, title: 'AI 개발자 (AI Research & Engineer)', type: '신입 / 경력', location: 'Seoul, Korea (Hybrid)' },
    { id: 3, title: '상시 인재 풀 (General Application)', type: '상시 채용', location: 'Seoul, Korea' },
  ];

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

    emailjs.send('service_jz546gh', 'template_mn5mvrd', templateParams, 'YOUR_PUBLIC_KEY')
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
    <div style={{ backgroundColor: '#fff', color: '#111', padding: '160px 20px 100px 20px', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ================= 상단 소개 섹션 ================= */}
        <div style={{ marginBottom: '120px' }}>
          
          {/* 1. 메인 타이틀 (페이지 진입 시 자연스럽게 등장) */}
          <div style={{ 
            marginBottom: '80px', 
            borderBottom: '1px solid #eee', 
            paddingBottom: '40px',
            opacity: leftVisible || rightVisible ? 1 : 0,
            transform: leftVisible || rightVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
          }}>
            <span style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '18px', textTransform: 'uppercase' }}>회사 소개</span>
            <h1 style={{ fontSize: '44px', fontWeight: '800', lineHeight: '1.35', letterSpacing: '-2.5px', color: '#111', margin: 0, maxWidth: '1000px' }}>
              KAQ (Korea Academy for Quality), <br />
              한국의 탁월한 AI 적용과 안전품질 기술을 <br />
              글로벌 시장으로 전파하고자 합니다.
            </h1>
          </div>

          {/* 2. 하단 컨텐츠 그리드 (alignItems: 'start'로 상단 정렬 라인 일치) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
            gap: '70px',
            alignItems: 'start'
          }}>
            
            {/* [좌측] 비전 및 상세 메시지 섹션 (스크롤 시 왼쪽에서 오른쪽으로 등장) */}
            <div 
              ref={leftRef}
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '70px',
                opacity: leftVisible ? 1 : 0,
                transform: leftVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {/* 개선된 Our Vision */}
              <div style={{ padding: '0 4px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#0052ff', margin: '0 0 20px 0', letterSpacing: '-0.5px', display: 'inline-block', position: 'relative' }}>
                  Our Vision
                  <span style={{ position: 'absolute', bottom: '-6px', left: 0, width: '32px', height: '3px', backgroundColor: '#0052ff' }}></span>
                </h2>
                <p style={{ color: '#333', fontSize: '16px', fontWeight: '500', lineHeight: '1.85', margin: 0, paddingTop: '8px' }}>
                  AI 프롬프트 저작권과 공간안전품질 대시보드를 통해서 새로운 가치를 공유합니다.
                  <br />
                  <span style={{ color: '#666', fontWeight: '400' }}>AI로 세계의 평화와 고품질 문화를 지향합니다.</span>
                </p>
              </div>

              {/* Director Message 텍스트 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', paddingLeft: '4px', borderTop: '1px solid #f0f0f0', paddingTop: '35px' }}>
                <p style={{ color: '#111', fontSize: '18px', fontWeight: '700', lineHeight: '1.65', margin: 0, marginTop : '40px' }}>
                  KAQ는 고객과 함께 새로운 가치를 만드는 데 도전합니다. 고객의 AI 저작권과 안전품질 대시보드 가치를 보호합니다.
                </p>
                <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.8', margin: 0, marginTop : '5px' }}>
                  모두의 AI 시대입니다. AI를 사용하는 것은 큰 가치가 없습니다. 적재적소에 얼마나 가치 있는 프롬프트를 제시할 수 있는가가 본질입니다. AI로 무엇을 어떻게 대화하면 언제 어떤 결과를 얻을 수 있는지를 체험하고 그 권리를 인정해야 합니다. 당신의 AI 가치를 인정받으시기 바랍니다.
                </p>
              </div>
            </div>

            {/* [우측] 실사 이미지 섹션 (스크롤 시 오른쪽에서 왼쪽으로 등장) */}
            <div 
              ref={rightRef}
              style={{ 
                position: 'relative', 
                width: '100%', 
                height: '520px', 
                margin: 0,
                overflow: 'hidden',
                clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)',
                borderRadius: '16px 16px 0 16px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.06)',
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

        {/* 대형 와이드 구분선 */}
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '90px 0' }} />

        {/* ==========================================
           [주석 처리] Key Experts 섹션 (완벽 보존)
        ========================================== */}
        {/*
        <div style={{
          position: 'relative',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.3s'
        }}>
          <div style={{ position: 'absolute', top: '60px', left: '-40px', width: '120px', height: '200px', backgroundColor: '#5887f6', opacity: 0.15, borderRadius: '0 100px 100px 0', zIndex: 0, pointerEvents: 'none' }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>Key Experts</h2>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '50px' }}>당신의 AI 저작권을 평가하고 인증하는 전문가들입니다.</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {members.map((member) => (
                <div key={member.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  <div style={{ 
                    width: '100%', 
                    height: '360px', 
                    backgroundColor: '#f7f7f7',
                    overflow: 'hidden',
                    marginBottom: '20px',
                    position: 'relative',
                    clipPath: 'polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)',
                    borderRadius: '8px 8px 0 8px'
                  }}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'contrast(1.05) brightness(0.95)' 
                      }}
                    />
                  </div>

                  <div style={{ padding: '0 4px', borderBottom: '1px solid #ddd', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '19px', fontWeight: 'bold', color: '#111', margin: '0 0 6px 0' }}>{member.name}</h3>
                      <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>{member.role}</div>
                      <div style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>{member.desc}</div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
        */}

        {/* ==========================================
           Careers 인재 채용 섹션 (아래에서 부드럽게 솟아오르는 애니메이션)
        ========================================== */}
        <div 
          ref={careersRef}
          style={{
            position: 'relative',
            opacity: careersVisible ? 1 : 0,
            transform: careersVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {/* 장식용 배경 이펙트 */}
          <div style={{ position: 'absolute', top: '60px', left: '-40px', width: '120px', height: '200px', backgroundColor: '#5887f6', opacity: 0.1, borderRadius: '0 100px 100px 0', zIndex: 0, pointerEvents: 'none' }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', color: '#0052ff' }}>—</span> Careers
            </h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', marginBottom: '50px', maxWidth: '800px' }}>
              KAQ와 함께 디지털 혁신을 이끌어갈 인재를 모십니다. 오픈된 포지션 중 본인에게 적합한 역할이 없다면, 
              "상시 인재 풀"을 통해 이력서를 제출해 주시기 바랍니다. 적합한 포지션이 열릴 시 우선적으로 검토됩니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {jobOpenings.map((job) => {
                const isHovered = hoveredCardId === job.id;

                return (
                  <div 
                    key={job.id} 
                    onMouseEnter={() => setHoveredCardId(job.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{ 
                      border: '1px solid #e5e5e5', 
                      borderRadius: '4px', 
                      padding: '34px 24px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between',
                      height: '210px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: isHovered ? '0 15px 30px rgba(0,82,255,0.06)' : '0 2px 4px rgba(0,0,0,0.02)',
                      borderColor: isHovered ? '#111' : '#e5e5e5',
                      transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                      backgroundColor: '#fff'
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: '24px', right: '24px', opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(-10px)', transition: 'all 0.3s ease',
                      pointerEvents: 'none', display: 'flex', alignItems: 'center', fontWeight: '900', fontSize: '28px', color: '#111', letterSpacing: '-1px'
                    }}>
                      K<span style={{ color: '#0052ff', marginLeft: '2px' }}>.</span>
                    </div>

                    <div>
                      <span style={{ fontSize: '14px', color: '#888', display: 'block', marginBottom: '8px' }}>
                        {job.location} · {job.type}
                      </span>
                      <h3 style={{ fontSize: '19px', fontWeight: 'bold', margin: '0', color: '#111', lineHeight: '1.4', maxWidth: '80%' }}>
                        {job.title}
                      </h3>
                    </div>
                    
                    <button 
                      onClick={() => handleOpenApply(job.title)}
                      style={{ 
                        backgroundColor: isHovered ? '#111' : '#0052ff', color: '#fff', border: 'none', padding: '12px 32px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', width: 'fit-content', transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', alignSelf: 'flex-start',
                        clipPath: isHovered ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(15% 0%, 100% 0%, 100% 75%, 85% 100%, 0% 100%, 0% 25%)'
                      }}
                    >
                      지원하기 (Apply)
                    </button>
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