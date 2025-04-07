export class Task {
  constructor() {
    this.id;
    this.name;
    this.description;
    this.project;
    this.priority;
    this.reporter;
    this.list = [];
  }

  createTask(obj) {
    const { name, description, project, priority, reporter } = obj;
    const newTask = {
      id: this.list.length + 1,
      name,
      description,
      project,
      priority,
      reporter
    };

    this.list.push(newTask);
    return newTask;
  }

  getTask(id) {
    const res = this.list.filter((a) => {
      return a.id === id;
    });

    return res.length > 0 ? res[0] : null;
  }

  getAllTasks() {
    return this.list;
  }

  updateTask(obj) {
    const task = this.getTask(obj.id);
    task.name = obj.name;
    task.description = obj.description;
    task.project = obj.project;
    task.priority = obj.priority;
    task.reporter = obj.reporter;
    this.list.splice(obj.id - 1, 1, task);

    return task;
  }

  deleteTask(id) {
    const index = this.list.findIndex((a) => a.id === parseInt(id));
    this.list.splice(index, 1);
    return this.list;
  }
}
