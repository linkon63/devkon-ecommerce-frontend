import React from 'react';
import bg from "@/assets/no-product/bg.png"
import flor from "@/assets/no-product/flor.png"
import cart from "@/assets/no-product/cart.png"
import star from "@/assets/no-product/start.png"
import cros from "@/assets/no-product/cros.png"
import Image from 'next/image';
const NoProductFountImage = () => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col items-center justify-center h-[600px] w-[600px] relative'>
            <Image
            alt='bg'
            src={bg}
            width={500}
            />
            <Image
            alt='flor'
            src={flor}
            width={500}
            className='absolute top-[500px]'
            />
            <Image
            alt='star'
            src={star}
            width={50}
            className='absolute top-[40px] left-[50px] animate-spin-slow'
            />
            <Image
            alt='star'
            src={star}
            width={20}
            className='absolute top-[400px] left-[100px] animate-spin-slow'
            />
            <Image
             alt='star'
            src={star}
            width={20}
            className='absolute top-[300px] right-[100px] animate-spin-slow'
            />
            <Image
             alt='star'
            src={star}
            width={40}
            className='absolute top-[200px] right-[50px] animate-spin-slow'
            />
            <Image
             alt='star'
            src={star}
            width={20}
            className='absolute top-[100px] right-[350px] animate-spin-slow'
            />
            <Image
             alt='cart'
            src={cart}
            width={500}
            className='absolute top-[150px] left-[30px]  animate-sway'
            />
            <Image
            alt='cros'
            src={cros}
            width={100}
            className='absolute top-[160px] animate-float'
            />
        </div> 
        </div>
       
    );
};

export default NoProductFountImage;