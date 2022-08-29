import instance from './instance'

export default class tasksService {
  static getTasks = (userId) =>
    instance.get(`tasks/getAssignedTasks`, { params: { userId } })
  static createTask = (task) => instance.post('tasks/createUserTask', task)
  static deleteTask = (taskId) => instance.delete(`tasks/${taskId}`)
  static updateTask = (task) => instance.put(`tasks/${task.id}`, task)
  static searchTask = (userId, title) =>
    instance.get(`/tasks/getAssignedTasks`, { params: { userId, title } })
  static getUserTasks = (userId) =>
    instance.get('/tasks/getUserTasks', { params: { userId } })

  static assignWorker = (taskId, userId) =>
    instance.post(`/tasks/${taskId}/assignWorker`, { userId })
  static unassignWorker = (taskId, userId) =>
    instance.post(`/tasks/${taskId}/unassignWorker`, { userId })

  static startTask = (taskId, userId) =>
    instance.post(`tasks/${taskId}/startTimeLine`, { userId })

  static completeTask = (taskId, userId) =>
    instance.post(`tasks/${taskId}/endTimeLine`, { userId })

  static finishTask = (taskId, userId) =>
    instance.post(`tasks/${taskId}/completeTask`, { userId })

  static getReport = (startTime, endTime, workerId) =>
    instance.get('tasks/getReport', {
      params: { workerId, startTime, endTime }
    })

  // static startPause = (taskId, userId) =>
  //   instance.post(`tasks/${taskId}/startpause`, { userId });

  // static endPause = (taskId, userId) =>
  //   instance.post(`tasks/${taskId}/endpause`, { userId });
}
