import type { Locale } from "@/lib/site";
export const projects = [
  {
    slug: "flowdesk",
    name: "FlowDesk",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    status: "in-progress",
    caseStudy: "projects/flowdesk",
    inquiryType: "1",
    en: {
      type: "Business Operations Management Platform",
      problem:
        "Client records, project updates and tasks live in separate tools. Teams lose context and ownership becomes unclear.",
      solution:
        "A proposed organization-based workspace linking clients, projects and tasks, with role-aware access and traceable activity.",
      status: "Case study available · application development in progress",
    },
    ar: {
      type: "منصة إدارة عمليات الأعمال",
      problem:
        "تتوزع سجلات العملاء وتحديثات المشاريع والمهام بين أدوات منفصلة، فتضيع المتابعة وتتداخل المسؤوليات.",
      solution:
        "مساحة عمل مقترحة تربط العملاء بالمشاريع والمهام، مع صلاحيات واضحة وسجل لتغييرات العمل.",
      status: "دراسة المشروع متاحة · تطوير التطبيق لم يكتمل بعد",
    },
  },
  {
    slug: "commercekit",
    name: "CommerceKit",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    status: "planned",
    caseStudy: undefined,
    inquiryType: "0",
    en: {
      type: "Modern Commerce Management Platform",
      problem:
        "Products and orders can become difficult to coordinate when operational records are disconnected.",
      solution:
        "A planned portfolio exploration of a consistent catalog, order lifecycle and management workspace.",
      status: "Planned Portfolio Project · Coming Soon",
    },
    ar: {
      type: "منصة حديثة لإدارة التجارة",
      problem:
        "تصعب متابعة المنتجات والطلبات عندما تكون سجلاتها منفصلة وغير متناسقة.",
      solution:
        "مشروع مستقل مخطط لاستكشاف إدارة موحّدة للمنتجات ومراحل الطلب والعمليات المرتبطة بها.",
      status: "مشروع مستقل مخطط له · قريبًا",
    },
  },
  {
    slug: "clientpilot",
    name: "ClientPilot",
    technologies: ["Next.js", "NestJS", "BullMQ"],
    status: "planned",
    caseStudy: undefined,
    inquiryType: "1",
    en: {
      type: "CRM & Workflow Automation Platform",
      problem:
        "Client follow-ups and repeatable team actions are easy to miss when they rely on manual reminders.",
      solution:
        "A planned CRM concept connecting client records to assigned follow-ups and explicit workflow steps.",
      status: "Planned Portfolio Project · Coming Soon",
    },
    ar: {
      type: "منصة إدارة علاقات العملاء وأتمتة العمليات",
      problem:
        "قد تضيع متابعة العملاء والإجراءات المتكررة عندما تعتمد على تذكيرات يدوية ومتفرقة.",
      solution:
        "تصوّر مخطط يربط سجلات العملاء بمهام متابعة ومسؤوليات وخطوات عمل واضحة.",
      status: "مشروع مستقل مخطط له · قريبًا",
    },
  },
] as const;
export function projectText(index: number, locale: Locale) {
  return projects[index][locale];
}
