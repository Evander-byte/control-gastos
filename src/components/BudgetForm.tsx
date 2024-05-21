import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = () => {
    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])


    const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-budget', payload: { budget } })
    }
    return (
        <form className="space-y-5" onSubmit={hanldeSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">Definir Presupuesto</label>
            </div>
            <input
                type="number"
                className="w-full bg-white border-gray-200 p-2"
                placeholder="Define tu presupuesto"
                name="budget"
                id="budget"
                value={budget}
                onChange={handleChange}
            />
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer ease-in duration-200 w-full text-white font-bold uppercase rounded-md p-2 disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm
