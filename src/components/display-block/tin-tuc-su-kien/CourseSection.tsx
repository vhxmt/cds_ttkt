import { useState, useEffect } from 'react';

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

  // State for new course data
  const [newCourse, setNewCourse] = useState<Course>({
    id: '',
    date: '',
    name: '',
    time: '',
    format: '',
    description: ''
  });

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/tin-tuc-su-kien/su-kien/courses/route');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourses(data); // The data should now be the array inside "Courses"
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  // Function to handle adding a new course
  const handleAddCourse = async () => {
    try {
      const response = await fetch('/api/tin-tuc-su-kien/su-kien/courses/route', {
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
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Function to handle editing a course
  const handleEditCourse = async (id: string, updatedCourse: Omit<Course, 'id'>) => {
    try {
      const response = await fetch('/api/tin-tuc-su-kien/su-kien/courses/route', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedCourse }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to edit course');
      }

      const editedCourse = await response.json();
      setCourses(courses.map((course) => (course.id === id ? editedCourse : course)));
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  // Function to handle deleting a course
  const handleDeleteCourse = async (id: string) => {
    try {
      const response = await fetch('/api/tin-tuc-su-kien/su-kien/courses/route', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
      <header className="flex items-center mb-4">
        <h1 className="text-2xl font-semibold">Các khóa học sắp diễn ra</h1>
        {isAdmin && (
          <button
            className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleAddCourse}
          >
            Thêm
          </button>
        )}
      </header>
      {/* Form to add a new course */}
      {isAdmin && (
        <div>
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course Date"
            value={newCourse.date}
            onChange={(e) => setNewCourse({ ...newCourse, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course Time"
            value={newCourse.time}
            onChange={(e) => setNewCourse({ ...newCourse, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Course Format"
            value={newCourse.format}
            onChange={(e) => setNewCourse({ ...newCourse, format: e.target.value })}
          />
          <textarea
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          ></textarea>
        </div>
      )}
      {currentCourses.map((course) => (
        <div key={course.id} className="p-6 max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg mb-6">
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
            <p className="text-base font-semibold font-inter mt-2">{course.description}</p>
          </div>
          <div className="flex space-x-2">
            {isAdmin && (
              <>
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                  onClick={() => handleEditCourse(course.id, course)}
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
      ))}
      <div>
        <button onClick={() => handleCoursesPageChange('prev')}>Previous</button>
        <button onClick={() => handleCoursesPageChange('next')}>Next</button>
      </div>
    </div>
  );
}
