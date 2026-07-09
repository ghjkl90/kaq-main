"use client";

import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MainInteraction from "./components/MainInteraction";
import ContactModal from "./components/ContactModal";
import ProjectList from "./components/ProjectList";
import MediaGallery from "./components/MediaGallery";


export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactModal = () => {
    setIsContactOpen(true);
  };

  return (
    <main>
      <Header onOpenContact={openContactModal} />
      <HeroSection onOpenContact={openContactModal} />
      {/* <MainInteraction /> */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ProjectList />
      <MediaGallery />
    </main>
  );
}