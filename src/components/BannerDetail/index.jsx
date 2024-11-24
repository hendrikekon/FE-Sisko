import React from 'react';
import './index.css';
import imgsupport from '../../assets/img/support.png'
import imgdeliver from '../../assets/img/deliver.png'
import imgguarantee from '../../assets/img/guarantee.png'
import imgbusiness from '../../assets/img/business.png'

const BannerDetail = () => {

    return (
        <div className="banner-detail-container">
            <div className='banner-detail-group'>
                <div className='banner-detail-icon'>
                    <img src={imgsupport} alt='imgsupport' className='banner-detail-img'></img>
                </div>
                <div className='banner-detail-word'>
                    <h4 className='banner-detail-title'>
                        Order Assistance
                    </h4>
                    <p className='banner-detail-p'>
                        24 hours customer service that will help you anytime
                    </p>
                </div>
            </div>
            <div className='banner-detail-group'>
                <div className='banner-detail-icon'>
                    <img src={imgdeliver} alt='imgdeliver' className='banner-detail-img'></img>
                </div>
                <div className='banner-detail-word'>
                    <h4 className='banner-detail-title'>
                        Fast Delivery
                    </h4>
                    <p className='banner-detail-p'>
                        The Product will be delivered the same day as when you ordered
                    </p>
                </div>
            </div>
            <div className='banner-detail-group'>
                <div className='banner-detail-icon'>
                    <img src={imgguarantee} alt='imgguarantee' className='banner-detail-img'></img>
                </div>
                <div className='banner-detail-word'>
                    <h4 className='banner-detail-title'>
                        100% Guarantee Product
                    </h4>
                    <p className='banner-detail-p'>
                        The product include a guarantee if there is a defective product
                    </p>
                </div>
            </div>
            <div className='banner-detail-group'>
                <div className='banner-detail-icon'>
                    <img src={imgbusiness} alt='imgbusiness' className='banner-detail-img'></img>
                </div>
                <div className='banner-detail-word'>
                    <h4 className='banner-detail-title'>
                        Find Store
                    </h4>
                    <p className='banner-detail-p'>
                        We have store all over the nation to ensure the customer can see the product themself
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BannerDetail;
