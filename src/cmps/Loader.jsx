import { useSelector } from 'react-redux'
import loader from '/images/puff.svg'

export function Loader() {
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

    return (
        isLoading && (
            <div className='loader'>
                <img src={loader} alt="Loading..." />
            </div>
        )
    )
}
