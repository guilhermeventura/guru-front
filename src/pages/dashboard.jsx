import React from "react";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  withStyles
} from "@material-ui/core";

import { getDashboardInfo } from "./../helpers/services";
import InvestModal from "./../components/investment-modal/investment-modal";
import headerBG from "./../assets/dashboard-header-bg.png";
import guruLogoGreen from "./../assets/guru-logo-verde.png";

const classes = theme => ({
  avatar: {
    width: 288 / 2,
    height: 267 / 2,
    border: "2px solid #000",
    textAlign: "center",
    lineHeight: 12,
    backgroundColor: "#FFF"
  },

  logoGreen: {
    maxWidth: "80%"
  },

  cover: {
    marginTop: "-3%"
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      investedAmount: ""
    };

    this.handleAmmountChange = this.handleAmmountChange.bind(this);
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
  }

  handleAmmountChange(evt) {
    console.log(evt);
    this.setState({
      investedAmount: evt.target.value
    });
  }

  componentDidMount() {
    getDashboardInfo();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            background: `url(${headerBG}) no-repeat center center`,
            height: 500
          }}
        />
        <Container maxWidth="lg">
          <Grid
            className={classes.cover}
            container
            justify="flex-start"
            alignItems="center">
            <Grid item md={7}>
              <div className={classes.avatar}>
                <img
                  className={classes.logoGreen}
                  src={guruLogoGreen}
                  alt="GUru"
                />
              </div>
            </Grid>
            <Grid item md={3}>
              <TextField
                id="investedAmount"
                name="investedAmount"
                margin="normal"
                variant="outlined"
                value={this.state.investedAmount}
                onChange={this.handleAmmountChange}
                type="tel"
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
                variável, criado pelas corretoras ao oferecer tecnologia
                defasada, custos altos e práticas obscuras. Viemos para desaﬁar
                o status quo ddvestimentos e derrubar o muro!
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
            investedamount={this.state.investedAmount}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(classes)(Dashboard);
