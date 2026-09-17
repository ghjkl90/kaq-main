'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

// ==========================================
// 4개 언어별 텍스트 데이터 사전 (KR / EN / JP / TH)
// ==========================================
const CONTENT = {
  KR: {
    heroBadge: 'Research & Innovation',
    heroTitle: [
      'KAQ는 인공지능과 DX에 기반하여',
      '가치 있는 연구혁신에 도전합니다.'
    ],
    tabNames: {
      research: '연구프로젝트',
      papers: '지식재산/성과'
    },
    researches: [
      {
        id: 1,
        title: '고객맞춤형 AI 프롬프트',
        titleEn: 'PROMPT',
        desc: '고객이 필요한 AI 프롬프트를 제공합니다. 대중모델, 자체모델, 개별모델을 만들어 AI 기술의 사유화를 연구합니다.',
        image: '/1.jpg'
      },
      {
        id: 2,
        title: '공간안전품질 대시보드',
        titleEn: 'SAFETY CLOCK',
        desc: '인간은 시간이 필요할 때 시계를 만들었습니다. 그럼에도 불구, 공간 안전이 중요한 현재 시점에 공간의 안전시계가 없습니다. 공간안전품질의 대시보드 표준화를 연구합니다.',
        image: '/2.jpg'
      },
      {
        id: 3,
        title: '디지털트윈 개발 및 구축',
        titleEn: 'DIGITAL TWIN',
        desc: 'AI는 센서를 기반으로 데이터 축적이 가능할 때 가장 효과적입니다. 측정(M), 추적(T), 연결(C), 통합(I)을 연구합니다. MTCI를 통해서만 미래의 신뢰를 확보할 수 있습니다.',
        image: '/3.jpg'
      }
    ],
    patentsTitle: '지식재산 및 연구 성과',
    patentsBadge: 'Patents & Publications',
    papers: [
      {
        id: 1,
        title: '프롬프트 난이도 조절을 통한 맞춤형 AI 학습 제공 시스템 및 방법',
        desc: '특허출원 (특허-2025-0196159) | SYSTEM AND METHOD OF PROVIDING CUSTOMIZED ARTIFICIAL INTELLIGENCE LEARNING'
      },
      {
        id: 2,
        title: '품질척도 통합 대시보드 시각화 시스템 및 방법',
        desc: '특허출원 (특허-2025-0153697) | SYSTEM AND METHOD FOR VISUALIZING INTEGRATED QUALITY MEASURES DASHBOARD'
      },
      {
        id: 3,
        title: '공간품질 관리를 위한 디지털 트윈 기반 센서 배치 지원 장치 및 방법',
        desc: '특허출원 (특허-2025-0157432) | APPARATUS AND METHOD OF SUPPORTING SENSOR ARRANGEMENT BASED ON DIGITAL TWIN'
      }
    ]
  },
  EN: {
    heroBadge: 'Research & Innovation',
    heroTitle: [
      'Empowered by AI and DX,',
      'KAQ Pioneers High-Value Research Innovations.'
    ],
    tabNames: {
      research: 'Research Projects',
      papers: 'IP & Publications'
    },
    researches: [
      {
        id: 1,
        title: 'Customized AI Prompts',
        titleEn: 'PROMPT',
        desc: 'Delivering tailored AI prompts to meet unique client needs. We explore proprietary AI application frameworks across foundational, proprietary, and individualized models.',
        image: '/1.jpg'
      },
      {
        id: 2,
        title: 'Spatial Safety Quality Dashboard',
        titleEn: 'SAFETY CLOCK',
        desc: 'Humanity created clocks when time became essential. Yet, despite the critical importance of spatial safety today, a universal safety clock has been missing. We standardize spatial safety dashboards.',
        image: '/2.jpg'
      },
      {
        id: 3,
        title: 'Digital Twin Development & Implementation',
        titleEn: 'DIGITAL TWIN',
        desc: 'AI thrives on robust sensor-driven data accumulation. We pioneer MTCI: Measure (M), Trace (T), Connect (C), and Integrate (I) to build verifiable trust for the future.',
        image: '/3.jpg'
      }
    ],
    patentsTitle: 'Intellectual Property & Publications',
    patentsBadge: 'Patents & Publications',
    papers: [
      {
        id: 1,
        title: 'System and Method for Providing Customized AI Learning Through Prompt Difficulty Adjustment',
        desc: 'Patent Pending (KR 2025-0196159) | SYSTEM AND METHOD OF PROVIDING CUSTOMIZED ARTIFICIAL INTELLIGENCE LEARNING'
      },
      {
        id: 2,
        title: 'Integrated Quality Metrics Dashboard Visualization System and Method',
        desc: 'Patent Pending (KR 2025-0153697) | SYSTEM AND METHOD FOR VISUALIZING INTEGRATED QUALITY MEASURES DASHBOARD'
      },
      {
        id: 3,
        title: 'Digital Twin-Based Sensor Arrangement Support Apparatus and Method for Spatial Quality Management',
        desc: 'Patent Pending (KR 2025-0157432) | APPARATUS AND METHOD OF SUPPORTING SENSOR ARRANGEMENT BASED ON DIGITAL TWIN'
      }
    ]
  },
  JP: {
    heroBadge: 'Research & Innovation',
    heroTitle: [
      'KAQは人工知能とDXを基盤に、',
      '価値ある研究イノベーションに挑戦します。'
    ],
    tabNames: {
      research: '研究プロジェクト',
      papers: '知的財産・研究成果'
    },
    researches: [
      {
        id: 1,
        title: '顧客オーダーメイド型AIプロンプト',
        titleEn: 'PROMPT',
        desc: '顧客に必要なAIプロンプトを提供します。汎用モデル、独自モデル、個別モデルを構築し、AI技術の実用化・専有化を研究します。',
        image: '/1.jpg'
      },
      {
        id: 2,
        title: '空間安全品質ダッシュボード',
        titleEn: 'SAFETY CLOCK',
        desc: '人類は時間が必要なときに時計を創り出しました。空間安全が極めて重要な今日、空間のための「安全時計」が存在しません。空間安全品質ダッシュボードの標準化を推進します。',
        image: '/2.jpg'
      },
      {
        id: 3,
        title: 'デジタルツインの開発および構築',
        titleEn: 'DIGITAL TWIN',
        desc: 'AIはセンサーに基づくデータ蓄積が可能なときに真価を発揮します。測定(M)・追跡(T)・接続(C)・統合(I)のMTCI体系を通じて未来の信頼を確立します。',
        image: '/3.jpg'
      }
    ],
    patentsTitle: '知的財産および研究成果',
    patentsBadge: 'Patents & Publications',
    papers: [
      {
        id: 1,
        title: 'プロンプト難易度調整によるオーダーメイド型AI学習提供システムおよび方法',
        desc: '特許出願 (特許-2025-0196159) | SYSTEM AND METHOD OF PROVIDING CUSTOMIZED ARTIFICIAL INTELLIGENCE LEARNING'
      },
      {
        id: 2,
        title: '品質指標統合ダッシュボード可視化システムおよび方法',
        desc: '特許出願 (特許-2025-0153697) | SYSTEM AND METHOD FOR VISUALIZING INTEGRATED QUALITY MEASURES DASHBOARD'
      },
      {
        id: 3,
        title: '空間品質管理のためのデジタルツインベースセンサー配置支援装置および方法',
        desc: '特許出願 (特許-2025-0157432) | APPARATUS AND METHOD OF SUPPORTING SENSOR ARRANGEMENT BASED ON DIGITAL TWIN'
      }
    ]
  },
  TH: {
    heroBadge: 'Research & Innovation',
    heroTitle: [
      'KAQ มุ่งมั่นสร้างสรรค์นวัตกรรมการวิจัยที่มีคุณค่า',
      'โดยขับเคลื่อนด้วย AI และ Digital Transformation'
    ],
    tabNames: {
      research: 'โครงการวิจัย',
      papers: 'ทรัพย์สินทางปัญญาและผลงาน'
    },
    researches: [
      {
        id: 1,
        title: 'AI Prompts ปรับแต่งตามความต้องการ',
        titleEn: 'PROMPT',
        desc: 'ส่งมอบ AI Prompts ที่ตอบโจทย์เฉพาะบุคคล เราศึกษาวิจัยการประยุกต์ใช้เทคโนโลยี AI ผ่านโมเดลสาธารณะ โมเดลเฉพาะองค์กร และโมเดลระดับบุคคล',
        image: '/1.jpg'
      },
      {
        id: 2,
        title: 'แดชบอร์ดคุณภาพความปลอดภัยเชิงพื้นที่',
        titleEn: 'SAFETY CLOCK',
        desc: 'มนุษย์สร้างนาฬิกาเมื่อต้องการวัดเวลา แต่น่าแปลกที่ในยุคที่ความปลอดภัยเชิงพื้นที่มีความสำคัญสูงสุด กลับยังไม่มีนาฬิกาความปลอดภัย เราจึงวิจัยเพื่อสร้างมาตรฐานแดชบอร์ดความปลอดภัยเชิงพื้นที่',
        image: '/2.jpg'
      },
      {
        id: 3,
        title: 'การพัฒนาและติดตั้งระบบ Digital Twin',
        titleEn: 'DIGITAL TWIN',
        desc: 'AI มีประสิทธิภาพสูงสุดเมื่อสามารถสะสมข้อมูลผ่านเซนเซอร์ได้ เราศึกษาวิจัยระบบ MTCI: การวัด (M), การติดตาม (T), การเชื่อมต่อ (C) และการบูรณาการ (I) เพื่อสร้างความน่าเชื่อถือแห่งอนาคต',
        image: '/3.jpg'
      }
    ],
    patentsTitle: 'ทรัพย์สินทางปัญญาและผลงานวิจัย',
    patentsBadge: 'Patents & Publications',
    papers: [
      {
        id: 1,
        title: 'ระบบและวิธีการจัดการเรียนรู้ AI แบบกำหนดเองผ่านการปรับระดับความยากของ Prompt',
        desc: 'ยื่นจดสิทธิบัตรแล้ว (สิทธิบัตร-2025-0196159) | SYSTEM AND METHOD OF PROVIDING CUSTOMIZED ARTIFICIAL INTELLIGENCE LEARNING'
      },
      {
        id: 2,
        title: 'ระบบและวิธีการแสดงผลแดชบอร์ดรวมตัวชี้วัดคุณภาพแบบบูรณาการ',
        desc: 'ยื่นจดสิทธิบัตรแล้ว (สิทธิบัตร-2025-0153697) | SYSTEM AND METHOD FOR VISUALIZING INTEGRATED QUALITY MEASURES DASHBOARD'
      },
      {
        id: 3,
        title: 'อุปกรณ์และวิธีการสนับสนุนการจัดวางเซนเซอร์บนพื้นฐาน Digital Twin สำหรับการจัดการคุณภาพเชิงพื้นที่',
        desc: 'ยื่นจดสิทธิบัตรแล้ว (สิทธิบัตร-2025-0157432) | APPARATUS AND METHOD OF SUPPORTING SENSOR ARRANGEMENT BASED ON DIGITAL TWIN'
      }
    ]
  }
};

