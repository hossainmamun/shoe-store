import { FaPhoneAlt, FaMapMarkerAlt, FaFax } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="pt-16 pb-4">
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-8 sm:mx-12 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-56">
        <div className="shadow-md p-8 text-center space-y-3">
          <div className="flex justify-center w-14 h-14 border-2 border-[#1CB803] rounded-full m-auto">
            <FaPhoneAlt className="m-auto text-[#1CB803]" />
          </div>
          <p className="font-bold capitalize text-base md:text-lg lg:text-xl">
            call us 24x7
          </p>
          <span className="font-semibold block text-base md:text-lg lg:text-xl">
            +88 01236574584
          </span>
        </div>

        <div className="shadow-md p-8 text-center space-y-3">
          <div className="flex justify-center w-14 h-14 border-2 border-[#1CB803] rounded-full m-auto">
            <FaMapMarkerAlt className="m-auto text-[#1CB803]" />
          </div>
          <p className="font-bold capitalize text-base md:text-lg lg:text-xl">
            headquarter
          </p>
          <span className="capitalize font-semibold block text-base md:text-lg lg:text-xl">
            barkley, california, USA
          </span>
        </div>

        <div className="shadow-md p-8 text-center space-y-3">
          <div className="flex justify-center w-14 h-14 border-2 border-[#1CB803] rounded-full m-auto">
            <FaFax className="m-auto text-[#1CB803]" />
          </div>
          <p className="font-bold capitalize text-base md:text-lg lg:text-xl">
            fax
          </p>
          <span className="font-semibold block text-base md:text-lg lg:text-xl">
            +88 01236574584
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
