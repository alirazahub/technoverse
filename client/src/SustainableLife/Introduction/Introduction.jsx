import React from "react";
import bck from "../../../public/hands-6135743_1920.jpg"; // Adjust the path as needed

const Introduction = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center "
      style={{
        backgroundImage: `url(${bck})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">
          Introduction to Sustainable Life
        </h1>
        <p className="text-md mb-2">
          Welcome to the world of sustainable living! Our goal is to guide you
          through various practices that help reduce environmental impact and
          promote a healthier planet.
        </p>
        <p className="text-md mb-2">
          Sustainable living involves making conscious choices to minimize
          waste, conserve energy, and use resources more efficiently. By
          adopting sustainable practices, we can preserve natural resources for
          future generations.
        </p>
        <p className="text-md">
          Join us on this journey towards a more sustainable future, where every
          small step contributes to a larger positive impact on our environment.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
