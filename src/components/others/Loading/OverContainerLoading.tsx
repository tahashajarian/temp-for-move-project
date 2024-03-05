import Loading from "./Loading";
import zIndexes from "../../../constance/zIndexes";


type Props = {
  loading: boolean;
  overlayPage?: boolean;
  hasContainer?: boolean;
}

function OverContainerLoading({loading, overlayPage, hasContainer}: Props) {

  const loadingElement = <Loading size='lg' />

  return (
    <div className={`flex items-center justify-center inset-0 bg-black/50 duration-200 ${overlayPage ? `fixed w-screen h-screen ${zIndexes.overlayPageLoading}` : 'absolute w-full h-full'} ${loading ? '' : 'opacity-0 pointer-events-none'}`}>
      {hasContainer ? (
        <div className='bg-white rounded-md shadow-base p-14'>
          {loadingElement}
        </div>
      ) : <>{loadingElement}</>}
    </div>
  );
}

export default OverContainerLoading