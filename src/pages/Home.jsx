import React from 'react';

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Choose your favorite food delivery service.</h2>
      <div className="bg-white">
        {/* Loco Food Delivery */}
        <div className="container mx-auto p-4 ">
          <h2 className="text-xl font-bold text-center">Food Delivery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {[
              { name: 'GrabFood', img: '/image/GrabFood.png' },
              { name: 'LineMan', img: '/image/LineMan.jpg' },
              { name: 'ShopeeFood', img: '/image/ShopeeFood.jpg' }
            ].map((food, index) => (
              <div key={index} className="relative h-[200px] sm:h-[300px] flex justify-center items-center">
                <img alt={food.name} className="object-contain w-full h-full " src={food.img} />
              </div>
            ))}
          </div>
        </div>

        {/* QR Code for sending data */}
        <div className="container mx-auto p-4 ">
          <h2 className="text-xl font-bold text-center">Scan the QR Code to select.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {[
              { name: 'GrabFood QR', img: '/image/GrabFoodQR.jpg' },
              { name: 'LineMan QR', img: '/image/linemanQR.jpg' },
              { name: 'ShopeeFood QR', img: '/image/ShopeeFoodQR.jpg' }
            ].map((qr, index) => (
              <div key={index} className="relative h-[200px] sm:h-[300px] flex justify-center items-center">
                <img alt={qr.name} className="object-contain w-full h-full " src={qr.img} />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
  );
}
