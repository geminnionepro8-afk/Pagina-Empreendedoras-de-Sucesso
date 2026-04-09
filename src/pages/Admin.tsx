import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Lock, 
  LogOut, 
  TrendingUp, 
  MousePointer2, 
  CheckCircle2, 
  Save,
  Database,
  BarChart3,
  Shield,
  Table as TableIcon,
  LayoutGrid,
  RefreshCw,
  Users,
  MessageCircle,
  Copy,
  Info,
  Trash2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { toast } from "sonner";

const MASTER_KEY = "upadmin2024";

// Categoria das imagens para organização no painel
const ASSET_CATEGORIES = [
  { id: 'brand', name: 'Marca & Checkout', icon: Shield },
  { id: 'hero', name: 'Seção Hero', icon: LayoutDashboard },
  { id: 'content', name: 'Conteúdo (Seções 2, 3 e 6)', icon: ImageIcon },
  { id: 'speakers', name: 'Palestrantes (Seção 4)', icon: Users },
  { id: 'team', name: 'Governança (Seção 5)', icon: Users },
];

const ASSET_KEYS = [
  // Brand
  { key: 'logo_instituto', label: 'Logo Rodapé', category: 'brand', desc: 'Logo principal no rodapé.' },
  { key: 'selo_footer', label: 'Selo Upsiden', category: 'brand', desc: 'Selo de qualidade no rodapé.' },
  { key: 'checkout_logo', label: 'Logo Checkout', category: 'brand', desc: 'Logo que aparece no formulário de PIX.' },
  
  // Hero
  { key: 'hero_logo', label: 'Logo Hero', category: 'hero', desc: 'Logo de destaque no centro da Hero.' },
  { key: 'hero_bg', label: 'Background Hero', category: 'hero', desc: 'Imagem de fundo (Palestrante) da Hero.' },
  
  // Sections
  { key: 'about_image', label: 'Imagem Sobre (S2)', category: 'content', desc: 'Imagem principal da seção Sobre.' },
  { key: 'audience_img_1', label: 'Público 1 (S3)', category: 'content', desc: 'Primeira imagem da seção de público.' },
  { key: 'audience_img_2', label: 'Público 2 (S3)', category: 'content', desc: 'Segunda imagem da seção de público.' },
  { key: 'audience_img_3', label: 'Público 3 (S3)', category: 'content', desc: 'Terceira imagem da seção de público.' },
  { key: 'support_card', label: 'Card Suporte (S6)', category: 'content', desc: 'Imagem do card de suporte humano.' },
  { key: 'support_laptop', label: 'Laptop Suporte (S6)', category: 'content', desc: 'Imagem do notebook na seção de suporte.' },

  // Speakers
  ...Array.from({ length: 10 }, (_, i) => ({
    key: `speaker_${i + 1}`,
    label: `Palestrante ${i + 1}`,
    category: 'speakers',
    desc: `Foto do palestrante ${i + 1} na galeria.`
  })),

  // Team
  ...Array.from({ length: 4 }, (_, i) => ({
    key: `team_${i + 1}`,
    label: `Governança ${i + 1}`,
    category: 'team',
    desc: `Foto do membro ${i + 1} do time executivo.`
  })),
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"metrics" | "content">("metrics");
  const [activeCategory, setActiveCategory] = useState("brand");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({ pix: 0, wpp: 0, loading: true });
  const [chartData, setChartData] = useState<any[]>([]);
  
  const { data: configs, refetch: refetchConfigs } = useSiteConfig();
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    if (configs) setFormValues(configs);
  }, [configs]);

  useEffect(() => {
    if (isAuthenticated) fetchAllData();
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setStats(prev => ({ ...prev, loading: true }));
    console.log("Admin: Iniciando busca de métricas...");
    
    const { data, error } = await supabase
      .from("logs_interacoes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Admin: Erro ao buscar métricas do Supabase:", error);
      toast.error(`Erro de Banco: ${error.message} (Verifique as políticas RLS)`);
      setStats(prev => ({ ...prev, loading: false }));
      return;
    }

    console.log(`Admin: ${data?.length || 0} logs encontrados.`);
    setLogs(data || []);
    
    // Filtrar novos tipos de eventos do Wizard
    const pixCount = (data || []).filter(i => i.tipo_evento === 'intent_pix' || i.tipo_evento === 'copiou_pix');
    const wppCount = (data || []).filter(i => i.tipo_evento === 'intent_whatsapp' || i.tipo_evento === 'clicou_whatsapp');
    
    // Calcular distribuição por categoria (Plano)
    const planDist: Record<string, number> = {};
    (data || []).forEach(log => {
        if (log.tipo_evento === 'intent_whatsapp' || log.tipo_evento === 'intent_pix') {
            const plan = log.categoria || 'Geral';
            planDist[plan] = (planDist[plan] || 0) + 1;
        }
    });

    const pieData = Object.entries(planDist).map(([name, value]) => ({ 
        name: name.toUpperCase(), 
        value 
    }));

    setStats({ pix: pixCount.length, wpp: wppCount.length, loading: false });

    // Dados para o gráfico de barras
    const processedChart = [
      { name: 'PIX (Intenção)', value: pixCount.length, color: '#f493a7' },
      { name: 'Whats (Conversão)', value: wppCount.length, color: '#25D366' }
    ];
    setChartData(processedChart);
    (window as any)._pieData = pieData; // Armazenar para o PieChart
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MASTER_KEY) {
      setIsAuthenticated(true);
      toast.success("Acesso autorizado");
    } else {
      toast.error("Chave inválida");
    }
  };

  const saveConfig = async (key: string) => {
    setSavingKey(key);
    const value = formValues[key];
    console.log(`Admin: Tentando salvar config [${key}] -> [${value}]`);
    
    const { error } = await supabase
      .from("site_config")
      .upsert({ id: key, value }, { onConflict: 'id' });

    if (error) {
      console.error(`Admin: Erro ao salvar config ${key}:`, error);
      toast.error(`Falha ao salvar: ${error.message}`);
    } else {
      toast.success(`${key} atualizado!`);
      refetchConfigs();
    }
    setSavingKey(null);
  };

  const resetConfig = async (key: string) => {
    setSavingKey(key);
    console.log(`Admin: Tentando restaurar original para [${key}]`);
    
    const { error } = await supabase
      .from("site_config")
      .delete()
      .eq('id', key);

    if (error) {
      console.error(`Admin: Erro ao deletar config ${key}:`, error);
      toast.error(`Falha ao restaurar: ${error.message}`);
    } else {
      toast.success(`${key} restaurado ao original!`);
      
      const newValues = { ...formValues };
      delete newValues[key];
      setFormValues(newValues);
      refetchConfigs();
    }
    setSavingKey(null);
  };

  const filteredAssets = useMemo(() => 
    ASSET_KEYS.filter(a => a.category === activeCategory), 
  [activeCategory]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,rgba(238,105,131,0.05)_0%,transparent_50%)]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-[#b51a42] to-[#9d173d] rounded-xl flex items-center justify-center mb-6 shadow-xl shadow-[#b51a42]/20">
              <Shield className="text-white w-7 h-7" />
            </div>
            <h1 className="text-xl font-black text-white tracking-[0.3em] uppercase">Upsiden Admin</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">Master Key</label>
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-black border border-white/10 rounded-xl py-4 px-6 text-white focus:border-[#b51a42]/50 outline-none transition-all font-mono tracking-widest"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-[#b51a42] text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-[#b51a42]/20">Entrar</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      <div className="flex flex-1 flex-col md:flex-row h-screen overflow-hidden">
        <aside className="w-full md:w-20 lg:w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-4 z-50">
          <div className="hidden lg:flex flex-col gap-1 mb-10 px-4">
             <h2 className="text-sm font-black uppercase tracking-widest text-white">Dashboard</h2>
             <p className="text-[9px] text-white/30 font-bold tracking-[0.3em] uppercase">Upsiden Ops</p>
          </div>
          <div className="flex md:flex-col gap-2 flex-1">
             <button onClick={() => setActiveTab('metrics')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'metrics' ? 'bg-[#b51a42] text-white shadow-lg shadow-[#b51a42]/10' : 'text-white/40 hover:bg-white/5'}`}>
                <BarChart3 className="w-5 h-5 shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest hidden lg:block">Métricas</span>
             </button>
             <button onClick={() => setActiveTab('content')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === 'content' ? 'bg-[#b51a42] text-white shadow-lg shadow-[#b51a42]/10' : 'text-white/40 hover:bg-white/5'}`}>
                <LayoutGrid className="w-5 h-5 shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest hidden lg:block">Gestão de Mídia</span>
             </button>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-4 text-white/30 hover:text-[#b51a42] flex items-center gap-3 mt-auto border-t border-white/5">
             <LogOut className="w-5 h-5 shrink-0" />
             <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">Sair</span>
          </button>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#050505] custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'metrics' ? (
              <motion.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 md:p-10 lg:p-16 space-y-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Performance de Conversão</h1>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Monitoramento de intenção e vendas em tempo real</p>
                  </div>
                  <button onClick={fetchAllData} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
                    <RefreshCw className={`w-3 h-3 ${stats.loading ? 'animate-spin' : ''}`} /> Atualizar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl space-y-4 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#b51a42]/10 blur-3xl rounded-full" />
                      <div className="w-10 h-10 bg-[#b51a42]/10 rounded-xl flex items-center justify-center text-[#b51a42]">
                        <Copy className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Intenção (PIX Copiado)</p>
                         <h3 className="text-4xl font-black tracking-tighter">{stats.loading ? '...' : stats.pix}</h3>
                      </div>
                   </div>
                   <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl space-y-4 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full" />
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Conversão (WhatsApp)</p>
                         <h3 className="text-4xl font-black tracking-tighter">{stats.loading ? '...' : stats.wpp}</h3>
                      </div>
                   </div>
                   <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl space-y-4 shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />
                      <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Taxa Final</p>
                         <h3 className="text-4xl font-black tracking-tighter">{stats.loading ? '...' : `${stats.pix > 0 ? ((stats.wpp/stats.pix)*100).toFixed(1) : 0}%`}</h3>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-2xl shadow-2xl flex flex-col">
                      <div className="flex items-center justify-between mb-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Funil de Intenção</h4>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#f493a7]" /><span className="text-[9px] text-white/40 uppercase font-bold">PIX</span></div>
                           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#25D366]" /><span className="text-[9px] text-white/40 uppercase font-bold">WPP</span></div>
                        </div>
                      </div>
                      <div className="h-[300px] w-full mt-auto">
                        {stats.pix + stats.wpp > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                              <XAxis dataKey="name" stroke="#ffffff20" fontSize={9} axisLine={false} tickLine={false} />
                              <YAxis stroke="#ffffff20" fontSize={9} axisLine={false} tickLine={false} />
                              <Tooltip contentStyle={{background: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '16px', padding: '12px'}} cursor={{fill: '#ffffff05'}} />
                              <Bar dataKey="value" fill="#b51a42" radius={[6, 6, 0, 0]} barSize={60}>
                                {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-white/10 italic text-sm">
                            <Database className="w-12 h-12 mb-4 opacity-10" /> Aguardando Fluxo de Dados...
                          </div>
                        )}
                      </div>
                   </div>

                   <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-2xl shadow-2xl flex flex-col">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/40">Distribuição por Plano</h4>
                      <div className="h-[300px] w-full mt-auto">
                         {(window as any)._pieData?.length > 0 ? (
                           <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                               <Pie
                                 data={(window as any)._pieData}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={60}
                                 outerRadius={100}
                                 paddingAngle={5}
                                 dataKey="value"
                               >
                                 {((window as any)._pieData).map((entry: any, index: number) => (
                                   <Cell key={`cell-${index}`} fill={['#b51a42', '#f493a7', '#7c132d', '#25D366'][index % 4]} />
                                 ))}
                               </Pie>
                               <Tooltip contentStyle={{background: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '16px', padding: '12px'}} />
                             </PieChart>
                           </ResponsiveContainer>
                         ) : (
                           <div className="h-full flex flex-col items-center justify-center text-white/10 italic text-sm">
                             <TrendingUp className="w-12 h-12 mb-4 opacity-10" /> Sem dados de categorias.
                           </div>
                         )}
                      </div>
                   </div>
                </div>

                <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-2xl shadow-2xl">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-white/40">Atividade Recente</h4>
                   <div className="h-[400px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                      {logs.length > 0 ? logs.slice(0, 30).map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all group">
                           <div className="flex items-center gap-5">
                              <div className={`w-3 h-3 rounded-full ${log.tipo_evento?.includes('pix') ? 'bg-[#b51a42] shadow-[0_0_10px_rgba(181,26,66,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} />
                              <div>
                                 <p className="text-[11px] font-black uppercase tracking-wider text-white/90">
                                    {log.tipo_evento === 'intent_pix' ? 'Intenção de Pagamento PIX' : 
                                     log.tipo_evento === 'intent_whatsapp' ? 'Lead: Conversão WhatsApp' : 
                                     log.tipo_evento.toUpperCase()}
                                 </p>
                                 <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.2em] mt-1">
                                    {log.metadata?.userName || 'Sessão Anônima'} • {log.categoria} • ID: {log.session_id?.slice(0, 8)}
                                 </p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] text-white/40 font-mono font-bold">{new Date(log.created_at).toLocaleString()}</p>
                           </div>
                        </div>
                      )) : (
                        <div className="h-full flex items-center justify-center text-white/20 italic text-sm">Nenhum evento registrado no período.</div>
                      )}
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="content" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="p-6 md:p-10 lg:p-16 space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Gestão de Mídia</h1>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Sobrescrita dinâmica de ativos fixos do projeto</p>
                  </div>
                  
                  <div className="flex bg-black p-1.5 rounded-2xl border border-white/10 self-start">
                    <button onClick={() => setViewMode('grid')} className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-[#b51a42] text-white shadow-lg shadow-[#b51a42]/20' : 'text-white/40 hover:text-white'}`}>
                       <LayoutGrid className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest">Galeria</span>
                    </button>
                    <button onClick={() => setViewMode('table')} className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${viewMode === 'table' ? 'bg-[#b51a42] text-white shadow-lg shadow-[#b51a42]/20' : 'text-white/40 hover:text-white'}`}>
                       <BarChart3 className="w-4 h-4 rotate-90" /> <span className="text-[10px] font-black uppercase tracking-widest">Lista</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar lg:overflow-visible">
                   {ASSET_CATEGORIES.map(cat => (
                     <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all whitespace-nowrap ${activeCategory === cat.id ? 'bg-white text-black border-white shadow-xl shadow-white/5' : 'bg-transparent border-white/10 text-white/40 hover:border-white/30'}`}>
                        <cat.icon className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                     </button>
                   ))}
                </div>

                <div className="bg-[#0a0a0a]/50 border border-white/5 rounded-2xl overflow-hidden">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-8 md:p-10">
                       {filteredAssets.map((asset) => (
                         <div key={asset.key} className="bg-black border border-white/10 rounded-2xl p-6 space-y-6 hover:border-[#b51a42]/40 transition-all group shadow-2xl">
                            <div className="aspect-video bg-[#050505] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center relative">
                               {formValues[asset.key] ? (
                                 <img src={formValues[asset.key]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" crossOrigin="anonymous" alt="Preview" />
                               ) : (
                                 <div className="flex flex-col items-center gap-2 opacity-10 italic">
                                     <ImageIcon className="w-8 h-8" />
                                     <span className="text-[8px] uppercase font-black tracking-widest">Original Local</span>
                                 </div>
                               )}
                               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-16 flex items-end p-4">
                                  <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">{formValues[asset.key] ? "Customizado" : "Ativo Padrão"}</span>
                               </div>
                            </div>
                            <div className="space-y-4">
                               <div className="space-y-1">
                                  <h5 className="text-xs font-black uppercase tracking-widest text-white/90">{asset.label}</h5>
                                  <p className="text-[10px] text-white/30 font-bold uppercase leading-relaxed tracking-wider">{asset.desc}</p>
                               </div>
                               <div className="space-y-3">
                                  <input 
                                    type="text" value={formValues[asset.key] || ""} onChange={(e) => setFormValues({...formValues, [asset.key]: e.target.value})}
                                    placeholder="Nova URL da imagem..."
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-[11px] focus:border-[#b51a42]/30 outline-none transition-all placeholder:text-white/5"
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                     <button 
                                        onClick={() => resetConfig(asset.key)} 
                                        disabled={savingKey === asset.key || !formValues[asset.key]} 
                                        className="flex-1 bg-white/5 text-white/40 py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-30"
                                     >
                                       <RefreshCw className={`w-3 h-3 ${savingKey === asset.key ? 'animate-spin' : ''}`} /> Restaurar
                                     </button>
                                     <button 
                                        onClick={() => saveConfig(asset.key)} 
                                        disabled={savingKey === asset.key} 
                                        className="flex-1 bg-white text-black py-3 rounded-xl hover:bg-[#b51a42] hover:text-white transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                                     >
                                       <Save className="w-3 h-3" /> Salvar
                                     </button>
                                  </div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/[0.02]">
                            <th className="py-7 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Item de Mídia</th>
                            <th className="py-7 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Endereço da URL</th>
                            <th className="py-7 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Controles</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                          {filteredAssets.map((asset) => (
                            <tr key={asset.key} className="hover:bg-white/[0.01] transition-all group">
                              <td className="py-7 px-10">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-widest text-white/90">{asset.label}</p>
                                    <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest">{asset.desc}</p>
                                </div>
                              </td>
                              <td className="py-7 px-10">
                                <input 
                                  type="text" value={formValues[asset.key] || ""} onChange={(e) => setFormValues({...formValues, [asset.key]: e.target.value})}
                                  placeholder="Cole o novo link aqui..."
                                  className="w-full bg-transparent border-b border-white/10 rounded-none py-2 text-xs focus:border-[#b51a42]/50 outline-none transition-all font-mono"
                                />
                              </td>
                              <td className="py-7 px-10 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => resetConfig(asset.key)} disabled={savingKey === asset.key || !formValues[asset.key]} className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all disabled:opacity-20 translate-y-0 hover:-translate-y-0.5">
                                        <RefreshCw className={`w-4 h-4 ${savingKey === asset.key && 'animate-spin'}`} />
                                    </button>
                                    <button onClick={() => saveConfig(asset.key)} disabled={savingKey === asset.key} className="p-3 bg-white text-black hover:bg-[#b51a42] hover:text-white rounded-lg transition-all translate-y-0 hover:-translate-y-0.5 shadow-lg">
                                        <Save className="w-4 h-4" />
                                    </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="bg-[#b51a42]/5 border border-[#b51a42]/15 p-8 rounded-2xl flex items-start gap-6 max-w-4xl shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#b51a42]/10 blur-3xl rounded-full" />
                   <div className="bg-[#b51a42]/10 p-4 rounded-xl relative">
                     <Shield className="w-6 h-6 text-[#b51a42]" />
                   </div>
                   <div className="space-y-3 relative">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#b51a42]">Protocolo de Sincronização Global</h4>
                      <p className="text-white/40 text-[11px] leading-relaxed font-bold uppercase tracking-widest">
                        O sistema detecta automaticamente se uma midia foi removida (Reset) e carrega o arquivo local original do repositório. Para novas mídias, utilize links permanentes de CDNs estáveis.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(238,105,131,0.3); }
      `}</style>
    </div>
  );
};

export default Admin;
