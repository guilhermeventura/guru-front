import React from "react";
import { useTheme } from "@material-ui/core/styles";

import {
  useMediaQuery,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

import { getDashboardInfo } from "./../helpers/services";

const InvestModal = props => {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <Dialog {...props} fullScreen={fullScreen}>
      <DialogTitle>Investir</DialogTitle>

      <DialogContent>
        <DialogContentText>Valor investido: R$ 50.000,00</DialogContentText>

        <TextField
          id="fullname"
          label="Nome Completo(igual ao CPF)"
          variant="outlined"
          autoFocus
          fullWidth
          margin="normal"
        />

        <TextField
          id="fullname"
          label="Tel(DDD)"
          variant="outlined"
          autoFocus
          fullWidth
          type="tel"
          margin="normal"
        />

        <TextField
          id="fullname"
          label="RG"
          variant="outlined"
          autoFocus
          fullWidth
          type="tel"
          margin="normal"
        />

        <TextField
          id="fullname"
          label="CPF"
          variant="outlined"
          autoFocus
          fullWidth
          type="tel"
          margin="normal"
        />
        <TextField
          id="fullname"
          label="País"
          variant="outlined"
          autoFocus
          fullWidth
          margin="normal"
        />
        <TextField
          id="fullname"
          label="CEP"
          variant="outlined"
          autoFocus
          fullWidth
          type="tel"
          margin="normal"
        />

        <TextField
          id="fullname"
          label="Estado"
          variant="outlined"
          autoFocus
          fullWidth
          margin="normal"
        />

        <TextField
          id="fullname"
          label="Cidade"
          variant="outlined"
          autoFocus
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleNext}>
          Próximo
        </Button>
      </DialogContent>
      {/* 
      <DialogActions>
        <Button variant="contained" color="primary" fullWidth>
          Próximo
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  handleOpenModal() {
    console.log("o");
    this.setState({ modalOpen: true });
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
  }

  componentDidMount() {
    getDashboardInfo();
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Grid container>
          <Grid item md={3}>
            <TextField
              id="outlined-uncontrolled"
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item md={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.handleOpenModal()}>
              Investir
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6}>
            <Typography variant="body1">
              GURU é a plataforma 100% mobile que vai democratizar o acesso à
              Bolsa de Valores oferecendo um app (iOS e Android) com design
              moderno, intuitivo, sem corretagem e sem depósito mínimo.
            </Typography>
            <br />
            <Typography variant="body1">
              Hoje há um "muro" que impede que mais pessoas invistam em renda
              variável, criado pelas corretoras ao oferecer tecnologia defasada,
              custos altos e práticas obscuras. Viemos para desaﬁar o status quo
              ddvestimentos e derrubar o muro!
            </Typography>
          </Grid>
          <Grid item md={1} />
          <Grid item md={5}>
            <ul>
              <li>
                <Typography variant="body1">
                  Investimento simples e de graça
                </Typography>
              </li>
              <li>
                <Typography variant="body1">Sem corretagem</Typography>
              </li>
              <li>
                <Typography variant="body1">Sem depósito mínimo</Typography>
              </li>
              <li>
                <Typography variant="body1">Sem Pegadinhas</Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
        <InvestModal
          open={this.state.modalOpen}
          onClose={() => this.handleCloseModal()}
        />
      </Container>
    );
  }
}

export default Dashboard;
