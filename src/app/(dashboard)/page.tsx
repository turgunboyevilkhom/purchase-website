"use client"

import { useState } from "react"
import {
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
} from "recharts"

// Sample data for charts
const inventoryTrendData = [
  { month: "Yan", value: 45000000 },
  { month: "Fev", value: 52000000 },
  { month: "Mar", value: 48000000 },
  { month: "Apr", value: 61000000 },
  { month: "May", value: 55000000 },
  { month: "Iyn", value: 67000000 },
]

const inventoryHealthData = [
  { name: "Normal", value: 65, color: "#99C61E" },
  { name: "Kam qolgan", value: 20, color: "#F59E0B" },
  { name: "Tugagan", value: 8, color: "#EF4444" },
  { name: "Ortiqcha", value: 7, color: "#004B34" },
]

const categoryData = [
  { name: "Ichimliklar", value: 35000000 },
  { name: "Oziq-ovqat", value: 28000000 },
  { name: "Gigiyena", value: 15000000 },
  { name: "Maishiy texnika", value: 12000000 },
  { name: "Boshqa", value: 8000000 },
]

const agingData = [
  { range: "0-30 kun", value: 45 },
  { range: "31-60 kun", value: 25 },
  { range: "61-90 kun", value: 15 },
  { range: "90+ kun", value: 15 },
]

const abcData = [
  { name: "A (70%)", value: 70, color: "#99C61E" },
  { name: "B (20%)", value: 20, color: "#004B34" },
  { name: "C (10%)", value: 10, color: "#6B7280" },
]

const turnoverData = [
  { month: "Yan", turnover: 4.2 },
  { month: "Fev", turnover: 4.5 },
  { month: "Mar", turnover: 3.8 },
  { month: "Apr", turnover: 5.1 },
  { month: "May", turnover: 4.7 },
  { month: "Iyn", turnover: 5.3 },
]

