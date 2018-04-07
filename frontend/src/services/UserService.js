// User service
const login = async (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!(email === "admin" && password === "admin")) {
        reject({ error: "Invalid email or password" });
      } else {
        resolve({ token: "HelloWorld" });
      }
    }, 2000);
  });

const register = async user =>
  new Promise(resolve => {
    setTimeout(() => resolve(Object.assign({}, user, { userId: 1 })), 2000);
  });

export default { login, register };
