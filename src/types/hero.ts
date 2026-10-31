export interface ProjectPreview {
  id: string;
  title: string;
  tag: string;
  metric: string;
  category: string;
}

export interface DifferentialsItem {
  icon: 'lightning' | 'chart' | 'shield';
  text: string;
}

export interface MousePosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}
