"use client";

import { useState } from "react";
import styles from "../page.module.css"; 

export default function ProjectList() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: "01",
      badge: "기구축 완료",
      title: "K-AI-STATION",
      description: "공간의 환경 데이터와 사용자 편의를 스마트하게 연결하여 쾌적한 AI 기반 공간 경험을 선사하는 지능형 통합 스테이션 허브입니다.",
      subDescription: "실시간 데이터 트래킹 및 멀티 디바이스 동기화 기술 적용",
      image: "/Gallery1.png", // 이미지 경로 변경 예정
      btnText: "자세히 보기",
      link: "https://k-ai-station.vercel.app/"
    },
    {
      id: "02",
      badge: "신규 도입 예정",
      title: "DSQ PLATFORM",
      description: "AI 센싱과 Digital Twin 기술로 구현한 실시간 공간 안전 점검 플랫폼으로 위험 요소를 사전에 시각화하고 차단합니다.",
      subDescription: "몬드리안 스타일 대시보드 인터페이스 결합",
      image: "/Gallery2.png", // 이미지 경로 변경 예정
      btnText: "플랫폼 둘러보기",
      link: "https://dsq-platform.vercel.app/" // 💡 필요시 DSQ 플랫폼 주소로 변경하여 사용하세요.
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.projectSliderSection}>
      <div className={styles.sliderWrapper}>
        
        <div className={styles.sliderLeftBox}>
          <div className={styles.sliderLeftContent}>
            <span className={styles.sliderCategoryTag}>PROJECTS</span>
            <h2 className={styles.sliderMainTitle}>
              KAQ <br />
              Core Innovation
            </h2>
            <p className={styles.sliderMainSub}>
              KAQ가 혁신하는 핵심 프로젝트 가치와 기술을 양 옆으로 넘겨보며 확인하세요.
            </p>

            <div className={styles.sliderController}>
              <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Previous Project">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className={styles.fractionIndicator}>
                <span className={styles.currentNum}>{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className={styles.divider}>/</span>
                <span className={styles.totalNum}>{String(projects.length).padStart(2, '0')}</span>
              </div>

              <button className={styles.arrowBtn} onClick={handleNext} aria-label="Next Project">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* [우측 영역]: 가로로 슬라이딩 전환되는 카드 가변 뷰포트 */}
        <div className={styles.sliderRightBox}>
          <div 
            className={styles.cardTrack} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className={styles.sliderCard}>
                <div className={styles.sliderCardHeader}>
                  <span className={styles.sliderProjectBadge}>{project.badge}</span>
                  <h3 className={styles.sliderProjectTitle}>{project.title}</h3>
                  <p className={styles.sliderProjectDesc}>{project.description}</p>
                  {project.subDescription && (
                    <p className={styles.sliderProjectSubDesc}>{project.subDescription}</p>
                  )}
                </div>
                
                <div className={styles.sliderCardVisual}>
                  <div 
                    className={styles.sliderProjectImg} 
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  
                  {/* 💡 기존의 href="#" 주소를 각각의 project.link로 유연하게 연동합니다 */}
                  <a 
                    href={project.link || "#"} 
                    target={project.link ? "_blank" : "_self"} 
                    rel="noopener noreferrer"
                    className={styles.sliderMoreBtn}
                  >
                    {project.btnText}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}