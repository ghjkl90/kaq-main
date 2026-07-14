"use client";

import styles from "../page.module.css";

export default function Header({ onOpenContact }) {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerLogo}>
        <img 
                        src="/KAQlogo.png" 
                        alt="KAQ Logo" 
                        className={styles.kaqBadgeIconImg} 
                        style={{ height: "36px", width: "auto", display: "block", objectFit: "contain", marginRight: "-4px", marginLeft: "-0.6px" }} 
                      />
      </div>
      

      <nav className={styles.headerNav}>
        <a href="#home" className={styles.navLink}>Home</a>
        <div className={styles.navDropdown}>
          <span className={styles.navLink}>About Us ▾</span>
        </div>
        <div className={styles.navDropdown}>
          <span className={styles.navLink}>Research ▾</span>
        </div>
        <a href="#publications" className={styles.navLink}>Publications</a>
        <div className={styles.navDropdown}>
          <span className={styles.navLink}>Media ▾</span>
        </div>
        <a href="#careers" className={styles.navLink}>Careers</a>
      </nav>

      {/* 3. 우측 컨트롤러 및 비대칭 다각형 Inquiry 버튼 */}
      <div className={styles.headerRight}>
        <span className={styles.langSelect}>EN ▾</span>
        <button className={styles.headerContactBtn} onClick={onOpenContact}>
          Inquiry
        </button>
      </div>
    </header>
  );
}