import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const SideBar = ({ selectedUser, serSelectedUser }) => {
  const Navigate = useNavigate();
  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="menu" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="logo"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#edf4f6] border border-gray-600 hidden group-hover:block">
              <p
                onClick={() => Navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm">Logout</p>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-[#edf4f6] flex items-center gap-2 py-3 px-4 mt-5">
          <img
            src={assets.search_icon}
            alt="search"
            className="w-6 bg-slate-500 rounded-full px-1 py-1 "
          />
          <input
            type="text"
            className="border-none outline-none text-base flex-1"
            placeholder="Search user.."
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
