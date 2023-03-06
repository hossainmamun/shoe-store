import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const TopHeader = () => {
  return (
    <div className="bg-[#1CB803]">
      <div className="top-header  py-3 flex justify-between items-center mx-8 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-56">
        <div className="text-white sm:flex items-center sm:space-x-8">
          <p>+8801624541458</p>
          <p>info.shoeShop.net</p>
        </div>

        <div className="flex justify-end items-center space-x-3">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white text-xl hover:text-black" />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white text-xl hover:text-black" />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white text-xl hover:text-black" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
