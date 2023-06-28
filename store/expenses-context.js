import {createContext, useReducer} from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {
    },
    deleteExpense: (id) => {
    },
    updateExpense: (id, { description, amount, date }) => {
    },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'pair of shoes',
        amount: 59.99,
        date: new Date('2023-03-19')
    },
    {
        id: 'e2',
        description: 'pair of trousers',
        amount: 82.10,
        date: new Date('2023-01-10')
    },
    {
        id: 'e3',
        description: 'stuff',
        amount: 53.15,
        date: new Date('2023-01-22')
    },
    {
        id: 'e4',
        description: 'stuff',
        amount: 59.01,
        date: new Date('2023-03-23')
    },
    {
        id: 'e5',
        description: 'book',
        amount: 99.00,
        date: new Date('2023-03-10')
    },
]

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }

    return <ExpensesContext.Provider>
        {children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider