export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-yellow-100 py-8 px-2 sm:py-12 sm:px-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-green-500 to-yellow-400 rounded-2xl shadow-lg mb-8 p-4 sm:p-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 text-center drop-shadow-lg">Contact Us</h1>
        <p className="text-lg sm:text-xl text-white text-center font-light">We'd love to hear from you! Reach out with any questions or feedback.</p>
      </div>
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow p-4 sm:p-8 border-t-4 border-green-500 mb-8">
        <div className="mb-6 text-center text-black text-sm sm:text-base">
          <p className="mb-2"><b>Phone:</b> (903) 524-0310</p>
          <p className="mb-2"><b>Best Time to Call:</b> Mon-Fri, 9am - 5pm</p>
          <p className="mb-2"><b>Email:</b> customersupport@comfortorganics.shop</p>
        </div>
        <form className="flex flex-col gap-3 sm:gap-4">
          <input type="text" placeholder="Your Name" className="border rounded p-2 text-black text-sm sm:text-base" required />
          <input type="email" placeholder="Your Email" className="border rounded p-2 text-black text-sm sm:text-base" required />
          <textarea placeholder="Your Message" className="border rounded p-2 text-black text-sm sm:text-base" rows={4} required />
          <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition text-sm sm:text-base">Send Message</button>
        </form>
      </div>
    </div>
  );
} 