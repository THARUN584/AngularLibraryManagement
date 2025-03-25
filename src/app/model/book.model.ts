import {Author} from './author.model';
export interface Book {
  id: number;
  name: string;
  genere: string;
  author?: { 
    id: number;
    name: string;
    place: string;
  };
}
