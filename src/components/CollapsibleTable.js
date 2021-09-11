import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import INVENTORY from "../json/inventory.json";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  title,
  cost,
  price,
  age,
  sku,
  brand,
  color,
  category,
  qtyAvailable,
  listingDate
) {
  return {
    title,
    cost,
    price,
    age,
    sku,
    brand,
    details: [{ age, color, category, qty: qtyAvailable, listingDate }],
  };
}

const rows = [];

function importJSON(inv) {
  const inventory = inv;

  inventory.forEach(item => {
    rows.push(
      createData(
        item["Listing Title"],
        item["Cost Price"],
        item["Current Listing Price"],
        item["Days Listed"],
        item["Listing SKU"],
        item["Brand"],
        item["Color"],
        item["Category"],
        item["Quantity Available"],
        item["Listing Date"]
      )
    );
  });
}

importJSON(INVENTORY);

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
        className={classes.root}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        {/* <TableCell align="left">{row.cost}</TableCell> */}
        <TableCell align="left">{row.price}</TableCell>
        <TableCell align="left">{row.age}</TableCell>
        {/* <TableCell align="left">{row.sku}</TableCell> */}
        <TableCell align="left">{row.brand}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Qty</TableCell>
                    <TableCell align="left">Sku</TableCell>
                    <TableCell align="left">Color</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Age</TableCell>
                    <TableCell align="right">Listing Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map(detailsRow => (
                    <TableRow key={detailsRow.title}>
                      <TableCell align="left">{detailsRow.qty}</TableCell>
                      <TableCell align="left">{detailsRow.sku}</TableCell>
                      <TableCell component="th" scope="row">
                        {detailsRow.color}
                      </TableCell>
                      <TableCell align="left">{detailsRow.category}</TableCell>
                      <TableCell align="left">{detailsRow.age}</TableCell>

                      <TableCell align="right">
                        {detailsRow.listingDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    cost: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        qty: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.number.isRequired,
    sku: PropTypes.number.isRequired,
  }).isRequired,
};

const tableHeader = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "white",
};

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table StickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#202020" }}>
            <TableCell />
            <TableCell className="tableHeader" style={tableHeader} align="left">
              Listing Title
            </TableCell>
            {/* <TableCell className="tableHeader" style={tableHeader} align="left">
              Cost
            </TableCell> */}
            <TableCell className="tableHeader" style={tableHeader} align="left">
              Price
            </TableCell>
            <TableCell className="tableHeader" style={tableHeader} align="left">
              Age
            </TableCell>
            {/* <TableCell className="tableHeader" style={tableHeader} align="left">
              Sku
            </TableCell> */}
            <TableCell className="tableHeader" style={tableHeader} align="left">
              Brand
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.title} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
