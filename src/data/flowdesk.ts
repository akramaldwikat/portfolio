import type { Locale } from "@/lib/site";

export const caseSectionIds = [
  "overview",
  "problem",
  "target-users",
  "requirements",
  "solution",
  "features",
  "roles",
  "workflow",
  "architecture",
  "database",
  "decisions",
  "security",
  "performance",
  "responsive-ux",
  "stack",
  "challenges",
  "lessons",
  "roadmap",
  "github",
  "live-demo",
] as const;
export type CaseSectionId = (typeof caseSectionIds)[number];
export type CaseSection = {
  id: CaseSectionId;
  title: string;
  description: string;
  items?: { title: string; body: string }[];
  bullets?: string[];
};
type CaseCopy = {
  sections: CaseSection[];
  contents: string;
  plannedFeatures: string;
  permissionCaption: string;
  permissionColumns: string[];
  permissionRows: string[][];
  databaseCaption: string;
  databaseColumns: string[];
  databaseRows: string[][];
  conceptNote: string;
  conceptCaption: string;
  unavailableGithub: string;
  unavailableDemo: string;
  reviewNote: string;
};

const en: CaseCopy = {
  contents: "In this study",
  plannedFeatures: "Planned capabilities",
  permissionCaption: "Proposed permissions within the active organization",
  permissionColumns: ["Action", "Admin", "Manager", "Member"],
  permissionRows: [
    ["Organization settings & membership", "Manage", "No access", "No access"],
    ["Clients & projects", "Manage", "Manage", "Assigned projects only"],
    ["Tasks & Kanban", "Manage", "Manage", "Update assigned tasks"],
    ["Activity logs", "Organization-wide", "Managed projects", "Own activity"],
  ],
  databaseCaption: "Proposed relational model — entities and integrity rules",
  databaseColumns: ["Entity", "Relationship / rule"],
  databaseRows: [
    [
      "User · Membership · Organization",
      "Users join organizations through Membership. The role belongs to membership, not globally to the user.",
    ],
    [
      "Client · Project",
      "An organization owns clients and projects. A project may reference a client within the same organization.",
    ],
    [
      "Task · Assignment",
      "Each task belongs to a project. Assignees must be members of that project’s organization.",
    ],
    [
      "ActivityEvent · Notification",
      "Activity records identify actor, organization, resource and action. Notifications reference recipients and delivery state.",
    ],
  ],
  conceptNote:
    "No working application screenshots are available yet. This original interface concept uses sample data to explore layout; it is not evidence of implemented features or measured results.",
  conceptCaption:
    "Interface concept only · illustrative data · not a live application",
  unavailableGithub:
    "Not published yet. A public repository will be linked after the initial implementation and a source review.",
  unavailableDemo:
    "Not available yet. A demo will be linked only when an isolated, working application is ready.",
  reviewNote:
    "This is a design-stage engineering study. The decisions below are proposals to validate during implementation, not results from a deployed product.",
  sections: [
    {
      id: "overview",
      title: "Overview",
      description:
        "FlowDesk is an independent portfolio project exploring business operations for small and medium-sized teams. This study sets out the product scope, system model and intended engineering approach. Application development is not complete, and no customer commissioned this work.",
    },
    {
      id: "problem",
      title: "The problem",
      description:
        "A client record in a spreadsheet, project updates in chat and tasks in another tool leave teams piecing together the same story. Handoffs become difficult to track, responsibility is unclear and status reporting depends on manual follow-up. This is the operational scenario the project is designed to explore; no customer research or business results are claimed.",
    },
    {
      id: "target-users",
      title: "Target users",
      description:
        "The proposed workspace serves three operational perspectives within the same organization.",
      items: [
        {
          title: "Business owners & administrators",
          body: "Control membership and workspace settings while keeping organization data separated.",
        },
        {
          title: "Project & operations managers",
          body: "Connect client context with delivery plans, assign work and review project progress.",
        },
        {
          title: "Team members",
          body: "See relevant projects, understand assigned work and update tasks without unnecessary administration.",
        },
      ],
    },
    {
      id: "requirements",
      title: "Requirements",
      description:
        "Start with a small, testable operational core before adding reports or automation.",
      bullets: [
        "Users can authenticate and work only within organizations they belong to.",
        "Client, project and task records have explicit ownership and validation rules.",
        "Admin, Manager and Member permissions are enforced by the API.",
        "Task state changes are recorded and conflicting edits are handled explicitly.",
        "Key workflows remain usable on a phone and with a keyboard.",
        "Empty, loading, forbidden and failure states provide a useful next action.",
      ],
    },
    {
      id: "solution",
      title: "Solution",
      description:
        "A central, organization-based workspace would link a client to its projects and each project to its tasks. Role-aware views would reduce irrelevant controls while preserving context. The intended business outcome is clearer ownership and fewer manual handoffs; implementation and user validation are still needed to assess that outcome.",
    },
    {
      id: "features",
      title: "Core features",
      description:
        "These capabilities define the intended product scope. They are planned, not a list of completed functionality.",
      bullets: [
        "Authentication and organization selection",
        "Organization settings and member management",
        "Role-based access control",
        "Client records and project relationships",
        "Projects, tasks and a Kanban board",
        "Dashboard analytics based on organization-scoped data",
        "Notifications and activity logs",
        "Personal and workspace settings",
      ],
    },
    {
      id: "roles",
      title: "Roles & permissions",
      description:
        "Permissions attach to an active organization membership. An Admin in one organization must not inherit that access in another. The matrix is a proposed policy, with resource-level checks required for each API operation.",
    },
    {
      id: "workflow",
      title: "System workflow",
      description:
        "A proposed path from business context to day-to-day delivery.",
      items: [
        {
          title: "Establish the workspace",
          body: "An Admin creates the organization, invites members and assigns roles.",
        },
        {
          title: "Connect the work",
          body: "A Manager adds a client and creates a project with clear ownership.",
        },
        {
          title: "Coordinate delivery",
          body: "Tasks are assigned to organization members and move through explicit states.",
        },
        {
          title: "Record & notify",
          body: "A valid state change commits with its activity event; queued notifications run after the transaction succeeds.",
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      description:
        "The planned Next.js application handles interfaces and rendering. A modular NestJS REST API owns business rules, authorization and input validation. PostgreSQL and Prisma manage relational data. The API also coordinates integrations and optional Redis/BullMQ notification jobs. Data storage and job processing are separate concerns, not a chain of database dependencies.",
    },
    {
      id: "database",
      title: "Database design overview",
      description:
        "A relational model fits the connected nature of clients, projects and tasks. Organization identifiers scope business records; foreign keys, unique constraints and transactions protect relationships. Composite constraints should prevent a project from referencing a client in another organization. The schema below is a design overview, not a published migration.",
    },
    {
      id: "decisions",
      title: "Engineering decisions",
      description:
        "Choose boundaries that solve the current problem without introducing unnecessary operational overhead.",
      items: [
        {
          title: "A modular monolith first",
          body: "Keep clients, projects, tasks and membership in explicit modules inside one backend. Splitting services would need a demonstrated scaling or ownership reason.",
        },
        {
          title: "Central, resource-aware authorization",
          body: "Evaluate membership, role and organization ownership together. Hiding a button is a usability choice, not an authorization boundary.",
        },
        {
          title: "Transactions before side effects",
          body: "Commit the business change and activity record together. An outbox or equivalent durable handoff should make notification dispatch recoverable.",
        },
        {
          title: "Explicit API contracts",
          body: "Validate request DTOs and return consistent error shapes. Keep data access and business logic out of UI components.",
        },
      ],
    },
    {
      id: "security",
      title: "Security considerations",
      description:
        "Security needs verification at boundaries, including paths the interface does not expose.",
      bullets: [
        "Use a maintained authentication approach; protect session cookies with HttpOnly, Secure and an appropriate SameSite policy.",
        "Check organization membership and resource ownership on every protected API operation; test denied cross-organization access.",
        "Validate request bodies, paginate list endpoints and rate-limit authentication and sensitive mutations.",
        "Keep secrets server-side, restrict CORS and apply CSRF protection where cookie-based mutations require it.",
        "Avoid logging secrets or sensitive payloads; define activity-log retention, backup and recovery policies.",
      ],
    },
    {
      id: "performance",
      title: "Performance considerations",
      description:
        "There are no production benchmarks yet. The implementation should measure query count, response time and user-facing rendering before optimizing.",
      items: [
        {
          title: "Bound data access",
          body: "Paginate lists, select only required fields and index common organization/status filters. Review query plans as the dataset grows.",
        },
        {
          title: "Keep rendering focused",
          body: "Use server rendering for suitable screens and small client components for Kanban interactions. Avoid fetching entire workspaces for a single view.",
        },
        {
          title: "Use background work selectively",
          body: "Queue notifications that do not belong in a request’s critical path. Cache only measured hot paths, with explicit invalidation and tenant-safe keys.",
        },
      ],
    },
    {
      id: "responsive-ux",
      title: "Responsive UX",
      description:
        "The desktop design would support scanning and management; mobile views would prioritize assigned tasks and focused edits. Kanban should offer an accessible list view and explicit status controls so drag-and-drop is never the only way to move a task. Dense tables should adapt to contextual summaries, with keyboard focus and error recovery designed alongside the normal path.",
    },
    {
      id: "stack",
      title: "Technology stack",
      description:
        "Proposed technologies, selected for the requirements above. Redis and BullMQ would support background work only when that part of the application is implemented.",
    },
    {
      id: "challenges",
      title: "Technical challenges",
      description:
        "The difficult parts sit in the interactions between modules, rather than the number of screens.",
      items: [
        {
          title: "Tenant isolation everywhere",
          body: "List queries, lookups, exports and background jobs all need organization context. Test identifiers from a different organization, not just missing IDs.",
        },
        {
          title: "Concurrent task updates",
          body: "Define a conflict policy, such as optimistic version checks, so one user does not silently overwrite another’s change.",
        },
        {
          title: "Retryable jobs",
          body: "A worker may process a job more than once. Use idempotency keys, bounded retries and visible failure states rather than assuming exactly-once delivery.",
        },
      ],
    },
    {
      id: "lessons",
      title: "Design review & improvements",
      description:
        "These are findings from the design exercise, not lessons claimed from production use.",
      bullets: [
        "Write the access matrix before building screens; it exposes ambiguous responsibilities early.",
        "Keep the first release centered on membership, clients, projects and tasks. Reporting should follow reliable data.",
        "Make failed updates, permission changes and empty workspaces part of the UX specification.",
        "Validate whether the proposed central workspace actually fits users’ habits before expanding the feature set.",
      ],
    },
    {
      id: "roadmap",
      title: "Future roadmap",
      description:
        "A staged implementation plan, without invented delivery dates or completion claims.",
      items: [
        {
          title: "01 · Establish the foundation",
          body: "Implement authentication, membership, organization isolation and permission tests.",
        },
        {
          title: "02 · Complete the operational core",
          body: "Build clients, projects, tasks and accessible board/list views; test complete workflows.",
        },
        {
          title: "03 · Add operational visibility",
          body: "Introduce activity events, recovery-aware notifications and reports from validated data.",
        },
        {
          title: "04 · Publish verifiable work",
          body: "Review the source, document setup and publish a safe demo with clearly labeled sample data.",
        },
      ],
    },
    {
      id: "github",
      title: "GitHub",
      description:
        "The repository link will appear here when real source code is available to review.",
    },
    {
      id: "live-demo",
      title: "Live demo",
      description:
        "A public application demo is a future milestone, not a currently available feature.",
    },
  ],
};
const ar: CaseCopy = {
  contents: "في هذه الدراسة",
  plannedFeatures: "المزايا المخطط لها",
  permissionCaption: "الصلاحيات المقترحة داخل المؤسسة الحالية",
  permissionColumns: ["الإجراء", "المسؤول", "المدير", "عضو الفريق"],
  permissionRows: [
    ["إعدادات المؤسسة والعضويات", "إدارة", "غير متاح", "غير متاح"],
    ["العملاء والمشاريع", "إدارة", "إدارة", "المشاريع المسندة فقط"],
    ["المهام ولوحة كانبان", "إدارة", "إدارة", "تحديث المهام المسندة"],
    ["سجل النشاط", "على مستوى المؤسسة", "المشاريع التي يديرها", "نشاطه الشخصي"],
  ],
  databaseCaption: "نموذج البيانات العلائقية المقترح والعلاقات الأساسية",
  databaseColumns: ["الكيان", "العلاقة أو القاعدة"],
  databaseRows: [
    [
      "User · Membership · Organization",
      "ينضم المستخدم إلى المؤسسة عبر عضوية. يرتبط الدور بهذه العضوية، ولا يُمنح للمستخدم على مستوى جميع المؤسسات.",
    ],
    [
      "Client · Project",
      "تملك المؤسسة سجلات العملاء والمشاريع. يجب أن يكون عميل المشروع تابعًا للمؤسسة نفسها.",
    ],
    [
      "Task · Assignment",
      "تتبع كل مهمة مشروعًا، ويجب أن يكون المكلّف بها عضوًا في مؤسسة المشروع.",
    ],
    [
      "ActivityEvent · Notification",
      "يسجّل حدث النشاط الشخص والمؤسسة والمورد والإجراء. ويرتبط الإشعار بالمستلم وحالة الإرسال.",
    ],
  ],
  conceptNote:
    "لا تتوفر لقطات لتطبيق يعمل حتى الآن. الرسم التالي تصوّر أصلي للواجهة ببيانات توضيحية لدراسة توزيع المحتوى، وليس دليلًا على تنفيذ المزايا أو تحقيق نتائج.",
  conceptCaption: "تصوّر للواجهة فقط · بيانات توضيحية · ليس تطبيقًا منشورًا",
  unavailableGithub:
    "لم يُنشر بعد. سيُضاف رابط المستودع بعد تنفيذ النسخة الأولية ومراجعة الشيفرة المعدّة للنشر.",
  unavailableDemo:
    "غير متاح حاليًا. سيُضاف العرض عندما يجهز تطبيق مستقل يعمل ببيانات تجريبية آمنة.",
  reviewNote:
    "هذه دراسة هندسية في مرحلة التصميم. القرارات الواردة مقترحات تحتاج إلى التحقق أثناء التنفيذ، وليست نتائج لنظام منشور.",
  sections: [
    {
      id: "overview",
      title: "نظرة عامة",
      description:
        "FlowDesk مشروع مستقل لاستكشاف إدارة عمليات الأعمال لدى الفرق الصغيرة والمتوسطة. توضّح هذه الدراسة نطاق المنتج ونموذج النظام والنهج الهندسي المقترح. تطوير التطبيق لم يكتمل، ولم يُنفّذ المشروع بتكليف من عميل.",
    },
    {
      id: "problem",
      title: "المشكلة",
      description:
        "سجل عميل في جدول، وتحديث مشروع في محادثة، ومهمة في أداة أخرى؛ يضطر الفريق إلى جمع السياق نفسه من أكثر من مكان. تصعب متابعة انتقال العمل وتتداخل المسؤوليات ويصبح معرفة التقدم مرتبطًا بالسؤال اليدوي. هذا هو السيناريو الذي تستكشفه الدراسة، دون ادعاء إجراء بحث مع عملاء أو تحقيق نتائج تجارية.",
    },
    {
      id: "target-users",
      title: "المستخدمون المستهدفون",
      description:
        "تجمع مساحة العمل المقترحة ثلاثة أدوار تشغيلية ضمن المؤسسة نفسها.",
      items: [
        {
          title: "أصحاب الأعمال ومسؤولو النظام",
          body: "إدارة العضويات وإعدادات مساحة العمل، مع فصل بيانات كل مؤسسة عن غيرها.",
        },
        {
          title: "مديرو المشاريع والعمليات",
          body: "ربط معلومات العميل بخطة التنفيذ، وتوزيع المهام ومتابعة تقدم المشاريع.",
        },
        {
          title: "أعضاء الفريق",
          body: "معرفة المشاريع ذات الصلة والمهام المسندة وتحديثها دون الدخول في تفاصيل إدارية غير لازمة.",
        },
      ],
    },
    {
      id: "requirements",
      title: "المتطلبات",
      description:
        "تبدأ الخطة بنطاق تشغيلي محدود يمكن اختباره، قبل إضافة التقارير والأتمتة.",
      bullets: [
        "مصادقة المستخدم وحصر عمله بالمؤسسات التي ينتمي إليها.",
        "تحديد ملكية سجلات العملاء والمشاريع والمهام وقواعد التحقق منها.",
        "فرض صلاحيات المسؤول والمدير والعضو في الواجهة البرمجية.",
        "تسجيل تغييرات حالة المهمة ومعالجة تعارض التعديلات بوضوح.",
        "إتاحة الإجراءات الأساسية على الهاتف وباستخدام لوحة المفاتيح.",
        "تصميم حالات الفراغ والتحميل ورفض الصلاحية والفشل مع خطوة تالية مفهومة.",
      ],
    },
    {
      id: "solution",
      title: "الحل المقترح",
      description:
        "مساحة عمل مركزية على مستوى المؤسسة، تربط العميل بمشاريعه وكل مشروع بمهامه. تعرض الواجهة ما يناسب دور المستخدم مع الحفاظ على سياق العمل. الهدف هو توضيح المسؤوليات وتقليل المتابعة اليدوية؛ ويتطلب تقييم هذه القيمة تنفيذ التطبيق والتحقق منه مع المستخدمين.",
    },
    {
      id: "features",
      title: "المزايا الأساسية",
      description:
        "تحدّد المزايا التالية نطاق المنتج المستهدف، وهي مخطط لها وليست وظائف مكتملة.",
      bullets: [
        "المصادقة واختيار المؤسسة",
        "إعدادات المؤسسة وإدارة الأعضاء",
        "صلاحيات بحسب الدور",
        "سجلات العملاء وربطها بالمشاريع",
        "المشاريع والمهام ولوحة كانبان",
        "لوحة مؤشرات تعتمد على بيانات المؤسسة",
        "الإشعارات وسجل النشاط",
        "إعدادات الحساب ومساحة العمل",
      ],
    },
    {
      id: "roles",
      title: "الأدوار والصلاحيات",
      description:
        "ترتبط الصلاحيات بعضوية المستخدم في المؤسسة الحالية. لا تمنح صلاحية المسؤول في مؤسسة ما وصولًا تلقائيًا إلى مؤسسة أخرى. المصفوفة التالية سياسة مقترحة، ويجب التحقق من المورد المطلوب في كل عملية برمجية.",
    },
    {
      id: "workflow",
      title: "سير العمل",
      description: "مسار مقترح يربط سياق الأعمال بالتنفيذ اليومي.",
      items: [
        {
          title: "تجهيز مساحة العمل",
          body: "ينشئ المسؤول المؤسسة ويدعو الأعضاء ويحدّد أدوارهم.",
        },
        {
          title: "ربط العمل بسياقه",
          body: "يضيف المدير العميل وينشئ مشروعًا بمسؤوليات واضحة.",
        },
        {
          title: "تنسيق التنفيذ",
          body: "تُسند المهام إلى أعضاء المؤسسة وتنتقل بين حالات محددة.",
        },
        {
          title: "التسجيل والإشعار",
          body: "يُحفظ التغيير الصحيح مع حدث النشاط، ثم تُرسل الإشعارات بعد نجاح معاملة قاعدة البيانات.",
        },
      ],
    },
    {
      id: "architecture",
      title: "البنية التقنية",
      description:
        "يتولى تطبيق Next.js الواجهات والعرض، بينما تدير واجهة REST مبنية باستخدام NestJS قواعد الأعمال والصلاحيات والتحقق من المدخلات. تتولى PostgreSQL وPrisma البيانات العلائقية. وتنسّق الواجهة البرمجية أيضًا التكاملات ومهام الإشعار الاختيارية عبر Redis وBullMQ. تخزين البيانات ومعالجة المهام مسؤوليتان منفصلتان، وليستا سلسلة من قواعد بيانات تعتمد إحداها على الأخرى.",
    },
    {
      id: "database",
      title: "تصميم قاعدة البيانات",
      description:
        "يناسب النموذج العلائقي ترابط العملاء والمشاريع والمهام. تُربط السجلات بمعرّف المؤسسة، وتحمي المفاتيح والقيود والمعاملات العلاقات بينها. ينبغي أن تمنع القيود المركبة ربط مشروع بعميل من مؤسسة أخرى. النموذج هنا تصور للتصميم، وليس مخطط ترحيل منشورًا.",
    },
    {
      id: "decisions",
      title: "القرارات الهندسية",
      description:
        "اختيار حدود واضحة تحل المشكلة الحالية دون تعقيد تشغيلي غير لازم.",
      items: [
        {
          title: "تطبيق خلفي موحّد بوحدات مستقلة",
          body: "فصل العملاء والمشاريع والمهام والعضويات إلى وحدات واضحة داخل نظام خلفي واحد. فصل الخدمات لاحقًا يحتاج إلى سبب فعلي يتعلق بالتوسع أو مسؤولية الفرق.",
        },
        {
          title: "صلاحيات مركزية تراعي المورد",
          body: "التحقق من العضوية والدور وملكية المؤسسة معًا. إخفاء زر في الواجهة لا يحمي العملية البرمجية.",
        },
        {
          title: "حفظ التغيير قبل تنفيذ آثاره",
          body: "حفظ تعديل الأعمال وحدث النشاط ضمن معاملة واحدة، ثم تمرير الإشعارات عبر آلية موثوقة مثل نمط Outbox تسمح بالتعافي من الفشل.",
        },
        {
          title: "عقود واضحة للواجهات البرمجية",
          body: "التحقق من نماذج الطلبات وإرجاع أخطاء بصيغة متناسقة، مع فصل الوصول للبيانات وقواعد الأعمال عن مكونات الواجهة.",
        },
      ],
    },
    {
      id: "security",
      title: "اعتبارات الأمان",
      description:
        "يجب اختبار حدود الأمان، بما فيها المسارات التي لا تعرضها الواجهة للمستخدم.",
      bullets: [
        "استخدام أسلوب مصادقة مدعوم وحماية ملفات الجلسة بخيارات HttpOnly وSecure وسياسة SameSite مناسبة.",
        "التحقق من عضوية المؤسسة وملكية المورد في كل طلب محمي، واختبار رفض الوصول بين المؤسسات.",
        "التحقق من الطلبات وتقسيم القوائم إلى صفحات وتقييد محاولات المصادقة والتعديلات الحساسة.",
        "إبقاء الأسرار على الخادم وضبط CORS وإضافة حماية CSRF عندما تتطلبها العمليات المعتمدة على ملفات الجلسة.",
        "عدم تسجيل الأسرار أو محتوى الطلبات الحساس، وتحديد سياسات الاحتفاظ بالسجلات والنسخ الاحتياطي والاستعادة.",
      ],
    },
    {
      id: "performance",
      title: "اعتبارات الأداء",
      description:
        "لا توجد قياسات أداء إنتاجية حتى الآن. ينبغي قياس عدد الاستعلامات وزمن الاستجابة وتجربة العرض قبل اختيار التحسينات.",
      items: [
        {
          title: "ضبط الوصول إلى البيانات",
          body: "تقسيم القوائم واختيار الحقول المطلوبة وفهرسة مرشحات المؤسسة والحالة الشائعة، ثم مراجعة خطط الاستعلام مع نمو البيانات.",
        },
        {
          title: "عرض ما يحتاجه المستخدم",
          body: "استخدام العرض على الخادم حيث يناسب، ومكونات عميلة محدودة لتفاعلات كانبان، وتجنّب جلب بيانات مساحة العمل كاملة لشاشة واحدة.",
        },
        {
          title: "مهام خلفية عند الحاجة",
          body: "فصل الإشعارات غير الضرورية لإتمام الطلب في طابور مهام. لا تُضاف ذاكرة تخزين مؤقت إلا لمسار ثبتت حاجته، بمفاتيح معزولة لكل مؤسسة وآلية تحديث واضحة.",
        },
      ],
    },
    {
      id: "responsive-ux",
      title: "تجربة الاستخدام المتجاوبة",
      description:
        "يركّز سطح المكتب على استعراض المعلومات وإدارتها، بينما تعطي واجهات الهاتف الأولوية للمهام المسندة والتعديلات المحددة. ينبغي توفير قائمة بديلة للوحة كانبان وأزرار صريحة لتغيير الحالة، حتى لا يكون السحب والإفلات الوسيلة الوحيدة. وتتحول الجداول الكثيفة إلى ملخصات مناسبة للسياق، مع تصميم التركيز بلوحة المفاتيح والتعافي من الأخطاء منذ البداية.",
    },
    {
      id: "stack",
      title: "التقنيات المقترحة",
      description:
        "تقنيات مقترحة لتلبية المتطلبات السابقة. يُستخدم Redis وBullMQ للمهام الخلفية عندما يصل التنفيذ إلى هذه المرحلة فقط.",
    },
    {
      id: "challenges",
      title: "التحديات التقنية",
      description: "تكمن الصعوبة في العلاقات بين الوحدات، وليس في عدد الشاشات.",
      items: [
        {
          title: "عزل المؤسسات في جميع المسارات",
          body: "تحتاج القوائم وعمليات البحث والتصدير والمهام الخلفية إلى سياق المؤسسة. يجب اختبار معرّفات من مؤسسة أخرى، وليس معرّفات غير موجودة فحسب.",
        },
        {
          title: "تزامن تعديلات المهام",
          body: "تحديد سياسة للتعارض، مثل التحقق من إصدار السجل، لمنع تعديل مستخدم من استبدال تعديل آخر بصمت.",
        },
        {
          title: "إعادة محاولة المهام بأمان",
          body: "قد يعالج العامل المهمة أكثر من مرة. تُستخدم مفاتيح تمنع تكرار الأثر ومحاولات محدودة وحالات فشل واضحة بدل افتراض الإرسال مرة واحدة دائمًا.",
        },
      ],
    },
    {
      id: "lessons",
      title: "مراجعة التصميم والتحسينات",
      description:
        "هذه ملاحظات من دراسة التصميم، وليست دروسًا مستخلصة من تشغيل منتج منشور.",
      bullets: [
        "كتابة مصفوفة الصلاحيات قبل الشاشات تكشف غموض المسؤوليات مبكرًا.",
        "حصر النسخة الأولى في العضويات والعملاء والمشاريع والمهام، وإضافة التقارير بعد موثوقية البيانات.",
        "إدراج فشل التحديث وتغيّر الصلاحيات ومساحة العمل الفارغة ضمن متطلبات تجربة المستخدم.",
        "التحقق من ملاءمة مساحة العمل المقترحة لطريقة عمل المستخدمين قبل توسيع المزايا.",
      ],
    },
    {
      id: "roadmap",
      title: "خارطة التطوير القادمة",
      description: "خطة تنفيذ على مراحل، دون مواعيد أو نسب إنجاز غير مثبتة.",
      items: [
        {
          title: "01 · تأسيس النظام",
          body: "تنفيذ المصادقة والعضويات وعزل المؤسسات واختبارات الصلاحيات.",
        },
        {
          title: "02 · استكمال العمليات الأساسية",
          body: "بناء العملاء والمشاريع والمهام وواجهات اللوحة والقائمة الميسّرة، واختبار سير العمل كاملًا.",
        },
        {
          title: "03 · متابعة العمليات",
          body: "إضافة أحداث النشاط وإشعارات قابلة للتعافي وتقارير مبنية على بيانات موثوقة.",
        },
        {
          title: "04 · نشر عمل يمكن مراجعته",
          body: "مراجعة الشيفرة وتوثيق الإعداد ونشر عرض آمن ببيانات تجريبية موسومة بوضوح.",
        },
      ],
    },
    {
      id: "github",
      title: "مستودع GitHub",
      description:
        "سيظهر رابط المستودع عندما تتوفر شيفرة فعلية جاهزة للمراجعة العامة.",
    },
    {
      id: "live-demo",
      title: "العرض المباشر",
      description: "نشر عرض يعمل هو مرحلة مستقبلية، وليس ميزة متاحة حاليًا.",
    },
  ],
};
export const flowdesk: Record<Locale, CaseCopy> = { en, ar };
