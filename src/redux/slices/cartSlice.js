import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
	cart: []
}

export const cartSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.cart.push(action.payload)

			// console.log('State------------------------------', state.cart)
			// try {
			// 	await AsyncStorage.setItem('cart', JSON.stringify(state.cart))
			// } catch (error) {
			// 	console.log('cartSlice add error', error)
			// }
			// return state
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter(product => product.id !== action.payload.id)
			// try {
			// 	await AsyncStorage.setItem('cart', JSON.stringify(state.cart))
			// } catch (error) {
			// 	console.log('cartSlice remove error', error)
			// }
		},
		clearCart: (state) => {
			return { ...initialState }
			// try {
			// 	await AsyncStorage.clear()
			// } catch (error) {
			// 	console.log('cartSlice clear error', error)
			// }
		}
	}
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export const { reducer: cartReducer } = cartSlice

// export async function isInCart(product) {
// 	const cart = await getCart()
// 	const cartIndex = cart.findIndex(prod => prod.id === product.id)
// 	return cartIndex !== -1
// }
//
// export async function removeOrAddToCart (product) {
// 	const cart = await getCart()
// 	return await isInCart(product) ? removeFromCart(cart, product) : addToCart(cart, product)
// }
