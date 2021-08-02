const defaultMortgages = {
  '245242248': {
    id: 245242248,
    title: 'Sber Family',
    initial_payment_percent: 10,
    initial_expenses: 60000,
    schedule: [
      {
        interest_rate: 0.004,
        months: 20
      },
      {
        interest_rate: 0.01,
        months: 280
      }
    ]
  },
  '563494521': {
    id: 563494521,
    title: 'Sber Government',
    initial_payment_percent: 15,
    initial_expenses: 60000,
    schedule: [
      {
        interest_rate: 0.005083333333333,
        months: 240
      }
    ]
  }
};

export default defaultMortgages;