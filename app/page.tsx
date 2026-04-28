'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Shield, AlertTriangle, Fingerprint, Globe, ExternalLink, ArrowUpRight, ArrowRight, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/FirebaseProvider';

const stats = [
  { label: 'Active Streams', value: '42', change: '+5%', color: 'emerald', icon: Globe },
  { label: 'Piracy Alerts', value: '03', change: '-12%', color: 'rose', icon: AlertTriangle },
  { label: 'Integrity Rating', value: '99.8%', change: 'Stable', color: 'sky', icon: Shield },
  { label: 'Provenances Minted', value: '1.2M', change: '+142k', color: 'amber', icon: Fingerprint },
];

const alerts = [
  { id: 'AL-902', type: 'High', source: 'Twitch', status: 'Blocked', time: '2m ago', match: 'EPL Final' },
  { id: 'AL-899', type: 'Medium', source: 'Discord', status: 'Notified', time: '14m ago', match: 'NBA Playoffs' },
  { id: 'AL-895', type: 'High', source: 'Unknown IP', status: 'Redirecting', time: '41m ago', match: 'La Liga' },
];

// Top-level constants
export default function Page() {
  return (
    <DashboardLayout>
      <div className="space-y-12">
        <div className="flex flex-col">
          <h2 className="text-5xl heading-italic">Network Overview</h2>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2 font-black">
            Integrity Monitoring System <span className="text-brand-cyan mx-2">|</span> Operational
          </p>
        </div>

        <main className="grid grid-cols-12 gap-8 min-h-[600px]">
          {/* Section 1: Live Monitoring */}
          <section className="col-span-12 lg:col-span-4 glass-panel rounded-2xl p-8 flex flex-col border-brand-cyan/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Stream Fingerprinting</h2>
              <div className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            
            <div className="flex-1 bg-black rounded-lg overflow-hidden relative group border border-white/5">
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-10">
                <div className="w-full h-[1px] bg-brand-cyan absolute top-1/4"></div>
                <div className="w-full h-[1px] bg-brand-cyan absolute top-1/2"></div>
                <div className="w-full h-[1px] bg-brand-cyan absolute top-3/4"></div>
              </div>
              <div className="absolute top-4 left-4 font-mono text-[9px] bg-black/80 p-3 border border-white/10 text-brand-cyan font-black">
                FRAME_ID: VS-9921-X<br />
                TS: 1714320000000<br />
                HASH: 0x82f...a102
              </div>
              <div className="scan-line" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-cyan/20 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '64%' }}
                      className="h-full bg-brand-cyan" 
                    />
                  </div>
                  <span className="font-mono text-[10px] font-black text-brand-cyan">SYNC_64%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <div className="text-2xl font-black italic text-white leading-none">0.4ms</div>
                <div className="text-[9px] uppercase tracking-widest opacity-40 font-mono mt-2">Latent Edge Gen</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                <div className="text-2xl font-black italic text-brand-cyan leading-none">99.8%</div>
                <div className="text-[9px] uppercase tracking-widest opacity-40 font-mono mt-2">Vision Match</div>
              </div>
            </div>
          </section>

          {/* Section 2: Distribution & Alerts */}
          <section className="col-span-12 lg:col-span-5 glass-panel rounded-2xl p-8 flex flex-col">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Global Piracy Distribution</h2>
            <div className="flex-1 relative bg-black/40 rounded-lg border border-white/5 overflow-hidden p-4">
               {/* Map Mockup */}
               <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-brand-rose rounded-full blur-[4px]"></div>
               <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-brand-rose rounded-full animate-ping"></div>
               <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-brand-rose rounded-full blur-[8px] opacity-40"></div>
               <div className="absolute inset-0 tech-grid opacity-20" />
               
               <div className="absolute inset-0 flex items-center justify-center p-10 opacity-10">
                  <Globe className="w-full h-full text-white" />
               </div>
            </div>
            
            <div className="mt-8 space-y-3">
              {alerts.map((alert, i) => (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between text-[10px] font-mono p-4 bg-brand-rose/5 border border-brand-rose/20 rounded group transition-all hover:bg-brand-rose/10"
                >
                  <span className="text-brand-rose font-black">{alert.type === 'High' ? 'ALERT' : 'WARN'}</span>
                  <span className="text-white/70">Unauthorized {alert.source}: {alert.match}</span>
                  <span className="font-black italic text-brand-rose uppercase">STATUS: {alert.status}</span>
                </motion.div>
              ))}
              <div className="flex justify-between text-[10px] font-mono p-4 bg-white/5 rounded border border-white/5">
                <span className="text-slate-500 font-black">IDLE</span>
                <span className="text-white/40">Monitoring YouTube Sports (Live)</span>
                <span className="opacity-50 font-black text-brand-emerald text-brand-emerald">SECURE</span>
              </div>
            </div>
          </section>

          {/* Section 3: Verification Proof */}
          <section className="col-span-12 lg:col-span-3 flex flex-col gap-8">
            <div className="bg-brand-emerald/10 border border-brand-emerald/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center flex-1 transition-all hover:bg-brand-emerald/15 group">
              <div className="w-20 h-20 rounded-full border-2 border-brand-emerald flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-brand-emerald" />
              </div>
              <h3 className="text-3xl heading-italic text-brand-emerald">Verified Original</h3>
              <p className="text-[10px] opacity-60 mt-2 font-mono uppercase tracking-[0.3em] font-black">Ownership Confirmed</p>
              <div className="mt-8 pt-8 border-t border-brand-emerald/20 w-full">
                <div className="text-[9px] text-brand-emerald font-mono font-black uppercase tracking-widest mb-1">Blockchain Record</div>
                <div className="text-[10px] font-mono text-white/40 truncate">POLYGON:0x7E22...B331</div>
              </div>
            </div>

            <div className="bg-brand-cyan/10 border border-brand-cyan/30 p-8 rounded-2xl flex-1 flex flex-col relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-5 grayscale bg-white/10 rounded-full w-24 h-24 blur-xl" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-slate-500">Deepfake Analysis</h3>
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div>
                   <div className="flex justify-between text-[10px] mb-2 font-mono uppercase font-black">
                    <span className="text-white/60">Temporal Flux</span>
                    <span className="text-brand-cyan">0.02%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '2%' }} className="h-full bg-brand-cyan" />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-[10px] mb-2 font-mono uppercase font-black">
                    <span className="text-white/60">AI Generation Prob</span>
                    <span className="text-brand-cyan">1.4%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '14%' }} className="h-full bg-brand-cyan" />
                   </div>
                </div>
              </div>
              <div className="mt-8 text-[9px] bg-black/40 p-3 rounded border border-white/5 text-center font-mono text-brand-cyan font-black tracking-widest uppercase">
                Scanner: Vertex_Vision_L4
              </div>
            </div>
          </section>
        </main>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-brand-cyan">
             <div className="flex justify-between items-start mb-4">
                <Globe className="w-8 h-8 text-brand-cyan" />
                <span className="text-[10px] font-mono text-brand-cyan font-black border border-brand-cyan/30 px-2 py-0.5">820 TPS</span>
             </div>
             <h4 className="text-xl font-black italic uppercase italic tracking-tighter">Throughput</h4>
             <p className="text-slate-500 text-[10px] font-mono mt-1 uppercase tracking-widest">Network Verification Speed</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-brand-emerald">
             <div className="flex justify-between items-start mb-4">
                <Shield className="w-8 h-8 text-brand-emerald" />
                <span className="text-[10px] font-mono text-brand-emerald font-black border border-brand-emerald/30 px-2 py-0.5">100% SECURE</span>
             </div>
             <h4 className="text-xl font-black italic uppercase italic tracking-tighter">Security</h4>
             <p className="text-slate-500 text-[10px] font-mono mt-1 uppercase tracking-widest">Protocol Integrity Level</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-brand-rose">
             <div className="flex justify-between items-start mb-4">
                <Fingerprint className="w-8 h-8 text-brand-rose" />
                <span className="text-[10px] font-mono text-brand-rose font-black border border-brand-rose/30 px-2 py-0.5">LOW LATENCY</span>
             </div>
             <h4 className="text-xl font-black italic uppercase italic tracking-tighter">Edge Compute</h4>
             <p className="text-slate-500 text-[10px] font-mono mt-1 uppercase tracking-widest">Latency vs Handover</p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
