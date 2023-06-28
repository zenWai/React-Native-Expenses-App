import axios from 'axios';

const BACKEND_URL = 'https://react-native-expense-app-e1971-default-rtdb.europe-west1.firebasedatabase.app';

export function storeExpenses(expenseData) {
    axios.post(
        BACKEND_URL + '/expenses.json',
        expenseData
    );
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    const expenses = [];
    /*console.log(response.data);*/
    for(const key in response.data) {
        const expenseObj= {
            if: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }
    return expenses;
}