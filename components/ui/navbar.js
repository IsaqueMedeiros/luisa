// components/Navbar.js
import React from "react"
import { Menu, X, Wallet, Eye, Wallet as WalletIcon, DollarSign, TrendingUp, Target } from "lucide-react"

export default function Navbar({ showBalance, setShowBalance, patrimonyNum, menuOpen, setMenuOpen, activeView, setActiveView }) {
  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 px-6 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-white/20 rounded-xl transition-colors">
                {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Wallet className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-purple-100 text-sm font-medium">Olá! Bem-vindo</p>
                  <p className="text-white font-bold text-lg">Painel Financeiro</p>
                </div>
              </div>
            </div>
            <button onClick={() => setShowBalance(!showBalance)} 
              className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm">
              <Eye className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <p className="text-purple-100 text-sm mb-2 font-medium">Patrimônio Total</p>
            <p className="text-white text-4xl font-bold mb-4">R$ {showBalance ? patrimonyNum.toLocaleString() : '••••'}</p>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-purple-100 font-medium">+12% este mês</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t p-4 shadow-2xl">
        <div className="flex justify-around">
          {[
            { key: "overview", icon: WalletIcon, label: "Início" },
            { key: "expenses", icon: DollarSign, label: "Gastos" },
            { key: "investments", icon: TrendingUp, label: "Investir" },
            { key: "goals", icon: Target, label: "Metas" }
          ].map(({ key, icon: Icon, label }) => (
            <button key={key} onClick={() => setActiveView(key)}
              className={`flex flex-col items-center gap-2 py-3 px-4 rounded-2xl transition-all duration-300 ${
                activeView === key 
                  ? "text-purple-600 bg-purple-50 shadow-lg scale-105" 
                  : "text-gray-400 hover:text-gray-600"
              }`}>
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
      </nav>
      <div className="h-24 md:hidden" />
    </>
  )
}
