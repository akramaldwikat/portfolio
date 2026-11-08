import type { Locale } from "@/lib/site";
import { interfaceCopy } from "./interface";
import { formCopy } from "./contact-copy";
const en = {
  ...interfaceCopy.en,

  role: "Full-Stack Software Engineer & Business Systems Developer",
  shortRole: "FULL-STACK ENGINEERING · BUSINESS SYSTEMS",
  skip: "Skip to content",
  work: "View my work",
  caseStudy: "Explore case study",
  allProjects: "All projects",
  allServices: "Explore services",
  eyebrow: "FROM COMPLEXITY TO CLARITY",
  heroStart: "I build software for",
  heroAccent: "real business",
  heroEnd: "operations.",
  heroDescription:
    "I help small and medium-sized businesses connect their day-to-day operations with custom web applications, internal systems and APIs.",
  heroNote:
    "Experience with complex production systems. Confidential work stays private.",
  servicesLabel: "01 / WHAT I DO",
  servicesTitle: "Software built around\nyour business.",
  servicesIntro:
    "From a new product to a better internal workflow, I connect your business requirements with the right technical solution.",
  projectsLabel: "02 / SELECTED WORK",
  projectsTitle: "Behind the interface,\na system that makes sense.",
  projectsIntro:
    "Explore the business problem, proposed solution and engineering decisions in an independent case study. Project status is always explicit.",
  independent: "Independent Demo Project",
  coming: "Coming soon",
  presentation: "Project presentation",
  planned: "Planned portfolio project",
  concept: "UI concept · illustrative data · not a live product",
  unavailable: "Not published yet",
  whyLabel: "03 / THE WAY I WORK",
  whyTitle: "A technical partner.\nA business perspective.",
  values: [
    [
      "Business-oriented development",
      "The starting point is your workflow and the outcome you need, before a framework or a feature list.",
    ],
    [
      "Full-stack ownership",
      "A consistent approach across the interface, business logic, APIs and data model.",
    ],
    [
      "Architecture that can evolve",
      "Clear boundaries and practical engineering decisions leave room for your next stage.",
    ],
    [
      "Clear communication",
      "Understandable scope, visible progress and explicit tradeoffs throughout the project.",
    ],
    [
      "Maintainable by design",
      "Readable code, useful documentation and predictable structure make future changes easier.",
    ],
    [
      "Attention to the experience",
      "Software should feel clear and dependable for the people who use it every day.",
    ],
  ],
  stackLabel: "04 / TECHNICAL TOOLKIT",
  stackTitle: "The right tools.\nA cohesive system.",
  stackIntro:
    "A focused, modern stack for building across the whole application.",
  stackGroups: ["Frontend", "Backend", "Data", "Engineering"],
  processLabel: "05 / FROM IDEA TO LAUNCH",
  processTitle: "A clear path forward.",
  process: [
    ["Discovery", "Understand your business goals, users and requirements."],
    ["Planning", "Define scope, architecture and meaningful milestones."],
    ["Development", "Build iteratively and make progress visible."],
    ["Testing", "Validate functionality, performance and the user experience."],
    ["Launch", "Prepare the system and deploy with care."],
    ["Support", "Improve and extend the product as your needs evolve."],
  ],
  ctaTitle: "Have a project in mind?",
  ctaDescription:
    "Share the workflow you want to improve. I’ll review the requirements and suggest a practical next step.",
  footerLine: "Turning complex requirements into usable software.",
  footerNote: "Built with clarity. Engineered with care.",
  rights: "All rights reserved.",
  aboutLabel: "ABOUT / AKRAM ALDWIKAT",
  aboutTitle: "One engineer.\nThe whole application.",
  aboutIntro:
    "I’m Akram Aldwikat, a Full-Stack Software Engineer & Business Systems Developer. I turn complex business workflows into web applications with clear interfaces, dependable backend logic and a considered data model.",
  aboutBody:
    "My professional experience includes complex production systems, where a screen is only one part of a larger workflow. I work across frontend development, API architecture, relational databases and system design, keeping the connections between them explicit. The professional systems I have worked on remain confidential; the studies here are independent.",
  approachTitle: "How I work",
  approachBody:
    "I start by understanding how work moves through the business: who owns each step, what data is needed and what can go wrong. We agree on scope and milestones before development. During delivery, I explain tradeoffs, share progress and keep code and handover documentation maintainable.",
  confidentiality: "A note on confidentiality",
  confidentialityBody:
    "Professional systems, source code and client information are not reproduced here. Portfolio projects are independently designed and clearly labeled.",
  servicesPageTitle: "Your workflow.\nThe right software.",
  servicesPageIntro:
    "Replace manual work, connect your tools or give your existing application a clearer path forward. Each engagement starts with the business problem.",
  problem: "The challenge",
  solution: "What I build",
  deliverables: "Typical deliverables",
  suitable: "A good fit for",
  projectsPageTitle: "From workflow\nto system.",
  projectsPageIntro:
    "An honest look at how I approach business software: the operational problem, the proposed system and the decisions behind it. These are independent portfolio projects, not commissioned client work.",
  contactLabel: "CONTACT / LET’S BUILD SOMETHING USEFUL",
  contactTitle: "Tell me what\nyou’re working on.",
  contactIntro:
    "Tell me about your project, goals and current challenges. I’ll review the requirements and suggest the best next step. You don’t need a finished specification to begin.",
  nextTitle: "A useful first conversation",
  nextItems: [
    "Your business goals and current challenges",
    "The people and workflows involved",
    "Scope, priorities and a practical next step",
  ],
  channels: "Contact directly",
  unconfigured: "Contact details will be added before launch.",
  caseLabel: "FLOWDESK / INDEPENDENT DEMO PROJECT",
  caseTitle: "One workspace.\nConnected operations.",
  caseIntro:
    "A business operations platform concept designed to help small and medium-sized teams manage clients, projects, tasks and team workflows from a centralized system.",
  caseStatus: "Portfolio Case Study — Application Development In Progress",
  proofLink: "Explore my engineering approach",
  proofPoints: [
    "Business workflows first",
    "Frontend + backend ownership",
    "Clear scope and handover",
  ],
  outcome: "Business outcome",
  projectProblem: "The problem",
  projectSolution: "Proposed solution",
  proposedStack: "Proposed stack",
  statusLabel: "Project status",
  howSteps: [
    [
      "Understand the operation",
      "Map users, responsibilities and the data behind each step.",
    ],
    [
      "Make the plan clear",
      "Agree on scope, access rules, milestones and technical tradeoffs.",
    ],
    [
      "Build and hand over",
      "Deliver in increments, test real workflows and document the system.",
    ],
  ],
  responsibilities: [
    "User experience & frontend",
    "Backend services & API architecture",
    "Relational data & access rules",
    "System design & maintainability",
  ],
  projectQuestion: "Facing a similar challenge?",
  projectQuestionBody:
    "Your workflow may need a different solution. Let’s define the right scope for your business.",
  form: formCopy.en,
};
const ar: typeof en = {
  ...interfaceCopy.ar,

  role: "مهندس برمجيات متكامل ومطوّر أنظمة أعمال",
  shortRole: "تطوير برمجيات متكاملة وأنظمة أعمال",
  skip: "انتقل إلى المحتوى",
  work: "استعرض أعمالي",
  caseStudy: "استكشف دراسة المشروع",
  allProjects: "جميع المشاريع",
  allServices: "استكشف الخدمات",
  eyebrow: "من التعقيد إلى الوضوح",
  heroStart: "أبني برمجيات تدعم",
  heroAccent: "عمليات أعمالك",
  heroEnd: "اليومية.",
  heroDescription:
    "أساعد الشركات الصغيرة والمتوسطة على تنظيم عملياتها وربط أدواتها، من خلال تطبيقات ويب وأنظمة داخلية وواجهات API مصممة لاحتياجاتها.",
  heroNote: "خبرة في أنظمة تشغيلية معقدة، مع الحفاظ على سرية الأعمال المهنية.",
  servicesLabel: "01 / ما أقدّمه",
  servicesTitle: "برمجيات مصممة\nحول أعمالك.",
  servicesIntro:
    "من منتج جديد إلى تحسين سير العمل الداخلي، أربط متطلبات أعمالك بالحل التقني المناسب.",
  projectsLabel: "02 / أعمال مختارة",
  projectsTitle: "خلف كل واجهة،\nنظام مدروس.",
  projectsIntro:
    "اطّلع على مشكلة العمل والحل المقترح والقرارات الهندسية في دراسة مستقلة، مع توضيح مرحلة كل مشروع.",
  independent: "مشروع تجريبي مستقل",
  coming: "قريبًا",
  presentation: "عرض المشروع",
  planned: "مشروع مستقل مخطط له",
  concept: "تصوّر للواجهة · بيانات توضيحية · ليس منتجًا منشورًا",
  unavailable: "لم يُنشر بعد",
  whyLabel: "03 / أسلوب عملي",
  whyTitle: "شريك تقني.\nورؤية تفهم الأعمال.",
  values: [
    [
      "تطوير موجّه للأعمال",
      "نبدأ بسير عملك والنتيجة التي تحتاجها، قبل اختيار الإطار التقني أو قائمة المزايا.",
    ],
    [
      "مسؤولية متكاملة",
      "نهج متناسق يشمل الواجهة ومنطق الأعمال وواجهات البرمجة ونموذج البيانات.",
    ],
    [
      "بنية قابلة للتطور",
      "حدود واضحة وقرارات هندسية عملية تتيح للنظام مواكبة احتياجاتك القادمة.",
    ],
    [
      "تواصل واضح",
      "نطاق مفهوم، وتقدم ملموس، ومناقشة صريحة للخيارات طوال المشروع.",
    ],
    [
      "قابلية الصيانة",
      "كود واضح، وتوثيق مفيد، وتنظيم متوقع يجعل التطوير اللاحق أسهل.",
    ],
    [
      "اهتمام بتجربة المستخدم",
      "برمجيات واضحة ويمكن الاعتماد عليها للأشخاص الذين يستخدمونها يوميًا.",
    ],
  ],
  stackLabel: "04 / الأدوات التقنية",
  stackTitle: "أدوات مناسبة.\nنظام متكامل.",
  stackIntro: "مجموعة تقنيات حديثة ومركّزة لبناء جميع طبقات التطبيق.",
  stackGroups: ["الواجهات الأمامية", "الأنظمة الخلفية", "البيانات", "الهندسة"],
  processLabel: "05 / من الفكرة إلى الإطلاق",
  processTitle: "خطوات واضحة نحو هدفك.",
  process: [
    ["الاكتشاف", "فهم أهداف أعمالك والمستخدمين والمتطلبات."],
    ["التخطيط", "تحديد النطاق والبنية والمراحل الرئيسية."],
    ["التطوير", "البناء على مراحل وإظهار التقدم بوضوح."],
    ["الاختبار", "التحقق من الوظائف والأداء وتجربة المستخدم."],
    ["الإطلاق", "تجهيز النظام ونشره بعناية."],
    ["الدعم", "تحسين المنتج وتوسيعه مع تطور احتياجاتك."],
  ],
  ctaTitle: "لديك مشروع في ذهنك؟",
  ctaDescription:
    "أخبرني بما ترغب في تحسينه. سأراجع المتطلبات وأقترح خطوة عملية تناسب مشروعك.",
  footerLine: "أحوّل المتطلبات المعقدة إلى برمجيات عملية.",
  footerNote: "وضوح في التصميم. عناية في التنفيذ.",
  rights: "جميع الحقوق محفوظة.",
  aboutLabel: "نبذة عني / أكرم الدويكات",
  aboutTitle: "من فهم سير العمل\nإلى بناء النظام.",
  aboutIntro:
    "أنا أكرم الدويكات، مهندس برمجيات متكامل ومطوّر أنظمة أعمال. أحوّل إجراءات العمل المعقدة إلى تطبيقات واضحة للمستخدم، مبنية على منطق أعمال منظّم وقواعد بيانات مدروسة.",
  aboutBody:
    "عملت مهنيًا على أنظمة تشغيلية معقدة، حيث ترتبط كل شاشة بإجراءات وبيانات وصلاحيات تتجاوز الواجهة. يشمل عملي تطوير الواجهات والأنظمة الخلفية، وتصميم قواعد البيانات وواجهات API وبنية النظام. أحافظ على سرية هذه الأعمال؛ لذلك أعرض هنا دراسات ومشاريع مستقلة.",
  approachTitle: "كيف أعمل معك",
  approachBody:
    "أفهم أولًا كيف تُنجز الأعمال: من المسؤول عن كل خطوة، وما البيانات المطلوبة، وأين تظهر المشكلات. نتفق على نطاق واضح ومراحل للتسليم، ثم أبني تدريجيًا وأشاركك التقدم والخيارات التقنية، مع الاهتمام بوضوح الكود وتوثيق التسليم.",
  confidentiality: "حول سرية الأعمال",
  confidentialityBody:
    "لا أعيد عرض الأنظمة المهنية أو شيفرتها أو معلومات عملائها. مشاريع المعرض مصممة بشكل مستقل وموسومة بوضوح.",
  servicesPageTitle: "سير عملك.\nوالبرمجيات المناسبة له.",
  servicesPageIntro:
    "تنظيم العمل اليدوي، وربط الأدوات، وتطوير التطبيقات القائمة. نبدأ بالمشكلة الفعلية ثم نختار الحل المناسب لها.",
  problem: "التحدي",
  solution: "ما أبنيه لك",
  deliverables: "نماذج للمخرجات",
  suitable: "مشاريع مناسبة",
  projectsPageTitle: "من إجراءات العمل\nإلى تصميم النظام.",
  projectsPageIntro:
    "نماذج توضّح كيف أتعامل مع برمجيات الأعمال: المشكلة التشغيلية، والنظام المقترح، وأسباب القرارات التقنية. جميعها مشاريع مستقلة، وليست أعمالًا منفّذة بتكليف من عملاء.",
  contactLabel: "تواصل معي / لنبنِ شيئًا مفيدًا",
  contactTitle: "حدّثني عن\nمشروعك القادم.",
  contactIntro:
    "حدّثني عن مشروعك وأهدافك والتحديات الحالية. سأراجع المتطلبات وأقترح الخطوة الأنسب للبدء، حتى إن لم تكن لديك مواصفات مكتملة بعد.",
  nextTitle: "محادثة أولى مفيدة",
  nextItems: [
    "أهداف أعمالك والتحديات الحالية",
    "المستخدمون وسير العمل",
    "النطاق والأولويات والخطوة العملية التالية",
  ],
  channels: "تواصل مباشر",
  unconfigured: "ستُضاف بيانات التواصل قبل الإطلاق.",
  caseLabel: "FLOWDESK / مشروع تجريبي مستقل",
  caseTitle: "مساحة عمل واحدة.\nوعمليات مترابطة.",
  caseIntro:
    "تصوّر لمنصة عمليات أعمال تساعد الفرق الصغيرة والمتوسطة على إدارة العملاء والمشاريع والمهام وسير العمل ضمن نظام مركزي.",
  caseStatus: "دراسة مشروع مستقل — تطوير التطبيق لم يكتمل بعد",
  proofLink: "اطّلع على نهجي الهندسي",
  proofPoints: [
    "فهم إجراءات العمل أولًا",
    "تطوير الواجهات والأنظمة الخلفية",
    "نطاق واضح وتسليم موثّق",
  ],
  outcome: "القيمة لأعمالك",
  projectProblem: "المشكلة",
  projectSolution: "الحل المقترح",
  proposedStack: "التقنيات المقترحة",
  statusLabel: "مرحلة المشروع",
  howSteps: [
    [
      "فهم إجراءات العمل",
      "تحديد المستخدمين والمسؤوليات والبيانات اللازمة لكل خطوة.",
    ],
    [
      "خطة واضحة قبل التنفيذ",
      "الاتفاق على النطاق والصلاحيات ومراحل التسليم والخيارات التقنية.",
    ],
    [
      "بناء تدريجي وتسليم موثّق",
      "اختبار إجراءات واقعية وتوثيق النظام بما يسهّل صيانته وتطويره.",
    ],
  ],
  responsibilities: [
    "تجربة المستخدم والواجهات",
    "الأنظمة الخلفية وواجهات API",
    "قواعد البيانات والصلاحيات",
    "تصميم النظام وقابلية الصيانة",
  ],
  projectQuestion: "لديك تحدٍ مشابه؟",
  projectQuestionBody:
    "قد يحتاج سير عملك إلى حل مختلف. لنحدّد معًا نطاقًا مناسبًا لأعمالك.",
  form: formCopy.ar,
};
export const content: Record<Locale, typeof en> = { en, ar };
export const stack = [
  ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  ["NestJS", "Node.js", "REST APIs"],
  ["PostgreSQL", "Prisma", "Redis"],
  ["Docker", "Git", "CI/CD", "BullMQ"],
];
