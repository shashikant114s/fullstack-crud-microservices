import React, { useState } from 'react';

import { API_BASE_URL } from '../api';
import type { SuperHero } from '../types/SuperHero';

interface Props {
  hero: SuperHero;
  onUpdated: (hero: SuperHero) => void;
  onCancel: () => void;
}

const UpdateItem: React.FC<Props> = ({ hero, onUpdated, onCancel }) => {
  const [form, setForm] = useState({ ...hero });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
  const response = await fetch(`${API_BASE_URL}/api/SuperHero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to update hero');
      const data = await response.json();
      onUpdated(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="superhero-form">
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="firstName"
        type="text"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="lastName"
        type="text"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        name="place"
        type="text"
        value={form.place}
        onChange={handleChange}
        placeholder="Place"
        required
      />
      <button type="submit" disabled={loading}>Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      {error && <div className="superhero-error">{error}</div>}
    </form>
  );
};

export default UpdateItem;
