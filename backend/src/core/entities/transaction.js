class Transaction {
    constructor(id, userId, amount, timestamp) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    isHighAmount() {
        return this.amount > 5000; // Suponiendo que S/ 5000 es el límite para una alerta amarilla
    }

    isLateNightTransaction() {
        const hour = this.timestamp.getHours();
        return hour >= 2 && hour < 6; // Transacciones entre las 2:00 AM y las 6:00 AM
    }

    isFrequentTransaction(transactions) {
        // Esta función asume que `transactions` es una lista de transacciones recientes del mismo usuario
        const recentTransactions = transactions.filter(t =>
            (this.timestamp - t.timestamp) / 60000 < 60); // Transacciones en la última hora
        return recentTransactions.length >= 3; // Más de tres transacciones seguidas en menos de una hora
    }
}

module.exports = Transaction;

