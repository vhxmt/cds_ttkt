// src/app/NewPage/thiet-bi-va-dung-cu/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import ToolOneCol from '@/components/display-block/tool/toolonecol';
import ToolTwoCol from '@/components/display-block/tool/tooltwocol';
import { useAuth } from '@/components/providers/AuthProvider';
import ToolFormModal from './form'; // Import the modal form component

// Define the Tool interface
interface Tool {
    id: string;  // id is always a string here
    title: string;
    imgSrc: string;
    description: string;
}

export default function NewsPage() {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const [toolsOneCol, setToolOneCol] = useState<Tool[]>([]);
    const [toolsTwoCol, setToolsTwoCol] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTool, setCurrentTool] = useState<Tool | undefined>(undefined);  // Used for add/edit modal
    const [section, setSection] = useState<string>(''); // To determine the section being edited

    // Fetch data from API
    const fetchData = async () => {
        try {
            const res = await fetch('/api/thiet-bi-va-dung-cu');
            const data = await res.json();

            setToolOneCol(data.toolOneCol);
            setToolsTwoCol(data.toolsTwoCol);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Handlers for add, edit, delete
    const handleAdd = (section: string) => {
        setCurrentTool(undefined);  // Reset the current tool for adding a new one
        setSection(section);
        setIsModalOpen(true);
    };

    const handleEdit = (toolId: string, section: string) => {
        const toolToEdit = section === 'toolOneCol'
            ? toolsOneCol.find((tool) => tool.id === toolId)
            : toolsTwoCol.find((tool) => tool.id === toolId);

        setCurrentTool(toolToEdit);  // Load the selected tool data for editing
        setSection(section);
        setIsModalOpen(true);
    };

    // DELETE tool by ID
    const handleDelete = async (toolId: string, section: string) => {
        if (confirm('Are you sure you want to delete this tool?')) {
            try {
                const res = await fetch(`/api/thiet-bi-va-dung-cu?id=${toolId}&section=${section}`, {
                    method: 'DELETE',
                });

                if (res.ok) {
                    console.log(`Deleted tool: ${toolId} from ${section}`);
                    // Refetch data after delete
                    fetchData();
                } else {
                    console.error('Failed to delete tool');
                }
            } catch (err) {
                console.error('Delete error:', err);
            }
        }
    };


    // Submit handler for the form
    const handleSubmit = async (tool: Tool) => {
        try {
            const method = tool.id ? 'PUT' : 'POST';  // Use PUT for editing, POST for adding
            const res = await fetch('/api/thiet-bi-va-dung-cu', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    section,
                    id: tool.id,  // For PUT request, ID must be present
                    newTool: tool,  // For POST request
                    updatedTool: tool,  // For PUT request
                }),
            });

            if (res.ok) {
                console.log('Tool submitted successfully');
                // Refetch data after form submission
                fetchData();
                setIsModalOpen(false);  // Close the modal after submitting
            } else {
                console.error('Failed to submit tool');
            }
        } catch (err) {
            console.error('Submit error:', err);
        }
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
                        tools={toolsOneCol} 
                        isAdmin={isAdmin}
                        onAdd={isAdmin ? () => handleAdd('toolOneCol') : undefined}
                        onEdit={isAdmin ? (toolId) => handleEdit(toolId, 'toolOneCol') : undefined}
                        onDelete={isAdmin ? (toolId) => handleDelete(toolId, 'toolOneCol') : undefined}
                    />

                    {/* Two Column Layout */}
                    <ToolTwoCol
                        tools={toolsTwoCol} 
                        isAdmin={isAdmin}
                        onAdd={isAdmin ? () => handleAdd('toolsTwoCol') : undefined}
                        onEdit={isAdmin ? (toolId) => handleEdit(toolId, 'toolsTwoCol') : undefined}
                        onDelete={isAdmin ? (toolId) => handleDelete(toolId, 'toolsTwoCol') : undefined}
                    />
                </div>
            </div>

            {/* Tool Form Modal for adding/editing tools */}
            {isModalOpen && (
                <ToolFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    initialData={currentTool}  // Pass the current tool data for editing
                    section={section}  // Pass the section to the form
                />
            )}
        </div>
    );
}
