"use client";

import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  KR: {
    badge: "Company Introduction",
    title: (
      <>
        KAQ (Korea Academy for Quality), <br />
        한국의 탁월한 AI 적용과 안전품질 기술을 <br />
        글로벌 시장으로 전파하고자 합니다.
      </>
    ),
    tabs: {
      intro: "기업소개",
      vision: "핵심가치",
      careers: "인재채용",
    },
    visionSection: {
      title: "Our Vision",
      subtitle: "AI 프롬프트 저작권과 공간안전품질 대시보드를 통해서 새로운 가치를 공유합니다.",
      subText: "AI로 세계의 평화와 고품질 문화를 지향합니다.",
      boldDesc: "KAQ는 고객과 함께 새로운 가치를 만드는 데 도전합니다. 고객의 AI 저작권과 안전품질 대시보드 가치를 보호합니다.",
      fullDesc: "모두의 AI 시대입니다. AI를 사용하는 것은 큰 가치가 없습니다. 적재적소에 얼마나 가치 있는 프롬프트를 제시할 수 있는가가 본질입니다. AI로 무엇을 어떻게 대화하면 언제 어떤 결과를 얻을 수 있는지를 체험하고 그 권리를 인정해야 합니다. 당신의 AI 가치를 인정받으시기 바랍니다.",
    },
    careersSection: {
      title: "Careers",
      desc: 'KAQ와 함께 디지털 혁신을 이끌어갈 인재를 모십니다. 오픈된 포지션 중 본인에게 적합한 역할이 없다면, "상시 인재 풀"을 통해 이력서를 제출해 주시기 바랍니다. 적합한 포지션이 열릴 시 우선적으로 검토됩니다.',
      total: "전체",
      newcomer: "신입",
      career: "경력",
      always: "상시",
      jobs: [
        { id: 1, title: "풀스택 개발자 (Full-Stack Developer)", type: "경력 3~5년 이상", location: "Seoul, Korea (Hybrid)" },
        { id: 2, title: "AI 개발자 (AI Research & Engineer)", type: "신입 / 경력", location: "Seoul, Korea (Hybrid)" },
        { id: 3, title: "상시 인재 풀 (General Application)", type: "상시 채용", location: "Seoul, Korea" },
      ],
    },
    modal: {
      title: "Application",
      jobLabel: "지원 직군",
      nameLabel: "성명 *",
      namePlaceholder: "홍길동",
      birthLabel: "생년월일 *",
      nationalityLabel: "국적 *",
      nationalityPlaceholder: "대한민국",
      linkLabel: "이력서 / 포트폴리오 링크 주소",
      linkPlaceholder: "구글 드라이브, 노션 등 공유 링크 주소를 넣어주세요.",
      submitBtn: "지원서 제출하기",
      successMsg: "지원서가 성공적으로 제출되었습니다!",
      errMsg: "제출 중 오류가 발생했습니다.",
      alertFillAll: "모든 필수 항목을 입력해주세요.",
    },
  },
  EN: {
    badge: "Company Introduction",
    title: (
      <>
        KAQ (Korea Academy for Quality), <br />
        Spreading Korea's Excellent AI Application and <br />
        Safety Quality Technology to the Global Market.
      </>
    ),
    tabs: {
      intro: "About Us",
      vision: "Core Values",
      careers: "Careers",
    },
    visionSection: {
      title: "Our Vision",
      subtitle: "Sharing new values through AI prompt copyright and space safety quality dashboards.",
      subText: "Aiming for global peace and a high-quality culture with AI.",
      boldDesc: "KAQ challenges to create new values together with customers. We protect the value of your AI copyright and safety quality dashboard.",
      fullDesc: "This is the AI era for everyone. Simply using AI holds little unique value. The essence lies in how valuable a prompt you can present at the right time and place. We must experience what, how, and when results are achieved through AI, and recognize those rights.",
    },
    careersSection: {
      title: "Careers",
      desc: 'We are looking for talent to lead digital innovation with KAQ. If there is no open position that fits you, please submit your resume through the "General Application". It will be prioritized when a suitable role opens.',
      total: "Total",
      newcomer: "Entry",
      career: "Experienced",
      always: "General",
      jobs: [
        { id: 1, title: "Full-Stack Developer", type: "3-5+ Years Experience", location: "Seoul, Korea (Hybrid)" },
        { id: 2, title: "AI Research & Engineer", type: "Entry / Experienced", location: "Seoul, Korea (Hybrid)" },
        { id: 3, title: "General Application Pool", type: "Always Open", location: "Seoul, Korea" },
      ],
    },
    modal: {
      title: "Application",
      jobLabel: "Applied Position",
      nameLabel: "Full Name *",
      namePlaceholder: "John Doe",
      birthLabel: "Date of Birth *",
      nationalityLabel: "Nationality *",
      nationalityPlaceholder: "Republic of Korea",
      linkLabel: "Resume / Portfolio Link",
      linkPlaceholder: "Please enter a shareable link (Google Drive, Notion, etc.)",
      submitBtn: "Submit Application",
      successMsg: "Your application has been submitted successfully!",
      errMsg: "An error occurred while submitting.",
      alertFillAll: "Please fill in all required fields.",
    },
  },
  JP: {
    badge: "Company Introduction",
    title: (
      <>
        KAQ (Korea Academy for Quality), <br />
        韓国の優れたAI応用と安全品質技術を <br />
        グローバル市場へ展開していきます。
      </>
    ),
    tabs: {
      intro: "会社紹介",
      vision: "核心価値",
      careers: "採用情報",
    },
    visionSection: {
      title: "Our Vision",
      subtitle: "AIプロンプトの著作権と空間安全品質ダッシュボードを通じて新しい価値を共有します。",
      subText: "AIで世界の平和と高品質な文化を目指します。",
      boldDesc: "KAQはお客様と共に新しい価値の創造に挑戦します。お客様のAI著作権と安全品質ダッシュボードの価値を守ります。",
      fullDesc: "誰もがAIを利用する時代です。単にAIを使うこと自体には大きな価値はありません。適材適所でどれほど価値のあるプロンプトを提示できるかが本質です。AIで何を取り扱い、どのような結果が得られるかを体感し、その権利を認識されることを願います。",
    },
    careersSection: {
      title: "Careers",
      desc: "KAQと共にデジタルイノベーションをリードする人材を募集しています。現在オープンしているポジションに適した役割がない場合は、「常時人材プール」を通じて履歴書をご提出ください。適したポジションが開設された際に優先的に検討いたします。",
      total: "全体",
      newcomer: "新卒",
      career: "中途",
      always: "常時",
      jobs: [
        { id: 1, title: "フルスタック開発者 (Full-Stack Developer)", type: "実務経験 3~5年以上", location: "Seoul, Korea (Hybrid)" },
        { id: 2, title: "AI開発者 (AI Research & Engineer)", type: "新卒 / 中途", location: "Seoul, Korea (Hybrid)" },
        { id: 3, title: "常時人材プール (General Application)", type: "通年採用", location: "Seoul, Korea" },
      ],
    },
    modal: {
      title: "Application",
      jobLabel: "応募職種",
      nameLabel: "氏名 *",
      namePlaceholder: "山田 太郎",
      birthLabel: "生年月日 *",
      nationalityLabel: "国籍 *",
      nationalityPlaceholder: "日本 / 韓国",
      linkLabel: "履歴書 / ポートフォリオ リンク",
      linkPlaceholder: "Google Drive, Notion などの共有リンクを入力してください。",
      submitBtn: "応募書類を提出する",
      successMsg: "応募書類が正常に送信されました！",
      errMsg: "送信中にエラーが発生しました。",
      alertFillAll: "すべての必須項目を入力してください。",
    },
  },
  TH: {
    badge: "Company Introduction",
    title: (
      <>
        KAQ (Korea Academy for Quality), <br />
        มุ่งมั่นเผยแพร่เทคโนโลยี AI และคุณภาพความปลอดภัย <br />
        อันยอดเยี่ยมของเกาหลีสู่ตลาดโลก
      </>
    ),
    tabs: {
      intro: "เกี่ยวกับเรา",
      vision: "ค่านิยมหลัก",
      careers: "ร่วมงานกับเรา",
    },
    visionSection: {
      title: "Our Vision",
      subtitle: "แบ่งปันคุณค่าใหม่ผ่านลิขสิทธิ์ AI Prompt และแดชบอร์ดคุณภาพความปลอดภัยของพื้นที่",
      subText: "มุ่งสู่สันติภาพโลกและวัฒนธรรมคุณภาพสูงด้วย AI",
      boldDesc: "KAQ ท้าทายสร้างสรรค์คุณค่าใหม่ร่วมกับลูกค้า เราปกป้องคุณค่าของลิขสิทธิ์ AI และแดชบอร์ดความปลอดภัยของคุณ",
      fullDesc: "นี่คือยุค AI สำหรับทุกคน การใช้ AI เพียงอย่างเดียวไม่ใช่สิ่งพิเศษ สิ่งสำคัญคือคุณจะนำเสนอ Prompt ที่มีคุณค่าได้อย่างไรในเวลาและสถานที่ที่เหมาะสม รับการยอมรับในคุณค่า AI ของคุณวันนี้",
    },
    careersSection: {
      title: "Careers",
      desc: 'เรากำลังมองหาบุคลากรเพื่อเป็นผู้นำนวัตกรรมดิจิทัลร่วมกับ KAQ หากไม่มีตำแหน่งที่ตรงกับคุณ โปรดส่งเรซูเม่ผ่าน "คลังบุคลากรทั่วไป" เพื่อรับการพิจารณาก่อนเมื่อมีตำแหน่งเปิดรับ',
      total: "ทั้งหมด",
      newcomer: "จบใหม่",
      career: "มีประสบการณ์",
      always: "ตลอดปี",
      jobs: [
        { id: 1, title: "Full-Stack Developer", type: "ประสบการณ์ 3-5+ ปี", location: "Seoul, Korea (Hybrid)" },
        { id: 2, title: "AI Research & Engineer", type: "จบใหม่ / มีประสบการณ์", location: "Seoul, Korea (Hybrid)" },
        { id: 3, title: "คลังบุคลากรทั่วไป (General Application)", type: "เปิดรับตลอดปี", location: "Seoul, Korea" },
      ],
    },
    modal: {
      title: "Application",
      jobLabel: "ตำแหน่งที่สมัคร",
      nameLabel: "ชื่อ-นามสกุล *",
      namePlaceholder: "สมชาย ใจดี",
      birthLabel: "วันเดือนปีเกิด *",
      nationalityLabel: "สัญชาติ *",
      nationalityPlaceholder: "ไทย / เกาหลี",
      linkLabel: "ลิงก์เรซูเม่ / พอร์ตโฟลิโอ",
      linkPlaceholder: "กรุณาใส่ลิงก์ที่แชร์ได้ (Google Drive, Notion ฯลฯ)",
      submitBtn: "ส่งใบสมัคร",
      successMsg: "ส่งใบสมัครเรียบร้อยแล้ว!",
      errMsg: "เกิดข้อผิดพลาดขณะส่งใบสมัคร",
      alertFillAll: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
    },
  },
};

