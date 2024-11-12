import React from 'react'
import MovieCard from '../../components/MovieCard'
import ModMovieCard from '../../components/ModifiedMovieCard'

const AllMovies = () => {
  return (
    <div>
      <div className='bg-black h-fit min-h-screen w-full'>
         
            <ModMovieCard/>
        
      </div>
    </div>
  )
}

export default AllMovies
