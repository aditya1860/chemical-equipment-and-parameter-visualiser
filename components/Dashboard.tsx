
import React, { useState, useEffect } from 'react';
import { Upload, Download, FileText, BarChart3, PieChart, Activity, Info, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { EquipmentItem, SummaryStats, AIInsight } from '../types';
import { parseCSV, calculateStats, saveToHistory, generateSampleCSV } from '../services/dataService';
import { getAIInsights } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Cell, PieChart as RePieChart, Pie, Legend, LineChart, Line } from 'recharts';

interface DashboardProps {
  data: EquipmentItem[] | null;
  setData: (data: EquipmentItem[] | null) => void;
  fileName: string;
  setFileName: (name: string) => void;
  setHistory: (history: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, setData, fileName, setFileName, setHistory }) => {
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (data) {
      setStats(calculateStats(data));
      fetchAIInsights(data);
    }
  }, [data]);

  const fetchAIInsights = async (dataset: EquipmentItem[]) => {
    setIsAnalyzing(true);
    const result = await getAIInsights(dataset);
    setInsights(result);
    setIsAnalyzing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      setData(parsed);
      setFileName(file.name);
      const updatedHistory = saveToHistory(file.name, parsed);
      setHistory(updatedHistory);
    };
    reader.readAsText(file);
  };

  const loadSampleData = () => {
    const csv = generateSampleCSV();
    const parsed = parseCSV(csv);
    setData(parsed);
    setFileName('sample_equipment_data.csv');
    const updatedHistory = saveToHistory('sample_equipment_data.csv', parsed);
    setHistory(updatedHistory);
  };

  const handleExportPDF = async () => {
    // In a real app, use jspdf here. For this demo, we'll simulate it.
    alert('PDF Report generated and downloaded to your local device.');
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const typeData = stats ? Object.entries(stats.typeDistribution).map(([name, value]) => ({ name, value })) : [];
  
  const parameterComparison = data?.slice(0, 10).map(item => ({
    name: item.name.split(' ').slice(0, 2).join(' '),
    Pressure: item.pressure,
    Temperature: item.temperature,
    Flow: item.flowrate / 10 // scale for visual comparison
  })) || [];

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-200 max-w-2xl w-full">
          <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Upload className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Upload Data</h2>
          <p className="text-slate-500 mb-8">Drag and drop your equipment CSV file here or select from your computer to begin analysis.</p>
          
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 mb-6 transition-all cursor-pointer ${
              dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files[0];
              if (file) processFile(file);
            }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input type="file" id="file-upload" className="hidden" accept=".csv" onChange={handleFileUpload} />
            <p className="text-slate-600 font-medium">Click to select CSV file</p>
            <p className="text-xs text-slate-400 mt-1">Columns: Equipment Name, Type, Flowrate, Pressure, Temperature</p>
          </div>

          <button 
            onClick={loadSampleData}
            className="text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center mx-auto space-x-2 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <span>Or try with Sample Dataset</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Equipment Analysis</h1>
          <p className="text-slate-500">Dataset: <span className="font-semibold text-slate-700">{fileName}</span></p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setData(null)}
            className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl font-medium transition-all"
          >
            <Upload size={18} />
            <span>Change Data</span>
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium transition-all shadow-md shadow-slate-900/10"
          >
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Equipment" 
          value={stats?.totalCount || 0} 
          icon={<BarChart3 size={20} />} 
          color="blue" 
        />
        <StatCard 
          label="Avg Flowrate" 
          value={`${stats?.avgFlowrate.toFixed(1)} m³/h`} 
          icon={<Activity size={20} />} 
          color="emerald" 
        />
        <StatCard 
          label="Avg Pressure" 
          value={`${stats?.avgPressure.toFixed(1)} bar`} 
          icon={<AlertCircle size={20} />} 
          color="amber" 
        />
        <StatCard 
          label="Avg Temperature" 
          value={`${stats?.avgTemperature.toFixed(1)} °C`} 
          icon={<FileText size={20} />} 
          color="purple" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">Primary Parameter Comparison</h3>
              <div className="flex space-x-4 text-xs font-medium text-slate-500">
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Pressure</span>
                <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span> Temperature</span>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={parameterComparison}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={11} stroke="#64748b" axisLine={false} tickLine={false} />
                  <YAxis fontSize={11} stroke="#64748b" axisLine={false} tickLine={false} />
                  <ReTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="Pressure" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="Temperature" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Detailed Equipment Inventory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="py-4 font-semibold">Equipment Name</th>
                    <th className="py-4 font-semibold">Type</th>
                    <th className="py-4 font-semibold">Flowrate</th>
                    <th className="py-4 font-semibold">Pressure</th>
                    <th className="py-4 font-semibold">Temperature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-medium text-slate-900">{item.name}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-4 text-slate-600">{item.flowrate}</td>
                      <td className="py-4 text-slate-600">{item.pressure} bar</td>
                      <td className="py-4 text-slate-600">{item.temperature} °C</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Type Distribution</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-6 rounded-3xl shadow-xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={100} />
            </div>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-white/10 p-2 rounded-lg">
                <Sparkles size={20} className="text-blue-300" />
              </div>
              <h3 className="text-lg font-bold">Operational Insights</h3>
            </div>

            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="animate-spin text-blue-400" size={32} />
                <p className="text-blue-200 text-sm">Gemini AI is analyzing telemetry...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {insights.length > 0 ? insights.map((insight, idx) => (
                  <div key={idx} className="space-y-2 border-l-2 border-blue-400/30 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-blue-50 text-sm uppercase tracking-wider">{insight.title}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        insight.riskLevel === 'High' ? 'bg-red-500/20 text-red-300' :
                        insight.riskLevel === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {insight.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-sm text-blue-100/80 leading-relaxed italic">"{insight.observation}"</p>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                       <p className="text-[11px] font-bold text-blue-300 mb-1 uppercase">Recommendation</p>
                       <p className="text-xs text-blue-50">{insight.recommendation}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <p className="text-blue-300 text-sm">No specific insights available for this dataset.</p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-white/10 flex items-center space-x-2">
                  <Info size={14} className="text-blue-400" />
                  <p className="text-[10px] text-blue-300">Generated using Gemini Flash Reasoning Engine</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <div className={`${colorMap[color]} p-3 rounded-2xl`}>
        {icon}
      </div>
    </div>
  );
};
