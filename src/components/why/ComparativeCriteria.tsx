import React from 'react';

interface Criterion {
  num: string;
  title: string;
  standard: string;
  codelabx: string;
}

const CRITERIA: Criterion[] = [
  {
    num: '01',
    title: 'Identidade visual',
    standard: 'Apresentação padronizada em template pré-moldado.',
    codelabx: 'Linguagem visual autoral, alinhada ao posicionamento do negócio.',
  },
  {
    num: '02',
    title: 'Hierarquia da informação',
    standard: 'Distribuição mecânica de blocos sem ritmo editorial.',
    codelabx: 'Jornada de leitura intencional com retenção e clareza de proposta.',
  },
  {
    num: '03',
    title: 'Experiência de navegação',
    standard: 'Estrutura estática convencional e pouco memorável.',
    codelabx: 'Interatividade com propósito, microdetalhes e fluidez técnica.',
  },
  {
    num: '04',
    title: 'Caminho para contato',
    standard: 'Botão isolado no topo sem contexto ou persuasão.',
    codelabx: 'Chamadas à ação integradas naturalmente à narrativa de valor.',
  },
];

export const ComparativeCriteria: React.FC = () => {
  return (
    <div className="mt-10 pt-8 border-t border-white/[0.07]">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" />
        <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-white/70 font-semibold">
          Critérios de diferenciação observados
        </h4>
        <span className="hidden sm:block flex-1 h-[1px] bg-white/[0.04]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CRITERIA.map((crit) => (
          <div
            key={crit.num}
            className="p-4 sm:p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-purple-500/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-purple-400/90 font-bold tracking-wider">
                  {crit.num}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                  Análise
                </span>
              </div>

              <h5 className="font-bold text-sm text-white mb-3 tracking-tight">
                {crit.title}
              </h5>

              {/* Solução Padronizada */}
              <div className="mb-3 pb-3 border-b border-white/[0.05]">
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#6E6E7E] block mb-1">
                  Solução Comum
                </span>
                <p className="text-xs text-[#8A8A99] leading-relaxed">
                  {crit.standard}
                </p>
              </div>

              {/* Abordagem CodelabX */}
              <div>
                <span className="font-mono text-[8.5px] uppercase tracking-wider text-purple-300/80 block mb-1">
                  Abordagem CodelabX
                </span>
                <p className="text-xs text-white/95 font-medium leading-relaxed">
                  {crit.codelabx}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
