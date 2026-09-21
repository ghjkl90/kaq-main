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
        "누구나 쉽게 AI를 경험하도록 시니어, 어린이, 직무 학습자 등 이용자의 상황과 목적에 맞는 AI 대화 경험을 제공합니다.",
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
      image: "/8.png",
      btnText: "View More",
      link: "https://k-ai-station.vercel.app/",
    },
    {
      id: "02",
      mainTitle: "DSQ PLATFORM",
      description:
        "Sense, measure, track, and visualize a space's safety and quality with data — so its safety status is instantly clear.",
      image: "/9.png",
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
      image: "/8.png",
      btnText: "詳細を見る",
      link: "https://k-ai-station.vercel.app/",
    },
    {
      id: "02",
      mainTitle: "DSQ PLATFORM",
      description:
        "空間の安全と品質をデータでセンシング・測定・追跡・可視化し、安全品質の状態を直感的に確認できます。",
      image: "/9.png",
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
      image: "/8.png",
      btnText: "ดูเพิ่มเติม",
      link: "https://k-ai-station.vercel.app/",
    },
    {
      id: "02",
      mainTitle: "DSQ PLATFORM",
      description:
        "ตรวจจับ วัด ติดตาม และแสดงผลความปลอดภัยและคุณภาพของพื้นที่ด้วยข้อมูล เพื่อให้เห็นสถานะความปลอดภัยได้อย่างชัดเจน",
      image: "/9.png",
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
        padding: 120px 162px;
        box-sizing: border-box;
        font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
      }

      .fsContainer {
        max-width: 1276px; /* 1600px - (162px * 2) */
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 80px;
      }

      /* 헤더 영역: 519 x 126, gap 24px */
      .fsHeader {
        width: 519px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        text-align: center;
      }

      /* 뱃지: 174 x 40, border 1px, gap 8px, padding 0 12px, font 18px Bold */
      .fsBadge {
        width: 174px;
        height: 40px;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 0 12px;
        border: 1px solid #0052ff;
        border-radius: 99px;
        color: #0052ff;
        font-family: inherit;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: 0;
        text-align: center;
        white-space: nowrap;
      }

      /* 타이틀: 48px Bold, line-height 130% */
      .fsHeading {
        font-family: inherit;
        font-size: 48px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: 0;
        color: #111625;
        margin: 0;
        text-align: center;
        word-break: keep-all;
      }

      /* 카드 리스트 영역 */
      .fsList {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 80px;
        align-items: center;
      }

      /* Row: 628px 이미지 + 628px 텍스트 카드 = 총 1276px (간격 20px 자동 분할) */
      .fsRow {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      }

      .fsRow:nth-child(even) {
        flex-direction: row-reverse;
      }

      /* 이미지: 628 x 400 */
      .fsImageBox {
        width: 628px;
        height: 400px;
        flex-shrink: 0;
        border-radius: 24px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07);
      }

      .fsTextCard {
        width: 628px;
        height: 400px;
        flex-shrink: 0;
        box-sizing: border-box;
        padding: 40px;
        border-radius: 24px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 40px !important;
      }

      .fsTextFrame {
        width: 548px;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .fsTitle {
        font-family: inherit;
        font-size: 40px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: 0;
        color: #111625;
        margin: 0;
        word-break: keep-all;
      }

      /* 설명글: 18px Regular (400), line-height 150% */
      .fsDesc {
        font-family: inherit;
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0;
        color: #4b5563;
        margin: 0;
        word-break: keep-all;
      }

      /* 바로가기 버튼 규격 */
      .fsBtn {
        width: 127px;
        height: 52px;
        box-sizing: border-box;
        padding: 0 16px 0 20px;
        border-radius: 99px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        background-color: #111111;
        color: #ffffff;
        text-decoration: none;
        white-space: nowrap;
        transition: background-color 0.25s ease, transform 0.25s ease;
      }

      /* 텍스트: 18px Bold 및 수직 중심 정렬 */
      .fsBtnText {
  font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3; /* 130% */
  letter-spacing: 0;
  text-align: center;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

      /* 화살표 아이콘: 24 x 24 고정 및 부드러운 이동 */
      .fsBtnArrow {
        width: 24px;
        height: 24px;
        display: block;
        flex-shrink: 0;
        transition: transform 0.25s ease;
      }

      .fsBtn:hover {
        background-color: #0052ff;
        transform: translateY(-2px);
      }

      .fsBtn:hover .fsBtnArrow {
        transform: translateX(3px);
      }

      /* 스크롤 애니메이션 규격 */
      [data-reveal] {
        opacity: 0;
        transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
      }

      [data-reveal="up"] {
        transform: translateY(32px);
      }

      [data-reveal="left"] {
        transform: translateX(-40px);
      }

      [data-reveal="right"] {
        transform: translateX(40px);
      }

      [data-reveal].fsVisible {
        opacity: 1;
        transform: translate(0, 0);
      }

      /* 반응형: 화면 폭이 1360px 미만으로 줄어들 때 */
      @media (max-width: 1360px) {
        .fsSection {
          padding: 100px 5%;
        }

        .fsRow {
          flex-direction: column !important;
          gap: 24px;
        }

        .fsImageBox,
        .fsTextCard {
          width: 100%;
          max-width: 628px;
          height: auto;
        }

        .fsImageBox {
          aspect-ratio: 628 / 400;
        }

        .fsTextCard {
          min-height: 360px;
        }

        .fsTextFrame {
          width: 100%;
        }
      }

      /* 반응형: 모바일 (768px 이하) */
      @media (max-width: 768px) {
        .fsSection {
          padding: 80px 20px;
        }

        .fsHeading {
          font-size: 32px;
        }

        .fsTitle {
          font-size: 28px;
        }

        .fsDesc {
          font-size: 16px;
        }

        .fsTextCard {
          padding: 28px;
          gap: 28px;
        }

        [data-reveal="left"],
        [data-reveal="right"] {
          transform: translateY(32px);
        }
      }
    `}</style>

      <div className="fsContainer">
        {/* 헤더 프레임: 519 x 126, gap 24 */}
        <div className="fsHeader" data-reveal="up">
          <span className="fsBadge">{t.badge}</span>
          <h2 className="fsHeading">{t.heading}</h2>
        </div>

        {/* 솔루션 리스트 프레임: 세로 gap 80 */}
        <div className="fsList">
          {items.map((item, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div className="fsRow" key={item.id}>
                {/* 628 x 400 이미지 */}
                <div
                  className="fsImageBox"
                  data-reveal={isEven ? "right" : "left"}
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* 628 x 400 텍스트 카드 */}
                <div className="fsTextCard" data-reveal={isEven ? "left" : "right"}>
                  <div className="fsTextFrame">
                    <h3 className="fsTitle">{item.mainTitle}</h3>
                    <p className="fsDesc">{item.description}</p>
                  </div>

                  <a
  href={item.link}
  target="_blank"
  rel="noopener noreferrer"
  className="fsBtn"
>
  <span className="fsBtnText">{item.btnText}</span>
  <svg
    className="fsBtnArrow"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {/* 구글 머티리얼 심볼 공식 arrow_forward 벡터 패스 */}
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}