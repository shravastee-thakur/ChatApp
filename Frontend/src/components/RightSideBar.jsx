import assets, { imagesDummyData } from "../assets/assets";

const RightSideBar = ({ selectedUser }) => {
  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="pt-10 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            className="w-20 aspect-[1/1] rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2 text-white">
            <p className="w-2 h-2 rounded-full bg-green-500"></p>
            {selectedUser.fullName}
          </h1>
          <p className="text-white px-10 mx-auto">{selectedUser.bio}</p>
        </div>

        <hr className="border-[ffffff50] my-3 text-[#8185B2]" />

        <div className="px-5 text-xs">
          <p className="text-[#8185B2]">Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-2 opacity-80">
            {imagesDummyData.map((url, index) => {
              return (
                <div
                  key={index}
                  onClick={() => window.open(url)}
                  className="cursor-pointer rounded"
                >
                  <img src={url} className="h-full rounded-md" />
                </div>
              );
            })}
          </div>
        </div>

        <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-sky-300 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer">
          Logout
        </button>
      </div>
    )
  );
};

export default RightSideBar;
