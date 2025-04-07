export class User {
  constructor(fname, lname, username, password, email, empId, role) {
    this.fname = fname;
    this.lname = lname;
    this.username = username;
    this.password = password;
    this.email = email;
    this.empId = empId;
    this.role = role;
  }

  toString() {
    return `User(${this.empId}): ${this.fname} ${this.lname}, Role: ${this.role}`;
  }
}

export class UserManager {
  constructor() {
    this.users = new Map();
  }

  createUser(user) {
    const id = +user.empId;
    if (this.users.has(id)) {
      return `A user already exists with that empId`;
    }

    this.users.set(id, user);
    return `User has been created successfully with empId: ${id}`;
  }

  getUserById(empId) {
    const id = +empId;
    return this.users.has(id)
      ? this.users.get(id)
      : `No user found with provided empId: ${id}`;
  }

  getUsers() {
    const usersList = Array.from(this.users.values());
    return usersList;
  }

  updateUser(empId, data) {
    const id = +empId;
    if (!this.users.has(id)) {
      return `User doesn't exists with provided empId: ${id}`;
    }

    const user = this.getUserById(id);

    Object.keys(data).forEach((k) => {
      if (k in user) {
        user[k] = data[k];
      }
    });
    return `User with empId ${id} has been updated`;
  }

  deleteUser(empId) {
    const id = +empId;
    if (!this.users.has(id)) {
      return `User doesn't exists with provided empId: ${id}`;
    }

    this.users.delete(id);
    return `User with empId ${id} has been deleted`;
  }
}

