import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpensModal"
import ExpensList from "./components/ExpensList"
import FilterByCategory from "./components/FilterByCategory"
import SideBar from "./layouts/SideBar"


function App() {

  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0,
    [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>
      <div className="flex h-screen">
        <aside className="bg-red-500 w-32">
          <SideBar />
        </aside>
        <main className="w-full">
          <div className="max-w-3xl md:max-w-xl sm:max-w-xs mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
            {isValidBudget
              ? <BudgetTracker />
              : <BudgetForm />
            }
          </div>

          {isValidBudget && (
            <div className="max-w-3xl md:max-w-xl mx-auto py-10">

              <FilterByCategory />
              <ExpensList />
              <ExpenseModal />
            </div>
          )}
        </main>
      </div>


    </>
  )
}

export default App
