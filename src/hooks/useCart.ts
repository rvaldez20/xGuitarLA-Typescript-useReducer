import { useState, useEffect } from 'react'
import type { CartItem, Guitar, GuitarID } from '../types'

export const useCart = () => {

   const initialCart = ():CartItem[] => {
      const localStorageCart = localStorage.getItem('cartGuitar')
      return localStorageCart ? JSON.parse(localStorageCart) : []
   }

   // en el state de la data se quita la funcion setData porque no se usa  
   const [cart, setCart] = useState(initialCart)
   
   const MIN_ITEMS = 1
   const MAX_ITEMS = 5 

   useEffect(() => {
      localStorage.setItem('cartGuitar', JSON.stringify(cart))
   }, [cart])
   

   function decreaseQuantity(id:GuitarID) {
      const updateCart = cart.map( item => {
         if(item.id === id && item.quantity > MIN_ITEMS ) {
            return {
            ...item,
            quantity: item.quantity - 1
            }
         }
         return item
      })
      setCart(updateCart)
   }

   function clearCart() {
      setCart([])
   }

   
   return {
      cart,
      decreaseQuantity,
      clearCart,
   }
}

