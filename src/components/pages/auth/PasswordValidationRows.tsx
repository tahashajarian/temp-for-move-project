import TickIcon from "../../svg/TickIcon";
import {useFormContext} from "react-hook-form";
import {passwordFieldname} from "../../Form/FormFields/PasswordField/PasswordFieldExports";


export const passwordValidations = [
  {
    name: 'min12Char',
    regex: /^.{12,}$/,
    messsage: 'حداقل 12 کاراکتر باشد'
  },
  {
    name: 'lowerAndUpperCase',
    regex: /^(?=.*[a-z])(?=.*[A-Z])[^\u0600-\u06FF]+$/,
    // regex: /(?=.*[a-z])(?=.*[A-Z])/,
    // extraRegex: /[^\u0600-\u06FF]+$/,
    messsage: 'فقط ترکیبی از حروف کوچک و بزرگ انگلیسی باشد'
  },
  {
    name: 'hasNumber',
    regex: /\d/,
    messsage: 'شامل اعداد باشد'
  },
  {
    name: 'hasSpecialChar',
    regex: /[×!@#$%^&*)(_+]+/,
    messsage: 'شامل کاراکترهای خاص (نمادها) باشد'
  },
] as const

function PasswordValidationRows() {

  const { watch } = useFormContext();

  const passwordValue = watch(passwordFieldname)

  const isValidObject: Record<string, boolean> = {}

  passwordValidations.map(validation => {
    const isValid = validation.regex.test(passwordValue)

    if (isValid) {
      isValidObject[validation.name] = true
    } else {
      isValidObject[validation.name] = false
    }
  })

  return (
    <div className='text-gray-500 text-xs mt-6'>
      <p className='pb-2'>کلمه عبور باید:</p>
      <ul>
        {passwordValidations.map(validation => (
          <li key={validation.name} className='flex items-center py-0.5'>
            <div className='flex items-center justify-center w-5 h-5 px-0.5'>
              {isValidObject[validation.name] ? (
                <TickIcon className='w-full'/>
              ) : (
                <span className='w-[3px] h-[3px] rounded-full bg-gray-500'></span>
              )}
            </div>
            <span>{validation.messsage}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PasswordValidationRows