export default function AboutPage() {
  const { currentLang } = useLanguage();
  const t = translations[currentLang] || translations.KR;

  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const [careersVisible, setCareersVisible] = useState(false);

  const topRef = useRef(null);
  const visionRef = useRef(null);
  const careersRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [activeTab, setActiveTab] = useState(t.tabs.intro);

  const tabs = [
    { name: t.tabs.intro, ref: topRef, key: "intro" },
    { name: t.tabs.vision, ref: visionRef, key: "vision" },
    { name: t.tabs.careers, ref: careersRef, key: "careers" },
  ];

  useEffect(() => {
    setActiveTab(t.tabs.intro);
  }, [currentLang]);

  const handleTabClick = (tabName, refObj) => {
    setActiveTab(tabName);
    if (refObj && refObj.current) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = refObj.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScrollActiveTab = () => {
      const scrollPosition = window.scrollY + 250;
      const topEl = topRef.current;
      const visionEl = visionRef.current;
      const careersEl = careersRef.current;

      if (careersEl && scrollPosition >= careersEl.offsetTop) {
        setActiveTab(t.tabs.careers);
      } else if (visionEl && scrollPosition >= visionEl.offsetTop) {
        setActiveTab(t.tabs.vision);
      } else if (topEl) {
        setActiveTab(t.tabs.intro);
      }
    };

    window.addEventListener("scroll", handleScrollActiveTab, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollActiveTab);
  }, [t]);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.15 };
    const leftObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLeftVisible(true);
    }, observerOptions);
    const rightObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRightVisible(true);
    }, observerOptions);
    const careersObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCareersVisible(true);
    }, observerOptions);

    if (leftRef.current) leftObserver.observe(leftRef.current);
    if (rightRef.current) rightObserver.observe(rightRef.current);
    if (careersRef.current) careersObserver.observe(careersRef.current);

    return () => {
      if (leftRef.current) leftObserver.unobserve(leftRef.current);
      if (rightRef.current) rightObserver.unobserve(rightRef.current);
      if (careersRef.current) careersObserver.unobserve(careersRef.current);
    };
  }, []);

  const jobOpenings = t.careersSection.jobs;

  const totalCount = jobOpenings.length;
  const newcomerCount = jobOpenings.filter((job) => job.type.includes("신입") || job.type.includes("Entry") || job.type.includes("新卒") || job.type.includes("จบใหม่")).length;
  const careerCount = jobOpenings.filter((job) => job.type.includes("경력") || job.type.includes("Experience") || job.type.includes("中途") || job.type.includes("ประสบการณ์")).length;
  const alwaysCount = jobOpenings.filter((job) => job.type.includes("상시") || job.type.includes("Always") || job.type.includes("通年") || job.type.includes("ตลอดปี")).length;

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleOpenApply = (jobTitle) => {
    setSelectedJob(jobTitle);
    setIsApplyOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !birthDate || !nationality) {
      alert(t.modal.alertFillAll);
      return;
    }
    const templateParams = {
      job_title: selectedJob,
      user_name: name,
      user_birth: birthDate,
      user_nationality: nationality,
      file_url: fileLink || "N/A",
    };
    emailjs
      .send("service_jz546gh", "template_mn5mvrd", templateParams, "vyRLXyXzHI1yh7Z0m")
      .then(() => {
        alert(t.modal.successMsg);
        setIsApplyOpen(false);
        setName("");
        setBirthDate("");
        setNationality("");
        setFileLink("");
      })
      .catch((err) => {
        alert(t.modal.errMsg);
        console.error(err);
      });
  };

  return (
    <div
      ref={topRef}
      style={{
        backgroundColor: "#fff",
        color: "#111",
        padding: "140px 20px 120px 20px",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .vision-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: start;
        }
        .vision-img-container {
          position: relative;
          width: 100%;
          height: 520px;
          margin: 0;
          overflow: hidden;
          border-radius: 12px;
        }
        @media (max-width: 900px) {
          .vision-wrapper {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .vision-img-container {
            height: 260px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* ================= [기업소개 섹션] ================= */}
        <div style={{ marginBottom: "0px" }}>
          <div style={{ marginBottom: "40px" }}>
            <span
              style={{
                fontSize: "13px",
                color: "#0052ff",
                fontWeight: "bold",
                letterSpacing: "2px",
                display: "block",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              {t.badge}
            </span>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: "800",
                lineHeight: "1.35",
                letterSpacing: "-1.5px",
                color: "#111",
                margin: 0,
                wordBreak: "keep-all",
              }}
            >
              {t.title}
            </h1>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.name, tab.ref)}
                  style={{
                    backgroundColor: isActive ? "#0052ff" : "#f5f7fa",
                    color: isActive ? "#fff" : "#333",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "24px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive ? "0 4px 12px rgba(0,82,255,0.2)" : "none",
                  }}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          <div
            style={{
              width: "100%",
              height: "clamp(240px, 40vh, 400px)",
              backgroundColor: "#050b14",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80"
              alt="Visual Showcase"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.45,
                mixBlendMode: "luminosity",
              }}
            />
          </div>
        </div>

        {/* ================= [핵심가치 섹션] ================= */}
        <div ref={visionRef} style={{ scrollMarginTop: "120px" }}>
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "100px 0 60px 0" }} />

          <div className="vision-wrapper">
            <div
              ref={leftRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                opacity: leftVisible ? 1 : 0,
                transform: leftVisible ? "translateX(0)" : "translateX(-50px)",
                transition: "all 1s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <div style={{ padding: "0 4px" }}>
                <h3
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: "800",
                    color: "#0052ff",
                    margin: "0 0 24px 0",
                    letterSpacing: "-1px",
                  }}
                >
                  {t.visionSection.title}
                </h3>
                <p style={{ color: "#333", fontSize: "16px", fontWeight: "500", lineHeight: "1.85", margin: 0, wordBreak: "keep-all" }}>
                  {t.visionSection.subtitle}
                  <br />
                  <span style={{ color: "#666", fontWeight: "400" }}>{t.visionSection.subText}</span>
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingLeft: "4px", borderTop: "1px solid #f0f0f0", paddingTop: "30px" }}>
                <p style={{ color: "#111", fontSize: "18px", fontWeight: "700", lineHeight: "1.65", margin: 0, wordBreak: "keep-all" }}>
                  {t.visionSection.boldDesc}
                </p>
                <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.8", margin: 0, wordBreak: "keep-all" }}>
                  {t.visionSection.fullDesc}
                </p>
              </div>
            </div>

            <div
              ref={rightRef}
              className="vision-img-container"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateX(0)" : "translateX(50px)",
                transition: "all 1s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                alt="KAQ Architecture"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* ================= [인재채용 섹션] ================= */}
        <div
          ref={careersRef}
          style={{
            position: "relative",
            opacity: careersVisible ? 1 : 0,
            transform: careersVisible ? "translateY(0)" : "translateY(50px)",
            transition: "all 1s cubic-bezier(0.25, 1, 0.5, 1)",
            scrollMarginTop: "120px",
          }}
        >
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "100px 0 60px 0" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: "800",
                marginBottom: "16px",
                letterSpacing: "-1px",
                color: "#0052ff",
              }}
            >
              {t.careersSection.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", marginBottom: "30px", maxWidth: "800px", wordBreak: "keep-all" }}>
              {t.careersSection.desc}
            </p>

            <div style={{ fontSize: "14px", color: "#666", marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <span>{t.careersSection.total} <strong style={{ color: "#111" }}>{totalCount}</strong></span>
              <span>{t.careersSection.newcomer} <strong style={{ color: "#111" }}>{newcomerCount}</strong></span>
              <span>{t.careersSection.career} <strong style={{ color: "#111" }}>{careerCount}</strong></span>
              <span>{t.careersSection.always} <strong style={{ color: "#111" }}>{alwaysCount}</strong></span>
            </div>

            <hr style={{ border: "none", borderTop: "2px solid #111", margin: "20px 0 0 0" }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {jobOpenings.map((job) => {
                const isHovered = hoveredCardId === job.id;

                return (
                  <div
                    key={job.id}
                    onMouseEnter={() => setHoveredCardId(job.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => handleOpenApply(job.title)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "32px",
                      paddingBottom: "32px",
                      paddingLeft: isHovered ? "12px" : "0px",
                      paddingRight: isHovered ? "12px" : "0px",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      backgroundColor: isHovered ? "#fafafa" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span style={{ fontSize: "13px", color: "#888", fontWeight: "500" }}>
                        {job.location} · {job.type}
                      </span>
                      <h3
                        style={{
                          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                          fontWeight: "700",
                          margin: "0",
                          color: "#111",
                          letterSpacing: "-0.5px",
                          wordBreak: "keep-all",
                        }}
                      >
                        {job.title}
                      </h3>
                    </div>

                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "1px solid",
                        borderColor: isHovered ? "#0052ff" : "#ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isHovered ? "#0052ff" : "#fff",
                        color: isHovered ? "#fff" : "#111",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 지원하기 모달 팝업 */}
      {isApplyOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              position: "relative",
              color: "#111",
              margin: "0 16px",
            }}
          >
            <button
              onClick={() => setIsApplyOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "24px",
                cursor: "pointer",
                color: "#888",
              }}
            >
              &times;
            </button>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "8px", color: "#0052ff" }}>
              {t.modal.title}
            </h2>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
              {t.modal.jobLabel}: <strong>{selectedJob}</strong>
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>{t.modal.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "15px" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>{t.modal.birthLabel}</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "15px" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>{t.modal.nationalityLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.nationalityPlaceholder}
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "15px" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>{t.modal.linkLabel}</label>
                <input
                  type="url"
                  placeholder={t.modal.linkPlaceholder}
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#0052ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "10px",
                  transition: "background-color 0.2s",
                }}
              >
                {t.modal.submitBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}