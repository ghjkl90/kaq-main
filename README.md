# 🌐 KAQ 공식 웹사이트 (KAQ Web Platform)

https://www.kaq.kr/

(주)케이에이큐(KAQ) 및 성균관대학교 스마트품질 연구실의 공식 반응형 웹 플랫폼 프로젝트입니다.  
Next.js App Router 아키텍처를 기반으로 설계되었으며, 독립 모듈화된 UI 컴포넌트와 페이지 단위 라우팅(`page.js`) 구조로 구축되었습니다.

---

## 📌 목차 (Table of Contents)
1. [프로젝트 개요](#-프로젝트-개요)
2. [기술 스택 (Tech Stack)](#-기술-스택-tech-stack)
3. [디렉터리 아키텍처 (Project Architecture)](#-디렉터리-아키텍처-project-architecture)
4. [주요 구현 기능 및 최근 반영 사항](#-주요-구현-기능-및-최근-반영-사항)
5. [코드 컨벤션 및 스타일 가이드](#-코드-컨벤션-및-스타일-가이드)
6. [시작하기 (Getting Started)](#-시작하기-getting-started)

---

## 📖 프로젝트 개요

* **프로젝트명:** KAQ 공식 반응형 웹 플랫폼 구축
* **목적:** 기업 브랜딩, DSQ/KAI 플랫폼 소개, 연구 프로젝트 및 글로벌 챌린지 성과 아카이빙, 글로벌 다국어(아랍어 등) 지원
* **아키텍처:** Next.js App Router 기반의 페이지 및 컴포넌트 분리 구조
* **대응 디바이스:** PC 데스크톱, 16인치 랩톱 해상도 및 모바일 반응형 최적화

---

## 🛠 기술 스택 (Tech Stack)

### Core & Framework
* **Framework:** Next.js (App Router 기반 라우팅)
* **Library:** React (Functional Components & Hooks, Context API)
* **Language:** JavaScript / TypeScript (`app/layout.tsx`)

### Styling & Asset
* **Styling:** CSS Modules (`*.module.css`), Global CSS (`globals.css`)
* **Media & Interaction:** HTML5 Video/Audio API, Custom Scroll & Hover Interaction, 모달 시스템

---

## 📂 디렉터리 아키텍처 (Project Architecture)

공통 재사용 컴포넌트(`app/components/`)와 글로벌 상태(`app/context/`)를 제외한 모든 서브 라우트는 Next.js 규격에 맞추어 `page.js`로 구현되어 있습니다.

```text
kaq-main/
├── app/
│   ├── DSQ/                      # DSQ 플랫폼 전용 라우트 (page.js)
│   ├── about/                    # 회사 소개 및 인재 채용 (page.js)
│   ├── globalchallenge/          # 글로벌 챌린지 안내 및 갤러리 (page.js)
│   ├── products-and-services/    # 제품/서비스 및 연구 프로젝트 (page.js)
│   ├── publications/             # 발간물 및 학술 리소스 (page.js)
│   │
│   ├── context/                  # 글로벌 상태 관리 (문의하기 모달 및 상태 바인딩)
│   ├── components/               # 공통 UI 및 섹션별 모듈 컴포넌트
│   │   ├── Header.js             # 상단 반응형 네비게이션 (스크롤 감지 & 아랍어 지원)
│   │   ├── Footer.js             # 하단 공통 푸터 (아랍어 지원)
│   │   ├── HeroSection.js        # 메인 풀스크린 비디오 히어로 섹션
│   │   ├── MainInteraction.js    # 메인 비주얼 인터랙션 컴포넌트
│   │   ├── ContactModal.js       # 전역 문의하기(Contact) 모달 컴포넌트
│   │   ├── MediaGallery.js       # As You See 미디어 갤러리 뷰
│   │   ├── DSQPlatform.js        # DSQ 플랫폼 서비스 소개 섹션
│   │   ├── KAIStation.js         # KAI 스테이션 기능 소개 섹션
│   │   └── ProjectList.js        # 연구 프로젝트 카드 그리드 뷰
│   │
│   ├── favicon.ico               # 파비콘
│   ├── globals.css               # 전역 스타일 및 디자인 토큰 선언
│   ├── layout.tsx                # 루트 레이아웃 (공통 헤더/푸터 및 BGM 인스턴스)
│   ├── page.js                   # 메인 랜딩 페이지
│   └── page.module.css           # 메인 페이지 전용 스코프 스타일
├── public/                       # 이미지, 로고, 비디오 에셋
├── package.json
└── README.md
