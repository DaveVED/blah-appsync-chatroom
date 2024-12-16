export interface User {
    id: number;
    name: string;
    avatar: string;
  }
  
  export interface Message {
    id: string;
    content: string;
    userId: number;
    timestamp: Date;
  }
  
  export const users: User[] = [
    { id: 1, name: 'Alice', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Alice' },
    { id: 2, name: 'Bob', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Bob' },
    { id: 3, name: 'Charlie', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Charlie' },
    { id: 4, name: 'David', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=David' },
    { id: 5, name: 'Eve', avatar: 'https://api.dicebear.com/6.x/adventurer/svg?seed=Eve' },
  ];
  
  export const initialMessages: Message[] = [
    { id: '1', content: 'Hello everyone!', userId: 1, timestamp: new Date(2023, 5, 1, 9, 0) },
    { id: '2', content: 'Hi Alice, how are you?', userId: 2, timestamp: new Date(2023, 5, 1, 9, 5) },
    { id: '3', content: 'I\'m doing great, thanks for asking!', userId: 1, timestamp: new Date(2023, 5, 1, 9, 10) },
  ];
  