import React from "react";
import { Link } from "react-router-dom";
import Introduction from "./Introduction/Introduction";
import { useContext } from "react";
import { LifeContext } from "./LifeContext/Context";

const Main = () => {
  const sections = useContext(LifeContext);
  console.log(sections);

  return (
    <div className="p-6">
      <Introduction />

      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md mb-6 ${
            index % 2 === 0 ? "" : "md:flex-row-reverse"
          }`}
        >
          <img
            src={section.image}
            alt={section.title}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0"
          />
          <div className="md:ml-6 md:mr-6">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              {section.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{section.description}</p>
            <Link
              to={`/life/${section.id}`}
              state={{ section }}
              className="text-blue-500 mt-2 inline-block"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
