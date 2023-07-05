import "./App.css";
import { Grid } from "@mui/material";
import Form from './components/Form';

function App() {
  return (
    <Grid container spacing={2} alignItems="flex-start">
        <Form />
    </Grid>
  );
}

export default App;
