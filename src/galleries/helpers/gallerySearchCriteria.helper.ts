export const gallerySearchCriteriaHelper = (
  userId?: string,
  searchString?: string
) => {
  const userCriteria = userId ? { user: userId } : {};
  const titleCriteria = searchString ? { title: { $regex: searchString } } : {};

  return {
    $and: [userCriteria, titleCriteria],
  };
};
