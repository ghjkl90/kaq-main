"use client";

// 💡 동일하게 한 단계 위 폴더의 스타일시트를 바라보도록 맞춥니다.
import styles from "../page.module.css"; 

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your contact information has been successfully submitted.");
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <h2 className={styles.modalTitle}>Contact & Inquiry Form</h2>
        <p className={styles.modalSubtitle}>Please fill out the form below to leave your contact details or collaboration inquiries.</p>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input type="tel" placeholder="+82 10-XXXX-XXXX" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="example@email.com" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Inquiry Type</label>
            <select required>
              <option value="">-- Select Option --</option>
              <option value="collaboration">Technical Collaboration</option>
              <option value="admission">Admission & Study</option>
              <option value="joint-research">Joint Research</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Affiliation / Organization</label>
            <input type="text" placeholder="Company, University, or Institute" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Message (Optional)</label>
            <textarea placeholder="Please describe your inquiry or project details..." rows={4}></textarea>
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="privacy" required />
            <label htmlFor="privacy">I agree to the collection and use of personal information.</label>
          </div>

          <button type="submit" className={styles.submitButton}>SUBMIT</button>
        </form>
      </div>
    </div>
  );
}