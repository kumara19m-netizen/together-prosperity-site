'use client';
import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'conference' | 'demo';
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  location: string;
  description: string;
  speaker: string;
  speakerRole: string;
  registrationLink: string;
  seats: number;
  registeredCount: number;
  tags: string[];
  color: string;
  icon: string;
}

const STORAGE_KEY = 'tp_events';
const REGISTRATIONS_KEY = 'tp_event_registrations';

const INIT_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Blockchain for Government: Live Demo',
    type: 'demo',
    date: '2026-05-15',
    time: '3:00 PM IST',
    mode: 'online',
    location: 'Google Meet',
    description: 'Watch a live demonstration of our blockchain-based land record management system. See how we digitized 50,000+ records for Karnataka municipalities.',
    speaker: 'Madhu Vamshi K R',
    speakerRole: 'Founder & CEO',
    registrationLink: '#contact',
    seats: 100,
    registeredCount: 67,
    tags: ['Blockchain', 'Gov-tech', 'Demo'],
    color: '#D4A017',
    icon: '⛓️',
  },
  {
    id: '2',
    title: 'Zero-Trust Cybersecurity Workshop',
    type: 'workshop',
    date: '2026-05-22',
    time: '10:00 AM IST',
    mode: 'hybrid',
    location: 'Bangalore + Online',
    description: 'A hands-on workshop covering zero-trust architecture implementation for Indian enterprises. Learn practical strategies to secure your digital infrastructure.',
    speaker: 'Junaid Khan',
    speakerRole: 'Co-Founder & CTO',
    registrationLink: '#contact',
    seats: 50,
    registeredCount: 38,
    tags: ['Cybersecurity', 'Zero-Trust', 'Workshop'],
    color: '#F5A623',
    icon: '🔒',
  },
  {
    id: '3',
    title: 'IoT & AI for Smart Agriculture Webinar',
    type: 'webinar',
    date: '2026-06-05',
    time: '4:00 PM IST',
    mode: 'online',
    location: 'Zoom Webinar',
    description: 'Discover how IoT sensors and ML models can increase crop yield by 22%. Real case studies from Karnataka farmers and agri-enterprises.',
    speaker: 'Kumara Swamy M',
    speakerRole: 'Director & COO',
    registrationLink: '#contact',
    seats: 200,
    registeredCount: 124,
    tags: ['IoT', 'AI/ML', 'Agriculture'],
    color: '#2ECC40',
    icon: '📡',
  },
];

const loadLS = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
};
const saveLS = (key: string, val: any) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

const TYPE_COLORS: Record<string, string> = {
  webinar: '#2196F3',
  workshop: '#F5A623',
  conference: '#9C27B0',
  demo: '#D4A017',
};

const TYPE_ICONS: Record<string, string> = {
  webinar: '🎥',
  workshop: '🛠️',
  conference: '🏛️',
  demo: '🚀',
};

