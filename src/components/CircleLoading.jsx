import React from 'react';
import '../circleLoading.css';

function CircleLoading() {
  return (
    <div className="scale-75 ml-2.5 my-2.5">
      <p className="text-[0px]">Carregando...</p>
      <svg
        className="ring ring-0"
        viewBox="25 25 50 50"
        strokeWidth="5"
      >
        <circle cx="50" cy="50" r="20" />
      </svg>
    </div>
  );
}

export default CircleLoading;
