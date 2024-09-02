// src/app/thiet-bi-va-dung-cu/page.tsx
"use client";
import Breadcrumb from '@/components/breadcrumb';
import ToolOneCol from '@/components/display-block/tool/toolonecol';
import ToolTwoCol from '@/components/display-block/tool/tooltwocol';
import ToolThreeCol from '@/components/display-block/tool/toolthreecol';
import toolData from '@/data/thiet-bi-va-dung-cu/data.json';

const { toolsTwoCol, toolsThreeCol, toolOneCol } = toolData;
export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb/>
            <div className="flex space-x-4">
            <div className="side-menu flex-none w-1/5"></div>
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mt-4 mb-4 text-center">Danh sách dụng cụ</h2>
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
