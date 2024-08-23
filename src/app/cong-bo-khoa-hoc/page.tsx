import React from 'react';
import Image from 'next/image';

export default function Publications() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className="flex-none w-1/4">
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        Trang chủ &gt;&gt;
                        <a href="/cong-bo-khoa-hoc" className="text-[#BD1E1E]">Công bố khoa học</a>
                    </div>
                </div>

                <div className="w-3/4 p-4 border-l border-gray-300">
                    {/* Search Bar */}
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                        />
                        <button className="bg-gray-200 p-2 rounded-r-lg">
                            <svg
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M4.75 10.5a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div className = "flex p-4 border-l border-gray-300">

                    {/* Sidebar */}
                <div className="w-1/2 space-y-4">
                    <div className="font-bold text-[14px]">Bộ lọc:</div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Sách</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Chương sách</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Hội thảo trong nước</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Hội thảo quốc tế</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Tạp chí trong nước</span>
                        </label>
                    </div>
                    <div>
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Tạp chí quốc tế</span>
                        </label>
                    </div>
                </div>

                    {/* Year Filter */}
                    <div className="w-1/2 mb-6 flex items-center space-x-4">
                        <div className="font-bold text-[14px]">Lọc theo năm:</div>
                        <input
                            type="number"
                            className="w-20 p-2 border border-gray-300 rounded focus:outline-none"
                            defaultValue="2000"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            className="w-20 p-2 border border-gray-300 rounded focus:outline-none"
                            defaultValue="2024"
                        />
                    </div>
                    </div>

                    {/* Publications List */}
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex space-x-4 border-b pb-4"
                            >
                                <Image
                                    src="/cover.jpg"
                                    alt="Thumbnail"
                                    width={200}
                                    height={200}
                                    className="w-1/4 h-auto object-cover rounded-lg"
                                />
                                <div className="flex flex-col justify-between w-2/3">
                                    <div>
                                        <h4 className="font-bold text-lg">
                                            Tên bài báo {item}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            19/12/2022 12:00:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border rounded bg-gray-300">1</button>
                            <button className="px-3 py-1 border rounded">2</button>
                            <button className="px-3 py-1 border rounded">3</button>
                            <button className="px-3 py-1 border rounded">4</button>
                            <button className="px-3 py-1 border rounded">5</button>
                            <button className="px-3 py-1 border rounded">6</button>
                            <button className="px-3 py-1 border rounded">7</button>
                            <button className="px-3 py-1 border rounded">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
