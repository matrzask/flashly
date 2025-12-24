export interface Deck {
  id: string;
  name: string;
  public: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  author?: string;
}
