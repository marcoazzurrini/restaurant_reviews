export const calculateRating = (ratingArr, rating) => {
  if (ratingArr.length > 0) {
    return (
      ratingArr
        .map(review => parseInt(review.rating))
        .reduce((acc, val) => acc + val) / ratingArr.length
    );
  } else return rating;
};
