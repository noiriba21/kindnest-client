export type EventItem = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
};

export type JoinedItem = {
  _id: string;
  eventId: string;
  title: string;
  thumbnail: string;
  location: string;
  eventType: string;
  eventDate: string;
};

export type Impact = {
  joined: number;
  created: number;
  points: number;
  badge: string;
};