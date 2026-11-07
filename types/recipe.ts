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
  ingredients: Ingredient[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  _id: string;
  name: string;
  desc: string;
  img: string;
}

export interface Category {
  _id: string;
  name: string;
}
