"use client";

import { useState, useRef } from "react";
import styles from "../page.module.css";

export default function MediaGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerXStart, setPointerXStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef(null);

  const galleryItems = [
    { id: 1, handle: "@reportage.korea", tag: "Construction Update", bg: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" },
    { id: 2, handle: "@reportage.digital", tag: "AI Safety Demo", bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" },
    { id: 3, handle: "@reportage.smartcity", tag: "KAQ Lab Introduction", bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
    { id: 4, handle: "@reportage.innovation", tag: "Digital Twin Suite", bg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" },
    { id: 5, handle: "@reportage.vision", tag: "Platform Showreel", bg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" }
  ];

  const total = galleryItems.length;
  const cardWidth = 320; 

  // 🌟 [추가된 부분] 카드 클릭 시 정중앙으로 활성화시키는 핸들러
  const handleCardClick = (idx) => {
    if (isDragging && Math.abs(dragOffset) > 10) return; // 드래그 중일 때는 클릭 무시
    setActiveIndex(idx);
  };

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
    setDragOffset(diffX);
  };

  const handlePointerUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (stageRef.current) {
      stageRef.current.style.cursor = "pointer";
    }

    const threshold = 80;
    if (dragOffset > threshold) {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    } else if (dragOffset < -threshold) {
      setActiveIndex((prev) => (prev + 1) % total);
    }
    setDragOffset(0);
  };

  return (
    <section className={styles.wideGallerySection} style={{ position: "relative", overflow: "hidden", backgroundColor: "#f8fafc", padding: "6px 0 60px 0" }}>

      <div className={styles.galleryHeader} style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: "20px" }}>
        <img 
          src="/KAQlogo.png" 
          alt="Reportage Logo" 
          className={styles.galleryLogoAsset} 
          style={{ height: "40px", width: "auto", marginBottom: "8px" }} 
        />
        <h2 className={styles.galleryTitle} style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: "0 0 12px 0" }}>As You See</h2>
        <p className={styles.gallerySubtitle} style={{ color: "#475569", fontSize: "16px", lineHeight: "1.6" }}>
          AI는 당신이 상상하는 것을 눈으로 보게 만듭니다. 
          <br/>상상하는 것으로 체험해 보세요.
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
        style={{ 
          cursor: "pointer", 
          userSelect: "none", 
          position: "relative", 
          zIndex: 10,
          height: "620px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          perspective: "1400px"
        }} 
      >
        <div className={styles.wideArcTrack} style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
          {galleryItems.map((item, idx) => {
            let offset = idx - activeIndex;
            if (offset < -total / 2) offset += total;
            if (offset > total / 2) offset -= total;

            const dragNormalized = dragOffset / cardWidth;
            const currentOffset = offset - dragNormalized;

            const absOffset = Math.abs(currentOffset);

            const translateX = currentOffset * 340; 
            const translateY = Math.pow(absOffset, 2) * 16; 
            const translateZ = -Math.pow(absOffset, 1.5) * 80;

            const rotateY = currentOffset * -16; 
            const rotateZ = currentOffset * 1.5;
            
            const scale = 1 - (absOffset * 0.04);
            const opacity = 1 - (absOffset * 0.2);

            if (Math.abs(currentOffset) > 2.5) return null;

            return (
              <div
                key={item.id}
                className={`${styles.wideMobileFrameCard} ${idx === activeIndex ? styles.wideActiveCenterCard : ""}`}
                style={{
                  position: "absolute",
                  left: "calc(50% - 160px)",
                  top: "20px",
                  width: "320px",
                  height: "530px",
                  borderRadius: "28px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                  transformOrigin: "center center",
                  zIndex: Math.round(100 - absOffset * 20),
                  opacity: Math.max(0, opacity),
                  transition: isDragging ? "transform 0.05s linear, opacity 0.05s linear" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
                }}
                onClick={() => handleCardClick(idx)}
              >
                {/* 상단 레이아웃 */}
                <div className={styles.cardOverlayTop} style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "24px", zIndex: 2, display: "flex", alignItems: "center", gap: "10px", background: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)" }}>
                  <div className={styles.cardLogoCircle} style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#ffffff", color: "#0052ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "16px" }}>R</div>
                  <span className={styles.cardUserHandle} style={{ color: "#ffffff", fontSize: "14px", fontWeight: "600" }}>{item.handle}</span>
                </div>

                {/* 이미지 영역 */}
                <div 
                  className={styles.cardVideoInnerThumb}
                  style={{ 
                    backgroundImage: `url(${item.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%"
                  }}
                />

                {/* 하단 레이아웃 */}
                <div className={styles.cardOverlayBottom} style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px", zIndex: 2, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                  <p style={{ color: "#ffffff", margin: 0, fontSize: "16px", fontWeight: "700" }}>{item.tag}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 도트 인디케이터 */}
      <div className={styles.galleryDotIndicator} style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
        {galleryItems.map((_, idx) => (
          <div
            key={idx}
            className={`${styles.indicatorDot} ${idx === activeIndex ? styles.dotActive : ""}`}
            onClick={() => setActiveIndex(idx)}
            style={{
              width: idx === activeIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: idx === activeIndex ? "#0052ff" : "#cbd5e1",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}