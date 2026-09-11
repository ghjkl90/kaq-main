"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

/* ============================================================
   4개 언어 콘텐츠 사전 (KR / EN / JP / TH)
   ============================================================ */
const CONTENT = {
  KR: {
    hero: {
      title: "제품 및 서비스",
      subtitle: [
        "KAQ의 기술은 사람과 AI의 관계에서 시작해",
        "우리가 생활하는 공간의 안전과 품질까지 확장됩니다.",
      ],
      bannerText: ["사람에게는 더 쉬운 AI를,", "공간에는 더 나은 품질을."],
    },
    tabNames: { all: "전체", station: "K-AI-STATION", dsq: "DSQ" },
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
      tryBtn: "체험하기",
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
          { label: "SENSE", desc: "현장 정보 수집", icon: "sense" },
          { label: "MEASURE", desc: "안전·품질 상태 측정", icon: "measure" },
          { label: "ANALYZE", desc: "상태와 변화 분석", icon: "analyze" },
          { label: "VISUALIZE", desc: "대시보드 시각화", icon: "visualize" },
          { label: "IMPROVE", desc: "위험 확인과 개선 관리", icon: "improve", wide: true },
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
  },

  EN: {
    hero: {
      badge: "Products & Services",
      title: "Products & Services",
      subtitle: [
        "KAQ's technology starts with the relationship between people and AI,",
        "and extends to the safety and quality of the spaces we live in.",
      ],
      bannerText: ["Easier AI for people,", "Better quality for spaces."],
    },
    tabNames: { all: "All", station: "K-AI-STATION", dsq: "DSQ" },
    station: {
      title: "K–AI Station",
      subtitle: [
        "Not a service only for the tech-savvy —",
        "designed so anyone can experience AI directly, regardless of age, job, or interest.",
      ],
      banner: "/8.png",
      exploreBtn: "View More",
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
      tryBtn: "Try Now",
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
      exploreBtn: "View More",
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
          { label: "SENSE", desc: "Collect field information", icon: "sense" },
          { label: "MEASURE", desc: "Measure safety & quality status", icon: "measure" },
          { label: "ANALYZE", desc: "Analyze status and change", icon: "analyze" },
          { label: "VISUALIZE", desc: "Visualize on a dashboard", icon: "visualize" },
          { label: "IMPROVE", desc: "Check risk and manage improvement", icon: "improve", wide: true },
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
  },

  JP: {
    hero: {
      badge: "Products & Services",
      title: "製品 & サービス",
      subtitle: ["KAQの技術は人とAIの関係から始まり、", "私たちが暮らす空間の安全と品質にまで広がります。"],
      bannerText: ["人にはより易しいAIを、", "空間にはより良い品質を。"],
    },
    tabNames: { all: "すべて", station: "K-AI-STATION", dsq: "DSQ" },
    station: {
      title: "K–AI Station",
      subtitle: ["AIに慣れた人だけのサービスではなく、", "年齢・職業・関心に関係なく誰もが直接体験できるよう設計しています。"],
      banner: "/8.png",
      exploreBtn: "詳細を見る",
      exploreLink: "https://k-ai-station.vercel.app/",
      why: {
        badge: "WHY",
        heading: ["AIは身近になりましたが、", "誰にとっても簡単になったわけではありません。"],
        cards: [
          { title: "始め方が分かりません。", desc: "AIを初めて使う人は何から質問すればいいか分かりません。" },
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
      tryBtn: "体験する",
      modes: [
        { id: "senior", title: "シニアモード", desc: "難しくありません。親しみやすいAIがあなたのお話を待っています。", link: "https://kai-station.com/senior?from=%2Fhome", image: "/11.png" },
        { id: "doran", title: "ドランドランAI", desc: "数回の選択だけでAIと気軽に会話を始められます。", link: "https://doran-two.vercel.app/", image: "/12.png" },
        { id: "kids", title: "キッズモード", desc: "好奇心いっぱい！AIの友達と一緒に想像力を育みましょう。", link: "https://kai-station.com/kids?from=%2Fhome", image: "/13.png" },
        { id: "lab", title: "実習モード", desc: "AIを活用した課題や実習を授業内で行えます。", link: "https://kai-station.com/?from=%2Fhome", image: "/14.png" },
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
      exploreBtn: "詳細を見る",
      exploreLink: "http://openq.co.kr:8082/",
      why: {
        badge: "WHY",
        heading: ["空間の安全は目に見えないとき", "管理が難しくなります。"],
        cards: [
          { title: "情報が分散しています。", desc: "点検結果と現場データが異なる方式で管理されています。" },
          { title: "現在の状態を一目で把握しづらいです。", desc: "問題が発生する前にリスクの変化を把握しにくいです。" },
          { title: "記録が改善につながりにくいです。", desc: "点検が一回限りの記録で終わることがあります。" },
        ],
      },
      how: {
        badge: "HOW",
        heading: ["だからDSQ PLATFORMは", "現場のデータを", "一つの流れでつなぎます。"],
        steps: [
          { label: "SENSE", desc: "現場情報の収集", icon: "sense" },
          { label: "MEASURE", desc: "安全・品質状態の測定", icon: "measure" },
          { label: "ANALYZE", desc: "状態と変化の分析", icon: "analyze" },
          { label: "VISUALIZE", desc: "ダッシュボード可視化", icon: "visualize" },
          { label: "IMPROVE", desc: "リスク確認と改善管理", icon: "improve", wide: true },
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
  },

  TH: {
    hero: {
      badge: "Products & Services",
      title: "ผลิตภัณฑ์และบริการ",
      subtitle: ["เทคโนโลยีของ KAQ เริ่มต้นจากความสัมพันธ์ระหว่างมนุษย์กับ AI", "และขยายไปสู่ความปลอดภัยและคุณภาพของพื้นที่ที่เราใช้ชีวิตอยู่"],
      bannerText: ["AI ที่ใช้งานง่ายขึ้นสำหรับผู้คน,", "คุณภาพที่ดีขึ้นสำหรับพื้นที่"],
    },
    tabNames: { all: "ทั้งหมด", station: "K-AI-STATION", dsq: "DSQ" },
    station: {
      title: "K–AI Station",
      subtitle: ["ไม่ใช่บริการสำหรับผู้ที่คุ้นเคยกับ AI เท่านั้น", "ออกแบบมาให้ทุกคนสัมผัสประสบการณ์ AI ได้โดยตรง ไม่ว่าอายุ อาชีพ หรือความสนใจใด"],
      banner: "/8.png",
      exploreBtn: "ดูรายละเอียด",
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
      tryBtn: "ทดลองใช้งาน",
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
      exploreBtn: "ดูรายละเอียด",
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
          { label: "SENSE", desc: "เก็บข้อมูลภาคสนาม", icon: "sense" },
          { label: "MEASURE", desc: "วัดสถานะความปลอดภัย/คุณภาพ", icon: "measure" },
          { label: "ANALYZE", desc: "วิเคราะห์สถานะและการเปลี่ยนแปลง", icon: "analyze" },
          { label: "VISUALIZE", desc: "แสดงผลบนแดชบอร์ด", icon: "visualize" },
          { label: "IMPROVE", desc: "ตรวจสอบความเสี่ยงและจัดการปรับปรุง", icon: "improve", wide: true },
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
  },
};

/* ============================================================
   HOW(DSQ) 단계 아이콘
   ============================================================ */
const STEP_ICONS = {
  sense: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  measure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  analyze: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  visualize: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  improve: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
};

/* ============================================================
   스크롤 리빌 훅 (다른 섹션들과 동일한 패턴)
   ============================================================ */
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
   재사용 서브 컴포넌트
   ============================================================ */
function SectionHeading({ badge, heading, align = "left" }) {
  return (
    <div className={`psHeadingBlock psAlign-${align}`} data-reveal="up">
      <span className="psSectionLabel">{badge}</span>
      <h2 className="psHeading">
        {heading.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < heading.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
    </div>
  );
}

function WhyBlock({ data }) {
  return (
    <div className="psWhyGrid">
      <SectionHeading badge={data.why.badge} heading={data.why.heading} />
      <div className="psWhyCards">
        {data.why.cards.map((card, idx) => (
          <div className="psWhyCard" key={idx} data-reveal="right" style={{ transitionDelay: `${idx * 90}ms` }}>
            <span className="psNumBadge psNumBadge--light">{String(idx + 1).padStart(2, "0")}</span>
            <h4 className="psWhyCardTitle">{card.title}</h4>
            <p className="psWhyCardDesc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowBlockStation({ data }) {
  return (
    <div className="psWhyGrid">
      <SectionHeading badge={data.how.badge} heading={data.how.heading} />
      <div className="psHowCards">
        {data.how.cards.map((card, idx) => (
          <div className={`psHowCard psHowCard-${idx}`} key={idx} data-reveal="right" style={{ transitionDelay: `${idx * 90}ms` }}>
            <span className="psNumBadge psNumBadge--dark">{String(idx + 1).padStart(2, "0")}</span>
            <h4 className="psHowCardTitle">{card.title}</h4>
            <p className="psHowCardDesc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModeGrid({ data }) {
  return (
    <div className="psModeSection">
      <SectionHeading badge={data.modeBadge} heading={data.modeHeading} />
      <div className="psModeGrid">
        {data.modes.map((mode, idx) => (
          <a
            href={mode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="psModeCard"
            key={mode.id}
            data-reveal="up"
            style={{ transitionDelay: `${(idx % 3) * 80}ms`, backgroundImage: `url(${mode.image})` }}
          >
            <span className="psModeArrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
            <div className="psModeCardText">
              <h5 className="psModeCardTitle">{mode.title}</h5>
              <p className="psModeCardDesc">{mode.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function DsqHowBlock({ data }) {
  return (
    <div className="psWhyGrid">
      <SectionHeading badge={data.how.badge} heading={data.how.heading} />
      <div className="psDsqStepsGrid">
        {data.how.steps.map((step, idx) => (
          <div
            className={`psStepCard ${step.wide ? "psStepCard--wide" : ""}`}
            key={idx}
            data-reveal="right"
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            <span className="psStepIcon">{STEP_ICONS[step.icon]}</span>
            <span className="psNumBadge psNumBadge--dark">{String(idx + 1).padStart(2, "0")}</span>
            <h5 className="psStepLabel">{step.label}</h5>
            <p className="psStepDesc">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationBlock({ data }) {
  return (
    <div className="psModeSection">
      <SectionHeading badge={data.application.badge} heading={data.application.heading} />
      <div className="psPlacesGrid">
        {data.application.places.map((place, idx) => (
          <div
            className="psPlaceCard"
            key={idx}
            data-reveal="up"
            style={{ transitionDelay: `${idx * 90}ms`, backgroundImage: `url(${place.image})` }}
          >
            <div className="psPlaceCardText">
              <h5 className="psPlaceCardTitle">{place.title}</h5>
              <p className="psPlaceCardDesc">{place.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   메인 컴포넌트
   ============================================================ */
export default function ProductsPage({ onOpenContact }) {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;
  const containerRef = useScrollReveal();

  const topRef = useRef(null);
  const stationRef = useRef(null);
  const dsqRef = useRef(null);

  return (
    <div ref={containerRef}>
      <style>{`
        .psPage {
          width: 100%;
          background-color: #ffffff;
          padding: 180px 24px 0;
          box-sizing: border-box;
          overflow: hidden; /* 마지막 자식의 margin-bottom이 박스 밖으로 새어나가
                                (margin collapse) 배경 없는 틈이 생기는 것을 방지 */
        }

        .psInner {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* --- 공통 리빌 --- */
        [data-reveal] {
          opacity: 0;
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-reveal="up"] { transform: translateY(32px); }
        [data-reveal="right"] { transform: translateX(36px); }
        [data-reveal].psVisible { opacity: 1; transform: translate(0, 0); }

        .psHeadingBlock { margin-bottom: 28px; }
        .psAlign-center { text-align: center; margin-left: auto; margin-right: auto; max-width: 720px; }

        .psSectionLabel {
          display: inline-block;
          color: #0052ff;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .psHeading {
          font-size: clamp(1.4rem, 2.6vw, 2rem);
          font-weight: 800;
          line-height: 1.4;
          letter-spacing: -0.02em;
          color: #111625;
          margin: 0;
          word-break: keep-all;
        }

        /* --- 히어로 --- */
        .psHero { padding-bottom: 0; }
        .psHeroTitle {
          font-size: clamp(1.9rem, 3.6vw, 2.6rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #111625;
          margin: 0 0 20px 0;
          word-break: keep-all;
        }
        .psHeroSub {
          font-size: 0.98rem;
          line-height: 1.7;
          color: #555b66;
          margin: 0 0 40px 0;
          word-break: keep-all;
        }

        /* 화면 폭 전체로 퍼지는 배너: 최소/최대 높이를 clamp로 잡아
           초광폭/초협폭 화면 모두에서 텍스트가 눌리거나 과하게 늘어나지 않게 함 */
        .psHeroBanner {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: clamp(320px, 62vh, 620px);
          overflow: hidden;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 0 24px;
          text-align: center;
        }
        .psHeroBannerText {
          font-size: clamp(1.4rem, 3.4vw, 2.6rem);
          font-weight: 800;
          line-height: 1.65;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }

        /* --- 제품 상세 공통 --- */
        .psDivider { border: none; border-top: 1px solid #edf0f4; margin: 96px 0 56px; }
        .psSubDivider { border: none; border-top: 1px solid #edf0f4; margin: 80px 0; }

        .psProductHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 80px;
        }
        .psProductTitle {
          font-size: clamp(1.4rem, 2.6vw, 2rem);
          font-weight: 800;
          line-height: 1.4;
          letter-spacing: -0.02em;
          color: #111625;
          margin: 0 0 10px 0;
        }
        /* 영문 위주 타이틀(K–AI Station, DSQ PLATFORM)은 한글 폰트 대비
           같은 font-size라도 작아 보여서 살짝 크고 굵게 보정 */
        .psProductTitle--en {
          font-size: clamp(1.6rem, 2.9vw, 2.2rem);
          font-weight: 900;
        }
        .psProductSub {
          font-size: 0.92rem;
          line-height: 1.65;
          color: #666666;
          margin: 0;
          max-width: 560px;
          word-break: keep-all;
        }
        .psExploreBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #111111;
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1;
          padding: 11px 20px;
          border-radius: 9999px;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 0.25s ease, transform 0.25s ease;
        }
        .psExploreBtn:hover { background: #0052ff; transform: translateY(-2px); }
        .psExploreBtn svg { display: block; flex-shrink: 0; }

        .psProductBanner {
          width: 100%;
          height: clamp(200px, 32vw, 360px);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 80px;
          box-shadow: 0 20px 45px -20px rgba(15, 23, 42, 0.25);
        }
        .psProductBanner img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* --- WHY / HOW 2단 그리드 --- */
        .psWhyGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 0;
          align-items: start;
        }

        .psWhyCards, .psHowCards, .psDsqStepsGrid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .psNumBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          font-size: 0.72rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .psNumBadge--light { background: #111a2e; color: #ffffff; }
        .psNumBadge--dark { background: rgba(255,255,255,0.18); color: #ffffff; }

        .psWhyCard {
          background: #f3f6fc;
          border-radius: 14px;
          padding: 22px 24px;
        }
        .psWhyCardTitle {
          font-size: 1.02rem;
          font-weight: 800;
          color: #111625;
          margin: 0 0 6px 0;
          word-break: keep-all;
        }
        .psWhyCardDesc {
          font-size: 0.85rem;
          line-height: 1.55;
          color: #6b7280;
          margin: 0;
          word-break: keep-all;
        }

        .psHowCard {
          border-radius: 14px;
          padding: 22px 24px;
          color: #ffffff;
        }
        .psHowCard-0 { background: #4936ED; }
        .psHowCard-1 { background: #2167FD; }
        .psHowCard-2 { background: #00A1F1; }
        .psHowCard-0 .psNumBadge--dark { background: #ffffff; color: #4936ED; }
        .psHowCard-1 .psNumBadge--dark { background: #ffffff; color: #2167FD; }
        .psHowCard-2 .psNumBadge--dark { background: #ffffff; color: #00A1F1; }
        .psHowCardTitle {
          font-size: 1.02rem;
          font-weight: 800;
          margin: 0 0 6px 0;
          word-break: keep-all;
        }
        .psHowCardDesc {
          font-size: 0.85rem;
          line-height: 1.55;
          color: rgba(255,255,255,0.85);
          margin: 0;
          word-break: keep-all;
        }

        /* --- DSQ HOW 스텝 카드 (2x2 + wide) --- */
        .psDsqStepsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .psStepCard {
          position: relative;
          background: #333C4E;
          color: #ffffff;
          border-radius: 14px;
          padding: 24px;
          min-height: 190px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .psStepCard--wide {
          grid-column: 1 / -1;
          background: #2167fd;
        }
        .psStepCard .psNumBadge--dark { background: #ffffff; color: #333C4E; }
        .psStepCard--wide .psNumBadge--dark { background: #ffffff; color: #2167FD; }
        .psStepIcon {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 28px;
          height: 28px;
          opacity: 0.95;
        }
        .psStepIcon svg { width: 100%; height: 100%; display: block; stroke-width: 1.7; }
        .psStepLabel {
          font-size: 1rem;
          font-weight: 800;
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
        }
        .psStepDesc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.8);
          margin: 0;
          word-break: keep-all;
        }

        /* --- MODE 그리드 --- */
        .psModeSection { margin-bottom: 80px; }
        .psModeGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .psModeCard {
          position: relative;
          display: block;
          height: 220px;
          border-radius: 16px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-color: #111a2e;
          text-decoration: none;
          box-shadow: 0 16px 34px -18px rgba(15, 23, 42, 0.35);
        }
        .psModeCard::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0) 100%);
        }
        .psModeArrow {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          z-index: 2;
        }
        .psModeCardText {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 16px;
          z-index: 2;
        }
        .psModeCardTitle {
          font-size: 1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 4px 0;
        }
        .psModeCardDesc {
          font-size: 0.78rem;
          line-height: 1.45;
          color: rgba(255,255,255,0.85);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* --- APPLICATION 3카드 --- */
        .psPlacesGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .psPlaceCard {
          position: relative;
          height: 400px;
          border-radius: 14px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
        }
        .psPlaceCard::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%);
        }
        .psPlaceCardText { position: absolute; left: 16px; right: 16px; bottom: 14px; z-index: 2; }
        .psPlaceCardTitle { font-size: 0.98rem; font-weight: 800; color: #fff; margin: 0 0 4px 0; }
        .psPlaceCardDesc { font-size: 0.76rem; color: rgba(255,255,255,0.85); margin: 0; word-break: keep-all; }

        /* --- 중간 / 최종 CTA (진한 파랑 스월 배너) --- */
        .psFullBleedCta {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          height: 480px;
          background-color: #002572;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          text-align: center;
          padding: 60px 162px;
          box-sizing: border-box;
          margin-top: 80px;
        }
        .psFullBleedCta .psBadge {
          padding: 10px 24px;
          margin-bottom: 0;
          border-radius: 90px;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          color: #ffffff;
        }
        .psFullBleedCtaHeading {
          font-size: clamp(1.4rem, 3.4vw, 2.6rem);
          font-weight: 800;
          line-height: 1.65;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }

        .psFinalCta {
          width: 100%;
          min-height: 300px;
          background-image: url("/10.png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: 48px 6%;
        }
        .psFinalCtaInner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .psFinalCtaText {
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          font-weight: 800;
          line-height: 1.45;
          color: #ffffff;
          margin: 0;
          word-break: keep-all;
        }
        .psFinalCtaBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2167FD;
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1;
          padding: 12px 24px;
          border-radius: 9999px;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.25s ease, transform 0.25s ease;
        }
        .psFinalCtaBtn:hover { transform: translateY(-2px); }
        .psFinalCtaBtn svg { display: block; flex-shrink: 0; }

        /* ============================================================
           반응형 (데스크톱 소형 / 태블릿 / 모바일)
           ============================================================ */
        @media (max-width: 1024px) {
          .psHeroBanner { height: clamp(280px, 50vh, 520px); }
          .psHeroBannerText { font-size: clamp(1.3rem, 3.2vw, 2rem); }
          .psFullBleedCta { height: auto; min-height: 400px; padding: 60px 48px; }
        }

        @media (max-width: 960px) {
          .psWhyGrid { grid-template-columns: 1fr; gap: 28px; }
          .psModeGrid { grid-template-columns: repeat(2, 1fr); }
          .psPlacesGrid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .psPage { padding: 110px 18px 0; }
          .psHero { padding-bottom: 0; }
          .psHeroTitle { margin-bottom: 14px; }
          .psHeroSub { margin-bottom: 28px; }
          .psProductHead { margin-bottom: 48px; }
          .psProductBanner { margin-bottom: 48px; }
          .psWhyGrid { margin-bottom: 0; }
          .psSubDivider { margin: 48px 0; }
          .psModeSection { margin-bottom: 48px; }
          .psModeGrid { grid-template-columns: 1fr; }
          .psPlacesGrid { grid-template-columns: 1fr; }
          .psDsqStepsGrid { grid-template-columns: 1fr; }
          .psStepCard--wide { flex-direction: column; align-items: flex-start; gap: 6px; }
          .psFinalCtaInner { justify-content: flex-start; }
          .psHeroBanner { height: clamp(240px, 42vh, 420px); padding: 0 20px; }
          .psHeroBannerText { font-size: clamp(1.15rem, 5.2vw, 1.6rem); line-height: 1.55; }
          .psFullBleedCta { height: auto; min-height: 320px; padding: 48px 24px; gap: 14px; margin-top: 48px; }
          [data-reveal="right"] { transform: translateY(28px); }
        }

        @media (max-width: 400px) {
          .psHeroBanner { height: clamp(200px, 40vh, 340px); }
          .psHeroBannerText { font-size: 1.05rem; }
        }
      `}</style>

      <div className="psPage">
        <div className="psInner">

          {/* ================= HERO ================= */}
          <div ref={topRef} className="psHero">
            <div data-reveal="up">
              <h1 className="psHeroTitle">{t.hero.title}</h1>
              <p className="psHeroSub">
                {t.hero.subtitle[0]}
                <br />
                {t.hero.subtitle[1]}
              </p>
            </div>

            <div className="psHeroBanner" data-reveal="up">
              <p className="psHeroBannerText">
                {t.hero.bannerText[0]}
                <br />
                {t.hero.bannerText[1]}
              </p>
            </div>
          </div>

          {/* ================= K-AI STATION ================= */}
          <div ref={stationRef} style={{ marginTop: "80px" }}>
            <div className="psProductHead" data-reveal="up">
              <div>
                <h2 className="psProductTitle psProductTitle--en">{t.station.title}</h2>
                <p className="psProductSub">
                  {t.station.subtitle[0]}
                  <br />
                  {t.station.subtitle[1]}
                </p>
              </div>
              <a href={t.station.exploreLink} target="_blank" rel="noopener noreferrer" className="psExploreBtn">
                {t.station.exploreBtn}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="psProductBanner" data-reveal="up">
              <img src={t.station.banner} alt={t.station.title} />
            </div>

            <WhyBlock data={t.station} />
            <hr className="psSubDivider" />
            <HowBlockStation data={t.station} />
            <hr className="psSubDivider" />
            <ModeGrid data={t.station} />
          </div>

          {/* ================= 중간 CTA ================= */}
          <div className="psFullBleedCta" data-reveal="up">
            <span className="psBadge">{t.midCta.badge}</span>
            <p className="psFullBleedCtaHeading">
              {t.midCta.heading[0]}
              <br />
              {t.midCta.heading[1]}
            </p>
          </div>

          {/* ================= DSQ PLATFORM ================= */}
          <div ref={dsqRef} style={{ marginTop: "80px" }}>
            <div className="psProductHead" data-reveal="up">
              <div>
                <h2 className="psProductTitle psProductTitle--en">{t.dsq.title}</h2>
                <p className="psProductSub">
                  {t.dsq.subtitle[0]}
                  <br />
                  {t.dsq.subtitle[1]}
                </p>
              </div>
              <a href={t.dsq.exploreLink} target="_blank" rel="noopener noreferrer" className="psExploreBtn">
                {t.dsq.exploreBtn}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="psProductBanner" data-reveal="up">
              <img src={t.dsq.banner} alt={t.dsq.title} />
            </div>

            <WhyBlock data={t.dsq} />
            <hr className="psSubDivider" />
            <DsqHowBlock data={t.dsq} />
            <hr className="psSubDivider" />
            <ApplicationBlock data={t.dsq} />
          </div>

        </div>
      </div>

      <div className="psFinalCta">
        <div className="psFinalCtaInner">
          <p className="psFinalCtaText">
            {t.finalCta.text[0]}
            <br />
            {t.finalCta.text[1]}
          </p>
          <button className="psFinalCtaBtn" onClick={onOpenContact} type="button">
            {t.finalCta.btn}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}