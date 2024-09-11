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

    const handleEdit = (toolId: string) => {
        // Implement your edit logic here, using toolId
        console.log(`Edit tool with ID: ${toolId}`);
    };

    const handleDelete = (toolId: string) => {
        // Implement your delete logic here, using toolId
        console.log(`Delete tool with ID: ${toolId}`);
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
                        onEdit={isAdmin ? () => handleEdit(toolOneCol.id) : undefined}
                        onDelete={isAdmin ? () => handleDelete(toolOneCol.id) : undefined}
                    />

                    {/* Two Column Layout */}
                    <ToolTwoCol
                        tools={toolsTwoCol}
                        isAdmin={isAdmin}
                        onAdd={isAdmin ? handleAdd : undefined}
                        onEdit={isAdmin ? (tool) => handleEdit(tool.id) : undefined}
                        onDelete={isAdmin ? (tool) => handleDelete(tool.id) : undefined}
                    />

                    {/* Three Column Layout */}
                    <ToolThreeCol
                        tools={toolsThreeCol}
                        isAdmin={isAdmin}
                        onAdd={isAdmin ? handleAdd : undefined}
                        onEdit={isAdmin ? (tool) => handleEdit(tool.id) : undefined}
                        onDelete={isAdmin ? (tool) => handleDelete(tool.id) : undefined}
                    />
                </div>
            </div>
        </div>
    );
}
