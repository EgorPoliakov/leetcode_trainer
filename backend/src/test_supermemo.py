from supermemo2.sm_two import SMTwo

review = SMTwo.first_review(4, "2021-3-14")
review = SMTwo(review.easiness, review.interval, review.repetitions).review(5, review.review_date)
print(review)