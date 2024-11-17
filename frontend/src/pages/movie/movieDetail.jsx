import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userModel } from '../../../../backend/models/User';

const MovieDetail = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
        imageUrl: '',
    });
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]); // Store all reviews
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication
    const [userId, setUserId] = useState(null); // Store userId 
    const [errorMessage, setErrorMessage] = useState('');
    const [reviewError, setReviewError] = useState('');
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [username, setusername] = useState('')

    useEffect(() => {
        // Fetch movie data
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/movies/specific-movie/${movieId}`);
                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        title: data.title,
                        description: data.description,
                        year: data.year,
                        imageUrl: data.imageUrl, 
                    });
                    setReviews(data.reviews || []); // Load existing reviews
                } else {
                    setErrorMessage("Failed to load movie data.");
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setErrorMessage("A network error occurred. Please try again.");
            }
        };

        // Check authentication
        const checkAuthentication = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auth/user-status`, {
                    credentials: 'include',
                });
                const data = await response.json();

                if (data.isLoggedIn) {
                    setIsAuthenticated(true);
                    setUserId(data.userId); // Save userId from response 
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) { 
                console.error("Error checking authentication:", error);
            }  
        };

        

        fetchMovieData();
        checkAuthentication();
    }, []);

    

    const handleReviewSubmit = async (e) => { 
        e.preventDefault();
        setReviewError('');
    
        if (!review.trim()) {
            setReviewError('Review cannot be empty.');
            return;
        }
         console.log(username)
        try {
            const response = await fetch(`http://localhost:3000/api/v1/movies/add-review/${movieId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: review,userId }),
                credentials: 'include', 
            });
            
              console.log("user1",userId)
            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews); 
                // console.log(reviews) ;
                setReview('');  
                alert('Review submitted successfully!');
            } else {
                const errorData = await response.json();
                setReviewError(errorData.message || 'Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setReviewError('A network error occurred. Please try again.');
        }
    };
    

    return (
        <div className="bg-black w-full min-h-screen flex items-start justify-center">
            <div className="bg-gray-950 w-[90%] lg:w-[80%] flex flex-col items-center p-4 lg:p-8 gap-6">
                {errorMessage && (
                    <div className="text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}

                {/* Movie Image */}
                <div className="w-full">
                    <img
                        src={formData.imageUrl}
                        alt={formData.title}
                        className="object-cover w-full h-[50vh] lg:h-[70vh] rounded-md"
                    />
                </div>

                {/* Movie Details */}
                <div className="w-full text-black flex flex-col flex-wrap gap-4">
                    <h1 className="text-3xl lg:text-5xl font-bold text-center text-gray-200">
                        {formData.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-justify text-white" style={{ wordBreak: "break-word" }}>
                        {formData.description}
                    </p>
                    <p className="text-md lg:text-lg font-semibold text-white">
                        <span className="font-bold">Year:</span> {formData.year}
                    </p>
                </div>

                {/* Reviews Section */}
                <div className="w-full text-white flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Reviews</h2>
                    <ul className="list-disc list-inside text-gray-300">
                    <ul className="list-disc list-inside text-gray-300">
                     {reviews.map((rev, index) => (
                      <li key={index}>
                      <strong>{rev.username || "Anonymous"}:</strong> {rev.comment}
        </li>
    ))}
</ul>

                    </ul>
                </div>

                {/* Add Review Section */}
                {isAuthenticated ? (
                    <form onSubmit={handleReviewSubmit} className="w-full flex flex-col gap-4 mt-4">
                        <textarea
                            className="p-3 bg-gray-800 rounded-md text-white"
                            placeholder="Write your review..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                        {reviewError && (
                            <div className="text-red-500">{reviewError}</div>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                        >
                            Submit Review
                        </button>
                    </form>
                ) : (
                    <div className="mt-4 text-center text-white">
                        Please <span className="text-teal-500 cursor-pointer" onClick={() => navigate('/signin')}>sign in</span> to write a review.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
