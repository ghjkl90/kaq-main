"use client";

import { useLanguage } from "../context/LanguageContext";

const CONTENT = {
  KR: {
    privacy: "개인정보취급방침",
    terms: "이용약관",
    companyLabel: "사업자명",
    companyValue: "주식회사 케이에이큐",
    addressLabel: "주소",
    addressValue: "경기 수원시 장안구 서부로 2066, 27403호",
    ceoLabel: "대표",
    ceoValue: "신완선",
    bizNumLabel: "사업자번호",
    bizNumValue: "470-81-03049",
    tel: "Tel : 031-250-4233",
    email: "E-Mail : kaq8560@gmail.com",
    copyright: "Copyright © KAQ. All rights reserved."
  },
  EN: {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    companyLabel: "Company",
    companyValue: "KAQ Co., Ltd.",
    addressLabel: "Address",
    addressValue: "Room 27403, 2066 Seobu-ro, Jangan-gu, Suwon-si, Gyeonggi-do, Korea",
    ceoLabel: "CEO",
    ceoValue: "Wan-Seon Shin",
    bizNumLabel: "Business Reg. No.",
    bizNumValue: "470-81-03049",
    tel: "Tel : +82-31-250-4233",
    email: "E-Mail : kaq8560@gmail.com",
    copyright: "Copyright © KAQ. All rights reserved."
  },
  JP: {
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    companyLabel: "事業者名",
    companyValue: "株式会社KAQ",
    addressLabel: "所在地",
    addressValue: "京畿道水原市長安区西部路2066、27403号",
    ceoLabel: "代表者",
    ceoValue: "申完善 (シン・ワンソン)",
    bizNumLabel: "事業者登録番号",
    bizNumValue: "470-81-03049",
    tel: "Tel : +82-31-250-4233",
    email: "E-Mail : kaq8560@gmail.com",
    copyright: "Copyright © KAQ. All rights reserved."
  },
  TH: {
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "ข้อกำหนดการใช้งาน",
    companyLabel: "ชื่อนิติบุคคล",
    companyValue: "บริษัท เคเอคิว จำกัด (KAQ Co., Ltd.)",
    addressLabel: "ที่อยู่",
    addressValue: "ห้อง 27403, 2066 Seobu-ro, Jangan-gu, Suwon-si, Gyeonggi-do, เกาหลีใต้",
    ceoLabel: "ตัวแทนบริษัท",
    ceoValue: "Shin Wan-seon",
    bizNumLabel: "เลขทะเบียนนิติบุคคล",
    bizNumValue: "470-81-03049",
    tel: "Tel : +82-31-250-4233",
    email: "E-Mail : kaq8560@gmail.com",
    copyright: "Copyright © KAQ. All rights reserved."
  },
  AR: {
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    companyLabel: "اسم الشركة",
    companyValue: "شركة KAQ المحدودة",
    addressLabel: "العنوان",
    addressValue: "غرفة 27403، 2066 سيبو-رو، جانغان-غو، سووون-سي، جيونغي-دو، كوريا الجنوبية",
    ceoLabel: "الرئيس التنفيذي",
    ceoValue: "شين وان سون",
    bizNumLabel: "رقم السجل التجاري",
    bizNumValue: "470-81-03049",
    tel: "Tel : +82-31-250-4233",
    email: "E-Mail : kaq8560@gmail.com",
    copyright: "Copyright © KAQ. All rights reserved."
  }
};

export default function Footer() {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;

  return (
    <footer className="kaqFooter">
      <style>{`
        /* 푸터 전체 컨테이너: 1600px 레이아웃, padding: 60px 162px 80px, gap: 40px */
        .kaqFooter {
          width: 100%;
          background-color: #000000;
          padding: 60px 162px 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 10;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        .kaqFooterContainer {
          width: 100%;
          max-width: 1276px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* 상단 바: 1276 x 28, justify-content: space-between */
        .kaqFooterTop {
          width: 100%;
          height: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .kaqFooterLogo {
          display: flex;
          align-items: center;
          height: 28px;
        }

        .kaqFooterLinks {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .kaqFooterLinks a {
          color: #ffffff;
          font-family: inherit;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .kaqFooterLinks a:hover {
          color: #0052ff;
        }

        /* 가로 구분선: 1276 x 1, opacity: 0.2 */
        .kaqFooterDividerLine {
          width: 100%;
          height: 1px;
          background-color: #ffffff;
          opacity: 0.2;
        }

        /* 하단 정보 블록: 정보(898 x 50) + 카피라이트 */
        .kaqFooterBottomArea {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .kaqFooterInfo {
          width: 898px;
          max-width: 100%;
          min-height: 50px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kaqInfoRow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          color: #838996;
          font-family: inherit;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: 0;
        }

        .kaqDividerSpan {
          color: #4b5563;
          user-select: none;
          font-size: 14px;
        }

        .kaqCopyrightText {
          color: #6b7280;
          font-family: inherit;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: 0;
          margin: 0;
        }

        /* 반응형: 1360px 이하 대응 */
        @media (max-width: 1360px) {
          .kaqFooter {
            padding: 60px 5% 80px;
          }

          .kaqFooterInfo {
            width: 100%;
            height: auto;
          }
        }

        /* 반응형: 768px 이하 모바일 대응 */
        @media (max-width: 768px) {
          .kaqFooter {
            padding: 48px 20px 60px;
          }

          .kaqFooterTop {
            height: auto;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .kaqFooterLinks {
            gap: 16px;
          }

          .kaqFooterLinks a {
            font-size: 14px;
          }

          .kaqInfoRow {
            font-size: 14px;
            gap: 8px;
          }

          .kaqCopyrightText {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="kaqFooterContainer">
        {/* 상단: 로고 SVG (81 x 28) 및 링크 메뉴 */}
        <div className="kaqFooterTop">
          <div className="kaqFooterLogo">
            <svg
              width="81"
              height="28"
              viewBox="0 0 81 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <mask
                id="mask0_2_157"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="81"
                height="29"
              >
                <rect width="81" height="28.0385" fill="url(#pattern0_2_157)" />
              </mask>
              <g mask="url(#mask0_2_157)">
                <rect width="81" height="28" fill="#838996" />
              </g>
              <defs>
                <pattern
                  id="pattern0_2_157"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_2_157"
                    transform="scale(0.00549451 0.015873)"
                  />
                </pattern>
                <image
                  id="image0_2_157"
                  width="182"
                  height="63"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>

          <div className="kaqFooterLinks">
            <a href="#privacy">{t.privacy}</a>
            <a href="#terms">{t.terms}</a>
          </div>
        </div>

        {/* 1276 x 1 구분선 */}
        <div className="kaqFooterDividerLine" />

        {/* 하단: 기업 정보 (898 x 50) 및 카피라이트 */}
        <div className="kaqFooterBottomArea">
          <div className="kaqFooterInfo">
            <div className="kaqInfoRow">
              <span>{t.companyLabel} : {t.companyValue}</span>
              <span className="kaqDividerSpan">|</span>
              <span>{t.addressLabel} : {t.addressValue}</span>
              <span className="kaqDividerSpan">|</span>
              <span>{t.ceoLabel} : {t.ceoValue}</span>
              <span className="kaqDividerSpan">|</span>
              <span>{t.bizNumLabel} : {t.bizNumValue}</span>
            </div>

            <div className="kaqInfoRow">
              <span>{t.tel}</span>
              <span className="kaqDividerSpan">|</span>
              <span>{t.email}</span>
            </div>
          </div>

          <p className="kaqCopyrightText">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}