interface Savings {
  id: number;
  user_id: number;
  amount: number;
  created_on: Date;
}

interface SavingsDetail {
  id: number;
  saving_id: number;
  type: string;
  amount: number;
  created_on: Date;
}