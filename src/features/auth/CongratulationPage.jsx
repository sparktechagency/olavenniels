import React from 'react'
import authLast from '../../assets/auth-cong.png'
import { Link } from 'react-router-dom'

function CongratulationPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--primary-color)] p-4">
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-8 items-center justify-center'>
          {/* Text Content - comes first in mobile, second in desktop */}
          <div className='flex-1 order-2 lg:order-1 text-center lg:text-left'>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-3 md:mb-4">
              Congratulations!
            </h2>
            <p className="text-white text-base sm:text-lg md:text-xl mb-4 md:mb-6">
              Your password has been updated, please change your password regularly to avoid this happening
            </p>
            <Link to="/auth/login">
              <button className="bg-[var(--secondary-color)] !text-white py-2 px-4 rounded-md text-base cursor-pointer sm:text-lg md:text-xl w-full sm:w-auto">
                Continue
              </button>
            </Link>
          </div>

          {/* Image - comes second in mobile, first in desktop */}
          <div className='flex-1 order-1 lg:order-2 max-w-md lg:max-w-none'>
            <img className='w-full' src={authLast} alt="auth-last" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CongratulationPage