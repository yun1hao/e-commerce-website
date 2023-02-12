import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./Product.css";
function Sort({ setlowtohigh, sethightolow }) {
  const [category, setCategory] = React.useState("");
  const handleChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value == 20) {
      console.log("low - high");
      setlowtohigh(true);
      sethightolow(false);
    } else if (e.target.value == 30) {
      console.log("hitgh - low");
      setlowtohigh(false);
      sethightolow(true);
    }
  };

  return (
    <>
      <Box sx={{ minWidth: 190 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Last added</MenuItem>
            <MenuItem value={20}>Price: low to high</MenuItem>
            <MenuItem value={30}>Price: high to low</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default Sort;