export default function EventsSection({ isAdmin = false }: { isAdmin?: boolean }) {
  const [events, setEvents] = useState<Event[]>(INIT_EVENTS);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [regEmail, setRegEmail] = useState('');
  const [regName, setRegName] = useState('');
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [registeringFor, setRegisteringFor] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState('');
  const [filter, setFilter] = useState<'all' | 'webinar' | 'workshop' | 'demo' | 'conference'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [draft, setDraft] = useState<Omit<Event, 'id' | 'registeredCount'>>({
    title: '', type: 'webinar', date: '', time: '', mode: 'online',
    location: '', description: '', speaker: '', speakerRole: '',
    registrationLink: '#contact', seats: 100, tags: [], color: '#D4A017', icon: '🎥',
  });

  useEffect(() => {
    setEvents(loadLS(STORAGE_KEY, INIT_EVENTS));
    setRegisteredIds(loadLS(REGISTRATIONS_KEY, []));
  }, []);

  useEffect(() => { saveLS(STORAGE_KEY, events); }, [events]);
  useEffect(() => { saveLS(REGISTRATIONS_KEY, registeredIds); }, [registeredIds]);

  const filtered = events.filter(e => filter === 'all' || e.type === filter);

  const handleRegister = (eventId: string) => {
    if (!regName.trim() || !regEmail.trim()) return;
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));
    setRegisteredIds(prev => [...prev, eventId]);
    setRegSuccess(`✅ Registered! Check ${regEmail} for confirmation.`);
    setRegName(''); setRegEmail('');
    setTimeout(() => { setRegSuccess(''); setRegisteringFor(null); }, 3000);
  };

  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  const saveEvent = () => {
    if (!draft.title.trim() || !draft.date) return;
    setEvents(prev => [...prev, { id: crypto.randomUUID(), ...draft, registeredCount: 0 }]);
    setShowAddModal(false);
    setDraft({ title: '', type: 'webinar', date: '', time: '', mode: 'online', location: '', description: '', speaker: '', speakerRole: '', registrationLink: '#contact', seats: 100, tags: [], color: '#D4A017', icon: '🎥' });
  };

  const formatDate = (d: string) => {
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const isPast = (d: string) => new Date(d) < new Date();
  const seatsLeft = (e: Event) => e.seats - e.registeredCount;

  const sty = {
    section: { padding: '100px 60px', background: 'rgba(33,150,243,.025)', position: 'relative' as const, zIndex: 1 },
    tag: (color: string, active?: boolean) => ({ background: active ? `${color}22` : 'rgba(255,255,255,.04)', border: `1px solid ${active ? color : 'rgba(255,255,255,.08)'}`, color: active ? color : 'rgba(255,255,255,.5)', padding: '5px 16px', borderRadius: '50px', fontSize: '9px', letterSpacing: '3px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Space Mono',monospace", transition: 'all .2s' }),
    card: (color: string) => ({ background: 'rgba(255,255,255,.018)', border: `1px solid ${color}25`, borderRadius: '20px', padding: '28px', transition: 'all .4s', cursor: 'pointer', position: 'relative' as const, overflow: 'hidden' as const }),
    badge: (color: string) => ({ background: `${color}18`, border: `1px solid ${color}30`, color, padding: '3px 10px', borderRadius: '50px', fontSize: '9px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px', fontWeight: 700 }),
    inp: { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const },
  };

  return (
    <section id="events" style={sty.section}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontFamily: "'Space Mono',monospace", color: 'rgba(33,150,243,.7)', fontSize: '8.5px', letterSpacing: '7px', display: 'block', marginBottom: '12px', fontWeight: 700 }}>EVENTS & WEBINARS</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>Learn. Connect. Build.</h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>Live demos, workshops, and webinars on Blockchain, Cybersecurity, IoT, and AI/ML.</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {(['all', 'webinar', 'workshop', 'demo', 'conference'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={sty.tag('#2196F3', filter === f)}>
              {f === 'all' ? '🌐 ALL' : `${TYPE_ICONS[f]} ${f.toUpperCase()}`}
            </button>
          ))}
          {isAdmin && (
            <button onClick={() => setShowAddModal(true)} style={{ ...sty.tag('#D4A017'), background: 'rgba(212,160,23,.1)', borderColor: '#D4A017', color: '#D4A017' }}>
              + ADD EVENT
            </button>
          )}
        </div>

        {/* Events grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '24px' }}>
          {filtered.map(event => (
            <div key={event.id} style={sty.card(event.color)} onClick={() => setActiveEvent(event)}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)'; (e.currentTarget as HTMLDivElement).style.borderColor = `${event.color}55`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = `${event.color}25`; }}>

              {/* Top stripe */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,transparent,${event.color},transparent)` }} />

              {/* Past overlay */}
              {isPast(event.date) && <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.4)', padding: '3px 10px', borderRadius: '50px', fontSize: '9px', fontFamily: "'Space Mono',monospace" }}>PAST</div>}

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '52px', height: '52px', background: `${event.color}18`, border: `1px solid ${event.color}30`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{event.icon}</div>
                <div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={sty.badge(TYPE_COLORS[event.type])}>{TYPE_ICONS[event.type]} {event.type.toUpperCase()}</span>
                    <span style={sty.badge(event.mode === 'online' ? '#2ECC40' : event.mode === 'hybrid' ? '#9C27B0' : '#2196F3')}>{event.mode === 'online' ? '🌐' : event.mode === 'hybrid' ? '🔀' : '📍'} {event.mode.toUpperCase()}</span>
                  </div>
                  <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>{event.title}</h3>
                </div>
              </div>

              <p style={{ color: 'rgba(255,255,255,.45)', fontSize: '12.5px', lineHeight: 1.8, marginBottom: '16px' }}>{event.description.slice(0, 100)}...</p>

              {/* Date / time */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ color: event.color, fontSize: '11px', fontFamily: "'Space Mono',monospace" }}>📅 {formatDate(event.date)}</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', fontFamily: "'Space Mono',monospace" }}>⏰ {event.time}</span>
              </div>

              {/* Seats progress */}
              {!isPast(event.date) && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.4)', fontFamily: "'Space Mono',monospace" }}>SEATS FILLED</span>
                    <span style={{ fontSize: '10px', color: seatsLeft(event) < 20 ? '#f44336' : event.color, fontFamily: "'Space Mono',monospace" }}>{seatsLeft(event)} left</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(event.registeredCount / event.seats) * 100}%`, background: `linear-gradient(90deg,${event.color},${event.color}cc)`, borderRadius: '2px', transition: 'width .5s' }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                {!isPast(event.date) && !registeredIds.includes(event.id) ? (
                  <button onClick={() => setRegisteringFor(event.id)} style={{ background: `linear-gradient(135deg,${event.color},${event.color}cc)`, border: 'none', borderRadius: '50px', padding: '8px 20px', color: '#000', fontWeight: 700, fontSize: '10px', cursor: 'pointer', letterSpacing: '2px' }}>REGISTER FREE →</button>
                ) : !isPast(event.date) ? (
                  <span style={{ color: '#2ECC40', fontSize: '10px', fontFamily: "'Space Mono',monospace" }}>✅ REGISTERED</span>
                ) : (
                  <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '10px', fontFamily: "'Space Mono',monospace" }}>📼 RECORDING AVAILABLE</span>
                )}
                {isAdmin && (
                  <button onClick={() => deleteEvent(event.id)} style={{ background: 'rgba(244,67,54,.1)', border: '1px solid rgba(244,67,54,.2)', color: '#f44336', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px' }}>✕</button>
                )}
              </div>

              {/* Registration form inline */}
              {registeringFor === event.id && (
                <div style={{ marginTop: '16px', background: 'rgba(255,255,255,.04)', borderRadius: '12px', padding: '16px', border: `1px solid ${event.color}30` }} onClick={e => e.stopPropagation()}>
                  {regSuccess ? (
                    <p style={{ color: '#2ECC40', fontSize: '12px', textAlign: 'center' }}>{regSuccess}</p>
                  ) : (
                    <>
                      <input value={regName} onChange={e => setRegName(e.target.value)} placeholder="Your Name *" style={{ ...sty.inp, marginBottom: '10px' }} />
                      <input value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email *" type="email" style={{ ...sty.inp, marginBottom: '10px' }} />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleRegister(event.id)} style={{ flex: 1, background: `linear-gradient(135deg,${event.color},${event.color}cc)`, border: 'none', borderRadius: '8px', padding: '10px', color: '#000', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>CONFIRM →</button>
                        <button onClick={() => setRegisteringFor(null)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px', padding: '10px 14px', color: 'rgba(255,255,255,.4)', cursor: 'pointer', fontSize: '11px' }}>✕</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,.3)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <p>No events in this category. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Event detail modal */}
      {activeEvent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setActiveEvent(null)}>
          <div style={{ background: '#050510', border: `1px solid ${activeEvent.color}30`, borderRadius: '24px', padding: '36px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ fontSize: '40px' }}>{activeEvent.icon}</div>
              <button onClick={() => setActiveEvent(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.4)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={sty.badge(TYPE_COLORS[activeEvent.type])}>{activeEvent.type.toUpperCase()}</span>
              <span style={sty.badge(activeEvent.mode === 'online' ? '#2ECC40' : '#9C27B0')}>{activeEvent.mode.toUpperCase()}</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>{activeEvent.title}</h2>
            <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '13px', lineHeight: 1.9, marginBottom: '24px' }}>{activeEvent.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: '📅 DATE', val: formatDate(activeEvent.date) },
                { label: '⏰ TIME', val: activeEvent.time },
                { label: '📍 LOCATION', val: activeEvent.location },
                { label: '🎟 SEATS LEFT', val: `${seatsLeft(activeEvent)} / ${activeEvent.seats}` },
              ].map(({ label, val }) => (
                <div key={label} style={{ background: 'rgba(255,255,255,.03)', borderRadius: '10px', padding: '12px 16px' }}>
                  <div style={{ color: 'rgba(255,255,255,.35)', fontSize: '9px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px', marginBottom: '4px' }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ background: `${activeEvent.color}0a`, border: `1px solid ${activeEvent.color}20`, borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ color: activeEvent.color, fontSize: '9px', fontFamily: "'Space Mono',monospace", letterSpacing: '3px', marginBottom: '8px' }}>🎤 SPEAKER</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>{activeEvent.speaker}</div>
              <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '12px', marginTop: '4px' }}>{activeEvent.speakerRole}</div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {activeEvent.tags.map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', color: 'rgba(255,255,255,.5)', padding: '4px 12px', borderRadius: '50px', fontSize: '10px', fontFamily: "'Space Mono',monospace" }}>{tag}</span>
              ))}
            </div>

            {!isPast(activeEvent.date) && !registeredIds.includes(activeEvent.id) && (
              <div style={{ marginTop: '24px' }}>
                <input value={regName} onChange={e => setRegName(e.target.value)} placeholder="Your Name *" style={{ ...sty.inp, marginBottom: '10px' }} />
                <input value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="Email *" type="email" style={{ ...sty.inp, marginBottom: '12px' }} />
                {regSuccess ? (
                  <p style={{ color: '#2ECC40', textAlign: 'center', fontSize: '13px' }}>{regSuccess}</p>
                ) : (
                  <button onClick={() => handleRegister(activeEvent.id)} style={{ width: '100%', background: `linear-gradient(135deg,${activeEvent.color},${activeEvent.color}cc)`, border: 'none', borderRadius: '12px', padding: '14px', color: '#000', fontWeight: 800, fontSize: '11px', cursor: 'pointer', letterSpacing: '2px' }}>REGISTER FOR FREE →</button>
                )}
              </div>
            )}
            {registeredIds.includes(activeEvent.id) && <p style={{ color: '#2ECC40', textAlign: 'center', marginTop: '16px', fontSize: '13px' }}>✅ You are registered for this event!</p>}
          </div>
        </div>
      )}

      {/* Add Event Modal (Admin) */}
      {showAddModal && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowAddModal(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.2)', borderRadius: '24px', padding: '36px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: '#D4A017', fontSize: '22px', fontWeight: 800, marginBottom: '24px' }}>📅 Add Event / Webinar</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input style={sty.inp} placeholder="Event Title *" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <select style={sty.inp} value={draft.type} onChange={e => setDraft({ ...draft, type: e.target.value as any })}>
                  <option value="webinar">🎥 Webinar</option>
                  <option value="workshop">🛠️ Workshop</option>
                  <option value="demo">🚀 Demo</option>
                  <option value="conference">🏛️ Conference</option>
                </select>
                <select style={sty.inp} value={draft.mode} onChange={e => setDraft({ ...draft, mode: e.target.value as any })}>
                  <option value="online">🌐 Online</option>
                  <option value="offline">📍 Offline</option>
                  <option value="hybrid">🔀 Hybrid</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input style={sty.inp} type="date" value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} />
                <input style={sty.inp} placeholder="Time (e.g. 3:00 PM IST)" value={draft.time} onChange={e => setDraft({ ...draft, time: e.target.value })} />
              </div>
              <input style={sty.inp} placeholder="Location / Platform" value={draft.location} onChange={e => setDraft({ ...draft, location: e.target.value })} />
              <textarea style={{ ...sty.inp, resize: 'vertical' as const }} rows={3} placeholder="Description *" value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input style={sty.inp} placeholder="Speaker Name" value={draft.speaker} onChange={e => setDraft({ ...draft, speaker: e.target.value })} />
                <input style={sty.inp} placeholder="Speaker Role" value={draft.speakerRole} onChange={e => setDraft({ ...draft, speakerRole: e.target.value })} />
              </div>
              <input style={sty.inp} type="number" placeholder="Total Seats" value={draft.seats} onChange={e => setDraft({ ...draft, seats: parseInt(e.target.value) || 100 })} />
              <input style={sty.inp} placeholder="Tags (comma separated)" onChange={e => setDraft({ ...draft, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} />
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button onClick={saveEvent} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '12px', color: '#000', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>💾 SAVE EVENT</button>
                <button onClick={() => setShowAddModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '12px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
