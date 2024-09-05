// src/pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Hàm xử lý API
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            // Xử lý thêm tin tức mới
            return handleAdd(req, res);

        case 'PUT':
            // Xử lý sửa tin tức
            return handleEdit(req, res);

        case 'DELETE':
            // Xử lý xóa tin tức
            return handleDelete(req, res);

        default:
            res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

// Hàm xử lý thêm tin tức
const handleAdd = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    console.log('Thêm tin tức mới:', data);

    // Xử lý thêm tin tức vào cơ sở dữ liệu ở đây

    res.status(201).json({ message: 'Thêm thành công' });
};

// Hàm xử lý sửa tin tức
const handleEdit = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const data = req.body;
    console.log('Sửa tin tức có ID:', id, 'với dữ liệu:', data);

    // Xử lý sửa tin tức trong cơ sở dữ liệu ở đây

    res.status(200).json({ message: 'Sửa thành công' });
};

// Hàm xử lý xóa tin tức
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    console.log('Xóa tin tức có ID:', id);

    // Xử lý xóa tin tức trong cơ sở dữ liệu ở đây

    res.status(200).json({ message: 'Xóa thành công' });
};
