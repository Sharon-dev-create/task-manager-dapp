// Update this with your deployed contract address
export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x56f7C027f2762da19B6c6bd01b9c276f12b542D6';

export const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'title', type: 'string' },
      { internalType: 'string', name: 'description', type: 'string' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'createTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'getTask',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'description', type: 'string' },
          { internalType: 'bool', name: 'completed', type: 'bool' },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct TaskManager.Task',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'taskId', type: 'uint256' },
      { internalType: 'string', name: 'newTitle', type: 'string' },
      { internalType: 'string', name: 'newDescription', type: 'string' },
    ],
    name: 'updateTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'toggleTaskStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'deleteTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalTasks',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'taskId', type: 'uint256' },
      { internalType: 'uint256', name: 'newDeadline', type: 'uint256' },
    ],
    name: 'setDeadline',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'getDeadline',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'isOverdue',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'removeDeadline',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'getTimeRemaining',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'taskId', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'title', type: 'string' },
    ],
    name: 'TaskCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'TaskUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'uint256', name: 'taskId', type: 'uint256' }],
    name: 'TaskDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'taskId', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'completed', type: 'bool' },
    ],
    name: 'TaskStatusChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'taskId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'DeadlineSet',
    type: 'event',
  },
];

export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_RPC_URL = 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY';
