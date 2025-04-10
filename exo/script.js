function generateToken(user) {
  const token = btoa(JSON.stringify(user));
  return token;
}
function decodeToken(token) {
  const decoded = atob(token);
  return JSON.parse(decoded);
}
