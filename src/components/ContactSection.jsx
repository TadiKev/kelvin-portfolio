
// src/components/ContactSection.jsx
import React, { useRef, useState, useEffect } from "react";
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
 * ContactSection — Formspree integration (Vite) + react-toastify + in-page modals
 *
 * - Uses import.meta.env.VITE_PUBLIC_FORMSPREE_URL for Vite.
 * - Keeps honeypot "hp" for spam protection, validations and accessibility.
 * - Adds Booking + Pricing modals (polished experience).
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

  // modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

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

  // --- Modal helpers ---

  // open Calendly in a centered popup window
  const openCalendlyPopup = (url) => {
    try {
      const w = 900, h = 700;
      const left = window.screenX + Math.max(0, Math.floor((window.outerWidth - w) / 2));
      const top = window.screenY + Math.max(0, Math.floor((window.outerHeight - h) / 2));
      window.open(url, "calendlyPopup", `width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`);
    } catch (e) {
      // fallback to new tab
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Request by email — close modal, prefill message and focus form
  const requestByEmail = () => {
    setShowBookingModal(false);
    setForm((p) => ({
      ...p,
      message: "I'd like to book a 15-minute consult. My preferred times are: \n\n(1) \n(2) \n(3) ",
    }));
    // small timeout to ensure DOM updated, then focus name input
    setTimeout(() => {
      const el = document.querySelector("#name");
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  // basic escape key handling to close modals
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (showBookingModal) setShowBookingModal(false);
        if (showPricingModal) setShowPricingModal(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showBookingModal, showPricingModal]);

  // focus first actionable element when modal opens
  useEffect(() => {
    if (showBookingModal) {
      setTimeout(() => {
        const primary = document.querySelector("#booking-open-calendly");
        primary?.focus();
      }, 40);
    }
    if (showPricingModal) {
      setTimeout(() => {
        const firstSelect = document.querySelector("#pricing-first-select");
        firstSelect?.focus();
      }, 40);
    }
  }, [showBookingModal, showPricingModal]);

  // sample package data (editable)
  const packages = [
    { id: "basic", title: "Basic", price: "$150", bullets: ["15-minute consult", "Project scoping"] },
    { id: "pro", title: "Pro", price: "$400", bullets: ["1-2 week build", "2 revisions", "Support"] },
    { id: "custom", title: "Custom", price: "Contact", bullets: ["Tailored solution", "Custom quote"] },
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-background">
      {/* Toast container (keeps toasts self-contained in this component) */}
      <ToastContainer />

      {/* Booking Modal */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book a free consult"
        >
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full p-6 shadow-lg">
            <h4 className="text-lg font-semibold mb-2">Book a free 15-minute consult</h4>
            <p className="text-sm text-muted-foreground mb-4">Choose an option</p>
            <div className="flex gap-3">
              <button
                id="booking-open-calendly"
                onClick={() => openCalendlyPopup(calendly)}
                className="flex-1 px-4 py-2 rounded bg-primary text-white"
              >
                Open Calendly
              </button>
              <button
                onClick={requestByEmail}
                className="flex-1 px-4 py-2 rounded border"
              >
                Request by email
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                aria-label="Close booking modal"
                onClick={() => setShowBookingModal(false)}
                className="text-sm text-muted-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Packages and pricing"
        >
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-3xl w-full p-6 shadow-lg">
            <h4 className="text-lg font-semibold mb-4">Packages & Pricing</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((pkg, idx) => (
                <div key={pkg.id} className="p-4 border rounded flex flex-col">
                  <h5 className="font-semibold">{pkg.title}</h5>
                  <div className="text-xl font-bold mb-2">{pkg.price}</div>
                  <ul className="mb-4 text-sm space-y-1 flex-1">
                    {pkg.bullets.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <a
                      id={idx === 0 ? "pricing-first-select" : undefined}
                      href={pkg.id === "custom" ? pricing : "#"}
                      onClick={(e) => {
                        if (pkg.id === "custom") {
                          // navigate to pricing page (if you'd like)
                          setShowPricingModal(false);
                        } else {
                          // for demo, close modal and prefill contact form for selection
                          e.preventDefault();
                          setShowPricingModal(false);
                          setForm((p) => ({
                            ...p,
                            message: `I'm interested in the "${pkg.title}" package. Please get in touch.`,
                          }));
                          setTimeout(() => {
                            document.querySelector("#name")?.focus();
                          }, 80);
                        }
                      }}
                      className="px-3 py-2 rounded bg-primary text-white"
                    >
                      {pkg.id === "custom" ? "Contact" : "Select"}
                    </a>

                    <a
                      href={pkg.price === "$400" ? "#" : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded border"
                    >
                      Pay (optional)
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button aria-label="Close pricing modal" onClick={() => setShowPricingModal(false)} className="text-sm text-muted-foreground">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have a project or want to collaborate? Book a free 15-minute call or send a quick message below.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            type="button"
            onClick={() => setShowBookingModal(true)}
            className="px-5 py-3 rounded-md bg-primary text-white font-medium hover:opacity-95 transition-shadow shadow-md"
          >
            Book a free consult
          </button>

          <button
            type="button"
            onClick={() => setShowPricingModal(true)}
            className="px-5 py-3 rounded-md border border-primary text-primary hover:bg-primary/5 transition"
          >
            Packages & Pricing
          </button>
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