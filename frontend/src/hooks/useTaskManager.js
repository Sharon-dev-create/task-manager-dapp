import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export const useTaskManager = () => {
  const { contract } = useWeb3();
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [txError, setTxError] = useState(null);

  const createTask = async (title, description, deadline) => {
    if (!contract) throw new Error('Contract not initialized');
    setTransactionInProgress(true);
    setTxError(null);
    try {
      const tx = await contract.createTask(title, description, deadline);
      const receipt = await tx.wait();
      setTransactionInProgress(false);
      return receipt;
    } catch (error) {
      setTxError(error.message);
      setTransactionInProgress(false);
      throw error;
    }
  };

  const getTask = async (taskId) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const task = await contract.getTask(taskId);
      return task;
    } catch (error) {
      setTxError(error.message);
      throw error;
    }
  };

  const updateTask = async (taskId, newTitle, newDescription) => {
    if (!contract) throw new Error('Contract not initialized');
    setTransactionInProgress(true);
    setTxError(null);
    try {
      const tx = await contract.updateTask(taskId, newTitle, newDescription);
      const receipt = await tx.wait();
      setTransactionInProgress(false);
      return receipt;
    } catch (error) {
      setTxError(error.message);
      setTransactionInProgress(false);
      throw error;
    }
  };

  const toggleTaskStatus = async (taskId) => {
    if (!contract) throw new Error('Contract not initialized');
    setTransactionInProgress(true);
    setTxError(null);
    try {
      const tx = await contract.toggleTaskStatus(taskId);
      const receipt = await tx.wait();
      setTransactionInProgress(false);
      return receipt;
    } catch (error) {
      setTxError(error.message);
      setTransactionInProgress(false);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    if (!contract) throw new Error('Contract not initialized');
    setTransactionInProgress(true);
    setTxError(null);
    try {
      const tx = await contract.deleteTask(taskId);
      const receipt = await tx.wait();
      setTransactionInProgress(false);
      return receipt;
    } catch (error) {
      setTxError(error.message);
      setTransactionInProgress(false);
      throw error;
    }
  };

  const getTotalTasks = async () => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const total = await contract.getTotalTasks();
      return Number(total);
    } catch (error) {
      setTxError(error.message);
      throw error;
    }
  };

  const setDeadline = async (taskId, newDeadline) => {
    if (!contract) throw new Error('Contract not initialized');
    setTransactionInProgress(true);
    setTxError(null);
    try {
      const tx = await contract.setDeadline(taskId, newDeadline);
      const receipt = await tx.wait();
      setTransactionInProgress(false);
      return receipt;
    } catch (error) {
      setTxError(error.message);
      setTransactionInProgress(false);
      throw error;
    }
  };

  const getDeadline = async (taskId) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const deadline = await contract.getDeadline(taskId);
      return Number(deadline);
    } catch (error) {
      setTxError(error.message);
      throw error;
    }
  };

  const isOverdue = async (taskId) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const overdue = await contract.isOverdue(taskId);
      return overdue;
    } catch (error) {
      setTxError(error.message);
      throw error;
    }
  };

  const getTimeRemaining = async (taskId) => {
    if (!contract) throw new Error('Contract not initialized');
    try {
      const timeRemaining = await contract.getTimeRemaining(taskId);
      return Number(timeRemaining);
    } catch (error) {
      setTxError(error.message);
      throw error;
    }
  };

  const removeDeadline = async (taskId) => {
    if (!contract) throw new Error('Contract not initialized');
    setTransactionInProgress(true);
    setTxError(null);
    try {
      const tx = await contract.removeDeadline(taskId);
      const receipt = await tx.wait();
      setTransactionInProgress(false);
      return receipt;
    } catch (error) {
      setTxError(error.message);
      setTransactionInProgress(false);
      throw error;
    }
  };

  return {
    createTask,
    getTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    getTotalTasks,
    setDeadline,
    getDeadline,
    isOverdue,
    getTimeRemaining,
    removeDeadline,
    transactionInProgress,
    txError,
  };
};
