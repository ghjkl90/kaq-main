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
  AR: {
    about: "من نحن",
    products: "المنتجات والخدمات",
    publications: "المنشورات",
    globalChallenge: "التحدي العالمي",
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
      if (window.scrollY > 80) {
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
    <header className={headerClassNames} dir={currentLang === "AR" ? "rtl" : "ltr"}>
      <style>{`
        .${styles.mainHeader} {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          max-width: none !important;
          height: 80px !important;
          transform: none !important;
          padding: 0 40px !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          box-sizing: border-box !important;
          z-index: 9999 !important;
          border-bottom: none !important; /* 하단 선 삭제 */
          box-shadow: none !important;    /* 그림자 삭제 */
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif !important;
        }

        .kaqHeaderLogoSvg {
          display: flex;
          align-items: center;
          width: 81px;
          height: 28px;
          cursor: pointer;
        }

        /* 중앙 내비게이션 메뉴: 피그마 간격(80px) 유지 */
        .${styles.headerNav} {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 60px !important; /* 뷰포트에 따라 60~80px 자연스럽게 유지 */
          margin: 0 auto !important;
        }

        .${styles.navLink} {
          font-family: inherit !important;
          font-size: 18px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          white-space: nowrap !important;
          text-decoration: none !important;
          transition: color 0.2s ease, opacity 0.2s ease;
        }

        /* 우측 영역 */
        .${styles.headerRight} {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* 언어 선택 그룹: 내용(언어명 길이)에 맞게 자동 확장, height 28px */
        .kaqLangContainer {
          width: auto;
          min-width: 102px;
          height: 28px;
          display: flex;
          align-items: center;
          gap: 4px;
          position: relative;
          color: #ffffff;
          flex-shrink: 0;
        }

        .${styles.headerScrolled} .kaqLangContainer {
          color: #111625;
        }

        .kaqGlobeSvg {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: block;
        }

        .kaqArrowSvg {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          display: block;
          pointer-events: none;
        }

        .kaqLangSelect {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          border: none;
          color: inherit;
          font-family: inherit;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          cursor: pointer;
          outline: none;
          padding: 0;
          margin: 0;
          text-align: start !important;
          flex: 1;
          white-space: nowrap;
        }

        .kaqLangSelect option {
          color: #111625;
          background-color: #ffffff;
        }

        @media (max-width: 1024px) {
          .${styles.headerNav} {
            gap: 28px !important;
          }
        }

        @media (max-width: 768px) {
          .${styles.mainHeader} {
            padding: 0 20px !important;
            height: 70px !important;
          }

          .${styles.headerNav} {
            width: 100% !important;
            gap: 0 !important;
          }

          /* mobileNavActive가 아닐 때만 접어둠 — page_module.css의
             .headerNav.mobileNavActive { height: auto } 가 정상적으로 펼쳐지도록 함 */
          .${styles.headerNav}:not(.${styles.mobileNavActive}) {
            height: 0 !important;
          }
        }
      `}</style>
      {/* 좌측 로고 (81 x 28) */}
      <div className={styles.headerLogo}>
        <Link href="/" className="kaqHeaderLogoSvg">
          <svg
            width="81"
            height="28"
            viewBox="0 0 81 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <mask
              id="mask0_2_65"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="81"
              height="29"
            >
              <rect width="81" height="28.0385" fill="url(#pattern0_2_65)" />
            </mask>
            <g mask="url(#mask0_2_65)">
              <rect
                width="81"
                height="28"
                fill={isScrolled ? "#111625" : "white"}
              />
            </g>
            <defs>
              <pattern
                id="pattern0_2_65"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_2_65"
                  transform="scale(0.00549451 0.015873)"
                />
              </pattern>
              <image
                id="image0_2_65"
                width="182"
                height="63"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </Link>
      </div>

      {/* 중앙 메뉴 (571 x 23, gap: 80) */}
      <nav className={navClassNames}>
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

      {/* 우측 언어 선택 (102 x 28, gap: 4) 및 햄버거 버튼 */}
      <div className={styles.headerRight}>
        <div className="kaqLangContainer">
          {/* 지구본 아이콘 (28 x 28) */}
          <svg
            className="kaqGlobeSvg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14 25.0833C12.4833 25.0833 11.0491 24.7917 9.69729 24.2083C8.34629 23.625 7.1699 22.8324 6.16813 21.8307C5.16713 20.8297 4.37496 19.6537 3.79163 18.3027C3.20829 16.9509 2.91663 15.5167 2.91663 14C2.91663 12.4639 3.20829 11.025 3.79163 9.68333C4.37496 8.34167 5.16713 7.16994 6.16813 6.16817C7.1699 5.16717 8.34629 4.375 9.69729 3.79167C11.0491 3.20833 12.4833 2.91667 14 2.91667C15.5361 2.91667 16.975 3.20833 18.3166 3.79167C19.6583 4.375 20.8296 5.16717 21.8306 6.16817C22.8324 7.16994 23.625 8.34167 24.2083 9.68333C24.7916 11.025 25.0833 12.4639 25.0833 14C25.0833 15.5167 24.7916 16.9509 24.2083 18.3027C23.625 19.6537 22.8324 20.8297 21.8306 21.8307C20.8296 22.8324 19.6583 23.625 18.3166 24.2083C16.975 24.7917 15.5361 25.0833 14 25.0833ZM14 23.3042C14.6027 22.5264 15.1036 21.7342 15.5026 20.9277C15.9008 20.1203 16.2361 19.2403 16.5083 18.2875H11.4916C11.7638 19.2597 12.0995 20.1491 12.4985 20.9557C12.8967 21.763 13.3972 22.5458 14 23.3042ZM11.7541 22.9833C11.3069 22.3417 10.9036 21.6125 10.5443 20.7958C10.1842 19.9792 9.9069 19.1431 9.71246 18.2875H5.74579C6.36802 19.4931 7.1944 20.5092 8.22496 21.336C9.25552 22.162 10.4319 22.7111 11.7541 22.9833ZM16.2458 22.9833C17.568 22.7111 18.7444 22.162 19.775 21.336C20.8055 20.5092 21.6319 19.4931 22.2541 18.2875H18.2875C18.0541 19.1431 17.7625 19.9838 17.4125 20.8098C17.0625 21.6366 16.6736 22.3611 16.2458 22.9833ZM5.01663 16.5375H9.36246C9.28468 16.1097 9.22635 15.6866 9.18746 15.2682C9.14857 14.8505 9.12913 14.4278 9.12913 14C9.12913 13.5722 9.14857 13.1491 9.18746 12.7307C9.22635 12.313 9.28468 11.8903 9.36246 11.4625H5.01663C4.89996 11.8514 4.81246 12.2597 4.75413 12.6875C4.69579 13.1153 4.66663 13.5528 4.66663 14C4.66663 14.4472 4.69579 14.8847 4.75413 15.3125C4.81246 15.7403 4.89996 16.1486 5.01663 16.5375ZM11.1125 16.5375H16.8875C16.9652 16.1097 17.0236 15.6917 17.0625 15.2833C17.1013 14.875 17.1208 14.4472 17.1208 14C17.1208 13.5528 17.1013 13.125 17.0625 12.7167C17.0236 12.3083 16.9652 11.8903 16.8875 11.4625H11.1125C11.0347 11.8903 10.9763 12.3083 10.9375 12.7167C10.8986 13.125 10.8791 13.5528 10.8791 14C10.8791 14.4472 10.8986 14.875 10.9375 15.2833C10.9763 15.6917 11.0347 16.1097 11.1125 16.5375ZM18.6375 16.5375H22.9833C23.1 16.1486 23.1875 15.7403 23.2458 15.3125C23.3041 14.8847 23.3333 14.4472 23.3333 14C23.3333 13.5528 23.3041 13.1153 23.2458 12.6875C23.1875 12.2597 23.1 11.8514 22.9833 11.4625H18.6375C18.7152 11.8903 18.7736 12.313 18.8125 12.7307C18.8513 13.1491 18.8708 13.5722 18.8708 14C18.8708 14.4278 18.8513 14.8505 18.8125 15.2682C18.7736 15.6866 18.7152 16.1097 18.6375 16.5375ZM18.2875 9.7125H22.2541C21.6319 8.4875 20.8106 7.47133 19.7901 6.664C18.7689 5.85744 17.5875 5.29861 16.2458 4.9875C16.693 5.66805 17.0916 6.41161 17.4416 7.21817C17.7916 8.0255 18.0736 8.85694 18.2875 9.7125ZM11.4916 9.7125H16.5083C16.2361 8.74028 15.8911 7.84078 15.4735 7.014C15.055 6.188 14.5638 5.41528 14 4.69583C13.4361 5.41528 12.9453 6.188 12.5276 7.014C12.1092 7.84078 11.7638 8.74028 11.4916 9.7125ZM5.74579 9.7125H9.71246C9.92635 8.85694 10.2083 8.0255 10.5583 7.21817C10.9083 6.41161 11.3069 5.66805 11.7541 4.9875C10.393 5.29861 9.2069 5.85744 8.19579 6.664C7.18468 7.47133 6.36802 8.4875 5.74579 9.7125Z"
              fill="currentColor"
            />
          </svg>

          {/* 언어 셀렉트 (16px Bold) */}
          <select
            className="kaqLangSelect"
            value={currentLang}
            onChange={handleLangChange}
          >
            <option value="KR">한국어</option>
            <option value="EN">English</option>
            <option value="JP">日本語</option>
            <option value="AR">العربية</option>
            <option value="TH">ภาษาไทย</option>
          </select>

          {/* 드롭다운 아래 화살표 (24 x 24) */}
          <svg
            className="kaqArrowSvg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 16.525L6.34998 10.85L7.39998 9.80005L12 14.4L16.6 9.80005L17.65 10.85L12 16.525Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* 모바일 햄버거 메뉴 토글 버튼 */}
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