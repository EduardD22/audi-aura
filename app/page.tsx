import { Button } from "@/components/ui/button";
import { FaSpotify } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-primary to-secondary dark:from-secondary dark:to-primary">
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="text-center">
          <img
            src="/images/logo.svg"
            alt="AudiAura Logo"
            className="w-64 mx-auto mb-8"
          />

          <p className="text-xl text-white dark:text-text opacity-80">
            Discover your personalized music insights
          </p>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white dark:bg-secondary rounded-lg shadow-lg p-8 bg-glass">
          <h2 className="text-3xl font-bold mb-6 text-primary dark:text-text">
            Connect with Spotify
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Unlock a world of music insights tailored just for you. Connect your
            Spotify account to AudiAura and discover your listening trends,
            favorite artists, and more.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-yellow-500 text-white font-bold rounded-full transition duration-300 ease-in-out flex items-center"
            >
              <FaSpotify className="mr-2" />
              Connect with Spotify
            </Button>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-primary dark:text-text">
              What you'll get:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-accent mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-400">
                  Personalized music dashboard
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-accent mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-400">
                  Detailed listening statistics
                </span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-accent mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700 dark:text-gray-400">
                  Insights on your favorite artists and genres
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
