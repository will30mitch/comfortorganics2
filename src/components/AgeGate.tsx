"use client";
import { useEffect, useState } from "react";

export default function AgeGate() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const verified = localStorage.getItem("age_verified");
      if (!verified) setShow(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem("age_verified", "true");
    setShow(false);
  };
  const handleNo = () => {
    setDenied(true);
  };

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Are you 21 years of age or older?</h2>
        {!denied ? (
          <>
            <div className="flex gap-6 mt-4">
              <button
                className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition"
                onClick={handleYes}
              >
                Yes, I am 21+
              </button>
              <button
                className="bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded hover:bg-gray-400 transition"
                onClick={handleNo}
              >
                No
              </button>
            </div>
          </>
        ) : (
          <div className="text-red-600 font-semibold text-center mt-4">
            Sorry, you must be 21 or older to enter this site.
          </div>
        )}
      </div>
    </div>
  );
} 