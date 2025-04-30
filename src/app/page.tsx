import AppBarChart from "@/components/AppBarChart"
import AppPieChart from "@/components/AppPieChart"
import ComparisonChart from "@/components/ComparisonChart"
import RecentTransactions from "@/components/RecentTransactions"

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
      <div className="col-span-1 xl:col-span-4 bg-primary-foreground p-6 rounded-2xl shadow-sm">
        <ComparisonChart />
      </div>

      <div className="col-span-1 xl:col-span-2 bg-primary-foreground p-6 rounded-2xl shadow-sm">
        <RecentTransactions />
      </div>

      <div className="col-span-1 xl:col-span-2 bg-primary-foreground p-6 rounded-2xl shadow-sm">
        <AppPieChart />
      </div>

      <div className="col-span-1 xl:col-span-4 bg-primary-foreground p-6 rounded-2xl shadow-sm">
        <AppBarChart />
      </div>
    </div>
  )
}

export default Homepage