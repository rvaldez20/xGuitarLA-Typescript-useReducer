import { db } from "../data/db";
import { CartItem, Guitar } from "../types";


export type CartActions = 
   { type: 'add-to-cart', payload: {item: Guitar} } |
   { type: 'remove-from-cart', payload: {id: Guitar['id']} } |
   { type: 'decrease-quantity', payload: {id: Guitar['id']} } |
   { type: 'increase-quantity', payload: {id: Guitar['id']} } |
   { type: 'clear-cart' }


export type CartState = {
   data: Guitar[],
   cart: CartItem[],
}


export const initialState:CartState = {
   data: db,
   cart: []
}

const MIN_ITEMS = 1
const MAX_ITEMS = 5 

export const cartReducer = (
      state: CartState = initialState,
      action: CartActions
   ) => {


   if(action.type === 'add-to-cart') {

      const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)
      console.log(state.cart)

      let updateCart:CartItem[] = []
      if(itemExists) {         
         updateCart = state.cart.map(item => {
            if(item.id === action.payload.item.id) {
               //! ya existe se incrementa la cantidad
               if(item.quantity < MAX_ITEMS) {
                  return { ...item, quantity: item.quantity + 1 }
               } else {
                  return item
               }
            } else {
               return item
            }
         })         
      } else {
         // no existe y se agrega
         const newItem:CartItem = {...action.payload.item, quantity: 1} //convercio de Type: de Guitar a cardItem
         updateCart = [...state.cart, newItem]
      }

      return {
         ...state,
         cart: updateCart,
      }
   }


   if(action.type === 'remove-from-cart') {

      return {
         ...state,
      }
   }


   if(action.type === 'decrease-quantity') {

      return {
         ...state,
      }
   }


   if(action.type === 'increase-quantity') {

      return {
         ...state,
      }
   }


   if(action.type === 'clear-cart') {

      return {
         
      }
   }
   
   return state
}

