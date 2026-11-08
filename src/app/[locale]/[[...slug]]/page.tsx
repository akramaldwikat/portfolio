import { notFound } from "next/navigation";
import {
  AboutPage,
  ContactPage,
  FlowdeskPage,
  HomePage,
  ProjectsPage,
  ServicesPage,
} from "@/components/pages";
import { routes, type Locale, type PageRoute } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string; slug?: string[] }> };
export function generateStaticParams() {
  return ["en", "ar"].flatMap((locale) =>
    routes.map((route) => ({ locale, slug: route ? route.split("/") : [] })),
  );
}
function resolve(locale: string, slug?: string[]) {
  const route = slug?.join("/") || "";
  if (
    (locale !== "en" && locale !== "ar") ||
    !routes.includes(route as PageRoute)
  )
    notFound();
  return { locale: locale as Locale, route: route as PageRoute };
}
export async function generateMetadata({ params }: Props) {
  const p = await params;
  const resolved = resolve(p.locale, p.slug);
  return pageMetadata(resolved.locale, resolved.route);
}
const pages = {
  "": HomePage,
  about: AboutPage,
  services: ServicesPage,
  projects: ProjectsPage,
  "projects/flowdesk": FlowdeskPage,
  contact: ContactPage,
};
export default async function Page({ params }: Props) {
  const p = await params;
  const { locale, route } = resolve(p.locale, p.slug);
  const Component = pages[route];
  return <Component locale={locale} />;
}
