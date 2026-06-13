import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const canSubmit = email.length > 0 && password.length > 0 && terms;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    navigate('/success');
  }

  return (
    <main
      data-cy="login-page"
      style={{
        maxWidth: 400,
        margin: '3rem auto',
        padding: '2rem',
        background: '#161b22',
        borderRadius: 12,
        border: '1px solid #30363d',
      }}
    >
      <h1 style={{ marginTop: 0 }}>Giriş</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>
            E-posta
          </label>
          <input
            id="email"
            type="email"
            data-cy="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>
            Şifre
          </label>
          <input
            id="password"
            type="password"
            data-cy="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444' }}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem', cursor: 'pointer' }}>
          <input type="checkbox" data-cy="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>Şartları kabul ediyorum</span>
        </label>
        <button
          type="submit"
          data-cy="login-submit"
          disabled={!canSubmit}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 8,
            border: 'none',
            fontWeight: 600,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            background: canSubmit ? '#238636' : '#30363d',
            color: '#fff',
          }}
        >
          Giriş yap
        </button>
      </form>
    </main>
  );
}
