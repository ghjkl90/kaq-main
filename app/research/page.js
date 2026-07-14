'use client';
import React, { useEffect, useState } from 'react';

export default function ResearchPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

const researches = [
    {
      id: 1,
      title: 'AI 기반 공간 레이아웃 최적화',
      desc: '딥러닝과 메타휴리스틱 알고리즘을 활용하여 공간 활용도를 극대화하는 자동 설계 기술을 연구합니다. 건축 구조적 제약 조건과 인간의 행동 패턴을 다각도로 분석하여 최적의 동선과 배치를 도출합니다.',
      tags: ['Deep Learning', 'Metaheuristics', 'Space Layout Optimization'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      direction: 'left',
    },
    {
      id: 2,
      title: '스마트 시티 및 품질 관리 시스템',
      desc: '도시 및 산업 단지에서 발생하는 방대한 시계열 데이터를 실시간으로 모니터링하고 가공합니다. AI 이상 징후 감지 모델을 결합하여 고신뢰성 안전 인프라와 지능형 가이드라인을 제공합니다.',
      tags: ['Smart City', 'Time-Series Data', 'Anomaly Detection'],
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      direction: 'right',
    },
    {
      id: 3,
      title: '인터랙티브 3D 그래픽스 & 시뮬레이션',
      desc: '웹 환경에서 수백만 개의 폴리곤으로 이루어진 대규모 3D 데이터를 매끄럽게 렌더링(Web Standard)합니다. 복잡한 물리 현상을 브라우저 환경에서 정밀하게 가상 예측하는 그래픽스 최적화를 수행합니다.',
      tags: ['Web Application', '3D Graphics', 'WebGL / WebGPU'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      direction: 'left',
    },
  ];

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', padding: '80px 20px', minHeight: '90vh', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 상단 타이틀 & 연구 비전 섹션 */}
        <div style={{ marginBottom: '60px'}}>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '-1px' }}>
            Research Areas
          </h1>
          <p style={{ color: '#aaa', fontSize: '18px', lineHeight: '1.7', maxWidth: '900px', margin: 0 }}>
            KAQ는 인공지능과 차세대 웹 그래픽스 기술을 융합하여 정밀한 공간 설계와 지능형 품질 제어 솔루션을 탐구합니다.
            <br />
            가상과 현실을 잇는 데이터 중심의 연구를 통해 산업 생태계의 패러다임을 주도합니다.
          </p>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            // stretch 속성으로 한 행에 있는 모든 카드의 세로 길이를 가장 긴 카드에 맞춰 통일합니다.
            alignItems: 'stretch' 
          }}
        >
          {researches.map((item) => {
            const initialTransform = item.direction === 'left' ? 'translateX(-50px)' : 'translateX(50px)';
            
            return (
              <div 
                key={item.id} 
                style={{ 
                  backgroundColor: '#111', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column', // 내부 요소를 위아래로 배치
                  position: 'relative',
                  border: '1px solid #222',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
                  
                  opacity: isMounted ? 1 : 0,
                  transform: isMounted ? 'translateX(0)' : initialTransform,
                  transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = '#0052ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#222';
                }}
              >
                {/* 상단 이미지 영역 */}
                <div style={{ height: '220px', position: 'relative', overflow: 'hidden', backgroundColor: '#222' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease' 
                    }} 
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>

                {/* 하단 텍스트 및 태그 영역 (flex: 1을 줘서 남은 카드 높이를 꽉 채우도록 설정) */}
                <div style={{ padding: '30px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '14px', color: '#fff', lineHeight: '1.4' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* 기술 태그 영역이 언제나 카드의 맨 밑바닥에 딱 붙게 고정됨 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {item.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          backgroundColor: '#222', 
                          color: '#0052ff', 
                          fontSize: '11px', 
                          fontWeight: 'bold', 
                          padding: '4px 10px', 
                          borderRadius: '20px',
                          border: '1px solid #333'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}