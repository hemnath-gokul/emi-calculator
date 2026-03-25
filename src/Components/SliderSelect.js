import React from "react";
// import { Container, Typography } from "@mui/material";
import SliderComponent from "./Common/SliderComponent";
import { toSafeNumber } from "../utils/emi";

const SliderSelect = ({ data, setData }) => {
  const bank_limit = 10000000;
  return (
    <div>
      <SliderComponent
        onChange={(e, value) => {
          const safeValue = toSafeNumber(value);
          setData({
            ...data,
            homeValue: Math.round(safeValue),
            downPayment: Math.round(0.2 * safeValue),
            loanAmount: Math.round(0.8 * safeValue),
          });
        }}
        min={100000}
        max={bank_limit}
        steps={100000}
        unit="₹"
        amount={data.homeValue}
        label="Home Value"
        value={data.homeValue}
      />

      <SliderComponent
        onChange={(e, value) => {
          const safeValue = toSafeNumber(value);
          setData({
            ...data,
            downPayment: Math.round(safeValue),
            loanAmount: Math.round(data.homeValue - safeValue),
          });
        }}
        min={0}
        max={data.homeValue}
        steps={10000}
        unit="₹"
        amount={data.downPayment}
        label="Down Payment"
        value={data.downPayment}
      />

      <SliderComponent
        onChange={(e, value) => {
          const safeValue = toSafeNumber(value);
          setData({
            ...data,
            loanAmount: Math.round(safeValue),
            downPayment: Math.round(data.homeValue - safeValue),
          });
        }}
        min={0}
        max={data.homeValue}
        steps={10000}
        unit="₹"
        amount={data.loanAmount}
        label="Loan Amount"
        value={data.loanAmount}
      />

      <SliderComponent
        onChange={(e, value) =>
          setData({
            ...data,
            interestRate: toSafeNumber(value),
          })
        }
        min={2}
        max={20}
        steps={0.5}
        unit="%"
        amount={data.interestRate}
        label="Interest Rate"
        value={data.interestRate}
      />
    </div>
  );
};

export default SliderSelect;
