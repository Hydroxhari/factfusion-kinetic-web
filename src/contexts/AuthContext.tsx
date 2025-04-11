
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('factfusion_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('factfusion_user');
      }
    }
  }, []);

  // Login function with default credentials support
  const login = async (email: string, password: string) => {
    // Simulate API call
    try {
      // Check for default admin credentials
      if (email === 'admin@gmail.com' && password === 'admin') {
        const adminUser = {
          id: 'admin_user',
          name: 'admin',
          email: 'admin@gmail.com'
        };
        
        localStorage.setItem('factfusion_user', JSON.stringify(adminUser));
        setUser(adminUser);
        setIsAuthenticated(true);
        
        toast({
          title: "Login successful",
          description: "Welcome back, admin!",
        });
        
        return true;
      }
      
      // For other credentials, basic validation
      if (!email.includes('@') || password.length < 6) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password",
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate successful login
      const mockUser = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email: email
      };
      
      // Store user in localStorage
      localStorage.setItem('factfusion_user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };
  
  // Register function
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    try {
      // Check for admin email to prevent duplicates
      if (email === 'admin@gmail.com') {
        toast({
          title: "Registration failed",
          description: "This email is already in use",
          variant: "destructive"
        });
        return false;
      }
      
      // Basic validation
      if (!name || !email.includes('@') || password.length < 6) {
        toast({
          title: "Invalid information",
          description: "Please check your registration details",
          variant: "destructive"
        });
        return false;
      }
      
      // Simulate successful registration
      const mockUser = {
        id: `user_${Date.now()}`,
        name: name,
        email: email
      };
      
      // Store user in localStorage
      localStorage.setItem('factfusion_user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem('factfusion_user');
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
