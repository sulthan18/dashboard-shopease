'use client'

import React, { useState } from 'react'
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Package,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Sector
} from 'recharts'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

// Enhanced color palette with modern, harmonious colors
const COLOR_PALETTE = {
  primary: '#3B82F6',    // Vibrant Blue
  secondary: '#10B981',  // Emerald Green
  accent: '#6366F1',     // Indigo
  background: '#F3F4F6', // Light Gray
  text: '#FFFFFF',       // Dark Gray
  gradientStart: '#60A5FA', // Light Blue
  gradientEnd: '#3B82F6',   // Darker Blue
}

// Sample data with more dynamic structure
const salesData = [
  { 
    month: 'Jan', 
    revenue: 4000, 
    orders: 240, 
    customers: 180, 
    averageOrderValue: 16.67, 
    growth: 5.2,
    categories: [
      { name: 'Electronics', value: 1200, color: COLOR_PALETTE.primary },
      { name: 'Clothing', value: 800, color: COLOR_PALETTE.secondary },
      { name: 'Home & Kitchen', value: 600, color: COLOR_PALETTE.accent },
      { name: 'Books', value: 400, color: '#8B5CF6' }
    ]
  },
  { 
    month: 'Feb', 
    revenue: 3000, 
    orders: 139, 
    customers: 210, 
    averageOrderValue: 21.58, 
    growth: -3.1,
    categories: [
      { name: 'Electronics', value: 900, color: COLOR_PALETTE.primary },
      { name: 'Clothing', value: 700, color: COLOR_PALETTE.secondary },
      { name: 'Home & Kitchen', value: 500, color: COLOR_PALETTE.accent },
      { name: 'Books', value: 300, color: '#8B5CF6' }
    ]
  },
  // Add more months as needed
]

export default function DashboardPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Calculations
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0)
  const averageOrderValue = (salesData.reduce((sum, item) => sum + item.averageOrderValue, 0) / salesData.length).toFixed(2)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0)
  const lastMonthGrowth = salesData[salesData.length - 1].growth

  // Category sales data for pie chart
  const categorySalesData = salesData[salesData.length - 1].categories

  // Custom Pie Chart Active Shape
  const renderActiveShape = (props: any) => {
    const { 
      cx, cy, midAngle, innerRadius, outerRadius, 
      startAngle, endAngle, fill, payload, percent, value 
    } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text 
          x={ex + (cos >= 0 ? 1 : -1) * 12} 
          y={ey} 
          textAnchor={cos >= 0 ? 'start' : 'end'}
          fill={COLOR_PALETTE.text}
        >
          {payload.name}
        </text>
        <text 
          x={ex + (cos >= 0 ? 1 : -1) * 12} 
          y={ey + 20} 
          textAnchor={cos >= 0 ? 'start' : 'end'}
          fill={COLOR_PALETTE.text}
        >
          {`${value} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div 
      className="min-h-screen p-6" 
      style={{
        // background: `linear-gradient(135deg, ${COLOR_PALETTE.gradientStart}, ${COLOR_PALETTE.gradientEnd})`,
        color: COLOR_PALETTE.text
      }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Sales Dashboard</h1>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { 
              title: 'Total Revenue', 
              value: `$${totalRevenue.toLocaleString()}`, 
              icon: DollarSign,
              growth: lastMonthGrowth,
            },
            { 
              title: 'Total Orders', 
              value: totalOrders.toString(), 
              icon: ShoppingCart,
              growth: (totalOrders / salesData.length),
            },
            { 
              title: 'Avg Order Value', 
              value: `$${averageOrderValue}`, 
              icon: Package,
              growth: parseFloat(averageOrderValue),
            },
            { 
              title: 'Total Customers', 
              value: totalCustomers.toString(), 
              icon: Users,
              growth: (totalCustomers / salesData.length),
            }
          ].map((metric) => (
            <Card 
              key={metric.title} 
              className=" backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold text-gray-600">{metric.title}</div>
                  <metric.icon className="h-5 w-5 text-gray-500" />
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center text-xs ${metric.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {Math.abs(metric.growth).toFixed(1)}% this month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sales Performance Chart */}
          <Card className="bg-blue/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white-800">Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={salesData}>
                  <CartesianGrid 
                    stroke={COLOR_PALETTE.background} 
                    strokeDasharray="3 3" 
                  />
                  <XAxis 
                    dataKey="month" 
                    stroke={COLOR_PALETTE.text}
                    tick={{ fill: COLOR_PALETTE.text }}
                  />
                  <YAxis 
                    stroke={COLOR_PALETTE.text}
                    tick={{ fill: COLOR_PALETTE.text }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="revenue" 
                    barSize={20} 
                    fill={COLOR_PALETTE.primary} 
                    radius={[5, 5, 0, 0]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke={COLOR_PALETTE.secondary} 
                    strokeWidth={3}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product Category Chart */}
          <Card className="bg-blue/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white-800">Product Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color || COLOR_PALETTE.primary} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}