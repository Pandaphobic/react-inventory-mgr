import React from "react"
import { Container } from "@mui/material"
import NavBarTop from "../components/AppBar"
import CollapsibleTable from "../components/CollapsibleTable"

export default function DashboardPage() {
  return (
    <Container>
      <NavBarTop />
      <CollapsibleTable />
    </Container>
  )
}
