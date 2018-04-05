// User service
const login = async (username, password) =>
  new Promise(resolve => {
    setTimeout(() => resolve({ token: "HelloWorld" }), 2000);
  });

const register = async user =>
  new Promise(resolve => {
    setTimeout(() => resolve(Object.assign({}, user, { userId: 1 })), 2000);
  });

export default { login, register };
