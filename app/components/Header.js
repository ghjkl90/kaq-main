"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import styles from "../page.module.css";

const languages = {
  EN: {
    about: "About Us",
    products: "Products & Services",
    publications: "Publications",
    globalChallenge: "Global Challenge",
  },
  KR: {
    about: "소개",
    products: "제품 및 서비스",
    publications: "연구 프로젝트",
    globalChallenge: "글로벌 챌린지",
  },
  JP: {
    about: "会社紹介",
    products: "製品 & サービス",
    publications: "研究成果",
    globalChallenge: "グローバルチャレンジ",
  },
  TH: {
    about: "เกี่ยวกับเรา",
    products: "ผลิตภัณฑ์และบริการ",
    publications: "ผลงานตีพิมพ์",
    globalChallenge: "ความท้าทายระดับโลก",
  },
};

export default function Header() {
  const { currentLang, changeLanguage } = useLanguage();
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
    changeLanguage(e.target.value);
  };

  const t = languages[currentLang] || languages.KR;

  // 홈 화면이면서 아직 스크롤하지 않은 상태 = 히어로 위에 떠 있는 헤더
  const isHero = isHome && !isScrolled;
  const logoSrc = isHero ? "/KAQlogo_1.png" : "/KAQlogo_2.png";

  const headerClassNames = [
    styles.mainHeader,
    isScrolled ? styles.headerScrolled : "",
    isMobileMenuOpen ? styles.menuOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  const navClassNames = [
    styles.headerNav,
    isMobileMenuOpen ? styles.mobileNavActive : "",
  ]
    .filter(Boolean)
    .join(" ");

  const bar1ClassName = [
    styles.hamburgerBar,
    isMobileMenuOpen ? styles.bar1 : "",
  ]
    .filter(Boolean)
    .join(" ");

  const bar2ClassName = [
    styles.hamburgerBar,
    isMobileMenuOpen ? styles.bar2 : "",
  ]
    .filter(Boolean)
    .join(" ");

  const bar3ClassName = [
    styles.hamburgerBar,
    isMobileMenuOpen ? styles.bar3 : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={headerClassNames}
      style={
        isHero
          ? { backgroundImage: "none", backgroundColor: "#000000" }
          : undefined
      }
    >
      <div className={styles.headerLogo}>
        <Link href="/">
          <img
            src={logoSrc}
            alt="KAQ Logo"
            className={styles.kaqBadgeIconImg}
            style={{
              height: "36px",
              width: "auto",
              display: "block",
              objectFit: "contain",
              marginRight: "-4px",
              marginLeft: "-0.6px",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className={navClassNames}>
        <Link href="/" className={styles.navLink}>
          {t.home}
        </Link>
        <Link href="/about" className={styles.navLink}>
          {t.about}
        </Link>
        <Link href="/products-and-services" className={styles.navLink}>
          {t.products}
        </Link>
        <Link href="/publications" className={styles.navLink}>
          {t.publications}
        </Link>
        <Link href="/globalchallenge" className={styles.navLink}>
          {t.globalChallenge}
        </Link>
      </nav>

      <div className={styles.headerRight}>
        <style>{`
          .kaqLangGlobeIcon {
            display: inline-flex;
            align-items: center;
            margin-right: 4px;
            color: currentColor;
          }

          .kaqLangGlobeIcon svg {
            display: block;
            flex-shrink: 0;
          }

          .kaqLangSelectTight {
            padding-left: 2px !important;
            padding-right: 2px !important;
          }
        `}</style>

        {/* 언어 선택창 */}
        <div
          className={styles.langSelectWrapper}
          style={{ display: "flex", alignItems: "center" }}
        >
          <span className="kaqLangGlobeIcon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
            </svg>
          </span>
          <select
            className={`${styles.langSelectDropdown} kaqLangSelectTight`}
            value={currentLang}
            onChange={handleLangChange}
          >
            <option value="EN">English</option>
            <option value="KR">한국어</option>
            <option value="JP">日本語</option>
            <option value="TH">ภาษาไทย</option>
          </select>
        </div>

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          className={styles.mobileMenuToggleBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="모바일 메뉴 열기/닫기"
        >
          <span className={bar1ClassName}></span>
          <span className={bar2ClassName}></span>
          <span className={bar3ClassName}></span>
        </button>
      </div>
    </header>
  );
}