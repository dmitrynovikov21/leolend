"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChatDemo } from "./chat-demo"
import { TelegramIcon, WhatsAppIcon, BitrixIcon, AmoCrmIcon } from "@/components/ui/branding/integration-icons"

export default function HeroLanding() {
  const [email, setEmail] = useState("")

  // Typewriter State
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const phrases = [
    "хаоса в чатах",
    "повторных вопросов",
    "поиска документов",
    "текучки кадров"
  ]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      )

      // Typing Speed Logic
      setTypingSpeed(isDeleting ? 40 : 80)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000) // Pause at end
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(150) // Pause before typing new word
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, phrases, typingSpeed])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background Texture - Dot Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Text */}
          <div className="max-w-xl">
            {/* Reduced Height Wrapper - Fixed Height to prevent jumping */}
            <div className="min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
              {/* Reduced Font Size */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-zinc-900 text-left">
                Освободите свою команду от <br />
                <span className="text-[#1354FC] whitespace-nowrap">
                  {text}
                  <span className="animate-blink ml-1 border-r-4 border-[#1354FC] h-[0.8em] inline-block align-baseline"></span>
                </span>
              </h1>
            </div>

            <p className="text-base text-zinc-500 mt-6 leading-relaxed font-normal max-w-2xl">
              LeoAgent возьмет рутину на себя. Загрузите базу знаний — и через 5 минут ИИ-сотрудник начнет отвечать строго по вашим регламентам. Без больничных, выходных и ошибок.
            </p>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-sm gap-x-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                required
                className="h-11 flex-auto rounded-lg border-0 bg-white/80 px-3.5 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="h-11 rounded-lg bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 transition-colors"
              >
                Получить доступ
              </button>
            </form>

            {/* Integrations with Icons */}
            <div className="mt-8 flex items-center gap-6 cursor-default">
              <div className="group flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <TelegramIcon className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="group flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <WhatsAppIcon className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="group flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <BitrixIcon className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="group flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <AmoCrmIcon className="w-6 h-6 text-zinc-400" />
              </div>
            </div>
          </div>

          {/* Right: Chat Widget */}
          <div className="flex justify-center lg:justify-end w-full">
            <ChatDemo />
          </div>
        </motion.div>
      </div>
      <style jsx global>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  )
}
