import React from 'react';
import { DemoVariant } from './types';
import { AtelierNoirPreview } from './previews/AtelierNoirPreview';
import { LumierePreview } from './previews/LumierePreview';
import { FlowEnginePreview } from './previews/FlowEnginePreview';
import { NexusCRMPreview } from './previews/NexusCRMPreview';
import { PulseAnalyticsPreview } from './previews/PulseAnalyticsPreview';

interface DemoStageCanvasProps {
  variant: DemoVariant;
  isFeatured?: boolean;
}

export const DemoStageCanvas: React.FC<DemoStageCanvasProps> = ({ variant }) => {
  switch (variant) {
    case 'website':
      return <AtelierNoirPreview />;
    case 'landing':
      return <LumierePreview />;
    case 'automation':
      return <FlowEnginePreview />;
    case 'system':
      return <NexusCRMPreview />;
    case 'saas':
      return <PulseAnalyticsPreview />;
    default:
      return null;
  }
};
