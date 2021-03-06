import React from 'react';
import s from './OrderMenu.module.css';
import Cards from '../Cards/Cards';
import routes from '../../../../Helpers/Routes';

export default function OrderMenu({products, setProductID, openModalProduct}) {
    const url = window.location.href.slice(35);
    

    return(
    <div  className={s.mainDiv}>
        
            {(url === routes.UserMainPage) ? (
                <>
            <h1 className={s.title}>MENU</h1>
                </>
            ) : 
            <h1 className={s.title}>YOUR ORDER</h1>
        }
        <div className={s.products}>
            <h3 className={s.subtitle} >MAIN COURSES</h3>
            <Cards openModalProduct={openModalProduct} setProductID={setProductID} products={products.filter((p)=>{return p.category === 'main'})} />
            <h3 className={s.subtitle} >SIDES</h3>
            <Cards openModalProduct={openModalProduct} setProductID={setProductID} products={products.filter((p)=>{return p.category === 'sides'})}/>
            <h3 className={s.subtitle} >BEVERAGES</h3>
            <Cards openModalProduct={openModalProduct} setProductID={setProductID} products={products.filter((p)=>{return p.category === 'beverages'})}/>
            <h3 className={s.subtitle} >DESSERTS</h3>
            <Cards openModalProduct={openModalProduct} setProductID={setProductID} products={products.filter((p)=>{return p.category === 'dessert'})} />
        </div>
    </div>
    )
}