export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 py-8 px-2 sm:py-12 sm:px-4 flex flex-col items-center">
      {/* Main Header */}
      <div className="w-full max-w-6xl bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg mb-8 p-4 sm:p-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">About Comfort Organics</h1>
        <p className="text-lg sm:text-2xl text-white text-center mb-2 font-light">Our mission is to provide high-quality hemp products for your well-being</p>
      </div>

      {/* Mission Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-4 sm:p-8 mb-8 border-t-4 border-green-500">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-4 text-center">Our Mission</h2>
        <p className="mb-4 text-gray-800 text-center text-sm sm:text-base">At Comfort Organics, we believe in the power of nature to enhance your well-being. Our mission is to provide high-quality, organic hemp products that promote relaxation, creativity, and overall wellness. We are committed to sourcing the finest ingredients and using sustainable practices throughout our production process.</p>
        <p className="mb-4 text-gray-800 text-center text-sm sm:text-base">Founded in 2020, Comfort Organics has grown from a small local business to a trusted name in the hemp industry. Our team of experts includes botanists, chemists, and wellness professionals who work together to create products that meet our high standards for quality and effectiveness.</p>
      </div>

      {/* Values Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-4 sm:p-8 mb-8 border-t-4 border-green-400">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-700 mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col items-center bg-green-50 rounded-xl p-6 shadow-sm">
            <span className="text-4xl mb-2">🌱</span>
            <div className="text-lg font-bold text-green-700 mb-1">Quality</div>
            <div className="text-gray-700 text-center text-sm">We never compromise on the quality of our products, using only the finest organic ingredients.</div>
          </div>
          <div className="flex flex-col items-center bg-green-50 rounded-xl p-6 shadow-sm">
            <span className="text-4xl mb-2">♻️</span>
            <div className="text-lg font-bold text-green-700 mb-1">Sustainability</div>
            <div className="text-gray-700 text-center text-sm">We are committed to environmentally friendly practices throughout our production process.</div>
          </div>
          <div className="flex flex-col items-center bg-green-50 rounded-xl p-6 shadow-sm">
            <span className="text-4xl mb-2">🔬</span>
            <div className="text-lg font-bold text-green-700 mb-1">Innovation</div>
            <div className="text-gray-700 text-center text-sm">We continuously research and develop new products to meet our customers' evolving needs.</div>
          </div>
          <div className="flex flex-col items-center bg-green-50 rounded-xl p-6 shadow-sm">
            <span className="text-4xl mb-2">🤝</span>
            <div className="text-lg font-bold text-green-700 mb-1">Community</div>
            <div className="text-gray-700 text-center text-sm">We believe in giving back to our community and supporting local initiatives.</div>
          </div>
        </div>
      </div>

      {/* Important Information Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-4 sm:p-8 border-t-4 border-yellow-500 mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-700 mb-6 text-center">Important Information</h2>
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
            <div className="font-bold text-yellow-700 mb-1">Age Restriction</div>
            <div className="text-gray-700 text-sm">You must be 21 years or older to purchase our products. We will verify your age at checkout.</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
            <div className="font-bold text-yellow-700 mb-1">Health Warning</div>
            <div className="text-gray-700 text-sm">Hemp products may cause impairment and should be used responsibly. Do not operate a vehicle or machinery under the influence of hemp. Hemp use may be habit-forming.</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
            <div className="font-bold text-yellow-700 mb-1">Medical Disclaimer</div>
            <div className="text-gray-700 text-sm">These statements have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before using our products, especially if you are pregnant, nursing, or have a medical condition.</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
            <div className="font-bold text-yellow-700 mb-1">Legal Compliance</div>
            <div className="text-gray-700 text-sm">Our products are intended for use only in jurisdictions where hemp is legal. It is your responsibility to ensure compliance with local laws and regulations.</div>
          </div>
        </div>
      </div>
    </div>
  );
} 