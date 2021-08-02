const defaultPrerequisites = {
  personal_data: {
    current_savings: 1000000,
    income_per_month: 100000,
    expenses_per_month: 0,
    rent_expenses_per_month: 30000,
    deal_period_start_month: 0,
    deal_period_end_month: 12,
    max_repairing_delay_months: 12
  },
  use_credit: true,
  use_no_mortgage: true,
  credit_scheme: {
    interest_rate: 0.015,
    months: 24
  },
};

export default defaultPrerequisites;