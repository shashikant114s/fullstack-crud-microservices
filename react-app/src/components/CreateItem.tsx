
import React, { useState } from 'react';

import { API_BASE_URL } from '../api';
import type { SuperHero } from '../types/SuperHero';

interface Props {
  onCreated?: (hero: SuperHero) => void;
}

const initialState: Omit<SuperHero, 'id'> = {
  name: '',
  firstName: '',
  lastName: '',
  place: '',
};

const CreateItem: React.FC<Props> = ({ onCreated }) => {
  const [hero, setHero] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // API expects PascalCase and Id property
      const payload = {
        Id: 0,
        Name: hero.name,
        FirstName: hero.firstName,
        LastName: hero.lastName,
        Place: hero.place,
      };
  const response = await fetch(`${API_BASE_URL}/api/SuperHero`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create hero');
      const data = await response.json();
      if (onCreated) onCreated(data);
      setHero(initialState);
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
        value={hero.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="firstName"
        type="text"
        value={hero.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        name="lastName"
        type="text"
        value={hero.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        name="place"
        type="text"
        value={hero.place}
        onChange={handleChange}
        placeholder="Place"
        required
      />
      <button type="submit" disabled={loading}>Create</button>
      {error && <div className="superhero-error">{error}</div>}
    </form>
  );
};

export default CreateItem;
