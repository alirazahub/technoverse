import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../auth/UserContext";
import server from "../utils/server";
import { useCookies } from "react-cookie";

const ProfilePage = () => {
  const { user } = useUser();
  const [cookies] = useCookies(["x-auth-token"]);
  const [updatedUser, setUpdatedUser] = useState({
    id: "",
    fName: "",
    lName: "",
    email: "",
    userName: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    about: "",
    country: "",
    city: "",
    interests: "",
  });

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${server}/api/user/profile`,
        updatedUser,
        {
          headers: {
            "x-auth-token": cookies["x-auth-token"],
          },
        }
      );
      setUpdatedUser(data);
      
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="fName"
            value={updatedUser.fName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lName"
            value={updatedUser.lName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="userName"
            value={updatedUser.userName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={updatedUser.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={updatedUser.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={updatedUser.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={updatedUser.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">About</label>
          <textarea
            name="about"
            value={updatedUser.about}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={updatedUser.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={updatedUser.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Interests</label>
          <input
            type="text"
            name="interests"
            value={updatedUser.interests}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Comma separated values"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
