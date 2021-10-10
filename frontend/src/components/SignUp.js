import React, { useRef, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { Alert, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material/"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import { useAuth } from "../contexts/AuthContext"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        MidHeavy.Tech
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignUp() {
  // Handle inputs
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const { signup, signin, currentUser } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()

    // Sanitize Password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      console.log(signup)
      await signup(emailRef.current.value, passwordRef.current.value)
      await signin(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError("Failed to create account")
    }
    setLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
      {currentUser && <Redirect to="/profile" />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField autoComplete="fname" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />
              </Grid> */}
              <Grid item xs={12}>
                <TextField required fullWidth id="email" inputRef={emailRef} label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" inputRef={passwordRef} label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" inputRef={passwordConfirmRef} label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to let MidHeavy abuse my mailbox 🔥" />
              </Grid>
            </Grid>
            <Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signin" href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
