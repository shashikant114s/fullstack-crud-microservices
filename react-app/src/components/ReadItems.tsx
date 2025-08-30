import React from 'react';
import type { SuperHero } from '../types/SuperHero';

interface Props {
  items: SuperHero[];
  onEdit: (hero: SuperHero) => void;
  onDelete: (hero: SuperHero) => void;
}

const ReadItems: React.FC<Props> = ({ items, onEdit, onDelete }) => (
  <table className="superhero-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Place</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map(hero => (
        <tr key={hero.id}>
          <td>{hero.id}</td>
          <td>{hero.name}</td>
          <td>{hero.firstName}</td>
          <td>{hero.lastName}</td>
          <td>{hero.place}</td>
          <td>
            <button onClick={() => onEdit(hero)}>Edit</button>
            <button onClick={() => onDelete(hero)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ReadItems;
