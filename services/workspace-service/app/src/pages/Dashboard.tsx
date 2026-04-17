import { useState, useEffect } from "react";
import { Calendar, AlertCircle, CheckCircle2, Clock, ListTodo, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TodoCalendar from "../components/TodoCalendar";

export default function Dashboard() {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [overdueTodos, setOverdueTodos] = useState<{ id: number; text: string; date: string }[]>([]);
    const [todayTodos, setTodayTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
    const [upcomingTodos, setUpcomingTodos] = useState<{ id: number; text: string; date: string; completed: boolean }[]>([]);

    useEffect(() => {
        const fetchAndCategorizeTodos = () => {
            const savedTodos = localStorage.getItem("hyperactive_calendar_todos");
            if (savedTodos) {
                try {
                    const todos: Record<string, { id: number; text: string; completed: boolean }[]> = JSON.parse(savedTodos);
                    const overdue: { id: number; text: string; date: string }[] = [];
                    const today: { id: number; text: string; completed: boolean }[] = [];
                    const upcoming: { id: number; text: string; date: string; completed: boolean; rawDate: Date }[] = [];
                    
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);

                    Object.entries(todos).forEach(([dateStr, items]) => {
                        const [year, month, day] = dateStr.split("-").map(Number);
                        const taskDate = new Date(year, month, day);
                        taskDate.setHours(0, 0, 0, 0);

                        if (taskDate.getTime() === now.getTime()) {
                            today.push(...items);
                        } else if (taskDate < now) {
                            items.forEach(todo => {
                                if (!todo.completed) {
                                    overdue.push({
                                        id: todo.id,
                                        text: todo.text,
                                        date: taskDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
                                    });
                                }
                            });
                        } else {
                            upcoming.push(...items.map(item => ({ 
                                ...item, 
                                date: taskDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
                                rawDate: taskDate
                            })));
                        }
                    });

                    setOverdueTodos(overdue.sort((a, b) => b.id - a.id));
                    setTodayTodos(today);
                    setUpcomingTodos(upcoming
                        .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime())
                        .slice(0, 5)
                    );
                } catch (e) {
                    console.error("Failed to parse todos", e);
                }
            }
        };

        fetchAndCategorizeTodos();
        if (!isCalendarOpen) {
            fetchAndCategorizeTodos();
        }
    }, [isCalendarOpen]);

    return (
        <div className="p-10 min-h-screen relative">
            <div className="max-w-4xl">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-lg text-gray-500">Welcome to your workspace 🚀</p>                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Daily Planner & Quick Launch */}
                    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                            <Calendar className="text-indigo-600" size={24} />
                        </div>
                        <h2 className="text-xl font-bold mb-3">Workspace Setup</h2>
                        <p className="text-gray-400 leading-relaxed mb-6 text-sm">Manage your workspace and coordinate tasks effortlessly.</p>
                        <button
                            onClick={() => setIsCalendarOpen(true)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all"
                        >
                            Configure Project →
                        </button>
                    </div>

                    {/* Today's Agenda Section */}
                    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                <CheckCircle2 className="text-emerald-500" size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Today</span>
                        </div>
                        <h2 className="text-xl font-bold mb-3">Today's Focus</h2>
                        <div className="space-y-3">
                            {todayTodos.length > 0 ? (
                                todayTodos.slice(0, 3).map(todo => (
                                    <div key={todo.id} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${todo.completed ? 'bg-gray-300' : 'bg-emerald-400'}`} />
                                        <span className={`text-sm font-medium transition-colors ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                            {todo.text}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">No tasks for today</p>
                            )}
                            {todayTodos.length > 3 && (
                                <p className="text-[10px] text-indigo-600 font-bold ml-4">+{todayTodos.length - 3} more tasks</p>
                            )}
                        </div>
                        <button onClick={() => setIsCalendarOpen(true)} className="mt-6 text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1 group">
                            View Agenda <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Upcoming Events Section */}
                    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                <Clock className="text-indigo-500" size={24} />
                            </div>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg uppercase tracking-wider">Upcoming</span>
                        </div>
                        <h2 className="text-xl font-bold mb-3">Schedule</h2>
                        <div className="space-y-4">
                            {upcomingTodos.length > 0 ? (
                                upcomingTodos.map(todo => (
                                    <div key={todo.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-1 h-1 bg-indigo-300 rounded-full" />
                                            <span className="text-sm font-medium text-gray-700 truncate">{todo.text}</span>
                                        </div>
                                        <span className="text-[9px] font-bold text-indigo-400 shrink-0">{todo.date}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">Clear schedule ahead</p>
                            )}
                        </div>
                    </div>

                    {/* Reminders / Overdue Section */}
                    <AnimatePresence>
                        {overdueTodos.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-8 bg-amber-50/50 rounded-3xl border border-amber-100 shadow-[0_10px_40px_rgba(245,158,11,0.05)] md:col-span-2 lg:col-span-1"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                                        <AlertCircle className="text-amber-600" size={24} />
                                    </div>
                                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                                        {overdueTodos.length} Pending
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold mb-2">Incomplete</h2>
                                <p className="text-amber-600/70 text-[12px] font-medium mb-6">Past tasks requiring your attention</p>

                                <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                                    {overdueTodos.map(todo => (
                                        <div key={todo.id} className="flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-amber-100/50 shadow-sm">
                                            <ListTodo size={14} className="text-amber-400 shrink-0" />
                                            <span className="text-xs font-semibold text-gray-700 flex-1 truncate">{todo.text}</span>
                                            <span className="text-[9px] font-extrabold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md uppercase">{todo.date}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsCalendarOpen(true)}
                                    className="mt-6 w-full py-3 bg-white text-amber-600 border border-amber-200 rounded-2xl font-bold text-xs hover:bg-amber-100 transition-colors shadow-sm"
                                >
                                    Review All
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating Toggle Icon */}
            <button
                onClick={() => setIsCalendarOpen(true)}
                className="fixed bottom-8 right-8 p-5 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-200 hover:scale-110 active:scale-95 transition-all duration-300 group z-40"
            >
                <Calendar size={28} className="group-hover:rotate-12 transition-transform duration-300" />
                {overdueTodos.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-4 border-gray-50 flex items-center justify-center">
                        {overdueTodos.length}
                    </span>
                )}
                <div className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold py-3 px-5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl translate-x-4 group-hover:translate-x-0">
                    To-do Calendar
                </div>
            </button>

            <TodoCalendar
                isOpen={isCalendarOpen}
                onClose={() => setIsCalendarOpen(false)}
            />
        </div>
    );
}
