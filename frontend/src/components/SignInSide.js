import React, { useState, useRef } from "react"
import { TextField, Alert, Grid, Box, Paper, Checkbox, FormControlLabel, CssBaseline, Button, Avatar } from "@mui/material"
import { Link, Redirect } from "react-router-dom"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"

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

export default function SignInSide() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const { signin } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const { currentUser } = useAuth()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      setError("")
      setLoading(true)
      console.log(signin)
      await signin(emailRef.current.value, passwordRef.current.value)
    } catch (err) {
      setError("Invalid Email/Password Combination")
    }

    setLoading(false)
  }
  return (
    <ThemeProvider theme={theme}>
      {currentUser && <Redirect to="/profile" />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random/?clothes)",
            backgroundRepeat: "no-repeat",
            backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" inputRef={emailRef} required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
              <TextField margin="normal" inputRef={passwordRef} required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" href="#" variant="body2">
                    {"Need an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
