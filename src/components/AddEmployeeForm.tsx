
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useHRStore } from '@/store/hrStore';
import { toast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

const addEmployeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Age must be at least 18').max(100, 'Age must be less than 100'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  performance: z.number().min(1, 'Performance must be between 1-5').max(5, 'Performance must be between 1-5'),
  avatar: z.string().min(1, 'Avatar is required'),
});

type AddEmployeeForm = z.infer<typeof addEmployeeSchema>;

interface AddEmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeFormComponent = ({ isOpen, onClose }: AddEmployeeFormProps) => {
  const { addEmployee } = useHRStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddEmployeeForm>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      name: '',
      email: '',
      age: 25,
      department: '',
      position: '',
      performance: 3,
      avatar: '👤',
    },
  });

  const departments = ['Engineering', 'Design', 'Marketing', 'HR', 'Sales', 'Finance'];
  const avatars = ['👤', '👩‍💻', '👨‍💻', '👩‍🎨', '👨‍🎨', '👩‍📈', '👨‍📈', '👩‍💼', '👨‍💼'];

  const onSubmit = async (data: AddEmployeeForm) => {
    setIsSubmitting(true);
    
    // Create new employee with all required fields
    const newEmployee = {
      id: `emp_${Date.now()}`,
      name: data.name,
      email: data.email,
      age: data.age,
      department: data.department,
      position: data.position,
      performance: data.performance,
      avatar: data.avatar,
      joinDate: new Date().toISOString().split('T')[0],
      projects: [],
      feedback: [],
      isBookmarked: false,
    };

    addEmployee(newEmployee);
    
    toast({
      title: "Employee Added Successfully! 🎉",
      description: `${data.name} has been added to the team.`,
    });

    form.reset();
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-cyber-dark border border-cyber-blue/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyber-blue flex items-center space-x-3">
            <UserPlus className="w-6 h-6" />
            <span>Add New Employee</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter full name"
                        className="bg-cyber-black border-cyber-gray text-white focus:border-cyber-blue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        className="bg-cyber-black border-cyber-gray text-white focus:border-cyber-blue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter age"
                        className="bg-cyber-black border-cyber-gray text-white focus:border-cyber-blue"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-cyber-black border-cyber-gray text-white focus:border-cyber-blue">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cyber-dark border-cyber-gray">
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept} className="text-white hover:bg-cyber-blue/20">
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Position</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter position"
                        className="bg-cyber-black border-cyber-gray text-white focus:border-cyber-blue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="performance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Performance Rating (1-5)</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger className="bg-cyber-black border-cyber-gray text-white focus:border-cyber-blue">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-cyber-dark border-cyber-gray">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()} className="text-white hover:bg-cyber-blue/20">
                            {rating} Star{rating !== 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-gray-300">Avatar</FormLabel>
                    <div className="grid grid-cols-9 gap-2">
                      {avatars.map((avatar) => (
                        <motion.button
                          key={avatar}
                          type="button"
                          onClick={() => field.onChange(avatar)}
                          className={`w-12 h-12 rounded-lg border-2 transition-all ${
                            field.value === avatar
                              ? 'border-cyber-blue bg-cyber-blue/20'
                              : 'border-cyber-gray hover:border-cyber-blue/50'
                          } flex items-center justify-center text-2xl`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-cyber-gray text-gray-300 hover:bg-cyber-gray/20"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyber-blue hover:bg-cyber-blue/80 text-cyber-black font-semibold"
              >
                {isSubmitting ? 'Adding...' : 'Add Employee'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeFormComponent;
