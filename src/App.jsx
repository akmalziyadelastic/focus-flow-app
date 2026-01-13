import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Plus, Check } from 'lucide-react';
import CircularTimer from './components/CircularTimer';

const MODES = {
  FOCUS: { time: 25 * 60, label: 'Deep Work', color: '#8b5cf6' },
  SHORT_BREAK: { time: 5 * 60, label: 'Short Break', color: '#06b6d4' },
  LONG_BREAK: { time: 15 * 60, label: 'Long Break', color: '#22c55e' }
};

function App() {
  const [timeLeft, setTimeLeft] = useState(MODES.FOCUS.time);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('FOCUS'); // FOCUS, SHORT_BREAK, LONG_BREAK
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('focus-flow-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
       return [];
    }
  });
  const [newTask, setNewTask] = useState('');

  // Persist Tasks
  useEffect(() => {
    localStorage.setItem('focus-flow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle Timer
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  // Update logic when mode changes
  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].time);
    setIsActive(false);
    
    // Update Theme color in CSS variables
    document.documentElement.style.setProperty('--color-primary', MODES[newMode].color);
    document.documentElement.style.setProperty('--color-primary-glow', MODES[newMode].color + '80');
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].time);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteCompleted = () => {
     setTasks(tasks.filter(t => !t.completed));
  }

  return (
    <div className="container flex-col" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Header */}
      <header className="glass-panel flex-center" style={{ 
        padding: '1rem', 
        justifyContent: 'space-between', 
        marginBottom: '1.5rem',
        marginTop: '0.5rem',
        background: 'rgba(20, 20, 25, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: 32, 
            height: 32, 
            borderRadius: '8px', 
            background: 'linear-gradient(135deg, var(--color-primary), #4c1d95)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 10px var(--color-primary-glow)'
          }}>
             <Brain size={18} color="white" />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.5px' }}>FocusFlow</h1>
        </div>
        <div style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
           v1.2
        </div>
      </header>

      {/* Main Timer Section */}
      <main className="glass-panel animate-fade-in" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '2rem 1.5rem',
        marginBottom: '1.5rem',
        animationDelay: '0.1s'
      }}>
        {/* Mode Toggles */}
        <div style={{ 
          display: 'flex', 
          gap: '4px', 
          background: 'rgba(0,0,0,0.3)', 
          padding: '4px', 
          borderRadius: '999px',
          marginBottom: '1rem'
        }}>
          {Object.keys(MODES).map(key => (
             <button
               key={key}
               onClick={() => switchMode(key)}
               style={{
                 background: mode === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                 color: mode === key ? '#fff' : 'var(--text-secondary)',
                 padding: '8px 16px',
                 borderRadius: '999px',
                 fontSize: '0.85rem',
                 fontWeight: 600,
                 transition: 'all 0.3s'
               }}
             >
               {MODES[key].label}
             </button>
          ))}
        </div>

        <CircularTimer 
          timeLeft={timeLeft} 
          maxTime={MODES[mode].time} 
          isActive={isActive} 
        />

        {/* Controls */}
        <div className="flex-center" style={{ gap: '2rem', marginTop: '1rem' }}>
          <button 
            onClick={resetTimer}
            className="icon-btn"
            style={{ padding: '0.8rem', opacity: 0.8 }}
            aria-label="Reset Timer"
          >
            <RotateCcw size={22} />
          </button>

          <button 
            onClick={toggleTimer}
            className="glass-button flex-center"
            style={{ 
              width: '72px', 
              height: '72px', 
              borderRadius: '50%',
              padding: 0,
              fontSize: '2rem',
              background: isActive ? 'rgba(239, 68, 68, 0.15)' : 'rgba(139, 92, 246, 0.15)',
              borderColor: isActive ? 'rgba(239, 68, 68, 0.3)' : 'rgba(139, 92, 246, 0.3)',
              color: isActive ? '#ef4444' : 'var(--color-primary)'
            }}
          >
             {isActive ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" style={{ marginLeft: '4px' }} />}
          </button>
          
          <div style={{ width: 44 }} /> {/* Visual balance */}
        </div>
      </main>

      {/* Quick Tasks */}
      <section className="glass-panel animate-fade-in" style={{ padding: '1.5rem', animationDelay: '0.2s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            color: 'var(--text-secondary)', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Tasks
          </h3>
          {tasks.some(t => t.completed) && (
             <button onClick={deleteCompleted} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'transparent' }}>
               Clear Completed
             </button>
          )}
        </div>
        
        <form onSubmit={addTask} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'white',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
          <button 
            type="submit"
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              width: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Plus size={24} />
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="glass-card"
              style={{ 
                padding: '12px 16px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                opacity: task.completed ? 0.5 : 1,
                textDecoration: task.completed ? 'line-through' : 'none'
              }}
            >
              <button 
                onClick={() => toggleTask(task.id)}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  border: task.completed ? 'none' : '2px solid rgba(255,255,255,0.3)',
                  background: task.completed ? 'var(--color-success)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {task.completed && <Check size={14} color="#000" strokeWidth={3} />}
              </button>
              <span style={{ flex: 1, fontSize: '0.95rem' }}>
                {task.text}
              </span>
            </div>
          ))}
          {tasks.length === 0 && (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem', padding: '1rem' }}>
              No tasks active
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
