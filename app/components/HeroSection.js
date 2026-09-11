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

        .${styles.heroContent} {
          padding-right: 0 !important;
          margin: 0 auto !important;
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }

        .heroEyebrow {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          color: rgb(255, 255, 255);
          margin-bottom: 18px;
          text-transform: uppercase;
        }

        .heroCtaGroup {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 32px;
        }

        .heroCtaGhost,
        .heroCtaFilled {
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          background: rgba(12, 22, 36, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .heroCtaGhost:hover,
        .heroCtaFilled:hover {
          background: rgba(20, 34, 52, 0.7);
        }

        .scrollLabel {
          font-size: 12px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 6px;
          text-align: center;
        }

        /* 화살표 원형 배경/테두리 제거 + 크기 고정(찌그러짐 방지) */
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
          /* 원본 CSS에 .heroOverlay { padding-left: 6%; } 가 768px 이하에서 재적용되므로 다시 override */
          .${styles.heroOverlay} {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .${styles.mainCopy} {
            font-size: 28px !important;
            line-height: 1.3 !important;
            letter-spacing: -1px !important;
          }

          .${styles.mainCopy} span {
            font-size: 20px !important;
            line-height: 1.35 !important;
            letter-spacing: -0.8px !important;
            margin-top: 12px !important;
            display: block;
          }

          .${styles.subCopy} {
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-top: 18px !important;
          }

          .heroCtaGroup {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <video className={styles.bgVideoCustomScale} autoPlay loop muted playsInline>
        <source src="/BG_Mov.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.heroOverlay}>
        <div className={`${styles.heroContent} ${isLoaded ? styles.animateUp : ""}`}>

          <p className="heroEyebrow">{t.eyebrow}</p>

          <h1 className={styles.mainCopy}>
            {t.subLine1} <br />
            {t.subLine2_prefix}
          </h1>

          <div className="heroCtaGroup">
            <button className="heroCtaGhost" type="button">
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