export const BLOG_CATEGORIES: {
  title: string;
  slug: "news" | "education" | "кейсы" | "автоматизация" | "гайды" | "обучение";
  description: string;
}[] = [
    {
      title: "News",
      slug: "news",
      description: "Updates and announcements from Next SaaS Starter.",
    },
    {
      title: "Education",
      slug: "education",
      description: "Educational content about SaaS management.",
    },
    {
      title: "Кейсы",
      slug: "кейсы",
      description: "Реальные истории успеха наших клиентов.",
    },
    {
      title: "Автоматизация",
      slug: "автоматизация",
      description: "Статьи о том, как автоматизировать бизнес-процессы.",
    },
    {
      title: "Гайды",
      slug: "гайды",
      description: "Пошаговые инструкции по настройке.",
    },
    {
      title: "Обучение",
      slug: "обучение",
      description: "Обучающие материалы для сотрудников.",
    },
  ];

export const BLOG_AUTHORS = {
  mickasmt: {
    name: "mickasmt",
    image: "/_static/avatars/mickasmt.png",
    twitter: "miickasmt",
  },
  shadcn: {
    name: "shadcn",
    image: "/_static/avatars/shadcn.jpeg",
    twitter: "shadcn",
  },
  leoagent: {
    name: "LeoAgent Team",
    image: "/leoold.png",
    twitter: "leoagent",
  },
};
