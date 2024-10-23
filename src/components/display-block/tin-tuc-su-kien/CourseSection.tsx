import { useState, useEffect } from 'react';
import PgControl from '@/components/display-block/PgControl';
import CourseForm from './form/CourseForm';

interface Course {
  id: string;
  date: string;
  name: string;
  time: string;
  format: string;
  description: string;
}

interface CourseSectionProps {
  isAdmin: boolean;
}

export default function CourseSection({ isAdmin }: CourseSectionProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const coursesPerPage = 3;
  const [loading, setLoading] = useState(true);

  // State to manage showing the form and editing state
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tin-tuc-su-kien/su-kien/course');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Function to handle adding a new course
  const handleAddCourse = async (newCourse: Omit<Course, 'id'>) => {
    try {
      const response = await fetch('/api/tin-tuc-su-kien/su-kien/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      const addedCourse = await response.json();
      setCourses([addedCourse, ...courses]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Function to handle editing an existing course
  const handleEditCourse = async (updatedCourse: Omit<Course, 'id'>) => {
    if (!editCourse) return;

    try {
      const response = await fetch(`/api/tin-tuc-su-kien/su-kien/course`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: editCourse.id, ...updatedCourse }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit course');
      }

      const editedCourse = await response.json();
      setCourses(courses.map((course) => (course.id === editCourse.id ? editedCourse : course)));
      setShowForm(false);
      setEditCourse(null);
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  // Function to handle deleting a course
  const handleDeleteCourse = async (id: string) => {
    try {
      // Optimistically update the state
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
      
      const response = await fetch(`/api/tin-tuc-su-kien/su-kien/course`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

    } catch (error) {
      console.error('Error deleting course:', error);
      // Revert state on error
      setCourses((prevCourses) => [...prevCourses, editCourse!]);
    }
  };

  // Show the form for adding or editing a course
  const handleShowForm = (course?: Course) => {
    if (course) {
      setEditCourse(course);
    }
    setShowForm(true);
  };

  // Handle form cancellation
  const handleCancelForm = () => {
    setShowForm(false);
    setEditCourse(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Pagination calculations
  const totalCoursePages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice(
    (currentCoursePage - 1) * coursesPerPage,
    currentCoursePage * coursesPerPage
  );

  // Pagination handlers
  const handleCoursesPageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentCoursePage < totalCoursePages) {
      setCurrentCoursePage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentCoursePage > 1) {
      setCurrentCoursePage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <header className="flex items-center mb-4">
        <h1 className="text-2xl font-semibold">Các khóa học sắp diễn ra</h1>
        {isAdmin && (
          <button
            className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => handleShowForm()}
          >
            Thêm
          </button>
        )}
      </header>
      {currentCourses.map((course, index) => (
  course && ( // Add this check to ensure no null or undefined data is rendered
    <div key={index} className="p-6 max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg mb-6">
      <h2 className="text-2xl font-semibold mb-4 font-inter">
        {course.date}: {course.name}
      </h2>
      <div className="mb-4">
        <p className="text-lg font-inter mb-2">
          <span className="font-semibold">Thời gian bắt đầu - kết thúc:</span>
          <span className="ml-2">{course.time}</span>
        </p>
        <p className="text-lg font-inter mb-2">
          <span className="font-semibold">Hình thức:</span>
          <span className="ml-2">{course.format}</span>
        </p>
        <p className="text-base font-semibold font-inter mt-2">
          {course.description}
        </p>
      </div>
      <div className="flex space-x-2">
        {isAdmin && (
          <>
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              onClick={() => handleShowForm(course)}
            >
              Sửa
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => handleDeleteCourse(course.id)}
            >
              Xóa
            </button>
          </>
        )}
      </div>
    </div>
  )
))}

      <PgControl
        currentPage={currentCoursePage}
        totalPages={totalCoursePages}
        onNextPage={() => handleCoursesPageChange('next')}
        onPrevPage={() => handleCoursesPageChange('prev')}
      />
      {showForm && (
        <CourseForm
          initialData={editCourse || undefined}
          onSave={editCourse ? handleEditCourse : handleAddCourse}
          onCancel={handleCancelForm}
          isEditMode={Boolean(editCourse)}
        />
      )}
    </div>
  );
}
