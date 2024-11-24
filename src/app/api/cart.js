import axios from 'axios';
import config from '../../config';

export const saveCart = async (token, cart) => {
    // Transform the cart structure
    const transformedCartItems = cart.map(item => ({
        product: { _id: item.productId },
        colorId: item.colorId,
        sizeId: item.sizeId,
        qty: item.qty,
    }));

    return await axios.put(
        `${config.apiBaseUrl}/api/carts`,
        { items: transformedCartItems },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
