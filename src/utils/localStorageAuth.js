const localStorageAuth = {
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  setUser(token) {
    localStorage.setItem("user", JSON.stringify(token));
  },
  removeUser() {
    localStorage.removeItem("user");
  },
  isAuthenticated() {
    return !!localStorageAuth.getUser();
  },
  logout() {
    localStorageAuth.removeUser();
  },
};

export default localStorageAuth;
