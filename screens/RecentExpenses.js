import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import {ExpensesContext} from "../store/expenses-context";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);
    /*const [fetchedExpenses, setFetchedExpenses] = useState([]);*/

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            const expenses = await fetchExpenses();
            setIsFetching(false);
            /*setFetchedExpenses(expenses);*/
            expensesCtx.setExpenses(expenses);
        }

        getExpenses();
    }, []);

    if (isFetching) {
        return <LoadingOverlay/>
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date > date7DaysAgo) && (expense.date <= today);
    });
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days"
            fallbackText="No expenses to show for the last 7 days"
        />
    );
}

export default RecentExpenses;