export const toSafeNumber = (value, fallback = 0) => {
  const sanitized = String(value ?? "").replace(/,/g, "").trim();
  if (!sanitized) {
    return fallback;
  }
  const parsed = Number(sanitized);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const calculateEmiBreakdown = ({ principal, annualRate, years }) => {
  const loanAmount = Math.max(0, toSafeNumber(principal));
  const interestRate = Math.max(0, toSafeNumber(annualRate));
  const loanTermYears = Math.max(0, toSafeNumber(years));

  const totalLoanMonths = Math.round(loanTermYears * 12);
  const interestPerMonth = interestRate / 100 / 12;

  if (loanAmount <= 0 || totalLoanMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalAmount: 0,
      principal: loanAmount,
    };
  }

  let monthlyPayment = 0;

  if (interestPerMonth === 0) {
    monthlyPayment = loanAmount / totalLoanMonths;
  } else {
    const ratePower = (1 + interestPerMonth) ** totalLoanMonths;
    const denominator = ratePower - 1;
    if (Number.isFinite(ratePower) && denominator !== 0) {
      monthlyPayment = (loanAmount * interestPerMonth * ratePower) / denominator;
    }
  }

  if (!Number.isFinite(monthlyPayment)) {
    monthlyPayment = 0;
  }

  const totalAmount = monthlyPayment * totalLoanMonths;
  const totalInterest = Math.max(0, totalAmount - loanAmount);

  return {
    monthlyPayment: Math.max(0, monthlyPayment),
    totalInterest: Number.isFinite(totalInterest) ? totalInterest : 0,
    totalAmount: Number.isFinite(totalAmount) ? totalAmount : 0,
    principal: loanAmount,
  };
};
