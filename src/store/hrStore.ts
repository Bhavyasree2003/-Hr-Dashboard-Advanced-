
import { create } from 'zustand';

export interface Employee {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
  position: string;
  performance: number; // 1-5 stars
  avatar: string;
  joinDate: string;
  projects: Project[];
  feedback: Feedback[];
  isBookmarked: boolean;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  completion: number;
  dueDate: string;
}

export interface Feedback {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface HRState {
  employees: Employee[];
  bookmarkedEmployees: Employee[];
  searchQuery: string;
  selectedDepartment: string;
  selectedPerformance: number | null;
  selectedEmployee: Employee | null;
  sortBy: 'name' | 'performance' | 'department' | 'joinDate';
  sortOrder: 'asc' | 'desc';
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedDepartment: (department: string) => void;
  setSelectedPerformance: (performance: number | null) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  setSortBy: (sortBy: 'name' | 'performance' | 'department' | 'joinDate') => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  toggleBookmark: (employeeId: string) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employeeId: string, updates: Partial<Employee>) => void;
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alexandra Chen',
    email: 'alexandra.chen@company.com',
    age: 29,
    department: 'Engineering',
    position: 'Senior Frontend Developer',
    performance: 5,
    avatar: '👩‍💻',
    joinDate: '2022-03-15',
    isBookmarked: true,
    projects: [
      { id: 'p1', name: 'Dashboard Redesign', status: 'active', completion: 75, dueDate: '2024-01-15' },
      { id: 'p2', name: 'Mobile App', status: 'completed', completion: 100, dueDate: '2023-12-01' }
    ],
    feedback: [
      { id: 'f1', author: 'Tech Lead', rating: 5, comment: 'Exceptional performance and leadership', date: '2023-12-01' }
    ]
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.rodriguez@company.com',
    age: 34,
    department: 'Design',
    position: 'UX Director',
    performance: 4,
    avatar: '👨‍🎨',
    joinDate: '2021-08-22',
    isBookmarked: false,
    projects: [
      { id: 'p3', name: 'Design System v2', status: 'active', completion: 60, dueDate: '2024-02-01' }
    ],
    feedback: [
      { id: 'f2', author: 'Product Manager', rating: 4, comment: 'Great creative vision and team collaboration', date: '2023-11-15' }
    ]
  },
  {
    id: '3',
    name: 'Sarah Kim',
    email: 'sarah.kim@company.com',
    age: 27,
    department: 'Marketing',
    position: 'Digital Marketing Specialist',
    performance: 4,
    avatar: '👩‍📈',
    joinDate: '2023-01-10',
    isBookmarked: true,
    projects: [
      { id: 'p4', name: 'Q1 Campaign', status: 'pending', completion: 25, dueDate: '2024-03-01' }
    ],
    feedback: [
      { id: 'f3', author: 'Marketing Director', rating: 4, comment: 'Innovative campaigns with great ROI', date: '2023-10-30' }
    ]
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@company.com',
    age: 31,
    department: 'Engineering',
    position: 'Backend Developer',
    performance: 3,
    avatar: '👨‍💻',
    joinDate: '2022-11-05',
    isBookmarked: false,
    projects: [
      { id: 'p5', name: 'API Optimization', status: 'active', completion: 80, dueDate: '2024-01-20' }
    ],
    feedback: [
      { id: 'f4', author: 'Engineering Manager', rating: 3, comment: 'Solid technical skills, room for growth in leadership', date: '2023-12-10' }
    ]
  },
  {
    id: '5',
    name: 'Emily Watson',
    email: 'emily.watson@company.com',
    age: 26,
    department: 'HR',
    position: 'HR Specialist',
    performance: 5,
    avatar: '👩‍💼',
    joinDate: '2023-05-15',
    isBookmarked: true,
    projects: [
      { id: 'p6', name: 'Employee Wellness Program', status: 'active', completion: 90, dueDate: '2024-01-31' }
    ],
    feedback: [
      { id: 'f5', author: 'HR Director', rating: 5, comment: 'Outstanding people skills and process improvement', date: '2023-11-20' }
    ]
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    age: 38,
    department: 'Sales',
    position: 'Senior Sales Manager',
    performance: 4,
    avatar: '👨‍💼',
    joinDate: '2020-02-01',
    isBookmarked: false,
    projects: [
      { id: 'p7', name: 'Enterprise Client Acquisition', status: 'active', completion: 65, dueDate: '2024-02-15' }
    ],
    feedback: [
      { id: 'f6', author: 'Sales Director', rating: 4, comment: 'Consistently exceeds targets with great client relationships', date: '2023-12-05' }
    ]
  }
];

export const useHRStore = create<HRState>((set, get) => ({
  employees: mockEmployees,
  bookmarkedEmployees: mockEmployees.filter(emp => emp.isBookmarked),
  searchQuery: '',
  selectedDepartment: 'All',
  selectedPerformance: null,
  selectedEmployee: null,
  sortBy: 'name',
  sortOrder: 'asc',

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
  
  setSelectedPerformance: (performance) => set({ selectedPerformance: performance }),
  
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

  setSortBy: (sortBy) => set({ sortBy }),

  setSortOrder: (sortOrder) => set({ sortOrder }),
  
  toggleBookmark: (employeeId) => set((state) => {
    const updatedEmployees = state.employees.map(emp => 
      emp.id === employeeId ? { ...emp, isBookmarked: !emp.isBookmarked } : emp
    );
    return {
      employees: updatedEmployees,
      bookmarkedEmployees: updatedEmployees.filter(emp => emp.isBookmarked)
    };
  }),
  
  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, employee]
  })),
  
  updateEmployee: (employeeId, updates) => set((state) => ({
    employees: state.employees.map(emp => 
      emp.id === employeeId ? { ...emp, ...updates } : emp
    )
  }))
}));
