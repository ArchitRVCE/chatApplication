import React,{useState} from 'react'
import { TextField, RadioGroup, FormControlLabel, Radio, Checkbox,Input, Button, FormControl, FormLabel, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('password is required'),
  // file: Yup.mixed()
  //     .test('fileType', 'Only JPG/JPEG files are allowed', (value) => {
  //       if (!value) return false; // No file selected
  //       const fileTypes = ['image/jpeg', 'image/jpg'];
  //       return fileTypes.includes(value.type);
  //     })
  //     .test('fileSize', 'File size is too large', (value) => {
  //       if (!value) return false; // No file selected
  //       return value.size <= 5000000; // 5MB max size
  //     }),
});
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
            {/* Name Field */}
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
              
            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              SIGN UP
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
    </>
  )
}

export default Signup
