'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../page.module.css'; 

export default function ProjectList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  const duration = 5000; 

  const data = [
    {
      id: "01",
      badgeText: "기구축 완료",
      mainTitle: "K–AI–STATION",
      subTitle: "다양한 AI 모델의 프롬프트를 체함하는 장소",
      description: "모두 AI를 직접 체험할 수 있습니다. 시니어의 생활형 문제, 어린이 호기심 해결, 장애인의 소통 해결, 직업별 전문적 질문, 대학생의 실험실습을 체험하는 공간입니다.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", 
      btnText: "자세히 보기",
      link: "https://k-ai-station.vercel.app/",
      features: [
        {
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>,
          title: "프롬프트 난이도",
          desc: "AI 모델 기반 7등급 난이도를 선택할 수 있습니다."
        },
        {
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="4" r="2" /><circle cx="12" cy="20" r="2" /><circle cx="4" cy="12" r="2" /><circle cx="20" cy="12" r="2" /><line x1="12" y1="6" x2="12" y2="9" /><line x1="12" y1="15" x2="12" y2="18" /><line x1="6" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="18" y2="12" /></svg>,
          title: "AI 체험 전문화",
          desc: "10,000개의 프롬프트, 140개 직업군, 100개의 실습교재를 탑재했습니다."
        },
        {
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
          title: "AI 프롬프트 등록",
          desc: "자신이 만든 프롬프트를 등록하여 저작권을 인정받을 수 있습니다."
        }
      ]
    },
    {
      id: "02",
      badgeText: "신규 도입 예정",
      mainTitle: "DSQ PLATFORM",
      subTitle: "모바일 기반 디지털안전품질 표준 대시보드",
      description: "성균관대학교 스마트품질연구실이 개발한 오픈퀄리티(Open Quality)의 기술 사업화 제품. AI 센싱과 디지털트윈으로 안전 생태계를 바꿉니다.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200", 
      btnText: "플랫폼 둘러보기",
      link: "http://openq.co.kr:8082/",
      features: [
        {
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" /></svg>,
          title: "학술적 공신력",
          desc: "국내외 표준 기반 연구자산을 토대로 4대 HOPE 위해요인 지표를 정립했습니다."
        },
        {
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="16" /><line x1="15" y1="22" x2="15" y2="16" /><path d="M9 16h6v6H9z" /><path d="M8 6h2v2H8zm0 4h2v2H8zm6-4h2v2h-2zm0 4h2v2h-2z" /></svg>,
          title: "다각화된 현장 실증",
          desc: "다중이용시설, 전통시장, 스쿨존 등 실제 안전 품질 관리가 시급한 다양한 거점에 커스텀 도입 중입니다."
        },
        {
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
          title: "민관 융합 네트워크",
          desc: "이해관계자 연결, 관리자에게는 고도화된 시스템을, 대중에게는 사전 안전 확인 권리를 제공합니다."
        }
      ]
    }
  ];

  // 최초 1회 스크롤 진입 인터랙션 오픈
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.kaqActive); 
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 5초 타이머 제어
  useEffect(() => {
    setProgress(0);
    const intervalTime = 50; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        handleNext();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePageSwitch = (index) => {
    if (index === currentIndex || isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsChanging(false);
    }, 250); 
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
    handlePageSwitch(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
    handlePageSwitch(nextIndex);
  };

  const current = data[currentIndex];

  return (
    <section className={styles.kaqReportageSection} ref={sectionRef}>
      <div className={`${styles.kaqReportageContainer} ${styles.kaqScrollReveal}`}>
        
        {/* [LEFT AREA] */}
        <div className={styles.kaqReportageLeftFrame}>
          <div className={styles.kaqPolyImageContainer}>
            <div 
              style={{ 
                display: "flex",
                width: `${data.length * 100}%`,
                transform: `translateX(-${currentIndex * (100 / data.length)}%)`,
                height: "100%",
                transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
                willChange: "transform"
              }}
            >
              {data.map((item, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    backgroundImage: `url(${item.image})`,
                    width: `${100 / data.length}%`,
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                />
              ))}
            </div>
            <div className={styles.kaqPolyVisualShadow}></div>
          </div>
        </div>

        {/* [RIGHT AREA] */}
        <div className={`${styles.kaqReportageRightPanel} ${isChanging ? styles.kaqTextChanging : ""}`}>
          
          <div className={styles.kaqReportageHeader}>
            <div className={styles.kaqBadgeRow}>
              <img 
                src="/KAQlogo.png" 
                alt="KAQ Logo" 
                className={styles.kaqBadgeIconImg} 
                style={{ height: "36px", width: "auto", display: "block", objectFit: "contain", marginRight: "-4px", marginLeft: "-0.6px" }} 
              />
              <span className={styles.kaqBadgeSlashDivider}>•</span>
              <h4 className={styles.kaqBadgeText}>{current.badgeText}</h4>
            </div>
            <h2 className={styles.kaqMainHeadingTitle}>{current.mainTitle}</h2>
            <p className={styles.kaqSubHeadingHeading}>{current.subTitle}</p>
          </div>

          <div className={styles.kaqReportageBodyDesc}>
            <p>{current.description}</p>
          </div>

          <div className={styles.kaqReportageMiniGrid}>
            {current.features.map((feat, idx) => (
              <div 
                key={idx} 
                className={styles.kaqMiniColumnItem}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className={styles.kaqMiniIconCircle}>
                  {feat.icon}
                </div>
                <h5 className={styles.kaqMiniColumnTitle}>{feat.title}</h5>
                <p className={styles.kaqMiniColumnDesc}>{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.kaqReportageControlBar}>
            <div className={styles.kaqBtnArrowsGroup}>
              <button className={styles.kaqCircledArrow} onClick={handlePrev} aria-label="이전">←</button>
              <button className={styles.kaqCircledArrow} onClick={handleNext} aria-label="다음">→</button>
            </div>

            <div className={styles.kaqActionsFlexArea}>
              <a href={current.link} target="_blank" rel="noopener noreferrer" className={styles.kaqReportageSubmitBtn}>
                {current.btnText}
              </a>

              <div className={styles.kaqTimeDotsContainer}>
                {data.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.kaqDotWrapper} ${currentIndex === idx ? styles.activeDot : ""}`}
                    onClick={() => handlePageSwitch(idx)}
                  >
                    {currentIndex === idx && (
                      <svg className={styles.kaqCircularSvg} viewBox="0 0 32 32">
                        <circle 
                          className={styles.kaqCircularProgressBar} 
                          cx="16" cy="16" r="14" 
                          strokeDasharray="88"
                          strokeDashoffset={88 - (88 * progress) / 100}
                        />
                      </svg>
                    )}
                    <span className={styles.kaqCoreCenterDot}></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}