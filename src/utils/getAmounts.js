export const getMonthlyPayment = (cost, initialPayment, duration) => {
  return Math.round((cost - initialPayment) * (0.05 * Math.pow((1 + 0.05), duration) / (Math.pow((1 + 0.05), duration) - 1)))
};

export const getTotal = (duration, monthlyPayment) => {
  return Math.round(duration * monthlyPayment)
};

export const getPercentages = (cost, initialPayment) => {
  const persent =  Math.round(100/cost * initialPayment);
  return persent > 100 ? '100%' : `${persent}%`;
}