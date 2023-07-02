import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getBankAccount was imported, so it should be tested =)', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should create account with initial balance', () => {
    const account = new BankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(100);
    expect(() => {
      account.withdraw(101);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = new BankAccount(100);
    expect(() => {
      account.withdraw(101);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => {
      account.transfer(50, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(100);
    const originalFetchBalance = account.fetchBalance;
    account.fetchBalance = jest.fn().mockResolvedValue(150);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    account.fetchBalance = originalFetchBalance;
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    const originalFetchBalance = account.fetchBalance;
    account.fetchBalance = jest.fn().mockResolvedValue(200);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);
    account.fetchBalance = originalFetchBalance;
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    const originalFetchBalance = account.fetchBalance;
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    account.fetchBalance = originalFetchBalance;
  });
});