export default function PublicationsPage() {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;

  const [isMounted, setIsMounted] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('research');

  const [researchVisible, setResearchVisible] = useState([false, false, false]);
  const researchItemRefs = [useRef(null), useRef(null), useRef(null)];

  const topRef = useRef(null);
  const researchRef = useRef(null);
  const papersRef = useRef(null);

  const tabs = [
    { key: 'research', name: t.tabNames.research, ref: researchRef },
    { key: 'papers', name: t.tabNames.papers, ref: papersRef },
  ];

  const handleTabClick = (tabKey, refObj) => {
    setActiveTabKey(tabKey);
    if (refObj && refObj.current) {
      const offset = 100;
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

  useEffect(() => {
    setIsMounted(true);
    const handleScrollActiveTab = () => {
      const scrollPosition = window.scrollY + 250;
      const researchEl = researchRef.current;
      const papersEl = papersRef.current;

      if (papersEl && scrollPosition >= papersEl.offsetTop) {
        setActiveTabKey('papers');
      } else if (researchEl) {
        setActiveTabKey('research');
      }
    };

    window.addEventListener('scroll', handleScrollActiveTab, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observers = researchItemRefs.map((ref, index) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setResearchVisible((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }
      }, observerOptions);

      if (ref.current) observer.observe(ref.current);
      return { observer, ref: ref.current };
    });

    return () => {
      window.removeEventListener('scroll', handleScrollActiveTab);
      observers.forEach(({ observer, ref }) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div ref={topRef} className="pubPage">
      <style>{`
        .pubPage {
          width: 100%;
          background-color: #ffffff;
          color: #111625;
          padding: 140px 20px 120px 20px;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        .pubInner {
          max-width: 1276px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* ==========================================================
           피그마 32 x 32 정밀 넘버 배지 (완전 중앙 정렬)
           ========================================================== */
        .pubNumBadge {
          width: 32px !important;
          height: 32px !important;
          min-width: 32px !important;
          min-height: 32px !important;
          max-width: 32px !important;
          max-height: 32px !important;
          border-radius: 50% !important;
          display: block !important;
          line-height: 32px !important; /* 상하 기준선 완벽 고정 */
          text-align: center !important;
          background-color: #0052ff !important;
          color: #ffffff !important;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          letter-spacing: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          flex-shrink: 0 !important;
          -webkit-font-smoothing: antialiased !important;
        }

        /* 탭 버튼 */
        .pubTabBtn {
          border: none;
          padding: 10px 24px;
          border-radius: 99px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .pubTabBtn--active {
          background-color: #0052ff;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 82, 255, 0.25);
        }

        .pubTabBtn--inactive {
          background-color: #f2f5fd;
          color: #555b66;
        }

        .pubTabBtn--inactive:hover {
          background-color: #e5ebfa;
          color: #111625;
        }

        /* 연구 프로젝트 그리드 */
        .research-item-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .research-img-wrapper {
          position: relative;
          width: 100%;
          height: 380px;
          overflow: hidden;
          border-radius: 20px;
          background-color: #f5f7fa;
          box-shadow: 0 16px 34px -18px rgba(15, 23, 42, 0.15);
        }

        /* 성과/특허 행 그리드: 32px 배지 + 텍스트 영역 */
        .paper-row-grid {
          display: grid;
          grid-template-columns: 32px 1fr;
          gap: 24px;
          padding: 32px 0;
          border-bottom: 1px solid #E1E5EE;
          align-items: flex-start;
          box-sizing: border-box;
        }

        .paper-row-grid:last-child {
          border-bottom: none;
        }

        @media (max-width: 900px) {
          .research-item-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .research-text-area {
            order: 1 !important;
          }
          .research-img-wrapper {
            order: 2 !important;
            height: 260px !important;
          }
          .paper-row-grid {
            grid-template-columns: 32px 1fr !important;
            gap: 16px !important;
            padding: 24px 0 !important;
          }
        }
      `}</style>

      <div className="pubInner">
        
        {/* ================= 상단 헤더 영역 ================= */}
        <div style={{ marginBottom: '60px' }}>
          {/* 1. 상단 대표 배지 & 타이틀 */}
          <div style={{ marginBottom: '32px' }}>
            <span style={{ 
              fontSize: '20px', 
              color: '#0052ff', 
              fontWeight: '700', 
              letterSpacing: '0', 
              display: 'block', 
              marginBottom: '12px', 
              textTransform: 'uppercase' 
            }}>
              {t.heroBadge}
            </span>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 4vw, 40px)', 
              fontWeight: '700', 
              lineHeight: '1.3', 
              letterSpacing: '0', 
              color: '#111625', 
              margin: 0, 
              wordBreak: 'keep-all' 
            }}>
              {t.heroTitle.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < t.heroTitle.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          </div>

          {/* 2. 서브 탭 메뉴 */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {tabs.map((tab) => {
              const isActive = activeTabKey === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key, tab.ref)}
                  className={`pubTabBtn ${isActive ? 'pubTabBtn--active' : 'pubTabBtn--inactive'}`}
                  type="button"
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* 3. 와이드 비주얼 배너 */}
          <div style={{
            width: '100%',
            height: 'clamp(240px, 40vh, 440px)',
            backgroundColor: '#050b14',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 45px -20px rgba(15, 23, 42, 0.15)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80" 
              alt="Research Visual Showcase" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.55,
                mixBlendMode: 'luminosity'
              }}
            />
          </div>
        </div>

        {/* ================= [연구 프로젝트 섹션] ================= */}
        <div ref={researchRef} style={{ scrollMarginTop: '120px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #E1E5EE', margin: '80px 0 60px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {t.researches.map((item, index) => {
              const isVisible = researchVisible[index];

              return (
                <div 
                  key={item.id}
                  ref={researchItemRefs[index]}
                  className="research-item-grid"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* 텍스트 영역 */}
                  <div 
                    className="research-text-area"
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px', 
                      order: index % 2 === 1 ? 2 : 1 
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '18px', color: '#0052ff', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                        [{item.titleEn}]
                      </span>
                      <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 28px)', fontWeight: '700', color: '#111625', margin: '0 0 16px 0', lineHeight: '1.3', wordBreak: 'keep-all' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: '#555b66', fontSize: '18px', fontWeight: '400', lineHeight: '1.6', margin: 0, wordBreak: 'keep-all' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* 이미지 영역 */}
                  <div 
                    className="research-img-wrapper"
                    style={{ 
                      order: index % 2 === 1 ? 1 : 2 
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80";
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= [지식재산 및 연구 성과 섹션] ================= */}
        <div ref={papersRef} style={{ scrollMarginTop: '120px' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #E1E5EE', margin: '100px 0 60px 0' }} />

          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '20px', color: '#0052ff', fontWeight: '700', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>
              {t.patentsBadge}
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 36px)', fontWeight: '700', margin: 0, color: '#111625' }}>
              {t.patentsTitle}
            </h2>
          </div>

          <hr style={{ border: 'none', borderTop: '2px solid #111625', margin: '20px 0 0 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {t.papers.map((paper, index) => (
              <div 
                key={paper.id}
                className="paper-row-grid"
              >
                {/* 32x32 정밀 넘버 배지 적용 */}
                <div className="pubNumBadge">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: '#111625', 
                    margin: 0, 
                    lineHeight: '1.4', 
                    wordBreak: 'keep-all' 
                  }}>
                    {paper.title}
                  </h3>

                  <p style={{ 
                    fontSize: '16px', 
                    color: '#626772', 
                    margin: 0, 
                    lineHeight: '1.5', 
                    wordBreak: 'keep-all', 
                    fontWeight: '400' 
                  }}>
                    {paper.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}