import React from 'react';
import { GrClose } from 'react-icons/gr';
import CardProductBill from '../CardProducBill/CardProductBill';
import styles from './cardKitchen.module.css';
import Transsition from '../../../../Hooks/Transsition';
import { useMutation } from '@apollo/client';
import Mutations from '../../../../Utils/Mutations';
import Queries from '../../../../Utils/Queries';
import toast from 'react-hot-toast';
import Chronometer from '../Chronometer/Chronometer';

const CardKitchen = ({ info, infoKitchen, close }) => {
  const [ready, setReady] = React.useState(false);

  const [ClosedBill] = useMutation(
    Mutations.CLOSED_BILL,
    {
      refetchQueries: [{ query: Queries.BILLS_KITCHEN }, { query: Queries.ALL_BILLS }],
      onError: (error) => { console.log('Errores', error.graphQLErrors); }
    }
  )

  const [WorkingBill] = useMutation(
    Mutations.WORKING_BILL,
    {
      refetchQueries: [{ query: Queries.ALL_BILLS }],
      onError: (error) => { console.log('Errores', error.graphQLErrors); }
    }
  )

  const handleClose = async function (id) {


    const response = await ClosedBill({
      variables: {
        "input": {
          "id": info._id
        }
      }
    })
    let respuesta = response.data.ClosedBill.message;
    toast.success(respuesta);
  }

  const handleButton = async function () {
    setReady(!ready);
    const response = await WorkingBill({
      variables: {
        "input": {
          "id": info._id
        }
      }
    })
    let respuesta = response.data.WorkingBill.message;
    toast.success(respuesta);
  }


  let a = new Date();
  let b = new Date(`${info.fechaEntrega}`);
  var c = (a - b);
  const minutos = Math.abs(parseInt(c / 1000 / 60))

  return (
    <Transsition>
      <div className={styles.container}>
        <Chronometer futureDate={info.fechaEntrega}></Chronometer>
        <div className={styles.containerHeader}>
          <div className={styles.titles}>
            <div className={styles.table}>TABLE {info.numeroMesa}</div>
            <div className={styles.type}>{info.tipoDePedido}</div>
          </div>
          <div className={styles.containerBotones}>
            <GrClose size={'2rem'} className={styles.btnCancel} onClick={handleClose} />
          </div>
        </div>
        <div className={styles.containerProduct}>
          {info.products.map(dato => (
            <CardProductBill key={Math.random()} dato={dato} />
          ))}
        </div>
        <div className={styles.btnCloseContainer}>

          {
            !ready && <Transsition><button className={styles.btnClose} onClick={handleButton}  >START</button></Transsition>
          }
          {
            ready && <Transsition><button className={styles.btnClose}  >MARK AS READY</button></Transsition>
          }

        </div>
      </div>
    </Transsition>


  )
}

export default CardKitchen



