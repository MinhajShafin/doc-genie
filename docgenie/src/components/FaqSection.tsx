import React, { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-teal-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-medium ml-2">{question}</h3>
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 pl-7 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqSection: React.FC = () => {
  const faqs = [
    {
      id: 1,
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Things on a very small scale behave like nothing you have any direct experience about.",
    },
    {
      id: 2,
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Things on a very small scale behave like nothing you have any direct experience about.",
    },
    {
      id: 3,
      question: "the quick fox jumps over the lazy dog",
      answer:
        "Things on a very small scale behave like nothing you have any direct experience about.",
    },
    {
      id: 4,
      question: "the quick fox jumps over the lazy dog",
      answer: "Things on a very small scale behave like nothing",
    },
    {
      id: 5,
      question: "the quick fox jumps over the lazy dog",
      answer: "Things on a very small scale behave like nothing",
    },
    {
      id: 6,
      question: "the quick fox jumps over the lazy dog",
      answer: "Things on a very small scale behave like nothing",
    },
    {
      id: 7,
      question: "the quick fox jumps over the lazy dog",
      answer: "Things on a very small scale behave like nothing",
    },
    {
      id: 8,
      question: "the quick fox jumps over the lazy dog",
      answer: "Things on a very small scale behave like nothing",
    },
    {
      id: 9,
      question: "the quick fox jumps over the lazy dog",
      answer: "Things on a very small scale behave like nothing",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">FAQ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Problems trying to resolve the conflict between
            <br />
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
