// src/components/ContactSection.jsx
import React, { useRef, useState } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
// react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * ContactSection — Formspree integration (Vite) + react-toastify
 *
 * - Uses import.meta.env.VITE_PUBLIC_FORMSPREE_URL for Vite.
 * - Keeps honeypot "hp" for spam protection, validations and accessibility.
 */
export const ContactSection = ({
  email = "machakakelvin903@gmail.com",
  phone = "+263781255971",
  location = "Zimre Park, Harare, Zimbabwe",
  calendly = "https://calendly.com/your-calendly",
  pricing = "/pricing",
  social = {
    linkedin: "#",
    twitter: "#",
    instagram: "#",
    twitch: "#",
  },
}) => {
  const [form, setForm] = useState({ name: "", email: "", message: "", hp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const statusRef = useRef(null);

  // Vite env (fallback to your form id)
  const FORMSPREE_URL = import.meta?.env?.VITE_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/mqawazjk";

  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").toLowerCase());
  const isMessageLongEnough = (s) => (s || "").trim().length >= 10;
  const canSubmit = () =>
    !isSubmitting && form.name.trim() && isValidEmail(form.email) && isMessageLongEnough(form.message) && !form.hp;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () => setForm({ name: "", email: "", message: "", hp: "" });

  const showSuccessToast = () => {
    toast.dismiss();
    toast.success("Message sent — I’ll reply within 1 business day.", {
      position: "top-right",
      autoClose: 4000,
      pauseOnHover: true,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  };

  const showErrorToast = (msg = "Something went wrong — try again later or email me directly.") => {
    toast.dismiss();
    toast.error(msg, {
      position: "top-right",
      autoClose: 6000,
      pauseOnHover: true,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot — silent drop
    if (form.hp) return;

    if (!isValidEmail(form.email)) {
      showErrorToast("Please enter a valid email address.");
      statusRef.current?.focus?.();
      return;
    }
    if (!isMessageLongEnough(form.message)) {
      showErrorToast("Please include at least 10 characters in your message.");
      statusRef.current?.focus?.();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _replyto: form.email.trim(),
          hp: form.hp,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        // prefer server message if provided
        throw new Error(body.error || body.message || "Failed to send message");
      }

      showSuccessToast();
      resetForm();
      setTimeout(() => statusRef.current?.focus?.(), 50);
    } catch (err) {
      console.error("Contact send error:", err);
      showErrorToast(typeof err === "string" ? err : err.message);
      statusRef.current?.focus?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-background">
      {/* Toast container (keeps toasts self-contained in this component) */}
      <ToastContainer />

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have a project or want to collaborate? Book a free 15-minute call or send a quick message below.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href={calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-md bg-primary text-white font-medium hover:opacity-95 transition-shadow shadow-md"
          >
            Book a free consult
          </a>

          <a
            href={pricing}
            className="px-5 py-3 rounded-md border border-primary text-primary hover:bg-primary/5 transition"
          >
            Packages & Pricing
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <aside className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href={`tel:${phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">{location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Connect</h4>
              <div className="flex items-center gap-4">
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
                  <Linkedin />
                </a>
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                  <Twitter />
                </a>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                  <Instagram />
                </a>
                <a href={social.twitch} target="_blank" rel="noopener noreferrer" aria-label="Twitch" className="text-muted-foreground hover:text-primary">
                  <Twitch />
                </a>
              </div>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              <p><strong>Quick note:</strong> I reply within 24 hours on business days. For urgent requests, call or WhatsApp.</p>
            </div>
          </aside>

          {/* Form */}
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <label htmlFor="hp" className="sr-only">Leave this field empty</label>
              <input
                id="hp"
                name="hp"
                type="text"
                value={form.hp}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="youremail@example.com"
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={6}
                  placeholder="Hi Kelvin — I'd like to talk about..."
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              <div aria-live="polite" className="sr-only" tabIndex={-1} ref={statusRef} />

              <button
                type="submit"
                disabled={!canSubmit()}
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition",
                  !canSubmit()
                    ? "bg-primary/40 text-white cursor-not-allowed"
                    : "bg-primary text-white hover:shadow-lg"
                )}
                aria-disabled={!canSubmit()}
              >
                {isSubmitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
