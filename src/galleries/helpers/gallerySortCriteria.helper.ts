export type GallerySortCriteriaType = {
  likes?: 1 | -1 | null;
  dislikes?: 1 | -1 | null;
};

export const gallerySortCriteriaHelper = (
  isFirstLiked?: string
): GallerySortCriteriaType => {
  if (isFirstLiked === "true") {
    return {
      likes: 1,
    };
  } else if (isFirstLiked === "false") {
    return {
      likes: -1,
    };
  }
  return {};
};
