import { useDispatch } from 'react-redux'
import css from './LogOutModal.module.css'
import { logOut } from '../../redux/auth/operations'
import { closeModal } from '../../redux/modal/slice'

const LogOutModal = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logOut())
        dispatch(closeModal())
    }

    return (
        <div className={css.logoutModal}>
            <h2 className={css.title}>Log out</h2>
            <p className={css.text}>Do you really want to leave?</p>
            <button type="button" className={`${css.btn} ${css.logoutBtn}`} onClick={handleLogout}>Log out</button>
            <button type="button" className={`${css.btn} ${css.cancelBtn}`} onClick={() => dispatch(closeModal())}>Cancel</button>
        </div>
    )
}

export default LogOutModal;