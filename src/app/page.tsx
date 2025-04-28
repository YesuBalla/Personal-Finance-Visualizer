import AppBarChart from "@/components/AppBarChart"
import AppPieChart from "@/components/AppPieChart"
import ComparisonChart from "@/components/ComparisonChart"
import RecentTransactions from "@/components/RecentTransactions"

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-2 2xl:col-span-3"><ComparisonChart /></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><RecentTransactions /></div>
      <div className="bg-primary-foreground p-4 rounded-lg"><AppPieChart /></div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2"><AppBarChart /></div>
    </div>
  )
}

export default Homepage