"use client";

import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

const IMG = {
  darkBg1: "/dark-bg-1.png",
  darkBg2: "/dark-bg-2.png",
  cardPrompt: "/card-prompt.jpg",
  cardSafety: "/card-safety.jpg",
  cardTwin: "/card-twin.jpg",
};

const ArrowIcon = ({ size = 24, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Problem / Evidence / Application 아이콘 — 피그마 원본 SVG로 교체 */
const ProblemIcon = () => (
  <svg width="44" height="44" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.1662 34.8333L0 24.6671V10.1662L10.1662 0H24.6671L34.8333 10.1662V24.6671L24.6671 34.8333H10.1662ZM11.577 25.4155L17.4167 19.5758L23.2564 25.4155L25.4155 23.2564L19.5758 17.4167L25.4155 11.577L23.2564 9.41781L17.4167 15.2575L11.577 9.41781L9.41781 11.577L15.2575 17.4167L9.41781 23.2564L11.577 25.4155Z" fill="white"/>
  </svg>
);
const EvidenceIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_102_274" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
      <rect width="44" height="44" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_102_274)">
      <path d="M30.2503 35.1152C31.6042 35.1152 32.7536 34.6457 33.6984 33.7067C34.6431 32.7678 35.1155 31.6155 35.1155 30.25C35.1155 28.8961 34.6431 27.7467 33.6984 26.8019C32.7536 25.8572 31.6042 25.3848 30.2503 25.3848C28.8848 25.3848 27.7325 25.8572 26.7936 26.8019C25.8546 27.7467 25.3851 28.8961 25.3851 30.25C25.3851 31.6155 25.8546 32.7678 26.7936 33.7067C27.7325 34.6457 28.8848 35.1152 30.2503 35.1152ZM39.6003 41.5319L34.5623 36.5218C33.9442 36.9545 33.2695 37.2866 32.5383 37.5182C31.8074 37.7495 31.0448 37.8652 30.2503 37.8652C28.135 37.8652 26.3369 37.1248 24.8562 35.6441C23.3755 34.1634 22.6351 32.3653 22.6351 30.25C22.6351 28.1346 23.3755 26.3366 24.8562 24.8559C26.3369 23.3751 28.135 22.6348 30.2503 22.6348C32.3657 22.6348 34.1637 23.3751 35.6445 24.8559C37.1252 26.3366 37.8655 28.1346 37.8655 30.25C37.8655 31.0634 37.7422 31.8384 37.4957 32.5751C37.2488 33.3121 36.909 33.9897 36.4763 34.6078L41.5148 39.6L39.6003 41.5319ZM9.7312 39.4166C8.80506 39.4166 8.02116 39.0958 7.37949 38.4541C6.73783 37.8125 6.41699 37.0286 6.41699 36.1024V7.89752C6.41699 6.97138 6.73783 6.18748 7.37949 5.54581C8.02116 4.90415 8.80506 4.58331 9.7312 4.58331H24.292L33.917 14.2083V19.2674C33.3245 19.056 32.7227 18.8945 32.1116 18.7829C31.5005 18.6711 30.8801 18.6152 30.2503 18.6152C28.5157 18.6152 26.9045 18.9566 25.4167 19.6396C23.929 20.3225 22.6562 21.2621 21.5984 22.4583H13.292V25.2083H19.7967C19.4349 25.9181 19.1588 26.6579 18.9685 27.4276C18.7781 28.1976 18.6699 28.9856 18.644 29.7916H13.292V32.5416H18.8484C19.1139 33.9283 19.6193 35.2116 20.3645 36.3916C21.1095 37.5714 22.0578 38.5797 23.2094 39.4166H9.7312ZM22.917 15.5833H31.167L22.917 7.33331V15.5833Z" fill="white"/>
    </g>
  </svg>
);
const ApplicationIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_102_280" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
      <rect width="44" height="44" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_102_280)">
      <path d="M11.2994 38.5353C9.67998 38.5353 8.30269 37.9675 7.16755 36.8321C6.0321 35.697 5.46438 34.3197 5.46438 32.7002C5.46438 31.0808 6.0321 29.7035 7.16755 28.5684C8.30269 27.4329 9.67998 26.8652 11.2994 26.8652C12.9189 26.8652 14.2962 27.4329 15.4313 28.5684C16.5667 29.7035 17.1345 31.0808 17.1345 32.7002C17.1345 33.3489 17.0321 33.9718 16.8274 34.5689C16.623 35.1659 16.3221 35.7159 15.9249 36.2189V35.3338C16.8767 35.7781 17.865 36.1113 18.8899 36.3334C19.9147 36.5556 20.9513 36.6666 21.9997 36.6666C26.0941 36.6666 29.5622 35.2458 32.4038 32.4041C35.2455 29.5625 36.6663 26.0944 36.6663 22H39.4163C39.4163 24.4068 38.9586 26.6696 38.0432 28.7884C37.1277 30.9074 35.8861 32.7508 34.3183 34.3186C32.7505 35.8864 30.9071 37.128 28.788 38.0435C26.6693 38.9589 24.4065 39.4166 21.9997 39.4166C20.6598 39.4166 19.3507 39.2715 18.0722 38.9812C16.7935 38.691 15.5547 38.2496 14.356 37.6571C13.8907 37.9556 13.3995 38.1767 12.8825 38.3203C12.3652 38.4636 11.8375 38.5353 11.2994 38.5353ZM21.9997 27.835C20.3802 27.835 19.0029 27.2673 17.8678 26.1319C16.7324 24.9967 16.1646 23.6194 16.1646 22C16.1646 20.3805 16.7324 19.0032 17.8678 17.8681C19.0029 16.7327 20.3802 16.1649 21.9997 16.1649C23.6191 16.1649 24.9964 16.7327 26.1315 17.8681C27.267 19.0032 27.8347 20.3805 27.8347 22C27.8347 23.6194 27.267 24.9967 26.1315 26.1319C24.9964 27.2673 23.6191 27.835 21.9997 27.835ZM4.58301 22C4.58301 19.5931 5.04073 17.3303 5.95617 15.2116C6.87162 13.0926 8.11324 11.2492 9.68105 9.68135C11.2489 8.11355 13.0923 6.87193 15.2113 5.95648C17.33 5.04104 19.5928 4.58331 21.9997 4.58331C23.3395 4.58331 24.6487 4.72845 25.9271 5.01873C27.2059 5.30901 28.4446 5.75038 29.6433 6.34286C30.1087 6.05594 30.5998 5.84083 31.1168 5.69752C31.6341 5.55422 32.1618 5.48256 32.6999 5.48256C34.3194 5.48256 35.6938 6.04723 36.8231 7.17656C37.9524 8.3059 38.5171 9.68028 38.5171 11.2997C38.5171 12.9192 37.9524 14.2965 36.8231 15.4316C35.6938 16.567 34.3194 17.1348 32.6999 17.1348C31.0805 17.1348 29.7032 16.567 28.568 15.4316C27.4326 14.2965 26.8649 12.9192 26.8649 11.2997C26.8649 10.651 26.9672 10.0282 27.172 9.43111C27.3764 8.83405 27.6772 8.28405 28.0744 7.78111V8.66615C27.1226 8.22187 26.1343 7.88866 25.1095 7.66652C24.0846 7.44438 23.048 7.33331 21.9997 7.33331C17.9052 7.33331 14.4372 8.75415 11.5955 11.5958C8.75384 14.4375 7.33301 17.9055 7.33301 22H4.58301Z" fill="white"/>
    </g>
  </svg>
);


