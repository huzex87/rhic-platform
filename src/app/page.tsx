"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Globe, MapPin, Handshake, Star, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NigeriaMap from "@/components/NigeriaMap";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-24">
      {/* Dynamic Hero Section */}
      <section className="relative px-4 overflow-hidden pt-20 md:pt-32">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-apc-cyan/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-apc-green/10 rounded-full blur-[140px] -z-10 animate-pulse delay-700" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass mb-10 border border-apc-cyan/30"
            >
              <Zap className="w-4 h-4 text-apc-gold animate-bounce" />
              <span className="text-[10px] md:text-xs font-black text-apc-cyan tracking-[0.25em] uppercase">
                Official National APC Support Group
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter mb-10"
            >
              Renewed <br />
              <span className="text-transparent bg-clip-text vibrant-apc-gradient italic">Hope</span> <br />
              Coalition
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed mb-14 pl-8 border-l-8 border-apc-cyan ring-1 ring-apc-cyan/5 py-4 rounded-r-3xl bg-apc-cyan/5"
            >
              Building the <strong>Digital Vanguard</strong> for Nigeria's progress.
              An elite professional ecosystem scaling President Tinubu's vision through
              world-class innovation and molecular-level mobilization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link
                href="/auth"
                className="btn-apc flex items-center gap-4 group text-lg"
              >
                Join the Vanguard
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/innovation"
                className="px-10 py-4 rounded-full font-bold text-lg apc-glass border border-apc-cyan/20 hover:bg-apc-cyan/10 transition-all flex items-center gap-2"
              >
                Strategy Console
                <ShieldCheck className="w-5 h-5 text-apc-cyan" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 relative group"
          >
            {/* Visual Frame */}
            <div className="relative z-10 rounded-[4rem] overflow-hidden border-[8px] border-white shadow-[0_50px_100px_-20px_rgba(0,173,239,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-apc-cyan/20 via-transparent to-apc-red/20 pointer-events-none" />
              <Image
                src="/president-tinubu.png"
                alt="President Bola Ahmed Tinubu"
                width={800}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />

              {/* Floating ID Card Teaser */}
              <div className="absolute top-10 right-10 p-4 glass rounded-3xl border border-white/50 backdrop-blur-2xl shadow-xl animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full apc-cyan-gradient border-2 border-white" />
                  <div>
                    <div className="text-[10px] font-black text-apc-cyan uppercase">Verified Member</div>
                    <div className="text-sm font-bold">Digital Vanguard</div>
                  </div>
                </div>
              </div>

              {/* Presidential Quote Overlay */}
              <div className="absolute bottom-10 left-10 right-10 p-8 glass rounded-[2.5rem] border border-white/30 backdrop-blur-3xl">
                <p className="text-foreground font-display font-black italic text-2xl leading-[1.1] mb-4">
                  &ldquo;Our diversity is our strength; our innovation is our future.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-12 bg-apc-red" />
                  <p className="text-apc-green font-black text-xs uppercase tracking-[0.4em]">
                    President Bola Ahmed Tinubu
                  </p>
                </div>
              </div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-apc-cyan/30 rounded-full blur-[100px] -z-10 group-hover:bg-apc-cyan/50 transition-colors" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-apc-gold/20 rounded-full blur-[120px] -z-10 group-hover:bg-apc-gold/40 transition-colors" />
          </motion.div>
        </div>
      </section>

      {/* Elite Performance Metrics */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Elite Vanguard", value: "250K+", icon: Users, color: "apc-cyan" },
            { label: "State Commands", value: "37", icon: Globe, color: "apc-green" },
            { label: "Digital Assets", value: "1.2K+", icon: Rocket, color: "apc-red" },
            { label: "Field Missions", value: "500K+", icon: Star, color: "apc-gold" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="premium-card group hover:shadow-[0_20px_50px_rgba(0,173,239,0.15)]"
            >
              <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 bg-apc-cyan/5`}>
                <stat.icon className="w-7 h-7 text-apc-cyan" />
              </div>
              <div className="text-4xl font-display font-black tracking-tight mb-2">{stat.value}</div>
              <div className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Strategic Nationwide Footprint */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-apc-cyan/20 mb-8">
              <MapPin className="w-4 h-4 text-apc-red animate-pulse" />
              <span className="text-[10px] font-black text-apc-cyan tracking-[0.3em] uppercase">Molecular Saturation</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-6">
              National <span className="text-apc-green">Command</span> Map
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-foreground/60 leading-relaxed font-medium">
              Real-time intelligence and mobilization density across all 774 Local Government Areas.
              A world-class tactical display of current "Renewed Hope" momentum.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-1 rounded-[3rem] bg-gradient-to-tr from-apc-cyan/20 via-apc-gold/10 to-apc-red/20 shadow-2xl"
          >
            <div className="bg-white rounded-[2.9rem] overflow-hidden">
              <NigeriaMap variant="landing" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action: Join the Elite */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,173,239,0.4)]"
          >
            {/* High-Impact Gradient Background */}
            <div className="absolute inset-0 vibrant-apc-gradient opacity-95" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

            {/* Abstract Decorative Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-apc-gold/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 px-10 py-24 md:px-24 md:py-32 flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 mb-10"
                >
                  <Handshake className="w-5 h-5 text-apc-gold" />
                  <span className="text-xs font-black text-white tracking-[0.3em] uppercase">Become a Commander</span>
                </motion.div>

                <h2 className="text-5xl md:text-8xl font-display font-black text-white leading-[0.9] tracking-tighter mb-10">
                  Join the <br />
                  <span className="italic underline decoration-apc-gold decoration-8 underline-offset-8">Vanguard</span>
                </h2>

                <p className="max-w-xl text-xl text-white/80 font-medium leading-relaxed mb-14">
                  Nigeria is at a digital crossroads. We are recruiting the brightest minds to build,
                  deploy, and defend the technological future of our great nation.
                  Your mission starts here.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Link
                    href="/auth"
                    className="bg-white text-apc-cyan px-12 py-6 rounded-3xl font-black text-xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all flex items-center gap-4 w-full sm:w-auto justify-center"
                  >
                    Enlist Now
                    <ChevronRight className="w-6 h-6" />
                  </Link>
                  <Link
                    href="/chapter"
                    className="px-12 py-6 rounded-3xl font-black text-xl text-white border-2 border-white/30 backdrop-blur-md hover:bg-white/10 transition-all w-full sm:w-auto text-center"
                  >
                    Locate Command
                  </Link>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 gap-6 w-full max-w-lg">
                {[
                  { icon: Zap, title: "High-Resolution Impact", desc: "Build tools that reach millions instantly" },
                  { icon: ShieldCheck, title: "Elite Verification", desc: "Earn official national digital credentials" },
                  { icon: Globe, title: "360° Coordination", desc: "Sync with commanders across every ward" },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="p-8 rounded-[2rem] bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/15 transition-all group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-display font-black text-white mb-2 tracking-tight">{item.title}</div>
                        <div className="text-white/60 text-sm font-medium leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
