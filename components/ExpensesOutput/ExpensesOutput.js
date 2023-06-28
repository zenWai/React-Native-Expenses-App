import {StyleSheet, View} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

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