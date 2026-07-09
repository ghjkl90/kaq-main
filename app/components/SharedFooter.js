"use client";

import styles from "../page.module.css";

export default function SharedFooter() {
  return (
    <footer className={styles.globalFooter}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <h3>KAQ</h3>
          <p>Smart Quality Laboratory</p>
        </div>
        <div className={styles.footerLinks}>
          <div>
            <h4>Platform</h4>
            <p>DSQ Platform</p>
            <p>Digital Twin Twin-Simulation</p>
          </div>
          <div>
            <h4>Innovation</h4>
            <p>K-AI Station</p>
            <p>Computer Vision Core</p>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} KAQ Smart Quality Lab. All Rights Reserved.</p>
      </div>
    </footer>
  );
}