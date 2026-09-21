"use client";

import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";

/* AboutPage와 동일한 화살표 아이콘 — CTA 버튼에서 공용으로 사용 */
const ArrowIcon = ({ size = 28, color = "#000000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


/* ============================================================
   4개 언어 콘텐츠 사전 (KR / EN / JP / TH)
   ============================================================ */
const CONTENT = {
  KR: {
    hero: {
      badge: "제품 및 서비스",
      subtitle: [
        "사람과 AI의 관계에서 시작해",
        "공간의 안전과 품질까지 확장됩니다.",
      ],
      bannerText: ["사람에게는 더 쉬운 AI를,", "공간에는 더 나은 품질을."],
    },
    station: {
      title: "K–AI Station",
      subtitle: [
        "AI가 익숙한 사람만을 위한 서비스가 아니라",
        "연령, 직업, 관심사와 관계없이 AI를 직접 경험할 수 있도록 설계합니다.",
      ],
      banner: "/8.png",
      exploreBtn: "바로가기",
      exploreLink: "https://k-ai-station.vercel.app/",
      why: {
        badge: "WHY",
        heading: ["AI가 가까워졌지만,", "모두에게 쉬워진 것은 아닙니다."],
        cards: [
          { title: "시작 방법을 모릅니다.", desc: "AI를 처음 접하는 이용자는 무엇부터 질문해야 할지 어렵습니다." },
          { title: "활용 수준이 다릅니다.", desc: "같은 AI라도 연령과 직업, 목적에 따라 필요한 질문과 설명 방식이 다릅니다." },
          { title: "접근 방식도 달라야 합니다.", desc: "글자 크기, 음성 안내, 언어 등 사용자 환경에 따라 다른 인터페이스가 필요합니다." },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["그래서 K–AI Station은", "사용자가 AI에 맞추는 대신", "AI 경험을 사용자에게 맞춥니다."],
        cards: [
          { title: "준비된 질문과 가이드 탐색", desc: "AI를 처음 사용하는 사람도 질문을 쉽게 시작할 수 있습니다." },
          { title: "나에게 맞는 경험 선택", desc: "연령·직업·목적에 맞는 모드를 선택할 수 있습니다." },
          { title: "누구나 사용할 수 있는 인터페이스 제공", desc: "음성 안내, 다국어 지원 등 누구나 사용할 수 있는 환경을 제공합니다." },
        ],
      },
      modeBadge: "MODE",
      modeHeading: ["서로 다른 사람에게", "서로 다른 AI 경험을"],
      modes: [
        { id: "senior", title: "시니어 모드", desc: "어렵지 않아요. 정겨운 AI가 당신의 이야기를 기다립니다.", link: "https://kai-station.com/senior?from=%2Fhome", image: "/11.png" },
        { id: "doran", title: "도란도란 AI", desc: "몇 번의 선택만으로 AI와 편하게 대화를 시작해 보세요.", link: "https://doran-two.vercel.app/", image: "/12.png" },
        { id: "kids", title: "어린이 모드", desc: "호기심 가득! AI 친구와 함께 상상력을 키워보세요.", link: "https://kai-station.com/kids?from=%2Fhome", image: "/13.png" },
        { id: "lab", title: "실험실습 모드", desc: "AI를 활용한 과제와 실습을 수업 안에서 진행해 보세요.", link: "https://kai-station.com/?from=%2Fhome", image: "/14.png" },
        { id: "safety", title: "안전품질 모드", desc: "안전과 품질 분야에 특화된 AI 프롬프트를 체험해 보세요.", link: "http://openq.co.kr:8082/", image: "/15.png" },
        { id: "ncs", title: "NCS 모드", desc: "호기심 가득! AI 친구와 함께 상상력을 키워보세요.", link: "https://kai-station.com/categories/cmq3j1xfy003quvv6j86nh8lb?from=%2Fhome", image: "/16.png" },
      ],
    },
    midCta: {
      badge: "FROM PEOPLE TO SPACE",
      heading: ["사람의 경험을 더 나은 방향으로.", "공간의 품질도 더 나은 방향으로."],
    },
    dsq: {
      title: "DSQ PLATFORM",
      subtitle: ["현장에 흩어진 안전과 품질 정보를", "측정·확인·관리할 수 있는 디지털 환경으로 전환합니다."],
      banner: "/9.png",
      exploreBtn: "바로가기",
      exploreLink: "http://openq.co.kr:8082/",
      why: {
        badge: "WHY",
        heading: ["공간의 안전은 눈에 보이지 않을 때", "관리하기 어렵습니다."],
        cards: [
          { title: "정보가 흩어져 있습니다.", desc: "점검 결과와 현장 데이터가 서로 다른 방식으로 관리됩니다." },
          { title: "현재 상태를 한눈에 보기 어렵습니다.", desc: "문제가 발생하기 전에는 위험 변화를 파악하기 어렵습니다." },
          { title: "기록이 개선으로 이어지기 어렵습니다.", desc: "점검이 일회성 기록으로 끝나는 경우가 있습니다." },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["그래서 DSQ PLATFORM은", "현장의 데이터를", "하나의 흐름으로 연결합니다."],
        steps: [
          { label: "SENSE", desc: "현장 정보 수집" },
          { label: "MEASURE", desc: "안전·품질 상태 측정" },
          { label: "ANALYZE", desc: "상태와 변화 분석" },
          { label: "VISUALIZE", desc: "대시보드 시각화" },
          { label: "IMPROVE", desc: "위험 확인과 개선 관리", wide: true },
        ],
      },
      application: {
        badge: "APPLICATION",
        heading: ["다양한 생활 공간에", "적용할 수 있습니다."],
        places: [
          { title: "다중이용시설", desc: "많은 이용자가 함께 사용하는 공간의 안전품질 관리", image: "/17.png" },
          { title: "전통시장", desc: "복잡한 환경의 위험 요소와 관리 상태 확인", image: "/18.png" },
          { title: "스쿨존", desc: "생활 안전이 중요한 공간의 지속적 관리", image: "/19.png" },
        ],
      },
    },
    finalCta: {
      text: ["KAQ와 함께 새로운 AI 경험과", "안전품질의 기준을 만들어보세요."],
      btn: "문의하기",
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
      badge: "Products & Services",
      subtitle: [
        "Starting from the relationship between people and AI,",
        "and extending to the safety and quality of our spaces.",
      ],
      bannerText: ["Easier AI for people,", "Better quality for spaces."],
    },
    station: {
      title: "K–AI Station",
      subtitle: [
        "Not a service only for the tech-savvy —",
        "designed so anyone can experience AI directly, regardless of age, job, or interest.",
      ],
      banner: "/8.png",
      exploreBtn: "바로가기",
      exploreLink: "https://k-ai-station.vercel.app/",
      why: {
        badge: "WHY",
        heading: ["AI has come closer,", "but it hasn't gotten easier for everyone."],
        cards: [
          { title: "People don't know where to start.", desc: "First-time AI users struggle to know what to ask." },
          { title: "Skill levels vary widely.", desc: "The same AI needs different questions and explanations depending on age, job, and purpose." },
          { title: "Access needs differ too.", desc: "Text size, voice guidance, and language all require different interfaces for different users." },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["That's why K–AI Station", "adapts the AI experience to the user,", "instead of the other way around."],
        cards: [
          { title: "Ready-made questions and guides", desc: "Even first-time users can easily start asking questions." },
          { title: "Choose the experience that fits you", desc: "Select a mode suited to your age, job, and purpose." },
          { title: "An interface anyone can use", desc: "Voice guidance and multilingual support make it accessible to everyone." },
        ],
      },
      modeBadge: "MODE",
      modeHeading: ["Different AI experiences", "for different people"],
      modes: [
        { id: "senior", title: "Senior Mode", desc: "Simple and friendly. A heartwarming AI companion is waiting for your story.", link: "https://kai-station.com/senior?from=%2Fhome", image: "/11.png" },
        { id: "doran", title: "Doran-Doran AI", desc: "Start a comfortable conversation with AI in just a few taps.", link: "https://doran-two.vercel.app/", image: "/12.png" },
        { id: "kids", title: "Kids Mode", desc: "Spark curiosity! Grow imagination together with your AI friend.", link: "https://kai-station.com/kids?from=%2Fhome", image: "/13.png" },
        { id: "lab", title: "Lab Practice Mode", desc: "Run AI-based assignments and hands-on practice right in class.", link: "https://kai-station.com/?from=%2Fhome", image: "/14.png" },
        { id: "safety", title: "Safety Quality Mode", desc: "Experience AI prompts specialized for safety and quality.", link: "http://openq.co.kr:8082/", image: "/15.png" },
        { id: "ncs", title: "NCS Mode", desc: "Explore competency-based job standard guides intuitively.", link: "https://kai-station.com/categories/cmq3j1xfy003quvv6j86nh8lb?from=%2Fhome", image: "/16.png" },
      ],
    },
    midCta: {
      badge: "FROM PEOPLE TO SPACE",
      heading: ["Toward a better direction for people's experience.", "Toward a better direction for the quality of spaces."],
    },
    dsq: {
      title: "DSQ PLATFORM",
      subtitle: ["Turning scattered field safety and quality data", "into a digital environment you can measure, check, and manage."],
      banner: "/9.png",
      exploreBtn: "바로가기",
      exploreLink: "http://openq.co.kr:8082/",
      why: {
        badge: "WHY",
        heading: ["Safety in a space is hard to manage", "when it isn't visible."],
        cards: [
          { title: "Information is scattered.", desc: "Inspection results and field data are managed in inconsistent ways." },
          { title: "Current status is hard to see at a glance.", desc: "Risk changes are hard to catch before a problem occurs." },
          { title: "Records rarely lead to improvement.", desc: "Inspections often end up as one-time records." },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["That's why DSQ PLATFORM", "connects field data", "into a single flow."],
        steps: [
          { label: "SENSE", desc: "Collect field information" },
          { label: "MEASURE", desc: "Measure safety & quality status" },
          { label: "ANALYZE", desc: "Analyze status and change" },
          { label: "VISUALIZE", desc: "Visualize on a dashboard" },
          { label: "IMPROVE", desc: "Check risk and manage improvement", wide: true },
        ],
      },
      application: {
        badge: "APPLICATION",
        heading: ["Applicable to a wide range", "of everyday spaces."],
        places: [
          { title: "Multi-use Facilities", desc: "Safety quality management for shared, high-traffic spaces", image: "/17.png" },
          { title: "Traditional Markets", desc: "Identify risk factors and check status in complex environments", image: "/18.png" },
          { title: "School Zones", desc: "Ongoing management of spaces where safety matters most", image: "/19.png" },
        ],
      },
    },
    finalCta: {
      text: ["Build the next standard for AI experience", "and safety quality together with KAQ."],
      btn: "Contact Us",
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
      badge: "製品 & サービス",
      subtitle: [
        "人とAIの関係から始まり、",
        "空間の安全と品質にまで広がります。",
      ],
      bannerText: ["人にはより易しいAIを、", "空間にはより良い品質を。"],
    },
    station: {
      title: "K–AI Station",
      subtitle: ["AIに慣れた人だけのサービスではなく、", "年齢・職業・関心に関係なく誰もが直接体験できるよう設計しています。"],
      banner: "/8.png",
      exploreBtn: "바로가기",
      exploreLink: "https://k-ai-station.vercel.app/",
      why: {
        badge: "WHY",
        heading: ["AIは身近になりましたが、", "誰にとっても簡単になったわけではありません。"],
        cards: [
          { title: "始め方が分かりません。", desc: "AI를 처음 사용하는 사람은 무엇부터 질문해야 할지 모릅니다." },
          { title: "活用レベルが異なります。", desc: "同じAIでも年齢・職業・目的によって必要な質問や説明方法が異なります。" },
          { title: "アプローチも変える必要があります。", desc: "文字サイズ、音声案内、言語など利用環境に応じたインターフェースが必要です。" },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["だからK–AI Stationは", "ユーザーがAIに合わせるのではなく、", "AI体験をユーザーに合わせます。"],
        cards: [
          { title: "用意された質問とガイド探索", desc: "初めての人でも簡単に質問を始められます。" },
          { title: "自分に合った体験の選択", desc: "年齢・職業・目的に合ったモードを選べます。" },
          { title: "誰もが使えるインターフェース", desc: "音声案内、多言語対応など誰もが使える環境を提供します。" },
        ],
      },
      modeBadge: "MODE",
      modeHeading: ["異なる人には", "異なるAI体験を"],
      modes: [
        { id: "senior", title: "シニアモード", desc: "難しくありません。親しみやすいAIがあなたのお話を待っています。", link: "https://kai-station.com/senior?from=%2Fhome", image: "/11.png" },
        { id: "doran", title: "ドランドランAI", desc: "数回の選択だけでAIと気軽に会話を始められます。", link: "https://doran-two.vercel.app/", image: "/12.png" },
        { id: "kids", title: "キッズモード", desc: "好奇心いっぱい！AIの友達と一緒に想像力を育みましょう。", link: "https://kai-station.com/kids?from=%2Fhome", image: "/13.png" },
        { id: "lab", title: "실습 모드", desc: "AIを活用した課題や実習を授業内で行えます。", link: "https://kai-station.com/?from=%2Fhome", image: "/14.png" },
        { id: "safety", title: "安全品質モード", desc: "安全・品質分野に特化したAIプロンプトを体験できます。", link: "http://openq.co.kr:8082/", image: "/15.png" },
        { id: "ncs", title: "NCSモード", desc: "職務標準ガイドを直感的に探索できます。", link: "https://kai-station.com/categories/cmq3j1xfy003quvv6j86nh8lb?from=%2Fhome", image: "/16.png" },
      ],
    },
    midCta: {
      badge: "FROM PEOPLE TO SPACE",
      heading: ["人の体験をより良い方向へ。", "空間の品質もより良い方向へ。"],
    },
    dsq: {
      title: "DSQ PLATFORM",
      subtitle: ["現場に散在する安全・品質情報を", "測定・確認・管理できるデジタル環境へ転換します。"],
      banner: "/9.png",
      exploreBtn: "바로가기",
      exploreLink: "http://openq.co.kr:8082/",
      why: {
        badge: "WHY",
        heading: ["空間の安全は目に見えないとき", "管理が難しくなります。"],
        cards: [
          { title: "情報が分散しています。", desc: "点検結果と現場데이터가 서로 다른 방식으로 관리됩니다." },
          { title: "現在の状態を一目で把握しづらいです。", desc: "問題が発生する前にリスクの変化を把握しにくいです。" },
          { title: "記録が改善につながりにくいです。", desc: "点検が一回限りの記録で終わることがあります。" },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["だからDSQ PLATFORMは", "現場のデータを", "一つの流れでつなぎます。"],
        steps: [
          { label: "SENSE", desc: "現場情報の収集" },
          { label: "MEASURE", desc: "安全・品質状態の測定" },
          { label: "ANALYZE", desc: "状態と変化の分析" },
          { label: "VISUALIZE", desc: "대시보드 시각화" },
          { label: "IMPROVE", desc: "위험 확인과 개선 관리", wide: true },
        ],
      },
      application: {
        badge: "APPLICATION",
        heading: ["さまざまな生活空間に", "適用できます。"],
        places: [
          { title: "多目的施設", desc: "多くの利用者が共有する空間の安全品質管理", image: "/17.png" },
          { title: "伝統市場", desc: "複雑な環境のリスク要因と管理状態の確認", image: "/18.png" },
          { title: "スクールゾーン", desc: "生活安全が重要な空間の継続的な管理", image: "/19.png" },
        ],
      },
    },
    finalCta: {
      text: ["KAQとともに新しいAI体験と", "安全品質の基準を作りましょう。"],
      btn: "お問い合わせ",
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
      badge: "ผลิตภัณฑ์และบริการ",
      subtitle: [
        "เริ่มต้นจากความสัมพันธ์ระหว่างมนุษย์กับ AI",
        "และขยายไปสู่ความปลอดภัยและคุณภาพของพื้นที่",
      ],
      bannerText: ["AI ที่ใช้งานง่ายขึ้นสำหรับผู้คน,", "คุณภาพที่ดีขึ้นสำหรับพื้นที่"],
    },
    station: {
      title: "K–AI Station",
      subtitle: ["ไม่ใช่บริการสำหรับผู้ที่คุ้นเคยกับ AI เท่านั้น", "ออกแบบมาให้ทุกคนสัมผัสประสบการณ์ AI ได้โดยตรง ไม่ว่าอายุ อาชีพ หรือความสนใจใด"],
      banner: "/8.png",
      exploreBtn: "바로가기",
      exploreLink: "https://k-ai-station.vercel.app/",
      why: {
        badge: "WHY",
        heading: ["AI เข้าใกล้เรามากขึ้น", "แต่ยังไม่ง่ายสำหรับทุกคน"],
        cards: [
          { title: "ไม่รู้จะเริ่มต้นอย่างไร", desc: "ผู้ใช้ AI ครั้งแรกไม่รู้ว่าควรถามอะไรก่อน" },
          { title: "ระดับการใช้งานต่างกัน", desc: "AI แบบเดียวกันต้องการคำถามและวิธีอธิบายต่างกันตามอายุ อาชีพ และวัตถุประสงค์" },
          { title: "วิธีการเข้าถึงก็ต้องต่างกัน", desc: "ขนาดตัวอักษร เสียงนำทาง และภาษา ต้องมีอินเทอร์เฟซที่เหมาะกับผู้ใช้แต่ละคน" },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["ดังนั้น K–AI Station", "จึงปรับประสบการณ์ AI ให้เข้ากับผู้ใช้", "แทนที่จะให้ผู้ใช้ปรับตัวเข้าหา AI"],
        cards: [
          { title: "คำถามและคู่มือที่พร้อมใช้งาน", desc: "แม้ผู้ใช้ครั้งแรกก็เริ่มถามคำถามได้ง่าย" },
          { title: "เลือกประสบการณ์ที่เหมาะกับคุณ", desc: "เลือกโหมดที่เหมาะกับอายุ อาชีพ และวัตถุประสงค์" },
          { title: "อินเทอร์เฟซที่ทุกคนใช้ได้", desc: "รองรับเสียงนำทางและหลายภาษาเพื่อให้ทุกคนใช้งานได้" },
        ],
      },
      modeBadge: "MODE",
      modeHeading: ["ประสบการณ์ AI ที่แตกต่าง", "สำหรับผู้คนที่แตกต่าง"],
      modes: [
        { id: "senior", title: "โหมดผู้สูงอายุ", desc: "ใช้งานง่ายและเป็นมิตร AI ผู้แสนอบอุ่นพร้อมรับฟังเรื่องราวของคุณเสมอ", link: "https://kai-station.com/senior?from=%2Fhome", image: "/11.png" },
        { id: "doran", title: "Doran-Doran AI", desc: "เริ่มบทสนทนากับ AI ได้ง่ายๆ เพียงไม่กี่ขั้นตอน", link: "https://doran-two.vercel.app/", image: "/12.png" },
        { id: "kids", title: "โหมดเด็ก", desc: "เต็มไปด้วยความอยากรู้อยากเห็น! เสริมสร้างจินตนาการไปกับเพื่อน AI", link: "https://kai-station.com/kids?from=%2Fhome", image: "/13.png" },
        { id: "lab", title: "โหมดฝึกปฏิบัติ", desc: "ทำกิจกรรมและฝึกปฏิบัติโดยใช้ AI ได้ในชั้นเรียน", link: "https://kai-station.com/?from=%2Fhome", image: "/14.png" },
        { id: "safety", title: "โหมดคุณภาพความปลอดภัย", desc: "สัมผัสประสบการณ์ AI Prompt เฉพาะทางด้านความปลอดภัยและคุณภาพ", link: "http://openq.co.kr:8082/", image: "/15.png" },
        { id: "ncs", title: "โหมด NCS", desc: "สำรวจคู่มือมาตรฐานอาชีพตามสมรรถนะได้อย่างตรงจุด", link: "https://kai-station.com/categories/cmq3j1xfy003quvv6j86nh8lb?from=%2Fhome", image: "/16.png" },
      ],
    },
    midCta: {
      badge: "FROM PEOPLE TO SPACE",
      heading: ["สู่ทิศทางที่ดีขึ้นสำหรับประสบการณ์ของผู้คน", "สู่ทิศทางที่ดีขึ้นสำหรับคุณภาพของพื้นที่"],
    },
    dsq: {
      title: "DSQ PLATFORM",
      subtitle: ["เปลี่ยนข้อมูลความปลอดภัยและคุณภาพที่กระจัดกระจายในพื้นที่", "ให้เป็นสภาพแวดล้อมดิจิทัลที่วัดผล ตรวจสอบ และจัดการได้"],
      banner: "/9.png",
      exploreBtn: "바로가기",
      exploreLink: "http://openq.co.kr:8082/",
      why: {
        badge: "WHY",
        heading: ["ความปลอดภัยของพื้นที่จัดการได้ยาก", "เมื่อมองไม่เห็นด้วยตาเปล่า"],
        cards: [
          { title: "ข้อมูลกระจัดกระจาย", desc: "ผลตรวจสอบและข้อมูลภาคสนามถูกจัดการต่างวิธีกัน" },
          { title: "มองเห็นสถานะปัจจุบันได้ยาก", desc: "ยากที่จะรู้ทันความเสี่ยงก่อนเกิดปัญหา" },
          { title: "บันทึกไม่นำไปสู่การปรับปรุง", desc: "การตรวจสอบมักจบลงแค่การบันทึกเพียงครั้งเดียว" },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["ดังนั้น DSQ PLATFORM", "จึงเชื่อมข้อมูลภาคสนาม", "เข้าเป็นกระบวนการเดียว"],
        steps: [
          { label: "SENSE", desc: "เก็บข้อมูลภาคสนาม" },
          { label: "MEASURE", desc: "วัดสถานะความปลอดภัย/คุณภาพ" },
          { label: "ANALYZE", desc: "วิเคราะห์สถานะและการเปลี่ยนแปลง" },
          { label: "VISUALIZE", desc: "แสดงผลบนแดชบอร์ด" },
          { label: "IMPROVE", desc: "ตรวจสอบความเสี่ยงและจัดการปรับปรุง", wide: true },
        ],
      },
      application: {
        badge: "APPLICATION",
        heading: ["ใช้งานได้กับพื้นที่ในชีวิตประจำวัน", "ที่หลากหลาย"],
        places: [
          { title: "สถานที่สาธารณะ", desc: "จัดการคุณภาพความปลอดภัยของพื้นที่ที่มีผู้ใช้งานร่วมกันจำนวนมาก", image: "/17.png" },
          { title: "ตลาดชุมชน", desc: "ตรวจสอบปัจจัยเสี่ยงและสถานะการจัดการในสภาพแวดล้อมที่ซับซ้อน", image: "/18.png" },
          { title: "เขตโรงเรียน", desc: "การจัดการอย่างต่อเนื่องในพื้นที่ที่ความปลอดภัยในชีวิตสำคัญที่สุด", image: "/19.png" },
        ],
      },
    },
    finalCta: {
      text: ["สร้างมาตรฐานใหม่ของประสบการณ์ AI", "และคุณภาพความปลอดภัยไปด้วยกันกับ KAQ"],
      btn: "ติดต่อเรา",
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

/* ============================================================
   마스크 버그가 없는 순수 Path 기반 DSQ HOW 44x44 SVG 아이콘
   ============================================================ */
const DSQ_STEP_ICONS = {
  sense: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="white">
      <path d="M11.2118 41.25H6.06421C5.13807 41.25 4.35417 40.9292 3.7125 40.2875C3.07083 39.6458 2.75 38.8619 2.75 37.9358V32.7883H5.5V37.9358C5.5 38.1005 5.55286 38.2357 5.65858 38.3414C5.76431 38.4471 5.89951 38.5 6.06421 38.5H11.2118V41.25ZM32.7883 41.25V38.5H37.9358C38.1005 38.5 38.2357 38.4471 38.3414 38.3414C38.4471 38.2357 38.5 38.1005 38.5 37.9358V32.7883H41.25V37.9358C41.25 38.8619 40.9292 39.6458 40.2875 40.2875C39.6458 40.9292 38.8619 41.25 37.9358 41.25H32.7883ZM22 33.2113C18.5332 33.2113 15.4041 32.206 12.6129 30.1955C9.82193 28.1846 7.75072 25.4528 6.39925 22C7.75072 18.5472 9.82193 15.8154 12.6129 13.8045C15.4041 11.794 18.5332 10.7887 22 10.7887C25.4668 10.7887 28.5959 11.794 31.3871 13.8045C34.1781 15.8154 36.2493 18.5472 37.6007 22C36.2493 25.4528 34.1781 28.1846 31.3871 30.1955C28.5959 32.206 25.4668 33.2113 22 33.2113ZM22 27.835C23.6194 27.835 24.9967 27.2673 26.1319 26.1319C27.2673 24.9967 27.835 23.6194 27.835 22C27.835 20.3806 27.2673 19.0033 26.1319 17.8681C24.9967 16.7327 23.6194 16.165 22 16.165C20.3806 16.165 19.0033 16.7327 17.8681 17.8681C16.7327 19.0033 16.165 20.3806 16.165 22C16.165 23.6194 16.7327 24.9967 17.8681 26.1319C19.0033 27.2673 20.3806 27.835 22 27.835ZM22 25.085C21.142 25.085 20.4134 24.7853 19.8142 24.1858C19.2147 23.5866 18.915 22.858 18.915 22C18.915 21.142 19.2147 20.4134 19.8142 19.8142C20.4134 19.2147 21.142 18.915 22 18.915C22.858 18.915 23.5866 19.2147 24.1858 19.8142C24.7853 20.4134 25.085 21.142 25.085 22C25.085 22.858 24.7853 23.5866 24.1858 24.1858C23.5866 24.7853 22.858 25.085 22 25.085ZM2.75 11.2118V6.06421C2.75 5.13807 3.07083 4.35417 3.7125 3.7125C4.35417 3.07083 5.13807 2.75 6.06421 2.75H11.2118V5.5H6.06421C5.89951 5.5 5.76431 5.55286 5.65858 5.65858C5.55286 5.76431 5.5 5.89951 5.5 6.06421V11.2118H2.75ZM38.5 11.2118V6.06421C38.5 5.89951 38.4471 5.76431 38.3414 5.65858C38.2357 5.55286 38.1005 5.5 37.9358 5.5H32.7883V2.75H37.9358C38.8619 2.75 39.6458 3.07083 40.2875 3.7125C40.9292 4.35417 41.25 5.13807 41.25 6.06421V11.2118H38.5Z" />
    </svg>
  ),
  measure: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="white">
      <path d="M9.73096 37.5832C8.80482 37.5832 8.02091 37.2623 7.37925 36.6207C6.73758 35.979 6.41675 35.1951 6.41675 34.269V9.73071C6.41675 8.80457 6.73758 8.02067 7.37925 7.379C8.02091 6.73734 8.80482 6.4165 9.73096 6.4165H34.2692C35.1953 6.4165 35.9792 6.73734 36.6209 7.379C37.2626 8.02067 37.5834 8.80457 37.5834 9.73071V24.006L31.7204 29.869L27.9126 26.0616L20.2621 33.6663L24.179 37.5832H9.73096ZM20.3432 23.3748H30.779V20.6248H20.3432V23.3748ZM20.3432 16.2528H30.779V13.5033H20.3432V16.2528ZM31.7204 39.4165L25.9523 33.6663L27.9126 31.7344L31.7204 35.5418L39.3356 27.9265L41.2675 29.8868L31.7204 39.4165ZM15.929 23.1562C16.2391 22.8461 16.3942 22.4606 16.3942 21.9998C16.3942 21.5391 16.2391 21.1536 15.929 20.8435C15.6186 20.5333 15.2331 20.3783 14.7726 20.3783C14.3118 20.3783 13.9264 20.5333 13.6162 20.8435C13.3058 21.1536 13.1506 21.5391 13.1506 21.9998C13.1506 22.4606 13.3058 22.8461 13.6162 23.1562C13.9264 23.4664 14.3118 23.6214 14.7726 23.6214C15.2331 23.6214 15.6186 23.4664 15.929 23.1562ZM15.929 16.0346C16.2391 15.7242 16.3942 15.3387 16.3942 14.8783C16.3942 14.4175 16.2391 14.032 15.929 13.7219C15.6186 13.4114 15.2331 13.2562 14.7726 13.2562C14.3118 13.2562 13.9264 13.4114 13.6162 13.7219C13.3058 14.032 13.1506 14.4175 13.1506 14.8783C13.1506 15.3387 13.3058 15.7242 13.6162 16.0346C13.9264 16.3448 14.3118 16.4998 14.7726 16.4998C15.2331 16.4998 15.6186 16.3448 15.929 16.0346Z" />
    </svg>
  ),
  analyze: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="white">
      <path d="M13.5035 30.7082H16.253V18.7915H13.5035V30.7082ZM20.6251 30.7082H23.3751V13.2915H20.6251V30.7082ZM27.7471 30.7082H30.4967V24.2915H27.7471V30.7082ZM9.73096 37.5832C8.80482 37.5832 8.02091 37.2623 7.37925 36.6207C6.73758 35.979 6.41675 35.1951 6.41675 34.269V9.73071C6.41675 8.80457 6.73758 8.02067 7.37925 7.379C8.02091 6.73734 8.80482 6.4165 9.73096 6.4165H34.2692C35.1953 6.4165 35.9792 6.73734 36.6209 7.379C37.2626 8.02067 37.5834 8.80457 37.5834 9.73071V34.269C37.5834 35.1951 37.2626 35.979 36.6209 36.6207C35.9792 37.2623 35.1953 37.5832 34.2692 37.5832H9.73096Z" />
    </svg>
  ),
  visualize: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="white">
      <path d="M27.6764 35.75V24.0098H39.4166V35.75H27.6764ZM20.343 19.9902V8.25H39.4166V19.9902H20.343ZM4.58325 35.75V24.0098H23.6568V35.75H4.58325ZM4.58325 19.9902V8.25H16.3235V19.9902H4.58325Z" />
    </svg>
  ),
  improve: (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="white">
      <path d="M13.5667 28.681L19.1584 23.1067L22.8251 26.7734L29.7917 19.8351V23.3748H32.5417V15.1248H24.2917V17.8748H27.8315L22.8251 22.8812L19.1584 19.2145L11.6523 26.7665L13.5667 28.681ZM9.73096 37.5832C8.80482 37.5832 8.02091 37.2623 7.37925 36.6207C6.73758 35.979 6.41675 35.1951 6.41675 34.269V9.73071C6.41675 8.80457 6.73758 8.02067 7.37925 7.379C8.02091 6.73734 8.80482 6.4165 9.73096 6.4165H34.2692C35.1953 6.4165 35.9792 6.73734 36.6209 7.379C37.2626 8.02067 37.5834 8.80457 37.5834 9.73071V34.269C37.5834 35.1951 37.2626 35.979 36.6209 36.6207C35.9792 37.2623 35.1953 37.5832 34.2692 37.5832H9.73096Z" />
    </svg>
  ),
};

function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("psVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/* ============================================================
   K-AI STATION WHY / HOW 공통 블록 컴포넌트
   ============================================================ */
function WhyHowSection({ data, type = "why" }) {
  const isWhy = type === "why";
  const blockData = isWhy ? data.why : data.how;

  return (
    <div className="psWhyGrid" data-reveal="up">
      <div className="psWhyLeft">
        <span className="psWhyBadge">{blockData.badge}</span>
        <h2 className="psWhyHeading">
          {blockData.heading.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < blockData.heading.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="psWhyRightCards">
        {blockData.cards.map((card, idx) => (
          <div
            className={`psWhyCard ${!isWhy ? `psHowCardBg-${idx}` : ""}`}
            key={idx}
          >
            <div className={`psNumBadge ${!isWhy ? "psNumBadge--white" : ""}`}>
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div className="psWhyCardText">
              <h4 className="psWhyCardTitle">{card.title}</h4>
              <p className="psWhyCardDesc">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MODE 그리드 컴포넌트 (1276 x 762)
   ============================================================ */
function ModeGrid({ data }) {
  return (
    <div className="psModeSection" data-reveal="up">
      <div className="psModeHeader">
        <span className="psModeBadge">{data.modeBadge}</span>
        <h2 className="psModeHeading">
          {data.modeHeading.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < data.modeHeading.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="psModeGrid">
        {data.modes.map((mode) => (
          <a
            href={mode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="psModeCard"
            key={mode.id}
            style={{ 
              backgroundImage: `url(${mode.image})`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <div 
              className="psModeCardBottomRow"
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "16px"
              }}
            >
              <div className="psModeCardText" style={{ flex: 1 }}>
                <h5 className="psModeCardTitle">{mode.title}</h5>
                <p 
                  className="psModeCardDesc"
                  style={{
                    fontWeight: 400,
                    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
                    fontSize: "18px",
                    lineHeight: "1.5",
                    color: "rgba(255, 255, 255, 0.88)",
                    margin: 0
                  }}
                >
                  {mode.desc}
                </p>
              </div>

              <span className="psModeArrowBtn">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M7.98489 21.2266L6.7666 20.0083L18.2472 8.5166H7.80989V6.7666H21.2266V20.1833H19.4766V9.74598L7.98489 21.2266Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   DSQ WHY 전용 컴포넌트 (피그마 1276 x 526)
   ============================================================ */
function DsqWhyBlock({ data }) {
  return (
    <div className="psDsqWhyGrid" data-reveal="up">
      <div className="psDsqWhyLeft">
        <span className="psDsqWhyBadge">{data.why.badge}</span>
        <h2 className="psDsqWhyHeading">
          {data.why.heading.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < data.why.heading.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="psDsqWhyRightCards">
        {data.why.cards.map((card, idx) => (
          <div className="psDsqWhyCard" key={idx}>
            <div className="psDsqNumBadge">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div className="psDsqWhyCardText">
              <h4 className="psDsqWhyCardTitle">{card.title}</h4>
              <p className="psDsqWhyCardDesc">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   DSQ HOW 전용 컴포넌트 (피그마 1276 x 760 규격 일치)
   ============================================================ */
function DsqHowBlock({ data }) {
  const steps = data.how.steps;
  const topFour = steps.slice(0, 4);
  const wideStep = steps[4];

  return (
    <div className="psDsqHowGrid" data-reveal="up">
      <div className="psDsqHowLeft">
        <span className="psDsqHowBadge">{data.how.badge}</span>
        <h2 className="psDsqHowHeading">
          {data.how.heading.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < data.how.heading.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="psDsqHowRightCards">
        <div className="psDsqStepRow4">
          {topFour.map((step, idx) => {
            const iconKey = step.label.toLowerCase();
            return (
              <div className="psDsqStepBox" key={idx}>
                <div className="psDsqStepIconTop">
                  {DSQ_STEP_ICONS[iconKey]}
                </div>
                <div className="psDsqStepBoxBottom">
                  <div className="psDsqNumBadge">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="psDsqStepBoxText">
                    <h5 className="psDsqStepLabel">{step.label}</h5>
                    <p className="psDsqStepDesc">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {wideStep && (
          <div className="psDsqWideBox">
            <div className="psDsqStepIconTop">
              {DSQ_STEP_ICONS.improve}
            </div>
            <div className="psDsqStepBoxBottom">
              <div className="psDsqNumBadge">05</div>
              <div className="psDsqStepBoxText">
                <h5 className="psDsqStepLabel">{wideStep.label}</h5>
                <p className="psDsqStepDesc">{wideStep.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   DSQ APPLICATION 전용 컴포넌트 (1276 x 662 Hug)
   ============================================================ */
function DsqApplicationBlock({ data }) {
  return (
    <div className="psDsqAppSection" data-reveal="up">
      <div className="psDsqAppHeader">
        <span className="psDsqAppBadge">{data.application.badge}</span>
        <h2 className="psDsqAppHeading">
          {data.application.heading.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < data.application.heading.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="psDsqAppCards">
        {data.application.places.map((place, idx) => (
          <div
            className="psDsqAppCard"
            key={idx}
            style={{ backgroundImage: `url(${place.image})` }}
          >
            <div className="psDsqAppCardText">
              <h5 className="psDsqAppCardTitle">{place.title}</h5>
              <p className="psDsqAppCardDesc">{place.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   메인 페이지 컴포넌트
   ============================================================ */
export default function ProductsPage({ onOpenContact }) {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;
  const containerRef = useScrollReveal();

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
    <div ref={containerRef}>
      <style>{`
        .psPage {
          width: 100%;
          background-color: #ffffff;
          box-sizing: border-box;
          overflow-x: hidden;
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        }

        .psInner {
          width: 100%;
          max-width: 1276px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* --- 공통 스크롤 리빌 --- */
        [data-reveal] {
          opacity: 0;
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal="up"] { transform: translateY(32px); }
        [data-reveal="right"] { transform: translateX(36px); }
        [data-reveal].psVisible { opacity: 1; transform: translate(0, 0); }

        /* ==========================================================
           1. 히어로 영역 (애니메이션 제거)
           ========================================================== */
        .psHeroHeader {
          width: 100%;
          padding: 140px 0 60px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }

        .psHeroIntro {
          width: 100%;
          max-width: 1276px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          box-sizing: border-box;
        }

        .psHeroBadge {
          display: block;
          font-family: inherit;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #2167FD;
          text-align: center;
          margin: 0 0 24px 0;
        }

        .psHeroTitle {
          font-family: inherit;
          font-size: 60px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #000000;
          margin: 0;
          text-align: left;
          word-break: keep-all;
        }

        .psHeroBanner {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: 480px;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 10px;
          text-align: center;
          overflow: hidden;
        }
        .psHeroBanner::after {
          content: "";
          position: absolute;
          inset: 0;
          background: #2167FD;
          mix-blend-mode: multiply;
          opacity: 0.2;
          pointer-events: none;
        }

        .psHeroBannerText {
          position: relative;
          z-index: 1;
          font-family: inherit;
          font-size: 48px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0;
          text-align: center;
          word-break: keep-all;
        }

        /* ==========================================================
           2. 제품 상세 섹션 컨테이너
           ========================================================== */
        .psProductSection {
          width: 100%;
          padding: 120px 0;
          display: flex;
          flex-direction: column;
          gap: 40px !important; /* 기존 80px에서 40px로 수정하여 이미지와의 간격 맞추기 */
          box-sizing: border-box;
        }

        .psProductHead {
          width: 100%;
          max-width: 1276px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end !important; /* 핵심: 버튼과 텍스트가 아래쪽(bottom)으로 나란히 정렬되도록 함 */
          gap: 28px;
          background: #ffffff;
          border-radius: 24px;
          box-sizing: border-box;
        }

        .psProductHeadText {
          width: 1121px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .psProductTitle {
          font-family: inherit;
          font-size: 48px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #111625;
          margin: 0;
        }

        .psProductSub {
          font-family: inherit;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0;
          color: #666666;
          margin: 0;
          word-break: keep-all;
        }

        .psExploreBtn {
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
          background: #111111;
          color: #ffffff;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background-color 0.25s ease, transform 0.25s ease;
        }

        .psExploreBtn:hover {
          background: #0052ff;
          transform: translateY(-2px);
        }

        .psExploreBtnText {
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

        .psExploreBtnArrow {
          width: 24px;
          height: 24px;
          display: block;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .psExploreBtn:hover .psExploreBtnArrow {
          transform: translateX(3px);
        }

        .psProductBanner {
          width: 100%;
          max-width: 1276px;
          height: 480px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.15);
        }

        .psProductBanner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .psSubDivider {
          width: 100%;
          max-width: 1276px;
          height: 1px;
          border: none;
          background-color: #E1E5EE;
          margin: 0;
          opacity: 1;
        }

        /* ==========================================================
           3. K-AI STATION WHY / HOW (피그마 628 x 162 세로 정렬)
           ========================================================== */
        .psWhyGrid {
          width: 100%;
          max-width: 1276px;
          height: 526px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          border-radius: 24px;
          align-items: stretch;
          box-sizing: border-box;
        }

        .psWhyLeft {
          width: 100%;
          max-width: 628px;
          height: 526px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 16px;
          box-sizing: border-box;
        }

        .psWhyBadge {
          font-family: inherit;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #0052ff;
          text-transform: uppercase;
        }

        .psWhyHeading {
          font-family: inherit;
          font-size: 40px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        .psWhyRightCards {
          width: 100%;
          max-width: 628px;
          height: 526px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
        }

        .psWhyCard {
          width: 100%;
          max-width: 628px;
          height: 162px;
          background: #f8fafc;
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 12px;
          box-sizing: border-box;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
        }

        .psHowCardBg-0 { background: #4936ED !important; color: #ffffff !important; }
        .psHowCardBg-1 { background: #2167FD !important; color: #ffffff !important; }
        .psHowCardBg-2 { background: #00A1F1 !important; color: #ffffff !important; }

        .psHowCardBg-0 .psWhyCardTitle,
        .psHowCardBg-1 .psWhyCardTitle,
        .psHowCardBg-2 .psWhyCardTitle { color: #ffffff !important; }

        .psHowCardBg-0 .psWhyCardDesc,
        .psHowCardBg-1 .psWhyCardDesc,
        .psHowCardBg-2 .psWhyCardDesc { color: rgba(255, 255, 255, 0.88) !important; }

        /* ==========================================================
           피그마 32 x 32 정밀 넘버 배지 (완전 중앙 정렬 & 16px Bold 통일)
           ========================================================== */
        .psNumBadge,
        .psDsqNumBadge {
          width: 32px !important;
          height: 32px !important;
          border-radius: 50% !important;
          
          /* line-height를 박스 높이와 1:1로 주면 수직 중심이 정확히 잡힙니다 */
          display: block !important;
          line-height: 32px !important;
          text-align: center !important;
          
          font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          letter-spacing: 0 !important;
          
          padding: 0 !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          flex-shrink: 0 !important;
          -webkit-font-smoothing: antialiased !important;
        }

        /* K-AI WHY 배지: 배경 #111625 / 글자 #ffffff */
        .psWhyCard .psNumBadge {
          background-color: #111625 !important;
          color: #ffffff !important;
        }

        /* K-AI HOW 배지: 배경 #ffffff / 글자 각 카드 테마색 */
        .psHowCardBg-0 .psNumBadge--white {
          background-color: #ffffff !important;
          color: #4936ED !important;
        }
        .psHowCardBg-1 .psNumBadge--white {
          background-color: #ffffff !important;
          color: #2167FD !important;
        }
        .psHowCardBg-2 .psNumBadge--white {
          background-color: #ffffff !important;
          color: #00A1F1 !important;
        }

        /* DSQ WHY 배지: 배경 #333C4E / 글자 #ffffff */
        .psDsqWhyCard .psDsqNumBadge {
          background-color: #333C4E !important;
          color: #ffffff !important;
        }

        /* DSQ HOW 01~04 상단 카드 배지: 배경 #ffffff / 글자 #333C4E */
        .psDsqStepBox .psDsqNumBadge {
          background-color: #ffffff !important;
          color: #333C4E !important;
        }

        /* DSQ HOW 05 와이드 카드 배지: 배경 #ffffff / 글자 #2167FD */
        .psDsqWideBox .psDsqNumBadge {
          background-color: #ffffff !important;
          color: #2167FD !important;
        }

        .psNumBadge--white {
          background: #ffffff !important;
          color: #111625 !important;
        }

        .psWhyCardText {
          width: 572px;
          height: 62px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 4px;
        }

        .psWhyCardTitle {
          font-family: inherit;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0;
          color: #111625;
          margin: 0;
          text-align: left;
          word-break: keep-all;
        }

        .psWhyCardDesc {
          font-family: inherit;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0;
          color: #6b7280;
          margin: 0;
          word-break: keep-all;
        }

        /* ==========================================================
           4. MODE 그리드 (1276 x 762)
           ========================================================== */
        .psModeSection {
          width: 100%;
          max-width: 1276px;
          height: 762px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          border-radius: 24px;
          box-sizing: border-box;
        }

        .psModeHeader {
          width: 100%;
          height: 142px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .psModeBadge {
          font-family: inherit;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #0052ff;
          text-transform: uppercase;
        }

        .psModeHeading {
          font-family: inherit;
          font-size: 40px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        .psModeGrid {
          width: 100%;
          height: 580px;
          display: grid;
          grid-template-columns: repeat(3, 412px);
          justify-content: space-between;
          gap: 20px;
        }

        .psModeCard {
          position: relative;
          width: 412px;
          height: 280px;
          border-radius: 20px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          box-sizing: border-box;
          box-shadow: 0 16px 34px -18px rgba(15, 23, 42, 0.2);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .psModeCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -15px rgba(0, 82, 255, 0.25);
        }

        .psModeCard::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%);
          pointer-events: none;
        }

        .psModeCardBottomRow {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
        }

        .psModeCardText {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .psModeCardTitle {
          font-family: inherit;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }

        .psModeCardDesc {
          font-family: inherit !important;
          font-size: 18px !important;
          font-weight: 400 !important;
          line-height: 1.5 !important;
          letter-spacing: 0 !important;
          color: rgba(255, 255, 255, 0.88) !important;
          margin: 0 !important;
          word-break: keep-all !important;
          -webkit-font-smoothing: antialiased !important;
        }

        .psModeArrowBtn {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 99px;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .psModeCard:hover .psModeArrowBtn {
          transform: scale(1.08);
          background-color: rgba(255, 255, 255, 0.35);
        }

        .psModeArrowBtn svg {
          width: 28px;
          height: 28px;
          display: block;
        }

        /* ==========================================================
           5. 중간 CTA 배너 (1600 x 480)
           ========================================================== */
        .psFullBleedCta {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: 480px;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 162px;
          box-sizing: border-box;
          gap: 40px;
          text-align: center;
        }

        .psFullBleedCtaInner {
          width: 100%;
          max-width: 1276px;
          height: 184px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          box-sizing: border-box;
        }

        .psFullBleedCtaBadge {
          width: 236px;
          height: 40px;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 12px;
          border-radius: 99px;
          border: 1px solid #ffffff;
          color: #ffffff;
          font-family: inherit;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          text-align: center;
          white-space: nowrap;
        }

        .psFullBleedCtaHeading {
          font-family: inherit;
          font-size: 48px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #ffffff;
          margin: 0;
          text-align: center;
          word-break: keep-all;
        }

        /* ==========================================================
           6. DSQ WHY 전용 스타일 (피그마 1276 x 526, 세로 컬럼 일치)
           ========================================================== */
        .psDsqWhyGrid {
          width: 100%;
          max-width: 1276px;
          height: 526px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          border-radius: 24px;
          align-items: stretch;
          box-sizing: border-box;
        }

        .psDsqWhyLeft {
          width: 100%;
          max-width: 628px;
          height: 142px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 12px;
          box-sizing: border-box;
        }

        .psDsqWhyBadge {
          font-family: inherit;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #0052ff;
          text-transform: uppercase;
        }

        .psDsqWhyHeading {
          font-family: inherit;
          font-size: 40px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        .psDsqWhyRightCards {
          width: 100%;
          max-width: 628px;
          height: 526px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
        }

        .psDsqWhyCard {
          width: 100%;
          max-width: 628px;
          height: 162px;
          background-color: #F2F5FD;
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 12px;
          box-sizing: border-box;
        }

        .psDsqWhyCardText {
          width: 572px;
          height: 62px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 4px;
        }

        .psDsqWhyCardTitle {
          font-family: inherit;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0;
          color: #111625;
          margin: 0;
          text-align: left;
          word-break: keep-all;
        }

        .psDsqWhyCardDesc {
          font-family: inherit;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: 0;
          color: #626772;
          margin: 0;
          word-break: keep-all;
        }

        /* ==========================================================
           7. DSQ HOW 전용 스타일 (피그마 1276 x 760, 카드 수치 정밀 고정)
           ========================================================== */
        .psDsqHowGrid {
          width: 100% !important;
          max-width: 1276px !important;
          height: 760px !important;
          display: grid !important;
          grid-template-columns: 628px 628px !important;
          justify-content: space-between !important;
          gap: 20px !important;
          box-sizing: border-box !important;
          margin: 0 auto !important;
        }

        .psDsqHowLeft {
          width: 628px !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
          align-items: flex-start !important;
          gap: 12px !important;
          box-sizing: border-box !important;
        }

        .psDsqHowBadge {
          font-family: inherit !important;
          font-size: 20px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          color: #0052ff !important;
          text-transform: uppercase !important;
        }

        .psDsqHowHeading {
          font-family: inherit !important;
          font-size: 40px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          color: #111625 !important;
          margin: 0 !important;
          text-align: left !important;
          word-break: keep-all !important;
        }

        .psDsqHowRightCards {
          width: 628px !important;
          height: 500px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
          box-sizing: border-box !important;
        }

        .psDsqStepRow4 {
          width: 628px !important;
          display: grid !important;
          grid-template-columns: 304px 304px !important;
          gap: 20px !important;
          box-sizing: border-box !important;
        }

        .psDsqStepBox {
          width: 100% !important;
          height: 240px !important;
          background-color: #333C4E !important;
          border-radius: 20px !important;
          padding: 28px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
          box-sizing: border-box !important;
        }

        .psDsqWideBox {
          width: 628px !important;
          height: 240px !important;
          background-color: #2167FD !important;
          border-radius: 20px !important;
          padding: 28px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          align-items: flex-start !important;
          box-sizing: border-box !important;
        }

        .psDsqStepIconTop {
          align-self: flex-end !important;
          width: 44px !important;
          height: 44px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          flex-shrink: 0 !important;
        }

        .psDsqStepIconTop svg {
          width: 44px !important;
          height: 44px !important;
          display: block !important;
        }

        .psDsqStepBoxBottom {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 12px !important;
        }

        .psDsqStepBoxText {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 4px !important;
        }

        .psDsqStepLabel {
          font-family: inherit !important;
          font-size: 24px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          color: #ffffff !important;
          margin: 0 !important;
          text-align: left !important;
        }

        .psDsqStepDesc {
          font-family: inherit !important;
          font-size: 18px !important;
          font-weight: 400 !important;
          line-height: 1.5 !important;
          letter-spacing: 0 !important;
          color: rgba(255, 255, 255, 0.88) !important;
          margin: 0 !important;
          text-align: left !important;
          word-break: keep-all !important;
        }

        /* ==========================================================
           8. DSQ APPLICATION 전용 스타일 (피그마 1276 x 662)
           ========================================================== */
        .psDsqAppSection {
          width: 100% !important;
          max-width: 1276px !important;
          height: 662px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          gap: 40px !important;
          border-radius: 24px !important;
          box-sizing: border-box !important;
          margin: 0 auto !important;
        }

        .psDsqAppHeader {
          width: 100% !important;
          max-width: 1276px !important;
          height: 142px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
          align-items: flex-start !important;
          gap: 12px !important;
          box-sizing: border-box !important;
        }

        .psDsqAppBadge {
          font-family: inherit !important;
          font-size: 20px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          color: #0052ff !important;
          text-transform: uppercase !important;
        }

        .psDsqAppHeading {
          font-family: inherit !important;
          font-size: 40px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          color: #111625 !important;
          margin: 0 !important;
          text-align: left !important;
          word-break: keep-all !important;
        }

        .psDsqAppCards {
          width: 100% !important;
          max-width: 1276px !important;
          height: 480px !important;
          display: grid !important;
          grid-template-columns: repeat(3, 412px) !important;
          justify-content: space-between !important;
          gap: 20px !important;
          box-sizing: border-box !important;
        }

        .psDsqAppCard {
          position: relative !important;
          width: 412px !important;
          height: 480px !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          background-size: cover !important;
          background-position: center !important;
          padding: 28px !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-end !important;
          align-items: flex-start !important;
          box-shadow: 0 16px 34px -18px rgba(15, 23, 42, 0.2) !important;
          transition: transform 0.25s ease, box-shadow 0.25s ease !important;
        }

        .psDsqAppCard:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 40px -15px rgba(0, 82, 255, 0.25) !important;
        }

        .psDsqAppCard::after {
          content: "" !important;
          position: absolute !important;
          inset: 0 !important;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.15) 55%, rgba(0, 0, 0, 0) 100%) !important;
          pointer-events: none !important;
        }

        .psDsqAppCardText {
          position: relative !important;
          z-index: 2 !important;
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }

        .psDsqAppCardTitle {
          font-family: inherit !important;
          font-size: 24px !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          letter-spacing: 0 !important;
          color: #ffffff !important;
          margin: 0 !important;
          text-align: left !important;
          word-break: keep-all !important;
        }

        .psDsqAppCardDesc {
          font-family: inherit !important;
          font-size: 18px !important;
          font-weight: 400 !important;
          line-height: 1.5 !important;
          letter-spacing: 0 !important;
          color: rgba(255, 255, 255, 0.88) !important;
          margin: 0 !important;
          text-align: left !important;
          word-break: keep-all !important;
        }

        /* ==========================================================
           9. 최종 문의하기 CTA (이전 페이지와 100% 동일한 세로 360px 규격)
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

        /* ==========================================================
           반응형 분기 대응
           ========================================================== */
        @media (max-width: 1360px) {
          .psInner { padding: 0 24px; }
          .psModeGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); height: auto; }
          .psDsqAppCards { grid-template-columns: repeat(2, minmax(0, 1fr)); height: auto; }
          .psModeCard, .psDsqAppCard { width: 100%; }
          .psModeSection, .psDsqAppSection { height: auto; }
          .psFullBleedCta { padding: 60px 24px; }
          .psFinalCta { padding: 60px 5%; min-height: auto; }
          .psFinalCtaInner { height: auto; }
          .psFinalCtaText { width: auto; }
        }

        @media (max-width: 960px) {
          .psWhyGrid, .psDsqWhyGrid { grid-template-columns: 1fr; height: auto; }
          .psWhyLeft, .psWhyRightCards, .psDsqWhyLeft, .psDsqWhyRightCards { max-width: 100%; height: auto; }
          .psDsqHowSection { height: auto; }
          .psDsqHowCardsContainer { max-width: 100%; height: auto; }
          .psDsqStepRow4 { grid-template-columns: 1fr; }
          .psDsqStepBox, .psDsqWideBox { width: 100%; }
        }

        @media (max-width: 768px) {
          .psHeroHeader { padding-top: 100px; }
          .psHeroTitle { font-size: 36px; }
          .psHeroSub { font-size: 18px; }
          .psHeroBannerText { font-size: 28px; }
          .psProductTitle { font-size: 32px; }
          .psWhyHeading, .psDsqWhyHeading, .psDsqHowHeading, .psDsqAppHeading { font-size: 28px; }
          .psModeHeading, .psFullBleedCtaHeading { font-size: 28px; }

          .psProductHead { height: auto; flex-direction: column; align-items: flex-start; }
          .psProductHeadText { width: 100%; }
          .psProductBanner { height: 240px; }

          .psWhyCard, .psDsqWhyCard { height: auto; padding: 20px; }
          .psWhyCardText, .psDsqWhyCardText { width: 100%; height: auto; }

          .psModeGrid, .psDsqAppCards { grid-template-columns: 1fr; }

          .psFinalCta { padding: 48px 20px; min-height: auto; }
          .psFinalCtaInner { flex-direction: column; align-items: flex-start; gap: 24px; height: auto; }
          .psFinalCtaText { width: 100%; font-size: 28px; }
        }
      `}</style>

      <div className="psPage">
        {/* ================= 1. HERO (애니메이션 제거) ================= */}
        <div className="psHeroHeader">
          <div className="psHeroIntro">
            <span className="psHeroBadge">{t.hero.badge}</span>
            <h1 className="psHeroTitle">
              {t.hero.subtitle[0]}
              <br />
              {t.hero.subtitle[1]}
            </h1>
          </div>
        </div>

        {/* 1600 x 480 풀블리드 상단 배너 (애니메이션 제거) */}
        <div className="psHeroBanner">
          <p className="psHeroBannerText">
            {t.hero.bannerText[0]}
            <br />
            {t.hero.bannerText[1]}
          </p>
        </div>

        {/* ================= 2. K-AI STATION ================= */}
        <div className="psInner">
          <div className="psProductSection">
            <div className="psProductHead" data-reveal="up">
              <div className="psProductHeadText">
                <h2 className="psProductTitle">{t.station.title}</h2>
                <p className="psProductSub">
                  {t.station.subtitle[0]}
                  <br />
                  {t.station.subtitle[1]}
                </p>
              </div>

              <a
                href={t.station.exploreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="psExploreBtn"
              >
                <span className="psExploreBtnText">{t.station.exploreBtn}</span>
                <svg
                  className="psExploreBtnArrow"
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
              </a>
            </div>

            <div className="psProductBanner" data-reveal="up">
              <img src={t.station.banner} alt={t.station.title} />
            </div>

            {/* K-AI WHY 블록 */}
            <WhyHowSection data={t.station} type="why" />

            <hr className="psSubDivider" />

            {/* K-AI HOW 블록 */}
            <WhyHowSection data={t.station} type="how" />

            <hr className="psSubDivider" />

            {/* K-AI MODE 그리드 */}
            <ModeGrid data={t.station} />
          </div>
        </div>

        {/* ================= 3. 중간 풀블리드 CTA ================= */}
        <div className="psFullBleedCta" data-reveal="up">
          <div className="psFullBleedCtaInner">
            <span className="psFullBleedCtaBadge">{t.midCta.badge}</span>
            <p className="psFullBleedCtaHeading">
              {t.midCta.heading[0]}
              <br />
              {t.midCta.heading[1]}
            </p>
          </div>
        </div>

        {/* ================= 4. DSQ PLATFORM ================= */}
        <div className="psInner">
          <div className="psProductSection">
            <div className="psProductHead" data-reveal="up">
              <div className="psProductHeadText">
                <h2 className="psProductTitle">{t.dsq.title}</h2>
                <p className="psProductSub">
                  {t.dsq.subtitle[0]}
                  <br />
                  {t.dsq.subtitle[1]}
                </p>
              </div>

              <a
                href={t.dsq.exploreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="psExploreBtn"
              >
                <span className="psExploreBtnText">{t.dsq.exploreBtn}</span>
                <svg
                  className="psExploreBtnArrow"
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
              </a>
            </div>

            <div className="psProductBanner" data-reveal="up">
              <img src={t.dsq.banner} alt={t.dsq.title} />
            </div>

            {/* DSQ WHY 블록 */}
            <DsqWhyBlock data={t.dsq} />

            <hr className="psSubDivider" />

            {/* DSQ HOW 블록 */}
            <DsqHowBlock data={t.dsq} />

            <hr className="psSubDivider" />

            {/* DSQ APPLICATION 블록 */}
            <DsqApplicationBlock data={t.dsq} />
          </div>
        </div>

        {/* ================= 5. 최종 문의하기 CTA (세로 360px 고정) ================= */}
        <div className="fullBleed psFinalCta">
          <div className="psFinalCtaInner">
            <p className="psFinalCtaText">
              {t.finalCta.text[0]}
              <br />
              {t.finalCta.text[1]}
            </p>
            <button className="psFinalCtaBtn" onClick={onOpenContact || (() => handleOpenApply(""))} type="button">
              <span className="psFinalCtaBtnText">{t.finalCta.btn}</span>
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

      {/* 지원/문의하기 모달 */}
      {isApplyOpen && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
            display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff", padding: "40px", borderRadius: "20px", width: "100%", maxWidth: "520px",
              boxShadow: "0 20px 45px -15px rgba(15, 23, 42, 0.2)", position: "relative", color: "#111625",
              margin: "0 16px", boxSizing: "border-box",
              fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
            }}
          >
            <button
              onClick={() => setIsApplyOpen(false)}
              style={{ position: "absolute", top: "24px", right: "24px", border: "none", backgroundColor: "transparent", fontSize: "26px", cursor: "pointer", color: "#888" }}
              type="button"
            >
              &times;
            </button>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "#2167FD" }}>{t.modal.title}</h2>
            <p style={{ fontSize: "15px", color: "#626772", marginBottom: "24px" }}>
              {t.modal.jobLabel}: <strong>{selectedJob}</strong>
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.nameLabel}</label>
                <input type="text" required placeholder={t.modal.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.birthLabel}</label>
                <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.nationalityLabel}</label>
                <input type="text" required placeholder={t.modal.nationalityPlaceholder} value={nationality} onChange={(e) => setNationality(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: "700" }}>{t.modal.linkLabel}</label>
                <input type="url" placeholder={t.modal.linkPlaceholder} value={fileLink} onChange={(e) => setFileLink(e.target.value)}
                  style={{ padding: "12px", border: "1px solid #E1E5EE", borderRadius: "10px", fontSize: "15px", outline: "none" }} />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#2167FD", color: "#ffffff", border: "none", borderRadius: "99px", padding: "14px",
                  fontSize: "16px", fontWeight: "700", cursor: "pointer", marginTop: "8px",
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