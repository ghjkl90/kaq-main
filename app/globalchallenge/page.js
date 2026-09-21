"use client";

import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const IMG = {
  whyGlobalBg: "/why-global-bg.jpg",
  cardNcs: "/card-ncs.jpg",
  cardDsq: "/card-dsq.jpg",
  cardKai: "/card-kai.jpg",
  cardLead: "/card-lead.jpg",
};

const ArrowIcon = ({ size = 24, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AccountIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_102_465" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
      <rect width="44" height="44" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_102_465)">
      <path d="M11.0418 31.7024C12.6002 30.5462 14.2978 29.6331 16.1348 28.963C17.9715 28.2932 19.9265 27.9583 21.9997 27.9583C24.0729 27.9583 26.0278 28.2932 27.8645 28.963C29.7015 29.6331 31.3992 30.5462 32.9575 31.7024C34.0972 30.4497 35.0003 28.9995 35.6667 27.3519C36.3331 25.7044 36.6663 23.9204 36.6663 22C36.6663 17.9361 35.2379 14.4757 32.3809 11.6187C29.524 8.76179 26.0636 7.33331 21.9997 7.33331C17.9358 7.33331 14.4754 8.76179 11.6184 11.6187C8.76148 14.4757 7.33301 17.9361 7.33301 22C7.33301 23.9204 7.66622 25.7044 8.33263 27.3519C8.99905 28.9995 9.90212 30.4497 11.0418 31.7024ZM17.7656 21.6507C16.6161 20.5015 16.0413 19.0902 16.0413 17.4166C16.0413 15.7431 16.6161 14.3318 17.7656 13.1826C18.9148 12.0331 20.3261 11.4583 21.9997 11.4583C23.6732 11.4583 25.0846 12.0331 26.2338 13.1826C27.3833 14.3318 27.958 15.7431 27.958 17.4166C27.958 19.0902 27.3833 20.5015 26.2338 21.6507C25.0846 22.8002 23.6732 23.375 21.9997 23.375C20.3261 23.375 18.9148 22.8002 17.7656 21.6507ZM21.9997 39.4166C19.5812 39.4166 17.3125 38.9618 15.1934 38.0522C13.0744 37.1425 11.2311 35.9038 9.66363 34.336C8.09583 32.7685 6.85711 30.9253 5.94747 28.8062C5.03783 26.6872 4.58301 24.4185 4.58301 22C4.58301 19.5815 5.03783 17.3128 5.94747 15.1937C6.85711 13.0747 8.09583 11.2314 9.66363 9.66394C11.2311 8.09613 13.0744 6.85741 15.1934 5.94777C17.3125 5.03813 19.5812 4.58331 21.9997 4.58331C24.4181 4.58331 26.6869 5.03813 28.8059 5.94777C30.925 6.85741 32.7682 8.09613 34.3357 9.66394C35.9035 11.2314 37.1422 13.0747 38.0519 15.1937C38.9615 17.3128 39.4163 19.5815 39.4163 22C39.4163 24.4185 38.9615 26.6872 38.0519 28.8062C37.1422 30.9253 35.9035 32.7685 34.3357 34.336C32.7682 35.9038 30.925 37.1425 28.8059 38.0522C26.6869 38.9618 24.4181 39.4166 21.9997 39.4166Z" fill="white"/>
    </g>
  </svg>
);

const GridIcon = () => (
  <svg 
    width="40" 
    height="36" 
    viewBox="0 0 36 29" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: '0 5px' }}
  >
    <path d="M12.8333 24.8206V15.4247H22.9167V24.8206H12.8333ZM12.8333 12.8159V3.57866H22.9167V12.8159H12.8333ZM0 12.8159V0L10.0833 2.8875V12.8159H0ZM0 28.1348V15.4247H10.0833V25.4586L0 28.1348ZM35.75 28.1348L25.6667 25.4586V15.4247H35.75V28.1348ZM25.6667 12.8159V2.91592L35.75 0.21175V12.8159H25.6667Z" fill="white"/>
  </svg>
);

