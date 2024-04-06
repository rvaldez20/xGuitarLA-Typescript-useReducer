import { useState, useEffect, useMemo } from 'react'
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
   
   function addToCart(item: Guitar) {
      console.log(item)
      // verificamo si el item no se ha agregado al carrito
      const itemExists = cart.findIndex(guitar => guitar.id === item.id)
      
      if(itemExists >= 0) {
         // ya xiste se incrementa la cantidad
         if(cart[itemExists].quantity >= MAX_ITEMS) return
         const updateCart = [...cart]
         updateCart[itemExists].quantity++
         setCart(updateCart)
      } else{
         // no existe y se agrega
         const newItem:CartItem = {...item, quantity: 1} //convercio de Type: de Guitar a cardItem
         setCart([...cart, newItem])
         alert(`Guitar ${item.name} add cart`)
      }
   }

   function removeFromCart(id:GuitarID) {
      setCart( prevCart => prevCart.filter(guitar => guitar.id !== id))
   }

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

   function increaseQuantity(id:GuitarID) {
      const updateCart = cart.map( item => {
         if(item.id === id && item.quantity < MAX_ITEMS ) {
            return {
            ...item,
            quantity: item.quantity + 1
            }
         }
         return item
      })
      setCart(updateCart)
   }

   function clearCart() {
      setCart([])
   }

   //! States derivado ()
   const isEmpty = useMemo(() => cart.length === 0, [cart])
   const cartTotal = useMemo (() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart])

   return {
      cart,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      increaseQuantity,
      clearCart,
      isEmpty,
      cartTotal,
   }
}

