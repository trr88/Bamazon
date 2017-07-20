var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "1208Dawn!",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
});

var start = function() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            pageSize: 11,
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            },
            message: "What product would you like to buy?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }]).then(function(answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    chosenItem = results[i];
                }
            }

            if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                var difference = (chosenItem.stock_quantity - parseInt(answer.quantity));
                var total = (answer.quantity * chosenItem.price);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: difference
                }, {
                    id: chosenItem.id
                }], function(error) {
                    if (error) throw err;
                    console.log("--------------------\nYour order has been placed! \nYour total cost is: $" + total + "\n--------------------");
                    start();
                });
            } else {
                console.log("--------------------\nInsufficient Quantity!\n--------------------");
                start();
            }
        });
    });


};
start();