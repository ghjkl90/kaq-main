"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";

export default function DSQPlatform() {
  const [activeTab, setActiveTab] = useState("MTP");

  return (
    <div className={styles.dsqContainer}>
      {/* 3. Hero & Problem / Solution */}
      <section className={styles.dsqHero}>
        <div className={styles.dsqHeroContent}>
          <span className={styles.accentTag}>DSQ Platform</span>
          <h1 className={styles.dsqMainTitle}>
            "공간의 현재 안전품질 수준을 항상 파악해야 합니다.<br />
            <span>그때 비로소, 진정한 예방이 가능합니다."</span>
          </h1>
          <p className={styles.dsqSubTitle}>
            AI 센싱과 Digital Twin 기술로 구현한 실시간 공간 안전 점검 플랫폼
          </p>
          <button className={styles.diagonalBtn}>
            Free Safety Consultation Request
          </button>
        </div>
      </section>

      <section className={styles.dsqProblemSection}>
        <div className={styles.sectionHeader}>
          <h2>Why DSQ: 사회적 안전 문제, 이제 실시간 디지털 관리가 필요합니다.</h2>
          <p>중대재해처벌법 대응 및 공공 안전 사각지대 해소를 위해, 기존의 사후 안내 방송 체계에서 벗어나 시각화된 실시간 예방 관리 시스템으로 전환해야 합니다.</p>
        </div>
      </section>

      {/* 4. Core Feature: The Mondrian Visual Dashboard */}
      <section className={styles.mondrianSection}>
        <div className={styles.sectionHeader}>
          <h2>Visualizing Safety: Mondrian Dashboard</h2>
          <p>한눈에 파악하는 공간 안전 인프라 지표</p>
        </div>

        <div className={styles.mondrianGrid}>
          <div className={`${styles.mondrianBox} ${styles.boxRed}`}>
            <h3>Crowding & Fall Detection</h3>
            <p>Computer Vision AI Real-time Analytics</p>
            <div className={styles.gridStatus}>ACTIVE</div>
          </div>
          <div className={`${styles.mondrianBox} ${styles.boxBlue}`}>
            <h3>Air Quality Index</h3>
            <p>CO2, CO, Fine Dust Tracking</p>
            <span className={styles.gridValue}>PM 2.5 / Good</span>
          </div>
          <div className={`${styles.mondrianBox} ${styles.boxGreen}`}>
            <h3>Environment & Fire</h3>
            <p>Temp, Humidity, Noise & Hazard Inspection</p>
            <div className={styles.gridStatusSafe}>SAFE</div>
          </div>
          <div className={`${styles.mondrianBox} ${styles.boxBlack}`}>
            <h3>Privacy Guard</h3>
            <p>De-identification Face Masking Security Technology</p>
          </div>
        </div>
      </section>

      {/* 5. Implementation Process (Horizontal Layout) */}
      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <h2>DSQ 5-Step Solution Process</h2>
        </div>
        <div className={styles.horizontalLineContainer}>
          <div className={styles.connectingLine}></div>
          <div className={styles.stepWrapper}>
            {[
              { num: "01", title: "Site Diagnosis", desc: "Request & DSQ Assessor matching" },
              { num: "02", title: "Indicator Design", desc: "Tailored to standards & regulations" },
              { num: "03", title: "DT Simulation", desc: "Digital Twin sensor optimization" },
              { num: "04", title: "DSQ-M Installation", desc: "Custom hardware deployment" },
              { num: "05", title: "User Interaction", desc: "Blockchain data sharing & Emergency integration" }
            ].map((step, idx) => (
              <div key={idx} className={styles.stepNode}>
                <div className={styles.stepNum}>{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Hardware Product Lineup */}
      <section className={styles.hardwareSection}>
        <div className={styles.sectionHeader}>
          <h2>Hardware Product Lineup (DSQ-M)</h2>
        </div>
        <div className={styles.tabContainer}>
          <button className={activeTab === "MTP" ? styles.tabActive : ""} onClick={() => setActiveTab("MTP")}>MTP (M to Public)</button>
          <button className={activeTab === "MTC" ? styles.tabActive : ""} onClick={() => setActiveTab("MTC")}>MTC (M to Custom)</button>
        </div>
        <div className={styles.hardwareDisplayCard}>
          {activeTab === "MTP" ? (
            <div className={styles.hwCardContent}>
              <h3>MTP (M to Public)</h3>
              <p>Large-scale public kiosk and autonomous digital signage integration for smart urban environments.</p>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="MTP Infrastructure" className={styles.hwImage} />
            </div>
          ) : (
            <div className={styles.hwCardContent}>
              <h3>MTC (M to Custom)</h3>
              <p>Bespoke compact sensory network devices tailored for premium indoor architectural complexes.</p>
              <img src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" alt="MTC Sensory" className={styles.hwImage} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}