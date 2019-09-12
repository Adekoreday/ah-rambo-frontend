/* eslint-disable import/prefer-default-export */
export const articleWithLike = {
  message: 'like added successfully',
  article: {
    id: 1,
    slug: 'how-to-train-your-dragon',
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    image: null,
    articleBody: 'It takes a Jacobian',
    likesCount: 1,
    views: 3,
    dislikesCount: 0,
    publishedAt: '2019-09-11T21:58:28.422Z',
    createdAt: '2019-09-11T21:58:28.422Z',
    updatedAt: '2019-09-11T22:06:00.753Z',
  },
  likes: [
    {
      id: 1,
      userId: 2,
      contentType: 'article',
      contentId: 1,
      createdAt: '2019-09-11T17:00:14.041Z',
      updatedAt: '2019-09-11T17:00:14.041Z',
    },
  ],
};

export const articleWithDislike = {
  message: 'dislike added successfully',
  article: {
    id: 1,
    slug: 'how-to-train-your-dragon',
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    image: null,
    articleBody: 'It takes a Jacobian',
    likesCount: 1,
    views: 3,
    dislikesCount: 0,
    publishedAt: '2019-09-11T21:58:28.422Z',
    createdAt: '2019-09-11T21:58:28.422Z',
    updatedAt: '2019-09-11T22:06:00.753Z',
  },
  dislikes: [
    {
      id: 1,
      userId: 2,
      contentType: 'article',
      contentId: 1,
      createdAt: '2019-09-11T17:00:14.041Z',
      updatedAt: '2019-09-11T17:00:14.041Z',
    },
  ],
};

export const articleWithoutLike = {
  message: 'like removed successfully',
  article: {
    id: 1,
    slug: 'how-to-train-your-dragon',
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    image: null,
    articleBody: 'It takes a Jacobian',
    likesCount: 1,
    views: 3,
    dislikesCount: 0,
    publishedAt: '2019-09-11T21:58:28.422Z',
    createdAt: '2019-09-11T21:58:28.422Z',
    updatedAt: '2019-09-11T22:06:00.753Z',
  },
};

export const articleWithoutDislike = {
  message: 'dislike removed successfully',
  article: {
    id: 1,
    slug: 'how-to-train-your-dragon',
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    image: null,
    articleBody: 'It takes a Jacobian',
    likesCount: 1,
    views: 3,
    dislikesCount: 0,
    publishedAt: '2019-09-11T21:58:28.422Z',
    createdAt: '2019-09-11T21:58:28.422Z',
    updatedAt: '2019-09-11T22:06:00.753Z',
  },
};
