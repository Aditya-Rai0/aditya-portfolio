import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] pt-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[#00d4ff] font-mono text-sm mb-2">$ admin --login</p>
          <h2 className="text-3xl font-bold">Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Login</span></h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-xl border border-white/10 bg-[#12121a]">
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
              <i className="fas fa-exclamation-circle mr-2"></i>{error}
            </div>
          )}
          <div>
            <label className="text-xs text-gray-500 font-mono mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-mono mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300 disabled:opacity-50">
            {loading ? <><i className="fas fa-spinner fa-spin mr-2"></i> Authenticating...</> : <><i className="fas fa-lock mr-2"></i> Login</>}
          </button>
        </form>
      </div>
    </div>
  );
}
