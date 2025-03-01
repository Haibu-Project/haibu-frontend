export interface Comment {
    id: string;
    content: string;
    user: {
      id: string;
      username: string;
      image: string;
    };
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      username: string;
      image: string;
    };
    comments?: Comment[]; 
  }
  