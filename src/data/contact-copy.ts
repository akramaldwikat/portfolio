import type { Locale } from "@/lib/site";
const en = {
  name: "Name",
  email: "Email",
  company: "Company / organization",
  type: "Project type",
  budget: "Budget range",
  description: "Project description",
  optional: "optional",
  choose: "Select a project type",
  types: [
    "Full-stack application",
    "Business system",
    "Dashboard / internal tool",
    "Backend / API",
    "Integration & automation",
    "Existing project improvement",
    "Other / not sure yet",
  ],
  budgets: [
    "Not sure yet — let’s discuss",
    "Under $1,000",
    "$1,000–$3,000",
    "$3,000–$7,500",
    "$7,500+",
  ],
  placeholder:
    "What needs to work better? Tell me about your goals, who will use the software and any timing you have in mind.",
  submit: "Send project inquiry",
  sending: "Sending…",
  privacy:
    "I’ll use these details to respond to your inquiry. Please leave out passwords and confidential documents.",
  success:
    "Your inquiry has been sent. I’ll review the requirements and suggest a next step.",
  invalid: "Please check the highlighted fields.",
  error:
    "Your message could not be sent. Please try again later or use the email link, if available.",
  setup:
    "Online inquiries are not available yet. This form cannot send messages.",
  unavailableTitle: "Online inquiries unavailable",
  unavailableButton: "Submission currently unavailable",
  emailAlternative: "You can contact me by email instead.",
  whatsappAlternative: "Message me on WhatsApp",
  budgetHint:
    "An estimate is enough. You can choose “Not sure yet”. All ranges are in USD.",
  descriptionHint: "A short overview is enough to start (20–5,000 characters).",
  rate: "Too many attempts. Please try again in about ten minutes.",
  fieldError: "Please enter a valid value.",
  errors: {
    name: "Enter your name (2–100 characters).",
    email: "Enter a valid email address.",
    company: "Use no more than 150 characters.",
    type: "Choose a project type, including “Other / not sure yet”.",
    budget: "Choose a budget range or “Not sure yet”.",
    description: "Share a little more detail (20–5,000 characters).",
  },
  required: "* Required. Company is optional.",
  offline:
    "Unable to connect. Your message has not been sent; your details are still here.",
};
const ar: typeof en = {
  name: "الاسم",
  email: "البريد الإلكتروني",
  company: "الشركة أو المؤسسة",
  type: "نوع المشروع",
  budget: "الميزانية المتوقعة",
  description: "نبذة عن المشروع",
  optional: "اختياري",
  choose: "اختر نوع المشروع",
  types: [
    "تطبيق ويب متكامل",
    "نظام أعمال",
    "لوحة تحكم أو أداة داخلية",
    "نظام خلفي أو واجهة API",
    "ربط الأنظمة وأتمتة سير العمل",
    "تحسين مشروع قائم",
    "مشروع آخر أو لم أحدّد بعد",
  ],
  budgets: [
    "لم أحدّد بعد — نناقشها معًا",
    "أقل من 1,000 دولار",
    "من 1,000 إلى 3,000 دولار",
    "من 3,000 إلى 7,500 دولار",
    "7,500 دولار فأكثر",
  ],
  placeholder:
    "ما المشكلة التي ترغب في حلّها؟ شاركني أهدافك، ومن سيستخدم النظام، والموعد المتوقع إن وُجد.",
  submit: "أرسل تفاصيل المشروع",
  sending: "جارٍ الإرسال…",
  privacy:
    "سأستخدم هذه المعلومات للرد على استفسارك. يُرجى عدم إرسال كلمات مرور أو مستندات سرية.",
  success: "تم إرسال استفسارك. سأراجع المتطلبات وأقترح الخطوة المناسبة للبدء.",
  invalid: "يُرجى مراجعة الحقول المحددة.",
  error:
    "تعذّر إرسال الرسالة. حاول لاحقًا أو استخدم رابط البريد الإلكتروني إن كان متاحًا.",
  setup:
    "استقبال الاستفسارات عبر النموذج غير متاح حاليًا، ولن تُرسل أي معلومات من هذا النموذج.",
  unavailableTitle: "النموذج غير متاح حاليًا",
  unavailableButton: "الإرسال غير متاح حاليًا",
  emailAlternative: "يمكنك التواصل معي عبر البريد الإلكتروني بدلًا من ذلك.",
  whatsappAlternative: "تواصل معي عبر واتساب",
  budgetHint:
    "يكفي تقدير مبدئي، ويمكنك اختيار «لم أحدّد بعد». جميع المبالغ بالدولار الأمريكي.",
  descriptionHint: "نبذة مختصرة تكفي للبدء، من 20 إلى 5,000 حرف.",
  rate: "تم تجاوز عدد المحاولات المتاح. يُرجى المحاولة بعد نحو عشر دقائق.",
  fieldError: "يُرجى التحقق من هذا الحقل.",
  errors: {
    name: "أدخل اسمك، من حرفين إلى 100 حرف.",
    email: "أدخل عنوان بريد إلكتروني صحيحًا.",
    company: "يُرجى ألا يتجاوز الاسم 150 حرفًا.",
    type: "اختر نوع المشروع، أو «مشروع آخر أو لم أحدّد بعد».",
    budget: "اختر ميزانية تقريبية أو «لم أحدّد بعد».",
    description: "أضف نبذة أوضح عن المشروع، من 20 إلى 5,000 حرف.",
  },
  required: "* حقل مطلوب. اسم الشركة اختياري.",
  offline:
    "تعذّر الاتصال. لم تُرسل الرسالة، وما زالت التفاصيل محفوظة في النموذج.",
};
export type FormCopy = typeof en;
export const formCopy: Record<Locale, FormCopy> = { en, ar };
