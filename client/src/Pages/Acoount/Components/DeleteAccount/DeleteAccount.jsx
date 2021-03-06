import React from 'react'
import useAuth from '../../../../Auth/useAuth';
import styles from './deleteAccount.module.css'
import { useNavigate } from 'react-router-dom';
import routes from '../../../../Helpers/Routes';


const DeleteAccount = ({ close }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDelete = (e) => {
    e.preventDefault();

    logout();
    close()
    navigate(`${routes.home}`)
  }

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Delete Account</h1>
      </div>
      <div className={styles.containerDialog}>
        <label className={styles.containerDialog}>
          Are you sure you want to permanently delete your account?
          <br />
          <b>All your information will be lost</b>

        </label>
      </div>
      <div className={styles.containerBotones} >
        <button className={styles.ButtonCancel} onClick={close} >CANCEL</button>
        <button
          className={styles.ButtonConfir}
          onClick={handleDelete}
        >DELETE ACCOUNT</button>
      </div>
    </div>
  )
}

export default DeleteAccount
