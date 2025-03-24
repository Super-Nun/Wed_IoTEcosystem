import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    // ใช้ flex และ min-h-screen เพื่อให้เต็มหน้าจอ
    <div className="flex flex-col min-h-screen">
      {/* ส่วน Header ด้านบน */}
      <Header />

      {/* ส่วนกลาง แบ่งเป็น Navbar ด้านซ้าย + เนื้อหา (Outlet) */}
      <div className="flex flex-1">
        {/* Navbar ด้านซ้าย */}
        <Navbar />

        {/* เนื้อหา */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>

      {/* Footer ด้านล่าง */}
      <Footer />
    </div>
  );
}
