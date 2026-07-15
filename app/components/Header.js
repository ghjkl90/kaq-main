"use client";

import { useState } from "react";
import Link from "next/link"; 
import styles from "../page.module.css";


const languages = {
  EN: { 
    home: "Home", 
    about: "About Us", 
    products: "Products & Services", 
    publications: "Publications", 
    globalChallenge: "Global Challenge" 
  },
  KR: { 
    home: "홈", 
    about: "소개", 
    products: "제품 및 서비스", 
    publications: "연구 성과", 
    globalChallenge: "글로벌 챌린지" 
  },
  JP: { 
    home: "ホーム", 
    about: "会社紹介", 
    products: "製品 & サービス", 
    publications: "研究成果", 
    globalChallenge: "グローバルチャレンジ" 
  },
  TH: { 
    home: "หน้าแรก", 
    about: "เกี่ยวกับเรา", 
    products: "ผลิตภัณฑ์และบริการ", 
    publications: "ผลงานตีพิมพ์", 
    globalChallenge: "ความท้าทายระดับโลก" 
  }
};

export default function Header() {

  const [currentLang, setCurrentLang] = useState("KR");

  const handleLangChange = (e) => {
    setCurrentLang(e.target.value);
  };


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
          {t.products}
        </Link>
        
        <Link href="/publications" className={styles.navLink}>
          {t.publications}
        </Link>
        
        <Link href="/careers" className={styles.navLink}>
          {t.globalChallenge}
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
      </div>
    </header>
  );
}