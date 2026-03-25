import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Result from "./Components/Result";
import SliderSelect from "./Components/SliderSelect";
import TenureSelect from "./Components/TenureSelect";
import InputAdornments from "./Components/InputAdornments";
import ErrorBoundary from "./Components/ErrorBoundary";
import { toSafeNumber } from "./utils/emi";

function App() {
  const [data, setData] = useState({
    
    homeValue: 100000,
    downPayment: 100000 * 0.2,
    loanAmount: 100000 * 0.8,
    loanTerm: 5,
    interestRate: 5,
  });

  const handleChange = (field) => (e) => {
    const value = toSafeNumber(e.target.value, 0);
    setData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "homeValue" && {
        downPayment: value * 0.2,
        loanAmount: value * 0.8,
      }),
    }));
  };

  return (
    <div className="App">
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          mt: { xs: 2, md: 4 },
          px: { xs: 1, sm: 2, md: 3 },
          pb: { xs: 3, md: 5 },
        }}
      >
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              className="app-card fade-in-up"
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ px: 1, pt: 1 }}>
                  Loan Inputs
                </Typography>
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
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              className="app-card fade-in-up"
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "rgba(255,255,255,0.08)",
                height: "100%",
              }}
            >
              <ErrorBoundary>
                <Result data={data} />
              </ErrorBoundary>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
