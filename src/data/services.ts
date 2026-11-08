import type { Locale } from "@/lib/site";
import type { Inquiry } from "@/lib/contact-schema";
export type Service = {
  title: string;
  short: string;
  problem: string;
  solution: string;
  outcome: string;
  deliverables: string[];
  suitable: string;
  inquiryType: Inquiry["type"];
};
export const services: Record<Locale, Service[]> = {
  en: [
    {
      title: "Full-Stack Web Applications",
      short:
        "Your product needs more than a screen. Bring the interface, business rules and data together.",
      problem:
        "Your idea needs a complete application, with a consistent experience across every layer.",
      solution:
        "Design the user journeys, model the data and connect a modern frontend to a structured backend.",
      deliverables: [
        "Responsive web application",
        "Backend and database",
        "Authentication and deployment documentation",
      ],
      suitable: "SaaS products, customer portals and web platforms.",
      outcome:
        "Give customers or staff one consistent place to complete a process, with an application you can extend.",
      inquiryType: "0",
    },
    {
      title: "Custom Business Systems",
      short:
        "Scattered spreadsheets and unclear handoffs make everyday work harder than it needs to be.",
      problem:
        "Spreadsheets and disconnected tools make daily operations difficult to coordinate.",
      solution:
        "Map the real workflow and build a central system with clear responsibilities and access rules.",
      deliverables: [
        "Workflow and data model",
        "Role-based application",
        "Operational views and handover documentation",
      ],
      suitable: "Internal operations, client management and team coordination.",
      outcome:
        "Keep operational records connected and make ownership and next actions easier to see.",
      inquiryType: "1",
    },
    {
      title: "Admin Dashboards & Internal Tools",
      short:
        "Your team needs to manage the business without digging through data or asking a developer.",
      problem:
        "Your team needs to act on information, but the current interface hides the context.",
      solution:
        "Design focused views, useful filters and safe management actions around everyday tasks.",
      deliverables: [
        "Responsive dashboard",
        "Management screens and filters",
        "Role-aware controls",
      ],
      suitable: "Admin portals, operations teams and reporting interfaces.",
      outcome:
        "Help staff find the right information and complete routine actions with fewer workarounds.",
      inquiryType: "2",
    },
    {
      title: "Backend & API Development",
      short:
        "A growing application needs business rules and access controls that hold up beyond the interface.",
      problem:
        "Your application needs dependable business logic and a backend that can evolve.",
      solution:
        "Define module boundaries, validate inputs and enforce authentication and authorization on the server.",
      deliverables: [
        "Documented REST API",
        "Authentication and authorization",
        "Database schema and background jobs where needed",
      ],
      suitable: "Product backends, service layers and multi-user platforms.",
      outcome:
        "Create a dependable foundation for web clients, integrations and future product changes.",
      inquiryType: "3",
    },
    {
      title: "API Integration & Automation",
      short:
        "Copying information between tools creates extra work and inconsistent records.",
      problem:
        "Manual copying between tools wastes time and creates inconsistent records.",
      solution:
        "Connect the relevant APIs with explicit data mapping, validation, retries and error handling.",
      deliverables: [
        "API or webhook integration",
        "Data mapping and failure handling",
        "Setup and operational documentation",
      ],
      suitable:
        "Third-party services, workflow automation and data synchronization.",
      outcome:
        "Reduce repeated data entry and give teams a clearer view of whether a handoff succeeded.",
      inquiryType: "4",
    },
    {
      title: "Existing Application Improvement",
      short:
        "Useful software should not be held back by recurring bugs, slow workflows or fragile code.",
      problem:
        "Bugs, slow workflows or difficult code are holding back an otherwise useful application.",
      solution:
        "Investigate the bottleneck, agree on priorities and make targeted improvements with appropriate regression checks.",
      deliverables: [
        "Technical assessment",
        "Prioritized fixes and refactoring",
        "Performance review and handover notes",
      ],
      suitable: "Existing React, Next.js and Node.js applications.",
      outcome:
        "Restore confidence in the existing application and make the next change easier to deliver.",
      inquiryType: "5",
    },
  ],
  ar: [
    {
      title: "تطبيقات ويب متكاملة",
      short:
        "تحتاج إلى منتج متكامل، لا واجهة منفصلة عن البيانات وإجراءات العمل.",
      problem: "تحتاج فكرتك إلى تطبيق متكامل بتجربة متناسقة عبر جميع طبقاته.",
      solution:
        "تصميم رحلة المستخدم ونموذج البيانات وربط واجهة حديثة بنظام خلفي منظم.",
      deliverables: [
        "تطبيق ويب متجاوب",
        "نظام خلفي وقاعدة بيانات",
        "مصادقة وتوثيق للنشر",
      ],
      suitable: "منتجات البرمجيات الخدمية وبوابات العملاء ومنصات الويب.",
      outcome:
        "مساحة واضحة للعملاء أو الموظفين لإنجاز مهامهم، مع أساس يمكن تطويره لاحقًا.",
      inquiryType: "0",
    },
    {
      title: "أنظمة أعمال مخصصة",
      short:
        "جداول متفرقة ومتابعات يدوية تجعل معرفة حالة العمل ومسؤولياته أمرًا صعبًا.",
      problem:
        "تجعل الجداول والأدوات المنفصلة تنسيق العمليات اليومية أمرًا صعبًا.",
      solution:
        "فهم سير العمل الفعلي وبناء نظام مركزي بمسؤوليات وقواعد وصول واضحة.",
      deliverables: [
        "نموذج لسير العمل والبيانات",
        "تطبيق بصلاحيات بحسب الدور",
        "واجهات تشغيلية وتوثيق للتسليم",
      ],
      suitable: "العمليات الداخلية وإدارة العملاء وتنسيق الفرق.",
      outcome:
        "ربط السجلات والمهام وتوضيح المسؤوليات والخطوة التالية لكل إجراء.",
      inquiryType: "1",
    },
    {
      title: "لوحات التحكم والأدوات الداخلية",
      short:
        "يحتاج فريقك إلى إدارة البيانات والعمليات دون البحث الطويل أو الرجوع للمطوّر في كل مرة.",
      problem:
        "يحتاج فريقك إلى اتخاذ إجراءات بناءً على المعلومات، لكن الواجهة الحالية تفتقر إلى الوضوح.",
      solution:
        "تصميم شاشات مركزة وفلاتر مفيدة وإجراءات إدارة آمنة حول المهام اليومية.",
      deliverables: [
        "لوحة تحكم متجاوبة",
        "شاشات إدارة وفلاتر",
        "أدوات تحكم بحسب الصلاحيات",
      ],
      suitable: "بوابات الإدارة وفرق العمليات وواجهات التقارير.",
      outcome: "وصول أسهل للمعلومات وإجراءات يومية أوضح للموظفين والإدارة.",
      inquiryType: "2",
    },
    {
      title: "تطوير الأنظمة الخلفية وواجهات API",
      short:
        "يحتاج تطبيقك إلى قواعد أعمال وصلاحيات تُطبّق فعليًا، وليس في الواجهة فقط.",
      problem: "يحتاج تطبيقك إلى منطق أعمال موثوق ونظام خلفي قابل للتطور.",
      solution:
        "تحديد حدود الوحدات والتحقق من المدخلات وفرض المصادقة والصلاحيات على الخادم.",
      deliverables: [
        "واجهة REST موثقة",
        "مصادقة وإدارة صلاحيات",
        "مخطط بيانات ومهام خلفية عند الحاجة",
      ],
      suitable:
        "الأنظمة الخلفية للمنتجات وطبقات الخدمات والمنصات متعددة المستخدمين.",
      outcome:
        "أساس يمكن الاعتماد عليه لربط الواجهات والخدمات وإضافة مزايا جديدة.",
      inquiryType: "3",
    },
    {
      title: "ربط الأنظمة وأتمتة سير العمل",
      short:
        "إعادة إدخال البيانات بين الأدوات تستهلك وقت الفريق وتؤدي إلى سجلات غير متطابقة.",
      problem:
        "يستهلك النقل اليدوي بين الأدوات الوقت ويؤدي إلى بيانات غير متناسقة.",
      solution:
        "ربط الواجهات مع تحديد تحويلات البيانات والتحقق منها ومعالجة الأخطاء وإعادة المحاولة.",
      deliverables: [
        "تكامل API أو Webhook",
        "تحويل البيانات ومعالجة الفشل",
        "توثيق الإعداد والتشغيل",
      ],
      suitable: "خدمات الأطراف الثالثة وأتمتة العمليات ومزامنة البيانات.",
      outcome:
        "تقليل تكرار الإدخال وتوضيح نجاح عمليات الربط أو حاجتها إلى متابعة.",
      inquiryType: "4",
    },
    {
      title: "تحسين التطبيقات القائمة",
      short:
        "تطبيقك مفيد، لكن الأخطاء المتكررة أو بطء الإجراءات أو صعوبة الكود تعيق تطويره.",
      problem:
        "تعيق الأخطاء أو بطء العمليات أو صعوبة الكود تطوير تطبيق مفيد بالفعل.",
      solution:
        "تحديد سبب المشكلة والاتفاق على الأولويات وتنفيذ تحسينات موجّهة مع فحوصات مناسبة.",
      deliverables: [
        "تقييم تقني",
        "إصلاحات وإعادة هيكلة مرتبة بالأولوية",
        "مراجعة أداء وملاحظات تسليم",
      ],
      suitable: "تطبيقات React وNext.js وNode.js القائمة.",
      outcome:
        "تطبيق أكثر استقرارًا، وخطوات أوضح لمعالجة المشكلات وتسهيل التطوير القادم.",
      inquiryType: "5",
    },
  ],
};
