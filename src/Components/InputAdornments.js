import * as React from 'react'; 
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

export default function InputAdornments({ label, value, onChange, adornment }) {
  const [isFocused, setIsFocused] = React.useState(false);

  const formatForDisplay = (inputValue) => {
    const numericValue = Number(String(inputValue ?? "").replace(/,/g, ""));
    if (!Number.isFinite(numericValue)) {
      return "";
    }
    return numericValue.toLocaleString("en-IN");
  };

  const handleInputChange = (event) => {
    const rawValue = event.target.value;
    const cleaned = rawValue.replace(/,/g, "").replace(/[^\d.]/g, "");
    const [whole = "", ...decimalParts] = cleaned.split(".");
    const sanitized = decimalParts.length ? `${whole}.${decimalParts.join("")}` : whole;
    onChange({ target: { value: sanitized } });
  };

  const inputValue = isFocused ? String(value ?? "") : formatForDisplay(value);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 0.8 }}>
      <div>
        <FormControl
          fullWidth
          sx={{
            m: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              transition: "all 0.2s ease",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(25, 118, 210, 0.2)",
            },
          }}
        >
          <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
          <OutlinedInput
            id={`outlined-adornment-${label}`}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            inputProps={{ inputMode: "decimal" }}
            startAdornment={<InputAdornment position="start">{adornment}</InputAdornment>}
            label={label}
          />
          <Typography variant="caption" sx={{ ml: 1, mt: 0.6, color: "text.secondary" }}>
            Enter value directly or use sliders
          </Typography>
        </FormControl>
      </div>
    </Box>
  );
}
