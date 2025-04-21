import React from "react";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-teal-600 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href="#"
          className="text-teal-600 font-medium flex items-center hover:text-teal-700"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};
const img =
  "https://img.pikbest.com/png-images/20241019/doctor-logo-vector-icon-illustration_10974092.png!sw800";
const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 1,
      imageSrc: img,
      title: "Dental treatments",
      description:
        "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    },
    {
      id: 2,
      imageSrc: img,
      title: "Bones treatments",
      description:
        "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    },
    {
      id: 3,
      imageSrc: img,
      title: "Diagnosis",
      description:
        "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    },
    {
      id: 4,
      imageSrc: img,
      title: "Cardiology",
      description:
        "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    },
    {
      id: 5,
      imageSrc: img,
      title: "Surgery",
      description:
        "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    },
    {
      id: 6,
      imageSrc: img,
      title: "Eye care",
      description:
        "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm.",
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-600 mb-4">
            Services we provide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar
            elementum tempus hac tellus libero accumsan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              imageSrc={service.imageSrc}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
