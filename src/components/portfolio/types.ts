export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  disciplines: string[];
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'maison',
    number: '01 / 03',
    name: 'MAISON',
    category: 'Website institucional · Arquitetura',
    badge: 'Projeto conceitual',
    tagline: 'Espaço, matéria e silêncio.',
    description:
      'Website institucional para estúdio de arquitetura contemporânea e residências de alto padrão. Uma composição minimalista e cinematográfica em que proporções, tipografia suíça e grandes planos visuais comunicam sofisticação e rigor técnico.',
    disciplines: ['Arquitetura de Marca', 'Design Editorial', 'Engenharia Front-End', 'Performance'],
  },
  {
    id: 'aura',
    number: '02 / 03',
    name: 'AURA',
    category: 'Landing Page · Beleza & Skincare',
    badge: 'Projeto conceitual',
    tagline: 'Fórmulas bioativas, conversão pura.',
    description:
      'Landing page estratégica de alta conversão para marca premium de skincare biotecnológico. Composição deslocada em tons neutros e calorosos, integrando narrativa editorial desktop e experiência fluida mobile focada em retenção e checkout.',
    disciplines: ['CRO Estratégico', 'Design de Produto', 'Experiência Mobile-First', 'Microinterações'],
  },
  {
    id: 'orbit',
    number: '03 / 03',
    name: 'ORBIT',
    category: 'Sistema Web · SaaS',
    badge: 'Projeto conceitual',
    tagline: 'Inteligência operacional em escala.',
    description:
      'Plataforma analítica e painel de gestão para operações complexas. Interface densa, precisa e organizada com métricas em tempo real, visualização de dados e arquitetura modular pensada para fluxos intensos de tomada de decisão.',
    disciplines: ['Design de Sistemas', 'Engenharia de Software', 'Data Visualization', 'UI Técnica'],
  },
];
