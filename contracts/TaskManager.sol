//SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract TaskManager{
  //Struct
  struct Task{
    uint256 id;
    string title;
    string description;
    bool completed;
    address owner;
    uint256 deadline;
  }

  // States
  mapping(uint256 => Task) private tasks;
  
  uint256 private totalTasks;
  uint256 private nextTaskId;

  //Events
  event TaskCreated(uint256 indexed taskId, string title);
  event TaskUpdated(uint256 indexed taskId);
  event TaskDeleted(uint256 indexed taskId);
  event TaskStatusChanged(uint256 indexed taskId, bool completed);
  event DeadlineSet(uint256 indexed taskId, uint256 deadline);
  event DeadlinePassed(uint256 indexed taskId);

  // Modifier
  modifier onlyTaskOwner(uint256 taskId) {
    require(tasks[taskId].owner == msg.sender, "Only task owner can perform this action");
    _;  
  }


  // Functions
  function createTask(string calldata title, string calldata description, uint256 deadline) external {
    require(bytes(title).length > 0, "Title cannot be empty");
    require(deadline == 0 || deadline > block.timestamp, "Deadline must be in the future");
    uint256 taskId = nextTaskId;

    tasks[taskId] = Task({
      id: taskId,
      title: title,
      description: description,
      completed: false,
      owner: msg.sender,
      deadline: deadline
    });

    nextTaskId++;
    totalTasks++;

    emit TaskCreated(taskId, title);
    if (deadline > 0) {
      emit DeadlineSet(taskId, deadline);
    }
  }

  // function to get the task by Id
  function getTask(uint256 taskId)external view returns(Task memory){
    require(taskId < nextTaskId, "task does not exist");
    return tasks[taskId];
  }

  // function to update task title and description
  function updateTask(uint256 taskId, string calldata newTitle, 
  string calldata newDescription) external onlyTaskOwner(taskId) {
    require(taskId < nextTaskId, "task does not exist");
    require(bytes(newTitle).length > 0, "title cannot be empty");

    Task storage task = tasks[taskId];
    task.title = newTitle;
    task.description = newDescription;

    emit TaskUpdated(taskId);
  }

  function toggleTaskStatus(uint256 taskId) external onlyTaskOwner(taskId) {
    require(taskId < nextTaskId, "task does not exist");

    Task storage task = tasks[taskId];
    task.completed = !task.completed;

    emit TaskStatusChanged(taskId, task.completed);
  }

  //function to delete task
  function deleteTask(uint256 taskId) external onlyTaskOwner(taskId) {
    require(taskId < nextTaskId, "Task does not exist");

    delete tasks[taskId];

    totalTasks--;

    emit TaskDeleted(taskId);
  }

  function getTotalTasks() external view returns (uint256) {
        return totalTasks;
    }

  // Deadline functions
  function setDeadline(uint256 taskId, uint256 newDeadline) external onlyTaskOwner(taskId) {
    require(taskId < nextTaskId, "Task does not exist");
    require(newDeadline > block.timestamp, "Deadline must be in the future");

    tasks[taskId].deadline = newDeadline;

    emit DeadlineSet(taskId, newDeadline);
  }

  function getDeadline(uint256 taskId) external view returns (uint256) {
    require(taskId < nextTaskId, "Task does not exist");
    return tasks[taskId].deadline;
  }

  function isOverdue(uint256 taskId) external view returns (bool) {
    require(taskId < nextTaskId, "Task does not exist");
    uint256 deadline = tasks[taskId].deadline;
    
    if (deadline == 0 || tasks[taskId].completed) {
      return false; // No deadline or task is already completed
    }
    
    return block.timestamp > deadline;
  }

  function removeDeadline(uint256 taskId) external onlyTaskOwner(taskId) {
    require(taskId < nextTaskId, "Task does not exist");
    require(tasks[taskId].deadline != 0, "Task has no deadline");

    tasks[taskId].deadline = 0;

    emit DeadlineSet(taskId, 0);
  }
}