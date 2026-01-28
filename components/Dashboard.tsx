import React, { useEffect, useState } from 'react';
import {
  Upload,
  Download,
  BarChart3,
  Activity,
  AlertCircle,
  FileText,
  Sparkles,
  Info,
  Loader2
} from 'lucide-react';
import {
  EquipmentItem,
  SummaryStats,
  AIInsight
} from '../types';
import {
  parseCSV,
  calculateStats,
  saveToHistory,
  generateSampleCSV
} from '../services/dataService';
import { getAIInsights } from '../services/geminiService';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip
} from 'recharts';

interface DashboardProps {
  data: EquipmentItem[] | null;
  setData: (data: EquipmentItem[] | null) => void;
  fileName: string;
  setFileName: (name: string) => void;
  setHistory: (history: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  data,
  setData,
  fileName,
  setFileName,
  setHistory
}) => {
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  /* ---------- Effects ---------- */
  useEffect(() => {
    if (!data) return;
    setStats(calculateStats(data));
    analyze(data);
  }, [data]);

  const analyze = async (dataset: EquipmentItem[]) => {
    setAnalyzing(true);
    const result = await getAIInsights(dataset);
    setInsights(result);
    setAnalyzing(false);
  };

  /* ---------- File Handling ---------- */
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseCSV(reader.result as string);
      setData(parsed);
      setFileName(file.name);
      setHistory(saveToHistory(file.name, parsed));
    };
    reader.readAsText(file);
  };

  const loadSample = () => {
    const csv = generateSampleCSV();
    const parsed = parseCSV(csv);
    setData(parsed);
    setFileName('sample_equipment_data.csv');
    setHistory(saveToHistory('sample_equipment_data.csv', parsed));
  };

  const comparisonData =
    data?.slice(0, 10).map(item => ({
      name: item.name.split(' ').slice(0, 2).join(' '),
      Pressure: item.pressure,
      Temperature: item.temperature
    })) || [];

  /* ---------- Empty State ---------- */
  if (!data) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-xl w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-800 flex items-center justify-center mb-6">
            <Upload className="text-blue-400" size={32} />
          </div>

          <h2 className="text-2xl font-bold text-slate-100">
            Start New Analysis
          </h2>
          <p className="text-slate-400 mt-2 mb-6">
            Upload a CSV file or load a sample dataset to begin AI-assisted analysis.
          </p>

          <div
            className={`border-2 border-dashed rounded-2xl p-6 cursor-pointer transition
            ${
              dragActive
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700 hover:border-blue-500'
            }`}
            onDragOver={e => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={e => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files[0];
              if (file) processFile(file);
            }}
            onClick={() =>
              document.getElementById('csv-upload')?.click()
            }
          >
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={e =>
                e.target.files && processFile(e.target.files[0])
              }
            />
            <p className="font-medium text-slate-300">
              Click or drag CSV file here
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Equipment • Flowrate • Pressure • Temperature
            </p>
          </div>

          <button
            onClick={loadSample}
            className="mt-6 text-blue-400 font-semibold hover:text-blue-300"
          >
            Load Sample Dataset
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Dashboard ---------- */
  return (
    <div className="space-y-10 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Equipment Overview
          </h1>
          <p className="text-slate-400">
            Active Dataset: <span className="font-medium">{fileName}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setData(null)}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800"
          >
            Change Dataset
          </button>
          <button
            onClick={() => alert('PDF export simulated')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat label="Total Equipment" value={stats?.totalCount} icon={<BarChart3 />} />
        <Stat label="Avg Flowrate" value={`${stats?.avgFlowrate.toFixed(1)} m³/h`} icon={<Activity />} />
        <Stat label="Avg Pressure" value={`${stats?.avgPressure.toFixed(1)} bar`} icon={<AlertCircle />} />
        <Stat label="Avg Temperature" value={`${stats?.avgTemperature.toFixed(1)} °C`} icon={<FileText />} />
      </div>

      {/* Charts + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="font-bold mb-6">
            Parameter Comparison
          </h3>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <ReTooltip />
                <Bar dataKey="Pressure" fill="#3b82f6" />
                <Bar dataKey="Temperature" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-slate-900
        border border-blue-800/40 rounded-3xl p-6 shadow-xl shadow-blue-900/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-blue-400" size={20} />
            <h3 className="font-bold">AI Insights</h3>
          </div>

          {analyzing ? (
            <div className="flex flex-col items-center py-10">
              <Loader2 className="animate-spin text-blue-400 mb-2" />
              <p className="text-sm text-blue-200">
                AI is analyzing operational patterns…
              </p>
            </div>
          ) : insights.length ? (
            insights.map((insight, i) => (
              <div key={i} className="mb-4 border-l-2 border-blue-400/40 pl-4">
                <p className="font-semibold text-sm text-blue-100">
                  {insight.title}
                </p>
                <p className="text-xs italic text-blue-200/80">
                  “{insight.observation}”
                </p>
                <p className="text-xs mt-1 text-blue-100">
                  {insight.recommendation}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-blue-200">
              No insights generated.
            </p>
          )}

          <div className="flex items-center gap-2 text-[10px] mt-4 text-blue-300/80">
            <Info size={12} />
            Gemini AI powered reasoning
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Stat ---------- */
const Stat = ({
  label,
  value,
  icon
}: {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}) => (
  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex justify-between items-start">
    <div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold">
        {value ?? '--'}
      </p>
    </div>
    <div className="p-3 rounded-2xl bg-slate-800 text-blue-400">
      {icon}
    </div>
  </div>
);
