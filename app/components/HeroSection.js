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
      <video className={styles.bgVideo} autoPlay loop muted playsInline>
        <source src="/Title_Premium_Cinematic_Hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className={styles.heroOverlay}>
        <div className={`${styles.heroContent} ${isLoaded ? styles.animateUp : ""}`}>
          <h1 className={styles.mainCopy}>
            Digital Innovation in Quality Management, <br />
            <span>Designing World-Class Spaces for South Korea.</span>
          </h1>
          <p className={styles.subCopy}>
            Delivering the pinnacle of safety and convenience powered by the authoritative technology of Sungkyunkwan University Smart Quality Lab (KAQ).
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