export const flowdeskScreenshots = [
  {
    file: "dashboard-desktop.jpg",
    width: 1440,
    height: 1000,
    en: ["Dashboard", "Workspace totals, assigned tasks and recent activity"],
    ar: ["لوحة المعلومات", "إجماليات مساحة العمل والمهام المسندة وآخر الأنشطة"],
  },
  {
    file: "clients-desktop.jpg",
    width: 1440,
    height: 1000,
    en: ["Clients", "Searchable client list with contacts and project counts"],
    ar: [
      "العملاء",
      "قائمة عملاء قابلة للبحث مع بيانات التواصل وأعداد المشاريع",
    ],
  },
  {
    file: "projects-desktop.jpg",
    width: 1440,
    height: 1000,
    en: ["Projects", "Project cards showing clients and progress"],
    ar: ["المشاريع", "بطاقات المشاريع تعرض العملاء والتقدم"],
  },
  {
    file: "project-detail-desktop.jpg",
    width: 1440,
    height: 1000,
    en: [
      "Project detail",
      "A project with its client, status and task columns",
    ],
    ar: ["تفاصيل المشروع", "مشروع مع العميل والحالة وأعمدة المهام"],
  },
  {
    file: "task-board-desktop.jpg",
    width: 1425,
    height: 1322,
    en: ["Task board", "Tasks grouped by workflow stage with status selectors"],
    ar: ["لوحة المهام", "مهام مجمّعة حسب مرحلة العمل مع قوائم لتحديث الحالة"],
  },
  {
    file: "team-members-desktop.jpg",
    width: 1440,
    height: 1000,
    en: [
      "Team members",
      "Fictional teammates with Admin, Manager and Member roles",
    ],
    ar: ["أعضاء الفريق", "أعضاء خياليون بأدوار المسؤول والمدير والعضو"],
  },
  {
    file: "activity-desktop.jpg",
    width: 1440,
    height: 1000,
    en: ["Activity", "A list of recorded workspace changes and their actors"],
    ar: ["سجل النشاط", "سجل لتغييرات مساحة العمل ومن أجراها"],
  },
  {
    file: "project-detail-mobile.jpg",
    width: 375,
    height: 1990,
    en: [
      "Project detail on mobile",
      "A project summary above vertically stacked task stages",
    ],
    ar: [
      "تفاصيل المشروع على الهاتف",
      "ملخّص مشروع تليه مراحل المهام مرتبة عموديًا",
    ],
  },
] as const;

export const flowdeskImagePath = (file: string) => `/flowdesk/${file}`;
