'use client';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function CareersPage() {
  const jobOpenings = [
    { id: 1, title: '풀스택 개발자 (Full-Stack Developer)', type: '신입 / 경력', location: 'Seoul, Korea (Hybrid)' },
    { id: 2, title: 'AI 개발자 (AI Research & Engineer)', type: '신입 / 경력', location: 'Seoul, Korea (Hybrid)' },
    { id: 3, title: 'UI/UX 디자이너 (Product Designer)', type: '신입 / 경력', location: 'Seoul, Korea (Hybrid)' },
    { id: 4, title: '상시 인재 풀 (General Application)', type: '상시 채용', location: 'Seoul, Korea' },
  ];

  // 모달 및 폼 상태 관리
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [fileLink, setFileLink] = useState('');

  // 마우스 호버 상태를 개별 카드로 관리하기 위한 상태
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

    emailjs.send(
      'service_jz546gh',     
      'template_mn5mvrd',    
      templateParams,
      'YOUR_PUBLIC_KEY' // 본인의 Public Key를 입력하세요
    )
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
    <div style={{ backgroundColor: '#fff', color: '#111', padding: '60px 20px', fontFamily: 'sans-serif', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 헤더 섹션 */}
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px', color: '#0052ff' }}>—</span> Careers
        </h1>
        <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', marginBottom: '40px', maxWidth: '800px' }}>
          KAQ와 함께 디지털 혁신을 이끌어갈 인재를 모십니다. 오픈된 포지션 중 본인에게 적합한 역할이 없다면, 
          "상시 인재 풀"을 통해 이력서를 제출해 주시기 바랍니다. 적합한 포지션이 열릴 시 우선적으로 검토됩니다.
        </p>

        {/* 채용 카드 그리드 */}
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
                  boxShadow: isHovered ? '0 10px 20px rgba(0,82,255,0.05)' : '0 2px 4px rgba(0,0,0,0.02)',
                  borderColor: isHovered ? '#111' : '#e5e5e5', // 카드 테두리도 블랙으로 자연스럽게 동기화
                  transition: 'all 0.3s ease'
                }}
              >
                {/* 우측 상단 회사 로고 애니메이션 컴포넌트 */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '900',
                  fontSize: '28px',
                  color: '#111', // 검은색 메인 로고 텍스트
                  letterSpacing: '-1px'
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
                    backgroundColor: isHovered ? '#111' : '#0052ff', // 블루였다가 블랙으로 반전
                    color: '#fff', 
                    border: 'none', 
                    padding: '12px 32px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    alignSelf: 'flex-start',
                    clipPath: isHovered 
                      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' 
                      : 'polygon(15% 0%, 100% 0%, 100% 75%, 85% 100%, 0% 100%, 0% 25%)'
                  }}
                >
                  지원하기 (Apply)
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 지원하기 모달 팝업 ================= */}
      {isApplyOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff', padding: '40px', borderRadius: '8px', width: '100%', maxWidth: '500px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)', position: 'relative', color: '#111'
          }}>
            <button 
              onClick={() => setIsApplyOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', backgroundColor: 'transparent', fontSize: '24px', cursor: 'pointer', color: '#888' }}
            >
              &times;
            </button>

            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#0052ff' }}>Application</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>지원 직군: <strong>{selectedJob}</strong></p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>성명 *</label>
                <input 
                  type="text" required placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>생년월일 *</label>
                <input 
                  type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px', fontFamily: 'sans-serif' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>국적 *</label>
                <input 
                  type="text" required placeholder="대한민국" value={nationality} onChange={(e) => setNationality(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>이력서 / 포트폴리오 링크 주소</label>
                <input 
                  type="url" placeholder="구글 드라이브, 노션 등 공유 링크 주소를 넣어주세요." value={fileLink} onChange={(e) => setFileLink(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  backgroundColor: '#0052ff', color: '#fff', border: 'none', borderRadius: '4px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', transition: 'background-color 0.2s'
                }}
              >
                지원서 제출하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}