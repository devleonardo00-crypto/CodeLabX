import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-12 py-5 bg-[#070609]/75 backdrop-blur-xl border-b border-white/[0.07] transition-colors">
      <nav className="max-w-[1560px] mx-auto flex items-center justify-between" aria-label="Navegação Principal">
        {/* Marca & Status de Disponibilidade */}
        <div className="flex items-center gap-5">
          <a href="#" className="text-xl font-extrabold tracking-[-0.04em] text-white flex items-center gap-0.5" aria-label="CodelabX Home">
            <span>Codelab</span>
            <span className="text-purple-400">X</span>
          </a>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-xs font-medium text-[#9696A6]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span>Disponível para projetos Q4</span>
          </div>
        </div>

        {/* Links Editoriais */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          <li>
            <a href="#sobre" className="text-sm font-medium text-[#9696A6] hover:text-white transition-colors">
              Estúdio
            </a>
          </li>
          <li>
            <a href="#projetos" className="text-sm font-medium text-[#9696A6] hover:text-white transition-colors">
              Projetos
            </a>
          </li>
          <li>
            <a href="#metodo" className="text-sm font-medium text-[#9696A6] hover:text-white transition-colors">
              Método
            </a>
          </li>
          <li>
            <a href="#contato" className="text-sm font-medium text-[#9696A6] hover:text-white transition-colors">
              Contato
            </a>
          </li>
        </ul>

        {/* CTA do Topo */}
        <a 
          href="#orcamento"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>Solicitar proposta</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </nav>
    </header>
  );
};
