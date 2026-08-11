'use strict';

const INITIAL_BADGES = [
  {
    id: 'badge-unit-1',
    title: 'Fundamentos Cloud',
    description: 'Completaste el estudio de la Unidad I: Introducción a la Computación en la Nube.',
    iconName: 'Cloud',
    category: 'Unidad',
    isUnlocked: false
  },
  {
    id: 'badge-quiz-1',
    title: 'Maestro de NIST',
    description: 'Aprobaste la Autoevaluación de la Unidad I con un nivel Excelente (5/5).',
    iconName: 'Award',
    category: 'Evaluación',
    isUnlocked: false
  },
  {
    id: 'badge-unit-2',
    title: 'Capitán Docker',
    description: 'Completaste el estudio de la Unidad II y domaste la virtualización ligera.',
    iconName: 'Container',
    category: 'Unidad',
    isUnlocked: false
  },
  {
    id: 'badge-quiz-2',
    title: 'Guardián Stateless',
    description: 'Aprobaste la Autoevaluación de la Unidad II con un nivel Excelente (5/5).',
    iconName: 'ShieldCheck',
    category: 'Evaluación',
    isUnlocked: false
  },
  {
    id: 'badge-unit-3',
    title: 'Arquitecto de Código',
    description: 'Completaste la Unidad III: IaC con Terraform y Orquestación con Kubernetes.',
    iconName: 'Code2',
    category: 'Unidad',
    isUnlocked: false
  },
  {
    id: 'badge-quiz-3',
    title: 'Especialista K8s',
    description: 'Aprobaste la Autoevaluación de la Unidad III con un nivel Excelente (5/5).',
    iconName: 'Cpu',
    category: 'Evaluación',
    isUnlocked: false
  },
  {
    id: 'badge-unit-4',
    title: 'Pionero Multicloud',
    description: 'Completaste la Unidad IV: Sistemas Multicloud, Edge Computing y las 6 R\'s.',
    iconName: 'Globe',
    category: 'Unidad',
    isUnlocked: false
  },
  {
    id: 'badge-quiz-4',
    title: 'Estratega 6 R\'s',
    description: 'Aprobaste la Autoevaluación de la Unidad IV con un nivel Excelente (5/5).',
    iconName: 'Zap',
    category: 'Evaluación',
    isUnlocked: false
  },
  {
    id: 'badge-lab-master',
    title: 'Científico de Laboratorio',
    description: 'Ejecutaste y probaste los simuladores interactivos de código en la nube.',
    iconName: 'Terminal',
    category: 'Laboratorio',
    isUnlocked: false
  },
  {
    id: 'badge-ai-tutor',
    title: 'Estudiante Curioso',
    description: 'Consultaste al Tutor AI de la Nube para resolver dudas de la materia.',
    iconName: 'Bot',
    category: 'Exploración',
    isUnlocked: false
  }
];

const COURSE_ANALYTICS_DATA = {
  globalAverage: 3.675,
  totalStudents: 15,
  riskCounts: {
    fortaleza: 7,
    aceptable: 4,
    enRiesgo: 4
  }
};

const COHORT_STUDENTS = [
  {
    id: 1,
    name: "Ana María Gómez",
    email: "a.gomez@universidad.edu.co",
    score: 4.8,
    status: "Fortaleza",
    strengths: "Comprensión integral de NIST, Terraform HCL y arquitectura Stateless.",
    weaknesses: "Detalles menores en políticas IAM avanzadas.",
    recommendedRoute: "Avanzar hacia laboratorios avanzados de GitOps con ArgoCD e IaC."
  },
  {
    id: 2,
    name: "Carlos Eduardo Restrepo",
    email: "c.restrepo@universidad.edu.co",
    score: 2.4,
    status: "En Riesgo",
    strengths: "Identifica conceptos generales de IaaS.",
    weaknesses: "Confusión severa en Modelo de Responsabilidad Compartida, comandos Docker y cálculo de TCO.",
    recommendedRoute: "Completar lecturas obligatorias NIST SP 800-145, taller Docker Compose y simulador AWS Budgets."
  },
  {
    id: 3,
    name: "Diana Marcela Torres",
    email: "d.torres@universidad.edu.co",
    score: 3.8,
    status: "Aceptable",
    strengths: "Maneja bien Kubernetes básico y modelos de servicio PaaS.",
    weaknesses: "Dudas en selección de motores NoSQL y matices entre Rehost y Replatform.",
    recommendedRoute: "Repasar la matriz NoSQL de la Unidad II y la Guía de las 6 R's de la Unidad IV."
  },
  {
    id: 4,
    name: "Esteban Ramírez",
    email: "e.ramirez@universidad.edu.co",
    score: 4.6,
    status: "Fortaleza",
    strengths: "Excelente desempeño en Terraform, Docker Multi-stage y K8s Deployments.",
    weaknesses: "Diferenciación de latencias en Fog vs Edge Computing.",
    recommendedRoute: "Liderar proyecto integrador Multicloud y apoyar a compañeros en riesgo."
  },
  {
    id: 5,
    name: "Felipe Hurtado",
    email: "f.hurtado@universidad.edu.co",
    score: 2.2,
    status: "En Riesgo",
    strengths: "Interés en interfaces gráficas de nube.",
    weaknesses: "Fallas críticas en conceptos base NIST, comandos terraform y sintaxis YAML.",
    recommendedRoute: "Ruta de nivelación obligatoria: Repaso de Semana 1 a 6 y tutorías con CloudTutor AI."
  },
  {
    id: 6,
    name: "Gabriela Ospina",
    email: "g.ospina@universidad.edu.co",
    score: 4.2,
    status: "Fortaleza",
    strengths: "Solida base en arquitectura Híbrida y bases de datos NoSQL documentales.",
    weaknesses: "Cálculos de presupuesto en AWS Pricing Calculator.",
    recommendedRoute: "Realizar laboratorio práctico de cálculo TCO en la Unidad III."
  },
  {
    id: 7,
    name: "Hector Fabio Morales",
    email: "h.morales@universidad.edu.co",
    score: 3.4,
    status: "Aceptable",
    strengths: "Buen manejo de Dockerfile y balanceadores ALB.",
    weaknesses: "Vacíos en OpenStack y estrategias Anti Vendor Lock-in.",
    recommendedRoute: "Lectura de la guía de OpenStack Horizon y arquitectura agnóstica de contenedores."
  },
  {
    id: 8,
    name: "Isabel Cristina Vargas",
    email: "i.vargas@universidad.edu.co",
    score: 4.9,
    status: "Fortaleza",
    strengths: "Dominio perfecto en todas las autoevaluaciones e IaC.",
    weaknesses: "Ninguna identificada.",
    recommendedRoute: "Diseñar patrones de resiliencia multicloud con Google Anthos."
  },
  {
    id: 9,
    name: "Juan David Mendoza",
    email: "j.mendoza@universidad.edu.co",
    score: 2.6,
    status: "En Riesgo",
    strengths: "Familiarizado con Linux CLI.",
    weaknesses: "Confunde PaaS con SaaS y desconoce la diferencia entre RollingUpdate y Recreate en K8s.",
    recommendedRoute: "Repaso interactivo de Autoevaluación I y III con retroalimentación paso a paso."
  },
  {
    id: 10,
    name: "Karen Tatiana Silva",
    email: "k.silva@universidad.edu.co",
    score: 3.6,
    status: "Aceptable",
    strengths: "Comprensión de Capex a Opex y modelo serverless.",
    weaknesses: "Comandos de Docker Compose y persitencia Stateless.",
    recommendedRoute: "Ejecutar el simulador interactivo de Docker Compose de la Unidad II."
  },
  {
    id: 11,
    name: "Luis Fernando Castro",
    email: "l.castro@universidad.edu.co",
    score: 4.4,
    status: "Fortaleza",
    strengths: "Gran habilidad en orquestación EKS y balanceo Capa 7.",
    weaknesses: "Detalles menores en Edge Computing autónomo.",
    recommendedRoute: "Desarrollar el caso de uso SmartMining de la Unidad IV."
  },
  {
    id: 12,
    name: "Monica Patricia Buitrago",
    email: "m.buitrago@universidad.edu.co",
    score: 2.5,
    status: "En Riesgo",
    strengths: "Uso intuitivo de la consola web.",
    weaknesses: "Incapacidad para identificar responsabilidades en IaaS y sintaxis de Terraform.",
    recommendedRoute: "Guía práctica autoguiada Semana 1 a 4 + Asistencia obligatoria a laboratorio."
  },
  {
    id: 13,
    name: "Nicolas Arango",
    email: "n.arango@universidad.edu.co",
    score: 4.5,
    status: "Fortaleza",
    strengths: "Fuerte pensamiento sistémico, diseño de VPC y migración 6 R's.",
    weaknesses: "Uso de Redis en clúster.",
    recommendedRoute: "Avanzar a optimización de costos en arquitecturas serverless."
  },
  {
    id: 14,
    name: "Olga Lucía Rios",
    email: "o.rios@universidad.edu.co",
    score: 3.5,
    status: "Aceptable",
    strengths: "Manejo claro de SaaS y AWS Free Tier.",
    weaknesses: "Comprensión de OpenStack y redes SDN.",
    recommendedRoute: "Revisar arquitectura de OpenStack Nova y Neutron en la Unidad III."
  },
  {
    id: 15,
    name: "Pablo Andrés Jaramillo",
    email: "p.jaramillo@universidad.edu.co",
    score: 4.7,
    status: "Fortaleza",
    strengths: "Dominio de Docker, Kubernetes, Terraform y Edge Computing.",
    weaknesses: "Ninguna sustancial.",
    recommendedRoute: "Prepararse para certificación AWS Certified Cloud Practitioner / Solutions Architect."
  }
];

