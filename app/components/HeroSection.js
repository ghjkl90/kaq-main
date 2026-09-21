"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import styles from "../page.module.css"; 

const CONTENT = {
  KR: {
    eyebrow: "AI EXPERIENCE · DIGITAL SAFETY QUALITY",
    subLine1: "AI를 더 가깝게,",
    subLine2_prefix: "공간을 더 안전하게.",
    ctaGhost: "솔루션 살펴보기",
    ctaFilled: "도입 · 협력 문의",
    scrollLabel: "Scroll Down"
  },
  EN: {
    eyebrow: "AI EXPERIENCE · DIGITAL SAFETY QUALITY",
    subLine1: "Bringing AI Closer,",
    subLine2_prefix: "Making Spaces Safer.",
    ctaGhost: "Explore Solutions",
    ctaFilled: "Partnership Inquiry",
    scrollLabel: "Scroll Down"
  },
  JP: {
    eyebrow: "AI EXPERIENCE · DIGITAL SAFETY QUALITY",
    subLine1: "AIをもっと身近に、",
    subLine2_prefix: "空間をもっと安全に。",
    ctaGhost: "ソリューションを見る",
    ctaFilled: "導入・協力のお問い合わせ",
    scrollLabel: "Scroll Down"
  },
  TH: {
    eyebrow: "AI EXPERIENCE · DIGITAL SAFETY QUALITY",
    subLine1: "นำ AI เข้ามาใกล้คุณมากขึ้น,",
    subLine2_prefix: "ทำให้พื้นที่ปลอดภัยยิ่งขึ้น",
    ctaGhost: "ดูโซลูชันของเรา",
    ctaFilled: "ติดต่อความร่วมมือ",
    scrollLabel: "Scroll Down"
  }
};

export default function HeroSection({ onOpenContact }) {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector(`.${styles.heroVideoSection}`).nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
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
      <style>{`
        .${styles.heroOverlay} {
          justify-content: center !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Hero 중앙 전체 래퍼: 텍스트 묶음과 버튼 그룹 사이 gap 20px */
        .${styles.heroContent} {
          max-width: none !important;
          width: auto !important;
          padding: 0 20px !important;
          margin: 0 auto !important;
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 32px !important;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important;
        }

        /* 피그마의 460 Hug × 202 Hug 영역 (텍스트 프레임) */
        .heroTextFrame {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          white-space: nowrap;
        }

        .heroEyebrow {
          font-family: inherit;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
        }

        .${styles.mainCopy} {
          font-family: inherit !important;
          font-size: 60px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          text-align: center !important;
          color: #ffffff !important;
          margin: 0 !important;
          white-space: nowrap !important; /* "공간을 더 안전하게." 한 줄 유지 */
        }

        /* 피그마의 336 Hug × 52 Hug 영역 (버튼 프레임) */
        .heroCtaGroup {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 336px;
          height: 52px;
          gap: 16px;
          margin: 0;
        }

        .heroCtaGhost,
.heroCtaFilled {
  width: 160px !important;
  min-width: 160px;
  height: 52px !important;    
  border-radius: 99px !important; 
  border-width: 1px !important;
  font-family: inherit;
  font-size: 15px;            
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(12, 22, 36, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0 24px !important;   /* 좌우 패딩 24px 적용 */
}

        .heroCtaGhost:hover,
        .heroCtaFilled:hover {
          background: rgba(20, 34, 52, 0.7);
        }

        .scrollLabel {
          font-family: inherit;
          font-size: 12px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 6px;
          text-align: center;
        }

        .${styles.circleArrowIcon} {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          width: 24px !important;
          height: 24px !important;
          padding: 0 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .${styles.circleArrowIcon} svg {
          width: 20px !important;
          height: 20px !important;
          display: block;
        }

        @media (max-width: 768px) {
          .heroTextFrame {
            white-space: normal;
          }

          .${styles.mainCopy} {
            font-size: 32px !important;
            white-space: normal !important;
          }

          .heroEyebrow {
            font-size: 15px !important;
          }

          .heroCtaGroup {
            width: 100% !important;
            max-width: 320px;
            height: auto;
            flex-direction: row;
            gap: 10px;
          }

          .heroCtaGhost,
          .heroCtaFilled {
            height: 46px;
            font-size: 13px;
          }
        }
      `}</style>

      <video className={styles.bgVideoCustomScale} autoPlay loop muted playsInline>
        <source src="/BG_Mov.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.heroOverlay}>
        <div className={`${styles.heroContent} ${isLoaded ? styles.animateUp : ""}`}>

          {/* 피그마 텍스트 오토레이아웃 프레임 */}
          <div className="heroTextFrame">
            <p className="heroEyebrow">{t.eyebrow}</p>
            <h1 className={styles.mainCopy}>
              {t.subLine1} <br />
              {t.subLine2_prefix}
            </h1>
          </div>

          {/* 피그마 버튼 오토레이아웃 프레임 (336 x 52, gap: 16) */}
          <div className="heroCtaGroup">
            <button className="heroCtaGhost" onClick={scrollToNextSection} type="button">
  {t.ctaGhost}
</button>
            <button className="heroCtaFilled" onClick={onOpenContact} type="button">
              {t.ctaFilled}
            </button>
          </div>

        </div>

        <div className={`${styles.scrollIndicator} ${isScrolled ? styles.stopAnimation : ""}`}>
          <span className="scrollLabel">{t.scrollLabel}</span>
          <div className={styles.circleArrowIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}