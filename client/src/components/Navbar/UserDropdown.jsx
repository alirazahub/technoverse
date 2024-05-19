import React from "react";
import { Dropdown, notification } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../auth/UserContext";
import server from "../../utils/server";

const UserDropdown = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["x-auth-token"]);
  const handleLogout = () => {
    removeCookie("x-auth-token");
    notification.success({
      message: "Success",
      description: "Logged out successfully",
    });
    updateUser(null);
    navigate("/login");
  };
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    navigate("/profile");
  };
  const items = [
    {
      key: "1",
      label: (
        <div>
          <Link href="/profile">
            <div className="flex">
              {!user?.profileImage ? (
                <img
                  src="/user.jpg"
                  width={50}
                  height={50}
                  className="object-cover rounded-full"
                />
              ) : (
                <img
                  src={`${server}/images/${user?.profileImage}`}
                  width={50}
                  height={50}
                  className="object-cover rounded-full"
                />
              )}
              <div className="ml-3">
                <p className="text-md font-semibold text-black">
                  {user?.fName} {user?.lName}
                </p>
                <p className="text-[12px] text-gray-500">{user?.userName}</p>
              </div>
            </div>
            <button
              onClick={handleClick}
              className=" my-2 border border-solid text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-all w-full px-5 py-1 rounded-full font-bold"
            >
              View Profile
            </button>
          </Link>

          <div className="mt-2 flex flex-col">
            <h3 className="font-bold">Manage</h3>
            <Link
              to={"/followers"}
              className="text-gray-500 text-sm my-1 hover:underline"
            >
              Followers
            </Link>
            <Link
              to={"/following"}
              className="text-gray-500 text-sm my-1 hover:underline"
            >
              Following
            </Link>
          </div>

          <div>
            <h3
              onClick={handleLogout}
              className="text-gray-500 text-sm hover:underline"
            >
              Sign Out
            </h3>
          </div>
        </div>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
    >
      <button className="text-gray-500">
        {!user?.profileImage ? (
          <img
            src="/user.jpg"
            width={30}
            height={30}
            className="object-cover rounded-full"
          />
        ) : (
          <img
            src={`${server}/images/${user?.profileImage}`}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
        )}
      </button>
    </Dropdown>
  );
};

export default UserDropdown;
