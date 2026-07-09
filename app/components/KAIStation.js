"use client";

import styles from "../page.module.css";

export default function KAIStation() {
  return (
    <div className={styles.kaiContainer}>
      {/* Introduction */}
      <section className={styles.kaiIntro}>
        <div className={styles.kaiLayout}>
          <div className={styles.kaiLeft}>
            <h2>Why K-AI Station?</h2>
            <p className={styles.kaiHighlight}>
              AI는 이미 우리 삶 곳곳에 들어와 있지만, 여전히 많은 사람들에게 AI는 어렵고 낯선 도구로 느껴집니다.
            </p>
          </div>
          <div className={styles.kaiRight}>
            <p>
              K-AI Station은 AI를 처음 접하는 순간의 막막함과 두려움을 줄이기 위해 만들어졌습니다. 복잡한 설정이나 전문 지식 없이도, 누구나 자연스럽게 AI를 경험하고 활용할 수 있도록 돕습니다.
            </p>
            <p className={styles.kaiVision}>
              장기적으로, AI가 일부 전문가의 도구가 아닌 모두의 일상과 일에 도움이 되는 기술이 되도록 만들어가고자 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className={styles.kaiFeatures}>
        <div className={styles.sectionHeader}>
          <h2>Core Features</h2>
          <p>간결함 속에 담긴 강력한 인공지능 인터랙션</p>
        </div>

        <div className={styles.experienceCard}>
          <div className={styles.expText}>
            <h3>AI 초심자 체험 모드</h3>
            <p>AI를 어떻게 시작해야 할지 막막한 분들을 위해, 간단한 선택과 터치만으로 AI 활용을 직접 체험할 수 있는 모드를 제공합니다.</p>
            <p className={styles.expSub}>복잡한 설정 없이, AI가 어떤 도움을 줄 수 있는지 자연스럽게 경험해 보세요.</p>
          </div>
          <div className={styles.expVisual}>
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" alt="Abstract Dynamic AI art" className={styles.galleryImg} />
          </div>
        </div>
      </section>

      {/* Recommendations Cards */}
      <section className={styles.recommendSection}>
        <div className={styles.sectionHeader}>
          <h2>Recommended For</h2>
        </div>
        <div className={styles.cardGrid}>
          {[
            { title: "생산성 향상", desc: "AI를 활용해 업무와 일상의 생산성을 높이고 싶은 사람" },
            { title: "초심자 스타터", desc: "AI를 처음 접하며 어디서부터 시작해야 할지 고민하는 사람" },
            { title: "모델 교차 비교", desc: "최신 AI 모델을 직접 비교하며 다양하게 사용해보고 싶은 사람" }
          ].map((item, index) => (
            <div key={index} className={styles.recCard}>
              <div className={styles.recBadge}>0{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}