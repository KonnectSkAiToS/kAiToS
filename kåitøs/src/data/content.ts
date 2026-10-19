import { ServiceItem, CaseStudy, BlogPost, TechStackCategory, MetricItem } from '../types';

export const COMPANY_INFO = {
  name: 'kÅiTøS',
  legalName: 'kÅiTøS Technologies Private Limited',
  domain: 'kaitos.in',
  tagline: 'The Convergence of AI, IT Infrastructure & Autonomous Operating Systems',
  etymology: {
    k: { letter: 'K', meaning: 'Kernel Computing', note: 'Hardware-level deterministic execution & low-latency runtimes' },
    ai: { letter: 'Ai', meaning: 'Artificial Intelligence', note: 'Deep learning, neural kernels & autonomous agent swarms' },
    it: { letter: 'IT', meaning: 'Information Technology', note: 'Mission-critical cloud fabric, multi-region GitOps & enterprise architecture' },
    os: { letter: 'øS', meaning: 'Operating System', note: 'Custom eBPF schedulers, continuous bin-packing & low-overhead kernels' },
    s: { letter: 'S', meaning: 'Scalable Systems', note: 'Zero-trust global edge meshes, high concurrency & enterprise security' }
  },
  mission: 'To construct deterministic, ultra-low-latency computing environments where artificial intelligence, distributed information technology, and modern operating system kernels coalesce seamlessly into unified enterprise platforms.',
  phones: {
    india: '+91 8220184799',
    uk: '+44 7733926231'
  },
  emails: {
    general: 'info@kaitos.in',
    contact: 'contact@kaitos.in',
    support: 'support@kaitos.in',
    careers: 'careers@kaitos.in'
  },
  offices: [
    {
      id: 'bengaluru',
      name: 'Bengaluru Global Headquarters',
      type: 'Primary Engineering & R&D Campus',
      address: 'Tower C, Ecospace Business Tech Park, Outer Ring Road, Bellandur',
      city: 'Bengaluru, Karnataka 560103',
      country: 'India',
      timezone: 'Asia/Kolkata (IST)',
      utcOffset: '+05:30',
      phone: '+91 8220184799',
      whatsapp: 'https://wa.me/918220184799',
      email: 'contact@kaitos.in',
      activeHours: '09:00 - 20:00 IST'
    },
    {
      id: 'london',
      name: 'London International Delivery Node',
      type: 'UK & European Operations Center',
      address: '100 Bishopsgate, Financial Technology District',
      city: 'London EC2N 4AG',
      country: 'United Kingdom',
      timezone: 'Europe/London (GMT/BST)',
      utcOffset: '+00:00',
      phone: '+44 7733926231',
      whatsapp: 'https://wa.me/447733926231',
      email: 'contact@kaitos.in',
      activeHours: '08:00 - 19:00 GMT'
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad Systems & Cloud Lab',
      type: 'Distributed Cloud Operations & SRE',
      address: 'Level 8, Cyber Towers, HITEC City, Madhapur',
      city: 'Hyderabad, Telangana 500081',
      country: 'India',
      timezone: 'Asia/Kolkata (IST)',
      utcOffset: '+05:30',
      phone: '+91 8220184799',
      whatsapp: 'https://wa.me/918220184799',
      email: 'support@kaitos.in',
      activeHours: '24/7/365 Global SRE Operations'
    }
  ],
  socials: [
    { name: 'GitHub', url: 'https://github.com/kaitos-technologies', handle: '@kaitos' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/kaitos-technologies', handle: 'kÅiTøS Technologies' },
    { name: 'X / Twitter', url: 'https://x.com/kaitos_in', handle: '@kaitos_in' },
    { name: 'Discord', url: 'https://discord.gg/kaitos', handle: 'kÅiTøS Community' },
    { name: 'YouTube', url: 'https://youtube.com/@kaitos-technologies', handle: '@kaitos-tech' }
  ]
};

export const CORE_METRICS: MetricItem[] = [
  {
    id: 'sla',
    label: 'Production Uptime SLA',
    value: '99.998%',
    delta: '+0.003%',
    period: 'Trailing 12 Months',
    description: 'Deterministic multi-region failover across zero-trust cloud topologies.'
  },
  {
    id: 'latency',
    label: 'P99 Model Inference Latency',
    value: '14.2ms',
    delta: '-38%',
    period: 'Benchmarked vs Native GPUs',
    description: 'Optimized CUDA/Triton kernel runtime tailored for enterprise LLM agents.'
  },
  {
    id: 'cost',
    label: 'Client Infrastructure Savings',
    value: '$48.6M',
    delta: '-44% Avg',
    period: 'Cumulative across 62+ Engagements',
    description: 'Autonomous FinOps workload bin-packing and kernel thread optimizations.'
  },
  {
    id: 'throughput',
    label: 'Daily Enterprise Data Ingestion',
    value: '4.2 PB',
    delta: '+120% YoY',
    period: 'Peak 480k msg/sec',
    description: 'High-throughput Kafka and ClickHouse distributed stream processing pipelines.'
  }
];

export const DETAILED_STATISTICS = [
  {
    category: 'System Reliability & SLAs',
    metrics: [
      { name: 'Production High Availability SLA', value: '99.998%', benchmark: 'Tier-4 Datacenter Spec' },
      { name: 'Mean Time to Recovery (MTTR)', value: '3.8 min', benchmark: 'Down from 45 min industry avg' },
      { name: 'Zero-Downtime Releases Executed', value: '14,820+', benchmark: '100% Blue/Green Canary' },
      { name: 'Automated Incident Self-Heal Rate', value: '94.2%', benchmark: 'Autonomous eBPF triggers' }
    ]
  },
  {
    category: 'AI & Inference Throughput',
    metrics: [
      { name: 'Median LLM Time-To-First-Token (TTFT)', value: '185ms', benchmark: 'Optimized vLLM engine' },
      { name: 'Concurrent Agent Execution Threads', value: '120,000+', benchmark: 'Low-overhead micro-tasks' },
      { name: 'Model Parameter Serving Density', value: '3.4x', benchmark: 'Quantized INT8/FP8 TensorRT' },
      { name: 'Hallucination Mitigation Rate', value: '99.1%', benchmark: 'Constrained Grammars & RAG' }
    ]
  },
  {
    category: 'Cloud Engineering & FinOps',
    metrics: [
      { name: 'Average Cloud Cost Reduction', value: '44.3%', benchmark: 'Post-kÅiTøS Architecture' },
      { name: 'Kubernetes Pod Cold Start Time', value: '1.2s', benchmark: 'Pre-warmed kernel containers' },
      { name: 'Network Egress Compression Ratio', value: '4.8 : 1', benchmark: 'Custom zstd streaming' },
      { name: 'Multi-Cloud Latency Jitter', value: '< 2.1ms', benchmark: 'Inter-DC direct peering' }
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'software-engineering',
    number: '01',
    title: 'Software Engineering',
    category: 'Software Engineering',
    summary: 'High-performance distributed systems, event-driven architectures, and custom enterprise platforms engineered in Rust, Go, and TypeScript.',
    description: 'We design and construct mission-critical software systems that operate with mathematical predictability. From microsecond transaction engines to high-concurrency microservices, our engineering adheres to clean architecture, zero-mutation paradigms, and rigorous automated verification.',
    deliverables: [
      'High-throughput distributed backend services & event brokers',
      'Reactive, zero-slop web & native mobile enterprise applications',
      'API gateway design, GraphQL federation, and gRPC service meshes',
      'Automated CI/CD release pipelines with comprehensive contract testing'
    ],
    metrics: [
      { label: 'Throughput', value: '10x Increase' },
      { label: 'Code Coverage', value: '98.4%' }
    ],
    imagePath: '/src/assets/images/kaitos_cloud_systems_1791994195916.jpg'
  },
  {
    id: 'cloud-devops',
    number: '02',
    title: 'Cloud & DevOps Engineering',
    category: 'Cloud & DevOps',
    summary: 'Multi-cloud infrastructure orchestration, immutable Kubernetes architectures, and automated FinOps cost governance.',
    description: 'Modern enterprises cannot afford cloud sprawl, vendor lock-in, or runaway billing. kÅiTøS re-architects your cloud estate using Infrastructure as Code (Terraform/OpenTofu), zero-trust security postures, and intelligent container autoscaling that cuts operational expenditure by up to 50%.',
    deliverables: [
      'Multi-cloud Kubernetes cluster provisioning & GitOps automation',
      'Continuous FinOps audits and automated compute bin-packing',
      'Zero-Trust network architecture, mTLS, and secrets management',
      'Disaster recovery planning with automated sub-minute multi-region failover'
    ],
    metrics: [
      { label: 'Cloud Spend Cut', value: '44% Average' },
      { label: 'Deployment Velocity', value: '6x Faster' }
    ],
    imagePath: '/src/assets/images/kaitos_hero_datacenter_ai_1791994196980.jpg'
  },
  {
    id: 'strategic-consulting',
    number: '03',
    title: 'Strategic IT & AI Consulting',
    category: 'Strategic Consulting',
    summary: 'Technical due diligence, AI roadmap formulation, legacy modernisation blueprints, and executive technology advisory.',
    description: 'Led by seasoned architects, kÅiTøS provides unbiased, pragmatic technology guidance. We audit legacy codebases, eliminate technical debt bottlenecks, evaluate generative AI viability, and supply fractional VP/CTO leadership to guide major strategic pivots.',
    deliverables: [
      'Enterprise AI Readiness Assessments & Model Governance Frameworks',
      'Legacy monolith to distributed microservices migration roadmaps',
      'Comprehensive security, compliance (SOC2/ISO27001), and architecture audits',
      'Fractional CTO advisory and engineering team upskilling workshops'
    ],
    metrics: [
      { label: 'Audit Payback', value: '< 90 Days' },
      { label: 'Tech Debt Reduced', value: '65%' }
    ],
    imagePath: '/src/assets/images/kaitos_office_bengaluru_1791994197142.jpg'
  },
  {
    id: 'managed-it',
    number: '04',
    title: 'Managed IT & 24/7 SRE Operations',
    category: 'Managed IT',
    summary: 'Proactive Site Reliability Engineering, automated incident mitigation, and round-the-clock infrastructure stewardship.',
    description: 'We treat operations as an engineering problem. With 24/7 global SRE nodes and automated eBPF runtime observability, kÅiTøS continuously monitors, auto-remediates, and defends your digital infrastructure before degradations impact your users.',
    deliverables: [
      '24/7/365 follow-the-sun Site Reliability Engineering (SRE) coverage',
      'Automated self-healing infrastructure triggers & telemetry pipelines',
      'Enterprise endpoint security, MDM, and automated compliance auditing',
      'Dedicated incident response SLAs with guaranteed sub-10 minute p1 triage'
    ],
    metrics: [
      { label: 'P1 Response Time', value: '< 8 Minutes' },
      { label: 'Uptime Maintained', value: '99.998%' }
    ],
    imagePath: '/src/assets/images/kaitos_ai_autonomous_os_1791994196001.jpg'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'autonomous-logistics',
    title: 'Autonomous Global Freight Routing & Fleet Telemetry OS',
    clientIndustry: 'Global Logistics Enterprise',
    category: 'Logistics',
    timeline: '6 Months Engagement',
    challenge: 'A multinational shipping operator with 14,000 active vessels and freight vehicles faced cascading schedule delays, high fuel costs, and fragmented IoT sensor feeds suffering up to 45 seconds telemetry latency.',
    solution: 'kÅiTøS engineered an event-driven operating layer with Kafka stream processing and custom dynamic routing algorithms. The platform continuously recalibrates route graphs in real time based on weather, port congestion, and fuel burn models.',
    results: [
      { metric: '42%', value: 'Routing Latency Cut', context: 'From 45s down to 2.4s global recalculation' },
      { metric: '$3.2M', value: 'Annual Fuel Savings', context: 'Direct optimization of transit routes' },
      { metric: '99.995%', value: 'Telemetry Ingest SLA', context: 'Over 850 million sensor packets daily' }
    ],
    techStack: ['Rust', 'Apache Kafka', 'ClickHouse', 'Kubernetes', 'FastAPI', 'MapLibre GL'],
    imagePath: '/src/assets/images/kaitos_cloud_systems_1791994195916.jpg'
  },
  {
    id: 'fintech-settlement',
    title: 'Sub-Millisecond Multi-Currency Settlement Engine',
    clientIndustry: 'Cross-Border FinTech Institution',
    category: 'FinTech',
    timeline: '8 Months Engagement',
    challenge: 'Legacy batch settlement systems caused up to 4-hour settlement windows, high forex spread exposure, and frequent transaction deadlocks during peak market volatility hours.',
    solution: 'Developed an in-memory, deterministic ledger engine using low-latency Go and memory-mapped persistence. Integrated real-time compliance screening and automated multi-bank liquidity balancing.',
    results: [
      { metric: '14.2ms', value: 'P99 Settlement Latency', context: 'Down from 4 hours batch turnaround' },
      { metric: '$120M+', value: 'Daily Settled Volume', context: 'Zero ledger discrepancies recorded' },
      { metric: '99.999%', value: 'Engine Availability', context: 'Zero unscheduled downtime over 18 months' }
    ],
    techStack: ['Go', 'PostgreSQL', 'Redis Cluster', 'eBPF', 'Terraform', 'Vault'],
    imagePath: '/src/assets/images/kaitos_case_study_fintech_1791994198089.jpg'
  },
  {
    id: 'healthcare-federated-ai',
    title: 'Zero-Trust Federated Diagnostic Imaging Platform',
    clientIndustry: 'Healthcare Consortium',
    category: 'Enterprise AI',
    timeline: '7 Months Engagement',
    challenge: 'A consortium of 34 regional hospitals needed to run collective deep-learning models on MRI/CT scans without centralizing sensitive patient PHI or breaching HIPAA/GDPR constraints.',
    solution: 'kÅiTøS designed a federated learning operating framework where model weights are trained on edge clusters locally within hospital intranets and aggregated via homomorphic encryption and secure multi-party computation.',
    results: [
      { metric: '94.8%', value: 'Diagnostic Accuracy', context: 'Validated across 120,000 blinded patient scans' },
      { metric: '100%', value: 'Zero PHI Data Egress', context: 'Verified by third-party cryptographic audits' },
      { metric: '3.1x', value: 'Radiologist Review Speed', context: 'Automated pre-triage anomaly annotation' }
    ],
    techStack: ['PyTorch', 'TensorRT', 'Docker', 'WireGuard', 'WebAssembly', 'TypeScript'],
    imagePath: '/src/assets/images/kaitos_ai_autonomous_os_1791994196001.jpg'
  },
  {
    id: 'ecommerce-multicloud',
    title: 'Multi-Cloud Migration & FinOps Architecture for E-Commerce',
    clientIndustry: 'E-Commerce Platform',
    category: 'Cloud & SRE',
    timeline: '5 Months Engagement',
    challenge: 'Uncontrolled AWS cloud bills reaching $420,000/month with single-region vulnerability during Black Friday peak traffic surges and unmanageable database connection pools.',
    solution: 'Migrated compute workloads to a multi-cloud hybrid architecture spanning AWS and bare-metal nodes, implemented automated spot instance harvesting, and deployed a global Cloudflare edge caching layer.',
    results: [
      { metric: '65%', value: 'Monthly Cloud Spend Cut', context: 'Saving $2.7M annually while doubling capacity' },
      { metric: '0ms', value: 'Downtime During Cyber Week', context: 'Handled 4.2x previous peak traffic smoothly' },
      { metric: '82ms', value: 'Global Page Render Time', context: 'Improved Core Web Vitals to 99th percentile' }
    ],
    techStack: ['AWS EKS', 'Cloudflare Workers', 'Terraform', 'Next.js', 'PostgreSQL', 'Grafana'],
    imagePath: '/src/assets/images/kaitos_hero_datacenter_ai_1791994196980.jpg'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'autonomous-kernel-scheduling',
    slug: 'autonomous-kernel-scheduling-ai-workloads',
    title: 'Designing Deterministic Kernel Schedulers for Enterprise AI Workloads',
    category: 'AI & Systems',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    author: {
      name: 'kÅiTøS Systems Core',
      role: 'Principal Systems Engineering'
    },
    excerpt: 'Standard Linux CFQ schedulers create GPU stalls when serving multimodal LLM pipelines. How custom eBPF kernel hooks slashed P99 latency by 41%.',
    content: [
      'In traditional server architectures, the operating system kernel treats machine learning workloads similarly to general compute tasks. However, transformer-based inference exhibits extreme memory bandwidth bursts and strict latency deadlines.',
      'At kÅiTøS, our research into kernel-level task orchestration revealed that up to 34% of inference jitter is caused by context switching and memory allocation lock contention on the host CPU.',
      'By deploying custom eBPF programs directly into the Linux scheduler path, we bypass traditional queuing delays, pinning tensor memory allocations directly to NUMA nodes matching the GPU PCIe bus.',
      'The result is a predictable, deterministic execution envelope where tail latencies remain within 5% of median runtimes even under 95% system saturation.'
    ],
    tags: ['Kernel Engineering', 'eBPF', 'AI Inference', 'Operating Systems']
  },
  {
    id: 'finops-multi-cloud-waste',
    slug: 'finops-multi-cloud-eliminating-waste',
    title: 'Eliminating the 40% FinOps Cloud Tax: Lessons from 50+ Migrations',
    category: 'Cloud Architecture',
    readTime: '5 min read',
    publishedDate: 'September 2026',
    author: {
      name: 'Cloud Practice Group',
      role: 'DevOps & FinOps Architecture'
    },
    excerpt: 'Cloud bills grow exponentially because engineering teams decouple deployment speed from unit economics. Here is the kÅiTøS 4-step bin-packing protocol.',
    content: [
      'Over 40% of enterprise cloud spend is allocated to idle CPU cycles, over-provisioned IOPs, and forgotten staging clusters. Cloud providers design their default settings to maximize billing safety, not resource density.',
      'Our approach introduces continuous bin-packing at the Kubernetes scheduler layer, dynamic spot instance harvesting with graceful preemption handlers, and strict architectural policies enforced via Open Policy Agent.',
      'By measuring unit cost per transaction rather than raw monthly infrastructure cost, engineering teams gain real-time visibility into the exact cost footprint of every pull request.'
    ],
    tags: ['FinOps', 'Kubernetes', 'Cloud Optimization', 'DevOps']
  },
  {
    id: 'convergence-it-llm-agents',
    slug: 'convergence-it-operations-llm-agents',
    title: 'The Convergence of IT Operations and Autonomous Operating Agents',
    category: 'AI & Systems',
    readTime: '7 min read',
    publishedDate: 'August 2026',
    author: {
      name: 'AI Research & Systems Group',
      role: 'Autonomous Systems Division'
    },
    excerpt: 'Why the next generation of Managed IT will not be human ticket dispatchers, but sandboxed deterministic agents operating over verified infrastructure graphs.',
    content: [
      'The term IT operations has historically evoked images of ticket queues, manual reboot scripts, and tedious on-call rotations. As systems scale to millions of microservices, human reaction speed becomes the bottleneck.',
      'kÅiTøS is building the operational substrate where autonomous agents with deterministic verification tools monitor system health, simulate rollback paths in ephemeral clones, and resolve 90%+ of tier-1 incidents autonomously.',
      'By grounding AI actions in verifiable state machines rather than open-ended natural language generation, we eliminate hallucinated shell commands while preserving automated operational velocity.'
    ],
    tags: ['Autonomous Agents', 'Managed IT', 'SRE', 'Artificial Intelligence']
  },
  {
    id: 'kaitos-architectural-vision',
    slug: 'kaitos-architectural-vision-ai-it-os',
    title: 'The Architectural Philosophy of kÅiTøS: Uniting AI, IT, and Operating Systems',
    category: 'Company Updates',
    readTime: '4 min read',
    publishedDate: 'July 2026',
    author: {
      name: 'kÅiTøS Engineering Practice',
      role: 'Systems Architecture Guild'
    },
    excerpt: 'The story behind the name kÅiTøS and our architectural conviction that software, cloud infrastructure, and intelligence must be designed as a unified operating system.',
    content: [
      'Modern enterprise technology is all too often built in silos. AI teams construct models in isolated Python notebooks; IT teams manage separate multi-cloud fabrics; and software engineers build applications on top of operating systems they treat as black boxes.',
      'The name kÅiTøS reflects our unifying technical thesis: Kernel computing (K), Artificial Intelligence (Ai), Information Technology (IT), Operating Systems (øS), and Scalable Systems (S). It is an engineering commitment to full-stack coherence.',
      'To build the next era of computing, software cannot treat the operating system or the underlying cloud fabric as an afterthought. We engineer all layers in harmony—from the silicon to the neural network weights.'
    ],
    tags: ['Company Mission', 'kÅiTøS Origins', 'Architecture', 'Vision']
  }
];

export const TECH_STACK: TechStackCategory[] = [
  {
    category: 'AI, Deep Learning & Autonomous Agents',
    description: 'High-throughput inference engines, agentic state machines, and fine-tuning pipelines.',
    technologies: [
      { name: 'PyTorch 2.x & CUDA', role: 'Distributed Model Training & Custom Kernels', proficiency: 'Tier-1 Native' },
      { name: 'NVIDIA TensorRT & Triton', role: 'Sub-Millisecond Inference Serving', proficiency: 'Production Benchmark' },
      { name: 'vLLM & HuggingFace', role: 'Continuous PagedAttention Serving', proficiency: 'Production Benchmark' },
      { name: 'LangGraph & AutoGen', role: 'Deterministic Agentic State Machines', proficiency: 'Enterprise Orchestration' }
    ]
  },
  {
    category: 'Cloud, Infrastructure & DevOps',
    description: 'Declarative GitOps, multi-cloud clusters, and zero-trust mesh architectures.',
    technologies: [
      { name: 'Kubernetes (EKS/GKE/Bare-Metal)', role: 'Multi-Region Workload Orchestration', proficiency: 'Enterprise Standard' },
      { name: 'Terraform & OpenTofu', role: 'Immutable Infrastructure as Code', proficiency: 'Production Benchmark' },
      { name: 'Cloudflare Workers & Edge', role: 'Sub-15ms Global Anycast Routing', proficiency: 'Tier-1 Native' },
      { name: 'Prometheus & Grafana', role: 'High-Cardinality Observability Stacks', proficiency: 'Full Telemetry' }
    ]
  },
  {
    category: 'Core Systems, Kernels & Low-Latency',
    description: 'Memory-safe systems programming and custom kernel observability hooks.',
    technologies: [
      { name: 'Rust', role: 'Zero-Cost Abstraction & High-Speed Engines', proficiency: 'Primary Language' },
      { name: 'eBPF & Cilium', role: 'In-Kernel Telemetry & Micro-Firewalling', proficiency: 'Production Benchmark' },
      { name: 'Go (Golang)', role: 'Concurrent Distributed Services', proficiency: 'Primary Language' },
      { name: 'WebAssembly (Wasm)', role: 'Sandboxed Client/Edge Execution', proficiency: 'Production Benchmark' }
    ]
  },
  {
    category: 'Data Engineering & Application Platforms',
    description: 'Ultra-fast event streams, analytical stores, and reactive interfaces.',
    technologies: [
      { name: 'Apache Kafka', role: 'Distributed Event Streaming (>500k msg/s)', proficiency: 'Production Benchmark' },
      { name: 'ClickHouse & PostgreSQL', role: 'Columnar Analytics & ACID Ledger Persistence', proficiency: 'Tier-1 Native' },
      { name: 'React 19 & TypeScript', role: 'Zero-Slop High-Performance User Interfaces', proficiency: 'Frontend Standard' },
      { name: 'Tailwind CSS', role: 'Deterministic Design Systems & Fluid Layouts', proficiency: 'Frontend Standard' }
    ]
  }
];

export const CORE_VALUES = [
  {
    number: '01',
    title: 'Deterministic Engineering Over Hype',
    description: 'We do not sell magic or hand-waving promises. Every system we deploy is measured by mathematically verifiable latencies, verified uptime metrics, and audited unit economics.'
  },
  {
    number: '02',
    title: 'Zero Slop Discipline',
    description: 'We reject bloated codebases, fragile dependencies, and generic AI templates. Every line of code, infrastructure manifest, and UI component serves a distinct purpose.'
  },
  {
    number: '03',
    title: 'Full Intellectual Property Ownership',
    description: 'Everything we engineer belongs 100% to our clients. No proprietary platform lock-in, no hidden runtimes, and clean reproducible repositories.'
  },
  {
    number: '04',
    title: 'Radical Transparency & SLA Defense',
    description: 'We stake our reputation on operational clarity. Transparent telemetry dashboards, clear post-mortems, and proactive communication form our operational foundation.'
  }
];
