"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Users, Globe, MapPin, Handshake, Star, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NigeriaMap from "@/components/NigeriaMap";
import LiveCommandTicker from "@/components/LiveCommandTicker";
import ForceStrengthPreview from "@/components/ForceStrengthPreview";

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
              className="text-7xl md:text-8xl lg:text-[10rem] font-display font-black leading-[0.85] tracking-tight mb-12 select-none"
            >
              <span className="block mb-2">Renewed Hope</span>
              <span className="inline-block relative">
                <span className="text-transparent bg-clip-text vibrant-apc-gradient italic pr-4">Innovators</span>
              </span>
              <span className="block -mt-1">Coalition</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-xl md:text-2xl text-foreground/80 font-medium leading-relaxed mb-14 pl-10 border-l-[12px] border-apc-cyan ring-1 ring-apc-cyan/5 py-6 rounded-r-[2.5rem] bg-apc-cyan/[0.03] backdrop-blur-sm shadow-inner"
            >
              Building the <span className="text-apc-cyan font-black">Digital Vanguard</span> for Nigeria&apos;s progress.
              Track our <Link href="/mandate" className="text-apc-cyan hover:underline decoration-apc-cyan/30">national mandates</Link> or join the elite vanguard scaling President Tinubu&apos;s vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-8"
            >
              <Link
                href="/auth"
                className="btn-apc flex items-center gap-4 group text-xl px-12 py-5 shadow-[0_25px_50px_-15px_rgba(0,173,239,0.4)] hover:shadow-[0_35px_60px_-15px_rgba(0,173,239,0.6)]"
              >
                Join the Vanguard
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/innovation"
                className="px-12 py-5 rounded-full font-bold text-xl apc-glass border border-apc-cyan/20 hover:bg-apc-cyan/5 hover:border-apc-cyan/40 transition-all flex items-center gap-3 backdrop-blur-xl"
              >
                Strategy Console
                <ShieldCheck className="w-6 h-6 text-apc-cyan" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 relative group w-full max-w-2xl lg:max-w-none"
          >
            {/* Visual Frame */}
            <div className="relative z-10 rounded-[5rem] overflow-hidden border-[12px] border-white premium-shadow transition-all duration-700 group-hover:rounded-[4rem]">
              <div className="absolute inset-0 bg-gradient-to-tr from-apc-cyan/15 via-transparent to-apc-red/15 pointer-events-none z-20" />
              <Image
                src="/president-tinubu.png"
                alt="President Bola Ahmed Tinubu"
                width={800}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                priority
              />

              {/* Floating ID Card Teaser */}
              <div className="absolute top-12 right-12 p-5 ultra-glass rounded-[2.5rem] shadow-2xl animate-float z-30">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full apc-cyan-gradient border-[3px] border-white shadow-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-apc-cyan uppercase tracking-widest mb-0.5">Verified Member</div>
                    <div className="text-base font-black text-foreground">Digital Vanguard</div>
                  </div>
                </div>
              </div>

              {/* Presidential Quote Overlay */}
              <div className="absolute bottom-12 left-12 right-12 p-10 ultra-glass rounded-[3rem] shadow-2xl z-30 transform transition-transform duration-700 group-hover:translate-y-2">
                <p className="text-foreground font-display font-black italic text-3xl leading-[1.05] mb-6 tracking-tight">
                  &ldquo;Our diversity is our strength; our innovation is our future.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-[3px] w-16 bg-apc-red rounded-full" />
                  <p className="text-apc-green font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">
                    President Bola Ahmed Tinubu
                  </p>
                </div>
              </div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-apc-cyan/20 rounded-full blur-[120px] -z-10 group-hover:bg-apc-cyan/30 transition-all duration-1000" />
            <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-apc-gold/15 rounded-full blur-[140px] -z-10 group-hover:bg-apc-gold/25 transition-all duration-1000" />
          </motion.div>
        </div>
      </section>

      <LiveCommandTicker />

      {/* Elite Performance Metrics */}
      <section className="px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: "Elite Vanguard", value: "250K+", icon: Users, color: "apc-cyan", trend: "+12%" },
            { label: "State Commands", value: "37", icon: Globe, color: "apc-green", trend: "Full Coverage" },
            { label: "Digital Assets", value: "1.2K+", icon: Rocket, color: "apc-red", trend: "+85%" },
            { label: "Field Missions", value: "500K+", icon: Star, color: "apc-gold", trend: "Active" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="premium-card group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[10px] font-black text-apc-cyan uppercase tracking-widest bg-apc-cyan/10 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>

              <div className={`w-16 h-16 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br from-apc-cyan/5 to-transparent border border-apc-cyan/10 group-hover:border-apc-cyan/30 shadow-inner`}>
                <stat.icon className="w-8 h-8 text-apc-cyan transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="text-5xl font-display font-black tracking-tighter mb-3 group-hover:text-apc-cyan transition-colors duration-500">{stat.value}</div>
              <div className="text-[11px] font-black text-foreground/50 uppercase tracking-[0.3em]">{stat.label}</div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-apc-cyan/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      <ForceStrengthPreview />

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
              A world-class tactical display of current &quot;Renewed Hope&quot; momentum.
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
