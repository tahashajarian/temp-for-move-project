import React from "react";

type Props = {
  passwordLength: number;
  useSymbols: boolean;
  useNumbers: boolean;
  useLowerCase: boolean;
  useUpperCase: boolean;
  setPassword: (pass: string) => void;
};

const GenerateNewPassword = (props: Props) => {
  const generatePassword = () => {
    let charset = "";
    let newPassword = new Array(props.passwordLength);

    if (props.useSymbols) {
      const specialChars = "(@$!%*?&)";
      charset += specialChars;
      newPassword[Math.floor(Math.random() * props.passwordLength)] =
        specialChars[Math.floor(Math.random() * specialChars.length)];
    }
    if (props.useNumbers) {
      const numbers = "0123456789";
      charset += numbers;
      
      newPassword[Math.floor(Math.random() * props.passwordLength)] =
        numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (props.useLowerCase) {
      const lowCase = "abcdefghijklmnopqrstuvwxyz";
      charset += lowCase;
    }
    if (props.useUpperCase) {
      const upCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      charset += upCase;
    }

    for (let i = 0; i <= props.passwordLength; i++) {
      if (newPassword[i]) continue;
      newPassword[i] = charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }

    props.setPassword(newPassword.join(""));
  };

  const generatePass = () => {
    // Define character set
    const lowCase = "abcdefghijklmnopqrstuvxyz";
    const upCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    const Numbers = "0123456789";
    const SpecialChar = "£$&()*+[]@#^-_!?";
    const charCategories = 4;

    // Initialize password
    let password = "";

    // FOR loop
    // for i=1:passLength
    //     chooseCharGroup = round(abs(rand()*(charCategories-1)));
    //     select chooseCharGroup
    //     case 0
    //     index = round(abs(rand()*(length(lowCase)-1)));
    //     password=password + part(lowCase,index+1);
    //     case 1
    //         index = round(abs(rand()*(length(upCase)-1)));
    //         password=password + part(upCase,index+1);
    //         case 2
    //         index = round(abs(rand()*(length(Numbers)-1)));
    //         password=password + part(Numbers,index+1);
    //         case 3
    //         index = round(abs(rand()*(length(SpecialChar)-1)));
    //         password = password + part(SpecialChar,index+1);
    //         end
    // end

    for (let i = 0; i <= props.passwordLength; i++) {
      //       newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
      const chooseCharGroup = Math.round(
        Math.abs(Math.random() * (charCategories - 1))
      );
      let index;
      switch (chooseCharGroup) {
        case 0:
          index = Math.round(Math.abs(Math.random() * (lowCase.length - 1)));
          password += lowCase.charAt(index + 1);
          break;
        case 1:
          index = Math.round(Math.abs(Math.random() * (upCase.length - 1)));
          password += upCase.charAt(index + 1);
          break;
        case 2:
          index = Math.round(Math.abs(Math.random() * (Numbers.length - 1)));
          password += Numbers.charAt(index + 1);
          break;
        case 3:
          index = Math.round(
            Math.abs(Math.random() * (SpecialChar.length - 1))
          );
          password += SpecialChar.charAt(index + 1);
          break;

        default:
          break;
      }
    }

    props.setPassword(password);
  };

  return (
    <div
      onClick={generatePassword}
      className="text-accent hover:text-accent-hover cursor-pointer"
    >
      ایجاد کلمه عبور تصادفی
    </div>
  );
};

export default GenerateNewPassword;
