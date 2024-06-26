class AuthService {
    async login(emailOrUsername, password) {
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailOrUsername, password }),
        });
  
        if (response.ok) {
          return { success: true };
        } else {
          return { success: false, error: 'Invalid email/username or password' };
        }
      } catch (error) {
        console.error('Error during login:', error);
        return { success: false, error: 'An error occurred. Please try again.' };
      }
    }
  }
  
  const authService = new AuthService();
  export default authService;
  