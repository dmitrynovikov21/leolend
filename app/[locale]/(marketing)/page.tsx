"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  FileText, Check, CheckCircle2, Bot, MessageCircle,
  Globe, Database, Shield, Upload, Settings, Zap, Users, Terminal,
  Building2, Phone, Mail, MapPin, ArrowRight, Quote,
  Server, Lock, ShieldCheck, Sparkles, BadgeCheck, TrendingUp,
  BarChart3, Sliders, Plug, FileCheck, Brain, Send, GraduationCap, ChevronDown, ArrowUp
} from "lucide-react"
import PartnersSection from "@/components/sections/partners-section"
import { BlogSection } from "@/components/sections/blog-section"
import { CasesSection } from "@/components/sections/cases-section"
import { RoistatHeader } from "@/components/roistat/header"
import { RoistatFooter } from "@/components/roistat/footer"
import { createLead } from "@/actions/lead"
import { toast } from "sonner"
import { useAnalytics } from "@/components/analytics/analytics-provider"
import { useScrollTracking } from "@/components/analytics/scroll-tracker"

// ==================== SCROLL TO TOP BUTTON ====================
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#0077FF] hover:bg-[#0060cc] text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
          aria-label="Наверх"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ==================== HERO SECTION (Pain Story) ====================
function HeroSectionNew() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await createLead({ email, comment: "Main Hero Form" })
      if (result.success) {
        toast.success("Заявка принята! Мы свяжемся с вами.")
        setEmail("")
      } else {
        toast.error("Ошибка при отправке")
      }
    } catch (e) {
      toast.error("Что-то пошло не так")
    } finally {
      setIsLoading(false)
    }
  }

  // Бегущая строка ниш
  const niches = [
    "Онбординг сотрудников",
    "Обучение смен в цеху",
    "Поддержка интернет-магазина",
    "Юридические отделы",
    "HR-консультации",
    "Техническая поддержка",
  ]

  return (
    <main className="bg-white text-[#3d4f6f] font-sans">
      <RoistatHeader />

      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-white pt-10">
        {/* Background Grid (Subtle on Light) */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        <div className="max-w-7xl mx-auto px-6 w-full pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left: Text */}
            <div className="max-w-xl lg:col-span-5">

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[#3d4f6f] mb-6">
                ИИ-агент обучен на <span className="text-[#0077FF]">ваших</span> документах и знает <span className="text-[#0077FF]">правильные</span> ответы
              </h1>

              <p className="text-base md:text-lg text-[#6b7a90] mt-6 leading-relaxed mb-8">
                Выберите роль ИИ-агента, загрузите документы и он начнёт отвечать строго в рамках загруженных данных. Любой менеджер может настроить агента без ИТ-специалистов <strong className="text-[#3d4f6f]">за 7 минут</strong>.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-md gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  required
                  className="h-12 flex-auto rounded-md border border-[#dce1e6] bg-white px-4 text-[#3d4f6f] shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0077FF] sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="h-12 w-full sm:w-auto rounded-md bg-[#0077FF] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[#0060cc] transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Создать агента
                </button>
              </form>
              <div className="mt-4 text-xs text-gray-400">
                Создайте своего ИИ агента
              </div>
            </div>

            {/* Right: Chat Demo */}
            <div className="flex justify-center lg:justify-end w-full lg:col-span-7">
              <HeroInterfacePreview />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}




function HeroInterfacePreview() {
  return (
    <div className="w-full bg-white rounded-lg shadow-2xl border border-zinc-200 overflow-hidden text-left flex flex-col">
      {/* Window Header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-xs text-zinc-400 font-medium">LeoAgent — Настройка агента</div>
      </div>

      <div className="flex flex-col md:flex-row h-auto md:h-[600px] w-full">
        {/* Left Sidebar: Settings */}
        <div className="w-full md:w-1/3 bg-white border-b md:border-b-0 md:border-r border-zinc-100 p-6 flex flex-col gap-6">
          {/* Role */}
          <div>
            <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Роль агента</div>
            <div className="p-3 bg-white border border-blue-100 rounded-xl shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-[#3d4f6f] leading-tight">Онбординг-агент для новых сотрудников</span>
            </div>
          </div>

          {/* Documents */}
          <div className="flex-1">
            <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wide">Загруженные документы</div>
            <div className="space-y-2">
              {[
                { name: "Регламент компании.pdf", color: "text-red-500", bg: "bg-red-50" },
                { name: "HR-политики.docx", color: "text-blue-500", bg: "bg-blue-50" },
                { name: "Инструкция по продукту.pptx", color: "text-orange-500", bg: "bg-orange-50" }
              ].map((doc, i) => (
                <div key={i} className="group p-3 bg-white border border-zinc-100 hover:border-zinc-300 rounded-xl flex items-center gap-3 transition-colors cursor-default">
                  <div className={`w-8 h-8 rounded-lg ${doc.bg} flex items-center justify-center ${doc.color}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-[#6b7a90] truncate">{doc.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mt-auto">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 text-blue-700">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Агент готов к работе</span>
            </div>
          </div>
        </div>

        {/* Right Area: Chat Preview */}
        <div className="flex-1 bg-zinc-50/30 p-6 flex flex-col h-full overflow-hidden">
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 min-h-0 custom-scrollbar">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-md">
                Какие документы нужны для оформления отпуска?
              </div>
            </div>

            {/* Bot Message 1 */}
            <div className="flex justify-start">
              <div className="bg-white border border-zinc-200 text-zinc-800 px-5 py-4 rounded-2xl rounded-tl-sm max-w-[90%] text-sm shadow-sm space-y-3">
                <p className="font-medium text-[#3d4f6f]">Согласно HR-политикам, для оформления отпуска необходимо:</p>
                <ul className="space-y-2 text-[#6b7a90] pl-1">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>Заявление по форме Т-6</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>Согласование с руководителем</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>Подать за 14 дней до начала</span>
                  </li>
                </ul>
                <div className="pt-3 mt-1 border-t border-zinc-100 flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-50 flex items-center justify-center text-red-500">
                    <FileText className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">HR-политики.docx, стр. 12</span>
                </div>
              </div>
            </div>

            {/* User Message 2 */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-md">
                Где найти форму Т-6?
              </div>
            </div>

            {/* Bot Message 2 */}
            <div className="flex justify-start">
              <div className="bg-white border border-zinc-200 text-zinc-800 px-5 py-4 rounded-2xl rounded-tl-sm max-w-[90%] text-sm shadow-sm space-y-2">
                <p className="text-zinc-700">Форма Т-6 доступна на корпоративном портале в разделе «Документы → HR → Шаблоны».</p>
                <div className="pt-3 mt-1 border-t border-zinc-100 flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-50 flex items-center justify-center text-red-500">
                    <FileText className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">Регламент компании.pdf, стр. 45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="mt-4 pt-4 border-t border-zinc-200/50">
            <div className="relative">
              <input
                disabled
                type="text"
                placeholder="Задайте вопрос..."
                className="w-full h-12 pl-4 pr-12 rounded-xl border border-zinc-200 bg-white text-sm shadow-sm focus:outline-none cursor-default placeholder:text-zinc-400"
              />
              <div className="absolute right-2 top-2 p-2 text-zinc-400">
                <Send className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== ПРЕИМУЩЕСТВА ПЛАТФОРМЫ (6 cards) ====================
function AdvantagesSection() {
  const advantages = [
    {
      icon: Brain,
      title: "Агент не придумывает ответы",
      desc: "Работает строго в рамках загруженных материалов. LeoAgent это не очередная игрушка с ИИ, а рабочий инструмент для бизнеса.",
    },
    {
      icon: BarChart3,
      title: "Аналитика и полный контроль",
      desc: "Отслеживайте вопросы, оценивайте эффективность ответов и улучшайте базу знаний на основе реальных диалогов.",
    },
    {
      icon: Plug,
      title: "Интеграция в контур бизнеса",
      desc: "Встраивайте агента в корпоративный портал, сайт, LMS или базу знаний одной строкой кода. Подключайте мессенджеры и CRM.",
    },
    {
      icon: ShieldCheck,
      title: "Отечественная разработка",
      desc: "Данные хранятся на защищенных серверах с соблюдением требований 152-ФЗ, не используются для обучения внешних моделей.",
    },
    {
      icon: FileCheck,
      title: "Работает с разными данными",
      desc: "Загружайте документы разных форматов, добавляйте ссылки на базы знаний. Обучение происходит автоматически за секунды.",
    },
    {
      icon: Sliders,
      title: "Гибкие настройки",
      desc: "Управляйте тем, как и когда агент общается с клиентами. Настраивайте задержки, рабочее время и сценарии передачи диалога человеку.",
    },
  ]

  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3d4f6f]">
            Преимущества платформы LeoAgent
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-4">
                <adv.icon className="w-6 h-6 text-[#3d4f6f]" />
              </div>
              <h3 className="text-lg font-semibold text-[#3d4f6f] mb-2">{adv.title}</h3>
              <p className="text-sm text-[#6b7a90] leading-relaxed">{adv.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077FF] text-white rounded-md font-semibold hover:bg-[#0066cc] transition-colors shadow-sm">
            Попробовать бесплатно
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ==================== STEPS SECTION (VERTICAL STACK) ====================
function StepsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#3d4f6f] mb-4">
            Создай своего агента за 4 шага
          </h2>
          <p className="text-base text-[#6b7a90] max-w-2xl mx-auto">
            Платформа берет на себя всю техническую сложность. Вам остается только обучить агента знаниям о вашей компании.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1 */}
          <div className="bg-zinc-50 rounded-xl p-6">
            <div className="w-10 h-10 bg-[#0077FF] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">1</div>
            <h3 className="text-xl font-bold text-[#3d4f6f] mb-2">Определите роль</h3>
            <p className="text-sm text-[#6b7a90] mb-4">Можно создать несколько ИИ агентов с разными ролями под ваши задачи.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-[#3d4f6f] cursor-pointer transition-all hover:border-blue-400 hover:shadow-sm">Финансово-бухгалтерский ассистент</span>
              <span className="px-3 py-1.5 bg-blue-50 border border-blue-300 rounded-full text-xs text-blue-700 cursor-pointer transition-all hover:border-blue-500 hover:shadow-sm">+ HR-ассистент для онбординга</span>
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-[#3d4f6f] cursor-pointer transition-all hover:border-blue-400 hover:shadow-sm">IT-helpdesk ассистент</span>
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-[#3d4f6f] cursor-pointer transition-all hover:border-blue-400 hover:shadow-sm">Ассистент для студентов</span>
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-[#3d4f6f] cursor-pointer transition-all hover:border-blue-400 hover:shadow-sm">Консультант поддержки</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-zinc-50 rounded-xl p-6">
            <div className="w-10 h-10 bg-[#0077FF] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">2</div>
            <h3 className="text-xl font-bold text-[#3d4f6f] mb-2">Загрузите материалы</h3>
            <p className="text-sm text-[#6b7a90] mb-4">Добавляйте все корпоративные документы на которых обучится ИИ агент.</p>
            <div className="flex flex-wrap gap-2">
              {[".pdf", ".docx", ".txt", ".json", ".xlsx", "/links"].map((format) => (
                <span key={format} className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs text-[#6b7a90] font-mono cursor-pointer transition-all hover:border-blue-400 hover:shadow-sm">{format}</span>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-zinc-50 rounded-xl p-6">
            <div className="w-10 h-10 bg-[#0077FF] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">3</div>
            <h3 className="text-xl font-bold text-[#3d4f6f] mb-2">Проверьте качество базы знаний</h3>
            <p className="text-sm text-[#6b7a90] mb-4">Ассистент автоматически протестирует качество ответов по вашим документам.</p>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                12 ошибок найдено
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs font-medium text-red-600">
                <Shield className="w-3.5 h-3.5" />
                2 критических
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-600">
                <Sparkles className="w-3.5 h-3.5" />
                8 улучшений
              </span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-zinc-50 rounded-xl p-6">
            <div className="w-10 h-10 bg-[#0077FF] text-white rounded-lg flex items-center justify-center font-bold text-lg mb-4">4</div>
            <h3 className="text-xl font-bold text-[#3d4f6f] mb-2">Подключите в каналы</h3>
            <p className="text-sm text-[#6b7a90] mb-4">Установите код виджета или подключите интеграцию в Telegram, WhatsApp, CRM, сайт.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Image src="/tglogo.webp" alt="Telegram" width={40} height={40} className="w-10 h-10 rounded-xl object-contain" />
              <Image src="/whatsapp.svg" alt="WhatsApp" width={40} height={40} className="w-10 h-10 rounded-xl object-contain" />
              <Image src="/bitrix_logo.svg" alt="Bitrix24" width={40} height={40} className="w-10 h-10 rounded-xl object-contain" />
              <Image src="/amocrm.png.webp" alt="amoCRM" width={80} height={32} className="h-8 w-auto object-contain" />
              <Image src="/yclietns.png.webp" alt="yclients" width={80} height={32} className="h-8 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// === STEP 1: ROLE VISUAL ===
function StepRoleVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
        <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
          <span className="text-xs font-semibold uppercase text-zinc-400 tracking-wider">Выберите роль</span>
        </div>
        <div className="p-2 space-y-1">
          <div className="flex flex-col gap-1">
            <div className="px-4 py-3 rounded-xl flex items-center gap-3 bg-blue-50 text-blue-700 border border-blue-100 transform scale-102 shadow-sm transition-all cursor-pointer">
              <Users className="w-5 h-5" />
              <span className="font-medium">HR-Менеджер</span>
              <CheckCircle2 className="w-4 h-4 ml-auto" />
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -left-4 top-1/2 -translate-y-1/2"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              </motion.div>
            </div>
          </div>
          <div className="px-4 py-3 rounded-xl flex items-center gap-3 text-[#6b7a90] hover:bg-zinc-50 transition-colors cursor-pointer">
            <Bot className="w-5 h-5 text-zinc-400" />
            <span>Техподдержка</span>
          </div>
          <div className="px-4 py-3 rounded-xl flex items-center gap-3 text-[#6b7a90] hover:bg-zinc-50 transition-colors cursor-pointer">
            <BadgeCheck className="w-5 h-5 text-zinc-400" />
            <span>Продажи</span>
          </div>
        </div>

        {/* Cursor Animation */}
        <motion.div
          className="absolute pointer-events-none drop-shadow-md"
          initial={{ x: 200, y: 200, opacity: 0 }}
          whileInView={{ x: 150, y: 120, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 3.5L11.5 19.5L14.5 13.5L20.5 10.5L5.5 3.5Z" fill="black" stroke="white" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

// === STEP 2: UPLOAD VISUAL ===
function StepUploadVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="128" cy="128" r="80" stroke="#f4f4f5" strokeWidth="8" fill="none" />
          <motion.circle
            cx="128" cy="128" r="80"
            stroke="#1354FC"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: 502, strokeDashoffset: 502 }}
            whileInView={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3 border border-blue-100"
          >
            <FileText className="w-6 h-6" />
          </motion.div>
          <div className="font-bold text-[#3d4f6f] text-base">knowledge.pdf</div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-zinc-400 mt-1"
          >
            Загрузка...
          </motion.div>
        </div>

        {/* Badge Popup */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: "spring" }}
          className="absolute -bottom-8 bg-white px-5 py-2.5 rounded-full shadow-xl border border-green-100 flex items-center gap-2 text-sm font-bold text-green-600"
        >
          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3" />
          </div>
          Готово
        </motion.div>
      </div>
    </div>
  )
}

// === STEP 3: QUALITY VISUAL ===
function StepQualityVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 text-left">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Статус системы</span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-zinc-700 font-medium">Проверка конфликтов</span>
          </div>
          <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-lg">
            0 ошибок <Check className="w-4 h-4" />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-zinc-700 font-medium">Tone of Voice</span>
          </div>
          <div className="flex items-center gap-2 text-[#6b7a90] text-sm font-medium bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
            Дружелюбный 😊
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-zinc-700 font-medium">Проверка фактов</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-2 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-green-500"
              />
            </div>
            <span className="text-green-700 font-bold text-sm">100%</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// === STEP 4: INTEGRATIONS VISUAL ===
function StepIntegrationsVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Center Hub */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="relative z-20 w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center border border-zinc-100"
        >
          <img src="/leoold.png" className="w-14 h-14 object-contain" alt="Leo" />
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-blue-500/20 animate-ping" />
        </motion.div>

        {/* Satellite Nodes */}
        {[
          { icon: <Send className="w-6 h-6 -ml-0.5 mt-0.5 -rotate-45" />, color: "bg-[#2AABEE]", delay: 0.2, angle: 0 },
          { icon: <Phone className="w-6 h-6" />, color: "bg-[#25D366]", delay: 0.4, angle: 120 },
          { icon: <Globe className="w-6 h-6" />, color: "bg-[#7B61FF]", delay: 0.6, angle: 240 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 flex items-center justify-center z-20"
            initial={{ scale: 0, x: 0, y: 0 }}
            whileInView={{
              scale: 1,
              x: 120 * Math.cos((item.angle - 90) * Math.PI / 180),
              y: 120 * Math.sin((item.angle - 90) * Math.PI / 180)
            }}
            transition={{ delay: item.delay, type: "spring" }}
          >
            {/* Connecting Line - Behind the Icon */}
            <motion.div
              className="absolute h-0.5 z-0 origin-right flex items-center"
              style={{
                width: '120px', // Total distance
                right: '50%',
                top: '50%',
                transform: `rotate(${item.angle + 270}deg)` // Rotated to point TO center
              }}
            >
              {/* Visual Line Segment */}
              <div className="absolute left-[48px] right-[32px] h-full bg-zinc-200" />
            </motion.div>

            {/* Icon Box - On Top */}
            <div className={`relative z-10 w-full h-full rounded-2xl ${item.color} text-white flex items-center justify-center shadow-lg`}>
              {item.icon}
            </div>
          </motion.div>
        ))}

        {/* Connecting Lines (SVG for better control) */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <circle cx="50%" cy="50%" r="120" stroke="#f4f4f5" strokeWidth="2" strokeDasharray="8 8" fill="none" />
        </svg>
      </div>
    </div>
  )
}

function CTASection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await createLead({ email, comment: "CTA Section Form" })
      if (result.success) {
        toast.success("Заявка принята! Скоро свяжемся.")
        setEmail("")
      } else {
        toast.error("Ошибка при отправке")
      }
    } catch (e) {
      toast.error("Что-то пошло не так")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-hidden shadow-lg border border-gray-200 min-h-[400px]"
        >
          {/* Left: Blue CTA */}
          <div className="bg-[#0077FF] p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
              Хотите попробовать как ИИ-агент будет работать с вашей базой знаний?
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите Email"
                required
                className="block w-full flex-1 h-14 px-5 rounded-xl bg-white border-2 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-900 placeholder:text-gray-400 text-base outline-none transition-all shadow-sm"
              />
              <button
                type="submit"
                className="h-14 px-8 bg-zinc-900 text-white rounded-xl font-bold text-base hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Попробовать
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right: Business Image */}
          <div className="relative min-h-[300px] lg:min-h-full bg-zinc-100">
            <Image
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=3232&auto=format&fit=crop"
              alt="Business Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== ДЛЯ КОГО ====================
function ForWhoSection() {
  const audiences = [
    {
      icon: Building2,
      title: "Фаундеры и владельцы МСБ",
      desc: "Быстро обучайте сотрудников без постоянного участия экспертов. Сэкономьте время руководителя на типовых вопросах.",
      bgIcon: <BarChart3 className="absolute bottom-6 right-6 w-24 h-24 text-zinc-100/50 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
    },
    {
      icon: TrendingUp,
      title: "Маркетологи и продакты",
      desc: "Делитесь знаниями о продукте с командой продаж и поддержкой. Обеспечьте единую базу знаний для всей команды.",
      bgIcon: <MessageCircle className="absolute bottom-6 right-6 w-24 h-24 text-zinc-100/50 rotate-6 group-hover:rotate-0 transition-transform duration-500" />
    },
    {
      icon: Sparkles,
      title: "Владельцы онлайн-школ",
      desc: "Студенты получают ответы по материалам курса 24/7. Разгрузите кураторов от типовых вопросов.",
      bgIcon: <GraduationCap className="absolute bottom-6 right-6 w-24 h-24 text-zinc-100/50 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
    },
    {
      icon: Globe,
      title: "ИТ-директора и менеджеры",
      desc: "Разгрузите IT-helpdesk от типовых вопросов. Автоматизируйте первую линию поддержки.",
      bgIcon: <Terminal className="absolute bottom-6 right-6 w-24 h-24 text-zinc-100/50 rotate-3 group-hover:rotate-0 transition-transform duration-500" />
    },
    {
      icon: Users,
      title: "Руководители отделов обучения и HR",
      desc: "Выстройте стандартный, предсказуемый онбординг. Сократите время адаптации новых сотрудников.",
      bgIcon: <CheckCircle2 className="absolute bottom-6 right-6 w-24 h-24 text-zinc-100/50 -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
    },
    {
      icon: Database,
      title: "Менеджеры крупных компаний",
      desc: "Тиражируемое обучение и поддержка в филиалах и на сменах. Единый стандарт знаний по всей компании.",
      bgIcon: <Building2 className="absolute bottom-6 right-6 w-24 h-24 text-zinc-100/50 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
    },
  ]

  return (
    <section className="py-20 bg-zinc-50" id="audience">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3d4f6f]">
            Кому подходит LeoAgent
          </h2>
          <p className="text-[#6b7a90] mt-3 max-w-2xl mx-auto">
            Платформа для всех, кто хочет автоматизировать передачу знаний в компании
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((aud, i) => (
            <motion.div
              key={aud.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <aud.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-[#3d4f6f] mb-3">{aud.title}</h3>
                <p className="text-sm text-[#6b7a90] leading-relaxed">{aud.desc}</p>
              </div>
              {/* Background Icon */}
              {aud.bgIcon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== ОТЗЫВЫ (с основного лендинга) ====================
function TestimonialsNew() {
  const testimonials = [
    {
      name: "Ilya Smirnov",
      role: "Union Oil & Gas",
      text: "Разгрузили 3 операторов. Бот отвечает на 90% вопросов по регламентам."
    },
    {
      name: "Elena V.",
      role: "EdTech School",
      text: "Кураторы теперь спят ночью. Студенты получают ответы мгновенно."
    },
    {
      name: "Mark D.",
      role: "E-commerce",
      text: "Внедрение заняло 10 минут. Просто загрузили PDF с условиями доставки."
    },
    {
      name: "Alexey K.",
      role: "Founder",
      text: "Лучшая инвестиция года. Экономим 150к рублей в месяц на ФОТ."
    },
    {
      name: "Olga S.",
      role: "HR Director",
      text: "Новички адаптируются за 3 дня вместо 2 недель. База знаний работает."
    },
    {
      name: "Dmitry P.",
      role: "IT Lead",
      text: "Наконец-то сотрудники перестали дергать меня по мелочам. Бот знает всё."
    },
  ]

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3d4f6f]">
            Отзывы клиентов
          </h2>
        </motion.div>
      </div>

      {/* Scrolling container - Manual Scroll */}
      <div className="overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex gap-6 min-w-full w-max md:w-auto">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="w-[320px] shrink-0 p-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
            >
              <div className="flex flex-col gap-4 h-full">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Sparkles key={s} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-zinc-700 leading-relaxed flex-1 text-sm">
                  &quot;{item.text}&quot;
                </blockquote>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-200/50">
                  <div className="size-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-sm font-bold text-[#6b7a90] shadow-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#3d4f6f] text-sm">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#6b7a90]">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== ПРИМЕРЫ РЕШЕНИЯ ====================
function UseCasesSection() {
  const useCases = [
    {
      icon: Users,
      title: "Онбординг сотрудников",
      desc: "Новый сотрудник задаёт вопросы о компании, процессах и документах и получает точные ответы 24/7.",
    },
    {
      icon: Sparkles,
      title: "Онлайн-школы",
      desc: "ИИ-тьютор отвечает по учебным материалам и программам курса. Студенты получают помощь мгновенно.",
    },
    {
      icon: Settings,
      title: "Производство и обучение смен",
      desc: "Консультант по техкартам и регламентам прямо в цеху. Быстрый доступ к инструкциям для сменных рабочих.",
    },
    {
      icon: Globe,
      title: "IT-helpdesk",
      desc: "Агент решает типовые ИТ-вопросы и уменьшает нагрузку на поддержку. Первая линия работает автоматически.",
    },
    {
      icon: FileText,
      title: "Юридические отделы и фирмы",
      desc: "Поиск ответов по базам внутренних регламентов и законодательству без риска выдумок.",
    },
    {
      icon: BarChart3,
      title: "Бухгалтерия",
      desc: "Консультант по внутренним инструкциям, регламентам и базовым вопросам налогов и отчётности.",
    },
    {
      icon: MessageCircle,
      title: "Поддержка интернет-магазина",
      desc: "Отвечает на вопросы о товарах и правилах компании. Помогает клиентам и менеджерам одновременно.",
    },
    {
      icon: Database,
      title: "Внутренние базы знаний",
      desc: "Быстрый доступ сотрудников ко всей накопленной информации компании через удобный чат.",
    },
  ]

  return (
    <section className="py-20 bg-zinc-50" id="solutions">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3d4f6f]">
            Как LeoAgent работает в разных отделах
          </h2>
          <p className="text-[#6b7a90] mt-3 max-w-2xl mx-auto">
            Примеры использования для решения реальных бизнес-задач
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl border border-zinc-200 hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <uc.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-base font-semibold text-[#3d4f6f] mb-2">{uc.title}</h3>
              <p className="text-sm text-[#6b7a90] leading-relaxed">{uc.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#6b7a90] mt-10">
          Вы можете создать несколько агентов под разные отделы и сценарии
        </p>
      </div>
    </section>
  )
}

// ==================== КЕЙСЫ КЛИЕНТОВ ====================
function ClientCasesSection() {
  const cases = [
    {
      title: "Хатимаки",
      type: "Сеть ресторанов",
      desc: "Исправили ошибки в данных, увидели отменённые заявки, которые не привели к продажам, и получили ROMI 437%.",
      metricLabel: "СТОИМОСТЬ ПРОДАЖИ",
      metricValue: "-27%",
      image: "/case-restaurant.png"
    },
    {
      title: "Fabric",
      type: "Текстильная фабрика",
      desc: "За месяц работы с Roistat снизили стоимость рекламного лида более, чем в 5,5 раз.",
      metricLabel: "КОНВЕРСИЯ В ЗАЯВКУ",
      metricValue: "+413%",
      image: "/case-textile.png"
    },
    {
      title: "Мегагрупп.ру",
      type: "Веб-студия",
      desc: "Оптимизировали рекламу и увеличили количество заявок в 2,7 раза, а продаж — в 5 раз.",
      metricLabel: "КОЛИЧЕСТВО ПРОДАЖ",
      metricValue: "x5",
      image: "/case-web.png"
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3d4f6f]">
            Кейсы наших клиентов
          </h2>
          <Link href="#" className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-3 text-sm font-medium">
            Смотреть все кейсы
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Image with overlay */}
              <div className="relative h-48 bg-zinc-100">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-md">{c.title}</h3>
                  <p className="text-sm text-zinc-200 drop-shadow-md">{c.type}</p>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-[#6b7a90] leading-relaxed flex-1">{c.desc}</p>

                <div className="mt-4 mb-4">
                  <p className="text-xs text-zinc-400 uppercase tracking-wider">{c.metricLabel}</p>
                  <p className="text-3xl font-bold text-blue-600">{c.metricValue}</p>
                </div>

                <Link href="/ru/blog/vash-ai-agent-v-telegram" className="w-full py-3 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2">
                  Подробнее
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== АНАЛИТИКА (упрощенная) ====================
function AnalyticsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3d4f6f] mb-4">
              Прозрачная аналитика и отчётность
            </h2>
            <p className="text-lg text-[#6b7a90] leading-relaxed">
              Полный контроль над эффективностью каждого вашего AI-ассистента. Отслеживайте метрики, анализируйте диалоги, улучшайте качество ответов.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-zinc-50 rounded-3xl border border-zinc-200 p-8"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-zinc-100">
                <span className="text-[#6b7a90]">Обработано диалогов</span>
                <span className="text-2xl font-bold text-[#3d4f6f]">1,247</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-zinc-100">
                <span className="text-[#6b7a90]">Средняя оценка</span>
                <span className="text-2xl font-bold text-green-600">4.8 ⭐</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-zinc-100">
                <span className="text-[#6b7a90]">Автоматически решено</span>
                <span className="text-2xl font-bold text-[#3d4f6f]">87%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ==================== ФОРМА ЗАЯВКИ (Контакты) ====================
function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const { trackFormSubmit } = useAnalytics()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Phone validation (Russian format: 10-11 digits)
    const phoneClean = formData.phone.replace(/\D/g, "")
    if (!phoneClean || phoneClean.length < 10 || phoneClean.length > 11) {
      toast.error("Введите корректный номер телефона (10-11 цифр)")
      return
    }

    setIsLoading(true)
    try {
      const result = await createLead({
        name: formData.name || undefined,
        phone: formData.phone,
        comment: "Форма заявки (Landing)"
      })

      if (result.success) {
        toast.success("Заявка отправлена! Мы скоро свяжемся с вами.")
        setFormData({ name: "", phone: "" })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error("Ошибка при отправке. Попробуйте позже.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700" id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Оставьте заявку
          </h2>
          <p className="text-blue-100 text-lg">
            Мы свяжемся с вами и поможем настроить AI-агента под ваши задачи
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#3d4f6f] mb-2">
                Имя
              </label>
              <input
                type="text"
                placeholder="Как вас зовут?"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full h-12 px-4 rounded-xl border border-zinc-200 text-[#3d4f6f] placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3d4f6f] mb-2">
                Телефон *
              </label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                pattern="[+]?[0-9\s()-]{10,18}"
                title="Введите номер телефона (10-11 цифр)"
                className="w-full h-12 px-4 rounded-xl border border-zinc-200 text-[#3d4f6f] placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Отправить заявку
              </>
            )}
          </button>
          <p className="text-center text-sm text-zinc-500 mt-4">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </motion.form>
      </div>
    </section>
  )
}

// ==================== ТАРИФЫ (синий) ====================
function PricingNew() {
  const { trackClick } = useAnalytics()

  const plans = [
    {
      name: "Старт",
      price: "0",
      period: "бесплатно",
      docs: "3 документа",
      dialogs: "10 диалогов",
      features: ["1 агент", "Базовая аналитика"],
      cta: "Начать бесплатно",
      highlighted: false,
    },
    {
      name: "Базовый",
      price: "3 900",
      period: "/мес",
      docs: "40 документов",
      dialogs: "200 диалогов",
      features: ["3 агента", "Telegram интеграция", "Email поддержка"],
      cta: "Выбрать",
      highlighted: false,
    },
    {
      name: "Профессиональный",
      price: "9 900",
      period: "/мес",
      docs: "150 документов",
      dialogs: "800 диалогов",
      features: ["10 агентов", "Все интеграции", "Приоритетная поддержка"],
      cta: "Выбрать",
      highlighted: true,
    },
    {
      name: "Бизнес",
      price: "39 900",
      period: "/мес",
      docs: "800 документов",
      dialogs: "4 000 диалогов",
      features: ["Без лимита агентов", "Выделенный менеджер", "SLA 99.9%"],
      cta: "Связаться",
      highlighted: false,
    },
  ]

  const handlePlanClick = (planName: string) => {
    trackClick(`tariff_${planName}`, { plan: planName })
  }

  return (
    <section className="py-20 bg-blue-600" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Тарифы
          </h2>
          <p className="text-blue-100 mt-3">
            Выберите план под ваши задачи
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-6 rounded-3xl border flex flex-col h-full ${plan.highlighted
                ? "bg-white text-[#3d4f6f] border-white shadow-xl scale-105"
                : "bg-blue-500/30 backdrop-blur-sm text-white border-blue-400/30"
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-[#3d4f6f] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Популярный
                </div>
              )}
              <h3 className={`text-lg font-bold ${plan.highlighted ? "text-[#3d4f6f]" : "text-white"}`}>
                {plan.name}
              </h3>
              <div className="mt-4 mb-2">
                <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-[#3d4f6f]" : "text-white"}`}>
                  {plan.price} ₽
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-[#6b7a90]" : "text-blue-100"}`}>
                  {plan.period}
                </span>
              </div>
              <div className={`text-sm mb-6 ${plan.highlighted ? "text-[#6b7a90]" : "text-blue-100"}`}>
                {plan.docs} • {plan.dialogs}
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 ${plan.highlighted ? "text-blue-600" : "text-white"}`} />
                    <span className={plan.highlighted ? "text-[#6b7a90]" : "text-blue-50"}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <button
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                    }`}>
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 p-8 bg-blue-500/30 backdrop-blur-sm rounded-3xl border border-blue-400/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-bold text-white">Энтерпрайз</h3>
            <p className="text-blue-100 mt-1">Установка на ваш сервер. Доработка под ваши задачи. Премиальная поддержка.</p>
          </div>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
            Связаться с нами
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== О НАС ====================
function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3d4f6f]">
            О нас
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#3d4f6f] mb-4">
              10+ лет<br />в корпоративной разработке
            </h3>
            <p className="text-[#6b7a90] leading-relaxed">
              Мы пришли из мира «серьёзного» софта: корпоративные системы, сложные интеграции, безопасность и поддержка в проде. Это помогает делать LeoAgent не просто красивым продуктом, а решением, которое выдерживает реальные бизнес-нагрузки.
            </p>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-[#3d4f6f] mb-4">
              Фокус на бизнес-результате
            </h3>
            <p className="text-[#6b7a90] leading-relaxed">
              Наша цель — не «ещё один ИИ-чат», а снижение нагрузки на экспертов, более быстрый онбординг и меньше ошибок в операционке. Мы считаем успехом только те внедрения, где ИИ реально экономит время и деньги.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



// ==================== MAIN PAGE ====================
export default function NewLandingPage() {
  // Track scroll depth for key sections
  useScrollTracking(["pricing", "contact", "partners", "footer"])

  return (
    <>
      {/* 1. Hero with Pain Story + Marquee */}
      <HeroSectionNew />

      {/* 2. Преимущества платформы (6 cards) */}
      <AdvantagesSection />

      {/* 3. 4 Шага настройки */}
      <StepsSection />

      {/* 3.5 CTA Block */}
      <CTASection />

      {/* 4. Для кого */}
      <ForWhoSection />

      {/* 5. Отзывы */}
      <TestimonialsNew />

      {/* 6. Тарифы (синий) */}
      <PricingNew />

      {/* 7. Примеры решения */}
      <UseCasesSection />

      {/* 8. Кейсы клиентов */}
      {/* 8. Кейсы клиентов */}
      <CasesSection />

      {/* 9. О нас */}
      <AboutSection />

      {/* 9. Footer (4 columns) */}
      {/* Partners / Referral Program */}
      <div id="partners">
        <PartnersSection />
      </div>

      <BlogSection />

      {/* 10. Форма заявки */}
      <ContactFormSection />

      <RoistatFooter />


    </>
  )
}
