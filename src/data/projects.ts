import type { Locale } from "@/lib/site";
export const projects = [
  {
    slug: "flowdesk",
    name: "FlowDesk",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    status: "completed",
    caseStudy: "projects/flowdesk",
    inquiryType: "1",
    en: {
      type: "Business Operations Management Platform",
      problem:
        "Client records, project updates and tasks live in separate tools. Teams lose context and ownership becomes unclear.",
      solution:
        "A full-stack, multi-tenant workspace for managing clients, projects, team responsibilities and task workflows.",
      status: "Completed Independent Demo Project",
    },
    ar: {
      type: "منصة إدارة عمليات الأعمال",
      problem:
        "تتوزع سجلات العملاء وتحديثات المشاريع والمهام بين أدوات منفصلة، فتضيع المتابعة وتتداخل المسؤوليات.",
      solution:
        "مساحة عمل متكاملة لإدارة العملاء والمشاريع ومسؤوليات الفريق وسير المهام، مع عزل بيانات كل مؤسسة.",
      status: "مشروع تجريبي مستقل مكتمل",
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
