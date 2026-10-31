import React, { useState, useEffect } from 'react';

interface ProjectShowcaseProps {
  rotX?: number;
  rotY?: number;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ rotX = 3, rotY = -4 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bagCount, setBagCount] = useState(2);
  const [showToast, setShowToast] = useState(false);
  const [popBag, setPopBag] = useState(false);
  const [kpiInference, setKpiInference] = useState('1.842 req/s');
  const [selectedSize, setSelectedSize] = useState('38');

  // Máquinas de estado para as 3 posições tridimensionais
  const getWinClass = (winIndex: number) => {
    if (winIndex === activeIndex) return 'win-pos-active';
    if ((activeIndex === 0 && winIndex === 1) || (activeIndex === 1 && winIndex === 2) || (activeIndex === 2 && winIndex === 0)) {
      return 'win-pos-right';
    }
    return 'win-pos-left';
  };

  // Microinteração do E-Commerce Vélora
  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBagCount((prev) => prev + 1);
    setPopBag(true);
    setShowToast(true);
    setTimeout(() => setPopBag(false), 350);
    setTimeout(() => setShowToast(false), 2400);
  };

  // Simulação sutil de logs e inferência no Orbital
  useEffect(() => {
    const interval = setInterval(() => {
      const base = 1840 + Math.floor(Math.random() * 25);
      setKpiInference(`${base} req/s`);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Navegação por teclado (← / →)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIndex((prev) => (prev + 1) % 3);
      if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev - 1 + 3) % 3);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Gestos Touch (Swipe) para mobile
  const touchStartRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        if (dx < 0) setActiveIndex((prev) => (prev + 1) % 3);
        else setActiveIndex((prev) => (prev - 1 + 3) % 3);
      }
    }
  };

  return (
    <div className="hero-showcase-anim relative w-full select-none" style={{ perspective: '1400px' }} aria-label="Vitrine de Projetos Criados pela CodelabX">
      {/* Brilho Ambiente Volumétrico */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-8%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 55% 45%, rgba(147,51,234,0.22) 0%, rgba(88,28,135,0.08) 50%, transparent 74%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Painéis Flutuantes Indicadores */}
      <div className="floating-panel fp-1 hidden xl:block" aria-hidden="true">
        <div className="fp-label">Design & Engenharia</div>
        <div className="fp-text">Interfaces vivas.<br />Zero templates.</div>
      </div>
      <div className="floating-panel fp-2 hidden xl:block" aria-hidden="true">
        <div className="fp-label">Tecnologia Autoral</div>
        <div className="fp-text">Três sistemas reais<br />em perspectiva.</div>
      </div>

      {/* Palco 3D das 3 Janelas de Navegador Simultâneas */}
      <div
        className="vitrine-3d-scene"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: '550px',
          perspective: '1400px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 10,
        }}
      >
        {/* ================================================================
             JANELA 0: AETHER | ARQUITETURA & RESIDÊNCIAS DE LUXO
             ================================================================ */}
        <div
          id="win-0"
          className={`browser-window ${getWinClass(0)}`}
          onClick={() => activeIndex !== 0 && setActiveIndex(0)}
          aria-label="Site Aether Arquitetura"
        >
          <div className="browser-top-bar">
            <div className="window-dots" aria-hidden="true">
              <span className="w-dot" />
              <span className="w-dot" />
              <span className="w-dot" />
            </div>
            <div className="browser-url-pill">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span>https://aether-arquitetura.com.br</span>
            </div>
            <div className="site-tag-badge">
              <span className="live-dot" />
              <span>Arquitetura • Conceitual</span>
            </div>
          </div>

          <div className="site-viewport aether-theme">
            <header className="aether-nav">
              <div className="aether-brand">
                <span className="aether-logo-text">AETHER</span>
                <span className="aether-logo-sub">ARQUITETURA AUTORAL</span>
              </div>
              <nav className="aether-links">
                <span>Obras</span>
                <span>Filosofia</span>
                <span>Publicações</span>
                <span className="aether-contact-pill">Contato ↗</span>
              </nav>
            </header>

            <section className="aether-hero">
              <div className="aether-badge-row">
                <span className="aether-status-dot" />
                <span>PROJETO FLAGSHIP 2026 • SÃO PAULO & ZURIQUE</span>
              </div>
              <h3 className="aether-title">Arquitetura que transcende o tempo.</h3>
              <p className="aether-desc">Residências concebidas como esculturas habitáveis. Estruturas em balanço, concreto aparente e integração sensorial com a paisagem natural.</p>

              <div className="aether-framed-visual">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Residência Horizonte" className="aether-photo-main" />
                <div className="aether-spec-card">
                  <span className="spec-label">Residência Horizonte • 1.620 m²</span>
                  <span className="spec-val">Alto de Pinheiros, SP</span>
                  <span className="spec-detail">Concreto Protendido & Madeira Cumaru</span>
                </div>
              </div>

              <div className="aether-cta-row">
                <button className="aether-btn-primary">Explorar Residências</button>
                <button className="aether-btn-secondary">Monografia do Projeto ↗</button>
              </div>
            </section>

            <section className="aether-gallery">
              <div className="aether-sec-head">
                <span className="aether-sec-title">Obras Selecionadas</span>
                <span className="aether-sec-count">03 de 28 Projetos</span>
              </div>
              <div className="aether-grid">
                <div className="aether-card">
                  <div className="aether-card-img-wrap">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="Villa Alvorada" />
                    <span className="aether-card-tag">Trancoso, BA</span>
                  </div>
                  <div className="aether-card-info">
                    <h4>Villa Alvorada • 2.100 m²</h4>
                    <p>Pavilhões integrados à mata atlântica</p>
                  </div>
                </div>
                <div className="aether-card">
                  <div className="aether-card-img-wrap">
                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" alt="Pavilhão Raízes" />
                    <span className="aether-card-tag">Nova Lima, MG</span>
                  </div>
                  <div className="aether-card-info">
                    <h4>Pavilhão Raízes • 980 m²</h4>
                    <p>Estrutura metálica suspensa sobre vale</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="aether-stats-bar">
              <div className="aether-stat">
                <span className="astat-num">38</span>
                <span className="astat-lbl">Obras Executadas</span>
              </div>
              <div className="aether-stat">
                <span className="astat-num">15</span>
                <span className="astat-lbl">Anos de Estúdio</span>
              </div>
              <div className="aether-stat">
                <span className="astat-num">Mies Crown</span>
                <span className="astat-lbl">Hall Finalist 2025</span>
              </div>
            </section>
          </div>
        </div>

        {/* ================================================================
             JANELA 1: VÉLORA | E-COMMERCE DE MODA CONTEMPORÂNEA
             ================================================================ */}
        <div
          id="win-1"
          className={`browser-window ${getWinClass(1)}`}
          onClick={() => activeIndex !== 1 && setActiveIndex(1)}
          aria-label="Site Vélora E-Commerce"
        >
          <div className="browser-top-bar">
            <div className="window-dots" aria-hidden="true">
              <span className="w-dot" />
              <span className="w-dot" />
              <span className="w-dot" />
            </div>
            <div className="browser-url-pill">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span>https://velora-collection.com.br</span>
            </div>
            <div className="site-tag-badge">
              <span className="live-dot" />
              <span>E-Commerce • Conceitual</span>
            </div>
          </div>

          <div className="site-viewport velora-theme">
            <div className="velora-topbar">
              <span>FRETE CORTESIA PARA TODO O BRASIL • EMBALAGEM AUTORAL NUMERADA</span>
            </div>

            <header className="velora-nav">
              <div className="velora-brand">
                <span className="velora-logo">VÉLORA</span>
                <span className="velora-logo-sub">ATELIER SÃO PAULO</span>
              </div>
              <nav className="velora-menu">
                <span className="active">Nova Coleção</span>
                <span>Alfaiataria</span>
                <span>Acessórios</span>
                <span>Editorial</span>
              </nav>
              <div className="velora-actions">
                <button className="velora-bag-btn" id="veloraBagBtn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  <span>Sacola</span>
                  <span className={`velora-count ${popBag ? 'pop' : ''}`}>{bagCount}</span>
                </button>
              </div>
            </header>

            <div className={`velora-toast ${showToast ? 'show' : ''}`}>
              <span>✓ Peça adicionada à sacola com sucesso!</span>
            </div>

            <section className="velora-hero">
              <div className="velora-hero-content">
                <span className="velora-collection-tag">EDIÇÃO LIMITADA • OUTONO / INVERNO 2026</span>
                <h3 className="velora-hero-title">O essencial nunca sai de cena.</h3>
                <p className="velora-hero-p">Silhuetas estruturadas em lã italiana, seda pura e acabamento manual. Peças pensadas para durar gerações.</p>
                <div className="velora-hero-btns">
                  <button className="velora-btn-primary">Ver Coleção Completa</button>
                  <span className="velora-look-pill">Look 04 • Alfaiataria Noir</span>
                </div>
              </div>
              <div className="velora-hero-img-box">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85" alt="Look Coleção Outono" />
                <span className="velora-img-badge">Peça Flagship</span>
              </div>
            </section>

            <section className="velora-products">
              <div className="velora-sec-head">
                <div>
                  <h4 className="velora-sec-title">Destaques da Temporada</h4>
                  <span className="velora-sec-sub">Peças em estoque limitado</span>
                </div>
                <div className="velora-filter-pills">
                  <span className="vpill active">Tudo</span>
                  <span className="vpill">Casacos</span>
                  <span className="vpill">Alfaiataria</span>
                </div>
              </div>

              <div className="velora-product-grid">
                <div className="velora-pcard">
                  <div className="pcard-img-wrap">
                    <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80" alt="Sobretudo Estruturado Noir" />
                    <span className="pcard-badge">Exclusivo</span>
                  </div>
                  <div className="pcard-details">
                    <h5>Sobretudo Estruturado Noir</h5>
                    <span className="pcard-price">R$ 3.890,00 <small>10x R$ 389,00</small></span>
                    <div className="pcard-sizes">
                      {['38', '40', '42'].map((sz) => (
                        <span key={sz} className={`psize ${selectedSize === sz ? 'selected' : ''}`} onClick={() => setSelectedSize(sz)}>{sz}</span>
                      ))}
                    </div>
                    <button className="pcard-add-btn" onClick={handleAddToBag}>+ Adicionar à Sacola</button>
                  </div>
                </div>

                <div className="velora-pcard">
                  <div className="pcard-img-wrap">
                    <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=500&q=80" alt="Camisa Fluida Off-White" />
                    <span className="pcard-badge">Seda Pura</span>
                  </div>
                  <div className="pcard-details">
                    <h5>Camisa Fluida Off-White</h5>
                    <span className="pcard-price">R$ 1.640,00 <small>10x R$ 164,00</small></span>
                    <div className="pcard-sizes">
                      <span className="psize">P</span>
                      <span className="psize selected">M</span>
                      <span className="psize">G</span>
                    </div>
                    <button className="pcard-add-btn" onClick={handleAddToBag}>+ Adicionar à Sacola</button>
                  </div>
                </div>

                <div className="velora-pcard">
                  <div className="pcard-img-wrap">
                    <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" alt="Bolsa Siena Couro Natural" />
                    <span className="pcard-badge">Numerada</span>
                  </div>
                  <div className="pcard-details">
                    <h5>Bolsa Siena Couro Natural</h5>
                    <span className="pcard-price">R$ 2.450,00 <small>10x R$ 245,00</small></span>
                    <div className="pcard-sizes">
                      <span className="psize selected">Único</span>
                    </div>
                    <button className="pcard-add-btn" onClick={handleAddToBag}>+ Adicionar à Sacola</button>
                  </div>
                </div>
              </div>

              <div className="velora-trust-bar">
                <span>Lã e Seda Certificadas</span> • <span>Entrega Concierge</span> • <span>Devoluções em 30 Dias</span>
              </div>
            </section>
          </div>
        </div>

        {/* ================================================================
             JANELA 2: ORBITAL | PLATAFORMA SAAS DE INTELIGÊNCIA ARTIFICIAL
             ================================================================ */}
        <div
          id="win-2"
          className={`browser-window ${getWinClass(2)}`}
          onClick={() => activeIndex !== 2 && setActiveIndex(2)}
          aria-label="Site Orbital SaaS"
        >
          <div className="browser-top-bar">
            <div className="window-dots" aria-hidden="true">
              <span className="w-dot" />
              <span className="w-dot" />
              <span className="w-dot" />
            </div>
            <div className="browser-url-pill">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span>https://orbital-ia.com.br/dashboard</span>
            </div>
            <div className="site-tag-badge">
              <span className="live-dot" />
              <span>SaaS Cloud • Conceitual</span>
            </div>
          </div>

          <div className="site-viewport orbital-theme">
            <header className="orbital-nav">
              <div className="orbital-brand">
                <div className="orbital-brand-mark">
                  <span className="orbit-icon-core" />
                </div>
                <div>
                  <span className="orbital-logo">ORBITAL</span>
                  <span className="orbital-env-tag">ENTERPRISE CLOUD</span>
                </div>
              </div>
              <div className="orbital-status-badge">
                <span className="orbital-pulse-dot" />
                <span>Cluster SP • 99.99% Uptime</span>
              </div>
              <div className="orbital-user-slot">
                <span className="orbital-plan-pill">Plano Pro</span>
                <span className="orbital-avatar">CL</span>
              </div>
            </header>

            <div className="orbital-dashboard-layout">
              <aside className="orbital-sidebar">
                <div className="orb-side-item active" title="Métricas">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                </div>
                <div className="orb-side-item" title="Modelos IA">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
                <div className="orb-side-item" title="Pipelines">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                </div>
                <div className="orb-side-item" title="Logs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
                </div>
              </aside>

              <main className="orbital-main">
                <div className="orbital-main-top">
                  <div>
                    <h4 className="orbital-title">Painel de Orquestração de IA</h4>
                    <span className="orbital-subtitle">Monitoramento em tempo real de inferência e pipelines</span>
                  </div>
                  <div className="orbital-time-tabs">
                    <span className="ortab">1H</span>
                    <span className="ortab active">24H</span>
                    <span className="ortab">7D</span>
                    <span className="ortab">30D</span>
                  </div>
                </div>

                <div className="orbital-kpis">
                  <div className="orb-kpi-card">
                    <span className="kpi-label">Taxa de Inferência</span>
                    <div className="kpi-val-row">
                      <span className="kpi-num">{kpiInference}</span>
                      <span className="kpi-delta positive">+14.2%</span>
                    </div>
                    <span className="kpi-sub">Pico: 2.190 req/s às 16:40</span>
                  </div>
                  <div className="orb-kpi-card">
                    <span className="kpi-label">Latência Global</span>
                    <div className="kpi-val-row">
                      <span className="kpi-num" style={{ color: '#34D399' }}>18.4 ms</span>
                      <span className="kpi-delta neutral">P99: 31ms</span>
                    </div>
                    <span className="kpi-sub">CDN Edge: 42 nós ativos</span>
                  </div>
                  <div className="orb-kpi-card">
                    <span className="kpi-label">Precisão Modelos</span>
                    <div className="kpi-val-row">
                      <span className="kpi-num">99.68%</span>
                      <span className="kpi-delta positive">+0.3%</span>
                    </div>
                    <span className="kpi-sub">F1-Score ponderado</span>
                  </div>
                </div>

                <div className="orbital-chart-card">
                  <div className="chart-header">
                    <span className="chart-title">Volume de Eventos e Throughput</span>
                    <div className="chart-legend">
                      <span className="leg-dot primary" /><span>Inferência</span>
                      <span className="leg-dot secondary" /><span>Embeddings</span>
                    </div>
                  </div>
                  <div className="chart-svg-wrap">
                    <svg viewBox="0 0 540 115" className="orbital-svg-chart">
                      <defs>
                        <linearGradient id="orbGradPrimaryR" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="orbGradSecR" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="28" x2="540" y2="28" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                      <line x1="0" y1="68" x2="540" y2="68" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                      <line x1="0" y1="102" x2="540" y2="102" stroke="rgba(255,255,255,0.05)" />
                      <path d="M 0 92 Q 60 68 120 82 T 240 42 T 360 32 T 450 18 T 540 28 L 540 115 L 0 115 Z" fill="url(#orbGradPrimaryR)" />
                      <path d="M 0 92 Q 60 68 120 82 T 240 42 T 360 32 T 450 18 T 540 28" fill="none" stroke="#818CF8" strokeWidth="2" />
                      <path d="M 0 102 Q 80 88 160 92 T 300 68 T 420 52 T 540 46 L 540 115 L 0 115 Z" fill="url(#orbGradSecR)" />
                      <path d="M 0 102 Q 80 88 160 92 T 300 68 T 420 52 T 540 46" fill="none" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="4,2" />
                      <circle cx="450" cy="18" r="4.5" fill="#FFFFFF" stroke="#6366F1" strokeWidth="2.5" className="chart-point-pulse" />
                    </svg>
                  </div>
                </div>

                <div className="orbital-pipelines">
                  <div className="orb-pipe-row">
                    <div className="pipe-name-cell">
                      <span className="pipe-indicator run" />
                      <span className="pipe-name">ETL Multimodal • Ingestão Gemini</span>
                    </div>
                    <span className="pipe-stat-text">14.280 docs/min</span>
                    <div className="pipe-bar-wrap">
                      <div className="pipe-bar-fill" style={{ width: '78%' }} />
                    </div>
                    <span className="pipe-tag">Executando</span>
                  </div>
                  <div className="orb-pipe-row">
                    <div className="pipe-name-cell">
                      <span className="pipe-indicator sync" />
                      <span className="pipe-name">Indexação Vetorial Pinecone</span>
                    </div>
                    <span className="pipe-stat-text">100% sincronizado</span>
                    <div className="pipe-bar-wrap">
                      <div className="pipe-bar-fill" style={{ width: '100%' }} />
                    </div>
                    <span className="pipe-tag success">Estável</span>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Controle Master da Vitrine 3D */}
      <div className="vitrine-master-bar">
        <div className="vitrine-tabs" role="tablist" aria-label="Seletor de Sites da Vitrine">
          <button className={`v-tab ${activeIndex === 0 ? 'active' : ''}`} role="tab" aria-selected={activeIndex === 0} onClick={() => setActiveIndex(0)}>01 / Aether • Arquitetura</button>
          <button className={`v-tab ${activeIndex === 1 ? 'active' : ''}`} role="tab" aria-selected={activeIndex === 1} onClick={() => setActiveIndex(1)}>02 / Vélora • E-Commerce</button>
          <button className={`v-tab ${activeIndex === 2 ? 'active' : ''}`} role="tab" aria-selected={activeIndex === 2} onClick={() => setActiveIndex(2)}>03 / Orbital • SaaS</button>
        </div>
        <div className="vitrine-controls">
          <span className="v-live-tag">
            <span className="v-pulse-dot" />
            <span>Demonstração Interativa</span>
          </span>
          <div className="v-arrows">
            <button className="v-arrow-btn" onClick={() => setActiveIndex((prev) => (prev - 1 + 3) % 3)} aria-label="Ver site anterior">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            </button>
            <button className="v-arrow-btn" onClick={() => setActiveIndex((prev) => (prev + 1) % 3)} aria-label="Ver próximo site">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
