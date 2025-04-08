const inquirer = require('inquirer').default;
const supplierActions = require('../Actions/SupplierActions')
const orderActions = require('../Actions/OrderActions');
const orderModel = require('../Model/Orders');

let suppliers = []
let ords = []

async function loadSuppliers() {
    suppliers = await supplierActions.getAllSuppliers()
}
async function loadOrders() {
    ords = await orderActions.getAllOrders()
}

// Gives options of actions for the grocery manager to chooses from.
// According to the action chosen, there is a call to the correct function,
// and then there is an option to choose another action.
async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'Make an order',
                'View all orders',
                'View existing orders',
                'Approve received order',
                'Exit'
            ]
        }
    ])

    switch (action) {
        case 'Make an order':
            await makeAnOrder()
            await mainMenu()
            break;
        case 'View all orders':
            await viewAllOrders()
            await mainMenu()
            break;
        case 'View existing orders':
            await viewExistingOrders()
            await mainMenu()
            break;
        case 'Approve received order':
            await approveOrders()
            await mainMenu()
            break;
        default:
            process.exit();
    }
}

async function makeAnOrder() {
    if (suppliers.length === 0) await loadSuppliers()

    // Prompts the user to choose a supplier.
    const { supplier } = await inquirer.prompt([
        {
            type: 'list',
            name: 'supplier',
            message: 'Choose a supplier',
            choices: suppliers.map(c => ({
                name: c.company,
                value: c
            }))
        }
    ])

    // Prompts the user to choose products to order from a list of products.
    const { items } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'items',
            message: 'Choose merchandise:',
            choices: supplier.mdse.map(m => ({
                name: m.pdct,
                value: m
            }))
        }
    ])

    // Gets an amount from the user for each product chosen.
    const itemAmounts = [];
    let price = 0

    for (let item of items) {
        const { amount } = await inquirer.prompt([
            {
                type: 'input',
                name: 'amount',
                message: `Enter amount for ${item.pdct}. (minimum allowed - ${item.amount}, cost: ${item.price}):`,
                validate: value => !isNaN(value) && Number(value) >= item.amount ? true : 'Enter a valid number'
            }
        ]);
        itemAmounts.push({name: item.pdct, amount: amount})
        price += item.price*amount
    }

    // Add order.
    const order = new orderModel({
        company: supplier.company,
        product: itemAmounts,
        price: price,
        status: 'waiting'
    }) 

    await orderActions.addOrder(order)

    await loadOrders() // Update orders.
}

// Log the orders in a table view.
function logOrders(ord) {
    console.log('Company Name | Product(s) | Total Price | Status');
    console.log('-----------------------------------------------------');

    ord.forEach(o => {
        const companyName = o.company;
        const products = o.product.map(p => `${p.name} - ${p.amount}`).join(', ');
        const totalPrice = o.price;
        const status = o.status;

        
        console.log(`${companyName.padEnd(15)} | ${products.padEnd(30)} | ₪${totalPrice.toFixed(2).padEnd(10)} | ${status}`);
    });
}

async function viewAllOrders() {
    if (ords.length === 0) await loadOrders()
    logOrders(ords) 
}

async function viewExistingOrders() {
    if (ords.length === 0) await loadOrders()
    const orders = ords.filter(o => o.status === 'waiting' || o.status === 'processing')
    logOrders(orders)
}

async function approveOrders() {
    if (ords.length === 0) await loadOrders()

    // Prompt the user to choose the orders he received.
    const { orders } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'orders',
            message: 'Select orders that arrived',
            choices: ords.map(o => ({
                name: `${o.company} - ${o.product.map(p => `${p.name} (${p.amount})`).join(', ')}, Total Price: ${o.price}, Status: ${o.status}`,
                value: o
            }))
        }
    ])

    // And change status to complete.
    for (let order of orders) {
        orderActions.updateOrderStatus(order._id, 'complete')
    }
}

module.exports = { mainMenu }










// function makeAnOrder() {
//     console.log("make an order");
//     console.log(action);

// }

// const questions = [
//     {
//         type: 'list',
//         name: 'action',
//         message: 'What would you like to do?',
//         choices: [
//             'Make an order',
//             'View all orders',
//             'View status of existing order',
//             'Approve received order'
//         ]
//     }
// ];

// function handleUserChoiceQuestions(answer) {
//     switch (answer.action) {
//         case 'Make an order':
//             makeAnOrder()
//             break;
//         case 'View all orders':
//             console.log('Goodbye!');
//             break;
//         case 'View status of existing order':
//             console.log('Exiting...');
//             break;
//         case 'Approve received order':
//             console.log('Exiting...');
//             break;
//         default:
//             console.log('Invalid option');
//             process.exit();
//     }
// }

// inquirer.prompt(questions).then((answers) => {
//     handleUserChoiceQuestions(answers);
// });