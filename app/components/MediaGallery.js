"use client";

import { useState, useRef } from "react";
import styles from "../page.module.css";

export default function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [pointerXStart, setPointerXStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef(null);
  const galleryItems = [
    { id: 1, handle: "@reportage.korea", tag: "Construction Update", bg: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80" },
    { id: 2, handle: "@reportage.digital", tag: "AI Safety Demo", bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" },
    { id: 3, handle: "@reportage.smartcity", tag: "KAQ Lab Introduction", bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
    { id: 4, handle: "@reportage.innovation", tag: "Digital Twin Suite", bg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80" },
    { id: 5, handle: "@reportage.vision", tag: "Platform Showreel", bg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" }
  ];
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setPointerXStart(e.clientX || e.touches?.[0].clientX);
    if (stageRef.current) {
      stageRef.current.style.cursor = "grabbing";
    }
  };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0].clientX;
    const diffX = currentX - pointerXStart;
    setDragOffset(diffX * 0.6);
  };
  const handlePointerUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (stageRef.current) {
      stageRef.current.style.cursor = "pointer";
    }
    // 드래그 거리가 70px 이상일 때 왼쪽/오른쪽 슬라이드로 매끄럽게 체인지
    const threshold = 70; 
    if (dragOffset > threshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    } else if (dragOffset < -threshold && activeIndex < galleryItems.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
    // 드래그가 끝나면 오프셋 값을 깔끔하게 초기화
    setDragOffset(0);
  };
  const handleCardClick = (index) => {
    if (dragOffset === 0) {
      setActiveIndex(index);
    }
  };

  return (
    <section className={styles.wideGallerySection} style={{ position: "relative" }}>

      <div className={styles.galleryHeader} style={{ position: "relative", zIndex: 10 }}>
        <img 
          src="/KAQlogo.png" 
          alt="Reportage Logo" 
          className={styles.galleryLogoAsset} 
          style={{ height: "40px", width: "auto", marginBottom: "-4px", marginRight: "-6px", marginLeft: "-4px" }} 
        />
        <h2 className={styles.galleryTitle}>Reportage Korea World</h2>
        <p className={styles.gallerySubtitle}>
          KAQ 스마트 퀄리티 랩의 정밀 비전 기술과 인프라 시뮬레이션을 가로 휠 인터랙션으로 생동감 있게 확인해 보세요.
        </p>
      </div>

      <div 
        className={styles.wideWheelStageContainer}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUpOrLeave}
        onMouseLeave={handlePointerUpOrLeave}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUpOrLeave}
        ref={stageRef}
        style={{ cursor: "pointer", userSelect: "none", position: "relative", zIndex: 10 }} // 텍스트 긁힘 방지 및 레이어 우선순위 정렬
      >
        <div className={styles.wideArcTrack}>
          {galleryItems.map((item, idx) => {
            const offset = idx - activeIndex;
            const isCenter = idx === activeIndex;

            const translateX = (offset * 260) + dragOffset; 
            const translateY = Math.abs(offset) * 15; 
            
            const rotateY = (offset * -12) + (dragOffset * 0.04); 
            const translateZ = isCenter ? 80 : -40; 
            const scale = isCenter ? 1.05 : 0.92; 

            return (
              <div
                key={item.id}
                className={`${styles.wideMobileFrameCard} ${isCenter ? styles.wideActiveCenterCard : ""}`}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: 10 - Math.abs(offset),
                  transition: isDragging ? "transform 0.05s linear, opacity 0.3s ease" : "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease"
                }}
                onClick={() => handleCardClick(idx)}
              >
                <div className={styles.cardOverlayTop}>
                  <div className={styles.cardLogoCircle}>R</div>
                  <span className={styles.cardUserHandle}>{item.handle}</span>
                </div>

                <div 
                  className={styles.cardVideoInnerThumb}
                  style={{ backgroundImage: `url(${item.bg})` }}
                >
                  <div className={styles.widePlayCenterBtn}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  </div>
                </div>

                <div className={styles.cardOverlayBottom}>
                  <p>{item.tag}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.galleryDotIndicator} style={{ position: "relative", zIndex: 10 }}>
        {galleryItems.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.indicatorDot} ${idx === activeIndex ? styles.dotActive : ""}`}
            onClick={() => setActiveIndex(idx)}
          ></div>
        ))}
      </div>
    </section>
  );
}