import {Types} from "../../../types/types";
import joinObjectValues from "../../../utils/joinObjectValues";
import useButtonStyles from "./hooks/useButtonStyles";
import Loading from "../../others/Loading/Loading";
import useDisplayWithAnimation from "../../others/DisplayWithAnimation/hooks/useDisplayWithAnimation";
import {useCloudFlareCaptchaContext} from "../../../contexts/CloudFlareCaptchaContext";


type ClassNameType = {
  extra?: string
}

export type ButtonSizesType = 'full-width' | 'sm' | 'md' | 'lg' | 'xs'
export type ButtonVarientsType = 'filled' | 'text' | 'outlined'
export type ButtonColorsType = 'accent' | 'red' | 'gray'

export type ButtonProps = {
  children: Types["children"],
  onClick?: (e: any) => void,
  type?: 'submit' | 'button',
  className?: ClassNameType,
  variant?: ButtonVarientsType,
  size?: ButtonSizesType,
  color?: ButtonColorsType,
  disabled?: boolean,
  loading?: boolean,
  needCloudFlare?: boolean,
}

const Button = (
  {
    children, onClick, type, className, variant, size, color, disabled, loading, needCloudFlare
  }: ButtonProps
) => {

  const {buttonStyles} = useButtonStyles({className, variant, size, color})

  const {shouldBeRemoved: loadingShouldBeRemoved} = useDisplayWithAnimation({show: Boolean(loading)})

  const {cloudFlareCode} = useCloudFlareCaptchaContext()

  const isDisabled = disabled || loading || (needCloudFlare && !cloudFlareCode)

  return (
    <button
      {...isDisabled && {disabled: true}}
      type={type || 'button'}
      {...onClick ? {onClick} : {}}
      className={joinObjectValues(buttonStyles)}
    >
      <div className='relative'>
        {!loadingShouldBeRemoved && (
          <div
            className={`${loading ? '' : 'opacity-0 scale-90'} flex items-center justify-center duration-200 absolute inset-0`}>
            <Loading size='sm' color='white'/>
          </div>
        )}

        <div className={`${loading ? 'opacity-0 scale-90' : ''} flex items-center gap-x-1`}>
          {children}
        </div>
      </div>
    </button>
  );
}

export default Button