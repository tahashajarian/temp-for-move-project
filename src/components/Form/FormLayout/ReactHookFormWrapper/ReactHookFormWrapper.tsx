
import {FormProvider} from "react-hook-form";
import {Types} from "../../../../types/types";
import HiddenButton from "./HiddenButton";

type Props = {
  formMethods: any,
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  className?: string;
  children: Types["children"];
  hiddenButton?: boolean;
}

function ReactHookFormWrapper({formMethods, onSubmit, className, children, hiddenButton}: Props) {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className={className || 'grid grid-cols-2 gap-x-10'}>
        {children}

        {hiddenButton && <HiddenButton />}
      </form>
    </FormProvider>
  );
}

export default ReactHookFormWrapper;