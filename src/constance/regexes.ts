const REGEXES = {
  // mobile: /^(0|\+98)?([ ]|-|[()]){0,2}19[|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}$/,
  mobile: /^09[0-9]{9}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[×!@#$%^&*)(_+])[A-Za-z\d×!@#$%^&*)(_+]{12,}$/,
  containPasswordChars: /^[A-Za-z\d@$!%*?&]+$/,
  withoutSpace: /^[^\s]+$/,
  numericRegex: /^[0-9\b]+$/,
  shenaseOrMelliCodeNumber: /^\d{10,11}$/,
  fullRegexEnglishWithoutSpace: /^[a-zA-Z0-9$@$!=%*?&()#^\-\/\\_.+]+$/,
  website: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
  name: /^[a-zA-Z\u06A9\u06AF\u06C0\u06CC\u060C\u062A\u062B\u062C\u062D\u062E\u062F\u063A\u064A\u064B\u064C\u064D\u064E\u064F\u067E\u0670\u0686\u0698\u200C\u0621-\u0629\u0630-\u0639\u0641-\u0654 ]+$/,
  notJustNumber: /(?!^\d+$)^.+$/g,
  alphebet: /^[a-zA-Z\s]|[\u0600-\u06FF\s]+$/,
  englishCharOnly : /^[\x00-\x7F]+$/,
  phone: /^0[0-9]{10}$/,
}

export default REGEXES