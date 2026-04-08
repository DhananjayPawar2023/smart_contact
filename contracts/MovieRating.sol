// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MovieRating {
    struct RatingData {
        uint256 totalRating;
        uint256 ratingCount;
    }

    mapping(string => RatingData) private movieRatings;
    mapping(string => mapping(address => bool)) public hasRated;

    event MovieRated(string movieId, address indexed user, uint256 rating);

    // Stores a rating from 1 to 5 for a given movie ID.
    function rateMovie(string memory _movieId, uint256 _rating) public {
        require(bytes(_movieId).length > 0, "Movie ID is required");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
        require(!hasRated[_movieId][msg.sender], "You have already rated this movie");

        movieRatings[_movieId].totalRating += _rating;
        movieRatings[_movieId].ratingCount += 1;
        hasRated[_movieId][msg.sender] = true;

        emit MovieRated(_movieId, msg.sender, _rating);
    }

    // Returns the total rating and number of ratings for a movie.
    function getRatingData(string memory _movieId)
        public
        view
        returns (uint256 totalRating, uint256 ratingCount)
    {
        require(bytes(_movieId).length > 0, "Movie ID is required");

        RatingData memory data = movieRatings[_movieId];
        return (data.totalRating, data.ratingCount);
    }

    // Returns the average rating for a movie.
    function getAverageRating(string memory _movieId) public view returns (uint256) {
        require(bytes(_movieId).length > 0, "Movie ID is required");

        RatingData memory data = movieRatings[_movieId];

        if (data.ratingCount == 0) {
            return 0;
        }

        return data.totalRating / data.ratingCount;
    }
}
