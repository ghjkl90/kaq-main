"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const CONTENT = {
  KR: {
    badge: "Global Vision",
    heading: ["한국형 AI 경험과 안전품질 기술을", "세계가 활용할 수 있는 기준으로 확장합니다."],
    cards: [
      { title: "다국어 AI 경험" },
      { title: "국제 연구 협력" },
      { title: "안전품질 표준화" },
      { title: "글로벌 파트너십" },
    ],
    ctaText: ["KAQ와 함께 새로운 AI 경험과", "안전품질의 기준을 만들어보세요."],
    ctaBtn: "문의하기",
  },
  EN: {
    badge: "Global Vision",
    heading: ["Expanding Korea's AI Experience and", "Safety Quality Technology into a Global Standard"],
    cards: [
      { title: "Multilingual AI Experience" },
      { title: "International Research Collaboration" },
      { title: "Safety Quality Standardization" },
      { title: "Global Partnership" },
    ],
    ctaText: ["Build the next standard for AI experience", "and safety quality together with KAQ."],
    ctaBtn: "Contact Us",
  },
  JP: {
    badge: "Global Vision",
    heading: ["韓国発のAI体験と安全品質技術を", "世界標準へと広げます。"],
    cards: [
      { title: "多言語AI体験" },
      { title: "国際研究協力" },
      { title: "安全品質の標準化" },
      { title: "グローバルパートナーシップ" },
    ],
    ctaText: ["KAQとともに新しいAI体験と", "安全品質の基準を作りましょう。"],
    ctaBtn: "お問い合わせ",
  },
  TH: {
    badge: "Global Vision",
    heading: ["ขยายประสบการณ์ AI และเทคโนโลยีคุณภาพความปลอดภัยจากเกาหลี", "สู่มาตรฐานที่ทั่วโลกใช้งานได้"],
    cards: [
      { title: "ประสบการณ์ AI หลายภาษา" },
      { title: "ความร่วมมือวิจัยระดับนานาชาติ" },
      { title: "มาตรฐานคุณภาพความปลอดภัย" },
      { title: "พันธมิตรระดับโลก" },
    ],
    ctaText: ["สร้างมาตรฐานใหม่ของประสบการณ์ AI", "และคุณภาพความปลอดภัยไปด้วยกันกับ KAQ"],
    ctaBtn: "ติดต่อเรา",
  },
};

const ICONS = [
  <svg key="globe" viewBox="0 0 24 24" fill="none" stroke="#4936ED" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
  </svg>,
  <svg key="check" viewBox="0 0 24 24" fill="none" stroke="#2167FD" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <polyline points="7 9 10.5 12.5 17 6" />
  </svg>,
  <svg key="shield" viewBox="0 0 24 24" fill="none" stroke="#00A1F1" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  <svg key="handshake" viewBox="0 0 24 24" fill="none" stroke="#00C4D6" strokeWidth="1.8">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 4h2l1 11h4.5" />
  </svg>,
];

function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gvVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

export default function MediaGallery({ onOpenContact }) {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef}>
      <style>{`
        .gvSection {
          width: 100%;
          background: #F2F5FD;
          padding: 120px 24px;
          box-sizing: border-box;
        }

        .gvHeader {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 56px;
        }

        .gvBadge {
          display: inline-block;
          border: 1.5px solid #2f6fed;
          color: #2f6fed;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 6px 18px;
          border-radius: 9999px;
          margin-bottom: 20px;
          background: #ffffff;
        }

        .gvHeading {
          font-size: clamp(1.4rem, 2.6vw, 1.9rem);
          font-weight: 800;
          line-height: 1.45;
          letter-spacing: -0.01em;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        .gvCards {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .gvCard {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px 24px;
          box-shadow: 0 10px 30px -12px rgba(15, 23, 42, 0.08);
        }

        .gvIcon {
          width: 30px;
          height: 30px;
          margin-bottom: 60px;
        }

        .gvIcon svg {
          width: 100%;
          height: 100%;
        }

        .gvCardTitle {
          font-size: 1rem;
          font-weight: 700;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        .gvCta {
          width: 100%;
          min-height: 300px;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 0 6%;
        }

        .gvCtaInner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .gvCtaText {
          font-size: clamp(1.15rem, 2vw, 1.5rem);
          font-weight: 800;
          line-height: 1.45;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }

        .gvCtaBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2167FD;
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1;
          padding: 12px 24px;
          border-radius: 9999px;
          cursor: pointer;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background-color 0.25s ease, transform 0.25s ease;
          white-space: nowrap;
        }

        .gvCtaBtn:hover {
          background: #2167FD;
          transform: translateY(-2px);
        }

        .gvCtaBtn svg {
          display: block;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .gvCtaBtn:hover svg {
          transform: translateX(4px);
        }

        /* 스크롤 리빌 애니메이션 */
        [data-reveal] {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-reveal].gvVisible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 860px) {
          .gvSection {
            padding: 80px 20px;
          }

          .gvCards {
            grid-template-columns: repeat(2, 1fr);
          }

          .gvCta {
            padding: 48px 6%;
          }

          .gvCtaInner {
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .gvCards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="gvSection">
        <div className="gvHeader" data-reveal>
          <span className="gvBadge">{t.badge}</span>
          <h2 className="gvHeading">
            {t.heading[0]}
            <br />
            {t.heading[1]}
          </h2>
        </div>

        <div className="gvCards">
          {t.cards.map((card, idx) => (
            <div
              className="gvCard"
              key={idx}
              data-reveal
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <div className="gvIcon">{ICONS[idx]}</div>
              <p className="gvCardTitle">{card.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gvCta">
        <div className="gvCtaInner">
          <p className="gvCtaText">
            {t.ctaText[0]}
            <br />
            {t.ctaText[1]}
          </p>
          <button className="gvCtaBtn" onClick={onOpenContact} type="button">
            {t.ctaBtn}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}