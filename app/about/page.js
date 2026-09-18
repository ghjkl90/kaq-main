"use client";

import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const IMG = {
  visionBanner: "/vision-banner.jpg",
  cardSpace: "/card-space.jpg",
  cardPeople: "/card-people.jpg",
  cardTech: "/card-tech.jpg",
  techBg: "/tech-bg.jpg",
};

const ArrowIcon = ({ size = 28, color = "#000000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const translations = {
  KR: {
    tabs: { intro: "기업소개", vision: "핵심가치", careers: "인재채용" },
    hero: {
      badge: "ABOUT KAQ",
      title: (
        <>
          사람을 위한 AI와
          <br />
          공간을 위한 품질 기술을 만듭니다.
        </>
      ),
    },
    visionBanner: {
      badge: "OUR VISION",
      title: "Peace and Quality with AI",
      desc: (
        <>
          AI와 품질 기술이 사람의 삶을 더 안전하고 편리하게 만드는 것.
          <br />
          그것이 KAQ가 기술을 바라보는 방향입니다.
        </>
      ),
    },
    research: {
      title: (
        <>
          연구에서 시작해
          <br />
          사람과 공간의 변화로 연결합니다.
        </>
      ),
      cards: [
        { title: "공간", desc: <>안전과 품질 상태를 측정하고<br />관리할 수 있는 데이터 환경</>, img: IMG.cardSpace },
        { title: "사람", desc: <>누구나 AI를 이해하고<br />사용할 수 있는 경험 설계</>, img: IMG.cardPeople },
        { title: "기술", desc: <>연구 결과를 특허와 플랫폼,<br />실제 서비스로 연결</>, img: IMG.cardTech },
      ],
    },
    techSection: {
      title: (
        <>
          기술을 더 쉽게,
          <br />
          품질을 더 명확하게.
        </>
      ),
      cards: [
        { badge: "Accessibility", title: <>기술은 누구에게나<br />사용할 수 있어야 합니다.</>, desc: <>연령과 경험의 차이를 넘어 사용할 수 있는<br />AI 경험을 설계합니다.</> },
        { badge: "Evidence", title: <>품질은 느낌이 아니라<br />확인할 수 있어야 합니다.</>, desc: <>데이터와 측정을 기반으로<br />안전과 품질을 이해합니다.</> },
        { badge: "Standardization", title: <>좋은 기술은<br />반복하고 확장할 수 있어야 합니다.</>, desc: <>연구 결과를 표준화 가능한 구조와<br />서비스로 발전시킵니다.</> },
      ],
    },
    careersSection: {
      eyebrow: "CAREERS",
      heading: (
        <>
          함께 새로운 기준을
          <br />
          만들어갈 사람을 기다립니다.
        </>
      ),
      jobs: [
        { id: 1, main: "풀스택 개발자", sub: "(Full-Stack Developer)", type: "경력 3~5년 이상", location: "Seoul, Korea (Hybrid)" },
        { id: 2, main: "AI 개발자", sub: "(AI Research & Engineer)", type: "신입 / 경력", location: "Seoul, Korea (Hybrid)" },
        { id: 3, main: "상시 인재 풀", sub: "(General Application)", type: "상시 채용", location: "Seoul, Korea" },
      ],
    },
    cta: {
      title: (
        <>
          KAQ와 함께 새로운 AI 경험과
          <br />
          안전품질의 기준을 만들어보세요.
        </>
      ),
      button: "문의하기",
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
    tabs: { intro: "About Us", vision: "Core Values", careers: "Careers" },
    hero: {
      badge: "ABOUT KAQ",
      title: (
        <>
          AI for People,
          <br />
          Quality Technology for Space.
        </>
      ),
    },
    visionBanner: {
      badge: "OUR VISION",
      title: "Peace and Quality with AI",
      desc: (
        <>
          AI and quality technology that make people's lives safer and more convenient.
          <br />
          That is the direction KAQ takes with technology.
        </>
      ),
    },
    research: {
      title: (
        <>
          Starting from Research,
          <br />
          Connecting to Change for People and Space.
        </>
      ),
      cards: [
        { title: "Space", desc: <>A data environment that measures and<br />manages safety and quality conditions.</>, img: IMG.cardSpace },
        { title: "People", desc: <>Designing experiences so anyone can<br />understand and use AI.</>, img: IMG.cardPeople },
        { title: "Technology", desc: <>Connecting research results to patents,<br />platforms, and real services.</>, img: IMG.cardTech },
      ],
    },
    techSection: {
      title: (
        <>
          Making Technology Easier,
          <br />
          Quality Clearer.
        </>
      ),
      cards: [
        { badge: "Accessibility", title: <>Technology should be usable<br />by anyone.</>, desc: <>We design AI experiences usable across<br />differences in age and experience.</> },
        { badge: "Evidence", title: <>Quality should be verifiable,<br />not just felt.</>, desc: <>We understand safety and quality<br />based on data and measurement.</> },
        { badge: "Standardization", title: <>Good technology should be<br />repeatable and scalable.</>, desc: <>We develop research results into<br />standardizable structures and services.</> },
      ],
    },
    careersSection: {
      eyebrow: "CAREERS",
      heading: (
        <>
          We're looking for people
          <br />
          to set a new standard together.
        </>
      ),
      jobs: [
        { id: 1, main: "Full-Stack Developer", sub: "", type: "3-5+ Years Experience", location: "Seoul, Korea (Hybrid)" },
        { id: 2, main: "AI Research & Engineer", sub: "", type: "Entry / Experienced", location: "Seoul, Korea (Hybrid)" },
        { id: 3, main: "General Application Pool", sub: "", type: "Always Open", location: "Seoul, Korea" },
      ],
    },
    cta: {
      title: (
        <>
          Build a new standard for AI experience
          <br />
          and safety quality together with KAQ.
        </>
      ),
      button: "Contact Us",
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
    tabs: { intro: "会社紹介", vision: "核心価値", careers: "採用情報" },
    hero: {
      badge: "ABOUT KAQ",
      title: (
        <>
          人のためのAIと
          <br />
          空間のための品質技術をつくります。
        </>
      ),
    },
    visionBanner: {
      badge: "OUR VISION",
      title: "Peace and Quality with AI",
      desc: (
        <>
          AIと品質技術が人々の暮らしをより安全で便利にすること。
          <br />
          それがKAQが技術を見つめる方向です。
        </>
      ),
    },
    research: {
      title: (
        <>
          研究から始まり
          <br />
          人と空間の変化へとつなげます。
        </>
      ),
      cards: [
        { title: "空間", desc: <>安全と品質の状態を測定し<br />管理できるデータ環境</>, img: IMG.cardSpace },
        { title: "人", desc: <>誰もがAIを理解し<br />利用できる体験設計</>, img: IMG.cardPeople },
        { title: "技術", desc: <>研究成果を特許やプラットフォーム、<br />実際のサービスへ接続</>, img: IMG.cardTech },
      ],
    },
    techSection: {
      title: (
        <>
          技術をより簡単に、
          <br />
          品質をより明確に。
        </>
      ),
      cards: [
        { badge: "Accessibility", title: <>技術は誰もが<br />使えなければなりません。</>, desc: <>年齢や経験の違いを越えて使える<br />AI体験を設計します。</> },
        { badge: "Evidence", title: <>品質は感覚ではなく<br />確認できるものであるべきです。</>, desc: <>データと測定に基づいて<br />安全と品質を理解します。</> },
        { badge: "Standardization", title: <>優れた技術は<br />反復し拡張できるものです。</>, desc: <>研究成果を標準化可能な構造と<br />サービスへと発展させます。</> },
      ],
    },
    careersSection: {
      eyebrow: "CAREERS",
      heading: (
        <>
          共に新しい基準を
          <br />
          作っていく人材を待っています。
        </>
      ),
      jobs: [
        { id: 1, main: "フルスタック開発者", sub: "(Full-Stack Developer)", type: "実務経験 3~5年以上", location: "Seoul, Korea (Hybrid)" },
        { id: 2, main: "AI開発者", sub: "(AI Research & Engineer)", type: "新卒 / 中途", location: "Seoul, Korea (Hybrid)" },
        { id: 3, main: "常時人材プール", sub: "(General Application)", type: "通年採用", location: "Seoul, Korea" },
      ],
    },
    cta: {
      title: (
        <>
          KAQと共に新しいAI体験と
          <br />
          安全品質の基準を作りましょう。
        </>
      ),
      button: "お問い合わせ",
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
    tabs: { intro: "เกี่ยวกับเรา", vision: "ค่านิยมหลัก", careers: "ร่วมงานกับเรา" },
    hero: {
      badge: "ABOUT KAQ",
      title: (
        <>
          AI เพื่อผู้คน
          <br />
          เทคโนโลยีคุณภาพเพื่อพื้นที่
        </>
      ),
    },
    visionBanner: {
      badge: "OUR VISION",
      title: "Peace and Quality with AI",
      desc: (
        <>
          AI และเทคโนโลยีคุณภาพที่ทำให้ชีวิตผู้คนปลอดภัยและสะดวกสบายยิ่งขึ้น
          <br />
          นั่นคือทิศทางที่ KAQ มองเทคโนโลยี
        </>
      ),
    },
    research: {
      title: (
        <>
          เริ่มต้นจากงานวิจัย
          <br />
          เชื่อมโยงสู่การเปลี่ยนแปลงของผู้คนและพื้นที่
        </>
      ),
      cards: [
        { title: "พื้นที่", desc: <>สภาพแวดล้อมข้อมูลที่วัดและจัดการ<br />สถานะความปลอดภัยและคุณภาพได้</>, img: IMG.cardSpace },
        { title: "ผู้คน", desc: <>ออกแบบประสบการณ์ให้ทุกคนเข้าใจ<br />และใช้งาน AI ได้</>, img: IMG.cardPeople },
        { title: "เทคโนโลยี", desc: <>เชื่อมโยงผลงานวิจัยสู่สิทธิบัตร แพลตฟอร์ม<br />และบริการจริง</>, img: IMG.cardTech },
      ],
    },
    techSection: {
      title: (
        <>
          ทำให้เทคโนโลยีง่ายขึ้น
          <br />
          ทำให้คุณภาพชัดเจนขึ้น
        </>
      ),
      cards: [
        { badge: "Accessibility", title: <>เทคโนโลยีต้องใช้งานได้<br />สำหรับทุกคน</>, desc: <>ออกแบบประสบการณ์ AI ที่ใช้ได้<br />ข้ามความแตกต่างด้านอายุและประสบการณ์</> },
        { badge: "Evidence", title: <>คุณภาพต้องพิสูจน์ได้<br />ไม่ใช่แค่ความรู้สึก</>, desc: <>เข้าใจความปลอดภัยและคุณภาพ<br />บนพื้นฐานของข้อมูลและการวัดผล</> },
        { badge: "Standardization", title: <>เทคโนโลยีที่ดีต้อง<br />ทำซ้ำและขยายผลได้</>, desc: <>พัฒนาผลงานวิจัยให้เป็นโครงสร้าง<br />และบริการที่ได้มาตรฐาน</> },
      ],
    },
    careersSection: {
      eyebrow: "CAREERS",
      heading: (
        <>
          เรารอคนที่จะมาสร้าง
          <br />
          มาตรฐานใหม่ไปด้วยกัน
        </>
      ),
      jobs: [
        { id: 1, main: "Full-Stack Developer", sub: "", type: "ประสบการณ์ 3-5+ ปี", location: "Seoul, Korea (Hybrid)" },
        { id: 2, main: "AI Research & Engineer", sub: "", type: "จบใหม่ / มีประสบการณ์", location: "Seoul, Korea (Hybrid)" },
        { id: 3, main: "General Application Pool", sub: "", type: "เปิดรับตลอดปี", location: "Seoul, Korea" },
      ],
    },
    cta: {
      title: (
        <>
          มาร่วมสร้างมาตรฐานใหม่ของประสบการณ์ AI
          <br />
          และคุณภาพความปลอดภัยไปกับ KAQ
        </>
      ),
      button: "ติดต่อเรา",
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

export default function AboutPage({ onOpenContact }) {
  const { currentLang } = useLanguage();
  const t = translations[currentLang] || translations.KR;

  const [researchVisible, setResearchVisible] = useState(false);
  const [techVisible, setTechVisible] = useState(false);
  const [careersVisible, setCareersVisible] = useState(false);

  const topRef = useRef(null);
  const valuesRef = useRef(null);
  const careersRef = useRef(null);
  const researchRef = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.15 };
    const researchObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setResearchVisible(true);
    }, observerOptions);
    const techObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTechVisible(true);
    }, observerOptions);
    const careersObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCareersVisible(true);
    }, observerOptions);

    if (researchRef.current) researchObserver.observe(researchRef.current);
    if (techRef.current) techObserver.observe(techRef.current);
    if (careersRef.current) careersObserver.observe(careersRef.current);

    return () => {
      if (researchRef.current) researchObserver.unobserve(researchRef.current);
      if (techRef.current) techObserver.unobserve(techRef.current);
      if (careersRef.current) careersObserver.unobserve(careersRef.current);
    };
  }, []);

  const jobOpenings = t.careersSection.jobs;

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [fileLink, setFileLink] = useState("");

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
    <div ref={topRef} className="aboutPage">
      <style>{`
        .aboutPage {
          width: 100%;
          background-color: #ffffff;
          color: #111625;
          padding: 140px 20px 0px 20px;
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

        .fullBleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          box-sizing: border-box;
        }

        /* HERO */
        .kaqHeroBadge {
          display: block;
          font-weight: 700;
          font-size: 24px;
          line-height: 130%;
          color: #2167FD;
          margin-bottom: 20px;
        }
        .kaqHeroTitle {
          font-weight: 700;
          font-size: clamp(2rem, 5vw, 60px);
          line-height: 130%;
          color: #000000;
          margin: 0;
          max-width: 820px;
          word-break: keep-all;
        }

        /* OUR VISION 배너 */
        .kaqVisionBanner {
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: 480px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 162px;
          box-sizing: border-box;
        }
        .kaqVisionBannerImg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .kaqVisionBannerContent { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center; max-width: 1276px; }
        .kaqVisionBadge {
          display: inline-flex; align-items: center; justify-content: center; padding: 0 12px; height: 40px;
          border-radius: 99px; border: 1px solid #FFFFFF; font-weight: 700; font-size: 18px; line-height: 130%; color: #ffffff;
          background: rgba(0,0,0,0.15); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
        }
        .kaqVisionTitle { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; color: #ffffff; margin: 0; text-shadow: 0 2px 16px rgba(0,0,0,0.35); }
        .kaqVisionDesc { font-weight: 500; font-size: clamp(0.95rem, 2vw, 20px); line-height: 130%; color: #ffffff; margin: 0; word-break: keep-all; text-shadow: 0 1px 10px rgba(0,0,0,0.4); }

        /* 연구 카드 섹션 */
        .kaqResearchSection {
          padding: 120px 0; display: flex; flex-direction: column; align-items: center; gap: 60px;
          opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kaqResearchSection.is-visible { opacity: 1; transform: translateY(0); }
        .kaqSectionTitle { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; text-align: center; color: #000000; margin: 0; word-break: keep-all; }
        .kaqCardsGrid { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .kaqCard { position: relative; width: 100%; height: 480px; border-radius: 20px; overflow: hidden; background: #D9D9D9; }
        .kaqCard img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .kaqCardShade {
          position: absolute; left: 0; right: 0; bottom: 0; height: 65%; z-index: 1; pointer-events: none;
          background: linear-gradient(180deg,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,0.05) 30%,
            rgba(0,0,0,0.35) 60%,
            rgba(0,0,0,0.7) 85%,
            rgba(0,0,0,0.85) 100%);
        }
        .kaqCardText {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          display: flex; flex-direction: column; gap: 8px;
          padding: 28px; box-sizing: border-box;
        }
        .kaqCardText h3 { font-weight: 700; font-size: 28px; line-height: 130%; color: #ffffff; margin: 0; }
        .kaqCardText p { font-weight: 400; font-size: 18px; line-height: 150%; color: #ffffff; margin: 0; word-break: keep-all; }

        /* 다크 테크/핵심가치 섹션 */
        .kaqTechSection {
          position: relative;
          background-color: #D9D9D9;
          padding: 120px 20px; box-sizing: border-box;
          overflow: hidden;
          opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kaqTechSection.is-visible { opacity: 1; transform: translateY(0); }
        .kaqTechBgImg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .kaqTechBgOverlayBlue { position: absolute; inset: 0; background: #0052FF; mix-blend-mode: overlay; z-index: 1; pointer-events: none; }
        .kaqTechBgOverlayNavy { position: absolute; inset: 0; background: #003198; mix-blend-mode: multiply; opacity: 0.3; z-index: 2; pointer-events: none; }
        .kaqTechInner { position: relative; z-index: 3; max-width: 1276px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 60px; }
        .kaqSectionTitleWhite { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; text-align: center; color: #ffffff; margin: 0; word-break: keep-all; }
        .kaqTechGrid { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .kaqTechCard {
          display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center;
          padding: 28px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          min-height: 260px; box-sizing: border-box; justify-content: center;
        }
        .kaqTechBadge {
          display: inline-flex; align-items: center; justify-content: center; padding: 0 12px; height: 32px;
          border-radius: 99px; background: rgba(255,255,255,0.2); font-weight: 700; font-size: 16px; color: #ffffff;
        }
        .kaqTechCard h3 { font-weight: 700; font-size: 24px; line-height: 130%; color: #ffffff; margin: 0; word-break: keep-all; }
        .kaqTechCard p { font-weight: 400; font-size: 18px; line-height: 150%; color: #ffffff; margin: 0; word-break: keep-all; }

        [data-reveal] {
          opacity: 0;
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal="up"] { transform: translateY(32px); }
        [data-reveal="right"] { transform: translateX(36px); }
        [data-reveal].psVisible { opacity: 1; transform: translate(0, 0); }
        
        /* 인재채용 섹션 */
        .kaqCareersSection {
          padding: 120px 0;
          opacity: 0; transform: translateY(32px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .kaqCareersSection.is-visible { opacity: 1; transform: translateY(0); }
        .kaqCareersGrid { display: flex; gap: 20px; align-items: flex-start; }
        .kaqCareersLeft { flex: 1 1 0; display: flex; flex-direction: column; gap: 16px; position: sticky; top: 140px; }
        .kaqCareersEyebrow { font-weight: 700; font-size: 20px; line-height: 130%; color: #2167FD; margin: 0; }
        .kaqCareersHeading { font-weight: 700; font-size: clamp(1.6rem, 3.5vw, 40px); line-height: 130%; color: #000000; margin: 0; word-break: keep-all; }
        .kaqCareersRight { flex: 1 1 0; display: flex; flex-direction: column; gap: 20px; }
        .kaqJobCard {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 28px 24px 28px 28px; background: #F2F5FD; border-radius: 20px; cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .kaqJobCard:hover { background-color: #E5EBFA; transform: translateY(-2px); }
        .kaqJobMeta { font-weight: 400; font-size: 16px; line-height: 150%; color: #626772; margin: 0 0 8px 0; }
        .kaqJobTitleRow { display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap; }
        .kaqJobMain { font-weight: 500; font-size: 24px; line-height: 130%; color: #000000; }
        .kaqJobSub { font-weight: 500; font-size: 20px; line-height: 130%; color: #000000; }
        .kaqJobArrow { flex-shrink: 0; transition: transform 0.2s ease; }
        .kaqJobCard:hover .kaqJobArrow { transform: translateX(4px); }

        /* ==========================================================
           최종 문의하기 CTA (이전 페이지와 100% 동일한 고정 규격)
           ========================================================== */
        .psFinalCta {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          min-height: 360px;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 60px 162px;
        }

        .psFinalCtaInner {
          width: 100%;
          max-width: 1276px;
          height: 104px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          box-sizing: border-box;
        }

        .psFinalCtaText {
          width: 514px;
          font-family: inherit;
          font-size: 40px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }

        .psFinalCtaBtn {
          width: 127px;
          height: 52px;
          box-sizing: border-box;
          padding-left: 20px;
          padding-right: 16px;
          padding-top: 0;
          padding-bottom: 0;
          border-radius: 99px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background: #0052ff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          cursor: pointer;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: background-color 0.25s ease, transform 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .psFinalCtaBtn:hover {
          background: #0044d6;
          transform: translateY(-2px);
        }

        .psFinalCtaBtnText {
          font-family: inherit;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          text-align: center;
          display: inline-flex;
          align-items: center;
          transform: translateY(-0.5px);
        }

        .psFinalCtaBtnArrow {
          width: 24px;
          height: 24px;
          display: block;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .psFinalCtaBtn:hover .psFinalCtaBtnArrow {
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .aboutPage { padding-top: 100px; }
          .kaqVisionBanner { padding: 40px 24px; height: 320px; }
          .kaqCardsGrid, .kaqTechGrid { grid-template-columns: 1fr !important; }
          .kaqResearchSection { padding: 60px 0; gap: 32px; }
          .kaqTechSection { padding: 60px 20px; }
          .kaqTechInner { gap: 32px; }
          .kaqCareersGrid { flex-direction: column; }
          .kaqCareersLeft { position: static; }
          .kaqJobCard { flex-direction: row; padding: 20px; }
          .psFinalCta { padding: 48px 20px; min-height: auto; }
          .psFinalCtaInner { flex-direction: column; align-items: flex-start; gap: 24px; height: auto; }
          .psFinalCtaText { width: 100%; font-size: 28px; }
        }
      `}</style>

      {/* ================= HERO + OUR VISION + 연구 카드 ================= */}
      <div className="aboutInner">
        <div style={{ marginBottom: "40px" }}>
          <span className="kaqHeroBadge">{t.hero.badge}</span>
          <h1 className="kaqHeroTitle">{t.hero.title}</h1>
        </div>

        <div className="kaqVisionBanner">
          <img className="kaqVisionBannerImg" src={IMG.visionBanner} alt="Peace and Quality with AI" />
          <div className="kaqVisionBannerContent">
            <span className="kaqVisionBadge">{t.visionBanner.badge}</span>
            <h2 className="kaqVisionTitle">{t.visionBanner.title}</h2>
            <p className="kaqVisionDesc">{t.visionBanner.desc}</p>
          </div>
        </div>

        <div ref={researchRef} className={`kaqResearchSection ${researchVisible ? "is-visible" : ""}`}>
          <h2 className="kaqSectionTitle">{t.research.title}</h2>
          <div className="kaqCardsGrid">
            {t.research.cards.map((card, idx) => (
              <div className="kaqCard" key={idx}>
                <img src={card.img} alt={typeof card.title === "string" ? card.title : "card"} />
                <div className="kaqCardShade" />
                <div className="kaqCardText">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 다크 테크 / 핵심가치 섹션 (full-bleed) ================= */}
      <div
        ref={(el) => { techRef.current = el; valuesRef.current = el; }}
        className={`fullBleed kaqTechSection ${techVisible ? "is-visible" : ""}`}
      >
        <img className="kaqTechBgImg" src={IMG.techBg} alt="" aria-hidden="true" />
        <div className="kaqTechBgOverlayBlue" />
        <div className="kaqTechBgOverlayNavy" />
        <div className="kaqTechInner">
          <h2 className="kaqSectionTitleWhite">{t.techSection.title}</h2>
          <div className="kaqTechGrid">
            {t.techSection.cards.map((card, idx) => (
              <div className="kaqTechCard" key={idx}>
                <span className="kaqTechBadge">{card.badge}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 인재채용 섹션 ================= */}
      <div className="aboutInner">
        <div ref={careersRef} className={`kaqCareersSection ${careersVisible ? "is-visible" : ""}`}>
          <div className="kaqCareersGrid">
            <div className="kaqCareersLeft">
              <p className="kaqCareersEyebrow">{t.careersSection.eyebrow}</p>
              <h2 className="kaqCareersHeading">{t.careersSection.heading}</h2>
            </div>
            <div className="kaqCareersRight">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="kaqJobCard"
                  onClick={() => handleOpenApply(`${job.main} ${job.sub}`.trim())}
                >
                  <div>
                    <p className="kaqJobMeta">{job.location} · {job.type}</p>
                    <div className="kaqJobTitleRow">
                      <span className="kaqJobMain">{job.main}</span>
                      {job.sub && <span className="kaqJobSub">{job.sub}</span>}
                    </div>
                  </div>
                  <span className="kaqJobArrow">
                    <ArrowIcon size={28} color="#000000" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 최종 문의하기 CTA (이전 페이지와 100% 동일) ================= */}
      <div className="fullBleed psFinalCta">
        <div className="psFinalCtaInner">
          <p className="psFinalCtaText">
            {t.cta.title}
          </p>
          <button className="psFinalCtaBtn" onClick={onOpenContact} type="button">
            <span className="psFinalCtaBtnText">{t.cta.button}</span>
            <svg
              className="psFinalCtaBtnArrow"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.6269 12.75H4.5V11.25H16.6269L10.9308 5.55383L12 4.5L19.5 12L12 19.5L10.9308 18.4461L16.6269 12.75Z"
                fill="white"
              />
            </svg>
          </button>
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