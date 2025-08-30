import React, { useState } from 'react';

import { API_BASE_URL } from '../api';
import type { SuperHero } from '../types/SuperHero';

interface Props {
  hero: SuperHero;
  onDeleted: (id: number) => void;
  onCancel: () => void;
}

const DeleteItem: React.FC<Props> = ({ hero, onDeleted, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
  const response = await fetch(`${API_BASE_URL}/api/SuperHero/${hero.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete hero');
      onDeleted(hero.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="superhero-form" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
      <span style={{ color: '#fff', fontWeight: 500, marginRight: '1rem' }}>Delete "{hero.name}"?</span>
      <button onClick={handleDelete} disabled={loading}>Yes</button>
      <button onClick={onCancel}>No</button>
      {error && <div className="superhero-error">{error}</div>}
    </div>
  );
};

export default DeleteItem;
