"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          router.push("/")
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full text-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Página não encontrada</h2>
          <p className="text-xl text-gray-600">
            Ops! Parece que você se perdeu. A página que você está procurando não existe.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <Image src="/logo.svg" alt="Koocher" className="w-44" width={200} height={200} />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-lg text-gray-600">
            Você será redirecionado para a página inicial em {countdown} segundos.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-primary hover:bg-primary/90 text-white text-lg py-6 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para a página inicial
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

