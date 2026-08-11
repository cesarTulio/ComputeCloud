'use strict';

(() => {
  const R = window.Render;
  const S = window.Storage;
  const { COURSE_UNITS, INITIAL_BADGES, COHORT_STUDENTS } = window;

  const TOTAL_WEEKS = 16;

  // ---------- Global state ----------
  const state = {
    activeTab: 'units',
    selectedUnitId: null,
    completedWeeks: [],
    quizResults: {},
    badges: [],
    studyMinutes: 45,
  };

  // ---------- State sync ----------
  function refreshState() {
    state.completedWeeks = S.getCompletedWeeks();
    state.quizResults = S.getQuizResults();
    state.badges = S.getBadges();
    state.studyMinutes = S.getStudyMinutes();
  }

  // ---------- Event bus (simple pub/sub for re-render) ----------
  const listeners = [];
  function subscribe(fn) { listeners.push(fn); }
  function emit() { listeners.forEach((fn) => fn()); }

  // ---------- Rendering ----------
  const headerEl = document.getElementById('app-header');
  const mainEl = document.getElementById('app-main');

  function setTab(tab) {
    state.activeTab = tab;
    if (tab !== 'units') state.selectedUnitId = null;
    emit();
  }

  function selectUnit(id) {
    state.selectedUnitId = id;
    state.activeTab = 'units';
    emit();
  }

  // ---------- Actions ----------
  function toggleWeek(weekNum) {
    const updated = S.toggleWeekCompleted(weekNum);
    state.completedWeeks = updated;
    state.badges = S.getBadges();
    emit();
  }

  function saveQuizResult(result) {
    state.quizResults = S.saveQuizResult(result);
    state.badges = S.getBadges();
    emit();
  }

  function resetProgress() {
    S.resetAllProgress();
    state.completedWeeks = [];
    state.quizResults = {};
    state.badges = S.getBadges();
    state.studyMinutes = 0;
    emit();
  }

  function unlockLabBadge() {
    S.unlockBadge('badge-lab-master');
    state.badges = S.getBadges();
    emit();
  }

  function openPlayground() { setTab('playground'); }

  // ============================================================
  // NAVBAR
  // ============================================================
  function renderNavbar() {
    const unlockedCount = state.badges.filter((b) => b.isUnlocked).length;
    const progressPercent = Math.round((state.completedWeeks.length / TOTAL_WEEKS) * 100);
    const C = 2 * Math.PI * 12; // r=12
    const dashOffset = C - (C * progressPercent) / 100;

    const tabs = [
      { id: 'units', label: 'Unidades de Aprendizaje', icon: 'cloud', color: '' },
      { id: 'progress', label: 'Panel de Progreso & Insignias', icon: 'layout-dashboard', color: '' },
      { id: 'playground', label: 'Simuladores Prácticos', icon: 'terminal', color: 'emerald' },
      { id: 'analytics', label: 'Analítica de Aprendizaje (Cohorte)', icon: 'bar-chart', color: 'cyan' },
    ];

    headerEl.innerHTML = `
      <header class="navbar">
        <div class="container">
          <div class="navbar-inner">
            <div class="brand" data-action="home">
              <div class="brand-logo">
                <div class="brand-logo-inner">${R.iconStr('cloud', 20)}</div>
              </div>
              <div>
                <div class="brand-tags">
                  <span class="badge-acn">ACN01</span>
                  <span class="brand-level">Ing. Software N8</span>
                </div>
                <h1 class="brand-title">Arquitectura y Computación en la Nube</h1>
              </div>
            </div>

            <div class="nav-actions">
              <div class="progress-widget" data-action="tab" data-tab="progress">
                <div>
                  <div class="progress-label">Progreso Curso</div>
                  <div class="progress-value">${state.completedWeeks.length}/16 Semanas (${progressPercent}%)</div>
                </div>
                <div class="progress-ring">
                  <svg width="32" height="32">
                    <circle cx="16" cy="16" r="12" stroke="#334155" stroke-width="3" fill="transparent"/>
                    <circle cx="16" cy="16" r="12" stroke="#22d3ee" stroke-width="3" fill="transparent"
                      stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${dashOffset.toFixed(2)}" stroke-linecap="round"/>
                  </svg>
                  <div class="check">${R.iconStr('check-circle', 14)}</div>
                </div>
              </div>

              <button class="nav-badge-btn" data-action="tab" data-tab="progress">
                ${R.iconStr('award', 16)}
                <span>Insignias: <strong>${unlockedCount}/${state.badges.length}</strong></span>
              </button>
            </div>
          </div>

          <div class="nav-tabs">
            ${tabs.map((t) => `
              <button class="nav-tab ${state.activeTab === t.id ? 'active' : ''}" data-action="tab" data-tab="${t.id}">
                ${R.iconStr(t.icon, 14)}
                <span>${R.esc(t.label)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </header>
    `;

    headerEl.querySelectorAll('[data-action]').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.dataset.action;
        if (action === 'home') setTab('units');
        else if (action === 'tab') setTab(el.dataset.tab);
      });
    });
  }

  // ============================================================
  // VIEW: UNITS OVERVIEW
  // ============================================================
  function unitScoreBadge(quizRes) {
    if (!quizRes) return '';
    const cls = quizRes.score === 5 ? 'score-excellent' : quizRes.score >= 3 ? 'score-ok' : 'score-risk';
    return `<span class="quiz-score ${cls}">Autoevaluación: ${quizRes.score}/5 (${R.esc(quizRes.level)})</span>`;
  }

  function renderUnitOverview() {
    return `
      <div class="space-y-8">
        <section class="hero">
          <div class="hero-tags">
            <span class="tag tag-cyan">Asignatura: ACN01</span>
            <span class="tag tag-slate">Ingeniería de Software (Nivel 8)</span>
            <span class="tag tag-emerald">144 Horas - 16 Semanas</span>
          </div>
          <h1 class="hero-title">Arquitectura y Computación en la Nube</h1>
          <p class="hero-sub">
            Plataforma interactiva de <strong>Aprendizaje Guiado</strong> diseñada con casos reales de negocio
            (e-commerce, fintech, minería, salud), autoevaluaciones interactivas por unidad con matrices de diagnóstico,
            simuladores de código (Docker, Terraform, Kubernetes) y analítica.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" data-action="select-unit" data-id="1">
              <span>Iniciar Unidad I</span> ${R.iconStr('arrow-right', 16)}
            </button>
            <button class="btn btn-outline" data-action="open-playground">
              ${R.iconStr('terminal', 16)} <span>Simuladores de Código</span>
            </button>
          </div>
        </section>

        <div class="space-y-4">
          <div class="section-title">${R.iconStr('layers', 20)} <span>Unidades del Plan de Estudio Guiado</span></div>
          <p class="section-sub">Cada unidad incluye teoría enriquecida, casos empresariales, código y autoevaluación final.</p>

          <div class="grid grid-2">
            ${COURSE_UNITS.map((unit) => {
              const weekNums = unit.weeks.map((w) => w.weekNumber);
              const done = weekNums.filter((wn) => state.completedWeeks.includes(wn)).length;
              const pct = Math.round((done / weekNums.length) * 100);
              const quizRes = state.quizResults[unit.id];
              return `
                <div class="unit-card">
                  <div>
                    <div class="unit-head">
                      <span class="unit-number">${R.esc(unit.number)} (${R.esc(unit.weeksRange)})</span>
                      ${unitScoreBadge(quizRes)}
                    </div>
                    <h3 class="unit-title">${R.esc(unit.title)}</h3>
                    <p class="unit-desc">${R.esc(unit.description)}</p>
                    <div class="case-tags">
                      ${unit.weeks.map((w) => `<span class="case-tag">${R.esc(w.businessCase.company)}</span>`).join('')}
                    </div>
                  </div>
                  <div class="progress-block">
                    <div class="progress-meta">
                      <span>Progreso de Lectura</span>
                      <b>${done}/4 Semanas (${pct}%)</b>
                    </div>
                    <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
                    <div class="unit-actions">
                      <button class="btn btn-outline" data-action="select-unit" data-id="${unit.id}">
                        ${R.iconStr('book-open', 14)} <span>Ver Contenido Guiado</span>
                      </button>
                      <button class="btn btn-cyan" data-action="select-unit" data-id="${unit.id}">
                        <span>Evaluación</span> ${R.iconStr('arrow-right', 14)}
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // VIEW: UNIT DETAIL
  // ============================================================
  function renderUnitDetail(unit) {
    const weekNums = unit.weeks.map((w) => w.weekNumber);
    const quizRes = state.quizResults[unit.id];

    return `
      <div class="space-y-6">
        <button class="back-link" data-action="back">${R.iconStr('arrow-right', 14)} <span>← Volver al Panorama General del Curso</span></button>

        <section class="card card-pad" style="background:linear-gradient(90deg,#0f172a,#0f172a,#1e1b4b)">
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px">
            <span class="unit-number">${R.esc(unit.number)} (${R.esc(unit.weeksRange)})</span>
            <span class="tag tag-slate">4 Semanas de Estudio Guiado</span>
            ${unitScoreBadge(quizRes)}
          </div>
          <h2 style="font-size:24px;font-weight:800;margin-top:12px">${R.esc(unit.title)}</h2>
          <p style="color:var(--text-dim);font-size:13px;margin-top:8px;line-height:1.7">${R.esc(unit.description)}</p>
          <div class="subtabs">
            ${[
              { id: 'weeks', label: 'Contenido Semanal', icon: 'book-open' },
              { id: 'quiz', label: 'Autoevaluación Interactiva', icon: 'file-text' },
              { id: 'labs', label: 'Simuladores de Código', icon: 'terminal' },
              { id: 'flashcards', label: 'Tarjetas de Refuerzo', icon: 'sparkles' },
            ].map((t) => `
              <button class="subtab ${state.detailTab === t.id ? 'active' : ''}" data-action="subtab" data-sub="${t.id}">
                ${R.iconStr(t.icon, 16)} <span>${t.label}</span>
              </button>
            `).join('')}
          </div>
        </section>

        ${state.detailTab === 'weeks' ? renderWeeks(unit) : ''}
        ${state.detailTab === 'quiz' ? renderQuiz(unit) : ''}
        ${state.detailTab === 'labs' ? renderLabs(unit) : ''}
        ${state.detailTab === 'flashcards' ? renderFlashcards(unit) : ''}
      </div>
    `;
  }

  function renderWeeks(unit) {
    const selWeek = unit.weeks.find((w) => w.weekNumber === state.selWeek) || unit.weeks[0];
    const isDone = state.completedWeeks.includes(selWeek.weekNumber);

    return `
      <div class="weeks-layout">
        <div class="week-list">
          <div class="week-list-label">Semanas de la ${R.esc(unit.number)}</div>
          ${unit.weeks.map((w) => {
            const completed = state.completedWeeks.includes(w.weekNumber);
            const selected = state.selWeek === w.weekNumber;
            return `
              <div class="week-item ${selected ? 'selected' : ''}" data-action="week" data-week="${w.weekNumber}">
                <button class="week-circle ${completed ? 'done' : ''}" data-action="toggle-week" data-week="${w.weekNumber}">
                  ${completed ? R.iconStr('check-circle', 16) : R.iconStr('circle', 16)}
                </button>
                <div class="week-item-body">
                  <div class="week-num">Semana ${w.weekNumber}</div>
                  <div class="week-title">${R.esc(w.title)}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="reader">
          <div class="reader-head">
            <div>
              <span class="week-chip">Semana ${selWeek.weekNumber}</span>
              <h3 class="reader-title">${R.esc(selWeek.title)}</h3>
              <p class="reader-objective"><strong>Objetivo de Aprendizaje:</strong> ${R.esc(selWeek.objective)}</p>
            </div>
            <button class="toggle-complete ${isDone ? 'done' : ''}" data-action="toggle-week" data-week="${selWeek.weekNumber}">
              ${isDone ? R.iconStr('check-circle', 16) + ' Semana Completada' : R.iconStr('circle', 16) + ' Marcar como Leída'}
            </button>
          </div>

          <div class="business-case">
            <div class="bc-title">${R.iconStr('building', 16)} <span>Caso Práctico del Entorno Empresarial Real</span></div>
            <div class="bc-company">Empresa: <span>${R.esc(selWeek.businessCase.company)}</span></div>
            <div class="bc-body">
              <p><strong class="problem">Problemática Técnica:</strong> ${R.esc(selWeek.businessCase.problem)}</p>
              <p><strong class="solution">Solución Cloud Aplicada:</strong> ${R.esc(selWeek.businessCase.solution)}</p>
            </div>
          </div>

          ${selWeek.theoreticalContent.map((sec) => `
            <div class="content-section">
              <h4>${R.esc(sec.sectionTitle)}</h4>
              <p>${R.esc(sec.body)}</p>
              ${sec.table ? `
                <div class="data-table" style="overflow:auto">
                  <table style="width:100%;border-collapse:collapse">
                    <thead><tr>${sec.table.headers.map((h) => `<th>${R.esc(h)}</th>`).join('')}</tr></thead>
                    <tbody>${sec.table.rows.map((r) => `<tr>${r.map((c) => `<td>${R.esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
                  </table>
                </div>
              ` : ''}
            </div>
          `).join('')}

          ${selWeek.codeExamples && selWeek.codeExamples.length ? `
            <div class="content-section">
              <h4>${R.iconStr('terminal', 16)} Código e Infraestructura Práctica:</h4>
              ${selWeek.codeExamples.map((codeEx) => `
                <div class="code-block">
                  <div class="code-head">
                    <span class="code-filename">${R.esc(codeEx.filename)}</span>
                    <button class="copy-btn" data-action="copy" data-code="${R.attrQuote(codeEx.code)}">
                      ${R.iconStr('copy', 14)} <span>Copiar</span>
                    </button>
                  </div>
                  <pre class="code-body">${R.esc(codeEx.code)}</pre>
                  <div class="code-desc">${R.esc(codeEx.description)}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="takeaways">
            <span class="takeaways-title">Conclusiones Clave de la Semana ${selWeek.weekNumber}</span>
            <ul>
              ${selWeek.keyTakeaways.map((t) => `<li>${R.esc(t)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  function renderLabs(unit) {
    return `
      <div class="card card-pad">
        <div style="padding-bottom:12px;border-bottom:1px solid var(--border)">
          <div class="section-title" style="font-size:18px">${R.iconStr('terminal', 20)} <span>Simuladores Prácticos de la ${R.esc(unit.number)}</span></div>
          <p class="section-sub">Pon a prueba el código de infraestructura en la consola interactiva simulada.</p>
        </div>
        <div class="grid grid-2" style="margin-top:16px">
          ${unit.labSimulations.map((lab) => `
            <div class="card" style="padding:16px;background:#020617">
              <span class="tag tag-emerald" style="font-family:ui-monospace,monospace">${R.esc(lab.type.toUpperCase())}</span>
              <h4 style="font-size:14px;font-weight:700;margin-top:10px">${R.esc(lab.title)}</h4>
              <p style="color:var(--text-dim);font-size:12px;margin-top:6px">${R.esc(lab.description)}</p>
              <button class="btn btn-emerald" style="width:100%;margin-top:12px;justify-content:center" data-action="open-lab" data-lab="${R.esc(lab.id)}">
                ${R.iconStr('terminal', 16)} <span>Abrir Simulador en Vivo</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderFlashcards(unit) {
    const concepts = unit.weeks.flatMap((w) => w.keyTakeaways);
    return `
      <div class="card card-pad">
        <div style="padding-bottom:12px;border-bottom:1px solid var(--border)">
          <div class="section-title" style="font-size:18px">${R.iconStr('sparkles', 20)} <span>Tarjetas de Refuerzo Rápido (${R.esc(unit.number)})</span></div>
          <p class="section-sub">Repaso activo de conceptos clave para asegurar bases sólidas.</p>
        </div>
        <div class="grid grid-2" style="grid-template-columns:repeat(3,1fr);margin-top:16px">
          ${concepts.map((c, i) => `
            <div class="card" style="padding:16px;background:#020617">
              <div style="font-size:12px;font-weight:700;color:var(--cyan);font-family:ui-monospace,monospace">Concepto Clave #${i + 1}</div>
              <p style="color:var(--text);font-size:12px;margin-top:8px;line-height:1.6">${R.esc(c)}</p>
              <div style="font-size:10px;color:var(--text-mute);text-align:right;margin-top:8px">ACN01 Refuerzo</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ============================================================
  // VIEW: QUIZ
  // ============================================================
  function renderQuiz(unit) {
    const questions = unit.quiz;
    const q = questions[state.qIndex] || questions[0];
    const submitted = state.qSubmitted;
    const sel = state.qAnswers[q.id] !== undefined ? state.qAnswers[q.id] : -1;
    const score = submitted ? questions.filter((qq, i) => state.qAnswers[qq.id] === qq.correctAnswerIndex).length : null;

    const diag = unit.diagnosticMatrix.find((d) => {
      if (score === 5) return d.level === 'Excelente';
      if (score >= 3) return d.level === 'Aceptable';
      return d.level === 'En Riesgo';
    }) || unit.diagnosticMatrix[0];

    const allAnswered = questions.every((qq) => state.qAnswers[qq.id] !== undefined);

    let diagBlock = '';
    if (submitted) {
      const dCls = score === 5 ? 'diag-excellent' : score >= 3 ? 'diag-ok' : 'diag-risk';
      const lCls = score === 5 ? 'excellent' : score >= 3 ? 'ok' : 'risk';
      const lIcon = score === 5 ? 'check-circle' : score >= 3 ? 'alert-triangle' : 'x-circle';
      diagBlock = `
        <div class="diag-card ${dCls}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px">
            <div style="flex:1">
              <div class="diag-head">${R.iconStr(lIcon, 24)} <span class="diag-level ${lCls}">Nivel de Dominio: ${R.esc(diag.level)} (${score} / 5)</span></div>
              <p class="diag-text">${R.esc(diag.diagnosis)}</p>
              <div class="diag-route">
                <div class="diag-route-title">${R.iconStr('book-open', 16)} <span>Ruta de Refuerzo Personalizada Recomendada:</span></div>
                <ul>${diag.recommendedRoute.map((r) => `<li>${R.esc(r)}</li>`).join('')}</ul>
                ${diag.mandatoryActivities && diag.mandatoryActivities.length ? `
                  <div class="diag-mandatory">
                    <b>Actividades de Refuerzo Obligatorias</b>
                    <div class="diag-chips">${diag.mandatoryActivities.map((a) => `<span class="chip">${R.esc(a)}</span>`).join('')}</div>
                  </div>
                ` : ''}
              </div>
            </div>
            ${score === 5 ? `
              <div class="badge-unlocked">${R.iconStr('award', 20)} <div><b>Insignia Desbloqueada</b><div style="font-size:11px;color:#a7f3d0">Dominio perfecto alcanzado</div></div></div>
            ` : ''}
          </div>
        </div>
      `;
    }

    return `
      <div class="card card-pad">
        <div class="quiz-head">
          <div>
            <div class="quiz-label">
              <span class="unit-number">${R.esc(unit.number)} - Autoevaluación Práctica</span>
              ${submitted ? `<span class="quiz-score ${score === 5 ? 'score-excellent' : score >= 3 ? 'score-ok' : 'score-risk'}">Puntaje: ${score} / 5</span>` : ''}
            </div>
            <h2 style="font-size:18px;font-weight:700;margin-top:6px">Evaluación Guiada: ${R.esc(unit.title)}</h2>
          </div>
          ${submitted ? `<button class="btn btn-outline" data-action="quiz-retake">${R.iconStr('refresh-cw', 14)} Volver a Intentar</button>` : ''}
        </div>

        ${diagBlock}

        <div class="quiz-stepper">
          ${questions.map((qq, idx) => {
            const answered = state.qAnswers[qq.id] !== undefined;
            const isCur = state.qIndex === idx;
            let cls = 'step-btn ';
            if (isCur) cls += 'current';
            else if (submitted) cls += answered && state.qAnswers[qq.id] === qq.correctAnswerIndex ? 'correct' : answered ? 'wrong' : '';
            else if (answered) cls += 'answered';
            return `<button class="${cls}" data-action="quiz-goto" data-idx="${idx}">Q${idx + 1}</button>`;
          }).join('')}
        </div>

        <div class="question-meta">
          <span class="qtag">${R.esc(q.categoryTag)}</span>
          <span>Pregunta ${state.qIndex + 1} de ${questions.length}</span>
        </div>
        <h3 class="question-text">${R.esc(q.question)}</h3>

        <div>
          ${q.options.map((opt, oi) => {
            const isSel = sel === oi;
            const isCorrectOpt = oi === q.correctAnswerIndex;
            let cls = 'option ';
            let letterCls = 'option-letter ';
            let icon = '';
            if (submitted) {
              if (isCorrectOpt) { cls += 'correct'; letterCls += 'correct'; icon = `<span class="option-icon">${R.iconStr('check', 16)}</span>`; }
              else if (isSel) { cls += 'wrong'; letterCls += 'wrong'; icon = `<span class="option-icon err">${R.iconStr('x', 16)}</span>`; }
              else { cls += 'dimmed'; }
            } else if (isSel) { cls += 'selected'; letterCls += 'selected'; }

            return `
              <button class="${cls}" data-action="quiz-answer" data-idx="${oi}" ${submitted ? 'disabled' : ''}>
                <span class="${letterCls}">${String.fromCharCode(65 + oi)}</span>
                <span style="flex:1;line-height:1.5">${R.esc(opt)}</span>
                ${icon}
              </button>
            `;
          }).join('')}
        </div>

        ${submitted ? `
          <div class="explanation">
            <div class="explanation-title">${R.iconStr('help-circle', 16)} <span>Justificación Técnica Explicativa:</span></div>
            <p>${R.esc(q.explanation)}</p>
          </div>
        ` : ''}

        <div class="quiz-footer">
          <button class="quiz-prev" data-action="quiz-prev" ${state.qIndex === 0 ? 'disabled' : ''}>← Anterior</button>
          ${!submitted
            ? (state.qIndex === questions.length - 1
                ? `<button class="btn btn-primary" data-action="quiz-submit" ${allAnswered ? '' : 'disabled'}>Finalizar y Calificar</button>`
                : `<button class="btn btn-outline" data-action="quiz-next">Siguiente ${R.iconStr('arrow-right', 14)}</button>`)
            : (state.qIndex < questions.length - 1
                ? `<button class="btn btn-outline" data-action="quiz-next">Ver Siguiente ${R.iconStr('arrow-right', 14)}</button>`
                : `<span></span>`)}
        </div>
      </div>
    `;
  }

  // ============================================================
  // VIEW: PROGRESS DASHBOARD
  // ============================================================
  function renderProgress() {
    const unlocked = state.badges.filter((b) => b.isUnlocked);
    const overall = Math.round((state.completedWeeks.length / TOTAL_WEEKS) * 100);
    const badgesPct = state.badges.length ? Math.round((unlocked.length / state.badges.length) * 100) : 0;
    const evalCount = Object.keys(state.quizResults).length;
    const studyH = Math.floor(state.studyMinutes / 60);
    const studyM = state.studyMinutes % 60;

    return `
      <div class="space-y-6">
        <div class="grid grid-4">
          <div class="stat-card">
            <div class="stat-head">PROGRESO GLOBAL ${R.iconStr('check-circle', 16)}</div>
            <div class="stat-value">${overall}%</div>
            <div class="stat-sub">${state.completedWeeks.length} de ${TOTAL_WEEKS} semanas completadas</div>
            <div class="bar"><div class="bar-fill" style="width:${overall}%"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-head" style="color:var(--amber)">INSIGNIAS GANADAS ${R.iconStr('award', 16)}</div>
            <div class="stat-value" style="color:#fde68a">${unlocked.length} / ${state.badges.length}</div>
            <div class="stat-sub">${badgesPct}% de logros desbloqueados</div>
            <div class="bar"><div class="bar-fill amber" style="width:${badgesPct}%"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-head" style="color:var(--emerald)">AUTOEVALUACIONES ${R.iconStr('sparkles', 16)}</div>
            <div class="stat-value">${evalCount} / 4</div>
            <div class="stat-sub">Unidades evaluadas con diagnóstico</div>
            <div class="bar"><div class="bar-fill emerald" style="width:${(evalCount / 4) * 100}%"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-head" style="color:var(--indigo)">TIEMPO DE ESTUDIO ${R.iconStr('clock', 16)}</div>
            <div class="stat-value" style="color:#c7d2fe">${studyH}h ${studyM}m</div>
            <div class="stat-sub">Dedicación acumulada en plataforma</div>
            <div style="font-size:11px;color:var(--indigo);font-weight:500;margin-top:8px">ACN01 - 144 Horas Totales</div>
          </div>
        </div>

        <div class="card card-pad">
          <div style="padding-bottom:12px;border-bottom:1px solid var(--border)">
            <div class="section-title" style="font-size:18px">${R.iconStr('book-open', 20)} <span>Estado Detallado por Unidades</span></div>
            <p class="section-sub">Consulta el avance de semanas leídas y el resultado del diagnóstico interactivo.</p>
          </div>
          <div class="grid grid-2" style="margin-top:16px">
            ${COURSE_UNITS.map((unit) => {
              const weekNums = unit.weeks.map((w) => w.weekNumber);
              const done = weekNums.filter((wn) => state.completedWeeks.includes(wn)).length;
              const pct = Math.round((done / weekNums.length) * 100);
              const quizRes = state.quizResults[unit.id];
              return `
                <div class="unit-row" data-action="select-unit" data-id="${unit.id}">
                  <div class="unit-row-top">
                    <span class="unit-number">${R.esc(unit.number)}</span>
                    <span class="chevron">${R.iconStr('chevron-right', 16)}</span>
                  </div>
                  <div class="unit-row-title">${R.esc(unit.title)}</div>
                  <div class="progress-meta" style="margin-top:10px"><span>Semanas leídas</span><b>${done} / ${weekNums.length} (${pct}%)</b></div>
                  <div class="bar" style="margin-top:6px"><div class="bar-fill" style="width:${pct}%"></div></div>
                  <div class="unit-row-foot">
                    <span>Autoevaluación:</span>
                    ${quizRes ? `<span class="quiz-score ${quizRes.score === 5 ? 'score-excellent' : quizRes.score >= 3 ? 'score-ok' : 'score-risk'}">${quizRes.score} / 5 (${R.esc(quizRes.level)})</span>` : `<span style="color:var(--text-mute);font-style:italic">Pendiente de realizar</span>`}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card card-pad">
          <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid var(--border)">
            <div>
              <div class="section-title" style="font-size:18px">${R.iconStr('award', 20)} <span>Sistema de Insignias y Logros</span></div>
              <p class="section-sub">Completa lecturas, laboratorios y autoevaluaciones para desbloquear insignias.</p>
            </div>
            <span class="tag tag-amber">${unlocked.length} / ${state.badges.length} Desbloqueadas</span>
          </div>
          <div class="badge-grid" style="margin-top:16px">
            ${state.badges.map((b) => `
              <div class="badge-item ${b.isUnlocked ? 'unlocked' : 'locked'}">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <div class="badge-icon ${b.isUnlocked ? 'unlocked' : 'locked'}">${R.iconStr(b.isUnlocked ? 'award' : 'lock', 16)}</div>
                  <span class="badge-cat">${R.esc(b.category)}</span>
                </div>
                <div>
                  <div class="badge-title ${b.isUnlocked ? 'unlocked' : 'locked'}">${R.esc(b.title)}</div>
                  <p class="badge-desc">${R.esc(b.description)}</p>
                </div>
                ${b.isUnlocked && b.unlockedAt ? `<div class="badge-date">Desbloqueada</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end">
          <button class="btn btn-danger" data-action="reset-progress">${R.iconStr('rotate', 14)} Reiniciar Progreso de Prueba</button>
        </div>
      </div>
    `;
  }

  // ============================================================
  // VIEW: ANALYTICS
  // ============================================================
  const studentCache = { list: [], active: null };

  function loadStudents() {
    const raw = S.getStudentsList();
    if (!raw || raw.length === 0) { studentCache.list = []; return; }
    studentCache.list = raw.map((item, idx) => {
      if (item.score !== undefined && item.status) return item;
      const qCount = Object.keys(state.quizResults).length;
      let avg = 0;
      if (qCount > 0) {
        const vals = Object.values(state.quizResults);
        const sum = vals.reduce((acc, c) => acc + (Number(c.score) || 0), 0);
        avg = Number((sum / qCount).toFixed(1));
      }
      let status = 'En Riesgo';
      if (avg >= 4.0) status = 'Fortaleza';
      else if (avg >= 3.0) status = 'Aceptable';
      return {
        id: idx + 1,
        name: item.name,
        email: item.email || `${item.name.toLowerCase().replace(/\s+/g, '.')}@estudiante.edu`,
        score: avg,
        status,
        strengths: qCount > 0 ? 'Modelos de servicio cloud, Virtualización' : 'Iniciando ruta de aprendizaje',
        weaknesses: qCount > 0 ? 'Orquestación avanzada de contenedores' : 'Pendiente realizar autoevaluaciones',
        recommendedRoute: 'Ruta Guiada ACN01: Unidades I - IV',
      };
    });
  }

  function loadDemoCohort() {
    S.loadSampleStudents(COHORT_STUDENTS);
    localStorage.setItem('acn01_students_list', JSON.stringify(COHORT_STUDENTS));
    studentCache.list = COHORT_STUDENTS;
    emit();
  }

  function clearRoster() {
    localStorage.removeItem('acn01_students_list');
    studentCache.list = [];
    emit();
  }

  function registerStudent(name, email) {
    const emailFinal = email || `${name.toLowerCase().trim().replace(/\s+/g, '.')}@estudiante.edu`;
    const qCount = Object.keys(state.quizResults).length;
    let avg = 0;
    if (qCount > 0) {
      const vals = Object.values(state.quizResults);
      const sum = vals.reduce((acc, c) => acc + (Number(c.score) || 0), 0);
      avg = Number((sum / qCount).toFixed(1));
    }
    let status = 'En Riesgo';
    if (avg >= 4.0) status = 'Fortaleza';
    else if (avg >= 3.0) status = 'Aceptable';
    const rec = {
      id: Date.now(),
      name: name.trim(),
      email: emailFinal,
      score: avg,
      status,
      strengths: qCount > 0 ? 'Fundamentos Cloud y Microservicios' : 'Registrado recientemente en plataforma',
      weaknesses: qCount > 0 ? 'Manifiestos Kubernetes y HCL' : 'Sin autoevaluaciones completadas aún',
      recommendedRoute: 'Plan de Estudio Guiado ACN01 - 16 Semanas',
    };
    S.setCurrentStudent({ id: rec.id.toString(), name: rec.name, email: rec.email, registeredAt: new Date().toISOString() });
    studentCache.list = [rec, ...studentCache.list];
    localStorage.setItem('acn01_students_list', JSON.stringify(studentCache.list));
    studentCache.active = { name: rec.name, email: rec.email };
    emit();
  }

  function renderAnalytics() {
    loadStudents();
    const current = S.getCurrentStudent();
    if (current && !studentCache.active) studentCache.active = { name: current.name, email: current.email };
    if (!current) studentCache.active = null;

    const filter = state.aFilter || 'Todos';
    const search = (state.aSearch || '').toLowerCase();
    const students = studentCache.list;
    const total = students.length;
    const avg = total > 0 ? (students.reduce((a, c) => a + c.score, 0) / total).toFixed(2) : '0.0';
    const counts = {
      fortaleza: students.filter((s) => s.status === 'Fortaleza').length,
      aceptable: students.filter((s) => s.status === 'Aceptable').length,
      enRiesgo: students.filter((s) => s.status === 'En Riesgo').length,
    };
    const filtered = students.filter((st) => {
      const mStatus = filter === 'Todos' || st.status === filter;
      const mSearch = st.name.toLowerCase().includes(search) || st.email.toLowerCase().includes(search);
      return mStatus && mSearch;
    });

    return `
      <div class="space-y-6">
        <div class="card card-pad">
          <div class="analytics-head">
            <div>
              <div style="display:flex;align-items:center;gap:8px">
                <span class="tag tag-cyan">ACN01 - Analítica de Aprendizaje</span>
                <span style="color:var(--text-dim);font-size:12px">${total === 0 ? 'Sin registros activos' : `Cohorte (${total} Estudiante${total === 1 ? '' : 's'})`}</span>
              </div>
              <h2 style="font-size:20px;font-weight:700;margin-top:6px">Dashboard de Rendimiento & Diagnóstico</h2>
            </div>
            <div class="analytics-tools">
              <button class="btn btn-cyan" data-action="register">${R.iconStr('user-plus', 16)} Registrar Estudiante</button>
              ${total === 0 ? `<button class="btn btn-outline" data-action="demo-cohort">${R.iconStr('sparkles', 16)} Cargar Datos Demo</button>` : ''}
              ${total > 0 ? `<button class="btn btn-danger" data-action="clear-roster">${R.iconStr('trash', 16)}</button>` : ''}
            </div>
          </div>

          ${studentCache.active ? `
            <div class="active-profile">
              <span style="display:flex;align-items:center;gap:8px">${R.iconStr('user', 16)} Estudiante Activo: <strong>${R.esc(studentCache.active.name)}</strong> (${R.esc(studentCache.active.email)})</span>
              <button data-action="register" style="background:none;border:none;color:#fff;text-decoration:underline;font-size:11px;cursor:pointer">Cambiar Estudiante</button>
            </div>
          ` : ''}

          <div class="grid grid-4" style="margin-top:16px">
            <div class="metric">
              <div class="metric-label">Promedio Cohorte</div>
              <div class="metric-value">${avg} / 5.0</div>
              <div class="metric-sub">${total} estudiante(s) registrados</div>
            </div>
            <div class="metric emerald">
              <div class="metric-label">Fortaleza (4.0 - 5.0)</div>
              <div class="metric-value">${counts.fortaleza} Estudiantes</div>
              <div class="metric-sub">${total > 0 ? Math.round((counts.fortaleza / total) * 100) : 0}% de la cohorte</div>
            </div>
            <div class="metric amber">
              <div class="metric-label">Aceptable (3.0 - 3.9)</div>
              <div class="metric-value">${counts.aceptable} Estudiantes</div>
              <div class="metric-sub">${total > 0 ? Math.round((counts.aceptable / total) * 100) : 0}% de la cohorte</div>
            </div>
            <div class="metric rose">
              <div class="metric-label">En Riesgo (&lt; 3.0)</div>
              <div class="metric-value">${counts.enRiesgo} Estudiantes</div>
              <div class="metric-sub">${total > 0 ? Math.round((counts.enRiesgo / total) * 100) : 0}% requiere apoyo</div>
            </div>
          </div>
        </div>

        <div class="card card-pad">
          ${total === 0 ? `
            <div class="empty-state">
              <h3>Analítica Vacía — Inicia tu Aprendizaje</h3>
              <p>Ingresa tu nombre para registrar tus resultados de autoevaluación, diagnósticos y progreso semanal.</p>
              <div class="empty-actions">
                <button class="btn btn-cyan" data-action="register">${R.iconStr('plus-circle', 16)} Registrarme como Estudiante</button>
                <button class="btn btn-outline" data-action="demo-cohort">${R.iconStr('sparkles', 16)} Cargar Datos de Ejemplo (Demo)</button>
              </div>
            </div>
          ` : `
            <div class="roster-controls">
              <div class="search-wrap">
                ${R.iconStr('search', 16)}
                <input class="search-input" type="text" placeholder="Buscar estudiante por nombre o correo..." value="${R.attr(state.aSearch || '')}" data-action="search"/>
              </div>
              <div class="filter-group">
                ${['Todos', 'Fortaleza', 'Aceptable', 'En Riesgo'].map((st) => `
                  <button class="filter-btn ${filter === st ? 'active' : ''}" data-action="filter" data-filter="${st}">${st}</button>
                `).join('')}
              </div>
            </div>
            <div style="overflow:auto;border:1px solid var(--border);border-radius:12px">
              <table class="roster-table" style="width:100%">
                <thead><tr><th>Estudiante</th><th>Puntaje Global</th><th>Estado Diagnóstico</th><th>Fortalezas</th><th style="text-align:right">Ruta</th></tr></thead>
                <tbody>
                  ${filtered.length === 0 ? `<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text-mute)">No se encontraron estudiantes.</td></tr>` : ''}
                  ${filtered.map((st) => `
                    <tr data-action="view-student" data-name="${R.attrQuote(st.name)}">
                      <td>
                        <div class="roster-name">${R.esc(st.name)} ${studentCache.active && studentCache.active.name === st.name ? `<span class="roster-you">TÚ</span>` : ''}</div>
                        <div class="roster-email">${R.esc(st.email)}</div>
                      </td>
                      <td><span class="score-cell">${st.score} / 5.0</span></td>
                      <td><span class="status-pill ${st.status === 'Fortaleza' ? 'status-fortaleza' : st.status === 'Aceptable' ? 'status-aceptable' : 'status-riesgo'}">${R.esc(st.status)}</span></td>
                      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${R.esc(st.strengths)}</td>
                      <td style="text-align:right"><button class="btn btn-outline" data-action="view-student" data-name="${R.attrQuote(st.name)}">Ver Diagnóstico</button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // ============================================================
  // MODALS
  // ============================================================
  let selectedStudentModal = null;

  function renderModals() {
    let modals = '';
    if (state.isRegisterOpen) {
      modals += `
        <div class="modal-overlay" data-action="close-overlay">
          <div class="modal" data-stop="1">
            <div class="modal-head">
              <div class="modal-title">${R.iconStr('user-plus', 20)} <span>Ingreso de Estudiante ACN01</span></div>
              <button class="modal-close" data-action="close-modal">✕</button>
            </div>
            <div class="modal-body">
              <form data-form="register">
                <div class="form-group">
                  <label>Nombre Completo *</label>
                  <div class="input-icon">${R.iconStr('user', 16)}<input class="form-input" type="text" required placeholder="Ej. Carlos Mendoza" name="name" style="padding-left:36px"/></div>
                </div>
                <div class="form-group">
                  <label>Correo Electrónico (Opcional)</label>
                  <div class="input-icon">${R.iconStr('mail', 16)}<input class="form-input" type="email" placeholder="Ej. carlos.mendoza@estudiante.edu" name="email" style="padding-left:36px"/></div>
                </div>
                <div class="modal-foot">
                  <button type="button" class="btn btn-outline" data-action="close-modal">Cancelar</button>
                  <button type="submit" class="btn btn-cyan">Registrar e Iniciar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `;
    }
    if (selectedStudentModal) {
      const st = selectedStudentModal;
      modals += `
        <div class="modal-overlay" data-action="close-overlay">
          <div class="modal" data-stop="1">
            <div class="modal-head">
              <div>
                <span class="status-pill ${st.status === 'Fortaleza' ? 'status-fortaleza' : st.status === 'Aceptable' ? 'status-aceptable' : 'status-riesgo'}">${R.esc(st.status)} (${st.score} / 5.0)</span>
                <h3 style="font-size:18px;font-weight:700;margin-top:6px">${R.esc(st.name)}</h3>
                <p style="font-size:12px;color:var(--text-mute);font-family:ui-monospace,monospace">${R.esc(st.email)}</p>
              </div>
              <button class="modal-close" data-action="close-modal">✕</button>
            </div>
            <div class="modal-body">
              <div><label class="detail-label strong">Fortalezas Principales:</label><div class="detail-value">${R.esc(st.strengths)}</div></div>
              <div><label class="detail-label weak">Aspectos por Reforzar:</label><div class="detail-value">${R.esc(st.weaknesses)}</div></div>
              <div><label class="detail-label route">Ruta de Refuerzo Asignada:</label><div class="detail-value route">${R.esc(st.recommendedRoute)}</div></div>
            </div>
            <div class="modal-foot">
              <button class="btn btn-outline" data-action="close-modal">Cerrar Diagnóstico</button>
            </div>
          </div>
        </div>
      `;
    }
    return modals;
  }

  // ============================================================
  // MAIN RENDER (delegated)
  // ============================================================
  function render() {
    renderNavbar();

    let view = '';
    if (state.activeTab === 'units') {
      const unit = COURSE_UNITS.find((u) => u.id === state.selectedUnitId);
      view = unit ? renderUnitDetail(unit) : renderUnitOverview();
    } else if (state.activeTab === 'progress') {
      view = renderProgress();
    } else if (state.activeTab === 'playground') {
      view = window.Playground.render();
    } else if (state.activeTab === 'analytics') {
      view = renderAnalytics();
    }

    mainEl.innerHTML = `
      <main class="container main">
        ${view}
        <footer class="footer">
          <p><strong>Arquitectura y Computación en la Nube (Código ACN01)</strong> — Nivel 8 Ingeniería de Software</p>
          <p class="sub">Aprendizaje Guiado con Autoevaluaciones, Diagnóstico Automatizado e Insignias.</p>
        </footer>
      </main>
      ${renderModals()}
    `;

    bindEvents();
  }

  function bindEvents() {
    // Global click delegation
    mainEl.querySelectorAll('[data-action]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const action = el.dataset.action;
        handleAction(action, el, e);
      });
    });

    // Search input (analytics)
    mainEl.querySelectorAll('[data-action="search"]').forEach((input) => {
      input.addEventListener('input', (e) => {
        state.aSearch = e.target.value;
        rerenderMain();
      });
    });

    // Playground code textareas (persist without re-render)
    mainEl.querySelectorAll('[data-action="pg-code-docker"]').forEach((ta) => {
      ta.addEventListener('input', () => { window.Playground.handle('pg-code-docker', ta); });
    });
    mainEl.querySelectorAll('[data-action="pg-code-tf"]').forEach((ta) => {
      ta.addEventListener('input', () => { window.Playground.handle('pg-code-tf', ta); });
    });
    mainEl.querySelectorAll('[data-action="pg-k8s-range"]').forEach((r) => {
      r.addEventListener('input', () => { window.Playground.handle('pg-k8s-range', r); });
    });

    // Register form
    const regForm = mainEl.querySelector('[data-form="register"]');
    if (regForm) {
      regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = regForm.querySelector('[name="name"]').value;
        const email = regForm.querySelector('[name="email"]').value;
        registerStudent(name, email);
        state.isRegisterOpen = false;
        rerenderMain();
      });
    }
  }

  function handleAction(action, el, e) {
    switch (action) {
      case 'select-unit': selectUnit(Number(el.dataset.id)); break;
      case 'open-playground': openPlayground(); break;
      case 'back': setTab('units'); break;
      case 'subtab': state.detailTab = el.dataset.sub; rerenderMain(); break;
      case 'week': state.selWeek = Number(el.dataset.week); rerenderMain(); break;
      case 'toggle-week': toggleWeek(Number(el.dataset.week)); break;
      case 'copy': {
        const code = el.dataset.code;
        navigator.clipboard.writeText(code);
        const span = el.querySelector('span');
        if (span) span.textContent = '¡Copiado!';
        el.classList.add('copied');
        setTimeout(() => {
          if (span) span.textContent = 'Copiar';
          el.classList.remove('copied');
        }, 2000);
        break;
      }
      case 'open-lab': window.Playground.openLab(el.dataset.lab); setTab('playground'); break;
      case 'quiz-goto': state.qIndex = Number(el.dataset.idx); rerenderMain(); break;
      case 'quiz-answer': state.qAnswers[COURSE_UNITS.find((u) => u.id === state.selectedUnitId).quiz[state.qIndex].id] = Number(el.dataset.idx); rerenderMain(); break;
      case 'quiz-prev': state.qIndex = Math.max(0, state.qIndex - 1); rerenderMain(); break;
      case 'quiz-next': {
        const unit = COURSE_UNITS.find((u) => u.id === state.selectedUnitId);
        state.qIndex = Math.min(unit.quiz.length - 1, state.qIndex + 1);
        rerenderMain(); break;
      }
      case 'quiz-submit': submitQuiz(); break;
      case 'quiz-retake': {
        state.qAnswers = {};
        state.qSubmitted = false;
        state.qIndex = 0;
        rerenderMain(); break;
      }
      case 'reset-progress': {
        if (confirm('¿Estás seguro de reiniciar todo el progreso y las insignias? Esta acción es irreversible.')) {
          resetProgress();
        }
        break;
      }
      case 'register': state.isRegisterOpen = true; rerenderMain(); break;
      case 'close-modal': state.isRegisterOpen = false; selectedStudentModal = null; rerenderMain(); break;
      case 'close-overlay': {
        if (e.target === el) { state.isRegisterOpen = false; selectedStudentModal = null; rerenderMain(); }
        break;
      }
      case 'demo-cohort': loadDemoCohort(); break;
      case 'clear-roster': if (confirm('¿Deseas vaciar los registros de analítica de la cohorte?')) clearRoster(); break;
      case 'filter': state.aFilter = el.dataset.filter; rerenderMain(); break;
      case 'view-student': {
        const name = el.dataset.name;
        const st = studentCache.list.find((s) => s.name === name);
        if (st) selectedStudentModal = st;
        rerenderMain(); break;
      }
      default: {
        // Forward playground actions
        if (window.Playground && typeof window.Playground.handle === 'function' && action.startsWith('pg-')) {
          window.Playground.handle(action, el);
        }
      }
    }
  }

  function submitQuiz() {
    const unit = COURSE_UNITS.find((u) => u.id === state.selectedUnitId);
    const score = unit.quiz.filter((q, i) => state.qAnswers[q.id] === q.correctAnswerIndex).length;
    let level = 'En Riesgo';
    if (score === 5) level = 'Excelente';
    else if (score >= 3) level = 'Aceptable';
    const result = {
      unitId: unit.id,
      score,
      level,
      userAnswers: unit.quiz.map((q) => state.qAnswers[q.id] ?? -1),
      completedAt: new Date().toISOString(),
    };
    state.qSubmitted = true;
    saveQuizResult(result);
  }

  function rerenderMain() {
    // Re-render just main (keep navbar as-is for input focus stability in search)
    let view = '';
    if (state.activeTab === 'units') {
      const unit = COURSE_UNITS.find((u) => u.id === state.selectedUnitId);
      view = unit ? renderUnitDetail(unit) : renderUnitOverview();
    } else if (state.activeTab === 'progress') view = renderProgress();
    else if (state.activeTab === 'playground') view = window.Playground.render();
    else if (state.activeTab === 'analytics') view = renderAnalytics();

    mainEl.innerHTML = view + renderModals();
    bindEvents();
  }

  // ---------- Timer: study minutes ----------
  setInterval(() => {
    const updated = S.addStudyMinutes(1);
    state.studyMinutes = updated;
    if (state.activeTab === 'progress') rerenderMain();
  }, 60000);

  // ---------- Init ----------
  // Quiz state fields
  state.detailTab = 'weeks';
  state.selWeek = null;
  state.qIndex = 0;
  state.qAnswers = {};
  state.qSubmitted = false;
  state.isRegisterOpen = false;
  state.aFilter = 'Todos';
  state.aSearch = '';

  refreshState();
  render();

  // Re-render the whole app whenever state changes (emit).
  subscribe(render);

  // Expose API used by Playground
  window.App = {
    state,
    selectUnit,
    unlockLabBadge,
    rerenderMain,
    emit,
  };
})();
