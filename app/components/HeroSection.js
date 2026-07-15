"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css"; 

export default function HeroSection({ onOpenContact }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.heroVideoSection}>
      <video className={styles.bgVideoCustomScale} autoPlay loop muted playsInline>
        <source src="/Title_Premium_Cinematic_Hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className={styles.heroOverlay}>
        <div className={`${styles.heroContent} ${isLoaded ? styles.animateUp : ""}`}>
          
          <h1 className={styles.mainCopy}>
            Peace and Quality with AI <br />
            <span>AI 소외 그룹의 격차 해소, 월드클래스 AI 프롬프트를 만드는 곳</span>
          </h1>

          <p className={styles.subCopy}>
            Research & Innovation initiated by <br />
            <strong>㈜케이에이큐 KAQ</strong>
          </p>
        </div>

        <button 
          className={styles.leftContactTab} 
          onClick={onOpenContact}
          title="Contact Us"
        >
          <span className={styles.tabText}>CONTACT US</span>
        </button>
      </div>
    </section>
  );
}