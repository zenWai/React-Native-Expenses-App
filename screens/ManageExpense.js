import {Text} from "react-native";
import {useLayoutEffect} from "react";

function ManageExpense({ route, navigation }) {
    //check if we are editing item or adding
    //from where is screen getting called?
    //If params is undefined we are adding
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    return <Text>Manage Expense Screen</Text>
}

export default ManageExpense;