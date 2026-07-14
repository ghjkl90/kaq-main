"use client";

import { useState } from "react";
import Link from "next/link"; 
import styles from "../page.module.css";

// 번역 사전 데이터 정의
const languages = {
  EN: { home: "Home", about: "About Us", research: "Research", pub: "Publications", careers: "Careers", inquiry: "Inquiry" },
  KR: { home: "홈", about: "소개", research: "연구 분야", pub: "연구 성과", careers: "인재 채용", inquiry: "문의하기" },
  JP: { home: "ホーム", about: "会社紹介", research: "研究分野", pub: "研究成果", careers: "採用情報", inquiry: "お問い合わせ" },
  TH: { home: "หน้าแรก", about: "เกี่ยวกับเรา", research: "งานวิจัย", pub: "ผลงานตีพิมพ์", careers: "ร่วมงานกับเรา", inquiry: "ติดต่อสอบถาม" }
};

export default function Header({ onOpenContact = () => {} }) {
  // 기본 언어를 영어(EN)로 설정 (KR, JP, TH 등으로 변경 가능)
  const [currentLang, setCurrentLang] = useState("KR");

  // 드롭다운 메뉴 선택 시 언어를 변경하는 함수
  const handleLangChange = (e) => {
    setCurrentLang(e.target.value);
  };

  // 현재 선택된 언어의 텍스트 팩을 가져옵니다.
  const t = languages[currentLang];

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerLogo}>
        <Link href="/">
          <img 
            src="/KAQlogo.png" 
            alt="KAQ Logo" 
            className={styles.kaqBadgeIconImg} 
            style={{ height: "36px", width: "auto", display: "block", objectFit: "contain", marginRight: "-4px", marginLeft: "-0.6px", cursor: "pointer" }} 
          />
        </Link>
      </div>
      <nav className={styles.headerNav}>
        <Link href="/" className={styles.navLink}>
          {t.home}
        </Link>
        
        <Link href="/about" className={styles.navLink}>
          {t.about}
        </Link>
        
        <Link href="/research" className={styles.navLink}>
          {t.research}
        </Link>
        
        <Link href="/publications" className={styles.navLink}>
          {t.pub}
        </Link>
        
        <Link href="/careers" className={styles.navLink}>
          {t.careers}
        </Link>
      </nav>

      <div className={styles.headerRight}>
        <div className={styles.langSelectWrapper}>
          <select 
            className={styles.langSelectDropdown} 
            value={currentLang} 
            onChange={handleLangChange}
          >
            <option value="EN">EN (English)</option>
            <option value="KR">KR (한국어)</option>
            <option value="JP">JP (日本語)</option>
            <option value="TH">TH (ภาษาไทย)</option>
          </select>
        </div>

        <button className={styles.headerContactBtn} onClick={onOpenContact}>
          {t.inquiry}
        </button>
      </div>
    </header>
  );
}