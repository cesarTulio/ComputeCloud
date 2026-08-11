'use strict';

window.Playground = (() => {
  const R = window.Render;

  const pg = {
    tab: 'docker',
    dockerCode: `version: '3.8'
services:
  web_app:
    build: .
    ports:
      - "8080:3000"
    environment:
      - MONGO_URI=mongodb://db_mongo:27017/acn01_db
    depends_on:
      - db_mongo
  db_mongo:
    image: mongo:6.0
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:`,
    dockerOut: [],
    dockerRunning: false,
    tfCode: `provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "vpc_demo" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "VPC-Produccion-ACN01"
  }
}

resource "aws_subnet" "subnet_publica" {
  vpc_id                  = aws_vpc.vpc_demo.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
}

resource "aws_instance" "app_node" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.subnet_publica.id
}`,
    tfOut: [],
    tfRunning: false,
    k8sReplicas: 3,
    migrationAnswers: {},
  };

  const scenarios = [
    { id: 1, app: 'Servidor de Correo Exchange On-Premises', solution: 'Repurchase', desc: 'Reemplazar por Google Workspace / Microsoft 365 SaaS.' },
    { id: 2, app: 'Máquina Virtual Legacy Windows Server 2012', solution: 'Rehost', desc: 'Mover a AWS EC2 tal cual sin modificar código (Lift and Shift).' },
    { id: 3, app: 'Base de Datos Oracle local', solution: 'Replatform', desc: 'Mover a AWS RDS PostgreSQL administrado sin reescribir app.' },
    { id: 4, app: 'Monolito de Ventas en Java de hace 15 años', solution: 'Refactor', desc: 'Rediseñar a microservicios Serverless nativos de la nube.' },
  ];

  function openLab(labId) {
    const unit = window.COURSE_UNITS.find((u) => u.labSimulations.some((l) => l.id === labId));
    const lab = unit && unit.labSimulations.find((l) => l.id === labId);
    if (!lab) return;
    if (lab.type === 'docker') { pg.tab = 'docker'; pg.dockerCode = lab.defaultCode; }
    else if (lab.type === 'terraform') { pg.tab = 'terraform'; pg.tfCode = lab.defaultCode; }
    else if (lab.type === 'migration') pg.tab = 'migration';
    else if (lab.type === 'k8s') pg.tab = 'k8s';
  }

  function runDocker() {
    if (pg.dockerRunning) return;
    pg.dockerRunning = true;
    pg.dockerOut = ['$ docker-compose up -d --build'];
    window.App.unlockLabBadge();
    window.App.rerenderMain();
    setTimeout(() => {
      pg.dockerOut = pg.dockerOut.concat([
        '[+] Building web_app 1.2s (5/5) FINISHED',
        '=> [1/3] FROM node:18-alpine',
        '=> [2/3] COPY package*.json ./',
        '=> [3/3] RUN npm ci --only=production',
      ]);
      window.App.rerenderMain();
    }, 600);
    setTimeout(() => {
      pg.dockerOut = pg.dockerOut.concat([
        "[+] Creating network 'app_default' with driver 'bridge'",
        "[+] Creating volume 'mongo_data' with default driver",
        '[+] Container db_mongo  Started  (0.8s)',
        '[+] Container web_app   Started  (1.4s)',
        '✔ STATUS: All 2 containers operational at http://localhost:8080',
      ]);
      pg.dockerRunning = false;
      window.App.rerenderMain();
    }, 1500);
  }

  function runTerraform() {
    if (pg.tfRunning) return;
    pg.tfRunning = true;
    pg.tfOut = ['$ terraform plan'];
    window.App.unlockLabBadge();
    window.App.rerenderMain();
    setTimeout(() => {
      pg.tfOut = pg.tfOut.concat([
        'Terraform used the selected providers to generate the following execution plan:',
        '',
        'An execution plan has been generated and is shown below.',
        'Resource actions are indicated with the following symbols:',
        '  + create',
        '',
        'Terraform will perform the following actions:',
        '',
        '  # aws_instance.app_node will be created',
        '  + resource "aws_instance" "app_node" {',
        '      + ami           = "ami-0c7217cdde317cfec"',
        '      + instance_type = "t2.micro"',
        '      + subnet_id     = (known after apply)',
        '    }',
        '',
        '  # aws_vpc.vpc_demo will be created',
        '  + resource "aws_vpc" "vpc_demo" {',
        '      + cidr_block = "10.0.0.0/16"',
        '    }',
        '',
        'Plan: 3 to add, 0 to change, 0 to destroy.',
      ]);
      pg.tfRunning = false;
      window.App.rerenderMain();
    }, 1200);
  }

  function render() {
    const tabs = [
      { id: 'docker', label: 'Docker Compose', icon: 'container' },
      { id: 'terraform', label: 'HashiCorp Terraform', icon: 'cpu' },
      { id: 'k8s', label: 'Escalado Pods Kubernetes', icon: 'layers' },
      { id: 'migration', label: "Juego 6 R's Migración", icon: 'globe' },
    ];

    let body = '';
    if (pg.tab === 'docker') body = renderDocker();
    else if (pg.tab === 'terraform') body = renderTerraform();
    else if (pg.tab === 'k8s') body = renderK8s();
    else if (pg.tab === 'migration') body = renderMigration();

    return `
      <div class="space-y-6">
        <div class="pg-header">
          <div style="display:flex;align-items:center;gap:8px">
            <span class="tag tag-emerald" style="text-transform:uppercase">Laboratorio Interactivo</span>
            <span style="color:var(--text-dim);font-size:12px">Ejecución Virtual de Código Cloud</span>
          </div>
          <h2 style="font-size:22px;font-weight:700;margin-top:10px">Simuladores de Infraestructura & Orquestación</h2>
          <p style="color:var(--text-dim);font-size:13px;margin-top:6px">Prueba comandos de Docker, Terraform HCL, escalado de Pods en Kubernetes y la matriz de las 6 R's de migración.</p>
          <div class="pg-tabs">
            ${tabs.map((t) => `
              <button class="pg-tab ${pg.tab === t.id ? 'active' : ''}" data-action="pg-tab" data-tab="${t.id}">
                ${R.iconStr(t.icon, 16)} <span>${t.label}</span>
              </button>
            `).join('')}
          </div>
        </div>

        ${body}
      </div>
    `;
  }

  function renderDocker() {
    return `
      <div class="pg-layout">
        <div class="pg-editor">
          <div class="pg-editor-head">
            <span class="pg-filename">docker-compose.yml</span>
            <button class="btn btn-emerald" data-action="pg-run-docker" ${pg.dockerRunning ? 'disabled' : ''}>
              ${R.iconStr('play', 14)} Simular docker-compose up -d
            </button>
          </div>
          <textarea class="code-body" data-action="pg-code-docker" rows="18" style="width:100%;height:320px;resize:none;background:#020617;border:1px solid var(--border);border-radius:12px;padding:12px;color:var(--text-dim)">${R.esc(pg.dockerCode)}</textarea>
        </div>
        <div class="pg-console">
          <div>
            <div class="pg-console-head">${R.iconStr('terminal', 16)} <span>Salida de Consola Virtual</span></div>
            <div class="pg-output">
              ${pg.dockerOut.length === 0
                ? `<span style="color:var(--text-mute);font-style:italic">Haz clic en 'Simular docker-compose up -d' para ejecutar la pila de contenedores...</span>`
                : pg.dockerOut.map((line) => `<div class="${line.startsWith('✔') ? 'ok' : ''}">${R.esc(line)}</div>`).join('')}
            </div>
          </div>
          ${pg.dockerOut.length > 0 ? `
            <div class="pg-console-foot">
              <span>Servicios activos: web_app (3000->8080), db_mongo (27017)</span>
              ${R.iconStr('check-circle', 16)}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function renderTerraform() {
    return `
      <div class="pg-layout">
        <div class="pg-editor">
          <div class="pg-editor-head">
            <span class="pg-filename">main.tf (HCL)</span>
            <button class="btn btn-emerald" data-action="pg-run-tf" ${pg.tfRunning ? 'disabled' : ''}>
              ${R.iconStr('play', 14)} Simular terraform plan
            </button>
          </div>
          <textarea class="code-body" data-action="pg-code-tf" rows="18" style="width:100%;height:320px;resize:none;background:#020617;border:1px solid var(--border);border-radius:12px;padding:12px;color:var(--text-dim)">${R.esc(pg.tfCode)}</textarea>
        </div>
        <div class="pg-console">
          <div>
            <div class="pg-console-head">${R.iconStr('terminal', 16)} <span>Salida de Plan de Ejecución</span></div>
            <div class="pg-output">
              ${pg.tfOut.length === 0
                ? `<span style="color:var(--text-mute);font-style:italic">Haz clic en 'Simular terraform plan' para validar la sintaxis HCL...</span>`
                : pg.tfOut.map((line) => `<div class="${line.includes('Plan:') ? 'ok' : ''}">${R.esc(line)}</div>`).join('')}
            </div>
          </div>
          ${pg.tfOut.length > 0 ? `
            <div class="pg-console-foot">
              <span>Estado: Plan seguro generado (0 cambios aplicados aún)</span>
              ${R.iconStr('check-circle', 16)}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function renderK8s() {
    return `
      <div class="pg-card">
        <div class="pg-card-head" style="flex-direction:column;align-items:flex-start;gap:16px">
          <div>
            <h3 style="font-size:16px;font-weight:700">Orquestador Kubernetes Deployment: <span style="color:var(--emerald);font-family:ui-monospace,monospace">api-pagos</span></h3>
            <p style="color:var(--text-dim);font-size:12px;margin-top:4px">Ajusta el número de réplicas y observa cómo Kubernetes escala pods manteniendo disponibilidad continua.</p>
          </div>
          <div class="pg-slider">
            <label>Réplicas:</label>
            <input type="range" min="1" max="10" value="${pg.k8sReplicas}" data-action="pg-k8s-range"/>
            <b>${pg.k8sReplicas}</b>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--text-dim);margin-top:16px">
          <span>Pods en Ejecución (Cluster Node 1):</span>
          <span class="pg-cmd">kubectl scale deployment api-pagos --replicas=${pg.k8sReplicas}</span>
        </div>
        <div class="pods">
          ${Array.from({ length: pg.k8sReplicas }).map((_, i) => `
            <div class="pod">
              <div class="pod-top"><span>pod-${i + 1}</span><span class="pod-dot"></span></div>
              <div class="pod-status">Running</div>
              <div class="pod-meta">CPU: 120m | MEM: 180Mi</div>
            </div>
          `).join('')}
        </div>
        <div class="zero-downtime">
          <b>Garantía Zero Downtime (RollingUpdate):</b>
          <p>En caso de desplegar una nueva versión 'v2', Kubernetes sustituirá progresivamente los pods antiguos por nuevos sin interrumpir las transacciones en curso.</p>
        </div>
      </div>
    `;
  }

  function renderMigration() {
    return `
      <div class="pg-card">
        <div style="padding-bottom:12px;border-bottom:1px solid var(--border)">
          <h3 style="font-size:16px;font-weight:700">Desafío de Clasificación: Metodología de las 6 R's de Migración</h3>
          <p style="color:var(--text-dim);font-size:12px;margin-top:4px">Asigna la estrategia de migración correcta a cada caso de estudio corporativo.</p>
        </div>
        <div class="grid grid-2" style="margin-top:16px">
          ${scenarios.map((sc) => {
            const sel = pg.migrationAnswers[sc.id];
            const isCorrect = sel === sc.solution;
            return `
              <div class="scenario">
                <div class="scenario-num">Caso #${sc.id}</div>
                <div class="scenario-app">${R.esc(sc.app)}</div>
                <div class="r-grid">
                  ${['Rehost', 'Replatform', 'Refactor', 'Repurchase'].map((r) => {
                    let cls = 'r-btn';
                    if (sel === r) cls += isCorrect ? ' correct' : ' wrong';
                    return `<button class="${cls}" data-action="pg-migrate" data-case="${sc.id}" data-sol="${r}">${r}</button>`;
                  }).join('')}
                </div>
                ${sel ? `
                  <div class="scenario-feedback ${isCorrect ? 'ok' : 'bad'}">
                    ${isCorrect ? '¡Correcto! ' : 'Sugerencia: '}${R.esc(sc.desc)}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function handle(action, el) {
    switch (action) {
      case 'pg-tab': pg.tab = el.dataset.tab; window.App.rerenderMain(); break;
      case 'pg-run-docker': runDocker(); break;
      case 'pg-run-tf': runTerraform(); break;
      case 'pg-code-docker': pg.dockerCode = el.value; break;
      case 'pg-code-tf': pg.tfCode = el.value; break;
      case 'pg-k8s-range': pg.k8sReplicas = Number(el.value); window.App.rerenderMain(); break;
      case 'pg-migrate': {
        pg.migrationAnswers[el.dataset.case] = el.dataset.sol;
        window.App.unlockLabBadge();
        window.App.rerenderMain(); break;
      }
    }
  }

  return { render, openLab, handle };
})();
