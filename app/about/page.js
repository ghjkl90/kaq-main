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
      className="aboutPage"
    >
      <style>{`
        .aboutPage {
          width: 100%;
          background-color: #ffffff;
          color: #111625;
          padding: 140px 20px 120px 20px;
          min-height: 100vh;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        .aboutInner {
          max-width: 1276px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* 탭 버튼 */
        .aboutTabBtn {
          border: none;
          padding: 10px 24px;
          border-radius: 99px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .aboutTabBtn--active {
          background-color: #0052ff;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 82, 255, 0.25);
        }

        .aboutTabBtn--inactive {
          background-color: #f2f5fd;
          color: #555b66;
        }

        .aboutTabBtn--inactive:hover {
          background-color: #e5ebfa;
          color: #111625;
        }

        /* 비전 그리드 */
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
          border-radius: 24px;
          box-shadow: 0 16px 34px -18px rgba(15, 23, 42, 0.15);
        }

        /* ==========================================================
           피그마 32 x 32 정밀 원형 화살표 버튼 (완전 중앙 정렬)
           ========================================================== */
        .jobArrowBtn {
          width: 32px !important;
          height: 32px !important;
          min-width: 32px !important;
          min-height: 32px !important;
          max-width: 32px !important;
          max-height: 32px !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          border: 1px solid #E1E5EE !important;
          background-color: #ffffff !important;
          color: #111625 !important;
          transition: all 0.25s ease !important;
          flex-shrink: 0 !important;
          box-sizing: border-box !important;
        }

        .jobRow:hover .jobArrowBtn {
          background-color: #0052ff !important;
          border-color: #0052ff !important;
          color: #ffffff !important;
          transform: translateX(2px);
        }

        .jobRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 12px;
          border-bottom: 1px solid #E1E5EE;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 12px;
          box-sizing: border-box;
        }

        .jobRow:hover {
          background-color: #f8fafc;
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

      <div className="aboutInner">
        {/* ================= [기업소개 섹션] ================= */}
        <div style={{ marginBottom: "0px" }}>
          {/* 1. 상단 대표 배지 & 타이틀 */}
          <div style={{ marginBottom: "32px" }}>
            <span
              style={{
                fontSize: "20px",
                color: "#0052ff",
                fontWeight: "700",
                letterSpacing: "0",
                display: "block",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}
            >
              {t.badge}
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 40px)",
                fontWeight: "700",
                lineHeight: "1.3",
                letterSpacing: "0",
                color: "#111625",
                margin: 0,
                wordBreak: "keep-all",
              }}
            >
              {t.title}
            </h1>
          </div>

          {/* 2. 서브 탭 메뉴 */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.name, tab.ref)}
                  className={`aboutTabBtn ${isActive ? "aboutTabBtn--active" : "aboutTabBtn--inactive"}`}
                  type="button"
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* 3. 와이드 비주얼 배너 */}
          <div
            style={{
              width: "100%",
              height: "clamp(240px, 40vh, 440px)",
              backgroundColor: "#050b14",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 45px -20px rgba(15, 23, 42, 0.15)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80"
              alt="Visual Showcase"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.5,
                mixBlendMode: "luminosity",
              }}
            />
          </div>
        </div>

        {/* ================= [핵심가치 섹션] ================= */}
        <div ref={visionRef} style={{ scrollMarginTop: "120px" }}>
          <hr style={{ border: "none", borderTop: "1px solid #E1E5EE", margin: "80px 0 60px 0" }} />

          <div className="vision-wrapper">
            <div
              ref={leftRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                opacity: leftVisible ? 1 : 0,
                transform: leftVisible ? "translateX(0)" : "translateX(-32px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div style={{ padding: "0 4px" }}>
                <h3
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 28px)",
                    fontWeight: "700",
                    color: "#0052ff",
                    margin: "0 0 16px 0",
                    lineHeight: "1.3",
                    letterSpacing: "0",
                  }}
                >
                  {t.visionSection.title}
                </h3>
                <p style={{ color: "#111625", fontSize: "18px", fontWeight: "500", lineHeight: "1.6", margin: 0, wordBreak: "keep-all" }}>
                  {t.visionSection.subtitle}
                  <br />
                  <span style={{ color: "#626772", fontWeight: "400" }}>{t.visionSection.subText}</span>
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "4px", borderTop: "1px solid #E1E5EE", paddingTop: "28px" }}>
                <p style={{ color: "#111625", fontSize: "18px", fontWeight: "700", lineHeight: "1.5", margin: 0, wordBreak: "keep-all" }}>
                  {t.visionSection.boldDesc}
                </p>
                <p style={{ color: "#555b66", fontSize: "16px", fontWeight: "400", lineHeight: "1.6", margin: 0, wordBreak: "keep-all" }}>
                  {t.visionSection.fullDesc}
                </p>
              </div>
            </div>

            <div
              ref={rightRef}
              className="vision-img-container"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateX(0)" : "translateX(32px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
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
            transform: careersVisible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            scrollMarginTop: "120px",
          }}
        >
          <hr style={{ border: "none", borderTop: "1px solid #E1E5EE", margin: "100px 0 60px 0" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 36px)",
                fontWeight: "700",
                marginBottom: "12px",
                letterSpacing: "0",
                color: "#0052ff",
              }}
            >
              {t.careersSection.title}
            </h2>
            <p style={{ fontSize: "16px", fontWeight: "400", color: "#555b66", lineHeight: "1.6", marginBottom: "28px", maxWidth: "840px", wordBreak: "keep-all" }}>
              {t.careersSection.desc}
            </p>

            <div style={{ fontSize: "14px", color: "#626772", marginBottom: "20px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <span>{t.careersSection.total} <strong style={{ color: "#111625" }}>{totalCount}</strong></span>
              <span>{t.careersSection.newcomer} <strong style={{ color: "#111625" }}>{newcomerCount}</strong></span>
              <span>{t.careersSection.career} <strong style={{ color: "#111625" }}>{careerCount}</strong></span>
              <span>{t.careersSection.always} <strong style={{ color: "#111625" }}>{alwaysCount}</strong></span>
            </div>

            <hr style={{ border: "none", borderTop: "2px solid #111625", margin: "20px 0 0 0" }} />

            <div style={{ display: "flex", flexDirection: "column" }}>
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="jobRow"
                  onMouseEnter={() => setHoveredCardId(job.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => handleOpenApply(job.title)}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "13px", color: "#888", fontWeight: "500" }}>
                      {job.location} · {job.type}
                    </span>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        margin: "0",
                        color: "#111625",
                        letterSpacing: "-0.3px",
                        wordBreak: "keep-all",
                      }}
                    >
                      {job.title}
                    </h3>
                  </div>

                  {/* 32x32 정밀 원형 화살표 버튼 */}
                  <div className="jobArrowBtn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              ))}
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
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "40px",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 20px 45px -15px rgba(15, 23, 42, 0.2)",
              position: "relative",
              color: "#111625",
              margin: "0 16px",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={() => setIsApplyOpen(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                border: "none",
                backgroundColor: "transparent",
                fontSize: "26px",
                cursor: "pointer",
                color: "#888",
              }}
              type="button"
            >
              &times;
            </button>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "#0052ff" }}>
              {t.modal.title}
            </h2>
            <p style={{ fontSize: "15px", color: "#626772", marginBottom: "24px" }}>
              {t.modal.jobLabel}: <strong>{selectedJob}</strong>
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.birthLabel}</label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.nationalityLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.modal.nationalityPlaceholder}
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.linkLabel}</label>
                <input
                  type="url"
                  placeholder={t.modal.linkPlaceholder}
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#0052ff",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "99px",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  marginTop: "8px",
                  transition: "background-color 0.25s ease, transform 0.25s ease",
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