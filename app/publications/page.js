'use client';
import React, { useEffect, useState } from 'react';

export default function PublicationsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const papers = [
    {
      year: '2026',
      title: '스마트 환경에서의 딥러닝 기반 공간 최적화 연구',
      originalTitle: 'Deep Learning-Based Spatial Optimization in Smart Environments',
      authors: '임정은, 홍길동',
      journal: 'IEEE Transactions on Smart Cities',
      type: 'Journal', // 저널 구분용 배지
    },
    {
      year: '2025',
      title: '대규모 데이터를 위한 웹 기반 3D 인터랙티브 그래픽스 아키텍처',
      originalTitle: 'Web-Based 3D Interactive Graphics Architecture for Large-Scale Data',
      authors: '홍길동, 이영희',
      journal: 'ACM Web3D Conference',
      type: 'Conference',
    },
    {
      year: '2024',
      title: '디지털 트윈 프레임워크에서의 품질 관리 체계 구축 연구',
      originalTitle: 'Quality Management Framework in Digital Twin Frameworks',
      authors: '임정은, 이영희',
      journal: 'International Journal of Production Research',
      type: 'Journal',
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
          <span style={{ fontSize: '13px', color: '#888', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>학술 연구 성과</span>
          <h1 style={{ fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px', margin: 0, color: '#111' }}>
            Publications
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
                if (titleEl) titleEl.style.color = '#0052ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = '0px';
                const titleEl = e.currentTarget.querySelector('.paper-title');
                if (titleEl) titleEl.style.color = '#111';
              }}
            >
              {/* 왼쪽: 연도 표시 영역 */}
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

              {/* 오른쪽: 상세 논문 정보 카드 영역 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {/* 논문 형태 구분용 디자인 배지 */}
                  <span style={{ 
                    backgroundColor: paper.type === 'Journal' ? '#eef2ff' : '#fef3c7', 
                    color: paper.type === 'Journal' ? '#0052ff' : '#d97706', 
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

                {/* 국문 논문명 (마우스 호버 시 블루로 전환) */}
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

                {/* 영문 원문명 (작은 글씨로 병기하여 디자인 밀도 조절) */}
                <span style={{ fontSize: '13px', color: '#888', fontStyle: 'italic', display: 'block', lineHeight: '1.4' }}>
                  "{paper.originalTitle}"
                </span>

                {/* 저자 목록 */}
                <div style={{ fontSize: '14px', color: '#555', marginTop: '4px' }}>
                  저자: <strong style={{ color: '#333' }}>{paper.authors}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}