const NewsLetter = () => {
  return (
    <div className="my-16">
      <div className="newsletter-section h-96">
        <div className="overlay flex justify-center items-center">
          <div className="text-center space-y-3">
            <h3 className="text-white font-extrabold uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              do you need more tips
            </h3>
            <p className="text-white font-bold capitalize text-base">
              sign up free and get the latest tips
            </p>
            <div className="flex">
              <input
                type="email"
                name=""
                id=""
                className="px-8 py-3 border border-gray-400 rounded-l-full w-full"
                placeholder="Your Email..."
              />
              <button className="bg-[#1CB803] px-8 text-white rounded-full -ml-6">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
