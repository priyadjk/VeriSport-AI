'use client';

import React from 'react';
import Image from 'next/image';
import { Sidebar } from '@/components/Sidebar';
import { motion } from 'motion/react';
import { Bell, User, Search, Settings, Shield } from 'lucide-react';

import { useAuth } from '@/components/FirebaseProvider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, login, logout, loading } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-white/10 px-8 py-6 flex flex-col gap-4 bg-black/40 backdrop-blur-md sticky top-0 z-10">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <h1 className="text-6xl heading-italic leading-none text-white">
                VeriSport <span className="text-brand-cyan">AI</span>
              </h1>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40 mt-2">
                Real-Time Provenance & Integrity Engine • GCP Vertex Instance V.4.2
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-2xl font-bold leading-none tabular-nums font-sans">1,242</div>
                <div className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Active Streams</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold leading-none tabular-nums text-rose-500 font-sans">42</div>
                <div className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Piracy Alerts</div>
              </div>
              <div className="h-10 w-[1px] bg-white/10 mx-2" />
              
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold uppercase tracking-tight">{user.displayName || 'Admin'}</p>
                    <button onClick={logout} className="text-[9px] text-rose-500 font-mono uppercase hover:underline">Disconnect</button>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 p-1 relative overflow-hidden">
                    {user.photoURL ? (
                      <Image 
                        src={user.photoURL} 
                        alt="" 
                        fill
                        className="object-cover grayscale" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={login}
                  className="px-6 py-2 bg-brand-cyan text-black font-black uppercase italic text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                >
                  Connect Ledger
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="p-8 max-w-[1600px] mx-auto min-h-full flex flex-col">
            <div className="flex-1">
              {!user && !loading ? (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-8 bg-brand-cyan/5 rounded-[40px] border border-brand-cyan/20">
                      <Shield className="w-16 h-16 text-brand-cyan animate-pulse" />
                  </div>
                  <div>
                      <h2 className="text-4xl heading-italic">Access Denied</h2>
                      <p className="text-slate-500 max-w-sm mx-auto mt-2 font-mono uppercase text-[10px] tracking-widest">Secure Handshake Required</p>
                  </div>
                  <button 
                      onClick={login}
                      className="px-10 py-4 bg-brand-cyan text-black font-black italic uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-brand-cyan/20"
                  >
                    Authorize Instance
                  </button>
                </div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  {children}
                </motion.div>
              )}
            </div>

            {/* Technical Footer */}
            <footer className="mt-20 flex justify-between items-center bg-white/5 px-6 py-4 rounded-2xl border border-white/10 mb-8">
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[9px] font-black text-black">G</div>
                  <span className="text-[10px] uppercase font-black tracking-widest opacity-50">Google Cloud Platform</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-[#8247E5] rounded flex items-center justify-center text-[9px] font-black">P</div>
                  <span className="text-[10px] uppercase font-black tracking-widest opacity-50">Polygon (Web3)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-600 rounded flex items-center justify-center text-[9px] font-black italic">F</div>
                  <span className="text-[10px] uppercase font-black tracking-widest opacity-50">Flutter Edge SDK</span>
                </div>
              </div>
              <div className="font-mono text-[10px] text-brand-cyan flex gap-6 overflow-hidden whitespace-nowrap">
                <span className="animate-pulse opacity-70">{" >> "} LATEST MINT: CLIP_NFL_S5_2024 ...</span>
                <span className="opacity-40 uppercase">| Status: Operational | Security: 256-bit AES</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