const abcXyzMatrix = [
  { abc: "A", xyz: "X", count: 25, color: "bg-[#99C61E]" },
  { abc: "A", xyz: "Y", count: 15, color: "bg-[#7BA817]" },
  { abc: "A", xyz: "Z", count: 8, color: "bg-[#5D8A10]" },
  { abc: "B", xyz: "X", count: 12, color: "bg-[#004B34]" },
  { abc: "B", xyz: "Y", count: 18, color: "bg-[#006644]" },
  { abc: "B", xyz: "Z", count: 10, color: "bg-[#008855]" },
  { abc: "C", xyz: "X", count: 5, color: "bg-gray-500" },
  { abc: "C", xyz: "Y", count: 8, color: "bg-gray-400" },
  { abc: "C", xyz: "Z", count: 20, color: "bg-gray-300" },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("month")
  const inventoryScore = 78

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-[#99C61E]"
    if (score >= 60) return "bg-[#004B34]"
    if (score >= 40) return "bg-amber-500"
    return "bg-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "A'lo"
    if (score >= 60) return "Yaxshi"
    if (score >= 40) return "O'rtacha"
    return "Yomon"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#004B34]">
            Inventar boshqaruvi
          </h1>
          <p className="text-sm text-[#004B34]/60">
            Omboringiz holatini kuzating
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Hafta</SelectItem>
              <SelectItem value="month">Oy</SelectItem>
              <SelectItem value="quarter">Chorak</SelectItem>
              <SelectItem value="year">Yil</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Inventory Health Score */}
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">Inventar sog'ligi</h3>
              <p className="text-sm text-slate-500">
                Umumiy inventar holati bahosi
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold">{inventoryScore}</div>
                <div className="text-sm text-slate-500">/100 ball</div>
              </div>
              <div className="w-48">
                <Progress
                  value={inventoryScore}
                  className={`h-3 ${getScoreColor(inventoryScore)}`}
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500">
                  <span>Yomon</span>
                  <span className="font-medium text-slate-700">
                    {getScoreLabel(inventoryScore)}
                  </span>
                  <span>A&apos;lo</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ABC-XYZ Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle>ABC-XYZ Tahlili</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium">
              <div>X</div>
              <div>Y</div>
              <div>Z</div>
            </div>
            <div></div>
            {["A", "B", "C"].map((abc) => (
              <div key={abc} className="contents">
                <div className="flex items-center justify-center text-sm font-medium">
                  {abc}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["X", "Y", "Z"].map((xyz) => {
                    const cell = abcXyzMatrix.find(
                      (c) => c.abc === abc && c.xyz === xyz
                    )
                    return (
                      <div
                        key={`${abc}-${xyz}`}
                        className={`${cell?.color} flex h-16 items-center justify-center rounded-lg text-white font-semibold`}
                      >
                        {cell?.count}
                      </div>
                    )
                  })}
                </div>
                <div></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#99C61E]/20 hover:shadow-lg hover:shadow-[#99C61E]/10 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004B34]/10">
                <Package className="h-6 w-6 text-[#004B34]" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Jami SKU</p>
                <p className="text-2xl font-bold text-[#004B34]">1,248</p>
                <p className="text-xs text-[#99C61E]">+12 bu oy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#99C61E]/20 hover:shadow-lg hover:shadow-[#99C61E]/10 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#99C61E]/10">
                <DollarSign className="h-6 w-6 text-[#99C61E]" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Umumiy qiymat</p>
                <p className="text-2xl font-bold text-[#004B34]">98.5M</p>
                <p className="text-xs text-[#99C61E]">+8.2% o&apos;sish</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#99C61E]/20 hover:shadow-lg hover:shadow-[#99C61E]/10 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#004B34]/10">
                <TrendingUp className="h-6 w-6 text-[#004B34]" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Inventar aylanmasi</p>
                <p className="text-2xl font-bold text-[#004B34]">5.3x</p>
                <p className="text-xs text-[#99C61E]">+0.6 o&apos;tgan oydan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 hover:shadow-lg hover:shadow-red-100/50 transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-[#004B34]/60">Tugagan mahsulotlar</p>
                <p className="text-2xl font-bold text-[#004B34]">23</p>
                <p className="text-xs text-red-500">Zudlik bilan to&apos;ldiring</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Umumiy ko&apos;rinish</TabsTrigger>
          <TabsTrigger value="abc">ABC/XYZ Tahlili</TabsTrigger>
          <TabsTrigger value="inventory">Inventar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Inventory Value Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Inventar qiymati trendi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={inventoryTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis
                        tickFormatter={(value) =>
                          `${(value / 1000000).toFixed(0)}M`
                        }
                      />
                      <Tooltip
                        formatter={(value: number) =>
                          `${(value / 1000000).toFixed(1)}M UZS`
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#004B34"
                        fill="#99C61E"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Health Pie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Inventar holati</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryHealthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {inventoryHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Kategoriya bo&apos;yicha qiymat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        tickFormatter={(value) =>
                          `${(value / 1000000).toFixed(0)}M`
                        }
                      />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip
                        formatter={(value: number) =>
                          `${(value / 1000000).toFixed(1)}M UZS`
                        }
                      />
                      <Bar dataKey="value" fill="#004B34" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Aging */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Inventar eskirishi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <Bar dataKey="value" fill="#99C61E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Issue Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600">
                      Tugagan mahsulotlar
                    </p>
                    <p className="text-sm text-[#004B34]/60">Zudlik bilan to&apos;ldirish kerak</p>
                  </div>
                  <Badge variant="destructive" className="text-lg">
                    23
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-amber-600">
                      Kam qolgan mahsulotlar
                    </p>
                    <p className="text-sm text-[#004B34]/60">Minimal darajadan past</p>
                  </div>
                  <Badge className="bg-amber-500 text-white text-lg">
                    45
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#004B34] hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[#004B34]">
                      Ortiqcha mahsulotlar
                    </p>
                    <p className="text-sm text-[#004B34]/60">Optimal darajadan yuqori</p>
                  </div>
                  <Badge className="bg-[#004B34] text-white text-lg">18</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="abc" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* ABC Analysis Pie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ABC Tahlili</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={abcData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name }) => name}
                      >
                        {abcData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* ABC-XYZ Matrix Detail */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">ABC-XYZ Matritsasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-center text-sm font-medium">
                    <div></div>
                    <div className="text-[#99C61E]">X (Barqaror)</div>
                    <div className="text-amber-600">Y (O&apos;zgaruvchan)</div>
                    <div className="text-red-500">Z (Nobarqaror)</div>
                  </div>
                  {["A", "B", "C"].map((abc) => (
                    <div key={abc} className="grid grid-cols-4 gap-2">
                      <div className="flex items-center justify-center font-medium">
                        {abc === "A" && "A (Yuqori qiymat)"}
                        {abc === "B" && "B (O'rta qiymat)"}
                        {abc === "C" && "C (Past qiymat)"}
                      </div>
                      {["X", "Y", "Z"].map((xyz) => {
                        const cell = abcXyzMatrix.find(
                          (c) => c.abc === abc && c.xyz === xyz
                        )
                        return (
                          <div
                            key={`${abc}-${xyz}`}
                            className={`${cell?.color} flex h-20 flex-col items-center justify-center rounded-lg text-white`}
                          >
                            <span className="text-2xl font-bold">
                              {cell?.count}
                            </span>
                            <span className="text-xs">mahsulot</span>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Inventory Turnover */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Inventar aylanmasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={turnoverData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="turnover"
                        stroke="#004B34"
                        strokeWidth={2}
                        dot={{ fill: "#99C61E" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Days of Supply */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Ta&apos;minot kunlari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full -rotate-90 transform">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#99C61E"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(45 / 60) * 440} 440`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-[#004B34]">45</span>
                      <span className="text-sm text-[#004B34]/60">kun</span>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-sm text-[#004B34]/60">
                    Joriy inventar 45 kun davomida yetarli
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