const COURSE_UNITS = [
  {
    id: 1,
    number: "Unidad I",
    title: "Introducción a la Computación en la Nube",
    shortTitle: "Fundamentos & Modelos Cloud",
    description: "Estudio profundo de las 5 características esenciales del estándar NIST SP 800-145, modelos de servicio (IaaS, PaaS, SaaS), modelos de despliegue, finanzas cloud (Capex a Opex) y la matriz de Responsabilidad Compartida.",
    weeksRange: "Semanas 1 - 4",
    weeks: [
      {
        weekNumber: 1,
        title: "Fundamentos, Historia y Arquitectura de la Nube (NIST SP 800-145)",
        objective: "Comprender las 5 características esenciales de la nube y evaluar la viabilidad de adopción tecnológica.",
        businessCase: {
          company: "RetailCo Colombia",
          problem: "Sufre caídas catastróficas de servidores físicos locales durante picos impredecibles de ventas (Black Friday / CyberMonday) debido a la rigidez de su hardware On-Premises.",
          solution: "Migración estratégica a la nube pública aprovechando Rapid Elasticity y Resource Pooling para escalar de 2 a 50 instancias dinámicamente y pagar solo por el tiempo de uso."
        },
        theoreticalContent: [
          {
            sectionTitle: "1.1 Las 5 Características Esenciales según NIST SP 800-145",
            body: "El Instituto Nacional de Estándares y Tecnología (NIST) define la computación en la nube como un modelo para habilitar acceso en red bajo demanda a un conjunto compartido de recursos de cómputo configurables. Las 5 características obligatorias son:",
            table: {
              headers: ["Característica NIST", "Explicación Técnica", "Ejemplo Empresarial Real"],
              rows: [
                ["Autoservicio a Demanda", "El usuario aprovisiona cómputo/almacenamiento mediante API/CLI sin intervención humana del proveedor.", "Lanzar una instancia EC2 o VM en 2 minutos desde AWS CLI."],
                ["Acceso Amplio a la Red", "Servicios disponibles a través de protocolos estándar (HTTPS, SSH) desde cualquier dispositivo.", "Acceso seguro al ERP de la empresa mediante navegador web desde cualquier lugar."],
                ["Resource Pooling", "Recursos físicos compartidos dinámicamente mediante multitenancy (multi-inquilino) con aislamiento lógico.", "Varias empresas comparten el mismo servidor físico manteniendo sus datos cifrados y separados."],
                ["Rápida Elasticidad", "Capacidad de escalar vertical u horizontalmente de forma automática en tiempo real.", "Auto Scaling duplica instancias web durante el CyberMonday a la medianoche."],
                ["Servicio Medido", "Control y transparencia basada en consumo exacto (Pay-as-you-go).", "Facturación detallada por gigabytes transferidos y horas exactas de vCPU consumidas."]
              ]
            }
          },
          {
            sectionTitle: "1.2 Transformación Financiera: Capex a Opex",
            body: "Las empresas tradicionales incurren en **Capex (Capital Expenditure)**: inversiones iniciales masivas e irreversibles en servidores, UPS, aires acondicionados y espacio físico depreciados a 3-5 años. En la nube, este gasto se transforma en **Opex (Operational Expenditure)**: un costo operativo variable pagado mensualmente según el uso exacto, eliminando el riesgo de capacidad ociosa o sobreaprovisionamiento."
          }
        ],
        codeExamples: [
          {
            language: "bash",
            filename: "aws_cli_setup.sh",
            code: `# Instalación de AWS CLI v2 en Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configuración inicial con credenciales de usuario IAM
aws configure
# AWS Access Key ID: AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name: us-east-1
# Default output format: json

# Verificar presupuesto activo
aws budgets describe-budgets --account-id 123456789012`,
            description: "Instalación y verificación de entorno de línea de comandos AWS CLI v2."
          }
        ],
        keyTakeaways: [
          "La nube no es solo 'el servidor de alguien más', es la automatización elástica de infraestructura mediante software.",
          "Capex implica compra de hardware fijo; Opex implica suscripción variable bajo demanda.",
          "AWS Budgets es la primera herramienta técnica a configurar para evitar sorpresas financieras."
        ]
      },
      {
        weekNumber: 2,
        title: "Modelo de Servicio IaaS (Infrastructure as a Service)",
        objective: "Desplegar y administrar servidores virtuales, redes privadas virtuales (VPC) y almacenamiento elástico con seguridad por capas.",
        businessCase: {
          company: "Fintech Security App",
          problem: "Requiere procesar microcréditos bancarios con aislamiento total de red y reglas de firewall criptográficas estrictas.",
          solution: "Implementación de una VPC personalizada en IaaS con subredes públicas para balanceadores y subredes privadas para servidores de procesamiento y base de datos sin exposición directa a Internet."
        },
        theoreticalContent: [
          {
            sectionTitle: "2.1 Fronteras y Control en IaaS",
            body: "En IaaS (Infrastructure as a Service), el proveedor entrega el hardware físico, hipervisores, almacenamiento y cableado de red. El cliente mantiene el control total desde el Sistema Operativo (Linux/Windows), instalación de parches, middlewares, motores de base de datos hasta el código de la aplicación y las reglas de red (Security Groups / NACLs)."
          }
        ],
        codeExamples: [
          {
            language: "bash",
            filename: "ec2_user_data.sh",
            code: `#!/bin/bash
# Script BASH de inicialización (User Data) para EC2 Ubuntu
apt-get update -y
apt-get install -y nginx curl git

# Configurar página de bienvenida
echo "<h1>Fintech Security - Nodo Activo IaaS AWS</h1>" > /var/www/html/index.html
systemctl restart nginx
systemctl enable nginx`,
            description: "Script de arranque automático para la provisión de servidores web en IaaS."
          }
        ],
        keyTakeaways: [
          "En IaaS tienes control total del SO, lo que otorga flexibilidad máxima pero requiere mantener parches de seguridad.",
          "Las subredes privadas no deben asignar direcciones IP públicas directas por motivos de seguridad."
        ]
      },
      {
        weekNumber: 3,
        title: "Modelos PaaS (Platform as a Service) y SaaS (Software as a Service)",
        objective: "Diferenciar la responsabilidad administrada en PaaS y SaaS frente a IaaS mediante la analogía 'Pizza as a Service'.",
        businessCase: {
          company: "EduVirtual SaaS",
          problem: "Desea lanzar una plataforma educativa sin dedicar ingenieros a administrar parches de Linux, servidores Nginx ni actualizaciones de runtime Python.",
          solution: "Despliegue directo en AWS Elastic Beanstalk / Google App Engine (PaaS), concentrándose exclusivamente en el código fuente del sistema."
        },
        theoreticalContent: [
          {
            sectionTitle: "3.1 Regla Memotécnica: 'Pizza as a Service'",
            body: "Para comprender visualmente la división de responsabilidades:",
            table: {
              headers: ["Modelo", "Analogía Pizza", "Responsabilidad del Cliente", "Responsabilidad del Proveedor"],
              rows: [
                ["On-Premises", "Pizza hecha en casa desde cero", "Masa, ingredientes, horno, gas, mesa, bebidas y limpieza.", "Ninguna (todo lo haces tú)."],
                ["IaaS", "Cocina equipada en alquiler", "Masa, ingredientes, cocción y bebidas.", "Lugar físico, horno y suministro eléctrico."],
                ["PaaS", "Pizza horneada a domicilio", "Bebidas y poner la mesa.", "Masa, ingredientes, horneado y empaque."],
                ["SaaS", "Comer en restaurante de pizzas", "Solo pedir, comer y pagar la cuenta.", "Absolutamente todo el servicio e instalaciones."]
              ]
            }
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "PaaS acelera el tiempo de mercado (Time-to-Market) al eliminar la gestión del SO.",
          "SaaS entrega software terminado consumible vía web o API."
        ]
      },
      {
        weekNumber: 4,
        title: "Modelos de Despliegue y Evaluación de Unidad I",
        objective: "Seleccionar el modelo de despliegue óptimo según regulaciones de protección de datos (Habeas Data, GDPR).",
        businessCase: {
          company: "Banco IPSAL",
          problem: "Por regulación gubernamental estricta, la base de datos de saldos debe residir en su propio Data Center, pero desea usar IA en nube pública para fraudes.",
          solution: "Arquitectura de Nube Híbrida mediante enlace privado dedicado AWS Direct Connect / VPN Site-to-Site."
        },
        theoreticalContent: [
          {
            sectionTitle: "4.1 Los 4 Modelos de Despliegue Cloud",
            body: "1. **Nube Pública**: Multitenant, propiedad de un hyperscaler (AWS, Azure, GCP). Alta escalabilidad a bajo costo.\n2. **Nube Privada**: Single-tenant, dedicada exclusivamente a una organización. Control absoluto y cumplimiento regulatorio estricto.\n3. **Nube Híbrida**: Combinación integrada de entorno local/privado con nube pública mediante conexiones cifradas.\n4. **Nube Comunitaria**: Compartida por varias organizaciones con objetivos comunes (ej. hospitales, sector bancario regional)."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "La Nube Híbrida es el estándar predominante en la banca y sector salud debido a exigencias regulatorias.",
          "El Modelo de Responsabilidad Compartida determina que la seguridad 'EN' la nube es del cliente y 'DE' la nube es del proveedor."
        ]
      }
    ],
    quiz: [
      {
        id: 101,
        categoryTag: "Caso Negocio - NIST",
        question: "Una startup de e-commerce experimenta un pico de tráfico imprevisto debido a una campaña viral. Sus servidores físicos colapsan por falta de memoria RAM y CPU. ¿Qué característica esencial de la nube según la recomendación NIST resuelve de raíz esta problemática?",
        options: [
          "Broad Network Access",
          "Rapid Elasticity (Elasticidad Rápida)",
          "Resource Pooling",
          "On-demand Self-service"
        ],
        correctAnswerIndex: 1,
        explanation: "La elasticidad rápida permite escalar recursos (CPU/RAM/instancias) automáticamente hacia arriba o abajo en tiempo real según la demanda instantánea de tráfico."
      },
      {
        id: 102,
        categoryTag: "Arquitectura de Servicios",
        question: "Una entidad de salud requiere desplegar un sistema que procese recetas médicas. El equipo no desea administrar el sistema operativo ni los parches de seguridad del servidor web, pero necesita mantener control sobre el código ejecutable y la versión de su runtime en Python. ¿Cuál es el modelo de servicio adecuado?",
        options: [
          "IaaS (Infrastructure as a Service)",
          "SaaS (Software as a Service)",
          "PaaS (Platform as a Service)",
          "On-Premises Bare-Metal"
        ],
        correctAnswerIndex: 2,
        explanation: "PaaS (ej. AWS Elastic Beanstalk o Google App Engine) abstrae la gestión del sistema operativo y servidores web, permitiendo al desarrollador enfocarse exclusivamente en el código."
      },
      {
        id: 103,
        categoryTag: "Finanzas Cloud",
        question: "Una empresa tradicional invierte $50,000 USD en la compra de servidores físicos que proyecta depreciar a 5 años. Al migrar a la nube pública de AWS, esta forma de gasto se transforma en:",
        options: [
          "Un incremento del Capex (Capital Expenditure)",
          "Una transición de Capex a Opex (Operational Expenditure) basado en pago por uso",
          "Un gasto fijo de mantenimiento inalterable",
          "Un costo indirecto de licenciamiento SaaS"
        ],
        correctAnswerIndex: 1,
        explanation: "La nube transforma gastos de capital fijos (Capex) en gastos operativos variables (Opex), pagando únicamente por los recursos consumidos."
      },
      {
        id: 104,
        categoryTag: "Seguridad Cloud",
        question: "Según el Modelo de Responsabilidad Compartida en IaaS (AWS/Azure), ¿cuál de las siguientes tareas es responsabilidad EXCLUSIVA del cliente?",
        options: [
          "Mantenimiento físico del hardware del centro de datos",
          "Actualización del hipervisor de virtualización",
          "Configuración de parches del sistema operativo invitado y reglas del Security Group",
          "Seguridad ambiental y de acceso físico a las instalaciones"
        ],
        correctAnswerIndex: 2,
        explanation: "En IaaS, el proveedor gestiona la infraestructura física e hipervisor ('Security OF the cloud'), mientras el cliente administra el sistema operativo, datos y firewall ('Security IN the cloud')."
      },
      {
        id: 105,
        categoryTag: "Modelos de Despliegue",
        question: "Un banco debe mantener la base de datos de saldos en su propio Data Center por regulación gubernamental, pero desea utilizar servicios de Inteligencia Artificial en la nube pública para detección de fraudes. ¿Qué modelo de despliegue aplica?",
        options: [
          "Nube Privada Exclusiva",
          "Nube Híbrida",
          "Nube Comunitaria",
          "Nube Pública Multitenant"
        ],
        correctAnswerIndex: 1,
        explanation: "La Nube Híbrida combina la infraestructura privada local con la nube pública mediante una conexión segura (VPN/Direct Connect)."
      }
    ],
    diagnosticMatrix: [
      {
        level: "Excelente",
        scoreRange: "5 / 5",
        diagnosis: "Comprensión sólida de conceptos base, modelos de servicio y responsabilidad compartida.",
        recommendedRoute: [
          "Avanzar hacia el desarrollo de laboratorios prácticos de Terraform e Infraestructura como Código.",
          "Explorar el simulador de comandos AWS CLI."
        ]
      },
      {
        level: "Aceptable",
        scoreRange: "3 - 4 / 5",
        diagnosis: "Dificultad menor para diferenciar fronteras exactas entre PaaS e IaaS o modelos financieros.",
        recommendedRoute: [
          "Repasar la sección 1.2 del Material de Estudio (Tabla Pizza as a Service).",
          "Realizar el laboratorio de configuración de presupuestos en AWS Budgets."
        ]
      },
      {
        level: "En Riesgo",
        scoreRange: "< 3 / 5",
        diagnosis: "Vacíos en las características NIST y confusión en el Modelo de Responsabilidad Compartida.",
        recommendedRoute: [
          "Actividad Obligatoria 1: Lectura de la especificación NIST SP 800-145.",
          "Actividad Obligatoria 2: Ver el video interactivo 'AWS Shared Responsibility Model Deep Dive'.",
          "Actividad Obligatoria 3: Completar la Guía Práctica 1.3 de creación de cuenta y usuarios IAM."
        ],
        mandatoryActivities: [
          "Lectura NIST SP 800-145",
          "Video AWS Shared Responsibility",
          "Laboratorio IAM & Alerta Budgets"
        ]
      }
    ],
    labSimulations: [
      {
        id: "lab-aws-cli",
        title: "Simulador AWS CLI & Presupuestos",
        description: "Practica comandos de creación de presupuestos e inspección de usuarios IAM en la consola virtual de AWS CLI.",
        type: "aws_cli",
        defaultCode: `# Configura tu alerta de presupuesto en AWS
aws budgets create-budget \\
    --account-id 123456789012 \\
    --budget '{
        "BudgetName": "Alerta-Estudiante-ACN01",
        "BudgetLimit": { "Amount": "5.0", "Unit": "USD" },
        "TimeUnit": "MONTHLY",
        "BudgetType": "COST"
    }'`,
        instructions: "Haz clic en 'Simular Ejecución' para verificar que la sintaxis BASH del comando AWS CLI sea correcta.",
        solutionHint: "Asegúrate de especificar Amount: 5.0 y TimeUnit: MONTHLY."
      }
    ]
  },
  {
    id: 2,
    number: "Unidad II",
    title: "Tecnologías Asociadas a la Computación en la Nube",
    shortTitle: "Contenedores, Balanceo & NoSQL",
    description: "Virtualización ligera con Docker, Docker Compose, estrategias de balanceo de carga (ALB), arquitectura Stateless y motores de bases de datos NoSQL (MongoDB, Redis, Cassandra, Neo4j).",
    weeksRange: "Semanas 5 - 8",
    weeks: [
      {
        weekNumber: 5,
        title: "Ingeniería Web y Arquitecturas de Microservicios",
        objective: "Descomponer una aplicación monolítica tradicional en microservicios desacoplados y escalables.",
        businessCase: {
          company: "CineTickets",
          problem: "El sistema monolítico colapsa durante el estreno de películas taquilleras porque el proceso de envío de emails bloquea las compras.",
          solution: "Desacoplar el módulo de procesamiento de pagos del envío de confirmaciones usando colas de mensajes asíncronas AWS SQS."
        },
        theoreticalContent: [
          {
            sectionTitle: "5.1 Monolito vs Microservicios",
            body: "Un monolito empaqueta toda la lógica de negocio en una única unidad ejecutable. Un fallo en un módulo detiene toda la aplicación. Los microservicios dividen el sistema en componentes independientes con despliegue y escalado individual comunicados por API REST o eventos."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "Los microservicios permiten que diferentes equipos desplieguen código sin interferirse.",
          "El uso de colas de mensajes (SQS, RabbitMQ) absorbe picos de carga sin perder transacciones."
        ]
      },
      {
        weekNumber: 6,
        title: "Virtualización y Contenedores con Docker",
        objective: "Empaquetar aplicaciones en contenedores Docker garantizando portabilidad entre desarrollo y producción.",
        businessCase: {
          company: "LogísticaExpress",
          problem: "Sufre constantes errores en producción debido a discrepancias entre el entorno del desarrollador ('en mi máquina funciona') y el servidor Linux de producción.",
          solution: "Empaquetamiento en contenedores Docker compartiendo la misma imagen immutable en todos los entornos."
        },
        theoreticalContent: [
          {
            sectionTitle: "6.1 Contenedor vs Máquina Virtual",
            body: "Una VM emula un hardware completo e incluye un sistema operativo invitado (Guest OS) sobre un hipervisor. Un contenedor comparte el kernel del sistema operativo del anfitrión (Host OS), logrando arrancar en milisegundos y consumiendo una fracción reducida de memoria RAM."
          }
        ],
        codeExamples: [
          {
            language: "dockerfile",
            filename: "Dockerfile",
            code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]`,
            description: "Dockerfile optimizado de producción en múltiples etapas con usuario no privilegiado."
          },
          {
            language: "yaml",
            filename: "docker-compose.yml",
            code: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:3000"
    environment:
      - MONGO_URI=mongodb://db:27017/empresa_db
    depends_on:
      - db
  db:
    image: mongo:6.0
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:`,
            description: "Orquestación multi-contenedor local para Node.js y MongoDB con volumen persistente."
          }
        ],
        keyTakeaways: [
          "Los contenedores comparten el kernel del host, haciéndolos ligeros y portables.",
          "docker-compose.yml define y ejecuta múltiples contenedores vinculados en una red privada virtual."
        ]
      },
      {
        weekNumber: 7,
        title: "Equilibrado de Carga (Load Balancing) y Auto-scaling",
        objective: "Implementar alta disponibilidad y tolerancia a fallos mediante balanceadores de carga Capa 7 y arquitecturas Stateless.",
        businessCase: {
          company: "TravelFly",
          problem: "Experimenta un aumento del 500% en visitas durante promociones relámpago de pasajes aéreos.",
          solution: "Despliegue de un Application Load Balancer (ALB) acoplado a un grupo de Auto Scaling que añade instancias automáticamente cuando el uso de CPU supera el 70%."
        },
        theoreticalContent: [
          {
            sectionTitle: "7.1 Requisito Crítico: Arquitectura Stateless",
            body: "Para que el Auto Scaling agregue o destruya instancias sin desconectar usuarios, las aplicaciones deben ser **Stateless (Sin Estado)**. La sesión del usuario no se guarda en el disco ni memoria del servidor local, sino en un clúster de caché en memoria distribuido como Redis o Memcached."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "ALB opera en Capa 7 (HTTP/HTTPS) y soporta Sticky Sessions para mantener la afinidad de sesión si no hay Redis.",
          "Las arquitecturas Stateless son indispensables para el escalado elástico transparente."
        ]
      },
      {
        weekNumber: 8,
        title: "Bases de Datos No Relacionales (NoSQL) y Evaluación de Unidad II",
        objective: "Seleccionar el motor NoSQL adecuado según la estructura y flexibilidad requerida por los datos.",
        businessCase: {
          company: "SocialMedia Stream",
          problem: "Necesita guardar atributos heterogéneos y cambiantes de catálogos e interacciones de usuarios sin alterar esquemas rígidos SQL.",
          solution: "Adoptar MongoDB para documentos dinámicos JSON/BSON y Redis para listas de tendencias en tiempo real."
        },
        theoreticalContent: [
          {
            sectionTitle: "8.1 Matriz Comparativa NoSQL",
            body: "Principales categorías de bases de datos NoSQL:",
            table: {
              headers: ["Tipo NoSQL", "Motor Representativo", "Caso de Uso Ideal"],
              rows: [
                ["Documental", "MongoDB, Amazon DocumentDB", "Catálogos heterogéneos de e-commerce, gestión de contenido (CMS)."],
                ["Clave-Valor", "Redis, Amazon DynamoDB", "Sesiones de usuario, carritos de compras, marcadores en tiempo real."],
                ["Columnar", "Apache Cassandra, Google Bigtable", "Telemetría de sensores IoT, analítica de Big Data con escritura masiva."],
                ["Grafos", "Neo4j, Amazon Neptune", "Redes sociales, motores de recomendación, detección de fraudes bancarios."]
              ]
            }
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "NoSQL sacrifica esquemas rígidos ACID en favor de escalabilidad horizontal y flexibilidad de datos.",
          "Cada tipo NoSQL resuelve un problema arquitectónico específico."
        ]
      }
    ],
    quiz: [
      {
        id: 201,
        categoryTag: "Virtualización",
        question: "¿Cuál es la ventaja fundamental de un contenedor Docker frente a una Máquina Virtual tradicional alojada en un hipervisor Tipo 2?",
        options: [
          "El contenedor emula un hardware completo incluyendo BIOS virtual.",
          "El contenedor comparte el kernel del SO anfitrión, reduciendo drásticamente el consumo de recursos y tiempo de arranque.",
          "Los contenedores solo ejecutan código binario compilado en C++.",
          "El contenedor no requiere aislamiento de red de ningún tipo."
        ],
        correctAnswerIndex: 1,
        explanation: "Los contenedores comparten el kernel del sistema operativo del host, lo que permite un arranque en milisegundos y menor huella de memoria en comparación con las VMs."
      },
      {
        id: 202,
        categoryTag: "Load Balancing",
        question: "Un Application Load Balancer (ALB) recibe peticiones HTTP y las distribuye. Para evitar perder la sesión de un usuario cuya aplicación guarda variables en memoria local sin Redis, ¿qué función se debe activar?",
        options: [
          "DNS Round-Robin",
          "Sticky Sessions (Sesiones Pegajosas / Afinidad de Sesión)",
          "Cross-Zone Load Balancing",
          "Health Checks con código de estado HTTP 500"
        ],
        correctAnswerIndex: 1,
        explanation: "Sticky Sessions (afinidad de sesión) asegura que el balanceador envíe las solicitudes subsiguientes del mismo usuario a la misma instancia backend mediante cookies."
      },
      {
        id: 203,
        categoryTag: "Bases de Datos NoSQL",
        question: "Se requiere diseñar el módulo de catálogo de un e-commerce donde cada categoría de producto tiene atributos heterogéneos y dinámicos (ej. televisores tienen pulgadas, zapatos tienen talla). ¿Qué motor de base de datos es el más idóneo?",
        options: [
          "Base de Datos Relacional SQL con esquemas rígidos (PostgreSQL)",
          "Base de Datos Documental NoSQL (MongoDB / Amazon DocumentDB)",
          "Motor de búsqueda en memoria Redis en modo clúster",
          "Base de Datos Columnar Apache Cassandra"
        ],
        correctAnswerIndex: 1,
        explanation: "Las bases de datos documentales NoSQL (JSON/BSON) permiten modelos de datos flexibles y dinámicos sin requerir alterar un esquema de tabla rígido."
      },
      {
        id: 204,
        categoryTag: "Arquitectura Stateless",
        question: "Para que un grupo de Auto Scaling cree o elimine instancias automáticamente sin afectar la experiencia del usuario, la arquitectura de software debe ser:",
        options: [
          "Stateful (Con estado guardado en el disco local de cada servidor)",
          "Stateless (Sin estado, delegando la persistencia a bases de datos y cachés externas)",
          "Monolítica acoplada a un servidor único",
          "Ejecutada exclusivamente bajo el protocolo FTP"
        ],
        correctAnswerIndex: 1,
        explanation: "Una arquitectura Stateless permite reemplazar o escalar instancias dinámicamente sin perder la información del usuario en tránsito."
      },
      {
        id: 205,
        categoryTag: "Docker Compose",
        question: "¿Cuál es la función principal del comando `docker-compose up -d` en un entorno de desarrollo?",
        options: [
          "Eliminar todos los contenedores y volúmenes del sistema.",
          "Construir, crear e iniciar en segundo plano todos los servicios definidos en el archivo `docker-compose.yml`.",
          "Compilar el kernel del sistema operativo cliente.",
          "Subir las imágenes compiladas directamente a Docker Hub."
        ],
        correctAnswerIndex: 1,
        explanation: "`docker-compose up -d` despliega y ejecuta toda la pila de contenedores (App, DB, Cache) en segundo plano (detached mode)."
      }
    ],
    diagnosticMatrix: [
      {
        level: "Excelente",
        scoreRange: "5 / 5",
        diagnosis: "Dominio práctico de virtualización liviana, patrones de alta disponibilidad y NoSQL.",
        recommendedRoute: [
          "Avanzar hacia la orquestación avanzada de contenedores con Kubernetes en la Unidad III."
        ]
      },
      {
        level: "Aceptable",
        scoreRange: "3 - 4 / 5",
        diagnosis: "Comprensión parcial de la diferencia entre arquitecturas Stateless vs Stateful.",
        recommendedRoute: [
          "Revisar la Guía 2.2 del Material de Estudio sobre balanceo de carga y aislamiento de sesiones con Redis."
        ]
      },
      {
        level: "En Riesgo",
        scoreRange: "< 3 / 5",
        diagnosis: "Dificultad con comandos de Docker y selección de motores de bases de datos NoSQL.",
        recommendedRoute: [
          "Ejecutar el taller paso a paso: Dockerizar una app Node.js + MongoDB con Docker Compose.",
          "Completar el laboratorio interactivo en Katacoda / Play with Docker.",
          "Estudiar el mapa comparativo de NoSQL del Material de Estudio."
        ],
        mandatoryActivities: [
          "Taller Docker & MongoDB",
          "Laboratorio Play with Docker",
          "Guía Comparativa NoSQL"
        ]
      }
    ],
    labSimulations: [
      {
        id: "lab-docker-compose",
        title: "Simulador Docker & Compose",
        description: "Edita y prueba la sintaxis YAML de docker-compose.yml para levantar la aplicación Node.js y MongoDB.",
        type: "docker",
        defaultCode: `version: '3.8'
services:
  app_web:
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
      - "27017:27017"`,
        instructions: "Modifica o valida los puertos de mapeo y ejecuta 'Simular docker-compose up -d'.",
        solutionHint: "Asegúrate de que depends_on coincida con el nombre del servicio de la BD."
      }
    ]
  },
  {
    id: 3,
    number: "Unidad III",
    title: "Platform-as-a-Service (PaaS) e Infrastructure-as-a-Service (IaaS)",
    shortTitle: "Terraform IaC & Kubernetes",
    description: "Infraestructura como Código (IaC) con HashiCorp Terraform (HCL), orquestación de contenedores con Kubernetes (Pods, Deployments, Services), OpenStack para nubes privadas y análisis de TCO.",
    weeksRange: "Semanas 9 - 12",
    weeks: [
      {
        weekNumber: 9,
        title: "Proveedores Principales (AWS, Azure, GCP) y Criterios de Selección",
        objective: "Comparar y evaluar técnicamente la oferta de los 3 grandes hyperscalers y calcular el TCO.",
        businessCase: {
          company: "AgroTech Latinoamérica",
          problem: "Debe seleccionar la nube más costo-eficiente para procesar datos de sensores agrícolas en tiempo real.",
          solution: "Evaluación financiera mediante calculadoras de TCO determinando un ahorro del 35% al utilizar instancias reservadas en AWS frente a servidores On-Premises."
        },
        theoreticalContent: [
          {
            sectionTitle: "9.1 Equivalencia de Servicios Hyperscalers",
            body: "Tabla de equivalencia directa entre AWS, Microsoft Azure y Google Cloud Platform:",
            table: {
              headers: ["Categoría", "AWS", "Microsoft Azure", "Google Cloud (GCP)"],
              rows: [
                ["Cómputo IaaS", "Amazon EC2", "Azure Virtual Machines", "GCP Compute Engine"],
                ["Almacenamiento Objetos", "Amazon S3", "Azure Blob Storage", "GCP Cloud Storage"],
                ["Kubernetes Administrado", "Amazon EKS", "Azure AKS", "Google GKE"],
                ["Base de Datos Relacional", "Amazon RDS", "Azure SQL Database", "GCP Cloud SQL"]
              ]
            }
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "El análisis de TCO contempla energía, espacio, enfriamiento y personal especializado además del servidor físico.",
          "Los 3 grandes proveedores ofrecen arquitecturas e interfaces conceptuales equivalentes."
        ]
      },
      {
        weekNumber: 10,
        title: "Infraestructura como Código (IaC) con Terraform",
        objective: "Automatizar el aprovisionamiento y ciclo de vida de la infraestructura cloud usando código declarativo en HCL.",
        businessCase: {
          company: "DevOps Studio",
          problem: "El equipo pierde días creando servidores y VPCs manualmente por consola web con errores de configuración.",
          solution: "Implementación de HashiCorp Terraform con versionamiento en Git para desplegar entornos idénticos en minutos con `terraform apply`."
        },
        theoreticalContent: [
          {
            sectionTitle: "10.1 Ciclo de Vida en Terraform",
            body: "1. `terraform init`: Inicializa los plugins de los proveedores (AWS/Azure/GCP).\n2. `terraform plan`: Genera una vista previa comparando el código HCL con el archivo de estado (`terraform.tfstate`). NO realiza cobros ni cambios reales.\n3. `terraform apply`: Ejecuta los cambios reales en la infraestructura cloud.\n4. `terraform destroy`: Elimina todos los recursos gestionados."
          }
        ],
        codeExamples: [
          {
            language: "hcl",
            filename: "main.tf",
            code: `provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "vpc_principal" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "VPC-Produccion" }
}

resource "aws_subnet" "subnet_publica" {
  vpc_id                  = aws_vpc.vpc_principal.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
}

resource "aws_instance" "servidor_web" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.subnet_publica.id
  tags          = { Name = "WebServer-Terraform" }
}`,
            description: "Código HCL declarativo para aprovisionar VPC, Subred e Instancia EC2 en AWS."
          }
        ],
        keyTakeaways: [
          "Terraform es agnóstico a la nube y usa lenguaje declarativo HCL.",
          "terraform plan permite auditar los cambios antes de desplegar en producción."
        ]
      },
      {
        weekNumber: 11,
        title: "Nubes Open Source y Administración con OpenStack",
        objective: "Comprender la arquitectura de una nube privada sobre infraestructura propia usando software libre.",
        businessCase: {
          company: "Centro de Investigación Universitaria",
          problem: "Necesita montar una nube privada interna en su propio Data Center para laboratorios sin incurrir en costos de licencias comerciales.",
          solution: "Despliegue de la suite OpenStack sobre servidores Linux autogestionados."
        },
        theoreticalContent: [
          {
            sectionTitle: "11.1 Componentes Principales de OpenStack",
            body: "- **Nova**: Módulo central encargado del aprovisionamiento y gestión de cómputo y máquinas virtuales.\n- **Neutron**: Módulo de gestión de redes virtuales y direcciones IP.\n- **Swift / Cinder**: Almacenamiento de objetos y bloques.\n- **Horizon**: Panel gráfico de administración web."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "OpenStack es el estándar de código abierto para construir nubes privadas de grado empresarial.",
          "Nova gestiona el ciclo de vida de las máquinas virtuales."
        ]
      },
      {
        weekNumber: 12,
        title: "Orquestación de Contenedores con Kubernetes y Evaluación de Unidad III",
        objective: "Aprovisionar y gestionar clústeres de contenedores a nivel empresarial garantizando actualización progresiva sin inactividad (RollingUpdate).",
        businessCase: {
          company: "Plataforma Fintech PayNow",
          problem: "Procesa millones de transacciones bancarias y requiere actualizar versiones de software sin detener el servicio ni un solo segundo.",
          solution: "Uso del objeto Deployment de Kubernetes con estrategia RollingUpdate por defecto."
        },
        theoreticalContent: [
          {
            sectionTitle: "12.1 Conceptos Fundamentales en Kubernetes",
            body: "- **Pod**: Unidad ejecutable más pequeña en Kubernetes; encapsula uno o más contenedores que comparten almacenamiento y red local.\n- **Deployment**: Objeto que gestiona el estado deseado de los pods y realiza actualizaciones **RollingUpdate** reemplazando pods viejos por nuevos de manera progresiva.\n- **Service**: Abstrae la red y proporciona una dirección IP o balanceador estable para acceder a los pods."
          }
        ],
        codeExamples: [
          {
            language: "yaml",
            filename: "deployment.yaml",
            code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-pagos-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-pagos
  template:
    metadata:
      labels:
        app: api-pagos
    spec:
      containers:
      - name: api-pagos
        image: miempresa/api-pagos:v2.1
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "500m"
            memory: "512Mi"
          requests:
            cpu: "250m"
            memory: "256Mi"`,
            description: "Manifiesto YAML de Kubernetes para un Deployment con 3 réplicas y límites de recursos."
          }
        ],
        keyTakeaways: [
          "Un Pod es la unidad básica de cómputo en K8s.",
          "RollingUpdate garantiza Zero Downtime durante despliegues de nuevas versiones."
        ]
      }
    ],
    quiz: [
      {
        id: 301,
        categoryTag: "Infraestructura como Código",
        question: "Al ejecutar el comando `terraform plan`, HashiCorp Terraform realiza la siguiente acción:",
        options: [
          "Aprovisiona y cobra de inmediato los recursos en la cuenta de AWS.",
          "Muestra una vista previa detallada de los cambios que se realizarán en la infraestructura comparando el código HCL con el archivo de estado (`terraform.tfstate`).",
          "Elimina todos los recursos existentes en la nube sin confirmación.",
          "Convierte el código HCL a lenguaje Java ejecutable."
        ],
        correctAnswerIndex: 1,
        explanation: "`terraform plan` es un comando de inspección segura que genera el plan de ejecución sin aplicar cambios reales en la infraestructura."
      },
      {
        id: 302,
        categoryTag: "Orquestación con Kubernetes",
        question: "¿Cuál es la unidad ejecutable más pequeña en Kubernetes que encapsula uno o más contenedores estrechamente acoplados?",
        options: [
          "Cluster Node",
          "Pod",
          "Namespace",
          "Ingress Controller"
        ],
        correctAnswerIndex: 1,
        explanation: "En K8s, un Pod es la unidad básica de despliegue que abarca uno o varios contenedores que comparten almacenamiento y red (localhost)."
      },
      {
        id: 303,
        categoryTag: "Kubernetes Deployment",
        question: "Si se requiere actualizar una aplicación en Kubernetes de la versión `v1` a la versión `v2` garantizando cero tiempo de inactividad (Zero Downtime), la estrategia por defecto del objeto Deployment es:",
        options: [
          "Recreate (Eliminar todos los pods v1 antes de crear v2)",
          "RollingUpdate (Actualización progresiva pod a pod)",
          "Blue-Green manual por consola",
          "Hard Restart del nodo físico"
        ],
        correctAnswerIndex: 1,
        explanation: "RollingUpdate reemplaza gradualmente los pods antiguos por nuevos pods sin interrumpir la disponibilidad del servicio."
      },
      {
        id: 304,
        categoryTag: "Calculadora de Costos Cloud",
        question: "¿Cuál es la métrica clave para justificar la migración económica de un centro de cómputo local hacia IaaS en la nube ante un Gerente Financiero?",
        options: [
          "Número total de líneas de código en Python",
          "Reducción del TCO (Total Cost of Ownership / Costo Total de Propiedad)",
          "Velocidad de reloj en GHz del procesador del cliente",
          "Cantidad de tarjetas gráficas instaladas en laptops de empleados"
        ],
        correctAnswerIndex: 1,
        explanation: "El análisis de TCO contempla no solo el costo de los servidores, sino energía, enfriamiento, espacio físico, mantenimiento y personal."
      },
      {
        id: 305,
        categoryTag: "Clouds Open Source",
        question: "En la arquitectura del proyecto OpenStack para nubes privadas, ¿cuál es el componente encargado de la gestión de cómputo y máquinas virtuales?",
        options: [
          "OpenStack Neutron",
          "OpenStack Swift",
          "OpenStack Nova",
          "OpenStack Horizon"
        ],
        correctAnswerIndex: 2,
        explanation: "OpenStack Nova es el módulo central responsable del aprovisionamiento y gestión del ciclo de vida de instancias de cómputo."
      }
    ],
    diagnosticMatrix: [
      {
        level: "Excelente",
        scoreRange: "5 / 5",
        diagnosis: "Alta competencia en automatización con Terraform y orquestación con Kubernetes.",
        recommendedRoute: [
          "Explorar patrones avanzados de GitOps con ArgoCD y FluxCD."
        ]
      },
      {
        level: "Aceptable",
        scoreRange: "3 - 4 / 5",
        diagnosis: "Dudas sobre la sintaxis HCL o manifiestos YAML de Kubernetes.",
        recommendedRoute: [
          "Revisar la guía de código de Terraform y Kubernetes de la sección 3.1 y 3.2 del Material de Estudio."
        ]
      },
      {
        level: "En Riesgo",
        scoreRange: "< 3 / 5",
        diagnosis: "Dificultad en conceptos de orquestación y cálculo de TCO.",
        recommendedRoute: [
          "Instalar Minikube localmente y desplegar la aplicación de ejemplo paso a paso.",
          "Completar el tutorial oficial: HashiCorp Terraform Get Started with AWS.",
          "Usar la calculadora de TCO de AWS para simular la migración de 10 servidores locales."
        ],
        mandatoryActivities: [
          "Instalación Minikube",
          "Tutorial HashiCorp AWS",
          "Simulación Calculadora TCO AWS"
        ]
      }
    ],
    labSimulations: [
      {
        id: "lab-terraform",
        title: "Simulador Terraform HCL",
        description: "Prueba y valida la estructura de un archivo main.tf ejecutando el comando simulado `terraform plan`.",
        type: "terraform",
        defaultCode: `provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "vpc_demo" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Environment = "ACN01-Lab"
  }
}

resource "aws_instance" "app_node" {
  ami           = "ami-0c7217cdde317cfec"
  instance_type = "t2.micro"
}`,
        instructions: "Presiona 'Simular terraform plan' para generar el informe declarativo de recursos.",
        solutionHint: "Verifica que las etiquetas y llaves de bloque estén cerradas adecuadamente."
      }
    ]
  },
  {
    id: 4,
    number: "Unidad IV",
    title: "Sistemas Multicloud y Fog/Edge Computing",
    shortTitle: "Multicloud, Edge & Migración 6 R's",
    description: "Arquitecturas distribuidas en el borde (Edge/Fog Computing), mitigación del riesgo de Vendor Lock-in mediante planos de control unificados y metodología de migración de las 6 R's.",
    weeksRange: "Semanas 13 - 16",
    weeks: [
      {
        weekNumber: 13,
        title: "La Nube vs. La Niebla (Fog Computing) y Edge Computing",
        objective: "Diseñar arquitecturas de cómputo distribuido en el borde de la red para aplicaciones de ultra baja latencia.",
        businessCase: {
          company: "SmartMining Corp",
          problem: "Maquinaria pesada autónoma en minas remotas requiere tomar decisiones de frenado de emergencia en menos de 2 milisegundos sin depender de satélites.",
          solution: "Despliegue de Edge Computing procesando telemetría directamente en las computadoras de a bordo de los vehículos."
        },
        theoreticalContent: [
          {
            sectionTitle: "13.1 Comparativa Latencia y Cómputo Distribuido",
            body: "- **Cloud Computing**: Centralizado en Data Centers masivos. Latencia: 50 - 200 ms. Ideal para analítica histórica y Big Data.\n- **Fog Computing**: Nodos intermedios regionales o gateways locales. Latencia: 10 - 50 ms. Ideal para agregación de sensores de una fábrica.\n- **Edge Computing**: Procesamiento ejecutado directamente en el dispositivo cliente o sensor IoT. Latencia: < 5 ms. Ideal para vehículos autónomos, robótica de precisión y dispositivos médicos."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "Edge Computing resuelve limitaciones de latencia crítica y ancho de banda en zonas sin conexión estable.",
          "A menor latencia exigida, más cerca debe procesarse la información del dispositivo cliente."
        ]
      },
      {
        weekNumber: 14,
        title: "El Problema del Vendor Lock-in y Estrategias Anti-Dependencia",
        objective: "Evaluar y reducir los riesgos de dependencia exclusiva de un único proveedor de nube mediante arquitecturas abiertas.",
        businessCase: {
          company: "SaaS HealthCare",
          problem: "Enfrenta aumentos inesperados del 40% en tarifas de su proveedor actual y no puede mover su software porque depende de APIs propietarias.",
          solution: "Re-arquitectura hacia contenedores Docker estandarizados sobre Kubernetes agnóstico y planos de control unificados como Google Anthos o HashiCorp Terraform."
        },
        theoreticalContent: [
          {
            sectionTitle: "14.1 Mitigación de Vendor Lock-in",
            body: "El acoplamiento a servicios propietarios de un único proveedor incrementa el riesgo financiero. El uso de contenedores e infraestructura como código agnóstica permite la portabilidad transparente de cargas de trabajo entre AWS, Azure y Google Cloud."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "El Vendor Lock-in se minimiza usando estándares abiertos y contenedores.",
          "Planos de control como Google Anthos y Azure Arc unifican la gestión Multicloud."
        ]
      },
      {
        weekNumber: 15,
        title: "Interoperabilidad, Portabilidad y Migración en la Nube (Metodología 6 R's)",
        objective: "Planificar y ejecutar la migración de sistemas empresariales heredados aplicando la matriz de decisión de las 6 R's.",
        businessCase: {
          company: "Aseguradora Nacional",
          problem: "Necesita modernizar un catálogo de 50 aplicaciones en servidores locales identificando cuáles mover, rediseñar o descartar.",
          solution: "Clasificación rigurosa mediante la metodología de las 6 R's de AWS."
        },
        theoreticalContent: [
          {
            sectionTitle: "15.1 La Matriz de las 6 R's de Migración",
            body: "1. **Rehost (Lift and Shift)**: Mover la VM tal cual a la nube sin cambios de código ni arquitectura.\n2. **Replatform (Lift, Tinker and Shift)**: Optimización minoritaria de infraestructura sin alterar el código núcleo, como cambiar una BD local por un servicio administrado (ej. AWS RDS).\n3. **Refactor / Re-architect**: Rediseñar la aplicación desde cero hacia microservicios o Serverless nativo.\n4. **Repurchase (Drop and Replace)**: Reemplazar el software a la medida por una solución SaaS comercial (ej. migrar correo local a Google Workspace).\n5. **Retain**: Mantener la aplicación en infraestructura local por regulación o amortización pendiente.\n6. **Retire**: Dar de baja sistemas obsoletos o duplicados."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "Rehost es el camino más rápido; Refactor es el más optimizado a largo plazo.",
          "Replatform aprovecha servicios administrados sin reescribir código."
        ]
      },
      {
        weekNumber: 16,
        title: "Proyecto Final Integrador, Autoevaluación IV y Evaluación Final (30%)",
        objective: "Demostrar el dominio integral de la arquitectura cloud mediante el diseño completo para una multinacional.",
        businessCase: {
          company: "Empresa Global de Logística",
          problem: "Transformación digital completa requiriendo alta disponibilidad, resiliencia multicloud, seguridad por capas y migración masiva.",
          solution: "Integración de IaC con Terraform, orquestación EKS, Edge computing en almacenes y plan de continuidad multicloud."
        },
        theoreticalContent: [
          {
            sectionTitle: "16.1 Síntesis del Perfil de Arquitecto Cloud",
            body: "Un Ingeniero de Software Nivel 8 debe integrar criterios de negocio, finanzas (Opex/TCO), resiliencia, seguridad y automatización declarativa."
          }
        ],
        codeExamples: [],
        keyTakeaways: [
          "El proyecto integrador representa el 30% del desempeño de la asignatura ACN01.",
          "Se evalúan entregables de código Terraform, Dockerfile y documento de diseño de arquitectura."
        ]
      }
    ],
    quiz: [
      {
        id: 401,
        categoryTag: "Vendor Lock-in",
        question: "Una empresa de software desea evitar el Vendor Lock-in estricto al desplegar su aplicación en la nube. ¿Cuál de las siguientes prácticas de diseño minimiza este riesgo?",
        options: [
          "Usar funciones Serverless propietarias acopladas a la base de datos nativa del proveedor.",
          "Empaquetar los servicios en contenedores Docker estándar y desplegarlos en Kubernetes agnóstico a la nube.",
          "Escribir scripts en PowerShell específicos del sistema operativo Windows Server 2012.",
          "Firmar contratos de exclusividad a 10 años con un único proveedor cloud."
        ],
        correctAnswerIndex: 1,
        explanation: "El uso de contenedores e infraestructura estandarizada (Kubernetes, Terraform) desacopla la aplicación de las APIs propietarias del proveedor cloud."
      },
      {
        id: 402,
        categoryTag: "Edge/Fog Computing",
        question: "En una plataforma de vehículos autónomos que deben tomar decisiones de frenado en menos de 2 milisegundos, la arquitectura procesa los datos en:",
        options: [
          "Nube Centralizada remota a través de satélite",
          "Edge Computing (Procesamiento directamente en la computadora de a bordo del vehículo)",
          "Base de datos relacional alojada en un servidor local de la oficina central",
          "Tape Backup de almacenamiento en frío"
        ],
        correctAnswerIndex: 1,
        explanation: "Latencias ultra-bajas (<5 ms) para seguridad crítica requieren Edge Computing directamente en el dispositivo cliente."
      },
      {
        id: 403,
        categoryTag: "Estrategias de Migración 6 R's",
        question: "Si una empresa decide mover sus máquinas virtuales desde su VMware local hacia AWS EC2 cambiando solo el hipervisor sin alterar el sistema operativo ni el código, está aplicando la estrategia de:",
        options: [
          "Refactor / Re-architect",
          "Rehost (Lift and Shift)",
          "Repurchase",
          "Retire"
        ],
        correctAnswerIndex: 1,
        explanation: "Rehost (Lift and Shift) traslada cargas de trabajo directamente a la nube sin modificaciones de software."
      },
      {
        id: 404,
        categoryTag: "Multicloud Governance",
        question: "¿Cuál es el rol de herramientas de abstracción como Google Anthos o HashiCorp Terraform en una estrategia Multicloud?",
        options: [
          "Duplicar el costo de facturación de ambas nubes.",
          "Proporcionar un plano de control unificado y estándar para gestionar recursos e infraestructura en múltiples nubes (AWS, Azure, GCP).",
          "Inhabilitar la conexión a internet de los servidores.",
          "Reemplazar a los ingenieros de software por sistemas mecánicos."
        ],
        correctAnswerIndex: 1,
        explanation: "Un plano de control multicloud unifica operaciones, cumplimiento y seguridad en infraestructuras heterogéneas."
      },
      {
        id: 405,
        categoryTag: "Estrategia Replatform",
        question: "En el contexto de migración de las 6 R's, 'Replatform' se diferencia de 'Rehost' porque:",
        options: [
          "Replatform reescribe el 100% del código fuente de la aplicación desde cero.",
          "Replatform realiza optimizaciones menores de infraestructura sin cambiar el núcleo del código, como sustituir un motor de BD local por un servicio administrado (ej. AWS RDS).",
          "Replatform consiste únicamente en dar de baja el sistema.",
          "Replatform solo aplica para dispositivos móviles."
        ],
        correctAnswerIndex: 1,
        explanation: "Replatform ('Lift, Tinker and Shift') introduce optimizaciones estratégicas (servicios administrados) sin requerir re-arquitectura completa."
      }
    ],
    diagnosticMatrix: [
      {
        level: "Excelente",
        scoreRange: "5 / 5",
        diagnosis: "Visión integral de arquitecturas distribuidas avanzadas, Edge y estrategias de migración empresarial.",
        recommendedRoute: [
          "Liderar el Proyecto Final Integrador de Arquitectura Cloud."
        ]
      },
      {
        level: "Aceptable",
        scoreRange: "3 - 4 / 5",
        diagnosis: "Confusión leve en los matices de la matriz de las 6 R's (Rehost vs Replatform vs Refactor).",
        recommendedRoute: [
          "Estudiar el diagrama de flujo de decisión de las 6 R's en la sección 4.2 del Material de Estudio."
        ]
      },
      {
        level: "En Riesgo",
        scoreRange: "< 3 / 5",
        diagnosis: "Dificultad en conceptos de Edge/Fog Computing y mitigación de Vendor Lock-in.",
        recommendedRoute: [
          "Lectura de los casos de estudio de AWS Prescriptive Guidance sobre migración de aplicaciones.",
          "Análisis del paper sobre arquitecturas de borde e IoT en el entorno industrial.",
          "Desarrollar la actividad práctica autoguiada de la Semana 15."
        ],
        mandatoryActivities: [
          "Lectura AWS Prescriptive Guidance 6 R's",
          "Análisis Paper Edge & IoT",
          "Actividad Práctica Semana 15"
        ]
      }
    ],
    labSimulations: [
      {
        id: "lab-migration-6r",
        title: "Selector Interactivo de las 6 R's",
        description: "Clasifica casos reales de migración corporativa en la estrategia correcta de las 6 R's.",
        type: "migration",
        defaultCode: `// Caso 1: Servidor de correo Exchange local -> Migrar a Google Workspace SaaS
// Estrategia: Repurchase (Drop and Replace)

// Caso 2: VM de contabilidad de 2012 -> Mover a AWS EC2 tal cual
// Estrategia: Rehost (Lift and Shift)

// Caso 3: BD Oracle local -> Mover a AWS RDS PostgreSQL administrado sin tocar app
// Estrategia: Replatform (Lift, Tinker and Shift)`,
        instructions: "Prueba la clasificación interactiva en el panel de simulaciones.",
        solutionHint: "Replatform optimiza componentes secundarios; Refactor altera el código fuente principal."
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.INITIAL_BADGES = INITIAL_BADGES;
  window.COHORT_STUDENTS = COHORT_STUDENTS;
  window.COURSE_UNITS = COURSE_UNITS;
  window.COURSE_ANALYTICS_DATA = COURSE_ANALYTICS_DATA;
}
