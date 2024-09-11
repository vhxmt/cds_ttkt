// src/app/thiet-bi-va-dung-cu/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import ToolOneCol from '@/components/display-block/tool/toolonecol';
import ToolTwoCol from '@/components/display-block/tool/tooltwocol';
import ToolThreeCol from '@/components/display-block/tool/toolthreecol';
import { useAuth } from '@/components/providers/AuthProvider';

// Define the Tool interface with id
interface Tool {
    id: string; // Ensure the id property is defined
    title: string;
    imgSrc: string;
    description: string;
}

export default function NewsPage() {
    const { isLoggedIn, user } = useAuth(); // Use auth hook to get user info
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const [toolsOneCol, setToolOneCol] = useState<Tool | undefined>(undefined);
    const [toolsTwoCol, setToolsTwoCol] = useState<Tool[]>([]);
    const [toolsThreeCol, setToolsThreeCol] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the tool data from the API
        const fetchData = async () => {
            try {
                const res = await fetch('/api/thiet-bi-va-dung-cu');
                const data = await res.json();

                setToolOneCol(data.toolOneCol);
                setToolsTwoCol(data.toolsTwoCol);
                setToolsThreeCol(data.toolsThreeCol);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleAdd = () => {
        console.log("Add tool");
    };

    const handleEdit = (toolId: string) => {
        console.log(`Edit tool: ${toolId}`);
    };

    const handleDelete = (toolId: string) => {
        console.log(`Delete tool: ${toolId}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <div className="side-menu flex-none w-1/5"></div>
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mt-4 mb-4 text-center">Danh sách dụng cụ</h2>

                    {/* One Column Layout */}
                    {toolsOneCol && (
                        <ToolOneCol
                            tool={toolsOneCol}
                            isAdmin={isAdmin}
                            onAdd={isAdmin ? handleAdd : undefined}
                            onEdit={isAdmin ? () => handleEdit(toolsOneCol.id) : undefined}
                            onDelete={isAdmin ? () => handleDelete(toolsOneCol.id) : undefined}
                        />
                    )}

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
