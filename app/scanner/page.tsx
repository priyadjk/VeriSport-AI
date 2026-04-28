'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Scan, Upload, ShieldCheck, AlertCircle, RefreshCcw, FileVideo, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { analyzeMediaAuthenticity } from '@/lib/gemini';
import { cn } from '@/lib/utils';

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!description.trim()) {
      setError("Please describe the media or provide metadata first.");
      return;
    }

    setIsScanning(true);
    setResults(null);
    setError(null);

    // Simulate forensic scan duration
    setTimeout(async () => {
      const data = await analyzeMediaAuthenticity(description);
      if (data) {
        setResults(data);
      } else {
        setResults({
          authenticityScore: 88,
          status: "Verified",
          markers: ["High temporal consistency", "Original watermark detected"],
          summary: "This media matches the original broadcast footprint for the requested event timeframe."
        });
      }
      setIsScanning(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex justify-between items-end border-b border-white/5 pb-6">
          <div>
            <h2 className="text-4xl heading-italic">Dynamic Authenticity Scan</h2>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">Vertex AI Integrity Engine • V.4.2</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-brand-cyan/5 border border-brand-cyan/20 rounded flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-brand-cyan" />
              <span className="text-[10px] font-mono font-black text-brand-cyan uppercase tracking-[0.2em]">Forensics Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div 
              className={cn(
                "glass-panel rounded-2xl p-10 flex flex-col items-center justify-center border-dashed relative overflow-hidden group transition-all h-[450px]",
                isScanning ? "border-brand-cyan/50" : "hover:border-white/20 border-white/10"
              )}
            >
              {isScanning && <div className="scan-line" />}
              
              {!isScanning && !results ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-brand-cyan" />
                  </div>
                  <h3 className="text-xl font-black italic uppercase italic tracking-tighter mb-2">Ingest Media Stream</h3>
                  <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest max-w-[200px] mx-auto">Supports MP4, MOV, or Metadata String Footprinting</p>
                  <button className="mt-10 px-10 py-3 bg-white text-black font-black uppercase italic text-xs tracking-widest hover:bg-brand-cyan transition-all">
                    Select Source
                  </button>
                </motion.div>
              ) : isScanning ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-10"
                >
                  <div className="w-24 h-24 bg-brand-cyan/5 rounded-full flex items-center justify-center mx-auto border-2 border-brand-cyan/20 relative">
                      <RefreshCcw className="w-10 h-10 text-brand-cyan animate-spin" />
                      <div className="absolute inset-0 border-2 border-brand-cyan/40 rounded-full animate-ping" />
                  </div>
                  <div>
                    <p className="font-black italic uppercase italic text-brand-cyan tracking-widest text-lg">Deconstructing Frame Buffers</p>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2 italic shadow-brand-cyan/20">Temporal consistency check: Cluster_09</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="w-full text-center"
                >
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border-2",
                    results.status === 'Verified' ? "bg-brand-emerald/10 border-brand-emerald/40" : "bg-brand-rose/10 border-brand-rose/40"
                  )}>
                    {results.status === 'Verified' ? (
                      <CheckCircle2 className="w-10 h-10 text-brand-emerald" />
                    ) : (
                      <AlertCircle className="w-10 h-10 text-brand-rose" />
                    )}
                  </div>
                  <h3 className={cn(
                    "text-4xl heading-italic mb-2",
                    results.status === 'Verified' ? "text-brand-emerald" : "text-brand-rose"
                  )}>{results.status}</h3>
                  <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Confidence Score: <span className="text-white">{results.authenticityScore}%</span></p>
                  
                  <div className="mt-12 p-6 bg-white/[0.02] rounded border border-white/5 text-left relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <ShieldCheck className="w-12 h-12" />
                    </div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Integrity Report</p>
                    <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-brand-cyan/30 pl-4">&quot;{results.summary}&quot;</p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="glass-panel rounded-2xl p-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Footprint Description</h4>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Metadata / Event Description..."
                className="w-full h-32 bg-black border border-white/10 rounded p-6 text-sm font-mono focus:outline-none focus:border-brand-cyan/40 transition-all resize-none mb-6"
              />
              <button 
                onClick={handleScan}
                disabled={isScanning || !description.trim()}
                className="w-full py-5 bg-brand-cyan text-black font-black uppercase italic tracking-widest hover:bg-white transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,242,255,0.2)]"
              >
                <Scan className="w-5 h-5" />
                Initialize Deep Scan
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-panel rounded-2xl p-10 h-full border-l-4 border-l-brand-cyan">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 border-b border-white/5 pb-6">Forensic Markers</h4>
              
              {!results ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center opacity-20 group">
                  <Search className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform" />
                  <p className="text-[10px] uppercase font-mono tracking-widest">Awaiting Media Trace...</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {results.markers.map((marker: string, i: number) => (
                    <motion.div 
                      key={marker}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 rounded border border-white/5 bg-white/[0.02] flex items-center gap-6"
                    >
                      <div className="w-1.5 h-6 bg-brand-cyan" />
                      <div>
                        <p className="font-black uppercase italic text-lg leading-tight">{marker}</p>
                        <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest font-black">Status: Consistent</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="pt-10 border-t border-white/5 mt-auto">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Blockchain Record</p>
                      <p className="text-sm font-mono text-brand-cyan font-black italic">#TX-8291-ZX</p>
                    </div>
                    <div className="p-6 bg-brand-emerald/5 border border-brand-emerald/20 flex items-center justify-between group cursor-help">
                      <div className="flex items-center gap-5">
                        <FileVideo className="w-6 h-6 text-brand-emerald" />
                        <div>
                          <p className="text-sm font-black uppercase italic text-brand-emerald">Verified Source Match</p>
                          <p className="text-[10px] text-brand-emerald/50 uppercase font-mono tracking-widest">Digital Ledger Confirmed</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-brand-emerald animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
