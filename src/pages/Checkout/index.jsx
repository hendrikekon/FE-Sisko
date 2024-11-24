import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../app/api/order';
// import { clearItem } from '../../app/features/Carts/actions';
import { CLEAR_ITEM } from '../../app/features/Carts/constants';
import './index.css';
import { fetchAddresses } from '../../app/features/Address/actions';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = useSelector((state) => state.cart);
    const userToken = useSelector((state) => state.auth.token);
    const [deliveryFee, setDeliveryFee] = useState(10000);
    const [selectedService, setSelectedService] = useState('rekomendasi');
    // const selectedAddress = location.state?.address;

    const [selectedAddress, setSelectedAddress] = useState(null);
    const addresses = useSelector(state => state.address.deliveryAddress || []);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address.');
            return;
        }

        try {
            const orderData = {
                delivery_fee: deliveryFee,
                delivery_address: selectedAddress._id,
            };
            const response = await createOrder(orderData);
            console.log('saved succesfully', response.data)
            dispatch({ type: CLEAR_ITEM });

            navigate('/invoices', {state: {orderId: response.data._id}});
            
        } catch (error) {
            console.error('Error placing order', error);
        }
    };

    const handleDeliveryChange = (event) => {
        const service = event.target.value;
        setSelectedService(service);   
        const deliveryFees = {
            rekomendasi: 10000,
            jnt: 12000,
            jne: 13000,
            ninja: 15000,
            anteraja: 8000,
            sicepat: 9000,
        };
        setDeliveryFee(deliveryFees[service] || 10000);
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAddresses());
        };
        fetchData();
    }, [dispatch]);

    const openModal = async () => {
        setIsModalOpen(true);
        // try {
        //     // Fetch addresses from the database
        //     // const response = await fetch('/api/addresses', {
        //     //     headers: {
        //     //         'Authorization': `Bearer ${userToken}`
        //     //     }
        //     // });
        //     const data = await dispatch(fetchAddresses());
        //     setAddresses(data);
        // } catch (error) {
        //     console.error('Error fetching addresses', error);
        // }
    };


    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
        closeModal(); // Close the modal after selection
    };

    return (
        <div className='order-container'>
            <div className='order-group'>
                <div className='order-select-address-list'>
                    <NavLink to={'/cart'}>Kembali</NavLink>
                </div>
            </div>
            <div className='order-group'>
                <h2 className='order-title'>Order Summary</h2>
                    <div className='order-list'>
                        {cartItems.map((item) => (
                            <div key={`${item._id}-${item.sizeId}-${item.colorId}`}>
                                <p>{item.name} x {item.qty}</p>
                                <p>Price: Rp. {item.price*item.qty}</p>
                            </div>
                        ))}
                    </div>
                    <p className='order-list-price'>Total Price: Rp. {cartItems.reduce((total, item) => total + item.price * item.qty, 0)}</p>

                    <h3 className='order-delivery-tittle'>Delivery Information</h3>
                    {selectedAddress ? (
                        <div className='order-address-selected'>
                            <p><strong>Recipient Name:</strong> {selectedAddress.nama}</p>
                            <p>{selectedAddress.kelurahan}, {selectedAddress.kecamatan}, {selectedAddress.kabupaten}, {selectedAddress.provinsi}</p>
                            <p><strong>Detail:</strong> {selectedAddress.detail}</p>
                            <button onClick={openModal}>Change Address</button>
                        </div>
                    ) : (
                        <div className='order-address-selected'>
                            <p className='order-noaddress-selected'>No address selected.</p>
                            <button onClick={openModal}>Change Address</button>
                        </div>
                    )}

                    <h3 className='order-delivery-fee'>Delivery Fee: Rp. {deliveryFee}</h3>
                    <select onChange={handleDeliveryChange} value={selectedService} className='order-select-delivery'>
                        <option value="rekomendasi">Rekomendasi</option>
                        <option value="jnt">J&T</option>
                        <option value="jne">JNE</option>
                        <option value="ninja">Ninja Express</option>
                        <option value="anteraja">AnterAja</option>
                        <option value="sicepat">SiCepat</option>
                    </select>

                    <h3 className='order-total-Price'>
                        <strong>Total Order Price:</strong>
                        Rp. {cartItems.reduce((total, item) => total + item.price * item.qty, 0) + deliveryFee}
                    </h3>

                    <button onClick={handlePlaceOrder} className='btn-order'>Place Order</button>
                </div>
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <NavLink to={'/address'}>+ Tambah Alamat</NavLink>
                            <h2 className='select-address-title'>Select Delivery Address</h2>
                            {addresses.length > 0 ? (
                                <ul>
                                    {addresses.map((address) => (
                                        <li key={address._id} onClick={() => handleSelectAddress(address)}>
                                            <p>{address.nama}</p>
                                            <p>{address.kelurahan}, {address.kecamatan}, {address.kabupaten}, {address.provinsi}</p>
                                            <p>{address.detail}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='p-no-address'>No addresses found. Please add one.</p>
                            )}
                            {/* <button onClick={onConfirmAddress} className='btn-select-address'>
                                Confirm Address
                            </button> */}
                            
                            
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}

            </div>
            
    );
};

export default Checkout;
