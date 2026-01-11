"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 left-6 z-40 p-3 bg-white border border-gray-200 rounded-full shadow-lg text-[#3d4f6f] hover:text-[#0077FF] hover:border-blue-200 transition-colors"
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    )
}
