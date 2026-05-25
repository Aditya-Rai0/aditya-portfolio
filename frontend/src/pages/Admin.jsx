import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getProfile, updateProfile, seedProfile,
  getProjects, createProject, updateProject, deleteProject,
  getCertificates, createCertificate, updateCertificate, deleteCertificate,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getSkills, createSkill, updateSkill, deleteSkill,
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
  seedAllData,
} from '../api';

const TABS = [
  { id: 'profile', label: 'Profile', icon: 'fa-user' },
  { id: 'projects', label: 'Projects', icon: 'fa-code' },
  { id: 'certificates', label: 'Certificates', icon: 'fa-certificate' },
  { id: 'experiences', label: 'Experience', icon: 'fa-briefcase' },
  { id: 'skills', label: 'Skills', icon: 'fa-brain' },
  { id: 'achievements', label: 'Achievements', icon: 'fa-trophy' },
];

export default function Admin() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState({});

  useEffect(() => {
    if (!authLoading && !user) { navigate('/login'); return; }
    if (user) fetchAll();
  }, [user, authLoading]);

  const fetchAll = async () => {
    try {
      const [p, pr, c, e, s, a] = await Promise.all([
        getProfile(), getProjects(), getCertificates(), getExperiences(), getSkills(), getAchievements(),
      ]);
      setData({ profile: p.data, projects: pr.data, certificates: c.data, experiences: e.data, skills: s.data, achievements: a.data });
    } catch {}
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="loader"></div>
      </div>
    );
  }

  const projectCategories = [...new Set((data.projects || []).map((p) => p.category).filter(Boolean))];
  const skillCategories = [...new Set((data.skills || []).map((s) => s.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#00d4ff] font-mono text-sm mb-1">$ sudo ./admin</p>
            <h1 className="text-3xl font-bold">Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Dashboard</span></h1>
          </div>
          <div className="flex gap-2">
            <button onClick={async () => {
              if (!confirm('Seed all collections with default sample data? This will DELETE all existing data.')) return;
              try {
                await seedAllData();
                fetchAll();
                alert('Sample data seeded! You can now edit/delete items below.');
              } catch { alert('Seed failed'); }
            }}
              className="px-4 py-2 border border-[#f59e0b]/30 text-[#f59e0b] rounded-lg text-sm hover:bg-[#f59e0b]/10 transition-colors">
              <i className="fas fa-database mr-2"></i>Seed Sample Data
            </button>
            <button onClick={logout}
              className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg text-sm hover:bg-red-500/10 transition-colors">
              <i className="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </div>
        </div>
        <div className="flex gap-3 mb-6 flex-wrap text-xs text-gray-500 font-mono">
          <span>Projects: <span className="text-white">{(data.projects||[]).length}</span></span>
          <span>Certificates: <span className="text-white">{(data.certificates||[]).length}</span></span>
          <span>Experiences: <span className="text-white">{(data.experiences||[]).length}</span></span>
          <span>Skills: <span className="text-white">{(data.skills||[]).length}</span></span>
          <span>Achievements: <span className="text-white">{(data.achievements||[]).length}</span></span>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}>
              <i className={`fas ${tab.icon} mr-2`}></i>{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && <ProfileEditor profile={data.profile} onSave={fetchAll} />}
        {activeTab === 'projects' && (
          <CrudTable title="Project" items={data.projects || []}
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'category', label: 'Category', creatable: true, options: projectCategories },
              { key: 'githubUrl', label: 'GitHub URL' },
              { key: 'liveUrl', label: 'Live URL' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'techStack', label: 'Tech Stack (comma-separated)', hint: 'commaList' },
            ]}
            onCreate={(d) => createProject(parseCommaList(d, 'techStack'))}
            onUpdate={(id, d) => updateProject(id, parseCommaList(d, 'techStack'))}
            onDelete={deleteProject}
            renderRow={(item) => <span>{item.title} <span className="text-gray-500">({item.techStack?.join(', ')})</span></span>}
          />
        )}
        {activeTab === 'certificates' && (
          <CrudTable title="Certificate" items={data.certificates || []}
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'issuer', label: 'Issuer' },
              { key: 'url', label: 'External URL (optional)' },
              { key: 'icon', label: 'Icon', options: ['fa-certificate', 'fa-robot', 'fa-cloud-upload-alt', 'fa-chart-bar', 'fa-brain', 'fa-code', 'fa-database', 'fa-shield-alt'] },
                { key: 'fileUrl', label: 'Image/PDF URL' },
              ]}
            onCreate={(d) => createCertificate(d)}
            onUpdate={(id, d) => updateCertificate(id, d)}
            onDelete={deleteCertificate}
            renderRow={(item) => (
              <span>
                {item.fileUrl && <img src={item.fileUrl} alt="" className="w-8 h-8 rounded inline-block mr-2 object-cover align-middle" />}
                <i className={`fas ${item.icon || 'fa-certificate'} mr-2 text-[#00d4ff]`}></i>
                {item.title} <span className="text-gray-500">({item.issuer})</span>
              </span>
            )}
          />
        )}
        {activeTab === 'experiences' && (
          <CrudTable title="Experience" items={data.experiences || []}
            fields={[
              { key: 'title', label: 'Job Title' },
              { key: 'company', label: 'Company' },
              { key: 'startDate', label: 'Start Date' },
              { key: 'endDate', label: 'End Date' },
              { key: 'companyTag', label: 'Company Tag (e.g. EdTech)' },
              { key: 'description', label: 'Short Description' },
              { key: 'highlights', label: 'Highlights (one per line)', type: 'textarea' },
              { key: 'tags', label: 'Tags (comma-separated)', hint: 'commaList' },
            ]}
            onCreate={(d) => createExperience(parseLinesAndList(d, 'highlights', 'tags'))}
            onUpdate={(id, d) => updateExperience(id, parseLinesAndList(d, 'highlights', 'tags'))}
            onDelete={deleteExperience}
            renderRow={(item) => <span>{item.title} <span className="text-gray-500">@ {item.company}</span></span>}
          />
        )}
        {activeTab === 'skills' && (
          <CrudTable title="Skill" items={data.skills || []}
            fields={[
              { key: 'name', label: 'Skill Name' },
              { key: 'category', label: 'Category', creatable: true, options: skillCategories },
              { key: 'icon', label: 'Icon class (e.g. fab fa-python)' },
              { key: 'iconColor', label: 'Icon Color (e.g. #e6a23c)' },
              { key: 'level', label: 'Proficiency (0-100)', type: 'number' },
            ]}
            onCreate={createSkill}
            onUpdate={(id, d) => updateSkill(id, d)}
            onDelete={deleteSkill}
            renderRow={(item) => (
              <span><i className={`${item.icon} mr-2`} style={{color: item.iconColor}}></i>{item.name} <span className="text-gray-500">({item.category})</span></span>
            )}
          />
        )}
        {activeTab === 'achievements' && (
          <CrudTable title="Achievement" items={data.achievements || []}
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'date', label: 'Date' },
              { key: 'link', label: 'Link URL' },
            ]}
            onCreate={createAchievement}
            onUpdate={(id, d) => updateAchievement(id, d)}
            onDelete={deleteAchievement}
            renderRow={(item) => <span>{item.title} <span className="text-gray-500">({item.date || 'No date'})</span></span>}
          />
        )}
      </div>
    </div>
  );
}

