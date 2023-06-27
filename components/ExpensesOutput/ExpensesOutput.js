import {StyleSheet, View} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

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

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});

export default ExpensesOutput;