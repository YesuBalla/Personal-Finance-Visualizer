import AppBarChart from "@/components/AppBarChart"
import AppPieChart from "@/components/AppPieChart"
import ComparisonChart from "@/components/ComparisonChart"
import RecentTransactions from "@/components/RecentTransactions"

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3 xl:col-span-2 2xl:col-span-3"><ComparisonChart /></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><RecentTransactions /></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><AppPieChart /></div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3 xl:col-span-2 2xl:col-span-3"><AppBarChart /></div>
    </div>
  )
}

export default Homepage