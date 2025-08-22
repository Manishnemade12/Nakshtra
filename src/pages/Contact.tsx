import React, { useState } from "react";
import { Send, CheckCircle2, User, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      // Reset after 3 seconds
      setTimeout(() => setSent(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-muted-foreground text-lg">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-glass backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-card animate-slide-up">
          {sent ? (
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2" htmlFor="name">
                  <User className="w-4 h-4 text-primary" />
                  Name
                </label>
                <input
                  className="w-full rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2" htmlFor="email">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="you@example.com"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2" htmlFor="message">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Message
                </label>
                <textarea
                  className="w-full rounded-xl border border-border bg-card/50 backdrop-blur-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth resize-none"
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="How can we help you?"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={submitting || !form.name || !form.email || !form.message}
                variant="modern"
                size="lg"
                className="w-full"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in">
          <p className="text-muted-foreground text-sm">
            Or reach out directly at{" "}
            <a href="mailto:hello@example.com" className="text-primary hover:text-primary-glow transition-smooth">
              hello@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;