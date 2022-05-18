import React from 'react';
import '../loading.css';

function Loading() {
  return (
    <div className="w-24 flex flex-col justify-center text-center self-center">
      <p className="text-slate-300 text-lg mb-1">Carregando...</p>
      {/* <p className="text-slate-300 text-lg mb-1">Loading...</p> */}
      <div className="race-by self-center" />
    </div>
  );
}

export default Loading;
