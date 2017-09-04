import React from 'react';

export const Items = ({ name, onClick }) => (
  <button onClick={() => onClick(name)}>{name}</button>
);


