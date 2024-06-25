export type User = {
  password?: string;
  email: string;
  name: string;
  phone: string;
  id: string;
};

export type Helpinho = {
  id: string;
  userId: string;
  category: string;
  deadline: string;
  description: string;
  goal: string;
  image: string;
  title: string;
};

export type Help = {
  amount: string;
  helpinhoId: string;
  userId: string;
};
