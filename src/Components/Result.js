import React from "react";
import { Stack, Typography, Divider, Chip } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { calculateEmiBreakdown } from "../utils/emi";

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = ({ data }) => {
  const { monthlyPayment, totalInterest, totalAmount, principal } = calculateEmiBreakdown({
    principal: data.loanAmount,
    annualRate: data.interestRate,
    years: data.loanTerm,
  });

  const pieChartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        label: "Ratio of Principle and Interest",
        data: [principal, totalInterest].map((v) =>
          Number.isFinite(v) && v >= 0 ? v : 0
        ),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Stack gap={3}>
      <Typography textAlign="center" variant="h5">
        Monthly Payment: ₹ {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={1} flexWrap="wrap">
        <Chip
          label={`Principal: ₹ ${principal.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}`}
          color="primary"
          variant="outlined"
        />
        <Chip
          label={`Interest: ₹ ${totalInterest.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}`}
          color="secondary"
          variant="outlined"
        />
      </Stack>
      <Typography textAlign="center" variant="body1" color="text.secondary">
        Total Amount: ₹ {totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
      </Typography>
      <Divider />
      <Stack direction="row" justifyContent="center">
        <div style={{ width: "100%", maxWidth: 420 }}>
          <Pie data={pieChartData} />
        </div>
      </Stack>
    </Stack>
  );
};

export default Result;
