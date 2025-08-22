import React, { useState } from "react";
import { Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate sending (replace with your API/email logic)
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto border border-gray-200 rounded-2xl shadow-lg bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-5 text-lg font-semibold rounded-t-2xl shadow-md">
        Contact Us
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 py-8 bg-gray-100">
        {sent ? (
          <div className="text-center text-green-600 text-lg font-medium">
            Thank you for reaching out!<br />We’ll get back to you soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 bg-white rounded-xl shadow px-6 py-7 border border-gray-200"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !form.name || !form.email || !form.message}
              className={`flex items-center justify-center gap-2 rounded-full px-6 py-2 font-semibold text-white transition ${
                submitting || !form.name || !form.email || !form.message
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {submitting ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Contact;