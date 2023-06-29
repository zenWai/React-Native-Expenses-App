import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpenses, updateExpense} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState();
    //check if we are editing item or adding
    //from where is screen getting called?
    //If params is undefined we are adding
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const expensesCtx = useContext(ExpensesContext);

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    )

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmiting(true);
        try {
            await deleteExpense(editedExpenseId)
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense = try again later');
            setIsSubmiting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmiting(true);
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpenses(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - try again later!')
            setIsSubmiting(false);
        }
    }

    function errorHandler() {
        setError(null);
    }

    if (error && !isSubmiting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }
    if (isSubmiting) {
        return <LoadingOverlay/>;
    }
    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
})
export default ManageExpense;