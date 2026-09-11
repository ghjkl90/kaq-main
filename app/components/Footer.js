"use client";

import { useLanguage } from "../context/LanguageContext";
import styles from "../page.module.css";

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
  }
};

export default function Footer() {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;

  return (
    <footer 
      className={styles.mainFooter}
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>KAQ</div>

          <div className={styles.footerLinks}>
            <a href="#privacy">{t.privacy}</a>
            <a href="#terms">{t.terms}</a>
          </div>
        </div>

        <div className={styles.footerInfo}>
          <div className={styles.infoRow}>
            <span>{t.companyLabel} : {t.companyValue}</span>
            <span className={styles.divider}>|</span>
            <span>{t.addressLabel} : {t.addressValue}</span>
            <span className={styles.divider}>|</span>
            <span>{t.ceoLabel} : {t.ceoValue}</span>
            <span className={styles.divider}>|</span>
            <span>{t.bizNumLabel} : {t.bizNumValue}</span>
          </div>

          <div className={styles.infoRow}>
            <span>{t.tel}</span>
            <span className={styles.divider}>|</span>
            <span>{t.email}</span>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}