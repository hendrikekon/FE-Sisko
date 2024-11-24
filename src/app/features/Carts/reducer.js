import {ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM} from './constants';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// export default function cartReducer(state= initialState, {type, payload}){
//     switch(type){
//         case ADD_ITEM:
//             if (state.find(item => item.id === payload.item._id)) {
//                 return state.map(item => ({...item, qty: item._id === payload.item._id ? item.qty + 1 : item.qty}));
//             } else {
//                 return [...state, {...payload.item,qty: 1}];
//             }
            
//         case REMOVE_ITEM:
//             return state
//             .map(item => ({...item, qty: item._id === payload.item._id ? item.qty - 1 : item.qty}))
//             .filter(item => item.id!== payload);
//         case CLEAR_ITEM:
//             return [];
//         default:
//             return state;
//     }
// };


// export default function cartReducer(state = initialState, { type, payload }) {
//     switch (type) {
//         case ADD_ITEM:
//             // Update quantity if the item already exists, otherwise add it to the cart
//             return state.map(item =>
//                 item._id === payload.item._id
//                     ? { ...item, qty: payload.item.qty }
//                     : item
//             ).concat(state.find(item => item._id === payload.item._id) ? [] : [{ ...payload.item }]);

//         case REMOVE_ITEM:
//             return state
//                 .map(item => ({ ...item, qty: item._id === payload.item._id ? item.qty - 1 : item.qty }))
//                 .filter(item => item.qty > 0); // Remove items with 0 quantity

//         case CLEAR_ITEM:
//             return [];
            
//         default:
//             return state;
//     }
// }


export default function cartReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_ITEM:
            // Check for existing item based on productId, color, and size
            const existingItem = state.find(
                item => 
                    item.productId === payload.item.productId &&
                    item.color === payload.item.color &&
                    item.size === payload.item.size
            );

            if (existingItem) {
                // Increment the quantity by 1 if the item with same productId, color, and size exists
                return state.map(item => 
                    item.productId === payload.item.productId &&
                    item.color === payload.item.color &&
                    item.size === payload.item.size
                        ? { ...item, qty: item.qty + 1 } // Increment by 1
                        : item
                );
            } else {
                // Add new item with initial quantity of 1
                return [...state, { ...payload.item, qty: 1 }];
            }


        case REMOVE_ITEM:
            return state
                .map(item => 
                    item.productId === payload.item.productId &&
                    item.color === payload.item.color &&
                    item.size === payload.item.size
                        ? { ...item, qty: item.qty - 1 } // Decrement quantity
                        : item
                )
                .filter(item => item.qty > 0); // Remove item if quantity reaches 0

        case CLEAR_ITEM:
            return [];

        default:
            return state;
    }
}
