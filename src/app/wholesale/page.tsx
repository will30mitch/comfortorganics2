export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 py-8 px-2 sm:py-12 sm:px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl shadow-lg mb-8 p-4 sm:p-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">Wholesale Inquiries</h1>
        <p className="text-lg sm:text-xl text-white text-center font-light">For B2B purchases, please fill out the form below and our team will contact you soon.</p>
      </div>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow p-4 sm:p-8 border-t-4 border-yellow-500 mb-8">
        <form className="flex flex-col gap-3 sm:gap-4">
          <input type="text" placeholder="Your Name" className="border rounded p-2 text-black text-sm sm:text-base" required />
          <input type="text" placeholder="Business Name" className="border rounded p-2 text-black text-sm sm:text-base" required />
          <input type="email" placeholder="Your Email" className="border rounded p-2 text-black text-sm sm:text-base" required />
          <input type="tel" placeholder="Phone Number" className="border rounded p-2 text-black text-sm sm:text-base" required />
          <button type="submit" className="bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 transition text-sm sm:text-base">Submit</button>
        </form>
      </div>
    </div>
  );
} 