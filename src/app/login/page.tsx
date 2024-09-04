'use client'
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { register, handleSubmit } = useForm<LoginFormValues>();

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Đã xảy ra lỗi khi đăng nhập.');
                return;
            }

            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/'); // Chuyển hướng về trang chính sau khi đăng nhập
        } catch (err) {
            console.error('Lỗi khi đăng nhập:', err);
            setError('Đã xảy ra lỗi khi đăng nhập.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold mb-4">Đăng Nhập</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: 'Email là bắt buộc' })}
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
