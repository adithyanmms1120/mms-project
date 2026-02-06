import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-2">

        {/* Left Illustration */}
        <div className="flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}404-illustration.jpg`}
            alt="Not Found Illustration"
            className="w-[260px] md:w-[300px] object-contain"
          />
        </div>

        {/* Right Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-black mb-3">
            Ooops...
          </h1>

          <h2 className="text-3xl font-light text-gray-700 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-500 mb-6 max-w-sm">
            Sorry, the content you're looking for doesn't exist. Either it was
            removed, or you mistyped the link.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/", { replace: true })}
            className="rounded-full bg-[#6b2f2f] px-8 py-3 text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
