let  message = ""


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  export const validateInputs = (email:string, password:string, user_name:string) => {
    if (!user_name || !password || !email) {
      message = "All fields are required.";
      return false;
    }
    if (!usernameRegex.test(user_name)) {
      message = (
        "Username must be 3–20 characters long and can only contain letters, numbers, . and _"
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      message = ("Invalid email format.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      message = (
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
      );
      return false;
    }
    return true;
  };