import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateMessage(message: string, maxLength: number): string {
  if (message.length <= maxLength) return message;
  return message.slice(0, maxLength - 1) + "…";
}

export const mockChats = [
  {
    id: 1,
    name: "Alice Cooper",
    message:
      "Hey, how's it going? I was wondering if you had a chance to look at the project proposal I sent over yesterday.",
    time: "2m",
    initials: "AC",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 2,
    name: "Bob Wilson",
    message:
      "Can you review the latest changes to the codebase? I've made some significant updates.",
    time: "1h",
    initials: "BW",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 3,
    name: "Carol Smith",
    message:
      "The team meeting is scheduled for tomorrow at 2 PM. Don't forget to prepare your weekly report.",
    time: "3h",
    initials: "CS",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 4,
    name: "David Brown",
    message:
      "Thanks for your help with the client presentation! It went really well.",
    time: "5h",
    initials: "DB",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 5,
    name: "Eve Johnson",
    message:
      "Project deadline updated. We now have until next Friday to complete all tasks.",
    time: "1d",
    initials: "EJ",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 6,
    name: "Frank Miller",
    message:
      "New design mockups are ready for review. Let me know what you think!",
    time: "1d",
    initials: "FM",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 7,
    name: "Grace Lee",
    message: "Can we schedule a quick call to discuss the marketing strategy?",
    time: "2d",
    initials: "GL",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 8,
    name: "Henry Ford",
    message:
      "The new feature is now live in production. Keep an eye out for any issues.",
    time: "2d",
    initials: "HF",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 9,
    name: "Ivy Chen",
    message:
      "I've updated the documentation. Please review when you have a moment.",
    time: "3d",
    initials: "IC",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 10,
    name: "Jack Ryan",
    message:
      "Budget approval came through. We can proceed with hiring new team members.",
    time: "4d",
    initials: "JR",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 11,
    name: "Karen White",
    message:
      "Client feedback on the latest deliverable is very positive. Great job team!",
    time: "5d",
    initials: "KW",
    imageUrl: "/dave-cave-icon.png",
  },
  {
    id: 12,
    name: "Liam Scott",
    message:
      "New security protocols are in place. Please review and update your passwords.",
    time: "1w",
    initials: "LS",
    imageUrl: "/dave-cave-icon.png",
  },
];
