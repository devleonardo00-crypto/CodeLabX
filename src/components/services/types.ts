export type ServiceCategory = 
  | '01 / WEB DEVELOPMENT'
  | '02 / CONVERSÃO'
  | '03 / INTELIGÊNCIA'
  | '04 / SOFTWARE'
  | '05 / PRODUTOS DIGITAIS';

export type DemoVariant = 
  | 'website'
  | 'landing'
  | 'automation'
  | 'system'
  | 'saas';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  demoVariant: DemoVariant;
  badge?: string;
  colSpanDesktop: string;
  colSpanTablet?: string;
  isFeatured?: boolean;
}
