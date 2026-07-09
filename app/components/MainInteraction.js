"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../page.module.css";

export default function MainInteraction() {
  const containerRef = useRef(null);
  const animationWrapperRef = useRef(null); 
  const flowerRef = useRef(null);
  const facesRef = useRef(null);
  const whiteOverlayRef = useRef(null);
  const contentRef = useRef(null);

  const updateTransformOrigin = useCallback((e) => {
    if (!flowerRef.current || !facesRef.current) return;

    const xPos = e.clientX / window.innerWidth - 0.5;
    const yPos = e.clientY / window.innerHeight - 0.5;

    gsap.set([flowerRef.current, facesRef.current], {
      transformOrigin: `${50 + xPos * 60}% ${50 + yPos * 60}%`,
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let isTriggered = false;

    const handleTrigger = (e) => {
      if (isTriggered) return;
      isTriggered = true;
      updateTransformOrigin(e);
      window.removeEventListener("mouseenter", handleTrigger);
      window.removeEventListener("scroll", handleTrigger);
    };

    window.addEventListener("mouseenter", handleTrigger, { passive: true });
    window.addEventListener("scroll", handleTrigger, { passive: true });

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top", // 컨테이너가 브라우저 최상단에 닿을 때 고정 시작
          end: "bottom bottom",
          scrub: 1.2,
          pin: animationWrapperRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true, // 브라우저 크기 변경 시 트리거 재계산
        },
      });

      tl.to(flowerRef.current, { scale: 15, opacity: 0, duration: 3, ease: "power1.inOut" }, 0);
      tl.fromTo(facesRef.current, { opacity: 0, scale: 1.0 }, { opacity: 1, duration: 1.2, ease: "power1.inOut" }, 0);
      tl.to(facesRef.current, { scale: 1.8, duration: 2.5, ease: "power1.inOut" }, 0.8);
      tl.to(whiteOverlayRef.current, { opacity: 1, duration: 1.8 }, 2.2);
      tl.to(contentRef.current, { opacity: 1, y: 0, duration: 1.3, ease: "power2.out" }, "-=0.3");
    }, animationWrapperRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.removeEventListener("mouseenter", handleTrigger);
      window.removeEventListener("scroll", handleTrigger);
      if (ctx) ctx.revert();
    };
  }, [updateTransformOrigin]);

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div ref={animationWrapperRef} className={styles.stickyScene}>
        <div ref={flowerRef} className={styles.flowerLayer}></div>
        <div ref={facesRef} className={styles.facesLayer}></div>
        <div ref={whiteOverlayRef} className={styles.whiteOverlay}></div>
        <div ref={contentRef} className={styles.contentBox}>
          <h1>
            월드 클래스 대한민국의 거리 풍경, <br />
            <span>안전과 신뢰</span>로 바꾸어 갑니다.
          </h1>
          <p>
            KAQ는 독자적인 AI 계수 알고리즘과 비전 분석 기술을 통해 오프라인
            환경을 데이터로 전환하고 비즈니스 효율을 극대화하는 솔루션을
            제공합니다.
          </p>
        </div>
      </div>
    </div>
  );
}