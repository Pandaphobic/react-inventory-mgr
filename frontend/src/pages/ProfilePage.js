import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import CardMedia from "@mui/material/CardMedia"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Button, Container, Alert, Box, Card, CardContent } from "@mui/material"
import { useAuth } from "../contexts/AuthContext"

export default function ProfilePage() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.pushState("/signin")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <Container>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Profile
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <strong>Email:</strong> {currentUser.email}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <Button>
                <Link to="/edit-profile">Update Profile</Link>
              </Button>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              FIRSTNAME LASTNAME
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button onClick={handleLogout} variant="contained">
              LOGOUT
            </Button>
          </Box>
        </Box>
        {/* <CardMedia component="img" sx={{ width: 151 }} image="" alt="Live from space album cover" /> */}
      </Card>
    </Container>
  )
}
