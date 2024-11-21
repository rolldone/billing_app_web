import currency from "currency.js";
import { unformatNumber } from "./js/NumberUtils";

const defaultCurrencyOptions = {
    precision: 2,
    separator: ".",
    decimal: ",",
    symbol: "Rp ",
}

const FormatCurrency = (value: any, options?: any) => {
    const numberValue = unformatNumber(value);
    return currency(numberValue, {...defaultCurrencyOptions, ...options}).format();
}

export default FormatCurrency;