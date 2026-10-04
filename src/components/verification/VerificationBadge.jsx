import React from 'react'
import { Shield, CheckCircle, AlertCircle } from 'lucide-react'

const VerificationBadge = ({ isVerified, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  if (isVerified) {
    return (
      <div className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
        <CheckCircle className={`${sizeClasses[size]} text-green-600`} />
        <span className={`${textSizeClasses[size]} font-medium`}>Verified</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
      <AlertCircle className={`${sizeClasses[size]} text-yellow-600`} />
      <span className={`${textSizeClasses[size]} font-medium`}>Unverified</span>
    </div>
  )
}

export default VerificationBadge
