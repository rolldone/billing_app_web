// numberUtils.js
const formatNumber = (number = 0, symbol = '-') => {
  number = number ?? 0;
  const isNegative = number.toString().includes("-");
  let parts = number.toString().replace(/[^0-9.-]/g, '');
  parts = parts.split(".");
  parts[0] = parts[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let result = parts.join(".");
  result = result.replace(/(\..*)\./g, '$1').replace(/(?!^)-/g, '').replace(/^0+(\d)/gm, '$1');

  return isNegative ? (symbol + result) : result;
};

const unformatNumber = (number = 0, symbol = '-') => {
  number = number ?? 0;
  const isNegative = number.toString().includes("-");

  // Remove non-numeric characters except for the decimal separator and negative sign
  let cleanedNumber = number.toString().replace(/[^0-9.-]/g, '');

  // Parse the cleaned number string into a float
  const floatValue = parseFloat(cleanedNumber);  

  let parts = floatValue.toString().split(".");
  parts[0] = parts[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '');
  const result = parts.join(".");

  return isNaN(result) ? 0 : (isNegative ? -result : result);
};

const toFixed = (number = 0, digits = 0) => {
  const precision = 10 ** digits;
  const n = number * precision * (1 + Number.EPSILON);
  const roundedNumber = Math.round(n) / precision;

  return roundedNumber.toFixed(digits);
};

const onlyNumber = (event) => {
  const charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    event.preventDefault();
  } else {
    return true;
  }
};

export { formatNumber, unformatNumber, toFixed, onlyNumber };
  