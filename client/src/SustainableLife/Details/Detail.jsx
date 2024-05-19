import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { LifeContext } from "../LifeContext/Context";

const Detail = () => {
  const { id } = useParams();
  const sections = useContext(LifeContext);
  const section = sections.find((section) => section.id == id);
  console.log(section.paragraphs);

  return (
    <div className="bg-white">
      <div className="relative h-96">
        <img
          src={section.image}
          alt={section.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{section.title}</h1>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <div className="my-6">
          {section.content.map((section, index) => (
            <div key={index} className="my-4">
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-gray-700 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
