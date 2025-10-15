// Currency conversion utility
const USD_TO_INR_RATE = 83.5; // Approximate conversion rate

export const convertToINR = (usdPrice: number): number => {
  return Math.round(usdPrice * USD_TO_INR_RATE);
};

export const formatINR = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatINRWithDecimals = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '₹0.00';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};