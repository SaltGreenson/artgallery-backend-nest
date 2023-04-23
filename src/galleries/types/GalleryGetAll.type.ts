export type GalleryGetAllType = {
  skip: number;
  limit: number;
  userId?: string;
  sortCriteria?: object;
  searchString?: string;
};
