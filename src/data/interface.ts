import type { Locale } from "@/lib/site";

export const interfaceCopy = {
  en: {
    nav: ["Home", "About", "Services", "Projects", "Contact"],
    menu: "Open navigation",
    close: "Close navigation",
    theme: "Toggle color theme",
    discuss: "Discuss your project",
    brandRole: "FULL-STACK & BUSINESS SYSTEMS",
    navLabel: "Main navigation",
    footerNavLabel: "Footer links",
    mobileNavLabel: "Mobile navigation",
    homeLabel: "Akram Aldwikat — Home",
    notFound: "This page isn’t in the plan.",
    notFoundBody:
      "The address may have changed. You can explore my services or return to the home page.",
    back: "Back to home",
  },
  ar: {
    nav: ["الرئيسية", "نبذة عني", "الخدمات", "المشاريع", "تواصل معي"],
    menu: "فتح قائمة التنقل",
    close: "إغلاق قائمة التنقل",
    theme: "تغيير المظهر",
    discuss: "ناقش مشروعك",
    brandRole: "تطوير متكامل وأنظمة أعمال",
    navLabel: "التنقل الرئيسي",
    footerNavLabel: "روابط التذييل",
    mobileNavLabel: "قائمة الهاتف",
    homeLabel: "أكرم الدويكات — الرئيسية",
    notFound: "هذه الصفحة غير موجودة.",
    notFoundBody:
      "ربما تغيّر عنوان الصفحة. يمكنك استعراض الخدمات أو العودة إلى الصفحة الرئيسية.",
    back: "العودة للرئيسية",
  },
} satisfies Record<Locale, object>;
