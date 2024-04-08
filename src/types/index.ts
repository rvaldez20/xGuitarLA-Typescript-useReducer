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


