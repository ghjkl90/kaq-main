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
  AR: {
    badge: "Global Vision",
    heading: ["توسيع نطاق تجربة الذكاء الاصطناعي الكورية وتقنيات جودة الأمان", "لتصبح معياراً عالمياً يمكن للجميع الاستفادة منه."],
    cards: [
      { title: "تجربة الذكاء الاصطناعي متعددة اللغات" },
      { title: "التعاون البحثي الدولي" },
      { title: "توحيد معايير جودة الأمان" },
      { title: "الشراكة العالمية" },
    ],
    ctaText: ["اصنع معنا المعيار الجديد لتجربة الذكاء الاصطناعي", "الجودة والأمان جنباً إلى جنب مع KAQ."],
    ctaBtn: "اتصل بنا",
  },
};

const ICONS = [
  // 1. 다국어 AI 경험 (language / #4936ED)
  <svg key="language" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 43C21.4 43 18.9413 42.5 16.624 41.5C14.308 40.5 12.2913 39.1413 10.574 37.424C8.858 35.708 7.5 33.692 6.5 31.376C5.5 29.0587 5 26.6 5 24C5 21.3667 5.5 18.9 6.5 16.6C7.5 14.3 8.858 12.2913 10.574 10.574C12.2913 8.858 14.308 7.5 16.624 6.5C18.9413 5.5 21.4 5 24 5C26.6333 5 29.1 5.5 31.4 6.5C33.7 7.5 35.708 8.858 37.424 10.574C39.1413 12.2913 40.5 14.3 41.5 16.6C42.5 18.9 43 21.3667 43 24C43 26.6 42.5 29.0587 41.5 31.376C40.5 33.692 39.1413 35.708 37.424 37.424C35.708 39.1413 33.7 40.5 31.4 41.5C29.1 42.5 26.6333 43 24 43ZM24 39.95C25.0333 38.6167 25.892 37.2587 26.576 35.876C27.2587 34.492 27.8333 32.9833 28.3 31.35H19.7C20.1667 33.0167 20.742 34.5413 21.426 35.924C22.1087 37.308 22.9667 38.65 24 39.95ZM20.15 39.4C19.3833 38.3 18.692 37.05 18.076 35.65C17.4587 34.25 16.9833 32.8167 16.65 31.35H9.85C10.9167 33.4167 12.3333 35.1587 14.1 36.576C15.8667 37.992 17.8833 38.9333 20.15 39.4ZM27.85 39.4C30.1167 38.9333 32.1333 37.992 33.9 36.576C35.6667 35.1587 37.0833 33.4167 38.15 31.35H31.35C30.95 32.8167 30.45 34.258 29.85 35.674C29.25 37.0913 28.5833 38.3333 27.85 39.4ZM8.6 28.35H16.05C15.9167 27.6167 15.8167 26.8913 15.75 26.174C15.6833 25.458 15.65 24.7333 15.65 24C15.65 23.2667 15.6833 22.5413 15.75 21.824C15.8167 21.108 15.9167 20.3833 16.05 19.65H8.6C8.4 20.3167 8.25 21.0167 8.15 21.75C8.05 22.4833 8 23.2333 8 24C8 24.7667 8.05 25.5167 8.15 26.25C8.25 26.9833 8.4 27.6833 8.6 28.35ZM19.05 28.35H28.95C29.0833 27.6167 29.1833 26.9 29.25 26.2C29.3167 25.5 29.35 24.7667 29.35 24C29.35 23.2333 29.3167 22.5 29.25 21.8C29.1833 21.1 29.0833 20.3833 28.95 19.65H19.05C18.9167 20.3833 18.8167 21.1 18.75 21.8C18.6833 22.5 18.65 23.2333 18.65 24C18.65 24.7667 18.6833 25.5 18.75 26.2C18.8167 26.9 18.9167 27.6167 19.05 28.35ZM31.95 28.35H39.4C39.6 27.6833 39.75 26.9833 39.85 26.25C39.95 25.5167 40 24.7667 40 24C40 23.2333 39.95 22.4833 39.85 21.75C39.75 21.0167 39.6 20.3167 39.4 19.65H31.95C32.0833 20.3833 32.1833 21.108 32.25 21.824C32.3167 22.5413 32.35 23.2667 32.35 24C32.35 24.7333 32.3167 25.458 32.25 26.174C32.1833 26.8913 32.0833 27.6167 31.95 28.35ZM31.35 16.65H38.15C37.0833 14.55 35.6753 12.808 33.926 11.424C32.1753 10.0413 30.15 9.08333 27.85 8.55C28.6167 9.71667 29.3 10.9913 29.9 12.374C30.5 13.758 30.9833 15.1833 31.35 16.65ZM19.7 16.65H28.3C27.8333 14.9833 27.242 13.4413 26.526 12.024C25.8087 10.608 24.9667 9.28333 24 8.05C23.0333 9.28333 22.192 10.608 21.476 12.024C20.7587 13.4413 20.1667 14.9833 19.7 16.65ZM9.85 16.65H16.65C17.0167 15.1833 17.5 13.758 18.1 12.374C18.7 10.9913 19.3833 9.71667 20.15 8.55C17.8167 9.08333 15.7833 10.0413 14.05 11.424C12.3167 12.808 10.9167 14.55 9.85 16.65Z"
      fill="#4936ED"
    />
  </svg>,

  // 2. 국제 연구 협력 (sync_saved_locally / #2167FD)
  <svg key="sync_saved_locally" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M21.85 27.8499L32.4885 17.2614L30.35 15.1229L21.85 23.6229L17.6 19.3729L15.4925 21.4809L21.85 27.8499ZM2.76947 40.4614V37.4614H45.2305V40.4614H2.76947ZM8.61547 35.4614C7.60514 35.4614 6.74997 35.1114 6.04997 34.4114C5.34997 33.7114 4.99997 32.8563 4.99997 31.8459V11.0769C4.99997 10.0666 5.34997 9.21143 6.04997 8.51143C6.74997 7.81143 7.60514 7.46143 8.61547 7.46143H39.3845C40.3948 7.46143 41.25 7.81143 41.95 8.51143C42.65 9.21143 43 10.0666 43 11.0769V31.8459C43 32.8563 42.65 33.7114 41.95 34.4114C41.25 35.1114 40.3948 35.4614 39.3845 35.4614H8.61547Z"
      fill="#2167FD"
    />
  </svg>,

  // 3. 안전품질 표준화 (security / #00A1F1)
  <svg key="security" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 42.9614C19.6743 41.7817 16.093 39.2356 13.256 35.3229C10.4187 31.4102 9 27.0359 9 22.1999V10.6924L24 5.0769L39 10.6924V22.1999C39 27.0359 37.5813 31.4102 34.744 35.3229C31.907 39.2356 28.3257 41.7817 24 42.9614ZM24 39.7999C27.2333 38.7999 29.9333 36.8249 32.1 33.8749C34.2667 30.9249 35.5333 27.6332 35.9 23.9999H24V8.26891L12 12.7499V23.0809C12 23.3269 12.0333 23.6332 12.1 23.9999H24V39.7999Z"
      fill="#00A1F1"
    />
  </svg>,

  // 4. 글로벌 파트너십 (handshake / #00C4D6)
  <svg key="handshake" width="48" height="48" viewBox="-4 -6 48 48" fill="none">
    <path
      d="M19.585 35.2305C19.0567 35.2305 18.604 35.0517 18.227 34.694C17.85 34.3363 17.6615 33.8805 17.6615 33.3265C17.6615 33.0805 17.7148 32.8165 17.8215 32.5345C17.9278 32.2525 18.0873 32.005 18.3 31.792L26.608 23.4845L25.331 22.2075L17.054 30.515C16.8413 30.728 16.6055 30.8877 16.3465 30.994C16.0875 31.1003 15.8182 31.1535 15.5385 31.1535C14.9975 31.1535 14.5418 30.9683 14.1715 30.598C13.8008 30.2273 13.6155 29.7715 13.6155 29.2305C13.6155 28.9102 13.672 28.6223 13.785 28.367C13.8977 28.112 14.0438 27.8947 14.2235 27.715L22.531 19.4075L21.2845 18.1615L12.977 26.438C12.777 26.638 12.5443 26.7945 12.279 26.9075C12.0137 27.0202 11.731 27.0765 11.431 27.0765C10.9103 27.0765 10.4597 26.8862 10.079 26.5055C9.69833 26.1248 9.508 25.6742 9.508 25.1535C9.508 24.8742 9.56117 24.605 9.6675 24.346C9.77383 24.087 9.9335 23.851 10.1465 23.638L18.223 15.5615L16.9465 14.3155L8.9 22.392C8.72067 22.5717 8.49833 22.7178 8.233 22.8305C7.96767 22.9435 7.67467 23 7.354 23C6.80033 23 6.34133 22.8178 5.977 22.4535C5.613 22.0895 5.431 21.6305 5.431 21.0765C5.431 20.7972 5.48417 20.528 5.5905 20.269C5.69683 20.01 5.8565 19.7742 6.0695 19.5615L16.585 9.046L22.4885 14.9805C22.8552 15.3472 23.2788 15.6228 23.7595 15.8075C24.2405 15.9922 24.7245 16.0845 25.2115 16.0845C26.2268 16.0845 27.0962 15.7383 27.8195 15.046C28.5425 14.3537 28.904 13.469 28.904 12.392C28.904 11.9253 28.8175 11.4485 28.6445 10.9615C28.4712 10.4742 28.1807 10.0267 27.773 9.619L20.65 2.496L21.631 1.515C22.1337 1.033 22.7157 0.659999 23.377 0.395999C24.0387 0.131999 24.7003 0 25.362 0C26.126 0 26.849 0.131999 27.531 0.395999C28.213 0.659999 28.8155 1.0535 29.3385 1.5765L37.8465 10.115C38.3565 10.6253 38.7437 11.2152 39.008 11.8845C39.272 12.5535 39.404 13.3137 39.404 14.165C39.404 14.8317 39.2668 15.4843 38.9925 16.123C38.7182 16.7613 38.3362 17.3253 37.8465 17.815L21.1 34.592C20.859 34.833 20.6162 34.9997 20.3715 35.092C20.1265 35.1843 19.8643 35.2305 19.585 35.2305ZM3.4155 19.692L1.731 18.0075C1.16433 17.4612 0.734167 16.8085 0.4405 16.0495C0.146833 15.2908 0 14.5242 0 13.7495C0 12.9215 0.1475 12.1633 0.4425 11.475C0.7375 10.7863 1.10933 10.2177 1.558 9.769L9.7195 1.5765C10.2015 1.0945 10.7578 0.711168 11.3885 0.426501C12.0195 0.142168 12.6657 0 13.327 0C14.1117 0 14.8187 0.121666 15.448 0.364999C16.0777 0.608666 16.6745 1.0125 17.2385 1.5765L26.527 10.865C26.727 11.065 26.8833 11.2977 26.996 11.563C27.109 11.8287 27.1655 12.0948 27.1655 12.3615C27.1655 12.8948 26.9783 13.3518 26.604 13.7325C26.2297 14.1132 25.7758 14.3035 25.2425 14.3035C24.9425 14.3035 24.6732 14.2555 24.4345 14.1595C24.1962 14.0632 23.9603 13.8983 23.727 13.665L16.554 6.5535L3.4155 19.692Z"
      fill="#00C4D6"
    />
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
        /* 전체 섹션 컨테이너: 최대 너비 1600px, padding 120px 162px, gap 80px */
        .gvSection {
          width: 100%;
          background: #F2F5FD;
          padding: 120px 162px;
          box-sizing: border-box;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        .gvContainer {
          max-width: 1276px; /* 1600px - (162px * 2) */
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 80px;
        }

        /* 헤더 영역: 827 x 188, gap 24px */
        .gvHeader {
          width: 827px;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          text-align: center;
          margin: 0 auto;
        }

        /* 뱃지: 136 x 40, border 1px, gap 8px, padding 0 12px, font 18px Bold */
        .gvBadge {
          width: 136px;
          height: 40px;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          border: 1px solid #0052ff;
          border-radius: 99px;
          background: #ffffff00;
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
        .gvHeading {
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

        /* 카드 그리드 영역: 1276 x 240, gap 20px */
        .gvCards {
          width: 100%;
          max-width: 1276px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 304px);
          justify-content: space-between;
          gap: 20px;
          box-sizing: border-box;
        }

        /* 개별 카드: 304 x 240, padding 32px, border-radius 16px, justify-content: space-between */
        .gvCard {
          width: 304px;
          height: 240px;
          box-sizing: border-box;
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .gvCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px -10px rgba(0, 82, 255, 0.12);
        }

        /* 아이콘 바운딩 박스: 48 x 48 */
        .gvIcon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .gvIcon svg {
          width: 48px;
          height: 48px;
          display: block;
        }

        /* 카드 타이틀: 28px Bold, line-height 130% */
        .gvCardTitle {
          font-family: inherit;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        /* ==========================================================
           하단 배너 CTA: 피그마 명세 100% 반영
           ========================================================== */
        .gvCta {
          width: 100%;
          min-height: 360px;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 60px 162px;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        /* 컨테이너: 1276 x 104, gap 40px, flex 좌우 분할 */
        .gvCtaInner {
          width: 100%;
          max-width: 1276px;
          height: 104px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          box-sizing: border-box;
        }

        /* 텍스트 영역: 514 x 104, 40px Bold, line-height 130% */
        .gvCtaText {
          width: 514px;
          font-family: inherit;
          font-size: 40px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }

        /* 문의하기 버튼: 127 x 52 피그마 오토레이아웃 규격 (padding: 0 16px 0 20px, gap: 4px) */
        .gvCtaBtn {
          width: 127px;
          height: 52px;
          box-sizing: border-box;
          padding-left: 20px;
          padding-right: 16px;
          padding-top: 0;
          padding-bottom: 0;
          border-radius: 99px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background: #0052ff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          cursor: pointer;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background-color 0.25s ease, transform 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .gvCtaBtn:hover {
          background: #0044d6;
        }

        /* 버튼 텍스트: 18px Bold, 130% 줄간격 및 수직 중앙축 일치 */
        .gvCtaBtnText {
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          text-align: center;
          display: inline-flex;
          align-items: center;
          transform: translateY(-0.5px);
        }

        /* 화살표 아이콘: 24 x 24 규격 고정 */
        .gvCtaBtnArrow {
          width: 24px;
          height: 24px;
          display: block;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .gvCtaBtn:hover .gvCtaBtnArrow {
          transform: translateX(3px);
        }

        /* 스크롤 애니메이션 */
        [data-reveal] {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-reveal].gvVisible {
          opacity: 1;
          transform: translateY(0);
        }

        /* 반응형: 1360px 이하 대응 */
        @media (max-width: 1360px) {
          .gvSection {
            padding: 100px 5%;
          }

          .gvCards {
            grid-template-columns: repeat(2, minmax(0, 304px));
            justify-content: center;
            height: auto;
          }

          .gvCard {
            width: 100%;
          }

          .gvCta {
            padding: 60px 5%;
          }

          .gvCtaInner {
            height: auto;
          }

          .gvCtaText {
            width: auto;
            max-width: 600px;
          }
        }

        /* 반응형: 768px 모바일 대응 */
        @media (max-width: 768px) {
          .gvSection {
            padding: 80px 20px;
          }

          .gvHeading {
            font-size: 32px;
          }

          .gvCards {
            grid-template-columns: 1fr;
            justify-content: center;
          }

          .gvCard {
            width: 100%;
            height: 200px;
            padding: 24px;
          }

          .gvCardTitle {
            font-size: 24px;
          }

          .gvCta {
            padding: 48px 20px;
            min-height: auto;
          }

          .gvCtaInner {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            height: auto;
          }

          .gvCtaText {
            width: 100%;
            font-size: 28px;
          }
        }
      `}</style>

      {/* Global Vision 메인 섹션 */}
      <section className="gvSection">
        <div className="gvContainer">
          {/* 헤더 프레임 (827 x 188, gap 24) */}
          <div className="gvHeader" data-reveal>
            <span className="gvBadge">{t.badge}</span>
            <h2 className="gvHeading">
              {t.heading[0]}
              <br />
              {t.heading[1]}
            </h2>
          </div>

          {/* 4열 카드 그리드 (1276 x 240, gap 20) */}
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
        </div>
      </section>

      {/* 하단 배너 CTA */}
      <section className="gvCta">
        <div className="gvCtaInner">
          <p className="gvCtaText">
            {t.ctaText[0]}
            <br />
            {t.ctaText[1]}
          </p>
          <button className="gvCtaBtn" onClick={onOpenContact} type="button">
            <span className="gvCtaBtnText">{t.ctaBtn}</span>
            <svg
              className="gvCtaBtnArrow"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.6269 12.75H4.5V11.25H16.6269L10.9308 5.55383L12 4.5L19.5 12L12 19.5L10.9308 18.4461L16.6269 12.75Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}