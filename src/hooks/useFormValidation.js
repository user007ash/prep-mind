
import { useState } from 'react';

/**
 * Hook for form validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validateFn - Validation function that returns error object
 * @returns {Object} - Form state, errors, handlers, and validation methods
 */
export const useFormValidation = (initialValues = {}, validateFn = () => ({})) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    // Clear error when user starts typing if the field has been touched
    if (touched[name] && errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field on blur
    const fieldErrors = validateFn({ [name]: values[name] });
    if (fieldErrors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name]
      }));
    }
  };
  
  const validateForm = () => {
    const formErrors = validateFn(values);
    setErrors(formErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    return Object.keys(formErrors).length === 0;
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
    setErrors
  };
};
