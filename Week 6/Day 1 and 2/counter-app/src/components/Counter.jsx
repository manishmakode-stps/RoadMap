import {useDispatch, useSelector} from 'react-redux'
import {updateCount} from '../features/counterSlice'

function Counter(){
    const dispatch = useDispatch()
    const count = useSelector(state => state.count)

    return(
        <>
        <h1>{count}</h1>
        <button onClick={() => dispatch(updateCount('increment'))}>Counter</button>
        <button onClick={() => dispatch(updateCount('decrement'))}>Decrement</button>
        <button onClick={() => dispatch(updateCount('reset'))}>Reset</button>
        </>
    )
}
export default Counter