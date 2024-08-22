"use client";
import { useState } from 'react';

import Breadcrumb from '@/components/breadcrumb';

export default function NewsPage() {

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
            <div className="side-menu flex-none w-1/3"></div>
                {/* Main content */}
                <div className="flex-1">
                    <p className='h2'>Danh sách dụng cụ</p>

                </div>
            </div>
        </div>
    );
}