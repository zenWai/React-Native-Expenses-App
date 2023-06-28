import {StyleSheet, Text, View} from "react-native";
import Input from "./input";
import {useState} from "react";
import Button from "../UI/Button";
import {getFormattedDate} from "../../util/date";
import {GlobalStyles} from "../../constants/styles";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toFixed(2).toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid =
            expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid =
            expenseData.description.trim().length > 0;
        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            /*Alert.alert('Invalid Input', 'Please Check Your Input Values');*/
            setInputs((currInputs) => {
                return {
                    amount: { value: currInputs.amount.value, isValid: amountIsValid },
                    date: { value: currInputs.date.value, isValid: dateIsValid },
                    description: { value: currInputs.description.value, isValid: descriptionIsValid },
                };
            })
            return;
        }
        onSubmit(expenseData);
    }

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currInputs) => {
            return {
                ...currInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Expense</Text>
            <View style={styles.inputsRow}>
                <Input label="Amount"
                       style={styles.rowInput}
                       isValid={inputs.amount.isValid}
                       textInputConfig={{
                           keyboardType: "decimal-pad",
                           onChangeText: inputChangedHandler.bind(this, 'amount'),
                           value: inputs.amount.value,
                       }}
                />
                <Input label="Date"
                       style={styles.rowInput}
                       isValid={inputs.date.isValid}
                       textInputConfig={{
                           placeholder: 'YYYY-MM-DD',
                           maxLength: 10,
                           onChangeText: inputChangedHandler.bind(this, 'date'),
                           value: inputs.date.value,
                       }}
                />
            </View>
            <Input label="Description"
                   isValid={inputs.description.isValid}
                   textInputConfig={{
                       multiline: true,
                       onChangeText: inputChangedHandler.bind(this, 'description'),
                       value: inputs.description.value,
                   }}

            />
            {formIsInvalid && <Text style={styles.errorText}>Invalid input Values - Check your input Values</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button}
                        mode="flat"
                        onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button style={styles.button}
                        onPress={submitHandler}
                >
                    {submitButtonLabel}
                </Button>
            </View>
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
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})
export default ExpenseForm;