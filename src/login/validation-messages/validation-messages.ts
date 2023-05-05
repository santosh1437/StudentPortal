export const account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be at least 5 characters long' },
        { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
      ],
      'name': [
        { type: 'required', message: 'Name is required' },
      ],
      'phone': [
        { type: 'required', message: 'Phone is required' },
        { type: 'minlength', message: 'Please, Enter 10 digit Mobile Number' },
        { type: 'pattern', message: 'Please, Enter 10 digit Mobile Number' }
      ],
}