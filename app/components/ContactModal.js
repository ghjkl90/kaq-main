"use client";

import { useLanguage } from "../context/LanguageContext";
import styles from "../page.module.css"; 

const CONTENT = {
  KR: {
    title: "문의 및 협력 신청",
    subtitle: "연락처 및 협업 관련 문의 사항을 작성해 주시면 신속히 안내해 드리겠습니다.",
    fullName: "성함",
    fullNamePlaceholder: "이름을 입력해 주세요",
    phone: "연락처",
    phonePlaceholder: "010-XXXX-XXXX",
    email: "이메일 주소",
    emailPlaceholder: "example@email.com",
    inquiryType: "문의 유형",
    selectDefault: "-- 선택해 주세요 --",
    options: {
      collaboration: "기술 협력",
      admission: "입학 및 연구원 지원",
      jointResearch: "공동 연구 프로젝트",
      other: "기타 문의"
    },
    org: "소속 / 기관명",
    orgPlaceholder: "기업, 대학 또는 연구기관명",
    message: "문의 내용 (선택)",
    messagePlaceholder: "문의 사항 또는 프로젝트 내용을 상세히 기재해 주세요...",
    privacy: "개인정보 수집 및 이용에 동의합니다.",
    submit: "제출하기",
    successMsg: "문의가 성공적으로 제출되었습니다."
  },
  EN: {
    title: "Contact & Inquiry Form",
    subtitle: "Please fill out the form below to leave your contact details or collaboration inquiries.",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your name",
    phone: "Phone Number",
    phonePlaceholder: "+82 10-XXXX-XXXX",
    email: "Email Address",
    emailPlaceholder: "example@email.com",
    inquiryType: "Inquiry Type",
    selectDefault: "-- Select Option --",
    options: {
      collaboration: "Technical Collaboration",
      admission: "Admission & Study",
      jointResearch: "Joint Research",
      other: "Other"
    },
    org: "Affiliation / Organization",
    orgPlaceholder: "Company, University, or Institute",
    message: "Message (Optional)",
    messagePlaceholder: "Please describe your inquiry or project details...",
    privacy: "I agree to the collection and use of personal information.",
    submit: "SUBMIT",
    successMsg: "Your contact information has been successfully submitted."
  },
  JP: {
    title: "お問い合わせ・共同研究フォーム",
    subtitle: "ご連絡先や協業に関するお問い合わせ内容をご入力ください。",
    fullName: "お名前",
    fullNamePlaceholder: "お名前をご入力ください",
    phone: "電話番号",
    phonePlaceholder: "010-XXXX-XXXX",
    email: "メールアドレス",
    emailPlaceholder: "example@email.com",
    inquiryType: "お問い合わせ種別",
    selectDefault: "-- 選択してください --",
    options: {
      collaboration: "技術連携",
      admission: "研究室応募・進学",
      jointResearch: "共同研究",
      other: "その他"
    },
    org: "ご所属・機関名",
    orgPlaceholder: "企業名、大学名、研究機関名など",
    message: "お問い合わせ内容（任意）",
    messagePlaceholder: "プロジェクト内容やお問い合わせ詳細をご記入ください...",
    privacy: "個人情報の収集および利用に同意します。",
    submit: "送信する",
    successMsg: "お問い合わせが正常に送信されました。"
  },
  TH: {
    title: "แบบฟอร์มติดต่อและสอบถามข้อมูล",
    subtitle: "กรุณากรอกข้อมูลด้านล่างเพื่อติดต่อหรือประสานงานความร่วมมือ",
    fullName: "ชื่อ-นามสกุล",
    fullNamePlaceholder: "กรุณากรอกชื่อของคุณ",
    phone: "เบอร์โทรศัพท์",
    phonePlaceholder: "+82 10-XXXX-XXXX",
    email: "อีเมล",
    emailPlaceholder: "example@email.com",
    inquiryType: "ประเภทการสอบถาม",
    selectDefault: "-- กรุณาเลือก --",
    options: {
      collaboration: "ความร่วมมือทางเทคนิค",
      admission: "การศึกษาต่อและการเข้าร่วมวิจัย",
      jointResearch: "โครงการวิจัยร่วม",
      other: "อื่นๆ"
    },
    org: "สังกัด / องค์กร",
    orgPlaceholder: "บริษัท, มหาวิทยาลัย หรือสถาบันวิจัย",
    message: "ข้อความเพิ่มเติม (ไม่บังคับ)",
    messagePlaceholder: "ระบุรายละเอียดการสอบถามหรือโครงการ...",
    privacy: "ข้าพเจ้ายินยอมให้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคล",
    submit: "ส่งข้อมูล",
    successMsg: "ส่งข้อมูลการติดต่อของคุณเรียบร้อยแล้ว"
  }
};

export default function ContactModal({ isOpen, onClose }) {
  const { currentLang } = useLanguage();
  const t = CONTENT[currentLang] || CONTENT.KR;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t.successMsg);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <h2 className={styles.modalTitle}>{t.title}</h2>
        <p className={styles.modalSubtitle}>{t.subtitle}</p>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.inputGroup}>
            <label>{t.fullName}</label>
            <input type="text" placeholder={t.fullNamePlaceholder} required />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.phone}</label>
            <input type="tel" placeholder={t.phonePlaceholder} required />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.email}</label>
            <input type="email" placeholder={t.emailPlaceholder} required />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.inquiryType}</label>
            <select required>
              <option value="">{t.selectDefault}</option>
              <option value="collaboration">{t.options.collaboration}</option>
              <option value="admission">{t.options.admission}</option>
              <option value="joint-research">{t.options.jointResearch}</option>
              <option value="other">{t.options.other}</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>{t.org}</label>
            <input type="text" placeholder={t.orgPlaceholder} required />
          </div>

          <div className={styles.inputGroup}>
            <label>{t.message}</label>
            <textarea placeholder={t.messagePlaceholder} rows={4}></textarea>
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="privacy" required />
            <label htmlFor="privacy">{t.privacy}</label>
          </div>

          <button type="submit" className={styles.submitButton}>{t.submit}</button>
        </form>
      </div>
    </div>
  );
}