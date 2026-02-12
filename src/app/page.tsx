"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Rocket, Users, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto pt-20 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full glass mb-8 max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
            <span className="text-[10px] md:text-sm font-bold text-navy/80 tracking-wide uppercase truncate">
              Building the Digital Movement for 2027
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-navy leading-[1.1] tracking-tight mb-8 px-2"
          >
            Renewed Hope <br />
            <span className="text-gold italic">Innovators</span> Coalition
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl text-navy/60 font-medium leading-relaxed mb-12"
          >
            A national digital mobilization engine transforming youth-tech support
            into a structured, measurable, and high-energy innovation ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/auth"
              className="navy-gradient text-ivory px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
            >
              Initialize Membership
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/innovation"
              className="bg-navy/5 text-navy px-10 py-5 rounded-2xl font-bold text-lg hover:bg-navy/10 transition-all border border-navy/10"
            >
              Explore Innovation Arena
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -z-10 animate-pulse" />
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
              <div className="w-12 h-12 bg-navy/5 rounded-2xl flex items-center justify-center">
                <stat.icon className="text-gold w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-display font-black text-navy">{stat.value}</div>
                <div className="text-xs font-bold text-navy/40 uppercase tracking-widest">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