/* ===== HELPERS ===== */
function parseCommaList(d, key) {
  return { ...d, [key]: (d[key] || '').split(',').map((s) => s.trim()).filter(Boolean) };
}
function parseLinesAndList(d, linesKey, listKey) {
  return {
    ...d,
    [linesKey]: (d[linesKey] || '').split('\n').map((s) => s.trim()).filter(Boolean),
    [listKey]: (d[listKey] || '').split(',').map((s) => s.trim()).filter(Boolean),
  };
}

/* ===== PROFILE EDITOR ===== */
function ProfileEditor({ profile, onSave }) {
  const [form, setForm] = useState({
    name: '', headline: '', bio: '', email: '', location: '',
    profileImage: '', resumeUrl: '', logo: '',
    github: '', linkedin: '', youtube: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '', headline: profile.headline || '', bio: profile.bio || '',
        email: profile.email || '', location: profile.location || '',
        profileImage: profile.profileImage || '', resumeUrl: profile.resumeUrl || '', logo: profile.logo || '',
        github: profile.social?.github || '', linkedin: profile.social?.linkedin || '', youtube: profile.social?.youtube || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name, headline: form.headline, bio: form.bio,
      email: form.email, location: form.location,
      profileImage: form.profileImage, resumeUrl: form.resumeUrl, logo: form.logo,
      social: JSON.stringify({ github: form.github, linkedin: form.linkedin, youtube: form.youtube }),
    };
    try { await updateProfile(payload); onSave(); alert('Profile updated!'); } catch { alert('Failed'); }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-xl border border-white/10 bg-[#12121a]">
      <div className="grid md:grid-cols-2 gap-4">
        {['name', 'email', 'headline', 'location'].map((f) => (
          <div key={f}>
            <label className="text-xs text-gray-500 font-mono capitalize">{f}</label>
            <input value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              className="w-full px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs text-gray-500 font-mono">Bio</label>
        <textarea rows="4" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {['github', 'linkedin', 'youtube'].map((f) => (
          <div key={f}>
            <label className="text-xs text-gray-500 font-mono capitalize">{f} URL</label>
            <input value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              className="w-full px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs text-gray-500 font-mono">Profile Image URL</label>
          <div className="flex gap-2">
            <input value={form.profileImage} onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
              placeholder="Leave empty for default"
              className="flex-1 px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
            {form.profileImage && <button type="button" onClick={() => setForm({ ...form, profileImage: '' })}
              className="px-3 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-red-400 text-sm">✕</button>}
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-mono">Logo URL</label>
          <div className="flex gap-2">
            <input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })}
              placeholder="Leave empty for default"
              className="flex-1 px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
            {form.logo && <button type="button" onClick={() => setForm({ ...form, logo: '' })}
              className="px-3 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-red-400 text-sm">✕</button>}
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-mono">Resume URL</label>
          <div className="flex gap-2">
            <input value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              placeholder="Leave empty for default"
              className="flex-1 px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
            {form.resumeUrl && <button type="button" onClick={() => setForm({ ...form, resumeUrl: '' })}
              className="px-3 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-red-400 text-sm">✕</button>}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
        <button type="button" onClick={async () => { await seedProfile(); onSave(); }}
          className="px-4 py-3 border border-white/20 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">
          Seed Default
        </button>
      </div>
    </form>
  );
}

/* ===== CREATABLE SELECT ===== */
function CreatableSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const ref = useRef(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setFilterText('');
  }, [value]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayText = filterText || value || '';
  const filtered = options.filter((o) => o.toLowerCase().includes(filterText.toLowerCase()));
  const showDropdown = open && filtered.length > 0;

  return (
    <div className="relative" ref={ref}>
      <div className="flex">
        <input
          type="text"
          value={displayText}
          onChange={(e) => { setFilterText(e.target.value); onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder || 'Type or select...'}
          className="w-full px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]"
        />
        <button type="button" onClick={() => setOpen(!open)} tabIndex={-1}
          className="px-3 bg-[#1a1a24] border border-l-0 border-white/10 rounded-r-lg text-gray-400 hover:text-white">
          <i className={`fas fa-chevron-${open ? 'up' : 'down'} text-xs`}></i>
        </button>
      </div>
      {showDropdown && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1a24] border border-white/10 rounded-lg shadow-2xl max-h-48 overflow-y-auto">
          {filtered.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { setFilterText(''); onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === opt ? 'text-[#00d4ff] bg-[#00d4ff]/10' : 'text-gray-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== GENERIC CRUD TABLE ===== */
function CrudTable({ title, items, fields, onCreate, onUpdate, onDelete, renderRow }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [delId, setDelId] = useState(null);

  const resetForm = () => { setForm({}); setEditing(null); };

  const initForm = (item) => {
    const f = {};
    fields.forEach((fd) => {
      const val = item[fd.key];
      if (Array.isArray(val)) f[fd.key] = val.join(fd.hint === 'commaList' ? ', ' : '\n');
      else f[fd.key] = val ?? '';
    });
    setForm(f);
  };

  const handleEdit = (item) => { initForm(item); setEditing(item._id); };

  const buildPayload = () => form;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await onUpdate(editing, buildPayload());
      else await onCreate(buildPayload());
      resetForm();
      window.location.reload();
    } catch { alert(`Failed to save ${title.toLowerCase()}`); }
  };

  const handleDelete = async (id) => {
    try { await onDelete(id); setDelId(null); window.location.reload(); } catch { alert('Delete failed'); }
  };

  const updateField = useCallback((key, val) => setForm((prev) => ({ ...prev, [key]: val })), []);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-white/10 bg-[#12121a] space-y-4">
        <h3 className="font-bold text-lg">
          <i className={`fas ${editing ? 'fa-edit' : 'fa-plus'} mr-2 text-[#00d4ff]`}></i>
          {editing ? `Edit ${title}` : `Add ${title}`}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((fd) => (
            <div key={fd.key} className={fd.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="text-xs text-gray-500 font-mono block mb-1">{fd.label}</label>
              {fd.type === 'textarea' ? (
                <textarea rows="3" value={form[fd.key] || ''} onChange={(e) => updateField(fd.key, e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
              ) : fd.creatable || fd.options ? (
                <CreatableSelect
                  value={form[fd.key] || ''}
                  onChange={(val) => updateField(fd.key, val)}
                  options={fd.options || []}
                  placeholder={fd.label}
                />
              ) : (
                <input type={fd.type || 'text'} value={form[fd.key] || ''}
                  onChange={(e) => updateField(fd.key, e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1a24] border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="submit"
            className="px-5 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all">
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && <button type="button" onClick={resetForm}
            className="px-4 py-2 border border-white/20 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>}
        </div>
      </form>

      <div className="space-y-2">
        {items.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No {title.toLowerCase()}s yet. Add one above!</p>}
        {items.map((item) => (
          <div key={item._id} className="p-4 rounded-lg border border-white/10 bg-[#12121a] flex items-center justify-between">
            <div className="text-sm">{renderRow(item)}</div>
            <div className="flex gap-2 items-center">
              <button onClick={() => handleEdit(item)}
                className="px-3 py-1 text-xs border border-white/20 rounded text-gray-400 hover:text-white transition-colors">
                <i className="fas fa-edit"></i>
              </button>
              {delId === item._id ? (
                <div className="flex gap-1">
                  <button onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors">Yes</button>
                  <button onClick={() => setDelId(null)}
                    className="px-3 py-1 text-xs border border-white/20 rounded text-gray-400 hover:text-white transition-colors">No</button>
                </div>
              ) : (
                <button onClick={() => setDelId(item._id)}
                  className="px-3 py-1 text-xs border border-red-500/30 text-red-400 rounded hover:bg-red-500/10 transition-colors">
                  <i className="fas fa-trash"></i>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
