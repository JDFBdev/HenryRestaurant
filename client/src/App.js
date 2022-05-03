import React, { useEffect } from "react";
import AuthProvider from "./Auth/AuthProvider";
import Rout from "./Routes/Routes";
import { Toaster } from 'react-hot-toast';
import { useQuery, useLazyQuery } from '@apollo/client';
import Queries from './Utils/Queries';

function App () {

  const { data } = useQuery(Queries.ALL_BILLS);
  const [getProduct] = useLazyQuery(Queries.FIND_PRODUCT);
  const [LoginUsers] = useLazyQuery(Queries.LOGIN_USERS);
  const [FreeTables] = useLazyQuery(Queries.FREE_TABLES);

  useEffect(()=>{
    async function fetchData() {
      await Promise.all([
        LoginUsers({variables: {"input": {"email": 'asdf', "password": 'asdf',}}}),
        getProduct({ variables: { input: { id: `61dc68cd4fab02dd51816b01` } } }),
        FreeTables({variables: {  "input": { "fecha": `2030-06-01T08:30` }}
      })
      ]).then(()=> {});
    }
    fetchData();
  },[])

  return (
    <>
      <AuthProvider>
        <Rout />
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;