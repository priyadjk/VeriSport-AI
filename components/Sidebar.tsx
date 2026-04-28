'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Scan, Database, Activity, Map, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Activity },
  { name: 'Scanner', href: '/scanner', icon: Scan },
  { name: 'Provenance', href: '/explorer', icon: Database },
  { name: 'Admin Console', href: '/admin', icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-white/10 h-screen sticky top-0 flex flex-col bg-bg-void">
      <div className="p-8 pb-4">
        <div className="flex flex-col gap-1">
          <div className="w-10 h-10 bg-brand-cyan/10 rounded-sm border border-brand-cyan/30 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-brand-cyan" />
          </div>
          <h1 className="text-2xl heading-italic leading-none">VeriSport<br /><span className="text-brand-cyan">Engine</span></h1>
        </div>
      </div>

      <nav className="flex-1 p-6 space-y-4 mt-8">
        <p className="text-[10px] uppercase font-black tracking-[0.3em] opacity-30 px-2 mb-4">Control Plane</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-none transition-all duration-200 group relative border-l-2",
                isActive 
                  ? "bg-brand-cyan/5 text-white border-brand-cyan font-black italic uppercase italic tracking-wider" 
                  : "text-slate-500 border-transparent hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-brand-cyan" : "opacity-40 group-hover:opacity-100")} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-8">
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-emerald">Secure Node</span>
          </div>
          <p className="text-[9px] font-mono text-slate-500 uppercase leading-tight">Instance: VS-GCP-822<br />Uptime: 99.98%</p>
        </div>
      </div>
    </div>
  );
}
