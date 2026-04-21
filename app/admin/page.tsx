'use client';
import { useState } from 'react';

const ADMIN_PASSWORD = 'TP@Admin2025'; // Change this!

const MOCK_SUBMISSIONS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@gmail.com',
    phone: '+91 98765 43210',
    message: 'Interested in portfolio management services.',
    date: '2025-01-15 10:32 AM',
    status: 'New',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@outlook.com',
    phone: '+91 87654 32109',
    message: 'Want to know more about AI investment plans.',
    date: '2025-01-14 03:15 PM',
    status: 'Contacted',
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'amit@company.com',
    phone: '+91 76543 21098',
    message: 'Corporate wealth management inquiry for 50+ employees.',
    date: '2025-01-13 11:00 AM',
    status: 'Closed',
  },
];

const STATUS_COLORS: Record<string, string> = {
  New: '#4f8cff',
  Contacted: '#f59e0b',
  Closed: '#34d399',
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'submissions'>('dashboard');
  const [submissions] = useState(MOCK_SUBMISSIONS);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!authenticated) {
    return (
      <>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #050c1a; color: #e2e8f0;
            font-family: 'Segoe UI', system-ui, sans-serif;
            min-height: 100vh; display: flex; align-items: center; justify-content: center;
          }
          .login-box {
            background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
            border-radius: 16px; padding: 2.5rem; width: 100%; max-width: 380px;
            margin: 1rem;
          }
          .login-logo { text-align: center; margin-bottom: 2rem; }
          .login-logo .icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
          .login-logo h2 { font-size: 1.3rem; font-weight: 700; }
          .login-logo p { color: #94a3b8; font-size: 0.85rem; margin-top: 0.25rem; }
          label { font-size: 0.85rem; font-weight: 600; color: #94a3b8; display: block; margin-bottom: 0.5rem; }
          input {
            width: 100%; background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
            padding: 12px 14px; color: #e2e8f0; font-size: 0.95rem;
            outline: none; margin-bottom: 1.25rem; font-family: inherit;
            transition: border-color 0.2s;
          }
          input:focus { border-color: #4f8cff; }
          .login-btn {
            width: 100%; padding: 13px;
            background: linear-gradient(135deg, #4f8cff, #a78bfa);
            color: #fff; border: none; border-radius: 10px;
            font-size: 1rem; font-weight: 600; cursor: pointer;
          }
          .error { color: #fca5a5; font-size: 0.85rem; margin-bottom: 1rem; }
        `}</style>
        <div className="login-box">
          <div className="login-logo">
            <div className="icon">🔐</div>
            <h2>Admin Login</h2>
            <p>Together Prosperity Pvt. Ltd.</p>
          </div>
          <form onSubmit={handleLogin}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              required
            />
            {error && <div className="error">⚠️ {error}</div>}
            <button type="submit" className="login-btn">🔓 Login to Admin</button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #050c1a; --bg2: #0a1628; --accent: #4f8cff;
          --text: #e2e8f0; --muted: #94a3b8;
          --card: rgba(255,255,255,0.04); --border: rgba(255,255,255,0.08);
        }
        body {
          background: var(--bg); color: var(--text);
          font-family: 'Segoe UI', system-ui, sans-serif; min-height: 100vh;
        }
        .admin-layout { display: flex; min-height: 100vh; }
        .sidebar {
          width: 220px; background: var(--bg2); border-right: 1px solid var(--border);
          padding: 1.5rem 0; display: flex; flex-direction: column; flex-shrink: 0;
        }
        .sidebar-brand {
          padding: 0 1.5rem 1.5rem; border-bottom: 1px solid var(--border);
          font-size: 1rem; font-weight: 700;
        }
        .sidebar-brand span { color: var(--accent); }
        .sidebar-brand small { display: block; color: var(--muted); font-size: 0.75rem; font-weight: 400; margin-top: 2px; }
        .sidebar-nav { padding: 1rem 0.75rem; flex: 1; }
        .sidebar-btn {
          display: flex; align-items: center; gap: 0.6rem;
          width: 100%; padding: 10px 12px; border-radius: 8px;
          background: none; border: none; color: var(--muted);
          cursor: pointer; font-size: 0.9rem; margin-bottom: 2px;
          transition: background 0.15s, color 0.15s; text-align: left;
        }
        .sidebar-btn:hover, .sidebar-btn.active {
          background: rgba(79,140,255,0.1); color: #fff;
        }
        .sidebar-btn.active { color: var(--accent); }
        .sidebar-logout {
          padding: 1rem 0.75rem; border-top: 1px solid var(--border);
        }
        .main { flex: 1; padding: 2rem; overflow-x: auto; }
        .page-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
        .page-sub { color: var(--muted); font-size: 0.9rem; margin-bottom: 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .stat-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 12px; padding: 1.25rem;
        }
        .stat-card .s-label { font-size: 0.8rem; color: var(--muted); margin-bottom: 0.5rem; }
        .stat-card .s-value { font-size: 1.8rem; font-weight: 800; color: var(--accent); }
        .stat-card .s-hint { font-size: 0.75rem; color: var(--muted); margin-top: 4px; }
        .table-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 12px; overflow: hidden;
        }
        .table-header {
          padding: 1rem 1.25rem; border-bottom: 1px solid var(--border);
          font-weight: 700; font-size: 0.95rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        table { width: 100%; border-collapse: collapse; }
        th {
          text-align: left; padding: 0.75rem 1rem;
          font-size: 0.8rem; color: var(--muted); font-weight: 600;
          border-bottom: 1px solid var(--border); text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        td {
          padding: 0.9rem 1rem; border-bottom: 1px solid var(--border);
          font-size: 0.875rem; vertical-align: top;
        }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,0.02); }
        .badge {
          display: inline-block; padding: 3px 10px; border-radius: 100px;
          font-size: 0.75rem; font-weight: 600;
        }
        .msg-cell { max-width: 240px; color: var(--muted); font-size: 0.8rem; line-height: 1.5; }
        .back-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          color: var(--muted); text-decoration: none; font-size: 0.85rem;
          margin-bottom: 1.5rem; cursor: pointer; background: none; border: none;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--text); }
        @media (max-width: 768px) {
          .sidebar { width: 60px; }
          .sidebar-brand small, .sidebar-brand > div { display: none; }
          .sidebar-btn span { display: none; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          table { font-size: 0.8rem; }
          th, td { padding: 0.6rem 0.5rem; }
        }
      `}</style>
      <div className="admin-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div><span>Together</span> Prosperity</div>
            <small>Admin Panel</small>
          </div>
          <div className="sidebar-nav">
            <button
              className={`sidebar-btn${activeTab === 'dashboard' ? ' active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 <span>Dashboard</span>
            </button>
            <button
              className={`sidebar-btn${activeTab === 'submissions' ? ' active' : ''}`}
              onClick={() => setActiveTab('submissions')}
            >
              📬 <span>Enquiries</span>
            </button>
          </div>
          <div className="sidebar-logout">
            <button
              className="sidebar-btn"
              onClick={() => setAuthenticated(false)}
            >
              🚪 <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="main">
          {activeTab === 'dashboard' && (
            <>
              <div className="page-title">Dashboard</div>
              <div className="page-sub">Welcome back — here&apos;s your overview</div>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="s-label">Total Enquiries</div>
                  <div className="s-value">3</div>
                  <div className="s-hint">+2 this week</div>
                </div>
                <div className="stat-card">
                  <div className="s-label">New (Unread)</div>
                  <div className="s-value" style={{ color: '#4f8cff' }}>1</div>
                  <div className="s-hint">Needs response</div>
                </div>
                <div className="stat-card">
                  <div className="s-label">Contacted</div>
                  <div className="s-value" style={{ color: '#f59e0b' }}>1</div>
                  <div className="s-hint">Follow up pending</div>
                </div>
                <div className="stat-card">
                  <div className="s-label">Closed</div>
                  <div className="s-value" style={{ color: '#34d399' }}>1</div>
                  <div className="s-hint">Converted / Resolved</div>
                </div>
              </div>
              <div className="table-card">
                <div className="table-header">
                  <span>Recent Enquiries</span>
                  <button
                    className="sidebar-btn"
                    style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}
                    onClick={() => setActiveTab('submissions')}
                  >
                    View All →
                  </button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.slice(0, 3).map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td style={{ color: 'var(--muted)' }}>{s.email}</td>
                        <td style={{ color: 'var(--muted)' }}>{s.date}</td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background: STATUS_COLORS[s.status] + '22',
                              color: STATUS_COLORS[s.status],
                            }}
                          >
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'submissions' && (
            <>
              <div className="page-title">All Enquiries</div>
              <div className="page-sub">Form submissions from your website</div>
              <div className="table-card">
                <div className="table-header">
                  <span>{submissions.length} total enquiries</span>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s) => (
                      <tr key={s.id}>
                        <td style={{ color: 'var(--muted)' }}>{s.id}</td>
                        <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{s.name}</td>
                        <td style={{ color: 'var(--muted)' }}>{s.email}</td>
                        <td style={{ color: 'var(--muted)', whiteSpace: 'nowrap' }}>{s.phone}</td>
                        <td className="msg-cell">{s.message}</td>
                        <td style={{ color: 'var(--muted)', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                          {s.date}
                        </td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              background: STATUS_COLORS[s.status] + '22',
                              color: STATUS_COLORS[s.status],
                            }}
                          >
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
