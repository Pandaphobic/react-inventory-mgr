import React, { useContext } from "react";
import PropTypes from "prop-types";

// Misc Elements
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";

// Style
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Style
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Icons
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import uuid from "react-uuid";

// Files
import INVENTORY from "../json/inventory.json";
import { Context } from "../contexts/Store";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  TableCell: {
    fontWeight: "600",
    padding: "8px",
  },
});

function removeNonNumbers(priceWithLetters) {
  const number = parseFloat(priceWithLetters.slice(2)).toFixed(2);
  return number;
}

function createData(
  title,
  costBefore,
  priceBefore,
  ageBefore,
  sku,
  brand,
  color,
  category,
  qtyAvailable,
  listingDate,
  idBefore
) {
  // const priceLettersRemoved = removeNonNumbers(priceBefore);

  // "Sanitize" and ID each item
  const id = idBefore > 0 ? idBefore : uuid();
  const cost = costBefore.length > 0 ? parseInt(costBefore) : 0;
  const price = priceBefore ? removeNonNumbers(priceBefore) : 0;
  const age = ageBefore ? parseInt(ageBefore) : 0;

  return {
    title,
    cost,
    price,
    age,
    sku,
    brand,
    details: [{ age, cost, color, category, qty: qtyAvailable, listingDate }],
    id,
  };
}

const rowsFromJson = [];
function importJSON(inv) {
  console.log(inv);
  inv.forEach(item => {
    rowsFromJson.push(
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
        item["Listing Date"],
        item["ID"]
      )
    );
  });
}

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
        <TableCell style={{ padding: "2px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className={classes.TableCell} style={{ padding: "2px" }}>
          {row.title}
        </TableCell>
        {/* <TableCell style={{ padding: "2px" }} align="left">{row.cost}</TableCell> */}
        <TableCell className={classes.TableCell} align="left">
          {`C$${row.price}`}
        </TableCell>
        <TableCell className={classes.TableCell} align="left">
          {row.age}
        </TableCell>
        {/* <TableCell style={{ padding: "2px" }} align="left">{row.sku}</TableCell> */}
        <TableCell className={classes.TableCell} align="left">
          {row.brand}
        </TableCell>
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
                  <TableRow key={uuid()}>
                    <TableCell align="left">Qty</TableCell>
                    <TableCell align="left">Sku</TableCell>
                    <TableCell align="left">Color</TableCell>
                    <TableCell align="left">Category</TableCell>
                    <TableCell align="left">Cost</TableCell>
                    <TableCell align="left">Age</TableCell>
                    <TableCell align="right">Listing Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map(detailsRow => (
                    <TableRow key={uuid()}>
                      <TableCell align="left">{detailsRow.qty}</TableCell>
                      <TableCell align="left">{detailsRow.sku}</TableCell>
                      <TableCell align="left">{detailsRow.color}</TableCell>
                      <TableCell align="left">{detailsRow.category}</TableCell>
                      <TableCell align="left">{detailsRow.cost}</TableCell>
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
    id: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    price: PropTypes.any.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        qty: PropTypes.number.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
  }).isRequired,
};

const tableHeader = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "white",
  paddingLeft: "0px",
};

export default function CollapsibleTable(props) {
  const [state, useState] = useContext(Context);

  if (state.inventory !== []) {
    importJSON(state.inventory);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#202020" }}>
            <TableCell />
            <TableCell align="left" style={tableHeader}>
              Listing Title
            </TableCell>
            {/* <TableCell style={tableHeader} align="left">
              Cost
            </TableCell> */}
            <TableCell style={tableHeader} align="left">
              Price
            </TableCell>
            <TableCell style={tableHeader} align="left">
              Age
            </TableCell>
            {/* <TableCell style={tableHeader} align="left">
              Sku
            </TableCell> */}
            <TableCell style={tableHeader} align="left">
              Brand
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsFromJson.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
