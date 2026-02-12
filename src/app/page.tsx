"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Rocket, Users, Globe } from "lucide-react";
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
                <img
                  src="/president-tinubu.png"
                  alt="President Bola Ahmed Tinubu"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-60" />

                {/* Overlay Quote */}
                <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-ivory/20 backdrop-blur-xl">
                  <p className="text-ivory font-display font-bold italic text-lg leading-tight mb-2">
                    "Hope renewed is not just a slogan; it is our national mandate."
                  </p>
                  <p className="text-leaf font-black text-[10px] uppercase tracking-[0.3em]">
                    President Bola Ahmed Tinubu
                  </p>
                </div>
              </div>

              {/* Decorative Effects */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-leaf/20 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-accent-red/10 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-leaf/5 rounded-[3rem] -z-20 scale-95 animate-spin-slow" />
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
            { label: "Missions Done", value: "500K+", icon: Shield },
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
    </div>
  );
}