const translations = {
  KR: {
    hero: {
      badge: "글로벌 챌린지",
      title: (
        <>
          한국에서 시작한 기술을
          <br />
          더 넓은 기준으로.
        </>
      ),
    },
    why: {
      badge: "WHY GLOBAL",
      title: (
        <>
          좋은 기술은
          <br />
          한 환경에만 머물지 않습니다.
        </>
      ),
      desc: ["AI를 사용하는 사람도, 안전을 관리해야 하는 공간도 지역마다 다릅니다.", " KAQ는 하나의 서비스를 그대로 복제하는 것이 아니라", "\n사용자와 환경에 맞게 조정하고 검증할 수 있는 기술 구조를 연구합니다."],
      cards: [
        {
          icon: "account",
          title: "사람마다 다른 AI 경험",
          desc: "언어, 연령, 직업, 문화에 따라 필요한 AI 경험이 달라집니다.",
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          icon: "grid",
          title: "공간마다 다른 안전품질 기준",
          desc: "시설 유형, 운영 환경, 지역에 따라 관리해야 할 안전품질 기준이 달라집니다.",
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
      ],
      wideText: (
  <>
    KAQ의 글로벌 확장은 제품 수출이 아니라
    <br />
    사람과 공간에 맞는 기술의 현지화에서 시작합니다.
  </>
)
    },
    sectionTitle: [
      "연구를 넘어,",
      "세계가 참고하는 기준을 만드는 것이",
      "KAQ가 가장 잘하는 일입니다.",
    ],
    narratives: [
      { img: IMG.cardNcs, eng: "As you understand", kor: "NCS 접근방식, 업을 표준으로" },
      { img: IMG.cardDsq, eng: "As you see", kor: "DSQ Dashboard, 공간안전을 데이터로" },
      { img: IMG.cardKai, eng: "As you feel", kor: "K-AI Station, 한국형 AI 프롬프트의 시작" },
      { img: IMG.cardLead, eng: "As you lead the world", kor: "Global Challenge, 한국형 AI, 세계를 향해" },
    ],
    statsTitle: (
      <>
        글로벌 신뢰도를
        <br />
        숫자로 입증합니다.
      </>
    ),
    stats: [
      { value: "120+", color: "#4936ED", label: "OVERALL BALANCE", desc: "120개국 파트너 네트워크 구축" },
      { value: "450K+", color: "#2167FD", label: "DETECTION POWER", desc: "45만 건 이상의 글로벌 인증 검증" },
      { value: "99.8%", color: "#00A1F1", label: "ANALYSIS RELIABILITY", desc: "사실 기반 AI 프롬프트 신뢰도" },
      { value: "Top 1", color: "#00B6D6", label: "DX INNOVATION", desc: "실험실 창업 DX 혁신 기업 도약" },
    ],
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
    hero: {
      badge: "Global Challenge",
      title: (
        <>
          Technology that started in Korea,
          <br />
          held to a wider standard.
        </>
      ),
    },
    why: {
      badge: "WHY GLOBAL",
      title: (
        <>
          Good technology
          <br />
          doesn't stay in one environment.
        </>
      ),
      desc: "The people who use AI, and the spaces that need safety management, differ from region to region. KAQ doesn't just replicate one service — we research technology structures that can be adapted and validated for different users and environments.",
      cards: [
        {
          icon: "account",
          title: "Different AI Experiences for Different People",
          desc: "The AI experience people need changes with language, age, occupation, and culture.",
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          icon: "grid",
          title: "Different Safety Quality Standards for Different Spaces",
          desc: "The safety quality standards to manage change with facility type, operating environment, and region.",
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
      ],
      wideText: (
        <>
          KAQ's global expansion doesn't start with exporting products — it starts with localizing technology to fit people and spaces.
        </>
      ),
    },
    sectionTitle: [
      "Setting benchmarks referenced by the world",
      "is what KAQ does best.",
    ],
    narratives: [
      { img: IMG.cardNcs, eng: "As you understand", kor: "NCS Approach, Standardizing Industry" },
      { img: IMG.cardDsq, eng: "As you see", kor: "DSQ Dashboard, Spatial Safety to Data" },
      { img: IMG.cardKai, eng: "As you feel", kor: "K-AI Station, Genesis of Korean AI Prompts" },
      { img: IMG.cardLead, eng: "As you lead the world", kor: "Global Challenge, Korean AI to the World" },
    ],
    statsTitle: (
      <>
        KAQ's Global Reliability,
        <br />
        Proven by Numbers.
      </>
    ),
    stats: [
      { value: "120+", color: "#4936ED", label: "OVERALL BALANCE", desc: "Global partner network built across 120 countries" },
      { value: "450K+", color: "#2167FD", label: "DETECTION POWER", desc: "Over 450,000 global certifications verified" },
      { value: "99.8%", color: "#00A1F1", label: "ANALYSIS RELIABILITY", desc: "Fact-based AI prompt reliability" },
      { value: "Top 1", color: "#00B6D6", label: "DX INNOVATION", desc: "Leaping as a laboratory startup DX innovation leader" },
    ],
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
    hero: {
      badge: "グローバルチャレンジ",
      title: (
        <>
          韓国で生まれた技術を、
          <br />
          より広い基準へ。
        </>
      ),
    },
    why: {
      badge: "WHY GLOBAL",
      title: (
        <>
          優れた技術は
          <br />
          ひとつの環境にとどまりません。
        </>
      ),
      desc: "AIを利用する人も、安全を管理すべき空間も地域ごとに異なります。KAQは一つのサービスをそのまま複製するのではなく、ユーザーと環境に合わせて調整・検証できる技術構造を研究します。",
      cards: [
        {
          icon: "account",
          title: "人によって異なるAI体験",
          desc: "言語、年齢、職業、文化によって必要なAI体験は変わります。",
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          icon: "grid",
          title: "空間によって異なる安全品質基準",
          desc: "施設の種類、運用環境、地域によって管理すべき安全品質基準は変わります。",
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
      ],
      wideText: "KAQのグローバル展開は製品輸出ではなく、人と空間に合わせた技術のローカライズから始まります。",
    },
    sectionTitle: [
      "研究を超えて、世界が参考にする基準を創ることが",
      "KAQの最も得意とすることです。",
    ],
    narratives: [
      { img: IMG.cardNcs, eng: "As you understand", kor: "NCSアプローチ、産業の標準化へ" },
      { img: IMG.cardDsq, eng: "As you see", kor: "DSQ Dashboard、空間安全をデータに" },
      { img: IMG.cardKai, eng: "As you feel", kor: "K-AI Station、韓国型AIプロンプトの始まり" },
      { img: IMG.cardLead, eng: "As you lead the world", kor: "Global Challenge、世界へと羽ばたく韓国型AI" },
    ],
    statsTitle: (
      <>
        数字で実証する
        <br />
        KAQグローバル信頼度。
      </>
    ),
    stats: [
      { value: "120+", color: "#4936ED", label: "OVERALL BALANCE", desc: "120カ国のパートナーネットワーク構築" },
      { value: "450K+", color: "#2167FD", label: "DETECTION POWER", desc: "45万件以上のグローバル認証・検証実績" },
      { value: "99.8%", color: "#00A1F1", label: "ANALYSIS RELIABILITY", desc: "ファクトベースのAIプロンプト信頼度" },
      { value: "Top 1", color: "#00B6D6", label: "DX INNOVATION", desc: "ラボ発DXイノベーション企業へ飛躍" },
    ],
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
    hero: {
      badge: "โกลบอลชาเลนจ์",
      title: (
        <>
          เทคโนโลยีที่เริ่มต้นในเกาหลี
          <br />
          สู่มาตรฐานที่กว้างขึ้น
        </>
      ),
    },
    why: {
      badge: "WHY GLOBAL",
      title: (
        <>
          เทคโนโลยีที่ดี
          <br />
          ไม่หยุดอยู่แค่สภาพแวดล้อมเดียว
        </>
      ),
      desc: "ผู้ใช้ AI และพื้นที่ที่ต้องการการจัดการความปลอดภัยนั้นแตกต่างกันไปตามภูมิภาค KAQ ไม่ได้เพียงทำซ้ำบริการเดียวกัน แต่วิจัยโครงสร้างเทคโนโลยีที่สามารถปรับและพิสูจน์ได้ตามผู้ใช้และสภาพแวดล้อม",
      cards: [
        {
          icon: "account",
          title: "ประสบการณ์ AI ที่แตกต่างกันสำหรับแต่ละคน",
          desc: "ประสบการณ์ AI ที่ต้องการเปลี่ยนไปตามภาษา อายุ อาชีพ และวัฒนธรรม",
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          icon: "grid",
          title: "มาตรฐานคุณภาพความปลอดภัยที่แตกต่างกันตามพื้นที่",
          desc: "มาตรฐานคุณภาพความปลอดภัยที่ต้องจัดการเปลี่ยนไปตามประเภทสถานที่ สภาพการดำเนินงาน และภูมิภาค",
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
      ],
      wideText: "การขยายตัวสู่ระดับโลกของ KAQ ไม่ได้เริ่มจากการส่งออกผลิตภัณฑ์ แต่เริ่มจากการปรับเทคโนโลยีให้เข้ากับผู้คนและพื้นที่ในท้องถิ่น",
    },
    sectionTitle: [
      "การสร้างมาตรฐานอ้างอิงระดับโลก",
      "คือสิ่งที่ KAQ เชี่ยวชาญที่สุด",
    ],
    narratives: [
      { img: IMG.cardNcs, eng: "As you understand", kor: "แนวทาง NCS, สร้างมาตรฐานแห่งอุตสาหกรรม" },
      { img: IMG.cardDsq, eng: "As you see", kor: "DSQ Dashboard, ความปลอดภัยเชิงพื้นที่สู่ข้อมูล" },
      { img: IMG.cardKai, eng: "As you feel", kor: "K-AI Station, จุดเริ่มต้นของ Korean AI Prompt" },
      { img: IMG.cardLead, eng: "As you lead the world", kor: "Global Challenge, AI สัญชาติเกาหลีสู่เวทีโลก" },
    ],
    statsTitle: (
      <>
        พิสูจน์ความน่าเชื่อถือระดับโลก
        <br />
        ด้วยตัวเลข
      </>
    ),
    stats: [
      { value: "120+", color: "#4936ED", label: "OVERALL BALANCE", desc: "สร้างเครือข่ายพันธมิตรใน 120 ประเทศทั่วโลก" },
      { value: "450K+", color: "#2167FD", label: "DETECTION POWER", desc: "ตรวจสอบและรับรองระดับสากลกว่า 450,000 รายการ" },
      { value: "99.8%", color: "#00A1F1", label: "ANALYSIS RELIABILITY", desc: "ความน่าเชื่อถือของพรอมต์ AI ตามข้อเท็จจริง" },
      { value: "Top 1", color: "#00B6D6", label: "DX INNOVATION", desc: "ก้าวสู่การเป็นผู้นำนวัตกรรม DX จากสตาร์ทอัพห้องปฏิบัติการ" },
    ],
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

const WHY_ICONS = { account: AccountIcon, grid: GridIcon };

export default function GlobalChallengePage({ onOpenContact }) {
  const { currentLang } = useLanguage();
  const t = translations[currentLang] || translations.KR;

  const [whyVisible, setWhyVisible] = useState(false);
  const [narrativesVisible, setNarrativesVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const whyRef = useRef(null);
  const narrativesRef = useRef(null);
  const statsRef = useRef(null);

  /* AboutPage / ProductsPage / ResearchPage와 완전히 동일한 지원·문의 모달 */
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

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.15 };
    const whyObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setWhyVisible(true);
    }, observerOptions);
    const narrativesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNarrativesVisible(true);
    }, observerOptions);
    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, observerOptions);

    if (whyRef.current) whyObserver.observe(whyRef.current);
    if (narrativesRef.current) narrativesObserver.observe(narrativesRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      if (whyRef.current) whyObserver.unobserve(whyRef.current);
      if (narrativesRef.current) narrativesObserver.unobserve(narrativesRef.current);
      if (statsRef.current) statsObserver.unobserve(statsRef.current);
    };
  }, []);

  return (
    <div className="gcPage">
      <style>{`
        .gcPage {
          width: 100%;
          background-color: #ffffff;
          color: #111625;
          padding: 140px 20px 0px 20px;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }
        .gcInner { max-width: 1276px; margin: 0 auto; box-sizing: border-box; }
        .fullBleed {
          width: 100vw; position: relative; left: 50%; right: 50%;
          margin-left: -50vw; margin-right: -50vw; box-sizing: border-box;
        }

        /* HERO */
        .gcHeroBadge { display: block; font-weight: 700; font-size: 24px; line-height: 130%; color: #2167FD; margin-bottom: 20px; }
        .gcHeroTitle { font-weight: 700; font-size: clamp(2rem, 5vw, 60px); line-height: 130%; color: #000000; margin: 0; max-width: 620px; word-break: keep-all; }

        /* WHY GLOBAL 다크 배너 */
        .gcWhySection {
          position: relative; background-color: #0a0a0a; padding: 120px 20px; box-sizing: border-box; overflow: hidden;
          display: flex; flex-direction: column; align-items: center;
        }
        .gcWhySection.is-visible { opacity: 1; transform: translateY(0); }
        .gcWhyBgImg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .gcWhyOverlayBlue { position: absolute; inset: 0; background: #0052FF; mix-blend-mode: overlay; opacity: 0.5; z-index: 1; pointer-events: none; }
        .gcWhyOverlayFade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%); opacity: 0.2; z-index: 2; pointer-events: none; }
        .gcWhyInner { position: relative; z-index: 3; max-width: 1276px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 60px; }
        .gcWhyHead { display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 560px; text-align: center; }
        .gcWhyBadge {
          display: inline-flex; align-items: center; justify-content: center; padding: 0 12px; height: 40px;
          border-radius: 99px; border: 1px solid #FFFFFF; font-weight: 700; font-size: 18px; line-height: 130%; color: #ffffff;
        }
        .gcWhyTitle { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; color: #ffffff; margin: 0; word-break: keep-all; }
        .gcWhyDesc { font-weight: 400; font-size: 20px; line-height: 150%; color: #ffffff; margin: 0; word-break: keep-all; }
        .gcWhyBody { width: 100%; display: flex; flex-direction: column; gap: 20px; }
        .gcWhyCardsRow { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .gcWhyCard {
          display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 32px;
          padding: 32px; border-radius: 20px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-sizing: border-box; min-height: 283px;
        }
        .gcWhyCardBody { display: flex; flex-direction: column; gap: 8px; }
        .gcWhyCardTitle { font-weight: 700; font-size: 28px; line-height: 130%; color: #ffffff; margin: 0; word-break: keep-all; }
        .gcWhyCardDesc { font-weight: 400; font-size: 18px; line-height: 150%; color: #ffffff; margin: 0; word-break: keep-all; }
        .gcWhyCardBtn {
          display: inline-flex; align-items: center; gap: 4px; padding: 0 16px 0 20px; height: 52px;
          background: rgba(0,0,0,0.5); border-radius: 99px; border: none; color: #ffffff; font-weight: 700; font-size: 18px;
          text-decoration: none; cursor: pointer; transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .gcWhyCardBtn:hover { background: rgba(33,103,253,0.7); transform: translateY(-2px); }
        .gcWhyWideCard {
          width: 100%; display: flex; align-items: center; justify-content: center; padding: 40px; box-sizing: border-box;
          background: rgba(0,68,255,0.5); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); min-height: 240px;
        }
        .gcWhyWideText { font-weight: 700; font-size: 28px; line-height: 130%; color: #ffffff; margin: 0; text-align: center; word-break: keep-all; max-width: 1100px; }

        /* 섹션 타이틀 (서사 카드 위) */
        .gcSectionTitle { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; text-align: center; color: #000000; margin: 0; word-break: keep-all; }

        .description {
          white-space: pre-line; /* 문자열 안의 줄바꿈(\n)을 실제 화면에 반영해 줍니다 */
        }

        /* 서사 카드 2x2 */
        .gcNarrativeSection { padding: 120px 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 60px; }
        .gcNarrativeGrid {
          width: 100%; max-width: 1276px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
          opacity: 0; transform: translateY(28px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .gcNarrativeGrid.is-visible { opacity: 1; transform: translateY(0); }
        .gcNarrativeCard { position: relative; height: 360px; border-radius: 20px; overflow: hidden; background: #D9D9D9; }
        .gcNarrativeCard img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .gcNarrativeShade {
          position: absolute; left: 0; right: 0; bottom: 0; height: 55%; z-index: 1; pointer-events: none;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.75) 100%);
        }
        .gcNarrativeText { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding: 32px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px; }
        .gcNarrativeEng { font-weight: 700; font-size: 18px; line-height: 130%; color: #ffffff; }
        .gcNarrativeKor { font-weight: 700; font-size: 28px; line-height: 130%; color: #ffffff; margin: 0; word-break: keep-all; }
        .gcNarrativeBadge {
          position: absolute; top: 32px; left: 32px; z-index: 2; width: 48px; height: 48px; border-radius: 99px;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; color: #ffffff;
        }

        /* 통계 섹션 */
        .gcStatsSection { background: #F2F5FD; padding: 120px 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 60px; }
        .gcStatsInner {
          max-width: 1276px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 60px;
          opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .gcStatsInner.is-visible { opacity: 1; transform: translateY(0); }
        .gcStatsGrid { width: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .gcStatCard { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 32px; background: #ffffff; border-radius: 16px; min-height: 220px; box-sizing: border-box; text-align: center; }
        .gcStatValue { font-weight: 700; font-size: 48px; line-height: 130%; margin: 0; }
        .gcStatLabel { font-weight: 700; font-size: 18px; line-height: 130%; color: #000000; }
        .gcStatDesc { font-weight: 400; font-size: 16px; line-height: 130%; color: #626772; margin: 0; }

        /* ==========================================================
           최종 문의하기 CTA (이전 페이지와 100% 동일한 피그마 원본 규격)
           ========================================================== */
        .psFinalCta {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: 360px;
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
          .gcPage { padding-top: 100px; }
          .gcWhyCardsRow, .gcNarrativeGrid, .gcStatsGrid { grid-template-columns: 1fr !important; }
          .kaqCtaInner { flex-direction: column; align-items: flex-start; }

          /* 최종 문의하기 CTA: 고정 height/width가 좁은 화면에서 잘리는 문제 방지
             (font-size는 그대로 두고 컨테이너만 유동적으로 전환) */
          .psFinalCta {
            height: auto;
            padding: 48px 24px;
          }
          .psFinalCtaInner {
            height: auto;
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .psFinalCtaText {
            width: 100%;
            max-width: 514px;
          }
        }

        @media (max-width: 480px) {
          .psFinalCta { padding: 40px 20px; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <div className="gcInner">
        <div style={{ marginBottom: "60px" }}>
          <span className="gcHeroBadge">{t.hero.badge}</span>
          <h1 className="gcHeroTitle">{t.hero.title}</h1>
        </div>
      </div>

      {/* ================= WHY GLOBAL (full-bleed) ================= */}
      <div ref={whyRef} className={`fullBleed gcWhySection ${whyVisible ? "is-visible" : ""}`}>
        <img className="gcWhyBgImg" src={IMG.whyGlobalBg} alt="" aria-hidden="true" />
        <div className="gcWhyOverlayBlue" />
        <div className="gcWhyOverlayFade" />
        <div className="gcWhyInner">
          <div className="gcWhyHead">
            <span className="gcWhyBadge">{t.why.badge}</span>
            <h2 className="gcWhyTitle">{t.why.title}</h2>
            <p className="gcWhyDesc">{t.why.desc}</p>
          </div>
          <div className="gcWhyBody">
            <div className="gcWhyCardsRow">
              {t.why.cards.map((card, idx) => {
                const Icon = WHY_ICONS[card.icon];
                return (
                  <div className="gcWhyCard" key={idx}>
                    <Icon />
                    <div className="gcWhyCardBody">
                      <h3 className="gcWhyCardTitle">{card.title}</h3>
                      <p className="gcWhyCardDesc">{card.desc}</p>
                    </div>
                    <a className="gcWhyCardBtn" href={card.button.link} target="_blank" rel="noopener noreferrer">
                      {card.button.label}
                      <ArrowIcon size={24} color="#ffffff" />
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="gcWhyWideCard">
              <p className="gcWhyWideText">{t.why.wideText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 서사 카드 2x2 ================= */}
      <div className="gcNarrativeSection">
        <h2 className="gcSectionTitle">
          {t.sectionTitle.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < t.sectionTitle.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <div ref={narrativesRef} className={`gcNarrativeGrid ${narrativesVisible ? "is-visible" : ""}`}>
          {t.narratives.map((item, idx) => (
            <div className="gcNarrativeCard" key={idx}>
              <img src={item.img} alt={item.kor} />
              <div className="gcNarrativeShade" />
              <span className="gcNarrativeBadge">{String(idx + 1).padStart(2, "0")}</span>
              <div className="gcNarrativeText">
                <span className="gcNarrativeEng">{item.eng}</span>
                <h3 className="gcNarrativeKor">{item.kor}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 통계 ================= */}
      <div className="gcStatsSection">
        <div ref={statsRef} className={`gcStatsInner ${statsVisible ? "is-visible" : ""}`}>
          <h2 className="gcSectionTitle">{t.statsTitle}</h2>
          <div className="gcStatsGrid">
            {t.stats.map((stat, idx) => (
              <div className="gcStatCard" key={idx}>
                <p className="gcStatValue" style={{ color: stat.color }}>{stat.value}</p>
                <div>
                  <div className="gcStatLabel">{stat.label}</div>
                  <p className="gcStatDesc">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 최종 문의하기 CTA (이전 페이지와 100% 동일) ================= */}
      <div className="fullBleed psFinalCta">
        <div className="psFinalCtaInner">
          <p className="psFinalCtaText">
            {t.cta.title}
          </p>
          <button className="psFinalCtaBtn" onClick={onOpenContact || (() => handleOpenApply(""))} type="button">
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
    </div>
  );
}