"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const TEXT = {
  KR: {
    badge: "Featured Solution",
    heading: "KAQ가 만드는 두 가지 변화",
  },
  EN: {
    badge: "Featured Solution",
    heading: "Two Ways KAQ Is Driving Change",
  },
  JP: {
    badge: "Featured Solution",
    heading: "KAQが生み出す2つの変化",
  },
  TH: {
    badge: "Featured Solution",
    heading: "สองการเปลี่ยนแปลงที่ KAQ สร้างขึ้น",
  },
};

const CONTENT = {
  KR: [
    {
      id: "01",
      mainTitle: "K–AI Station",
      description:
        "누구나 쉽게 AI를 경험하도록, 시니어, 어린이, 직무 학습자 등 이용자의 상황과 목적에 맞는 AI 대화 경험을 제공합니다.",
      image: "/8.png",
      btnText: "바로가기",
      link: "https://k-ai-station.vercel.app/",
    },
    {
      id: "02",
      mainTitle: "DSQ PLATFORM",
      description:
        "공간의 안전과 품질을 데이터로 센싱, 측정, 추적, 시각화를 통해 공간의 안전품질 상태를 직관적으로 확인합니다.",
      image: "/9.png",
      btnText: "바로가기",
      link: "/DSQ",
    },
  ],
  EN: [
    {
      id: "01",
      mainTitle: "K–AI Station",
      description:
        "Everyone can experience AI with ease — tailored AI conversations for seniors, children, working learners, and every situation and purpose in between.",
      image:
        "/8.png",
      btnText: "View More",
      link: "https://k-ai-station.vercel.app/",
    },
    {
      id: "02",
      mainTitle: "DSQ PLATFORM",
      description:
        "Sense, measure, track, and visualize a space's safety and quality with data — so its safety status is instantly clear.",
      image:
        "/9.png",
      btnText: "View More",
      link: "/DSQ",
    },
  ],
  JP: [
    {
      id: "01",
      mainTitle: "K–AI Station",
      description:
        "誰もが気軽にAIを体験できるよう、シニア、子ども、職務学習者など、利用者の状況と目的に合わせたAI対話体験を提供します。",
      image:
        "/8.png",
      btnText: "詳細を見る",
      link: "https://k-ai-station.vercel.app/",
    },
    {
      id: "02",
      mainTitle: "DSQ PLATFORM",
      description:
        "空間の安全と品質をデータでセンシング・測定・追跡・可視化し、安全品質の状態を直感的に確認できます。",
      image:
        "/9.png",
      btnText: "詳細を見る",
      link: "/DSQ",
    },
  ],
  TH: [
    {
      id: "01",
      mainTitle: "K–AI Station",
      description:
        "ทุกคนสามารถสัมผัสประสบการณ์ AI ได้อย่างง่ายดาย ปรับให้เหมาะกับสถานการณ์และวัตถุประสงค์ของผู้สูงอายุ เด็ก และผู้เรียนวัยทำงาน",
      image:
        "/8.png",
      btnText: "ดูเพิ่มเติม",
      link: "https://k-ai-station.vercel.app/",
    },
    {
      id: "02",
      mainTitle: "DSQ PLATFORM",
      description:
        "ตรวจจับ วัด ติดตาม และแสดงผลความปลอดภัยและคุณภาพของพื้นที่ด้วยข้อมูล เพื่อให้เห็นสถานะความปลอดภัยได้อย่างชัดเจน",
      image:
        "/9.png",
      btnText: "ดูเพิ่มเติม",
      link: "/DSQ",
    },
  ],
};

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
            entry.target.classList.add("fsVisible");
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

export default function FeaturedSolutions() {
  const { currentLang } = useLanguage();
  const t = TEXT[currentLang] || TEXT.KR;
  const items = CONTENT[currentLang] || CONTENT.KR;
  const containerRef = useScrollReveal();

  return (
    <section className="fsSection" ref={containerRef}>
      <style>{`
        .fsSection {
          width: 100%;
          background-color: #ffffff;
          padding: 140px 0;
          box-sizing: border-box;
        }

        .fsHeader {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 90px;
          padding: 0 24px;
        }

        .fsBadge {
          display: inline-block;
          border: 1.5px solid #0052ff;
          color: #0052ff;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 6px 18px;
          border-radius: 9999px;
          margin-bottom: 20px;
        }

        .fsHeading {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 800;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        .fsList {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 110px;
        }

        .fsRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .fsRow:nth-child(even) .fsImageCol {
          order: 2;
        }

        .fsRow:nth-child(even) .fsTextCol {
          order: 1;
        }

        .fsImageBox {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 20px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: 0 25px 50px -18px rgba(15, 23, 42, 0.18);
        }

        .fsTitle {
          font-size: clamp(1.5rem, 2.2vw, 1.85rem);
          font-weight: 800;
          color: #111625;
          margin: 0 0 16px 0;
          letter-spacing: -0.01em;
          word-break: keep-all;
        }

        .fsDesc {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #4b5563;
          margin: 0 0 28px 0;
          word-break: keep-all;
        }

        .fsBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #111111;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 700;
          line-height: 1;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 999px;
          transition: background-color 0.25s ease, transform 0.25s ease;
        }

        .fsBtn:hover {
          background-color: #0052ff;
          transform: translateY(-2px);
        }

        .fsBtn svg {
          display: block;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .fsBtn:hover svg {
          transform: translateX(4px);
        }

        /* 스크롤 리빌 애니메이션 */
        [data-reveal] {
          opacity: 0;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-reveal="up"] {
          transform: translateY(36px);
        }

        [data-reveal="left"] {
          transform: translateX(-48px);
        }

        [data-reveal="right"] {
          transform: translateX(48px);
        }

        [data-reveal].fsVisible {
          opacity: 1;
          transform: translate(0, 0);
        }

        @media (max-width: 860px) {
          .fsSection {
            padding: 90px 0;
          }

          .fsHeader {
            margin-bottom: 60px;
          }

          .fsList {
            gap: 60px;
          }

          .fsRow {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .fsRow:nth-child(even) .fsImageCol,
          .fsRow:nth-child(even) .fsTextCol {
            order: initial;
          }

          /* 모바일에서는 좌우 이동 대신 위로 떠오르는 것으로 통일 */
          [data-reveal="left"],
          [data-reveal="right"] {
            transform: translateY(36px);
          }
        }
      `}</style>

      <div className="fsHeader" data-reveal="up">
        <span className="fsBadge">{t.badge}</span>
        <h2 className="fsHeading">{t.heading}</h2>
      </div>

      <div className="fsList">
        {items.map((item, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div className="fsRow" key={item.id}>
              <div className="fsImageCol" data-reveal={isEven ? "right" : "left"}>
                <div
                  className="fsImageBox"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
              <div className="fsTextCol" data-reveal={isEven ? "left" : "right"}>
                <h3 className="fsTitle">{item.mainTitle}</h3>
                <p className="fsDesc">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fsBtn"
                >
                  {item.btnText}
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
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}