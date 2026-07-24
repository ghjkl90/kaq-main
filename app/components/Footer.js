"use client";
import styles from "../page.module.css";

export default function Footer() {
  return (
    <footer 
      className={styles.mainFooter}
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>KAQ</div>

          <div className={styles.footerLinks}>
            <a href="#privacy">개인정보취급방침</a>
            <a href="#terms">이용약관</a>
          </div>
        </div>

        <div className={styles.footerInfo}>
          <div className={styles.infoRow}>
            <span>사업자명 : 주식회사 케이에이큐</span>
            <span className={styles.divider}>|</span>
            <span>주소 : 경기 수원시 장안구 서부로 2066, 27403호</span>
            <span className={styles.divider}>|</span>
            <span>대표 : 신완선</span>
            <span className={styles.divider}>|</span>
            <span>사업자번호 : 470-81-03049</span>
          </div>

          <div className={styles.infoRow}>
            <span>Tel : 031-250-4233</span>
            <span className={styles.divider}>|</span>
            <span>E-Mail : kaq8560@gmail.com</span>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>Copyright © KAQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}