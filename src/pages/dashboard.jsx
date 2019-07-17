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
    marginTop: "-25px"
  },

  investButton: {
    height: "100%"
  },
  progressBar: {
    height: 42,
    backgroundColor: "#CCC",
    width: "100%",
    marginTop: "10px",
    marginLeft: "-59px"
  },

  progressAmount: {
    height: "100%",
    backgroundColor: "#f99e55",
    color: "#FFF",
    lineHeight: "42px"
  },
  investInfo: {
    width: "80%",
    marginLeft: "140px",

    marginBottom: theme.spacing(2)
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
    this.handleAmmountBlur = this.handleAmmountBlur.bind(this);
  }

  handleOpenModal() {
    this.setState({ modalOpen: true });
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
  }

  handleAmmountBlur(evt) {
    let value = parseFloat(evt.target.value).toFixed(2);
    var formatter = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2
    });

    if (value < 5000 || value > 50000) {
      alert("O Valor deve estar entre R$ 5.000 e R$ 50.000");
    }

    this.setState({
      investedAmount: formatter.format(value)
    });
  }
  handleAmmountChange(evt) {
    let value = evt.target.value;

    this.setState({
      investedAmount: value
    });
  }

  componentDidMount() {
    getDashboardInfo().then(data => {
      this.setState({
        ...this.state,
        data
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            background: `url(${headerBG}) no-repeat center center / contain`,
            height: 360
          }}
        />
        <Container maxWidth="lg">
          <Grid
            className={classes.cover}
            container
            justify="flex-start"
            alignItems="center">
            <Grid item md={2}>
              <div className={classes.avatar}>
                <img
                  className={classes.logoGreen}
                  src={guruLogoGreen}
                  alt="GUru"
                />
              </div>
            </Grid>
            <Grid item md={5}>
              <div className={classes.progressBar}>
                <p
                  className={classes.progressAmount}
                  style={{
                    width: this.state.data
                      ? `${parseFloat(this.state.data.fundingPercent)}%`
                      : "0%"
                  }}>
                  {this.state.data ? this.state.data.fundingPercent : "0%"}
                </p>
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
                onBlur={this.handleAmmountBlur}
                type="tel"
                helperText="Min R$ 5.000 / Max R$ 50.000"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item md={2}>
              <Button
                className={classes.investButton}
                color="primary"
                variant="contained"
                onClick={() => this.handleOpenModal()}>
                Investir
              </Button>
            </Grid>
          </Grid>
          <Grid
            className={classes.investInfo}
            container
            justify="space-around"
            alignItems="center">
            <Grid item>
              <Typography variant="h4">
                {this.state.data && this.state.data.fundingAmount}
              </Typography>
              <Typography>Investido</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                {this.state.data && this.state.data.investors}
              </Typography>
              <Typography>Investidores</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {this.state.data && this.state.data.target}
                <Typography>Objetivo</Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {this.state.data && this.state.data.equity}
                <Typography>Equity</Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {this.state.data && this.state.data.pre_money_valuation}
                <Typography>Pre-Money Valuation</Typography>
              </Typography>
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