const translations = {
  KR: {
    hero: {
      badge: "연구 프로젝트",
      title: (
        <>
          현실의 문제를 연구하고,
          <br />
          기술로 검증합니다.
        </>
      ),
    },
    intro: {
      title: (
        <>
          기술보다 먼저
          <br />
          해결해야 할 문제를 봅니다.
        </>
      ),
      items: [
        { icon: "problem", label: "PROBLEM", desc: "현실의 문제에서 시작합니다." },
        { icon: "evidence", label: "EVIDENCE", desc: "측정하고 검증합니다." },
        { icon: "application", label: "APPLICATION", desc: "실제 활용으로 연결합니다." },
      ],
    },
    research: {
      title: (
        <>
          세 가지 연구가
          <br />
          하나의 방향을 향합니다.
        </>
      ),
      rows: [
        {
          badge: "AI PROMPT INTELLIGENCE",
          title: "고객맞춤형 AI 프롬프트",
          desc: "고객이 필요한 AI 프롬프트를 제공합니다. 대중모델, 자체모델, 개별모델을 만들어 AI 기술의 사유화를 연구합니다.",
          image: IMG.cardPrompt,
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          badge: "SAFETY CLOCK",
          title: "공간안전품질 대시보드",
          desc: "인간은 시간이 필요할 때 시계를 만들었습니다. 그럼에도 불구, 공간 안전이 중요한 현재 시점에 공간의 안전시계가 없습니다. 공간안전품질의 대시보드 표준화를 연구합니다.",
          image: IMG.cardSafety,
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
        {
          badge: "DIGITAL TWIN",
          title: "디지털트윈 개발 및 구축",
          desc: "AI는 센서를 기반으로 데이터 축적이 가능할 때 가장 효과적입니다. 측정(M), 추적(T), 연결(C), 통합(I)을 연구합니다. MTCI를 통해서만 미래의 신뢰를 확보할 수 있습니다.",
          image: IMG.cardTwin,
          button: null,
        },
      ],
    },
    stats: {
      title: (
        <>
          데이터를 모으는 것에서
          <br />
          의사결정에 활용하는 것까지.
        </>
      ),
      steps: [
        { num: "1", label: "Observe", desc: "사람과 공간에서 문제 발견" },
        { num: "2", label: "Measure", desc: "측정 가능한 정보로 전환" },
        { num: "3", label: "Analyze", desc: "패턴과 의미 분석" },
        { num: "4", label: "Validate", desc: "실험 · 현장 검증" },
        { num: "5", label: "Apply", desc: "제품과 실제 환경에 적용" },
      ],
    },
    patents: {
      title: (
        <>
          연구 결과를
          <br />
          기술 자산으로 축적합니다.
        </>
      ),
      items: [
        {
          no: "특허-2025-0196159",
          title: "프롬프트 난이도 조절을 통한 맞춤형 AI 학습 제공 시스템 및 방법",
          descEn: "System and method of providing customized artificial intelligence learning",
        },
        {
          no: "특허-2025-0153697",
          title: "품질척도 통합 대시보드 시각화 시스템 및 방법",
          descEn: "System and method for visualizing integrated quality measures dashboard",
        },
        {
          no: "특허-2025-0157432",
          title: "공간품질 관리를 위한 디지털 트윈 기반 센서 배치 지원 장치 및 방법",
          descEn: "Apparatus and method of supporting sensor arrangement based on digital twin",
        },
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
    hero: {
      badge: "Research Projects",
      title: (
        <>
          We study real-world problems,
          <br />
          and validate them with technology.
        </>
      ),
    },
    intro: {
      title: (
        <>
          We look at the problem
          <br />
          before the technology.
        </>
      ),
      items: [
        { icon: "problem", label: "PROBLEM", desc: "We start from real-world problems." },
        { icon: "evidence", label: "EVIDENCE", desc: "We measure and verify." },
        { icon: "application", label: "APPLICATION", desc: "We connect it to real use." },
      ],
    },
    research: {
      title: (
        <>
          Three research tracks,
          <br />
          one shared direction.
        </>
      ),
      rows: [
        {
          badge: "AI PROMPT INTELLIGENCE",
          title: "Customized AI Prompts",
          desc: "Delivering tailored AI prompts to meet unique client needs. We explore proprietary AI application frameworks across foundational, proprietary, and individualized models.",
          image: IMG.cardPrompt,
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          badge: "SAFETY CLOCK",
          title: "Spatial Safety Quality Dashboard",
          desc: "Humanity created clocks when time became essential. Yet, despite the critical importance of spatial safety today, a universal safety clock has been missing. We standardize spatial safety dashboards.",
          image: IMG.cardSafety,
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
        {
          badge: "DIGITAL TWIN",
          title: "Digital Twin Development & Implementation",
          desc: "AI thrives on robust sensor-driven data accumulation. We pioneer MTCI: Measure (M), Trace (T), Connect (C), and Integrate (I) to build verifiable trust for the future.",
          image: IMG.cardTwin,
          button: null,
        },
      ],
    },
    stats: {
      title: (
        <>
          From gathering data
          <br />
          to putting it to work.
        </>
      ),
      steps: [
        { num: "1", label: "Observe", desc: "Find problems in people and space" },
        { num: "2", label: "Measure", desc: "Turn it into measurable information" },
        { num: "3", label: "Analyze", desc: "Analyze patterns and meaning" },
        { num: "4", label: "Validate", desc: "Test · field verification" },
        { num: "5", label: "Apply", desc: "Apply to products and real environments" },
      ],
    },
    patents: {
      title: (
        <>
          We accumulate research
          <br />
          into technology assets.
        </>
      ),
      items: [
        {
          no: "KR 2025-0196159",
          title: "System and Method for Providing Customized AI Learning Through Prompt Difficulty Adjustment",
          descEn: "System and method of providing customized artificial intelligence learning",
        },
        {
          no: "KR 2025-0153697",
          title: "Integrated Quality Metrics Dashboard Visualization System and Method",
          descEn: "System and method for visualizing integrated quality measures dashboard",
        },
        {
          no: "KR 2025-0157432",
          title: "Digital Twin-Based Sensor Arrangement Support Apparatus and Method for Spatial Quality Management",
          descEn: "Apparatus and method of supporting sensor arrangement based on digital twin",
        },
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
    hero: {
      badge: "研究プロジェクト",
      title: (
        <>
          現実の課題を研究し、
          <br />
          技術で検証します。
        </>
      ),
    },
    intro: {
      title: (
        <>
          技術より先に
          <br />
          解決すべき問題を見ます。
        </>
      ),
      items: [
        { icon: "problem", label: "PROBLEM", desc: "現実の問題から始めます。" },
        { icon: "evidence", label: "EVIDENCE", desc: "測定し検証します。" },
        { icon: "application", label: "APPLICATION", desc: "実際の活用へつなげます。" },
      ],
    },
    research: {
      title: (
        <>
          3つの研究が
          <br />
          ひとつの方向を目指します。
        </>
      ),
      rows: [
        {
          badge: "AI PROMPT INTELLIGENCE",
          title: "顧客オーダーメイド型AIプロンプト",
          desc: "顧客に必要なAIプロンプトを提供します。汎用モデル、独自モデル、個別モデルを構築し、AI技術の実用化・専有化を研究します。",
          image: IMG.cardPrompt,
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          badge: "SAFETY CLOCK",
          title: "空間安全品質ダッシュボード",
          desc: "人類は時間が必要なときに時計を創り出しました。空間安全が極めて重要な今日、空間のための「安全時計」が存在しません。空間安全品質ダッシュボードの標準化を推進します。",
          image: IMG.cardSafety,
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
        {
          badge: "DIGITAL TWIN",
          title: "デジタルツインの開発および構築",
          desc: "AIはセンサーに基づくデータ蓄積が可能なときに真価を発揮します。測定(M)・追跡(T)・接続(C)・統合(I)のMTCI体系を通じて未来の信頼を確立します。",
          image: IMG.cardTwin,
          button: null,
        },
      ],
    },
    stats: {
      title: (
        <>
          データを集めることから
          <br />
          意思決定に活かすことまで。
        </>
      ),
      steps: [
        { num: "1", label: "Observe", desc: "人と空間から問題を発見" },
        { num: "2", label: "Measure", desc: "測定可能な情報へ変換" },
        { num: "3", label: "Analyze", desc: "パターンと意味を分析" },
        { num: "4", label: "Validate", desc: "実験・現場検証" },
        { num: "5", label: "Apply", desc: "製品と実環境へ適用" },
      ],
    },
    patents: {
      title: (
        <>
          研究成果を
          <br />
          技術資産として蓄積します。
        </>
      ),
      items: [
        {
          no: "特許-2025-0196159",
          title: "プロンプト難易度調整によるオーダーメイド型AI学習提供システムおよび方法",
          descEn: "System and method of providing customized artificial intelligence learning",
        },
        {
          no: "特許-2025-0153697",
          title: "品質指標統合ダッシュボード可視化システムおよび方法",
          descEn: "System and method for visualizing integrated quality measures dashboard",
        },
        {
          no: "特許-2025-0157432",
          title: "空間品質管理のためのデジタルツインベースセンサー配置支援装置および方法",
          descEn: "Apparatus and method of supporting sensor arrangement based on digital twin",
        },
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
    hero: {
      badge: "โครงการวิจัย",
      title: (
        <>
          เราศึกษาปัญหาที่เกิดขึ้นจริง
          <br />
          และพิสูจน์ด้วยเทคโนโลยี
        </>
      ),
    },
    intro: {
      title: (
        <>
          มองปัญหาที่ต้องแก้ไข
          <br />
          ก่อนมองเทคโนโลยี
        </>
      ),
      items: [
        { icon: "problem", label: "PROBLEM", desc: "เริ่มต้นจากปัญหาที่เกิดขึ้นจริง" },
        { icon: "evidence", label: "EVIDENCE", desc: "วัดผลและพิสูจน์" },
        { icon: "application", label: "APPLICATION", desc: "เชื่อมโยงสู่การใช้งานจริง" },
      ],
    },
    research: {
      title: (
        <>
          งานวิจัยสามด้าน
          <br />
          มุ่งสู่ทิศทางเดียวกัน
        </>
      ),
      rows: [
        {
          badge: "AI PROMPT INTELLIGENCE",
          title: "AI Prompts ปรับแต่งตามความต้องการ",
          desc: "ส่งมอบ AI Prompts ที่ตอบโจทย์เฉพาะบุคคล เราศึกษาวิจัยการประยุกต์ใช้เทคโนโลยี AI ผ่านโมเดลสาธารณะ โมเดลเฉพาะองค์กร และโมเดลระดับบุคคล",
          image: IMG.cardPrompt,
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          badge: "SAFETY CLOCK",
          title: "แดชบอร์ดคุณภาพความปลอดภัยเชิงพื้นที่",
          desc: "มนุษย์สร้างนาฬิกาเมื่อต้องการวัดเวลา แต่น่าแปลกที่ในยุคที่ความปลอดภัยเชิงพื้นที่มีความสำคัญสูงสุด กลับยังไม่มีนาฬิกาความปลอดภัย เราจึงวิจัยเพื่อสร้างมาตรฐานแดชบอร์ดความปลอดภัยเชิงพื้นที่",
          image: IMG.cardSafety,
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
        {
          badge: "DIGITAL TWIN",
          title: "การพัฒนาและติดตั้งระบบ Digital Twin",
          desc: "AI มีประสิทธิภาพสูงสุดเมื่อสามารถสะสมข้อมูลผ่านเซนเซอร์ได้ เราศึกษาวิจัยระบบ MTCI: การวัด (M), การติดตาม (T), การเชื่อมต่อ (C) และการบูรณาการ (I) เพื่อสร้างความน่าเชื่อถือแห่งอนาคต",
          image: IMG.cardTwin,
          button: null,
        },
      ],
    },
    stats: {
      title: (
        <>
          จากการเก็บข้อมูล
          <br />
          สู่การนำไปใช้ตัดสินใจ
        </>
      ),
      steps: [
        { num: "1", label: "Observe", desc: "ค้นพบปัญหาจากผู้คนและพื้นที่" },
        { num: "2", label: "Measure", desc: "แปลงเป็นข้อมูลที่วัดผลได้" },
        { num: "3", label: "Analyze", desc: "วิเคราะห์รูปแบบและความหมาย" },
        { num: "4", label: "Validate", desc: "ทดสอบ · ตรวจสอบภาคสนาม" },
        { num: "5", label: "Apply", desc: "นำไปใช้กับผลิตภัณฑ์และสภาพแวดล้อมจริง" },
      ],
    },
    patents: {
      title: (
        <>
          สั่งสมผลงานวิจัย
          <br />
          ให้เป็นสินทรัพย์ทางเทคโนโลยี
        </>
      ),
      items: [
        {
          no: "สิทธิบัตร-2025-0196159",
          title: "ระบบและวิธีการจัดการเรียนรู้ AI แบบกำหนดเองผ่านการปรับระดับความยากของ Prompt",
          descEn: "System and method of providing customized artificial intelligence learning",
        },
        {
          no: "สิทธิบัตร-2025-0153697",
          title: "ระบบและวิธีการแสดงผลแดชบอร์ดรวมตัวชี้วัดคุณภาพแบบบูรณาการ",
          descEn: "System and method for visualizing integrated quality measures dashboard",
        },
        {
          no: "สิทธิบัตร-2025-0157432",
          title: "อุปกรณ์และวิธีการสนับสนุนการจัดวางเซนเซอร์บนพื้นฐาน Digital Twin สำหรับการจัดการคุณภาพเชิงพื้นที่",
          descEn: "Apparatus and method of supporting sensor arrangement based on digital twin",
        },
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
  AR: {
    hero: {
      badge: "المشاريع البحثية",
      title: (
        <>
          ندرس المشكلات الواقعية،
          <br />
          ونتحقق منها باستخدام التكنولوجيا.
        </>
      ),
    },
    intro: {
      title: (
        <>
          ننظر إلى المشكلة التي يجب حلها
          <br />
          قبل النظر إلى التكنولوجيا.
        </>
      ),
      items: [
        { icon: "problem", label: "PROBLEM", desc: "نبدأ من مشكلات الواقع." },
        { icon: "evidence", label: "EVIDENCE", desc: "نقيس ون تتحقق." },
        { icon: "application", label: "APPLICATION", desc: "نربطها بالتطبيق الفعلي." },
      ],
    },
    research: {
      title: (
        <>
          ثلاثة مسارات بحثية
          <br />
          تتجه نحو هدف واحد.
        </>
      ),
      rows: [
        {
          badge: "AI PROMPT INTELLIGENCE",
          title: "موجهات ذكاء اصطناعي مخصصة للعملاء",
          desc: "نقدم موجهات ذكاء اصطناعي تلبي احتياجات العملاء الفريدة. نبحث في إطارات تطبيقات الذكاء الاصطناعي الخاصة عبر النماذج التأسيسية والمملوكة والفردية.",
          image: IMG.cardPrompt,
          button: { label: "K-AI Station", link: "https://k-ai-station.vercel.app/" },
        },
        {
          badge: "SAFETY CLOCK",
          title: "لوحة تحكم جودة أمان المساحات",
          desc: "ابتكرت البشرية الساعات عندما أصبح الوقت أساسياً. ومع ذلك، على الرغم من الأهمية الحرجة لأمان المساحات اليوم، إلا أننا افتقرنا لوجود ساعة أمان عالمية. نعمل على توحيد معايير لوحات تحكم أمان المساحات.",
          image: IMG.cardSafety,
          button: { label: "DSQ PLATFORM", link: "http://openq.co.kr:8082/" },
        },
        {
          badge: "DIGITAL TWIN",
          title: "تطوير وبناء التوأم الرقمي",
          desc: "يزدهر الذكاء الاصطناعي بفضل تجميع البيانات المدعومة بالمستشعرات. نبتكر منهجية MTCI: القياس (M)، التتبع (T)، الاتصال (C)، والتكامل (I) لبناء ثقة يمكن التحقق منها للمستقبل.",
          image: IMG.cardTwin,
          button: null,
        },
      ],
    },
    stats: {
      title: (
        <>
          من جمع البيانات
          <br />
          إلى توظيفها في صنع القرار.
        </>
      ),
      steps: [
        { num: "1", label: "Observe", desc: "اكتشاف المشكلات في الأفراد والمساحات" },
        { num: "2", label: "Measure", desc: "تحويلها إلى معلومات قابلة للقياس" },
        { num: "3", label: "Analyze", desc: "تحليل الأنماط والمعاني" },
        { num: "4", label: "Validate", desc: "الاختبار والتحقق الميداني" },
        { num: "5", label: "Apply", desc: "التطبيق على المنتجات والبيئات الحقيقية" },
      ],
    },
    patents: {
      title: (
        <>
          نراكم نتائج الأبحاث
          <br />
          لتصبح أصولاً تكنولوجية.
        </>
      ),
      items: [
        {
          no: "KR 2025-0196159",
          title: "نظام وطريقة لتوفير تعلم ذكاء اصطناعي مخصص من خلال تعديل صعوبة الموجهات",
          descEn: "System and method of providing customized artificial intelligence learning",
        },
        {
          no: "KR 2025-0153697",
          title: "نظام وطريقة لتصور لوحة تحكم مقاييس الجودة المتكاملة",
          descEn: "System and method for visualizing integrated quality measures dashboard",
        },
        {
          no: "KR 2025-0157432",
          title: "جهاز وطريقة لدعم ترتيب المستشعرات استناداً إلى التوأم الرقمي لإدارة جودة المساحات",
          descEn: "Apparatus and method of supporting sensor arrangement based on digital twin",
        },
      ],
    },
    cta: {
      title: (
        <>
          اصنع معنا معياراً جديداً لتجربة الذكاء الاصطناعي
          <br />
          وجودة الأمان جنباً إلى جنب مع KAQ.
        </>
      ),
      button: "اتصل بنا",
    },
    modal: {
      title: "Application",
      jobLabel: "المنصب المتقدم إليه",
      nameLabel: "الاسم الكامل *",
      namePlaceholder: "محمد أحمد",
      birthLabel: "تاريخ الميلاد *",
      nationalityLabel: "الجنسية *",
      nationalityPlaceholder: "كوريا الجنوبية",
      linkLabel: "رابط السيرة الذاتية / المحفظة",
      linkPlaceholder: "يرجى إدخال رابط قابل للمشاركة (Google Drive, Notion، إلخ)",
      submitBtn: "إرسال الطلب",
      successMsg: "تم إرسال طلبك بنجاح!",
      errMsg: "حدث خطأ أثناء الإرسال.",
      alertFillAll: "يرجى ملء جميع الحقول المطلوبة.",
    },
  },
};

const INTRO_ICONS = {
  problem: ProblemIcon,
  evidence: EvidenceIcon,
  application: ApplicationIcon,
};

export default function PublicationsPage({ onOpenContact }) {
  const { currentLang } = useLanguage();
  const t = translations[currentLang] || translations.KR;

  const [introVisible, setIntroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [patentsVisible, setPatentsVisible] = useState(false);
  const [rowsVisible, setRowsVisible] = useState([false, false, false]);

  const introRef = useRef(null);
  const statsRef = useRef(null);
  const patentsRef = useRef(null);
  const rowRefs = [useRef(null), useRef(null), useRef(null)];

  /* AboutPage / ProductsPage와 완전히 동일한 지원·문의 모달 상태/로직 */
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

    const introObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIntroVisible(true);
    }, observerOptions);
    const statsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsVisible(true);
    }, observerOptions);
    const patentsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setPatentsVisible(true);
    }, observerOptions);

    if (introRef.current) introObserver.observe(introRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);
    if (patentsRef.current) patentsObserver.observe(patentsRef.current);

    const rowObservers = rowRefs.map((ref, index) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setRowsVisible((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }
      }, observerOptions);
      if (ref.current) observer.observe(ref.current);
      return { observer, el: ref.current };
    });

    return () => {
      if (introRef.current) introObserver.unobserve(introRef.current);
      if (statsRef.current) statsObserver.unobserve(statsRef.current);
      if (patentsRef.current) patentsObserver.unobserve(patentsRef.current);
      rowObservers.forEach(({ observer, el }) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="rpqPage">
      <style>{`
        .rpqPage {
          width: 100%;
          background-color: #ffffff;
          color: #111625;
          padding: 140px 20px 0px 20px;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        .rpqInner { max-width: 1276px; margin: 0 auto; box-sizing: border-box; }

        .fullBleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          box-sizing: border-box;
        }

        .rpqOverlayBlue,
.rpqOverlayNavy {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

        /* HERO */
        .rpqHeroBadge { display: block; font-weight: 700; font-size: 24px; line-height: 130%; color: #2167FD; margin-bottom: 20px; }
        .rpqHeroTitle { font-weight: 700; font-size: clamp(2rem, 5vw, 60px); line-height: 130%; color: #000000; margin: 0; max-width: 620px; word-break: keep-all; }

        /* 문제/근거/적용 다크 배너 */
        .rpqIntroSection {
          position: relative;
          background-color: #0a0a0a;
          padding: 120px 20px;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
        }
        .rpqIntroSection.is-visible { opacity: 1; transform: translateY(0); }
        .rpqIntroBgImg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
        .rpqIntroInner { position: relative; z-index: 3; max-width: 1276px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 60px; }
        .rpqSectionTitleWhite { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; text-align: center; color: #ffffff; margin: 0; word-break: keep-all; }
        .rpqSectionTitleBlack { font-weight: 700; font-size: clamp(1.8rem, 4vw, 48px); line-height: 130%; text-align: center; color: #000000; margin: 0; word-break: keep-all; }
        .rpqIntroItems { width: 100%; display: flex; gap: 40px; flex-wrap: wrap; }
        .rpqIntroItem { flex: 1 1 240px; display: flex; flex-direction: column; align-items: flex-start; gap: 28px; }
        .rpqIntroDivider { width: 100%; height: 1px; background: #ffffff; }
        .rpqIntroItemBody { display: flex; flex-direction: column; gap: 12px; }
        .rpqIntroItemLabel { font-weight: 700; font-size: 24px; line-height: 130%; color: #ffffff; }
        .rpqIntroItemDesc { font-weight: 500; font-size: 18px; line-height: 130%; color: #ffffff; }

        /* 연구 카드 로우 (교차 배치) */
        .rpqResearchSection { padding: 120px 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 80px; }
        .rpqResearchRows { width: 100%; max-width: 1276px; display: flex; flex-direction: column; gap: 20px; }
        .rpqRow {
          display: flex; align-items: stretch; gap: 20px; min-height: 400px;
          opacity: 0; transform: translateY(28px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .rpqRow.is-visible { opacity: 1; transform: translateY(0); }
        .rpqRow.reverse { flex-direction: row-reverse; }
        .rpqRowImg { flex: 1 1 0; border-radius: 20px; overflow: hidden; background: #D9D9D9; min-height: 400px; }
        .rpqRowImg img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rpqRowCard {
          flex: 1 1 0; background: #ffffff; border-radius: 24px; padding: 40px;
          display: flex; flex-direction: column; justify-content: center; gap: 28px; box-sizing: border-box;
        }
        .rpqRowBadge { font-weight: 700; font-size: 18px; line-height: 130%; color: #2167FD; }
        .rpqRowTitle { font-weight: 700; font-size: clamp(1.6rem, 3vw, 40px); line-height: 130%; color: #000000; margin: 8px 0 0 0; }
        .rpqRowDesc { font-weight: 400; font-size: 18px; line-height: 150%; color: #626772; margin: 0; word-break: keep-all; }
        .rpqRowBtn {
          align-self: flex-start; display: inline-flex; align-items: center; gap: 4px;
          padding: 0 16px 0 20px; height: 52px; background: #000000; border-radius: 99px; border: none;
          color: #ffffff; font-weight: 700; font-size: 18px; text-decoration: none; cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .rpqRowBtn:hover { background: #2167FD; }

        /* Observe → Apply 다크 통계 배너 */
        .rpqStatsSection {
          position: relative; background-color: #0a0a0a; padding: 120px 20px; box-sizing: border-box; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; gap: 60px;
          opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .rpqStatsSection.is-visible { opacity: 1; transform: translateY(0); }
        .rpqStatsInner { position: relative; z-index: 3; max-width: 1276px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 60px; }
        .rpqStatsGrid { width: 100%; display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .rpqStatsCard {
          display: flex; flex-direction: column; justify-content: space-between; gap: 28px;
          padding: 28px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          min-height: 240px; box-sizing: border-box;
        }
        .rpqStatsNum { font-weight: 700; font-size: 32px; line-height: 130%; color: #ffffff; text-align: left; }
        .rpqStatsBody { display: flex; flex-direction: column; gap: 8px; text-align: left; }
        .rpqStatsLabel { font-weight: 500; font-size: 24px; line-height: 130%; color: #ffffff; }
        .rpqStatsDesc { font-weight: 400; font-size: 16px; line-height: 130%; color: #ffffff; }

        /* 특허 카드 */
        .rpqPatentsSection { background: #F2F5FD; padding: 120px 20px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 60px; }
        .rpqPatentsInner {
          max-width: 1276px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 60px;
          opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .rpqPatentsInner.is-visible { opacity: 1; transform: translateY(0); }
        .rpqPatentsGrid { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .rpqPatentCard { display: flex; flex-direction: column; justify-content: space-between; gap: 28px; padding: 28px; background: #ffffff; border-radius: 20px; min-height: 280px; box-sizing: border-box; }
        .rpqPatentBadge {
          align-self: flex-start; display: inline-flex; align-items: center; gap: 8px; padding: 0 12px; height: 32px;
          background: #F2F5FD; border-radius: 99px;
        }
        .rpqPatentDot { width: 8px; height: 8px; border-radius: 50%; background: #2167FD; flex-shrink: 0; }
        .rpqPatentNo { font-weight: 500; font-size: 16px; line-height: 130%; color: #2167FD; }
        .rpqPatentTitle { font-weight: 500; font-size: 24px; line-height: 130%; color: #000000; margin: 0; word-break: keep-all; }
        .rpqPatentDesc { font-weight: 400; font-size: 16px; line-height: 130%; color: #838996; margin: 0; word-break: keep-all; }

        /* CTA & 푸터 — AboutPage/ProductsPage와 동일 */
        .kaqCtaSection {
          background: radial-gradient(ellipse 800px 400px at 90% 20%, rgba(33,103,253,0.35), transparent 60%), #002572;
          padding: 60px 20px; box-sizing: border-box;
        }
        .kaqCtaInner { max-width: 1276px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
        .kaqCtaTitle { font-family: inherit; font-weight: 700; font-size: clamp(1.5rem, 3vw, 40px); line-height: 130%; color: #ffffff; margin: 0; word-break: keep-all; }
        .kaqCtaBtn {
          display: inline-flex; align-items: center; gap: 4px; padding: 14px 16px 14px 20px;
          background: #2167FD; border-radius: 99px; border: none; color: #ffffff;
          font-family: inherit; font-weight: 700; font-size: 18px;
          cursor: pointer; white-space: nowrap; transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .kaqCtaBtn:hover { background: #1a54d1;}

        .kaqFooter { background: #000000; padding: 60px 20px 80px; box-sizing: border-box; }
        .kaqFooterInner { max-width: 1276px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; }
        .kaqFooterTop { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        .kaqFooterLogo { font-weight: 800; font-size: 20px; letter-spacing: 0.05em; color: #ffffff; }
        .kaqFooterLinks { display: flex; align-items: center; gap: 20px; }
        .kaqFooterLinks a { font-weight: 700; font-size: 16px; line-height: 130%; color: #ffffff; text-decoration: none; }
        .kaqFooterDivider { border: none; border-top: 1px solid rgba(255,255,255,0.2); margin: 0; }
        .kaqFooterInfo { display: flex; flex-direction: column; gap: 8px; }
        .kaqFooterInfoRow { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .kaqFooterInfoRow span { font-weight: 400; font-size: 16px; line-height: 130%; color: #838996; }
        .kaqFooterDot { width: 1px; height: 16px; background: #ffffff; opacity: 0.2; }


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
          background-image: url("/BG_08.png");
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

        @media (max-width: 1360px) {
          .psFinalCta { padding: 60px 5%; min-height: auto; }
          .psFinalCtaInner { height: auto; }
          .psFinalCtaText { width: auto; }
        }

        @media (max-width: 900px) {
          .rpqPage { padding-top: 100px; }
          .rpqIntroItems { flex-direction: column; gap: 32px; }
          .rpqRow, .rpqRow.reverse { flex-direction: column; }
          .rpqRowImg { min-height: 240px; }
          .rpqStatsGrid { grid-template-columns: repeat(2, 1fr); }
          .rpqPatentsGrid { grid-template-columns: 1fr; }
          .kaqCtaInner { flex-direction: column; align-items: flex-start; }
          .kaqFooterTop { flex-direction: column; align-items: flex-start; gap: 16px; }
        }

        @media (max-width: 768px) {
          .psFinalCta { padding: 48px 20px; min-height: auto; }
          .psFinalCtaInner { flex-direction: column; align-items: flex-start; gap: 24px; height: auto; }
          .psFinalCtaText { width: 100%; font-size: 28px; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <div className="rpqInner">
        <div style={{ marginBottom: "60px" }}>
          <span className="rpqHeroBadge">{t.hero.badge}</span>
          <h1 className="rpqHeroTitle">{t.hero.title}</h1>
        </div>
      </div>

      {/* ================= PROBLEM / EVIDENCE / APPLICATION (full-bleed) ================= */}
      <div ref={introRef} className={`fullBleed rpqIntroSection ${introVisible ? "is-visible" : ""}`}>
        <img className="rpqIntroBgImg" src={IMG.darkBg1} alt="" aria-hidden="true" />
        <div className="rpqOverlayBlue" />
        <div className="rpqOverlayNavy" />
        <div className="rpqIntroInner">
          <h2 className="rpqSectionTitleWhite">{t.intro.title}</h2>
          <div className="rpqIntroItems">
            {t.intro.items.map((item, idx) => {
              const Icon = INTRO_ICONS[item.icon];
              return (
                <div className="rpqIntroItem" key={idx}>
                  <div className="rpqIntroDivider" />
                  <Icon />
                  <div className="rpqIntroItemBody">
                    <span className="rpqIntroItemLabel">{item.label}</span>
                    <span className="rpqIntroItemDesc">{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 세 가지 연구 (교차 카드) ================= */}
      <div className="rpqResearchSection">
        <h2 className="rpqSectionTitleBlack">{t.research.title}</h2>
        <div className="rpqResearchRows">
          {t.research.rows.map((row, idx) => (
            <div
              key={idx}
              ref={rowRefs[idx]}
              className={`rpqRow ${idx % 2 === 1 ? "reverse" : ""} ${rowsVisible[idx] ? "is-visible" : ""}`}
            >
              <div className="rpqRowImg">
                <img src={row.image} alt={row.title} />
              </div>
              <div className="rpqRowCard">
                <div>
                  <span className="rpqRowBadge">{row.badge}</span>
                  <h3 className="rpqRowTitle">{row.title}</h3>
                </div>
                <p className="rpqRowDesc">{row.desc}</p>
                {row.button && (
                  <a
                    className="rpqRowBtn"
                    href={row.button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.button.label}
                    <ArrowIcon size={24} color="#ffffff" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Observe → Apply 통계 배너 (full-bleed) ================= */}
      <div ref={statsRef} className={`fullBleed rpqStatsSection ${statsVisible ? "is-visible" : ""}`}>
        <img className="rpqIntroBgImg" src={IMG.darkBg2} alt="" aria-hidden="true" />
        <div className="rpqOverlayBlue" />
        <div className="rpqStatsInner">
          <h2 className="rpqSectionTitleWhite">{t.stats.title}</h2>
          <div className="rpqStatsGrid">
            {t.stats.steps.map((step, idx) => (
              <div className="rpqStatsCard" key={idx}>
                <span className="rpqStatsNum">{step.num}</span>
                <div className="rpqStatsBody">
                  <span className="rpqStatsLabel">{step.label}</span>
                  <span className="rpqStatsDesc">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 특허 / 지식재산 ================= */}
      <div className="rpqPatentsSection">
        <div ref={patentsRef} className={`rpqPatentsInner ${patentsVisible ? "is-visible" : ""}`}>
          <h2 className="rpqSectionTitleBlack">{t.patents.title}</h2>
          <div className="rpqPatentsGrid">
            {t.patents.items.map((item, idx) => (
              <div className="rpqPatentCard" key={idx}>
                <span className="rpqPatentBadge">
                  <span className="rpqPatentDot" />
                  <span className="rpqPatentNo">{item.no}</span>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3 className="rpqPatentTitle">{item.title}</h3>
                  <p className="rpqPatentDesc">{item.descEn}</p>
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