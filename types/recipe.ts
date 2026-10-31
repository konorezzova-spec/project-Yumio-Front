interface Ingred {
  _id: string;
  id: string;
  measure: string;
}

export interface Recipe {
  _id: string;
  title: string;
  category: string;
  owner: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  time: number;
  ingredients: Ingred[];
  createdAt: Date;
  updatedAt: Date;
}
