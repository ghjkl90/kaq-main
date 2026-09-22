"use client";

import { createContext, useContext, useState } from "react";
import ContactModal from "../components/ContactModal";

const ContactContext = createContext({ openContact: () => {} });

export function ContactProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactContext.Provider value={{ openContact: () => setIsOpen(true) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactContext.Provider>
  );
}

export const useContact = () => useContext(ContactContext);