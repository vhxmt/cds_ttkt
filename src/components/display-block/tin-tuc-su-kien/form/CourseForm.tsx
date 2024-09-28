import { useState, useEffect } from 'react';

interface Course {
  id: string;
  date: string;
  name: string;
  time: string;
  format: string;
  description: string;
}

interface CourseFormProps {
  initialData?: Course; // Data for the course being edited, if any
  onSave: (course: Omit<Course, 'id'>) => void; // Function to call when saving the course
  onCancel: () => void; // Function to call when cancelling the form
  isEditMode: boolean; // Flag to indicate if the form is in edit mode
}

export default function CourseForm({ initialData, onSave, onCancel, isEditMode }: CourseFormProps) {
  const [formData, setFormData] = useState<Course>({
    id: '',
    date: '',
    name: '',
    time: '',
    format: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Populate form with existing data if in edit mode
    }
  }, [initialData]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      date: formData.date,
      name: formData.name,
      time: formData.time,
      format: formData.format,
      description: formData.description
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditMode ? 'Sửa khóa học' : 'Thêm khóa học'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên khóa học</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ngày diễn ra</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Thời gian</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hình thức</label>
            <input
              type="text"
              name="format"
              value={formData.format}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEditMode ? 'Lưu thay đổi' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
