import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../hooks/useAuth';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    ageVerification: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const validatePassword = (password) => {
    const minLength = password?.length >= 8;
    const hasUpper = /[A-Z]/?.test(password);
    const hasLower = /[a-z]/?.test(password);
    const hasNumber = /\d/?.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/?.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      score: [minLength, hasUpper, hasLower, hasNumber, hasSpecial]?.filter(Boolean)?.length
    };
  };

  const getPasswordStrength = (score) => {
    if (score <= 2) return { label: 'Weak', color: 'text-error', bgColor: 'bg-error' };
    if (score <= 3) return { label: 'Fair', color: 'text-warning', bgColor: 'bg-warning' };
    if (score <= 4) return { label: 'Good', color: 'text-secondary', bgColor: 'bg-secondary' };
    return { label: 'Strong', color: 'text-success', bgColor: 'bg-success' };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData?.password);
      if (passwordValidation?.score < 3) {
        newErrors.password = 'Password must be stronger (at least 3 criteria)';
      }
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    if (!formData?.ageVerification) {
      newErrors.ageVerification = 'You must be 18 or older to use this platform';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await register(formData.email, formData.password, formData.fullName);
      if (response.success) {
        // Log in the user immediately
        navigate('/exchange-dashboard');
      } else {
        setErrors({ submit: response.error || 'Registration failed.' });
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData?.password);
  const passwordStrength = getPasswordStrength(passwordValidation?.score);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={errors?.fullName}
        required
      />
      {/* Email */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        description="We'll send a verification email to this address"
        required
      />
      {/* Password */}
      <div>
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />
        
        {/* Password Strength Indicator */}
        {formData?.password && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password strength:</span>
              <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                {passwordStrength?.label}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.bgColor}`}
                style={{ width: `${(passwordValidation?.score / 5) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`flex items-center space-x-1 ${passwordValidation?.minLength ? 'text-success' : 'text-muted-foreground'}`}>
                <Icon name={passwordValidation?.minLength ? 'Check' : 'X'} size={12} />
                <span>8+ characters</span>
              </div>
              <div className={`flex items-center space-x-1 ${passwordValidation?.hasUpper ? 'text-success' : 'text-muted-foreground'}`}>
                <Icon name={passwordValidation?.hasUpper ? 'Check' : 'X'} size={12} />
                <span>Uppercase letter</span>
              </div>
              <div className={`flex items-center space-x-1 ${passwordValidation?.hasLower ? 'text-success' : 'text-muted-foreground'}`}>
                <Icon name={passwordValidation?.hasLower ? 'Check' : 'X'} size={12} />
                <span>Lowercase letter</span>
              </div>
              <div className={`flex items-center space-x-1 ${passwordValidation?.hasNumber ? 'text-success' : 'text-muted-foreground'}`}>
                <Icon name={passwordValidation?.hasNumber ? 'Check' : 'X'} size={12} />
                <span>Number</span>
              </div>
              <div className={`flex items-center space-x-1 ${passwordValidation?.hasSpecial ? 'text-success' : 'text-muted-foreground'} col-span-2`}>
                <Icon name={passwordValidation?.hasSpecial ? 'Check' : 'X'} size={12} />
                <span>Special character (!@#$%^&*)</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm your password"
        value={formData?.confirmPassword}
        onChange={handleInputChange}
        error={errors?.confirmPassword}
        required
      />
      {/* Phone Number */}
      <Input
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        placeholder="+1 (555) 123-4567"
        value={formData?.phoneNumber}
        onChange={handleInputChange}
        error={errors?.phoneNumber}
        description="Required for account verification and security"
        required
      />
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div>
          <Checkbox
            label="I agree to the Terms and Conditions"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            name="agreeToTerms"
            error={errors?.agreeToTerms}
            required
          />
          <button
            type="button"
            onClick={() => setShowTerms(!showTerms)}
            className="ml-6 text-sm text-primary hover:underline"
          >
            {showTerms ? 'Hide' : 'Read'} Terms and Conditions
          </button>
          
          {showTerms && (
            <div className="mt-3 ml-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground max-h-40 overflow-y-auto">
              <h4 className="font-medium text-foreground mb-2">Terms and Conditions</h4>
              <p className="mb-2">
                By using SecureSwap, you agree to conduct exchanges in good faith and provide accurate information about your offerings.
              </p>
              <p className="mb-2">
                You are responsible for the quality and legality of items or services you offer for exchange.
              </p>
              <p className="mb-2">
                SecureSwap acts as a facilitator and is not responsible for the actual exchange of goods or services between users.
              </p>
              <p>
                Disputes should be resolved amicably between parties, with our support team available for mediation if needed.
              </p>
            </div>
          )}
        </div>

        {/* Privacy Policy */}
        <div>
          <Checkbox
            label="I agree to the Privacy Policy"
            checked={formData?.agreeToPrivacy}
            onChange={handleInputChange}
            name="agreeToPrivacy"
            error={errors?.agreeToPrivacy}
            required
          />
          <button
            type="button"
            onClick={() => setShowPrivacy(!showPrivacy)}
            className="ml-6 text-sm text-primary hover:underline"
          >
            {showPrivacy ? 'Hide' : 'Read'} Privacy Policy
          </button>
          
          {showPrivacy && (
            <div className="mt-3 ml-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground max-h-40 overflow-y-auto">
              <h4 className="font-medium text-foreground mb-2">Privacy Policy</h4>
              <p className="mb-2">
                We collect and store your personal information securely to facilitate safe exchanges between users.
              </p>
              <p className="mb-2">
                Your email and phone number are used for account verification and important notifications only.
              </p>
              <p className="mb-2">
                We never share your personal information with third parties without your explicit consent.
              </p>
              <p>
                You can request deletion of your account and associated data at any time through our support system.
              </p>
            </div>
          )}
        </div>

        {/* Age Verification */}
        <Checkbox
          label="I confirm that I am 18 years of age or older"
          checked={formData?.ageVerification}
          onChange={handleInputChange}
          name="ageVerification"
          error={errors?.ageVerification}
          description="You must be at least 18 years old to use SecureSwap"
          required
        />
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span className="text-sm text-error">{errors?.submit}</span>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
      {/* Sign In Link */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">Already have an account? </span>
        <Link
          to="/user-login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Sign In Instead
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;