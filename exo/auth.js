
function generateToken(user) {
    const userString = JSON.stringify(user);
    const token = btoa(userString); 
    return token;
  }
  
  
  function verifyToken(token) {
    const decodedString = atob(token); 
    const user = JSON.parse(decodedString); 
    return user;
  }
  