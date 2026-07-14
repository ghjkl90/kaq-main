'use client';
import React, { useEffect, useState } from 'react';

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  return (
    <div style={{ backgroundColor: '#fff', color: '#111', padding: '100px 20px 80px 20px', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '60px', 
          marginBottom: '100px',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
        }}>
          {/* 좌측 거대 타이틀 및 Vision 텍스트 섹션 */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>연구소 소개</span>
              <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.3', letterSpacing: '-2px', color: '#111', margin: '0 0 40px 0' }}>
                이제 KAQ에서도 <br />
                수준 높은 공간 패러다임을 <br />
                경험할 수 있습니다.
              </h1>
            </div>
            
            {/* Our Vision 내용 */}
            <div style={{ borderTop: '2px solid #111', paddingTop: '30px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0052ff', marginBottom: '14px' }}>Our Vision</h2>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>
                KAQ는 디지털 트랜스포메이션 시대의 품질 관리 및 공간 최적화 분야를 선도하는 연구소입니다. 
                최첨단 AI 기술과 데이터 사이언스를 융합하여 인류의 삶의 질을 높이고 효율적인 비즈니스 환경을 설계합니다.
              </p>
            </div>
          </div>

          {/* 우측 실사 이미지 및 Director Message 섹션 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ paddingLeft: '10px' }}>
              <p style={{ color: '#111', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.6', marginBottom: '16px' }}>
                KAQ 연구소는 다양한 도메인에서 쌓아온 폭넓은 데이터를 바탕으로 미래 인프라 시장에 진출했습니다.
              </p>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                학문적 탁월함을 넘어, 실제 산업 현장과 사회를 변화시키는 기술을 연구합니다. 
                국내외 최고 수준의 연구원들과 함께 독창적인 미학, 최첨단 시뮬레이션 방식, 그리고 고품질 자재 표준을 통하여 국제 기준에 부합하는 프로젝트를 개발합니다.
              </p>
            </div>

            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '420px', 
              overflow: 'hidden',
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
              borderRadius: '12px 12px 0 12px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" // 현대적인 유리 빌딩/연구소 외관
                alt="KAQ Architecture" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* 대형 와이드 구분선 */}
        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '80px 0' }} />

        {/* ================= 2. 하단: 곡선 컷팅 프로필 & 링크드인 레이아웃 (2번 이미지 완벽 재현) ================= */}
        <div style={{
          position: 'relative',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.3s'
        }}>
          <div style={{ position: 'absolute', top: '60px', left: '-40px', width: '120px', height: '200px', backgroundColor: '#5887f6', opacity: 0.15, borderRadius: '0 100px 100px 0', zIndex: 0, pointerEvents: 'none' }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>Key Members</h2>
            <div style={{ fontSize: '14px', color: '#888', marginBottom: '50px' }}>미래를 설계하는 핵심 연구진을 소개합니다.</div>

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
                    // 하단 모서리를 둥글면서 날카롭게 대칭 깎아내는 고급 클립패스 문법
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
                        filter: 'contrast(1.05) brightness(0.95)' // 선명하고 묵직한 프로필 톤 세팅
                      }}
                    />
                  </div>

                  {/* 이름 및 직책 기술 */}
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

      </div>
    </div>
  );
}