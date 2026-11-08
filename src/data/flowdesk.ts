import type { Locale } from "@/lib/site";

export type CaseSection = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  items?: { title: string; body: string }[];
};

type CaseCopy = {
  contents: string;
  demo: string;
  github: string;
  newTab: string;
  wakeNote: string;
  discuss: string;
  technologies: string;
  proof: string[];
  architecture: string[][];
  workflow: string[];
  permissionCaption: string;
  permissionColumns: string[];
  permissionRows: string[][];
  databaseCaption: string;
  databaseColumns: string[];
  databaseRows: string[][];
  sections: CaseSection[];
};

export const flowdesk: Record<Locale, CaseCopy> = {
  en: {
    contents: "In this case study",
    demo: "Live Demo",
    github: "GitHub",
    newTab: "opens in a new tab",
    wakeNote:
      "The free-tier demo may take around 1–2 minutes to wake after inactivity.",
    discuss: "Discuss a Similar Project",
    technologies: "Built with",
    proof: [
      "Full-stack design and implementation",
      "54 automated tests passed",
      "Deployed on Render and Neon",
    ],
    architecture: [
      ["Browser", "Responsive workspace"],
      ["Next.js", "Render Free web · same-origin /api proxy"],
      ["NestJS API", "Render Free API · authorization and business rules"],
      ["Neon PostgreSQL", "Neon Free · relational data via Prisma"],
    ],
    workflow: [
      "Organization",
      "Team",
      "Clients",
      "Projects",
      "Tasks",
      "Assignment",
      "Progress",
      "Completion",
      "Activity",
    ],
    permissionCaption: "Workspace permissions by role",
    permissionColumns: ["Role", "Workspace permissions"],
    permissionRows: [
      [
        "Admin",
        "Manages the organization, membership and business records. Can view organization-wide activity.",
      ],
      [
        "Manager",
        "Manages clients, projects and tasks, including assignment and status. Can view business activity.",
      ],
      [
        "Member",
        "Reads workspace records, updates the status of assigned tasks in active projects, and sees their own activity.",
      ],
    ],
    databaseCaption: "Core entities and relationships",
    databaseColumns: ["Entity", "Relationship or responsibility"],
    databaseRows: [
      [
        "User",
        "Joins organizations through Membership and owns refresh sessions.",
      ],
      [
        "Organization",
        "Owns memberships, clients, projects, tasks and audit events.",
      ],
      [
        "Membership",
        "Links a user to an organization, defines their role and can receive task assignments.",
      ],
      ["Client", "Belongs to an organization and can have multiple projects."],
      [
        "Project",
        "Belongs to a client within the same organization and groups tasks.",
      ],
      [
        "Task",
        "Belongs to a project and can be assigned to a membership in the same organization.",
      ],
      [
        "RefreshSession",
        "Tracks a user's refresh session, rotation and revocation.",
      ],
      ["AuditEvent", "Records a change and its actor in the organization."],
      ["AuthThrottle", "Tracks rate limits for authentication attempts."],
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        description:
          "FlowDesk is a business operations workspace for small teams. I designed, built, tested and deployed it as an independent portfolio project to demonstrate full-stack engineering through a realistic workflow. The demo uses fictional records.",
      },
      {
        id: "problem",
        title: "The business problem",
        description:
          "When client records, project updates and tasks live in different tools, teams lose the link between the work, its owner and its progress. This portfolio project explores how a shared workspace can bring those records together.",
      },
      {
        id: "workflow",
        title: "From client work to completion",
        description:
          "A team works in an organization. Clients group projects, projects contain tasks, and assigned work moves from To do through In progress and Review to Done. The dashboard and activity history give the team different views of the same records.",
      },
      {
        id: "features",
        title: "Implemented capabilities",
        description:
          "The operational core covers the everyday work of a small team, with access determined by workspace membership and role.",
        bullets: [
          "Sign-in, session management, organizations and membership",
          "Clients, projects, task assignment and a responsive task board",
          "Dashboard totals and an activity log backed by business records",
          "Predefined reviewer accounts, restricted public-demo actions and bounded quotas",
        ],
      },
      {
        id: "screenshots",
        title: "The application in use",
        description:
          "These captures show the running FlowDesk application with fictional seed data. They cover the desktop workspace and a mobile project view.",
      },
      {
        id: "roles",
        title: "Role-based access",
        description:
          "The API checks capabilities on each protected action. The shared demo also restricts workspace administration and destructive actions to protect the sample data.",
      },
      {
        id: "tenancy",
        title: "Organization isolation",
        description:
          "Every tenant operation checks current membership and scopes queries to the organization. Composite foreign keys independently prevent cross-organization references between clients, projects, tasks and assignees. Negative tests attempt foreign reads, writes and assignments to verify those boundaries.",
      },
      {
        id: "architecture",
        title: "Deployed architecture",
        description:
          "The browser sends authenticated traffic to the Next.js same-origin API proxy. NestJS applies business rules and authorization, and Prisma connects it to Neon PostgreSQL. The web and API run as separate Render Free services.",
      },
      {
        id: "database",
        title: "Relational data model",
        description:
          "An organization owns the operational records. Membership links a person and role to that organization, while database constraints keep project and assignment relationships within the same tenant.",
      },
      {
        id: "security",
        title: "Authentication and sessions",
        description:
          "Passwords are hashed with Argon2id. Short-lived access tokens and rotating refresh tokens are stored in HttpOnly cookies. The API checks session revocation on protected requests and revokes the refresh-session family if a rotated token is replayed.",
      },
      {
        id: "decisions",
        title: "Engineering decisions and trade-offs",
        description:
          "The main challenges were keeping records isolated, making concurrent updates predictable, and keeping the demo usable on shared free infrastructure.",
        items: [
          {
            title: "Consistent writes and audit history",
            body: "A business change and its audit event commit together. Task versions reject stale writes so one update cannot silently overwrite another.",
          },
          {
            title: "Public demo controls",
            body: "Predefined accounts, bounded storage and write quotas, and a protected reset procedure keep the shared demo usable. Public registration is closed.",
          },
          {
            title: "Recovery after inactivity",
            body: "When the API is waking, the web app briefly disables sign-in and sends a bounded, credential-free health request from the browser. Once health returns, authenticated traffic continues through the same-origin proxy. This avoids mistaking startup delay for invalid credentials.",
          },
          {
            title: "Task board on narrow screens",
            body: "The board stacks its columns on mobile and uses labeled status selectors, so a task can be updated with touch or keyboard without dragging.",
          },
        ],
      },
      {
        id: "testing",
        title: "Automated verification",
        description:
          "54 automated tests passed. They cover authentication, role permissions, tenant isolation, foreign organization references, refresh rotation and revocation, task transitions and stale writes, demo restrictions, and wake recovery.",
      },
      {
        id: "hosted-validation",
        title: "Hosted verification",
        description:
          "Hosted checks were recorded separately from the automated suite. The verified web release was 63c4751.",
        bullets: [
          "Desktop checks and 390×844 Chrome verification of the Member workspace",
          "Admin, Manager and Member permission checks, including assigned-task updates and denied actions",
          "Render cold-start recovery, Neon reconnect after idle, and HTTPS cookie behavior",
        ],
      },
      {
        id: "limitations",
        title: "Known limitations",
        description:
          "The public demo runs on free tiers and has no production SLA. Billing, AI, realtime collaboration, external integrations, notifications, password recovery and MFA are outside its scope. To explore the shared workspace, request a fictional reviewer account from Akram.",
      },
    ],
  },
  ar: {
    contents: "محتويات دراسة المشروع",
    demo: "العرض التجريبي",
    github: "GitHub",
    newTab: "يفتح في علامة تبويب جديدة",
    wakeNote:
      "يعمل العرض على استضافة مجانية، وقد يستغرق بدء الخدمة بعد الخمول نحو دقيقة إلى دقيقتين.",
    discuss: "ناقش مشروعًا مشابهًا",
    technologies: "التقنيات المستخدمة",
    proof: [
      "تصميم وتنفيذ متكاملان",
      "نجح 54 اختبارًا آليًا",
      "منشور على Render وNeon",
    ],
    architecture: [
      ["المتصفح", "واجهة عمل متجاوبة"],
      [
        "Next.js",
        "خدمة الويب على Render Free · تمرير الطلبات عبر المسار ‎/api‎ من نفس المصدر",
      ],
      ["NestJS API", "خدمة API على Render Free · الصلاحيات وقواعد الأعمال"],
      ["Neon PostgreSQL", "خطة Neon المجانية · بيانات علائقية عبر Prisma"],
    ],
    workflow: [
      "المؤسسة",
      "الفريق",
      "العملاء",
      "المشاريع",
      "المهام",
      "إسناد العمل",
      "متابعة التقدم",
      "الإنجاز",
      "سجل النشاط",
    ],
    permissionCaption: "صلاحيات مساحة العمل حسب الدور",
    permissionColumns: ["الدور", "الصلاحيات"],
    permissionRows: [
      [
        "المسؤول (Admin)",
        "يدير المؤسسة والعضويات وسجلات العمل، ويطّلع على نشاط المؤسسة بالكامل.",
      ],
      [
        "المدير (Manager)",
        "يدير العملاء والمشاريع والمهام، بما في ذلك إسنادها وتحديث حالتها، ويطّلع على نشاط العمل.",
      ],
      [
        "العضو (Member)",
        "يطّلع على سجلات مساحة العمل، ويحدّث حالة المهام المسندة إليه في المشاريع النشطة، ويرى نشاطه الشخصي.",
      ],
    ],
    databaseCaption: "الكيانات الأساسية والعلاقات بينها",
    databaseColumns: ["الكيان", "العلاقة أو الوظيفة"],
    databaseRows: [
      ["User", "ينضم إلى المؤسسات عبر العضوية، وترتبط به جلسات التجديد."],
      [
        "Organization",
        "تتبع لها العضويات والعملاء والمشاريع والمهام وأحداث سجل النشاط.",
      ],
      [
        "Membership",
        "تربط المستخدم بالمؤسسة، وتحدد دوره، وتتيح إسناد المهام إليه.",
      ],
      ["Client", "يتبع لمؤسسة واحدة وقد ترتبط به عدة مشاريع."],
      ["Project", "يرتبط بعميل داخل المؤسسة نفسها ويضم مجموعة من المهام."],
      ["Task", "تتبع لمشروع، ويمكن إسنادها إلى عضو في المؤسسة نفسها."],
      ["RefreshSession", "تتتبّع جلسة التجديد وتدويرها وإبطالها."],
      ["AuditEvent", "يوثّق التغيير داخل المؤسسة وهوية من أجراه."],
      ["AuthThrottle", "يسجّل محاولات المصادقة لتطبيق حدود المعدّل."],
    ],
    sections: [
      {
        id: "overview",
        title: "نظرة عامة",
        description:
          "FlowDesk مساحة عمل لإدارة عمليات الفرق الصغيرة. صمّمت المشروع ونفّذته واختبرته ونشرته ضمن أعمالي المستقلة لعرض هندسة تطبيق متكامل حول سير عمل واقعي. جميع السجلات المعروضة في النسخة التجريبية خيالية.",
      },
      {
        id: "problem",
        title: "مشكلة العمل",
        description:
          "حين تتوزع سجلات العملاء وتحديثات المشاريع والمهام على أدوات مختلفة، يصعب معرفة من يتولى العمل وإلى أين وصل. يستكشف المشروع جمع هذه السجلات في مساحة عمل مشتركة تربط المسؤولية بالتقدم.",
      },
      {
        id: "workflow",
        title: "من عمل العميل إلى الإنجاز",
        description:
          "يعمل الفريق ضمن مؤسسة. لكل عميل مشاريعه، ولكل مشروع مهامه، وتنتقل المهام المسندة من قائمة الانتظار إلى التنفيذ والمراجعة ثم الإنجاز. تعرض لوحة المعلومات وسجل النشاط جوانب مختلفة من السجلات نفسها.",
      },
      {
        id: "features",
        title: "الوظائف المنفّذة",
        description:
          "يغطي التطبيق العمليات اليومية للفرق الصغيرة، ويحدد ما يمكن لكل مستخدم فعله وفق عضويته ودوره.",
        bullets: [
          "تسجيل الدخول وإدارة الجلسات والمؤسسات والعضويات",
          "إدارة العملاء والمشاريع وإسناد المهام وعرضها في لوحة متجاوبة",
          "لوحة معلومات وسجل نشاط يستندان إلى سجلات العمل الفعلية في التطبيق",
          "حسابات مراجعة مُعدّة مسبقًا مع قيود على العمليات وحصص محددة للاستخدام التجريبي",
        ],
      },
      {
        id: "screenshots",
        title: "لقطات من التطبيق",
        description:
          "لقطات من تطبيق FlowDesk أثناء تشغيله ببيانات خيالية. تعرض مساحة العمل على الحاسوب وصفحة تفاصيل مشروع على الهاتف.",
      },
      {
        id: "roles",
        title: "إدارة الصلاحيات حسب الدور",
        description:
          "تتحقق الواجهة البرمجية من صلاحية المستخدم عند كل إجراء محمي. وتقيّد النسخة التجريبية المشتركة بعض إجراءات إدارة مساحة العمل والحذف لحماية البيانات التجريبية.",
      },
      {
        id: "tenancy",
        title: "عزل بيانات المؤسسات",
        description:
          "تتحقق الواجهة البرمجية من العضوية السارية وتحصر الاستعلامات في المؤسسة المعنية. وتمنع المفاتيح الخارجية المركّبة ربط عميل أو مشروع أو مهمة أو عضو بمؤسسة أخرى. وتشمل الاختبارات محاولات قراءة وتعديل وإسناد غير مسموح بها عبر حدود المؤسسات.",
      },
      {
        id: "architecture",
        title: "معمارية النظام المنشور",
        description:
          "يرسل المتصفح الطلبات التي تتطلب تسجيل الدخول عبر وسيط Next.js من المصدر نفسه. يتحقق NestJS من الصلاحيات ويطبّق قواعد الأعمال، ويتصل بقاعدة Neon PostgreSQL عبر Prisma. تعمل الواجهة والواجهة البرمجية في خدمتين منفصلتين على خطة Render المجانية.",
      },
      {
        id: "database",
        title: "نموذج البيانات العلائقي",
        description:
          "تتبع سجلات العمل للمؤسسة. تربط العضوية المستخدم بالمؤسسة وتحدد دوره فيها، وتضمن قيود قاعدة البيانات بقاء علاقات المشاريع وإسناد المهام ضمن المؤسسة نفسها.",
      },
      {
        id: "security",
        title: "المصادقة وإدارة الجلسات",
        description:
          "تُجزّأ كلمات المرور بخوارزمية Argon2id. تُحفظ رموز الوصول قصيرة العمر ورموز التجديد في ملفات ارتباط HttpOnly، ويُستبدل رمز التجديد عند كل استخدام. تتحقق الواجهة البرمجية من سريان الجلسة عند الطلبات المحمية، وتبطل سلسلة التجديد إذا أُعيد استخدام رمز قديم.",
      },
      {
        id: "decisions",
        title: "التحديات والقرارات الهندسية",
        description:
          "تركّز العمل على عزل السجلات، وضبط التعديلات المتزامنة، وإبقاء العرض التجريبي قابلًا للاستخدام ضمن حدود الاستضافة المجانية.",
        items: [
          {
            title: "اتساق التغييرات وسجل النشاط",
            body: "يُحفظ تغيير سجل العمل والحدث الذي يوثّقه في معاملة واحدة. يمنع رقم إصدار المهمة تعديلًا يستند إلى نسخة قديمة من الكتابة فوق تحديث أحدث.",
          },
          {
            title: "ضوابط العرض المشترك",
            body: "تحافظ الحسابات المُعدّة مسبقًا وحصص التخزين والكتابة المحددة وإعادة الضبط المحمية على مساحة العرض. التسجيل العام مغلق.",
          },
          {
            title: "استئناف الخدمة بعد الخمول",
            body: "عند بدء تشغيل الواجهة البرمجية، يتوقف زر تسجيل الدخول مؤقتًا ويرسل المتصفح طلب فحص جاهزية دون بيانات اعتماد وبمحاولات محدودة. بعد استعادة الجاهزية، تبقى الطلبات الموثّقة عبر الوسيط من المصدر نفسه، فلا يُعرض تأخر التشغيل على أنه خطأ في بيانات الدخول.",
          },
          {
            title: "لوحة المهام على الشاشات الضيقة",
            body: "تترتب أعمدة اللوحة عموديًا على الهاتف، ويمكن تحديث حالة المهمة عبر قائمة واضحة باللمس أو لوحة المفاتيح دون سحب البطاقات.",
          },
        ],
      },
      {
        id: "testing",
        title: "الاختبارات الآلية",
        description:
          "نجح 54 اختبارًا آليًا. غطّت الاختبارات المصادقة والصلاحيات وعزل المؤسسات والمراجع إلى سجلات خارج المؤسسة، وتدوير الجلسات وإبطالها، وانتقالات حالة المهام والتعديلات القديمة، وقيود العرض، واستعادة الخدمة بعد الخمول.",
      },
      {
        id: "hosted-validation",
        title: "التحقق من النسخة المنشورة",
        description:
          "وُثّقت فحوص النسخة المنشورة بصورة منفصلة عن الاختبارات الآلية. إصدار الويب الذي جرى التحقق منه هو 63c4751.",
        bullets: [
          "فحص على الحاسوب وفحص لمساحة عمل العضو في Chrome بمقاس 390×844",
          "التحقق من صلاحيات المسؤول والمدير والعضو، بما فيها تحديث مهمة مسندة ورفض الإجراءات غير المصرّح بها",
          "استئناف خدمتي Render وإعادة الاتصال بقاعدة Neon بعد الخمول وسلوك ملفات الارتباط عبر HTTPS",
        ],
      },
      {
        id: "limitations",
        title: "حدود المشروع",
        description:
          "يعمل العرض التجريبي على الخطط المجانية دون اتفاقية مستوى خدمة للإنتاج. لا يشمل النطاق الفوترة أو الذكاء الاصطناعي أو التعاون اللحظي أو التكاملات الخارجية أو الإشعارات أو استعادة كلمة المرور أو المصادقة متعددة العوامل. لتجربة مساحة العمل المشتركة، يمكن طلب حساب مراجعة خيالي من أكرم.",
      },
    ],
  },
};
