#! usr/bin/env node
import inquirer from "inquirer";
//bank account class
class Bankcacount {
    accountNo;
    balance;
    constructor(accountNo, balance) {
        this.accountNo = accountNo;
        this.balance = balance;
    }
    withdarw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdarwl of $ ${amount} successful.\n Remaining balance $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than 100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance:$${this.balance}`);
    }
    checkBalance() {
        console.log(`Current balance:$${this.balance}`);
    }
}
//creating user accounts
const accounts = [
    new Bankcacount(1001, 500),
    new Bankcacount(1002, 1000),
    new Bankcacount(1003, 2000)
];
//creating account holders
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNo;
    account;
    constructor(firstName, lastName, gender, age, mobileNo, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNo = mobileNo;
        this.account = account;
    }
}
const customers = [
    new Customer("aisha", "khuram", "female", 36, 3333883295, accounts[0]),
    new Customer("ayan", "khan", "male", 16, 3062222750, accounts[1]),
    new Customer("amna", "khan", "female", 25, 3222153137, accounts[2]),
];
//function to interact with bank account
async function service() {
    do {
        const accountNoInput = await inquirer.prompt([{
                name: "accountNumber",
                type: "number",
                message: "Enter your Account Number"
            }]);
        const customer = customers.find(customer => customer.account.accountNo === accountNoInput.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select Service",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit"
                        }]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount withdraw"
                        }]);
                    customer.account.withdarw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program");
                    console.log("thank you");
                    return;
            }
        }
        else {
            console.log("Invalid account number");
        }
    } while (true);
}
service();
