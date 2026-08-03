"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
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
    publications: "연구 프로젝트", 
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLangChange = (e) => {
    setCurrentLang(e.target.value);
  };

  const t = languages[currentLang];

  return (
    <header className={`${styles.mainHeader} ${isScrolled ? styles.headerScrolled : ""} ${isMobileMenuOpen ? styles.menuOpen : ""}`}>
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

      {/* 네비게이션 메뉴 (메뉴 내부 언어 설정 완전 삭제) */}
      <nav className={`${styles.headerNav} ${isMobileMenuOpen ? styles.mobileNavActive : ""}`}>
        <Link href="/" className={styles.navLink}>{t.home}</Link>
        <Link href="/about" className={styles.navLink}>{t.about}</Link>
        <Link href="/products-and-services" className={styles.navLink}>{t.products}</Link>
        <Link href="/publications" className={styles.navLink}>{t.publications}</Link>
        <Link href="/globalchallenge" className={styles.navLink}>{t.globalChallenge}</Link>
      </nav>

      <div className={styles.headerRight}>
        {/* 언어 선택창 (오직 우측 영역에 단 하나만 존재) */}
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

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button 
          className={styles.mobileMenuToggleBtn} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="모바일 메뉴 열기/닫기"
        >
          <span className={`${styles.hamburgerBar} ${isMobileMenuOpen ? styles.bar1 : ""}`}></span>
          <span className={`${styles.hamburgerBar} ${isMobileMenuOpen ? styles.bar2 : ""}`}></span>
          <span className={`${styles.hamburgerBar} ${isMobileMenuOpen ? styles.bar3 : ""}`}></span>
        </button>
      </div>
    </header>
  );
}