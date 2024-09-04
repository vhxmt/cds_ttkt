// src/app/thiet-bi-va-dung-cu/page.tsx
"use client";
import Breadcrumb from '@/components/breadcrumb';
import ToolOneCol from '@/components/display-block/tool/toolonecol';
import ToolTwoCol from '@/components/display-block/tool/tooltwocol';
import ToolThreeCol from '@/components/display-block/tool/toolthreecol';
import toolData from '@/data/thiet-bi-va-dung-cu/data.json';
import { useAuth } from '@/components/providers/AuthProvider';

const { toolsTwoCol, toolsThreeCol, toolOneCol } = toolData;

export default function NewsPage() {
    const { isLoggedIn, user } = useAuth(); // Use auth hook to get user info
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleAdd = () => {
        // Implement your add logic here
        console.log("Add tool");
    };

    const handleEdit = (toolTitle: string) => {
        // Implement your edit logic here
        console.log(`Edit tool: ${toolTitle}`);
    };

    const handleDelete = (toolTitle: string) => {
        // Implement your delete logic here
        console.log(`Delete tool: ${toolTitle}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <div className="side-menu flex-none w-1/5"></div>
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mt-4 mb-4 text-center">Danh sách dụng cụ</h2>
                    {/* One Column Layout */}
                    <ToolOneCol
                        tool={toolOneCol}
                        isAdmin={isAdmin}
                        onAdd={isAdmin ? handleAdd : undefined}
                        onEdit={isAdmin ? () => handleEdit(toolOneCol.title) : undefined}
                        onDelete={isAdmin ? () => handleDelete(toolOneCol.title) : undefined}
                    />

                    {/* Two Column Layout */}
                    <ToolTwoCol
                        tools={toolsTwoCol}
                        isAdmin={isAdmin}
                        onAdd={isAdmin ? handleAdd : undefined}
                        onEdit={isAdmin ? (tool) => handleEdit(tool.title) : undefined}
                        onDelete={isAdmin ? (tool) => handleDelete(tool.title) : undefined}
                    />

                    {/* Three Column Layout */}
                    <ToolThreeCol
                        tools={toolsThreeCol}
                        isAdmin={isAdmin}
                        onAdd={isAdmin ? handleAdd : undefined}
                        onEdit={isAdmin ? (tool) => handleEdit(tool.title) : undefined}
                        onDelete={isAdmin ? (tool) => handleDelete(tool.title) : undefined}
                    />
                </div>
            </div>
        </div>
    );
}
