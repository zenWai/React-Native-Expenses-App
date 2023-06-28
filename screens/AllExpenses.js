import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {useContext} from "react";

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    return <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod="Total"
        fallbackText="No registered expenses. Start adding some!"
    />
}

export default AllExpenses;