
import React, { useEffect, useState } from 'react';

import { API_BASE_URL } from './api';
import type { SuperHero } from './types/SuperHero';
import CreateItem from './components/CreateItem';
import ReadItems from './components/ReadItems';
import UpdateItem from './components/UpdateItem';
import DeleteItem from './components/DeleteItem';
import './App.css';

const API_URL = `${API_BASE_URL}/api/SuperHero`;

function App() {
  const [heroes, setHeroes] = useState<SuperHero[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingHero, setEditingHero] = useState<SuperHero | null>(null);
  const [deletingHero, setDeletingHero] = useState<SuperHero | null>(null);

  const fetchHeroes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch heroes');
      const data = await response.json();
      setHeroes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleCreated = (hero: SuperHero) => {
    setHeroes(prev => [...prev, hero]);
  };

  const handleEdit = (hero: SuperHero) => {
    setEditingHero(hero);
  };

  const handleUpdated = (updated: SuperHero) => {
    setHeroes(prev => prev.map(h => h.id === updated.id ? updated : h));
    setEditingHero(null);
  };

  const handleDelete = (hero: SuperHero) => {
    setDeletingHero(hero);
  };

  const handleDeleted = (id: number) => {
    setHeroes(prev => prev.filter(h => h.id !== id));
    setDeletingHero(null);
  };

  return (
    <div className="animated-bg">
      <div className="superhero-container">
        <div className="superhero-title">SuperHero CRUD Demo</div>
        <CreateItem onCreated={handleCreated} />
        {loading && <div className="superhero-loading">Loading...</div>}
        {error && <div className="superhero-error">{error}</div>}
        {editingHero ? (
          <UpdateItem hero={editingHero} onUpdated={handleUpdated} onCancel={() => setEditingHero(null)} />
        ) : deletingHero ? (
          <DeleteItem hero={deletingHero} onDeleted={handleDeleted} onCancel={() => setDeletingHero(null)} />
        ) : (
          <ReadItems items={heroes} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;
