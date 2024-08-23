// src/pages/NewsPage.tsx
"use client";
import Breadcrumb from '@/components/breadcrumb';
import ToolOneCol from '@/components/display-block/tool/toolonecol';
import ToolTwoCol from '@/components/display-block/tool/tooltwocol';
import ToolThreeCol from '@/components/display-block/tool/toolthreecol';
import { toolsTwoCol, toolsThreeCol, toolOneCol } from '@/data/thiet-bi-va-dung-cu/data';
import SideMenu from '@/components/display-block/SideMenu';

export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
            <SideMenu/>
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mt-4 mb-4">Danh sách dụng cụ</h2>
                    {/* One Column Layout */}
                    <ToolOneCol tool={toolOneCol} />

                    {/* Two Column Layout */}
                    <ToolTwoCol tools={toolsTwoCol} />

                    {/* Three Column Layout */}
                    <ToolThreeCol tools={toolsThreeCol} />

                </div>
            </div>
        </div>
    );
}
