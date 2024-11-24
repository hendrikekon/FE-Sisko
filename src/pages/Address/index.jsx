import React, { useEffect } from 'react';
import './index.css';
import AddAddress from '../../components/AddAddress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses } from '../../app/features/Address/actions';


const Address = () => {
    const dispatch = useDispatch();

    const addresses = useSelector(state => state.address.deliveryAddress || []);

    const refreshAddresses = async () => {
        // console.log('Refreshing addresses...');
        try {
            await dispatch(fetchAddresses());
            console.log('Addresses refreshed successfully.');
        } catch (error) {
            console.error('Failed to refresh addresses:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAddresses());
        };
        fetchData();

    },[dispatch])
    
    return(
        <div className='address-container'>
            <div className='address-outer'>
                {/* <AddAddress/> */}
                <div className='address-section1'>
                    <AddAddress refreshAddresses={refreshAddresses}/>
                </div>
                <div className='address-section2'>
                    <div className='address-content'>
                        <p className='address-content-title'><strong>ADRESS</strong></p>
                        {addresses.length > 0 ? (
                            addresses.map(address => (
                                <div className='address-list' key={address._id}>
                                    <p className='p-nama'>{address.nama}</p>
                                    <p className='p-address'>{address.kelurahan}, {address.kecamatan}, {address.kabupaten}, {address.provinsi}</p>
                                    <p className='p-detail'>{address.detail}</p>
                                </div>
                            ))
                        ) : (
                            <p>No addresses found.</p>
                        )}
                    </div>

                </div>
            </div>
            
        </div>
    )
};

export default Address