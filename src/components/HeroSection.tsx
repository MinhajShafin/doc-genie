import React from "react";

interface HeroSectionProps {
  onBookAppointment: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onBookAppointment }) => {
  return (
    <section className="relative ">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Meet the Best Hospital
          </h1>
          <p className="text-white text-lg mb-8">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-teal-600 text-white px-6 py-3 rounded font-medium hover:bg-teal-700">
              Get Quote Now
            </button>
            <button
              className="bg-white bg-opacity-20 text-white px-6 py-3 rounded font-medium hover:bg-opacity-30"
              onClick={onBookAppointment}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 to-blue-900/40"></div>
        <img
          src="https://img.freepik.com/free-vector/hospital-clinic-building-with-ambulance-car-trucks_107791-15733.jpg?ga=GA1.1.1582286847.1745247463&semt=ais_hybrid&w=740"
          alt="Hospital Building"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
