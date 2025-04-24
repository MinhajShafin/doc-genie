import React, { useState } from "react";

const FindDoctor: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    specialty: "",
    available: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search params:", searchParams);
    // Add search logic here
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Find A Doctor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full text-black p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchParams.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                name="specialty"
                placeholder="Speciality"
                className="w-full text-black p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchParams.specialty}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Available</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  className="sr-only peer"
                  checked={searchParams.available}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>

            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-3 rounded font-medium hover:bg-teal-700 transition-colors ml-auto"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FindDoctor;
