import {StyleSheet, Text, View} from "react-native";
import Input from "./input";
import {useState} from "react";

function ExpenseForm() {
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: '',
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((currInputValues) => {
            return {
                ...currInputValues,
                [inputIdentifier]: enteredValue
            };
        });
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Expense</Text>
            <View style={styles.inputsRow}>
                <Input label="Amount"
                       style={styles.rowInput}
                       textInputConfig={{
                           keyboardType: "decimal-pad",
                           onChangeText: inputChangedHandler.bind(this, 'amount'),
                           value: inputValues.amount,
                       }}
                />
                <Input label="Date"
                       style={styles.rowInput}
                       textInputConfig={{
                           placeholder: 'DD-MM-YYYY',
                           maxLength: 10,
                           onChangeText: inputChangedHandler.bind(this, 'date'),
                           value: inputValues.date,
                       }}
                />
            </View>
            <Input label="Description"
                   textInputConfig={{
                       multiline: true,
                       onChangeText: inputChangedHandler.bind(this, 'description'),
                       value: inputValues.description,
                   }}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',

    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    }
})
export default ExpenseForm;