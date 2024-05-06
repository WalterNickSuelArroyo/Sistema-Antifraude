const mysql = require('mysql');
const Transaction = require('../../core/entities/transaction');

class TransactionRepository {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'sistemaantifraude'
        });
        this.connection.connect(error => {
            if (error) throw error;
            console.log('Successfully connected to the database.');
        });
    }

    getAllTransactions() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM transactions', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const transactions = results.map(row => new Transaction(row.id, row.userId, row.amount, new Date(row.timestamp)));
                    resolve(transactions);
                }
            });
        });
    }
}

module.exports = TransactionRepository;