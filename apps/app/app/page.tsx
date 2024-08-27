"use client";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

// this is important as a server action
// it will be used to change languages
import { changeLocale, getLocale } from "./actions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [language, setLanguage] = useState<string | null>(null);
  async function loadLanguage() {
    const locale = await getLocale();
    setLanguage(locale);
  }

  useEffect(() => {
    loadLanguage();
  }, []); // not listening to language changes

  useEffect(() => {
    if (language) {
      changeLocale(language);
    }
  }, [language]);
  const t = useTranslations("HomePage");
  return (
    <main className="p-6 flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-semibold">{t("title")} 🎊🎉</p>
        <p className=" mb-4">
          We've made a simple boilerplate for those who want to build
          interesting apps, its free and open-source.
        </p>
        <p className="font-bold">Used technologies: </p>
        <ul>
          <li>Next.js (frontend)</li>
          <li>Shadcn (UI library)</li>
          <li>Fastify (backend)</li>
          <li>Drizzle (Database ORM)</li>
          <li>and more...</li>
        </ul>
        <div className="mt-4">
          You can change the language here:
          <Select
            onValueChange={(value: string) => {
              setLanguage(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </main>
  );
}
