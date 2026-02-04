import { ArrowDownLeft, ArrowUpRight, CreditCard, Plus, Wallet, TrendingUp, TrendingDown, History } from "lucide-react";
import MobileShell from "@/components/layout/MobileShell";
import ScreenHeader from "@/components/layout/ScreenHeader";
import { useState } from "react";

const transactions = [
  {
    id: 1,
    type: "income",
    title: "Sayohat #2847 to'lovi",
    amount: "+2,450,000",
    date: "25 Yanvar, 14:30",
    status: "completed",
    category: "trip",
  },
  {
    id: 2,
    type: "expense",
    title: "Gumruk to'lovi",
    amount: "-850,000",
    date: "24 Yanvar, 11:20",
    status: "completed",
    category: "customs",
  },
  {
    id: 3,
    type: "expense",
    title: "Yo'l to'lovi - M39",
    amount: "-125,000",
    date: "23 Yanvar, 09:15",
    status: "completed",
    category: "road",
  },
  {
    id: 4,
    type: "income",
    title: "Bonus - oylik",
    amount: "+500,000",
    date: "20 Yanvar, 16:00",
    status: "completed",
    category: "bonus",
  },
  {
    id: 5,
    type: "expense",
    title: "Jarima - tezlik",
    amount: "-350,000",
    date: "18 Yanvar, 13:45",
    status: "pending",
    category: "fine",
  },
];

const PaymentsScreen = () => {
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "all") return true;
    return tx.type === activeTab;
  });

  const totalIncome = transactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + parseInt(tx.amount.replace(/[+,]/g, '')), 0);

  const totalExpense = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + Math.abs(parseInt(tx.amount.replace(/[-,]/g, ''))), 0);

  return (
    <MobileShell>
      <div className="safe-area-top">
        <ScreenHeader 
          title="To'lovlar"
          rightAction={
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary">
              <History size={20} className="text-foreground" />
            </button>
          }
        />

        {/* Balance Card */}
        <div className="px-4 py-3">
          <div className="gradient-primary rounded-2xl p-5 text-primary-foreground shadow-primary">
            <div className="flex items-center gap-2 mb-1">
              <Wallet size={18} className="opacity-80" />
              <span className="text-sm opacity-80">Turon Coin balansi</span>
            </div>
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-4xl font-bold">4,625,000</span>
              <span className="text-sm opacity-80">UZS</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3.5 bg-primary-foreground/20 hover:bg-primary-foreground/25 rounded-xl font-semibold transition-colors">
                <Plus size={18} />
                To'ldirish
              </button>
              <button className="flex items-center justify-center gap-2 py-3.5 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold transition-colors">
                <CreditCard size={18} />
                To'lash
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-2xl p-4 shadow-card border-l-4 border-success">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp size={18} className="text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Kirim</span>
              </div>
              <p className="text-xl font-bold text-success">+2,950,000</p>
              <p className="text-xs text-muted-foreground mt-1">Bu oy</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-card border-l-4 border-destructive">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <TrendingDown size={18} className="text-destructive" />
                </div>
                <span className="text-sm text-muted-foreground">Chiqim</span>
              </div>
              <p className="text-xl font-bold text-destructive">-1,325,000</p>
              <p className="text-xs text-muted-foreground mt-1">Bu oy</p>
            </div>
          </div>
        </div>

        {/* Payment Apps */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">To'lov ilovalari</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="bg-white rounded-2xl p-4 shadow-card border border-border/60 flex flex-col items-center gap-3"
              aria-label="Payme ilovasi"
            >
              <img
                src="/payme.svg"
                alt="Payme"
                className="w-16 h-16"
              />
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">Payme</p>
                <p className="text-xs text-muted-foreground">To'lov uchun</p>
              </div>
            </button>
            <button
              type="button"
              className="bg-[#1F2024] rounded-2xl p-4 shadow-card border border-white/10 flex flex-col items-center gap-3 text-white"
              aria-label="Click ilovasi"
            >
              <img
                src="/click.svg"
                alt="Click"
                className="w-16 h-16"
              />
              <div className="text-center">
                <p className="text-sm font-semibold">Click</p>
                <p className="text-xs text-white/70">To'lov uchun</p>
              </div>
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">So'nggi operatsiyalar</h2>
            <button className="text-sm text-primary font-medium">Hammasi</button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { key: "all", label: "Hammasi" },
              { key: "income", label: "Kirim" },
              { key: "expense", label: "Chiqim" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="list-item">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    tx.type === "income" ? "bg-success/10" : "bg-destructive/10"
                  }`}
                >
                  {tx.type === "income" ? (
                    <ArrowDownLeft size={20} className="text-success" />
                  ) : (
                    <ArrowUpRight size={20} className="text-destructive" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{tx.title}</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      tx.type === "income" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {tx.amount}
                  </p>
                  {tx.status === "pending" && (
                    <span className="inline-flex items-center gap-1 text-xs text-warning font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse-soft" />
                      Kutilmoqda
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default PaymentsScreen;