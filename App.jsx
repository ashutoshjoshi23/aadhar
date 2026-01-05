import React, { useState } from 'react';
import {
    BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
    LayoutDashboard, Users, Fingerprint, FileText, BarChart3,
    TrendingUp, AlertCircle, MapPin, Calendar, CheckCircle2,
    ArrowUpRight, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AadhaarDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Age Distribution Data
    const ageDistributionEnrollment = [
        { name: '0-5 years', value: 2020406, percentage: 61.21 },
        { name: '5-17 years', value: 1157841, percentage: 35.08 },
        { name: '18+ years', value: 122779, percentage: 3.72 }
    ];

    const ageDistributionBiometric = [
        { name: 'Youth (5-17)', value: 34226855, percentage: 49.06 },
        { name: 'Adults (17+)', value: 35536240, percentage: 50.94 }
    ];

    const ageDistributionDemographic = [
        { name: 'Youth (5-17)', value: 4863424, percentage: 9.87 },
        { name: 'Adults (17+)', value: 44431763, percentage: 90.13 }
    ];

    // Top States Data
    const topStatesEnrollment = [
        { state: 'Uttar Pradesh', enrollments: 670426, percentage: 20.31 },
        { state: 'Bihar', enrollments: 390901, percentage: 11.84 },
        { state: 'Madhya Pradesh', enrollments: 277081, percentage: 8.39 },
        { state: 'West Bengal', enrollments: 222260, percentage: 6.73 },
        { state: 'Maharashtra', enrollments: 222030, percentage: 6.73 },
        { state: 'Rajasthan', enrollments: 205699, percentage: 6.23 },
        { state: 'Gujarat', enrollments: 193313, percentage: 5.86 },
        { state: 'Assam', enrollments: 167163, percentage: 5.06 },
        { state: 'Karnataka', enrollments: 121762, percentage: 3.69 },
        { state: 'Tamil Nadu', enrollments: 105582, percentage: 3.20 }
    ];

    // Day of Week Analysis
    const dayOfWeekData = [
        { day: 'Mon', enrollments: 349035, avg: 3.99 },
        { day: 'Tue', enrollments: 1161686, avg: 16.93 },
        { day: 'Wed', enrollments: 329609, avg: 4.37 },
        { day: 'Thu', enrollments: 483141, avg: 6.63 },
        { day: 'Fri', enrollments: 352213, avg: 4.33 },
        { day: 'Sat', enrollments: 287341, avg: 3.73 },
        { day: 'Sun', enrollments: 338001, avg: 9.05 }
    ];

    // System Comparison Data
    const systemComparison = [
        { system: 'Enrollment', records: 1006.029, updates: 5400, duplicates: 2.3 },
        { system: 'Biometric', records: 1861.108, updates: 69800, duplicates: 5.1 },
        { system: 'Demographic', records: 2071.700, updates: 49300, duplicates: 22.9 }
    ];

    // Top Districts
    const topDistricts = [
        { district: 'Sitamarhi, Bihar', enrollments: 34278 },
        { district: 'Bahraich, UP', enrollments: 32681 },
        { district: 'Thane, Maharashtra', enrollments: 29464 },
        { district: 'East Khasi Hills, Meghalaya', enrollments: 25873 },
        { district: 'Sitapur, UP', enrollments: 23140 },
        { district: 'Bengaluru Urban', enrollments: 23074 },
        { district: 'West Champaran, Bihar', enrollments: 20974 },
        { district: 'Agra, UP', enrollments: 20900 },
        { district: 'Bengaluru', enrollments: 20553 },
        { district: 'Muzaffarpur, Bihar', enrollments: 20458 }
    ];

    const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

    const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card p-6 flex flex-col justify-between border-l-4 ${color}`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-900">{value}</h3>
                    {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-xl bg-opacity-10 ${color.replace('border-', 'bg-')}`}>
                    <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
                </div>
            </div>
        </motion.div>
    );

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 mb-2"
                            >
                                <div className="p-2 bg-indigo-600 rounded-lg">
                                    <Fingerprint className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-indigo-600 font-bold tracking-tight">UIDAI ANALYTICS</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
                            >
                                Aadhaar Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Insights</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-500 mt-2 flex items-center gap-2"
                            >
                                <Calendar className="w-4 h-4" />
                                UIDAI Hackathon 2025 | Analysis Period: Mar - Dec 2025
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100"
                        >
                            <div className="text-right px-4">
                                <p className="text-xs text-slate-400 font-medium uppercase">System Status</p>
                                <p className="text-sm font-bold text-emerald-500 flex items-center justify-end gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Operational
                                </p>
                            </div>
                            <div className="h-10 w-[1px] bg-slate-100" />
                            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                Export Report
                            </button>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                        <StatCard title="Total Records" value="4.94M" icon={Users} color="border-blue-500" subtitle="+12% from last quarter" />
                        <StatCard title="Transactions" value="124.5M" icon={ArrowUpRight} color="border-emerald-500" subtitle="Across all platforms" />
                        <StatCard title="States Covered" value="65+" icon={MapPin} color="border-purple-500" subtitle="Including UTs" />
                        <StatCard title="Districts" value="985+" icon={LayoutDashboard} color="border-orange-500" subtitle="Active enrollment centers" />
                    </div>
                </header>

                {/* Navigation */}
                <nav className="mb-8 overflow-x-auto pb-2">
                    <div className="flex gap-3 min-w-max">
                        <TabButton id="overview" label="Overview" icon={LayoutDashboard} />
                        <TabButton id="enrollment" label="Enrollment" icon={Users} />
                        <TabButton id="biometric" label="Biometric" icon={Fingerprint} />
                        <TabButton id="demographic" label="Demographic" icon={FileText} />
                        <TabButton id="comparison" label="System Comparison" icon={BarChart3} />
                    </div>
                </nav>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="glass-card p-8 shadow-xl shadow-slate-200/50">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-xl font-bold text-slate-800">Age Distribution: Enrollment</h2>
                                        <Info className="w-5 h-5 text-slate-300 cursor-help" />
                                    </div>
                                    <div className="h-[400px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={ageDistributionEnrollment}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={80}
                                                    outerRadius={130}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {ageDistributionEnrollment.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                                />
                                                <Legend verticalAlign="bottom" height={36} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="glass-card p-8 shadow-xl shadow-slate-200/50">
                                    <h2 className="text-xl font-bold text-slate-800 mb-8">Top 10 States by Enrollment</h2>
                                    <div className="h-[400px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={topStatesEnrollment} layout="vertical" margin={{ left: 40 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                                <XAxis type="number" hide />
                                                <YAxis dataKey="state" type="category" width={120} axisLine={false} tickLine={false} />
                                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                                <Bar dataKey="enrollments" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 glass-card p-8 shadow-xl shadow-slate-200/50">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Enrollment by Day of Week</h2>
                                            <p className="text-slate-400 text-sm">Weekly traffic patterns and anomalies</p>
                                        </div>
                                        <div className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-amber-500" />
                                            <p className="text-sm text-amber-700 font-medium">
                                                <strong>Anomaly:</strong> Tuesday shows 35.2% of all enrollments
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-[350px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={dayOfWeekData}>
                                                <defs>
                                                    <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                                <YAxis axisLine={false} tickLine={false} />
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                                <Area type="monotone" dataKey="enrollments" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEnroll)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'enrollment' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200">
                                        <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider">Total Enrollments</p>
                                        <h3 className="text-4xl font-bold mt-2">3.3M</h3>
                                        <div className="mt-6 flex items-center gap-2 text-indigo-100 text-sm">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>Steady growth in Q4</span>
                                        </div>
                                    </div>
                                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Coverage Period</p>
                                        <h3 className="text-4xl font-bold mt-2 text-slate-800">239 Days</h3>
                                        <p className="mt-6 text-slate-500 text-sm">Active monitoring active</p>
                                    </div>
                                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Data Quality</p>
                                        <h3 className="text-4xl font-bold mt-2 text-emerald-500">98.8%</h3>
                                        <p className="mt-6 text-slate-500 text-sm">Validation score</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="glass-card p-8">
                                        <h2 className="text-xl font-bold text-slate-800 mb-8">Top 10 Districts</h2>
                                        <div className="h-[450px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={topDistricts} layout="vertical">
                                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="district" type="category" width={150} axisLine={false} tickLine={false} fontSize={12} />
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                                    <Bar dataKey="enrollments" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="glass-card p-8">
                                        <div className="flex justify-between items-center mb-8">
                                            <h2 className="text-xl font-bold text-slate-800">Age Group Distribution</h2>
                                            <div className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">CRITICAL</div>
                                        </div>
                                        <div className="bg-red-50/50 border border-red-100 p-4 rounded-2xl mb-8">
                                            <p className="text-sm text-red-800 flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span><strong>Critical Finding:</strong> Only 3.72% adult enrollments - requires immediate policy intervention.</span>
                                            </p>
                                        </div>
                                        <div className="h-[300px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={ageDistributionEnrollment}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={100}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {ageDistributionEnrollment.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'biometric' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <StatCard title="Total Updates" value="69.8M" icon={Fingerprint} color="border-blue-500" />
                                    <StatCard title="Total Records" value="1.86M" icon={Users} color="border-emerald-500" />
                                    <StatCard title="Duplicate Rate" value="5.1%" icon={AlertCircle} color="border-orange-500" />
                                </div>
                                <div className="glass-card p-8">
                                    <h2 className="text-xl font-bold text-slate-800 mb-8">Age Distribution: Biometric Updates</h2>
                                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl mb-8">
                                        <p className="text-sm text-emerald-800 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span><strong>Success Story:</strong> Nearly perfect balance - 49.1% Youth vs 50.9% Adults.</span>
                                        </p>
                                    </div>
                                    <div className="h-[400px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={ageDistributionBiometric}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={150}
                                                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                                                    dataKey="value"
                                                >
                                                    {ageDistributionBiometric.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index + 3]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'demographic' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <StatCard title="Total Updates" value="49.3M" icon={FileText} color="border-purple-500" />
                                    <StatCard title="Total Records" value="2.07M" icon={Users} color="border-blue-500" />
                                    <StatCard title="Duplicate Rate" value="22.9%" icon={AlertCircle} color="border-red-500" />
                                </div>
                                <div className="glass-card p-8">
                                    <h2 className="text-xl font-bold text-slate-800 mb-8">Age Distribution: Demographic Updates</h2>
                                    <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-8">
                                        <p className="text-sm text-red-800 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            <span><strong>Critical Issue:</strong> 22.9% duplicate rate - highest across all systems.</span>
                                        </p>
                                    </div>
                                    <div className="h-[400px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={ageDistributionDemographic}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={150}
                                                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                                                    dataKey="value"
                                                >
                                                    {ageDistributionDemographic.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index + 5]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'comparison' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="glass-card p-8">
                                        <h2 className="text-xl font-bold text-slate-800 mb-8">System Comparison: Records</h2>
                                        <div className="h-[350px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={systemComparison}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="system" axisLine={false} tickLine={false} />
                                                    <YAxis axisLine={false} tickLine={false} />
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                                    <Bar dataKey="records" fill="#6366f1" radius={[4, 4, 0, 0]} name="Records (K)" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className="glass-card p-8">
                                        <h2 className="text-xl font-bold text-slate-800 mb-8">Data Quality: Duplicate Rate (%)</h2>
                                        <div className="h-[350px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={systemComparison}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="system" axisLine={false} tickLine={false} />
                                                    <YAxis axisLine={false} tickLine={false} />
                                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                                    <Bar dataKey="duplicates" fill="#ef4444" radius={[4, 4, 0, 0]} name="Duplicate %" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card p-8">
                                    <h2 className="text-xl font-bold text-slate-800 mb-8">Key Insights Across Systems</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="p-2 bg-blue-500 rounded-lg text-white">
                                                    <Users className="w-4 h-4" />
                                                </div>
                                                <h3 className="font-bold text-blue-900">Enrollment</h3>
                                            </div>
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                    <span>Child-focused (65.3% ages 0-5)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                    <span>Only 3.1% adult enrollment</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                                    <span>98.8% data quality score</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="p-2 bg-emerald-500 rounded-lg text-white">
                                                    <Fingerprint className="w-4 h-4" />
                                                </div>
                                                <h3 className="font-bold text-emerald-900">Biometric</h3>
                                            </div>
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>Perfect balance (49-51%)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>69.8M updates processed</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>Low 5.1% duplicate rate</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100">
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="p-2 bg-purple-500 rounded-lg text-white">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <h3 className="font-bold text-purple-900">Demographic</h3>
                                            </div>
                                            <ul className="space-y-3 text-sm text-slate-600">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                                                    <span>Adult-dominated (90.1%)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                                    <span>22.9% duplicate rate</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                    <span>March 1st spike (22.6%)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <footer className="mt-20 py-8 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-sm">
                        &copy; 2025 UIDAI Data Analysis Dashboard. Built for UIDAI Hackathon.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AadhaarDashboard;
