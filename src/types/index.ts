export type Guitar = {
   id: number
   name: string
   image: string
   description: string
   price: number
}

//! aplicando herencia al type
export type CartItem = Guitar & {
   quantity: number
}

//! gtype para el ID usando Lookup
export type GuitarID = Guitar['id']


//?===================================================================================================== 

//! type para el ID usando Pick
// export type GuitarID = Pick<Guitar, 'id'>

//! aplicando herencia al interfaces
// export interface CartItem extends Guitar {
//    quantity: number
// }

//! aplicando Utility Types (sirve para seleccionar solo algunos atributos y agregar nuevos)
// export type CartItem = Pick<Guitar,'id' | 'name' | 'price'> & {
//    quantity: number
// }

//! aplicando Utility Types (sirve para omitir solo algunos atributos y agregar nuevos)
// export type CartItem = Omit<Guitar,'description'> & {
//    quantity: number
// }