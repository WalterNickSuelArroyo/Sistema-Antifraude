const TransactionRepository = require('../../infrastructure/repositories/transactionRepository');

class FraudDetectionUseCase {
    constructor() {
        this.transactionRepository = new TransactionRepository();
    }

    async detectFraud() {
        const transactions = await this.transactionRepository.getAllTransactions();
        const classifiedTransactions = transactions.map(transaction => {
            let fraudType = 'normal';  // Por defecto es una transacción normal

            const userTransactions = transactions.filter(t => t.userId === transaction.userId);

            if (transaction.isHighAmount()) {
                fraudType = 'highAmount';
            } else if (transaction.isLateNightTransaction()) {
                fraudType = 'lateNight';
            } else if (transaction.isFrequentTransaction(userTransactions)) {
                fraudType = 'frequent';
            }

            return { ...transaction, fraudType }; // Ya no es necesaria la propiedad: fraudType: fraudType
        });

        return classifiedTransactions;
    }
}

module.exports = FraudDetectionUseCase;