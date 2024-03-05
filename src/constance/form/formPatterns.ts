import REGEXES from "../regexes";
import removeSeparator from "../../utils/separator/removeSeparator";
import withSeparator from "../../utils/separator/withSeparator";
import convertPersianNumberToEnglish from "../../utils/convertPersianNumberToEnglish";


const FORM_PATTERNS = {
  password: {
    value: REGEXES.password,
    // message: 'حداقل 12 رقم و شامل حروف بزرگ و کوچک انگلیسی، اعداد و کاراکترهای خاص.',
    message: 'الگو نامعتبر است',
  },

  containPasswordChars: {
    value: REGEXES.password,
    message: 'فقط می‌تواند شامل حروف انگلیسی، اعداد و کاراکترهای خاص باشد',
  },

  mobile: {
    value: REGEXES.mobile,
    message: 'شماره موبایل نامعتبر است',
  },

  withouSpace: {
    value: REGEXES.withoutSpace,
    message: 'فاصله مجاز نیست.'
  },

  numeric: {
    value: REGEXES.numericRegex,
    message: 'فقط عدد وارد کنید'
  },

  minLengthChar: (value: number, customMessage?:string) => ({
    value,
    message: customMessage || `باید بیشتر از ${value} کاراکتر باشد`,
  }),

  maxLengthChar: (value: number) => ({
    value,
    message: `باید کمتر از ${value} کاراکتر باشد`,
  }),

  maxNumber: (inputValue: number, value: number) => {
    return Number(removeSeparator(inputValue)) <= value || `عدد میتواند حداکثر ${withSeparator(value)} باشد`
  },

  specificLengthChar: (value: number) => ({
    value,
    message: `باید ${value} کاراکتر باشد`,
  }),

  notJustNumber: (value: string) => {
    if (value === '' || value == null) return true

    const finalValue = convertPersianNumberToEnglish(value)
    const result = /(?!^\d+$)^.+$/g.test(finalValue)
    return result ? true : `نمیتواند فقط عدد باشد`
  },

  checkMelliCode: (code: any) => {
    if (code === '' || code == null) return true

    const errorMessage = 'الگوی کد ملی اشتباه است'

    if (!code || !/^[0-9۰۱۲۳۴۵۶۷۸۹]{10}$/.test(code)) return errorMessage;
    const factors = [10, 9, 8, 7, 6, 5, 4, 3, 2, 0, 0];
    const digits = Array.from(code).map((c: any) => +c);
    if (new RegExp(`^[${digits[0]}]+$`).test(code)) return errorMessage;
    const sumDigits = digits
      .map((digit, idx) => digit * factors[idx])
      .reduce((a, b) => a + b, 0);
    const digitForControl: any = digits[digits.length - 1];
    const r: any = sumDigits - parseInt((sumDigits / 11).toString()) * 11;

    const result = r <= 1 ? r === digitForControl : digitForControl === 11 - r

    return result ? true : errorMessage
  },
}

export default FORM_PATTERNS;