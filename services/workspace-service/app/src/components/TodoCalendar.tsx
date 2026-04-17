import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TodoCalendar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState<Record<string, { id: number; text: string; completed: boolean }[]>>({});
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("hyperactive_calendar_todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error("Failed to parse todos", e);
      }
    }
  }, []);

  const saveTodos = (updatedTodos: Record<string, { id: number; text: string; completed: boolean }[]>) => {
    setTodos(updatedTodos);
    localStorage.setItem("hyperactive_calendar_todos", JSON.stringify(updatedTodos));
  };

  const dateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const key = dateKey(selectedDate);
    const updatedTodos = { ...todos };
    if (!updatedTodos[key]) updatedTodos[key] = [];
    updatedTodos[key].push({ id: Date.now(), text: newTodo, completed: false });
    saveTodos(updatedTodos);
    setNewTodo("");
  };

  const deleteTodo = (id: number) => {
    const key = dateKey(selectedDate);
    const updatedTodos = { ...todos };
    updatedTodos[key] = updatedTodos[key].filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
  };

  const toggleTodo = (id: number) => {
    const key = dateKey(selectedDate);
    const updatedTodos = { ...todos };
    updatedTodos[key] = updatedTodos[key].map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(updatedTodos);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const currentTodos = todos[dateKey(selectedDate)] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-gray-100"
          >
            {/* Calendar Section */}
            <div className="flex-1 p-8 border-r border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{monthName}</h2>
                  <p className="text-gray-500 font-medium">{year}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={prevMonth} className="p-2.5 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200 border border-gray-100 bg-white/50"><ChevronLeft size={20} className="text-gray-600"/></button>
                  <button onClick={nextMonth} className="p-2.5 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200 border border-gray-100 bg-white/50"><ChevronRight size={20} className="text-gray-600"/></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest py-2">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(year, month, day);
                  const isSelected = dateKey(date) === dateKey(selectedDate);
                  const isToday = dateKey(date) === dateKey(new Date());
                  const hasTasks = todos[dateKey(date)]?.length > 0;

                  return (
                    <button 
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={`relative aspect-square rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-200
                        ${isSelected 
                          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105 z-10' 
                          : 'hover:bg-white text-gray-700 hover:shadow-lg hover:shadow-gray-100'}
                        ${isToday && !isSelected ? 'text-indigo-600 bg-indigo-50/50' : ''}
                      `}
                    >
                      {day}
                      {hasTasks && !isSelected && (
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Todo Section */}
            <div className="w-full md:w-[350px] p-8 flex flex-col bg-white">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Agenda for</h3>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={20}/>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-1 custom-scrollbar">
                {currentTodos.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100">
                      <CalendarIcon size={28} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">Your schedule is clear</p>
                  </div>
                ) : (
                  currentTodos.map(todo => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={todo.id} 
                      className="group flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                      <input 
                        type="checkbox" 
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500 border-gray-300 transition-all cursor-pointer"
                      />
                      <span className={`text-[15px] font-medium flex-1 transition-all duration-300 ${todo.completed ? 'line-through text-gray-400 opacity-60' : 'text-gray-700'}`}>
                        {todo.text}
                      </span>
                      <button 
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-auto">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Add an event..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                    className="w-full pl-5 pr-12 py-4 bg-gray-50 border border-gray-100 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5 rounded-2xl transition-all duration-300 text-[15px] font-medium outline-none placeholder:text-gray-400"
                  />
                  <button 
                    onClick={addTodo}
                    disabled={!newTodo.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300
                      ${newTodo.trim() 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95' 
                        : 'bg-gray-100 text-gray-400'}`}
                  >
                    <Plus size={20}/>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TodoCalendar;
