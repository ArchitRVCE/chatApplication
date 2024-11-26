import React,{useState} from 'react'
import { useNavigate} from "react-router-dom"
import { TextField, RadioGroup, FormControlLabel, Radio, Checkbox, Button, FormControl, FormLabel, Box,Input,  InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  
  return (
    <>
      <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setLoading(true);
        const {name,email,password} = values;
        axios.post('/api/user/login',{
          name,
          email,
          password
        },{
          headers: {'Content-type':'application/json'}
        }).then(response=>{console.log(response.data)
          setLoading(false);
          navigate("/chat")
        })
        .catch(err=>console.log(err.message))
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
            

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
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              LOGIN
            </Button>
        
          </Box>
        </Form>
      )}
    </Formik>
    </>
  )
}

export default Login
