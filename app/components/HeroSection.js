"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css"; 

export default function HeroSection({ onOpenContact }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 모바일 새로고침 시 스크롤 최상단 초기화
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    setIsLoaded(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.heroVideoSection}>
      <video className={styles.bgVideoCustomScale} autoPlay loop muted playsInline>
        <source src="/Title_Premium_Cinematic_Hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className={styles.heroOverlay}>
        <div className={`${styles.heroContent} ${isLoaded ? styles.animateUp : ""}`}>
          
          <h1 className={styles.mainCopy}>
            Peace and Quality with AI <br />
            <span>
              AI 소외 그룹의 격차 해소, <br/> 
              월드클래스 AI 프롬프트를 <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>만드는 곳</span>
            </span>
          </h1>

          <p className={styles.subCopy}>
            Research & Innovation initiated by <br />
            <strong>㈜케이에이큐 KAQ</strong>
          </p>
        </div>

        <button 
          className={styles.leftContactTab} 
          onClick={onOpenContact}
          title="Contact Us"
        >
          <span className={styles.tabText}>CONTACT US</span>
        </button>

        {/* 채용 공고 리스트의 원형 화살표 스타일과 동일하게 맞춘 스크롤 유도 버튼/인디케이터 */}
        <div className={`${styles.scrollIndicator} ${isScrolled ? styles.stopAnimation : ""}`}>
          <div className={styles.circleArrowIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}