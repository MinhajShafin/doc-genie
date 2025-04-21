import React from "react";

interface TestimonialCardProps {
  rating: number;
  text: string;
  avatarSrc: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  text,
  avatarSrc,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 mb-4">{text}</p>
      <div className="flex justify-center">
        <img
          src={avatarSrc}
          alt="Customer"
          className="h-12 w-12 rounded-full object-cover border-2 border-teal-600"
        />
      </div>
    </div>
  );
};
const demoAvatar =
  "https://cdn-icons-png.freepik.com/256/7606/7606411.png?ga=GA1.1.1582286847.1745247463&semt=ais_hybrid";
const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-600 mb-4">
            What our customers say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            rating={4}
            text="Slate helps you see how many more days you need to work to reach your financial goal."
            avatarSrc={demoAvatar}
          />
          <TestimonialCard
            rating={4}
            text="Slate helps you see how many more days you need to work to reach your financial goal."
            avatarSrc={demoAvatar}
          />
          <TestimonialCard
            rating={4}
            text="Slate helps you see how many more days you need to work to reach your financial goal."
            avatarSrc={demoAvatar}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
