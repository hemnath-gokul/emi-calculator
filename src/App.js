import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Result from "./Components/Result";
import SliderSelect from "./Components/SliderSelect";
import TenureSelect from "./Components/TenureSelect";
import InputAdornments from "./Components/InputAdornments";

function App() {
  const [data, setData] = useState({
    
    homeValue: 100000,
    downPayment: 100000 * 0.2,
    loanAmount: 100000 * 0.8,
    loanTerm: 5,
    interestRate: 5,
  });

  const handleChange = (field) => (e) => {
    const value = Number(e.target.value);
    setData({
      ...data,
      [field]: value,
      ...(field === "homeValue" && {
        downPayment: value * 0.2,
        loanAmount: value * 0.8,
      }),
    });
  };

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="xl" sx={{ marginTop: 4, marginLeft: 3, marginRight: 3 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <InputAdornments
              label="Home Value"
              value={data.homeValue}
              onChange={handleChange("homeValue")}
              adornment="₹"
            />
            <InputAdornments
              label="Down Payment"
              value={data.downPayment}
              onChange={handleChange("downPayment")}
              adornment="₹"
            />
            <InputAdornments
              label="Loan Amount"
              value={data.loanAmount}
              onChange={handleChange("loanAmount")}
              adornment="₹"
            />
            <InputAdornments
              label="Interest Rate"
              value={data.interestRate}
              onChange={handleChange("interestRate")}
              adornment="%"
            />
            <SliderSelect data={data} setData={setData} />
            <TenureSelect data={data} setData={setData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Result data={data} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
