type UpdateCriteriaType = {
  like: {
    exists: object;
    notExists: object;
  };
  dislike: {
    exists: object;
    notExists: object;
  };
};

type GetUpdateCriteriaReturnType = {
  userUpdateCriteria: UpdateCriteriaType;
  galleryUpdateCriteria: UpdateCriteriaType;
};

export const likeDislikeUpdateCriteriaHelper = (
  variant: "like" | "dislike",
  galleryId: string
): GetUpdateCriteriaReturnType => {
  const userUpdateCriteria: UpdateCriteriaType = {
    like: {
      exists: {
        $pull: {
          likedPosts: galleryId,
        },
        $inc: { likedCount: -1 },
      },
      notExists: {
        $push: {
          likedPosts: galleryId,
        },
        $inc: { likedCount: 1 },
      },
    },
    dislike: {
      exists: {
        $pull: {
          dislikedPosts: galleryId,
        },
        $inc: { dislikedCount: -1 },
      },
      notExists: {
        $push: {
          dislikedPosts: galleryId,
        },
        $inc: { dislikedCount: 1 },
      },
    },
  };

  const galleryUpdateCriteria: UpdateCriteriaType = {
    like: {
      exists: {
        $inc: { likes: -1 },
      },
      notExists: {
        $inc: { likes: 1 },
      },
    },
    dislike: {
      exists: {
        $inc: { dislikes: -1 },
      },
      notExists: {
        $inc: { dislikes: 1 },
      },
    },
  };
  return {
    galleryUpdateCriteria,
    userUpdateCriteria,
  };
};
