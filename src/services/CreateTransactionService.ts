import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (transaction.type === 'outcome' && total < transaction.value)
      throw Error('Impossible situation!');
    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
