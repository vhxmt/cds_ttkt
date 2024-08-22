"use client";
import { useState } from 'react';
import UserInfo from '@/components/display-block/UserInfo';
import Banner from '@/components/display-block/Banner';
import PgControl from '@/components/display-block/PgControl';
import SideMenu from '@/components/display-block/SideMenu';
import { staffData } from '@/data/nhan-luc/can-bo/data';
import {  menuItems } from '@/data/nhan-luc/menu-data';
import Breadcrumb from '@/components/breadcrumb';

export default function NewsPage() {

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Sidebar menu */}
                <SideMenu menuItems={menuItems} />

                {/* Main content */}
                <div className="flex-1">
                    <p className='h2'>Danh sách dụng cụ</p>

                </div>
            </div>
        </div>
    );
}