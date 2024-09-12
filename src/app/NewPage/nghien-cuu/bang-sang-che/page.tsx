'use client';
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import data from '@/data/nghien-cuu/bang-sang-che/data.json';
import { useAuth } from '@/components/providers/AuthProvider';
import PatentForm, { Patent } from './form-bang-sang-che';

interface PatentData {
    patents: Patent[];
}

export default function BangSangChe() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingPatent, setEditingPatent] = useState<Patent | null>(null);
    const [patentList, setPatentList] = useState<Patent[]>(data.patents); // Set initial state from data
    const itemsPerPage = 3;

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patentList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(patentList.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAdd = () => {
        setEditingPatent(null);
        setShowForm(true);
    };

    const handleEdit = (patent: Patent) => {
        setEditingPatent(patent);
        setShowForm(true);
    };

    const handleDelete = (patentToDelete: Patent) => {
        // Remove the selected patent from the patent list
        const updatedList = patentList.filter((patent) => patent.stt !== patentToDelete.stt);
        setPatentList(updatedList);
        console.log("Xóa bằng sáng chế:", patentToDelete);
    };

    const handleFormSubmit = (submittedPatent: Patent) => {
        if (submittedPatent.stt) {
            // If the patent has an stt, we're editing an existing one
            const updatedList = patentList.map((patent) =>
                patent.stt === submittedPatent.stt ? submittedPatent : patent
            );
            setPatentList(updatedList);
            console.log("Cập nhật bằng sáng chế:", submittedPatent);
        } else {
            // Otherwise, we're adding a new patent
            const newPatent = { ...submittedPatent, stt: patentList.length + 1 }; // Assign a new stt
            setPatentList([newPatent, ...patentList]);
            console.log("Thêm mới bằng sáng chế:", newPatent);
        }
        setShowForm(false); // Close the form
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nghiên cứu" />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    {isAdmin && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm Bằng sáng chế
                            </button>
                        </div>
                    )}

                    <h3 className="text-xl font-semibold mb-2 text-center">Danh sách bằng sáng chế</h3>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <TableHeader headers={[
                                'STT', 'Họ và tên tác giả', 'SC/GPHI', 'Tên SC/GPHI', 'Ngày nộp',
                                'Năm nộp', 'Số nhận đơn', 'Năm cấp bằng độc quyền', 'Ngày cấp văn bằng',
                                'Số văn bằng', 'Số QĐ cấp', 'Đơn vị'
                            ]} />
                        </thead>
                        <tbody>
                            {currentItems.map((patent, index) => (
                                <TableRow
                                    key={index}
                                    rowData={patent}
                                    columns={[
                                        'stt', 'author', 'type', 'title', 'submissionDate',
                                        'submissionYear', 'applicationNumber', 'grantYear', 'grantDate',
                                        'grantNumber', 'decisionNumber', 'unit'
                                    ]}
                                    onEdit={() => handleEdit(patent)}
                                    onDelete={() => handleDelete(patent)}
                                />
                            ))}
                        </tbody>
                    </table>

                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />

                    {showForm && (
                        <PatentForm
                            patent={editingPatent}
                            onSubmit={handleFormSubmit}
                            onClose={handleFormClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
