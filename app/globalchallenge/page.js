"use client";

import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const IMG = {
  whyGlobalBg: "/10.png",
  cardNcs: "/card-ncs.jpg",
  cardDsq: "/card-dsq.jpg",
  cardKai: "/card-kai.jpg",
  cardLead: "/card-lead.jpg",
  odaUnderstand: "/oda-understand.png",
  odaCustomize: "/oda-customize.png",
  odaConnect: "/oda-connect.png",
  aiStationScreenshot: "/ai-station-screenshot.png",
  aiStationBg: "/ai-station-bg.png",
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
    width="44" 
    height="44" 
    viewBox="0 0 36 29" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block' }}
  >
    <path d="M12.8333 24.8206V15.4247H22.9167V24.8206H12.8333ZM12.8333 12.8159V3.57866H22.9167V12.8159H12.8333ZM0 12.8159V0L10.0833 2.8875V12.8159H0ZM0 28.1348V15.4247H10.0833V25.4586L0 28.1348ZM35.75 28.1348L25.6667 25.4586V15.4247H35.75V28.1348ZM25.6667 12.8159V2.91592L35.75 0.21175V12.8159H25.6667Z" fill="white"/>
  </svg>
);

const KioskIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_132_335" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
      <rect width="44" height="44" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_132_335)">
      <path d="M11.5642 42.1668C10.6381 42.1668 9.85417 41.846 9.2125 41.2043C8.57083 40.5627 8.25 39.7788 8.25 38.8526V5.1477C8.25 4.22157 8.57083 3.43766 9.2125 2.796C9.85417 2.15433 10.6381 1.8335 11.5642 1.8335H32.4358C33.3619 1.8335 34.1458 2.15433 34.7875 2.796C35.4292 3.43766 35.75 4.22157 35.75 5.1477V38.8526C35.75 39.7788 35.4292 40.5627 34.7875 41.2043C34.1458 41.846 33.3619 42.1668 32.4358 42.1668H11.5642ZM11 33.9168H33V5.1477C33 5.00654 32.9412 4.87729 32.8235 4.75995C32.7062 4.64231 32.577 4.5835 32.4358 4.5835H11.5642C11.423 4.5835 11.2938 4.64231 11.1765 4.75995C11.0588 4.87729 11 5.00654 11 5.1477V33.9168Z" fill="white"/>
    </g>
  </svg>
);

const OnlineIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_132_340" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
      <rect width="44" height="44" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_132_340)">
      <path d="M10.1875 9.99805C8.58463 11.601 7.35087 13.4231 6.48633 15.4639C5.62217 17.505 5.18945 19.6836 5.18945 22C5.18945 24.3164 5.62217 26.495 6.48633 28.5361C7.35087 30.5769 8.58463 32.399 10.1875 34.002L8.44043 35.75C6.62499 33.9083 5.22247 31.828 4.2334 29.5088C3.24432 27.1896 2.75 24.6865 2.75 22C2.75 19.3135 3.24432 16.8104 4.2334 14.4912C5.22247 12.172 6.62499 10.0917 8.44043 8.25L10.1875 9.99805ZM35.9395 8.25C37.7419 10.0917 39.1412 12.1721 40.1367 14.4912C41.1323 16.8104 41.6299 19.3135 41.6299 22C41.6299 24.6865 41.1323 27.1896 40.1367 29.5088C39.1412 31.8279 37.7419 33.9083 35.9395 35.75L34.1924 34.002C35.7954 32.399 37.0299 30.577 37.8945 28.5361C38.7586 26.495 39.1904 24.3163 39.1904 22C39.1904 19.6837 38.7586 17.505 37.8945 15.4639C37.0299 13.423 35.7954 11.601 34.1924 9.99805L35.9395 8.25ZM14.3271 14.1377C13.3174 15.1608 12.5254 16.3346 11.9521 17.6592C11.3789 18.9842 11.0928 20.4312 11.0928 22C11.0928 23.5688 11.3789 25.0158 11.9521 26.3408C12.5254 27.6654 13.3174 28.8392 14.3271 29.8623L12.6113 31.5781C11.355 30.2822 10.3807 28.8339 9.68945 27.2324C8.99812 25.6308 8.65234 23.8864 8.65234 22C8.65234 20.1136 8.99812 18.3692 9.68945 16.7676C10.3807 15.1661 11.355 13.7178 12.6113 12.4219L14.3271 14.1377ZM31.7686 12.4219C33.0251 13.7177 33.9992 15.1662 34.6904 16.7676C35.3818 18.3692 35.7275 20.1136 35.7275 22C35.7275 23.8864 35.3818 25.6308 34.6904 27.2324C33.9992 28.8338 33.0251 30.2823 31.7686 31.5781L30.0527 29.8623C31.0626 28.8391 31.8544 27.6655 32.4277 26.3408C33.0011 25.0158 33.2881 23.5689 33.2881 22C33.2881 20.4311 33.0011 18.9842 32.4277 17.6592C31.8544 16.3345 31.0626 15.1609 30.0527 14.1377L31.7686 12.4219ZM22 16.5C25.0376 16.5 27.5 18.9624 27.5 22C27.5 25.0376 25.0376 27.5 22 27.5C18.9624 27.5 16.5 25.0376 16.5 22C16.5 18.9624 18.9624 16.5 22 16.5Z" fill="white"/>
    </g>
  </svg>
);

const StacksIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_132_345" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
      <rect width="44" height="44" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_132_345)">
      <path d="M21.9997 25.1026L2.76758 14.8433L21.9997 4.5835L41.2497 14.8433L21.9997 25.1026ZM21.9997 32.2595L3.82174 22.5786L6.70191 20.9987L21.9997 29.1291L37.3149 20.9987L40.1955 22.5786L21.9997 32.2595ZM21.9997 39.4168L3.82174 29.7355L6.70191 28.156L21.9997 36.286L37.3149 28.156L40.1955 29.7355L21.9997 39.4168Z" fill="white"/>
    </g>
  </svg>
);

const AI_STATION_ICONS = { kiosk: KioskIcon, online: OnlineIcon, stacks: StacksIcon };

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
    oda: {
      badge: "GLOBAL CHALLENGE THROUGH ODA",
      title: ["현지의 필요를 이해하고,", "적합한 AI 경험으로 연결합니다."],
      desc: "KAQ는 ODA 협력 과정에서 수원국의 현장 요구를 분석하고, 한국의 우수사례와 AI 학습 콘텐츠를 현지에 맞게 재구성해 K-AI Station을 통한 지속 가능한 지식 공유 모델을 만들어갑니다.",
      steps: [
        {
          num: "01", label: "UNDERSTAND", color: "#4936ED",
          title: "현장의 필요를 이해합니다.",
          subtitle: "ODA Recipient Country",
          desc: "프로젝트 결과와 우수사례를 AI 기반으로 공유하기 위해 현장의 교육 환경과 실제 요구를 먼저 분석합니다.",
          tags: ["ODA Project Contents", "Case-based Learning", "AI-based Learning Platform", "Field Needs Analysis"],
          image: IMG.odaUnderstand,
        },
        {
          num: "02", label: "CUSTOMIZE", color: "#2167FD",
          title: "필요한 경험으로 재구성합니다.",
          subtitle: "ODA Donor Country · South Korea",
          desc: "현장 요구에 적합한 우수사례(Best Practice)를 선정하고 AI 기반 교육과 직무학습에 활용할 수 있도록 맞춤화합니다.",
          tags: ["Project Requirements", "Best Practice Cases", "AI-based NCS Training", "Field Needs Adaptation"],
          image: IMG.odaCustomize,
        },
        {
          num: "03", label: "CONNECT", color: "#00A1F1",
          title: "K-AI Station으로 연결합니다.",
          subtitle: "KAQ AI Partnership",
          desc: "맞춤화된 콘텐츠와 우수사례를 K-AI Station의 키오스크와 온라인 서비스를 통해 연결합니다.",
          tags: ["Kiosk & Online", "AI-based BP Test Modules", "10,000 NCS Cases"],
          image: IMG.odaConnect,
        },
      ],
    },
    aiStation: {
      badge: "AI STATION FOR PARTNERSHIP",
      title: ["오프라인과 온라인을 연결하는", "AI 학습 경험"],
      cards: [
        { icon: "kiosk", title: "KIOSK", desc: "현장에서 누구나 접근할 수 있는 AI Station", color: "rgba(73, 54, 237, 0.5)" },
        { icon: "online", title: "ONLINE", desc: "장소에 관계없이 이어지는 AI 기반 학습 서비스", color: "rgba(0, 182, 214, 0.5)" },
        { icon: "stacks", title: "10,000+ NCS Cases", desc: "직무 기반 사례를 AI 학습과 테스트 콘텐츠로 확장", color: "rgba(33, 103, 253, 0.5)" },
      ],
    },
    sectionTitle: [
      "한국에서 축적한 경험을",
      "새로운 환경에 맞게 확장합니다."
    ],
    narratives: [
      { img: IMG.cardNcs, eng: "As you understand", kor: <>NCS 접근방식,<br/> 업을 표준으로</> },
      { img: IMG.cardDsq, eng: "As you see", kor: <>DSQ Dashboard,<br/> 공간안전을 데이터로</> },
      { img: IMG.cardKai, eng: "As you feel", kor: <>K-AI Station,<br/> 한국형 AI 프롬프트의 시작</> },
      { img: IMG.cardLead, eng: "As you lead the world", kor: <>Global Challenge,<br/> 한국형 AI, 세계를 향해</> },
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
          현지의 필요에 맞는
          <br />
          새로운 AI 경험을 함께 만듭니다.
        </>
      ),
      subtitle: <>ODA 프로젝트, AI 교육, K-AI Station 도입과<br /> 글로벌 연구 · 사업 협력을 함께합니다.</>,
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
    oda: {
      badge: "GLOBAL CHALLENGE THROUGH ODA",
      title: ["Understanding local needs,", "connecting them to the right AI experience."],
      desc: "Through ODA cooperation, KAQ analyzes the on-the-ground needs of partner countries and reshapes Korea's best practices and AI learning content to fit local contexts — building a sustainable knowledge-sharing model through K-AI Station.",
      steps: [
        {
          num: "01", label: "UNDERSTAND", color: "#4936ED",
          title: "Understanding needs on the ground.",
          subtitle: "ODA Recipient Country",
          desc: "We first analyze the local educational environment and real needs in order to share project outcomes and best practices through AI.",
          tags: ["ODA Project Contents", "Case-based Learning", "AI-based Learning Platform", "Field Needs Analysis"],
          image: IMG.odaUnderstand,
        },
        {
          num: "02", label: "CUSTOMIZE", color: "#2167FD",
          title: "Reshaping it into the right experience.",
          subtitle: "ODA Donor Country · South Korea",
          desc: "We select best practices suited to field needs and customize them for AI-based education and job training.",
          tags: ["Project Requirements", "Best Practice Cases", "AI-based NCS Training", "Field Needs Adaptation"],
          image: IMG.odaCustomize,
        },
        {
          num: "03", label: "CONNECT", color: "#00A1F1",
          title: "Connecting through K-AI Station.",
          subtitle: "KAQ AI Partnership",
          desc: "Customized content and best practices are connected through K-AI Station's kiosk and online services.",
          tags: ["Kiosk & Online", "AI-based BP Test Modules", "10,000 NCS Cases"],
          image: IMG.odaConnect,
        },
      ],
    },
    aiStation: {
      badge: "AI STATION FOR PARTNERSHIP",
      title: ["An AI learning experience that connects", "offline and online"],
      cards: [
        { icon: "kiosk", title: "KIOSK", desc: "An AI Station anyone can access on-site", color: "rgba(73, 54, 237, 0.5)" },
        { icon: "online", title: "ONLINE", desc: "AI-based learning that continues anywhere", color: "rgba(0, 182, 214, 0.5)" },
        { icon: "stacks", title: "10,000+ NCS Cases", desc: "Job-based cases expanded into AI learning and test content", color: "rgba(33, 103, 253, 0.5)" },
      ],
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
          Building new AI experiences
          <br />
          tailored to local needs, together.
        </>
      ),
      subtitle: "We work together on ODA projects, AI education, K-AI Station deployment, and global research & business partnerships.",
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
    oda: {
      badge: "GLOBAL CHALLENGE THROUGH ODA",
      title: ["現地のニーズを理解し、", "最適なAI体験へとつなげます。"],
      desc: "KAQはODA協力の過程で受入国の現場ニーズを分析し、韓国の優良事例とAI学習コンテンツを現地に合わせて再構成し、K-AI Stationを通じた持続可能な知識共有モデルを作っていきます。",
      steps: [
        {
          num: "01", label: "UNDERSTAND", color: "#4936ED",
          title: "現場のニーズを理解します。",
          subtitle: "ODA Recipient Country",
          desc: "プロジェクトの成果と優良事例をAIベースで共有するため、現場の教育環境と実際のニーズをまず分析します。",
          tags: ["ODA Project Contents", "Case-based Learning", "AI-based Learning Platform", "Field Needs Analysis"],
          image: IMG.odaUnderstand,
        },
        {
          num: "02", label: "CUSTOMIZE", color: "#2167FD",
          title: "必要な体験に再構成します。",
          subtitle: "ODA Donor Country · South Korea",
          desc: "現場ニーズに合った優良事例(Best Practice)を選定し、AIベースの教育や職務学習に活用できるようカスタマイズします。",
          tags: ["Project Requirements", "Best Practice Cases", "AI-based NCS Training", "Field Needs Adaptation"],
          image: IMG.odaCustomize,
        },
        {
          num: "03", label: "CONNECT", color: "#00A1F1",
          title: "K-AI Stationへとつなげます。",
          subtitle: "KAQ AI Partnership",
          desc: "カスタマイズされたコンテンツと優良事例を、K-AI Stationのキオスクとオンラインサービスを通じてつなげます。",
          tags: ["Kiosk & Online", "AI-based BP Test Modules", "10,000 NCS Cases"],
          image: IMG.odaConnect,
        },
      ],
    },
    aiStation: {
      badge: "AI STATION FOR PARTNERSHIP",
      title: ["オフラインとオンラインをつなぐ", "AI学習体験"],
      cards: [
        { icon: "kiosk", title: "KIOSK", desc: "現場で誰でもアクセスできるAI Station", color: "rgba(73, 54, 237, 0.5)" },
        { icon: "online", title: "ONLINE", desc: "場所を問わず続くAIベースの学習サービス", color: "rgba(0, 182, 214, 0.5)" },
        { icon: "stacks", title: "10,000+ NCS Cases", desc: "職務ベースの事例をAI学習・テストコンテンツへ拡張", color: "rgba(33, 103, 253, 0.5)" },
      ],
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
          現地のニーズに合わせた
          <br />
          新しいAI体験を共に作ります。
        </>
      ),
      subtitle: "ODAプロジェクト、AI教育、K-AI Stationの導入からグローバル研究・事業協力まで共にします。",
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
    oda: {
      badge: "GLOBAL CHALLENGE THROUGH ODA",
      title: ["เข้าใจความต้องการในพื้นที่", "และเชื่อมโยงสู่ประสบการณ์ AI ที่เหมาะสม"],
      desc: "KAQ วิเคราะห์ความต้องการหน้างานของประเทศผู้รับผ่านกระบวนการความร่วมมือ ODA และปรับกรณีศึกษาที่ดีที่สุดของเกาหลีรวมถึงเนื้อหาการเรียนรู้ AI ให้เหมาะกับพื้นที่ เพื่อสร้างโมเดลแบ่งปันความรู้ที่ยั่งยืนผ่าน K-AI Station",
      steps: [
        {
          num: "01", label: "UNDERSTAND", color: "#4936ED",
          title: "เข้าใจความต้องการหน้างาน",
          subtitle: "ODA Recipient Country",
          desc: "วิเคราะห์สภาพแวดล้อมการศึกษาและความต้องการจริงในพื้นที่ก่อน เพื่อแบ่งปันผลลัพธ์โครงการและกรณีศึกษาที่ดีผาน AI",
          tags: ["ODA Project Contents", "Case-based Learning", "AI-based Learning Platform", "Field Needs Analysis"],
          image: IMG.odaUnderstand,
        },
        {
          num: "02", label: "CUSTOMIZE", color: "#2167FD",
          title: "ปรับเป็นประสบการณ์ที่เหมาะสม",
          subtitle: "ODA Donor Country · South Korea",
          desc: "คัดเลือกกรณีศึกษาที่ดีที่สุดให้เหมาะกับความต้องการหน้างาน และปรับแต่งเพื่อใช้ในการศึกษาและฝึกอบรมด้วย AI",
          tags: ["Project Requirements", "Best Practice Cases", "AI-based NCS Training", "Field Needs Adaptation"],
          image: IMG.odaCustomize,
        },
        {
          num: "03", label: "CONNECT", color: "#00A1F1",
          title: "เชื่อมโยงผ่าน K-AI Station",
          subtitle: "KAQ AI Partnership",
          desc: "เชื่อมโยงเนื้อหาที่ปรับแต่งแล้วและกรณีศึกษาที่ดีผ่านคีออสก์และบริการออนไลน์ของ K-AI Station",
          tags: ["Kiosk & Online", "AI-based BP Test Modules", "10,000 NCS Cases"],
          image: IMG.odaConnect,
        },
      ],
    },
    aiStation: {
      badge: "AI STATION FOR PARTNERSHIP",
      title: ["ประสบการณ์การเรียนรู้ AI ที่เชื่อมโยง", "ออฟไลน์และออนไลน์"],
      cards: [
        { icon: "kiosk", title: "KIOSK", desc: "AI Station ที่ทุกคนเข้าถึงได้หน้างาน", color: "rgba(73, 54, 237, 0.5)" },
        { icon: "online", title: "ONLINE", desc: "บริการเรียนรู้ด้วย AI ที่ต่อเนื่องไม่ว่าอยู่ที่ไหน", color: "rgba(0, 182, 214, 0.5)" },
        { icon: "stacks", title: "10,000+ NCS Cases", desc: "ขยายกรณีศึกษาตามสายงานสู่เนื้อหาการเรียนรู้และทดสอบด้วย AI", color: "rgba(33, 103, 253, 0.5)" },
      ],
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
          ร่วมสร้างประสบการณ์ AI ใหม่
          <br />
          ที่ตอบโจทย์ความต้องการในพื้นที่
        </>
      ),
      subtitle: "เราร่วมมือกันในโครงการ ODA การศึกษาด้าน AI การนำ K-AI Station ไปใช้ และความร่วมมือด้านวิจัย · ธุรกิจระดับโลก",
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
  const [odaVisible, setOdaVisible] = useState(false);
  const [aiStationVisible, setAiStationVisible] = useState(false);

  const whyRef = useRef(null);
  const narrativesRef = useRef(null);
  const statsRef = useRef(null);
  const odaRef = useRef(null);
  const aiStationRef = useRef(null);

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
    const odaObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setOdaVisible(true);
    }, observerOptions);
    const aiStationObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setAiStationVisible(true);
    }, observerOptions);

    if (whyRef.current) whyObserver.observe(whyRef.current);
    if (narrativesRef.current) narrativesObserver.observe(narrativesRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (odaRef.current) odaObserver.observe(odaRef.current);
    if (aiStationRef.current) aiStationObserver.observe(aiStationRef.current);

    return () => {
      if (whyRef.current) whyObserver.unobserve(whyRef.current);
      if (narrativesRef.current) narrativesObserver.unobserve(narrativesRef.current);
      if (statsRef.current) statsObserver.unobserve(statsRef.current);
      if (odaRef.current) odaObserver.unobserve(odaRef.current);
      if (aiStationRef.current) aiStationObserver.unobserve(aiStationRef.current);
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

        /* ============ GLOBAL CHALLENGE THROUGH ODA (3단계 서사) ============ */
        .gcOdaSection {
          background: #F2F5FD; padding: 120px 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 60px;
          opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .gcOdaSection.is-visible { opacity: 1; transform: translateY(0); }
        .gcOdaHeader { display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 592px; text-align: center; }
        .gcOdaBadge { display: inline-flex; align-items: center; justify-content: center; padding: 0 12px; height: 40px; border-radius: 99px; border: 1px solid #2167FD; font-weight: 700; font-size: 18px; line-height: 130%; color: #2167FD; white-space: nowrap; }
        .gcOdaTitle { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; color: #000000; margin: 0; word-break: keep-all; }
        .gcOdaDesc { font-weight: 400; font-size: 20px; line-height: 150%; color: #000000; margin: 0; word-break: keep-all; max-width: 600px; }
        .gcOdaSteps { width: 100%; max-width: 1276px; display: flex; flex-direction: column; gap: 20px; }
        .gcOdaRow { display: flex; align-items: stretch; gap: 20px; min-height: 400px; }
        .gcOdaRowImg { flex: 1 1 0; border-radius: 20px; overflow: hidden; background: #D9D9D9; min-height: 400px; }
        .gcOdaRowImg img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gcOdaRowCard { flex: 1 1 0; display: flex; flex-direction: column; justify-content: center; gap: 28px; padding: 0 40px; box-sizing: border-box; }
        .gcOdaStepHead { display: flex; flex-direction: column; gap: 8px; }
        .gcOdaStepTop { display: flex; align-items: center; gap: 8px; }
        .gcOdaStepNum { width: 36px; height: 36px; border-radius: 99px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; color: #ffffff; flex-shrink: 0; }
        .gcOdaStepLabel { font-weight: 700; font-size: 20px; line-height: 130%; }
        .gcOdaStepTitle { font-weight: 700; font-size: 40px; line-height: 130%; color: #000000; margin: 0; word-break: keep-all; }
        .gcOdaStepSubtitle { font-weight: 700; font-size: 18px; line-height: 150%; color: #000000; margin: 0; }
        .gcOdaStepDesc { font-weight: 400; font-size: 18px; line-height: 150%; color: #000000; margin: 0; word-break: keep-all; }
        .gcOdaTags { display: grid; grid-template-columns: repeat(2, max-content); gap: 8px; }
        .gcOdaTag { display: inline-flex; align-items: center; justify-content: center; padding: 0 8px; height: 28px; background: #E1E5EE; border-radius: 99px; font-weight: 400; font-size: 14px; color: #626772; white-space: nowrap; }

        /* ============ AI STATION FOR PARTNERSHIP (폰 목업 쇼케이스) ============ */
        .gcAiStationSection {
          background: #ffffff; padding: 120px 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 60px;
          opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .gcAiStationSection.is-visible { opacity: 1; transform: translateY(0); }
        .gcAiStationHeader { display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 562px; text-align: center; }
        .gcAiStationBadge { display: inline-flex; align-items: center; justify-content: center; padding: 0 12px; height: 40px; border-radius: 99px; border: 1px solid #2167FD; font-weight: 700; font-size: 18px; color: #2167FD; white-space: nowrap; }
        .gcAiStationTitle { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; color: #000000; margin: 0; word-break: keep-all; }
        .gcAiStationShowcase {
          position: relative; width: 100%; max-width: 1276px; aspect-ratio: 1276 / 920; border-radius: 24px; overflow: hidden;
          background-image: url(${IMG.aiStationBg});
          background-size: cover; background-position: center;
        }
        .gcAiStationPhone {
          position: absolute; top: calc(7.83% + 30px); left: 50%; transform: translateX(-50%);
          height: 97.8%; width: auto; aspect-ratio: 680 / 900; border-radius: 40px;
          background: linear-gradient(180deg, #ffffff 0%, #D8E1F1 100%); padding: 16px; box-sizing: border-box;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
        }
        .gcAiStationPhoneBezel { width: 100%; height: 100%; background: #000000; border-radius: 28px; padding: 24px; box-sizing: border-box; overflow: hidden; }
        .gcAiStationPhoneScreen { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; border-radius: 12px; }
        .gcAiStationCards {
          position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: flex-end; gap: 20px; padding: 32px; box-sizing: border-box;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 60%, rgba(0, 0, 0, 0.78) 100%);
        }
        .gcAiStationCard {
          flex: 1 1 0; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; gap: 8px;
          padding: 28px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-sizing: border-box;
        }
        .gcAiStationCardTitle { font-weight: 700; font-size: 24px; line-height: 130%; color: #ffffff; margin: 0; }
        .gcAiStationCardDesc { font-weight: 400; font-size: 18px; line-height: 150%; color: #ffffff; margin: 0; word-break: keep-all; }

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
          min-height: 360px;
          background-color: #002572;
          background-image: url(${IMG.whyGlobalBg});
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 60px 162px;
        }

        .psFinalCtaInner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1276px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          box-sizing: border-box;
        }

        .psFinalCtaTextGroup {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1 1 0;
        }

        .psFinalCtaText {
          max-width: 620px;
          font-family: inherit;
          font-size: 40px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }

        .psFinalCtaSubtitle {
          max-width: 780px;
          font-family: inherit;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0;
          color: rgba(255, 255, 255, 0.85);
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

        @media (max-width: 1360px) {
          .psFinalCta { padding: 60px 5%; min-height: auto; }
          .psFinalCtaInner { height: auto; }
          .psFinalCtaText { width: auto; }
        }

        @media (max-width: 900px) {
          .gcPage { padding-top: 100px; }
          .gcWhyCardsRow, .gcNarrativeGrid, .gcStatsGrid { grid-template-columns: 1fr !important; }
          .kaqCtaInner { flex-direction: column; align-items: flex-start; }

          .gcOdaRow { flex-direction: column; }
          .gcOdaRowImg { min-height: 240px; }
          .gcOdaRowCard { padding: 0; }
          .gcOdaStepTitle { font-size: 28px; }

          .gcAiStationShowcase {
            aspect-ratio: auto;
            height: auto;
            min-height: 0;
            padding: 32px 20px;
            overflow: visible;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
          }
          .gcAiStationPhone {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            width: 72%;
            max-width: 300px;
            height: auto;
          }
          .gcAiStationCards {
            position: static;
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 0;
            background: none;
          }
          .gcAiStationCard {
            min-height: 0;
            padding: 20px;
            flex-direction: row;
            align-items: center;
            gap: 16px;
          }
          .gcAiStationCard > svg { flex-shrink: 0; width: 32px; height: 32px; }
          .gcAiStationCard > div { flex: 1 1 0; min-width: 0; }
          .gcAiStationCardTitle { font-size: 18px; }
          .gcAiStationCardDesc { font-size: 14px; }
        }

        @media (max-width: 768px) {
          .psFinalCta { padding: 48px 20px; min-height: auto; }
          .psFinalCtaInner { flex-direction: column; align-items: flex-start; gap: 24px; height: auto; }
          .psFinalCtaText { width: 100%; font-size: 28px; }

          .gcOdaTags { grid-template-columns: repeat(2, max-content); }
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

      {/* ================= GLOBAL CHALLENGE THROUGH ODA (3단계 서사) ================= */}
      <div ref={odaRef} className={`gcOdaSection ${odaVisible ? "is-visible" : ""}`}>
        <div className="gcOdaHeader">
          <span className="gcOdaBadge">{t.oda.badge}</span>
          <h2 className="gcOdaTitle">
            {t.oda.title.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < t.oda.title.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="gcOdaDesc">{t.oda.desc}</p>
        </div>

        <div className="gcOdaSteps">
          {t.oda.steps.map((step, idx) => (
            <div className="gcOdaRow" key={idx}>
              <div className="gcOdaRowImg">
                <img src={step.image} alt={step.title} />
              </div>
              <div className="gcOdaRowCard">
                <div className="gcOdaStepHead">
                  <div className="gcOdaStepTop">
                    <span className="gcOdaStepNum" style={{ background: step.color }}>{step.num}</span>
                    <span className="gcOdaStepLabel" style={{ color: step.color }}>{step.label}</span>
                  </div>
                  <h3 className="gcOdaStepTitle">{step.title}</h3>
                  <p className="gcOdaStepSubtitle">{step.subtitle}</p>
                </div>
                <p className="gcOdaStepDesc">{step.desc}</p>
                <div className="gcOdaTags">
                  {step.tags.map((tag, tIdx) => (
                    <span className="gcOdaTag" key={tIdx}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= AI STATION FOR PARTNERSHIP (폰 목업 쇼케이스) ================= */}
      <div ref={aiStationRef} className={`gcAiStationSection ${aiStationVisible ? "is-visible" : ""}`}>
        <div className="gcAiStationHeader">
          <span className="gcAiStationBadge">{t.aiStation.badge}</span>
          <h2 className="gcAiStationTitle">
            {t.aiStation.title.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx < t.aiStation.title.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </div>

        <div className="gcAiStationShowcase">
          <div className="gcAiStationPhone">
            <div className="gcAiStationPhoneBezel">
              <img className="gcAiStationPhoneScreen" src={IMG.aiStationScreenshot} alt="K-AI Station" />
            </div>
          </div>

          <div className="gcAiStationCards">
            {t.aiStation.cards.map((card, idx) => {
              const Icon = AI_STATION_ICONS[card.icon];
              return (
                <div className="gcAiStationCard" key={idx} style={{ background: card.color }}>
                  <Icon />
                  <div>
                    <h3 className="gcAiStationCardTitle">{card.title}</h3>
                    <p className="gcAiStationCardDesc">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 최종 문의하기 CTA (ODA 파트너십 전용 문구) ================= */}
      <div className="fullBleed psFinalCta">
        <div className="psFinalCtaInner">
          <div className="psFinalCtaTextGroup">
            <p className="psFinalCtaText">
              {t.cta.title}
            </p>
            <p className="psFinalCtaSubtitle">{t.cta.subtitle}</p>
          </div>
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