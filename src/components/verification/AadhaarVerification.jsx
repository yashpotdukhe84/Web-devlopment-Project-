import React, { useState } from 'react'
import { Shield, CheckCircle, AlertCircle, Eye, EyeOff, CreditCard, Smartphone } from 'lucide-react'

const AadhaarVerification = ({ onVerificationComplete, onCancel }) => {
  const [step, setStep] = useState(1) // 1: Aadhaar, 2: Payment, 3: Confirmation
  const [aadhaarData, setAadhaarData] = useState({
    number: '',
    name: '',
    dob: '',
    otp: ''
  })
  const [paymentData, setPaymentData] = useState({
    method: 'upi',
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  })
  const [showAadhaar, setShowAadhaar] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAadhaarSubmit = async (e) => {
    e.preventDefault()
    setIsVerifying(true)
    
    // Simulate Aadhaar verification
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsVerifying(false)
    setStep(2)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsProcessing(false)
    setStep(3)
    
    // Call completion callback after a delay
    setTimeout(() => {
      onVerificationComplete({
        aadhaar: aadhaarData,
        payment: paymentData
      })
    }, 2000)
  }

  const formatAadhaarNumber = (value) => {
    const cleaned = value.replace(/\D/g, '')
    const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
    return formatted
  }

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '')
    const formatted = cleaned.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
    return formatted
  }

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
    }
    return cleaned
  }

  if (step === 1) {
    return (
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aadhaar Verification</h3>
          <p className="text-gray-600 text-sm">Verify your identity to proceed with donation</p>
        </div>

        <form onSubmit={handleAadhaarSubmit} className="space-y-4">
          <div>
            <label className="label text-gray-700 font-semibold">Aadhaar Number</label>
            <div className="relative">
              <input
                type={showAadhaar ? "text" : "password"}
                value={aadhaarData.number}
                onChange={(e) => setAadhaarData(prev => ({ 
                  ...prev, 
                  number: formatAadhaarNumber(e.target.value) 
                }))}
                className="input-field pr-12"
                placeholder="1234 5678 9012"
                maxLength="14"
                required
              />
              <button
                type="button"
                onClick={() => setShowAadhaar(!showAadhaar)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showAadhaar ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="label text-gray-700 font-semibold">Full Name (as per Aadhaar)</label>
            <input
              type="text"
              value={aadhaarData.name}
              onChange={(e) => setAadhaarData(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="label text-gray-700 font-semibold">Date of Birth</label>
            <input
              type="date"
              value={aadhaarData.dob}
              onChange={(e) => setAadhaarData(prev => ({ ...prev, dob: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="label text-gray-700 font-semibold">OTP (Sent to registered mobile)</label>
            <input
              type="text"
              value={aadhaarData.otp}
              onChange={(e) => setAadhaarData(prev => ({ ...prev, otp: e.target.value }))}
              className="input-field"
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              OTP will be sent to your registered mobile number
            </p>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1 py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="btn-primary flex-1 py-3"
            >
              {isVerifying ? 'Verifying...' : 'Verify Aadhaar'}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Secure Verification</p>
              <p className="text-xs text-blue-600">
                Your Aadhaar data is encrypted and used only for verification purposes
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Method</h3>
          <p className="text-gray-600 text-sm">Choose your preferred payment option</p>
          <div className="mt-3 p-2 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700">
              <strong>✓ Aadhaar Verified</strong> - Proceed to secure payment
            </p>
          </div>
        </div>

        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div>
            <label className="label text-gray-700 font-semibold mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPaymentData(prev => ({ ...prev, method: 'upi' }))}
                className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  paymentData.method === 'upi' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">UPI</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentData(prev => ({ ...prev, method: 'card' }))}
                className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  paymentData.method === 'card' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium">Card</span>
              </button>
            </div>
          </div>

          {paymentData.method === 'upi' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <label className="label text-gray-700 font-semibold mb-2">UPI ID</label>
              <input
                type="text"
                value={paymentData.upiId}
                onChange={(e) => setPaymentData(prev => ({ ...prev, upiId: e.target.value }))}
                className="input-field bg-white"
                placeholder="yourname@paytm or 9876543210@upi"
                required
              />
              <p className="text-xs text-gray-600 mt-2">
                Enter your UPI ID (e.g., yourname@paytm, yourname@phonepe, 9876543210@upi)
              </p>
            </div>
          )}

          {paymentData.method === 'card' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
              <div>
                <label className="label text-gray-700 font-semibold mb-2">Card Number</label>
                <div className="relative">
                  <input
                    type={showCard ? "text" : "password"}
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData(prev => ({ 
                      ...prev, 
                      cardNumber: formatCardNumber(e.target.value) 
                    }))}
                    className="input-field pr-12 bg-white"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCard(!showCard)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCard ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label text-gray-700 font-semibold mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({ 
                      ...prev, 
                      expiryDate: formatExpiryDate(e.target.value) 
                    }))}
                    className="input-field bg-white"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label className="label text-gray-700 font-semibold mb-2">CVV</label>
                  <input
                    type="password"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ 
                      ...prev, 
                      cvv: e.target.value.replace(/\D/g, '').substring(0, 3) 
                    }))}
                    className="input-field bg-white"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label text-gray-700 font-semibold mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={paymentData.name}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field bg-white"
                  placeholder="Name on card"
                  required
                />
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  <strong>Security Note:</strong> Your card details are encrypted and processed securely. 
                  We do not store your card information.
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary flex-1 py-3"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="btn-primary flex-1 py-3"
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
            <div>
              <p className="text-sm text-green-800 font-medium">Secure Payment</p>
              <p className="text-xs text-green-600">
                Your payment is processed through secure, encrypted channels
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Complete!</h3>
        <p className="text-gray-600 mb-4">
          Your Aadhaar has been verified and payment processed successfully.
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
      </div>
    )
  }
}

export default AadhaarVerification
