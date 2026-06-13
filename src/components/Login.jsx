import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{}|\\:;"'<>,./~`])[A-Za-z\d@$!%*?&#^()_+\-=[\]{}|\\:;"'<>,./~`]{8,}$/;

const EMAIL_ERROR_TEXT = 'Geçerli bir e-posta adresi girin.';
const PASSWORD_ERROR_TEXT =
  'Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermelidir.';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailValid = EMAIL_REGEX.test(email);
  const passwordValid = PASSWORD_REGEX.test(password);
  const emailError = touched.email && !emailValid;
  const passwordError = touched.password && !passwordValid;

  const canSubmit = useMemo(
    () => emailValid && passwordValid && terms,
    [emailValid, passwordValid, terms]
  );

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
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444' }}
          />
          {emailError ? (
            <p data-cy="form-error" data-field="email" style={{ color: '#f85149', margin: '6px 0 0', fontSize: 14 }}>
              {EMAIL_ERROR_TEXT}
            </p>
          ) : null}
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
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444' }}
          />
          {passwordError ? (
            <p data-cy="form-error" data-field="password" style={{ color: '#f85149', margin: '6px 0 0', fontSize: 14 }}>
              {PASSWORD_ERROR_TEXT}
            </p>
          ) : null}
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
