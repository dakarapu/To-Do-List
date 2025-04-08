import { hashPassword, validPassword, generateToken } from '../middlewares/auth.js';

class User {
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

class UserManager {
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
    return this.users.has(id) ? this.users.get(id) : `No user found with provided empId: ${id}`;
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

const userManager = new UserManager();

export const getUsers = (req, res) => {
  const users = userManager.getUsers();
  res.status(200).send(users);
};

export const createUser = async (req, res) => {
  const { fname, lname, username, password, email, empId, role } = req.body;
  const hash = await hashPassword(password);
  const userData = new User(fname, lname, username, hash, email, empId, role);
  const result = userManager.createUser(userData);
  res.status(201).send(result);
};

export const getUser = (req, res) => {
  const id = req.params.id;
  const user = userManager.getUserById(id);
  res.status(200).send(user);
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = userManager.updateUser(id, data);
  res.status(200).send(user);
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  const user = userManager.deleteUser(id);
  res.status(200).send(user);
};

export const authenticateUser = async (req, res) => {
  const { username, password, empId } = req.body;
  const user = userManager.getUserById(+empId);

  if (user.username !== username)
    return res.status(401).send(`User not found with details provided`);
  const isValid = await validPassword(password, user.password);

  if (!isValid) return res.status(401).send(`Invalid credentials`);
  const token = generateToken(username, empId);
  res.status(200).send({ message: `Login successful`, token });
};
