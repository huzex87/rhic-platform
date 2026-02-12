"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Globe, MapPin, Handshake, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative px-4 overflow-hidden pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-leaf/20"
            >
              <span className="w-2 h-2 rounded-full bg-leaf animate-pulse shrink-0" />
              <span className="text-[10px] md:text-xs font-black text-forest tracking-[0.2em] uppercase">
                The Official Digital Movement
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-forest leading-[0.95] tracking-tighter mb-8"
            >
              Renewed Hope <br />
              <span className="text-leaf italic decoration-accent-red underline underline-offset-8">Innovators</span> Hub
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl text-xl text-forest/70 font-medium leading-relaxed mb-12 border-l-4 border-leaf pl-6"
            >
              Directly aligned with the vision of <strong>President Bola Ahmed Tinubu</strong>,
              we are building the technological infrastructure for a prosperous,
              innovation-led Nigeria.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link
                href="/auth"
                className="forest-gradient text-ivory px-10 py-5 rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(0,51,0,0.3)] hover:scale-105 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                Join the Vanguard
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/innovation"
                className="bg-ivory/50 backdrop-blur-md text-forest px-10 py-5 rounded-2xl font-bold text-lg hover:bg-forest/5 transition-all border-2 border-forest/10 w-full sm:w-auto justify-center text-center"
              >
                Strategy Console
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-[8px] border-ivory/50 shadow-2xl skew-y-1 group-hover:skew-y-0 transition-transform duration-700">
                <Image
                  src="/president-tinubu.png"
                  alt="President Bola Ahmed Tinubu"
                  width={600}
                  height={700}
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-60" />

                {/* Overlay Quote */}
                <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-ivory/20 backdrop-blur-xl">
                  <p className="text-ivory font-display font-bold italic text-lg leading-tight mb-2">
                    &ldquo;Hope renewed is not just a slogan; it is our national mandate.&rdquo;
                  </p>
                  <p className="text-leaf font-black text-[10px] uppercase tracking-[0.3em]">
                    President Bola Ahmed Tinubu
                  </p>
                </div>
              </div>

              {/* Decorative Effects */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-leaf/20 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent-red/10 rounded-full blur-3xl -z-10 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Quick View */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Members", value: "250K+", icon: Users },
            { label: "State Chapters", value: "36+1", icon: Globe },
            { label: "Innovations Built", value: "1.2K+", icon: Rocket },
            { label: "Missions Done", value: "500K+", icon: Star },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="premium-card text-center flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 bg-forest/5 rounded-2xl flex items-center justify-center">
                <stat.icon className="text-leaf w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-display font-black text-forest">{stat.value}</div>
                <div className="text-xs font-bold text-forest/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nationwide Presence — Map Section */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-leaf/20 mb-6">
              <MapPin className="w-4 h-4 text-leaf" />
              <span className="text-[10px] font-black text-forest tracking-[0.2em] uppercase">Nationwide Presence</span>
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-forest tracking-tight mb-4">
              Across Every <span className="text-leaf">State</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-forest/60 font-medium">
              The Renewed Hope Innovators Coalition is active in all 36 states and the FCT, driving grassroots technology adoption and innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-[2rem] overflow-hidden border border-forest/10 shadow-2xl bg-white/60 backdrop-blur-xl"
          >
            {/* Map Container */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16319028.443!2d1.3847893!3d9.0820163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x99a8fe4f20b9bec!2sNigeria!5e0!3m2!1sen!2sng!4v1707753600000!5m2!1sen!2sng"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RHIC chapters across Nigeria"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/40 via-transparent to-transparent" />
            </div>

            {/* Map Legend Bar */}
            <div className="px-6 py-5 md:px-10 md:py-6 bg-white/80 backdrop-blur-md border-t border-forest/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-8 flex-wrap justify-center">
                {[
                  { color: "bg-forest", label: "HQ — Abuja FCT" },
                  { color: "bg-leaf", label: "Active State Chapters" },
                  { color: "bg-accent-red", label: "Innovation Hubs" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-xs font-bold text-forest/60 uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm font-display font-bold text-forest/80">
                37 Active Zones
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join the Movement — CTA Card */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden"
          >
            {/* Background with dual gradient */}
            <div className="absolute inset-0 forest-gradient" />
            <div className="absolute inset-0 bg-[url('/president-tinubu.png')] bg-cover bg-center opacity-[0.06]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-leaf/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-red/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-24">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ivory/10 border border-ivory/20 mb-8"
                  >
                    <Handshake className="w-4 h-4 text-leaf" />
                    <span className="text-[10px] font-black text-ivory/80 tracking-[0.2em] uppercase">
                      Be Part Of History
                    </span>
                  </motion.div>

                  <h2 className="text-4xl md:text-6xl font-display font-black text-ivory leading-[1.05] tracking-tight mb-6">
                    Join the <span className="text-leaf">Movement</span>
                  </h2>
                  <p className="max-w-xl text-lg text-ivory/70 font-medium leading-relaxed mb-10">
                    Whether you&apos;re a developer, designer, strategist, or community leader — there&apos;s a place for you in the Renewed Hope Innovators Coalition. Together, we build the Nigeria of tomorrow.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      href="/auth"
                      className="group bg-ivory text-forest px-10 py-5 rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
                    >
                      Register Now
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/chapter"
                      className="bg-ivory/10 backdrop-blur-md text-ivory px-10 py-5 rounded-2xl font-bold text-lg hover:bg-ivory/20 transition-all border border-ivory/20 w-full sm:w-auto justify-center text-center"
                    >
                      Find Your Chapter
                    </Link>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="flex-1 w-full max-w-md">
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: Rocket, title: "Launch Innovations", desc: "Build impactful projects with national support" },
                      { icon: Users, title: "Connect With Leaders", desc: "Network with innovators across all 36+1 states" },
                      { icon: Globe, title: "National Impact", desc: "Scale your solutions from local to nationwide" },
                      { icon: Star, title: "Recognition & Growth", desc: "Earn certifications and climb the mobility ladder" },
                    ].map((feature, idx) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
                        className="flex items-center gap-5 p-5 rounded-2xl bg-ivory/10 backdrop-blur-md border border-ivory/10 hover:bg-ivory/15 transition-all group cursor-default"
                      >
                        <div className="w-12 h-12 rounded-xl bg-leaf/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <feature.icon className="w-6 h-6 text-leaf" />
                        </div>
                        <div>
                          <div className="font-display font-bold text-ivory text-base">{feature.title}</div>
                          <div className="text-ivory/50 text-sm font-medium">{feature.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
