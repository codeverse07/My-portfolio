"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, User, MessageSquare, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sendEmail } from "@/app/actions/sendEmail";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(10, "invalid phone number please enter valid phone number").optional(),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showOtherSubject, setShowOtherSubject] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "",
    }
  });

  const subjectOptions = ["Collaborate", "Hire Me", "Inquiry", "Project Talks", "Others"];

  const handleSubjectSelect = (option: string) => {
    setSelectedSubject(option);
    if (option === "Others") {
      setShowOtherSubject(true);
      setValue("subject", "");
    } else {
      setShowOtherSubject(false);
      setValue("subject", option);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await sendEmail(data);
      if (result.success) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Email submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-transparent z-20 overflow-hidden snap-start">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Contact Info Side */}
          <div className="w-full lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black mb-10 tracking-tighter text-white uppercase"
            >
              Let's <span className="text-neon-lime block">Connect.</span>
            </motion.h2>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group"
              >
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-neon-lime group-hover:bg-neon-lime group-hover:text-black transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Email Me</h4>
                  <p className="text-lg font-bold text-white break-all">work.sachiin@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-neon-lime group-hover:bg-neon-lime group-hover:text-black transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Call Me</h4>
                  <p className="text-lg font-bold text-white">+91 8976110774</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links placeholder */}
            <div className="mt-16 pt-16 border-t border-white/5">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6">Social Networks</p>
              <div className="flex gap-6">
                {[
                  { name: 'LinkedIn', icon: <Mail size={16} />, href: 'https://linkedin.com/in/sachin-kumar-jha-devs07' },
                  { name: 'Github', icon: <User size={16} />, href: 'https://github.com/codeverse07' },
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-neon-lime transition-colors group"
                  >
                    <span className="p-2 rounded-lg bg-white/5 group-hover:bg-neon-lime/10 transition-colors">
                      {social.name === 'LinkedIn' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>}
                    </span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 glass-ultra p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-lime/10 blur-[120px] pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2 ml-1">
                    <User size={12} /> Your Name
                  </label>
                  <input
                    {...register("name")}
                    placeholder="eg.Sachin Kumar"
                    className={`w-full bg-white/5 border ${errors.name ? 'border-coral/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-neon-lime transition-colors`}
                  />
                  {errors.name && <p className="text-coral text-[10px] font-bold uppercase ml-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2 ml-1">
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    {...register("email")}
                    placeholder="hello@example.com"
                    className={`w-full bg-white/5 border ${errors.email ? 'border-coral/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-neon-lime transition-colors`}
                  />
                  {errors.email && <p className="text-coral text-[10px] font-bold uppercase ml-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2 ml-1">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="9110052021"
                    className={`w-full bg-white/5 border ${errors.phone ? 'border-coral/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-neon-lime transition-colors`}
                  />
                  {errors.phone && <p className="text-coral text-[10px] font-bold uppercase ml-1">{errors.phone.message}</p>}
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2 ml-1">
                    <MessageSquare size={12} /> Select Subject
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {subjectOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSubjectSelect(option)}
                        className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                          selectedSubject === option 
                            ? 'bg-white/10 text-neon-lime border-neon-lime shadow-[0_0_20px_rgba(205,255,0,0.4)] scale-105' 
                            : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {showOtherSubject && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          {...register("subject")}
                          placeholder="Please specify your subject..."
                          className={`w-full bg-white/5 border ${errors.subject ? 'border-coral/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-neon-lime transition-colors mt-2`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.subject && <p className="text-coral text-[10px] font-bold uppercase ml-1">{errors.subject.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/50 flex items-center gap-2 ml-1">
                  <MessageSquare size={12} /> Your Message
                </label>
                <textarea
                  {...register("message")}
                  rows={6}
                  placeholder="Tell me about your amazing project..."
                  className={`w-full bg-white/5 border ${errors.message ? 'border-coral/50' : 'border-white/10'} rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-neon-lime transition-colors resize-none`}
                />
                {errors.message && <p className="text-coral text-[10px] font-bold uppercase ml-1">{errors.message.message}</p>}
              </div>

              <div className="pt-4 flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  type="submit"
                  style={{ backgroundColor: '#CDFF00', color: '#000000' }}
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] flex justify-center items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(205,255,0,0.6)]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> 
                      <span style={{ color: '#000000', fontWeight: 900 }}>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} color="#000000" /> 
                      <span style={{ color: '#000000', fontWeight: 900 }}>DEPLOY MESSAGE</span>
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex items-center gap-2 text-neon-lime font-bold uppercase text-xs tracking-widest"
                    >
                      <CheckCircle size={16} /> Transmission Successful. I'll get back to you soon!
                    </motion.div>
                  )}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex items-center gap-2 text-coral font-bold uppercase text-xs tracking-widest"
                    >
                      <AlertCircle size={16} /> Connection failed. Please try again or email directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Catchy Signature - Outside the card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 text-center group cursor-default select-none"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 transition-all duration-700">
            <span className="font-outfit text-sm md:text-lg uppercase tracking-[0.4em] text-white/40">Designed</span>
            <span className="font-dancing-script text-3xl md:text-5xl text-accent-orange drop-shadow-[0_0_15px_rgba(255,107,53,0.6)] md:text-white/30 md:drop-shadow-none md:group-hover:text-accent-orange md:group-hover:drop-shadow-[0_0_20px_rgba(255,107,53,0.8)] transition-all duration-700">
              with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block">love 🥰</motion.span>
            </span>
            <span className="font-outfit text-sm md:text-lg uppercase tracking-[0.4em] text-white/40">from</span>
            <span className="font-dancing-script text-4xl md:text-6xl text-accent-sky drop-shadow-[0_0_15px_rgba(14,165,233,0.6)] md:text-white/50 md:drop-shadow-none md:group-hover:text-accent-sky md:group-hover:drop-shadow-[0_0_25px_rgba(14,165,233,0.8)] transition-all duration-700">
              Sachin !!
            </span>
          </div>
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-accent-sky/50 to-transparent mx-auto mt-6 md:via-white/10 md:group-hover:via-accent-sky/50 transition-all duration-700 shadow-[0_0_15px_rgba(14,165,233,0.3)]" />
        </motion.div>
      </div>
    </section>
  );
};
