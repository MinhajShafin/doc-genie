"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import HeroSection from "../../components/HeroSection";
import FindDoctor from "../../components/FindDoctor";
import ServicesSection from "../../components/ServicesSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import FaqSection from "../../components/FaqSection";
import NewsletterSection from "../../components/NewsletterSection";
import Footer from "../../components/Footer";
import AppointmentForm from "../../components/AppointmentForm";

const Home: React.FC = () => {
  const [showAppointment, setShowAppointment] = useState<boolean>(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative">
          <HeroSection onBookAppointment={() => setShowAppointment(true)} />
          {showAppointment && (
            <div className="absolute top-20 right-10 md:right-24 lg:right-32 z-10">
              <AppointmentForm onClose={() => setShowAppointment(false)} />
            </div>
          )}
        </div>
        <FindDoctor />
        <ServicesSection />
        <TestimonialsSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
