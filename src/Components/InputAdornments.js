import * as React from 'react'; 
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export default function InputAdornments({ label, value, onChange, adornment }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`outlined-adornment-${label}`}>{label}</InputLabel>
          <OutlinedInput
            id={`outlined-adornment-${label}`}
            value={Number(value).toLocaleString()}
            onChange={onChange}
            startAdornment={<InputAdornment position="start">{adornment}</InputAdornment>}
            label={label}
          />
        </FormControl>
      </div>
    </Box>
  );
}
