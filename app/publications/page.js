'use client';
import React, { useEffect, useState } from 'react';

export default function PublicationsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const papers = [
    {
      year: '2025',
      title: '프롬프트 난이도 조절을 통한 맞춤형 AI 학습 제공 시스템 및 방법',
      originalTitle: 'SYSTEM AND METHOD OF PROVIDING CUSTOMIZED ARTIFICIAL INTELLIGENCE LEARNING BY ADJUSTING PROMPT DIFFICULTY',
      authors: '신완선, 신니나, 진보환, 이정진',
      journal: '특허출원 (특허-2025-0196159)',
      type: 'Patent',
    },
    {
      year: '2025',
      title: '품질척도 통합 대시보드 시각화 시스템 및 방법',
      originalTitle: 'SYSTEM AND METHOD FOR VISUALIZING INTEGRATED QUALITY MEASURES DASHBOARD',
      authors: '신완선, 윤지영, 류혜린, 신지숙',
      journal: '특허출원 (특허-2025-0153697)',
      type: 'Patent',
    },
    {
      year: '2025',
      title: '공간품질 관리를 위한 디지털 트윈 기반 센서 배치 지원 장치 및 방법',
      originalTitle: 'APPARATUS AND METHOD OF SUPPORTING SENSOR ARRANGEMENT BASED ON DIGITAL TWIN FOR SPATIAL QUALITY MANAGEMENT',
      authors: '신완선, 송호준, 노혜영',
      journal: '특허출원 (특허-2025-0157432)',
      type: 'Patent',
    },
  ];

  return (
    <div style={{ backgroundColor: '#fff', color: '#111', padding: '100px 20px 80px 20px', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* 상단 타이틀 영역 */}
        <div style={{ 
          marginBottom: '60px',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.6s ease'
        }}>
          <span style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>지식재산 및 연구 성과</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', margin: 0, color: '#111' }}>
            Patents & Publications
          </h1>
          <div style={{ width: '40px', height: '4px', backgroundColor: '#0052ff', marginTop: '16px' }}></div>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          opacity: isMounted ? 1 : 0,
          transform: isMounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1) 0.2s'
        }}>
          {papers.map((paper, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                gap: '40px',
                padding: '30px 0',
                borderBottom: '1px solid #eee',
                alignItems: 'flex-start',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.paddingLeft = '10px';
                const titleEl = e.currentTarget.querySelector('.paper-title');
                if (titleEl) titleEl.style.color = '#0052ff'; // as HTMLElement 제거 완료
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = '0px';
                const titleEl = e.currentTarget.querySelector('.paper-title');
                if (titleEl) titleEl.style.color = '#111'; // as HTMLElement 제거 완료
              }}
            >
              <div style={{ width: '80px', flexShrink: 0 }}>
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: '800', 
                  color: '#0052ff', 
                  fontFamily: 'monospace',
                  letterSpacing: '-1px'
                }}>
                  {paper.year}
                </span>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ 
                    backgroundColor: paper.type === 'Patent' ? '#eef2ff' : '#fef3c7', 
                    color: paper.type === 'Patent' ? '#0052ff' : '#d97706', 
                    fontSize: '11px', 
                    fontWeight: 'bold', 
                    padding: '2px 8px', 
                    borderRadius: '4px' 
                  }}>
                    {paper.type}
                  </span>
                  <span style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>
                    {paper.journal}
                  </span>
                </div>

                {/* 국문 특허명 */}
                <h3 
                  className="paper-title"
                  style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    color: '#111', 
                    margin: 0, 
                    lineHeight: '1.4',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {paper.title}
                </h3>

                {/* 영문 특허명 */}
                <span style={{ fontSize: '13px', color: '#888', fontStyle: 'italic', display: 'block', lineHeight: '1.4' }}>
                  "{paper.originalTitle}"
                </span>


                <div style={{ fontSize: '14px', color: '#555', marginTop: '4px' }}>
                  발명자: <strong style={{ color: '#333' }}>{paper.authors}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}