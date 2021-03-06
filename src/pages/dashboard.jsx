import React from "react";

import ReactZenDeskChat from "@inlightmedia/react-zendesk-chat";

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  withStyles,
  Box,
  Dialog,
  DialogTitle,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  DialogContent,
  Hidden
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getDashboardInfo } from "./../helpers/services";
import InvestModal from "./../components/investment-modal/investment-modal";
import headerBG from "./../assets/dashboard-header-bg.png";
import headerBGMobile from "./../assets/dashboard-header-mobile.png";
import guruLogoGreen from "./../assets/guru-logo-verde.png";

const classes = theme => ({
  avatar: {
    width: 288 / 2,
    height: 267 / 2,
    border: "2px solid #000",
    textAlign: "center",
    lineHeight: 12,
    position: "relative",
    zIndex: "20",
    backgroundColor: "#FFF"
  },

  logoGreen: {
    maxWidth: "80%"
  },

  cover: {
    marginTop: "-25px",
    [theme.breakpoints.down("sm")]: {
      marginTop: 10
    }
  },

  investButton: {
    width: "100%",
    paddingTop: "16px",
    paddingBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 30
    }
  },
  progressBar: {
    height: 42,
    backgroundColor: "#CCC",
    width: "100%",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    [theme.breakpoints.up("md")]: {
      marginTop: "-24px",
      marginLeft: "-59px"
    },

    [theme.breakpoints.down("sm")]: {
      borderRadius: 20
    }
  },
  order3sm: {
    [theme.breakpoints.down("sm")]: {
      order: 3
    }
  },
  progressAmount: {
    height: "100%",
    backgroundColor: "#f99e55",
    color: "#FFF",
    lineHeight: "42px",
    transition: "width 1s ease-out",
    textAlign: "right",
    paddingRight: 20,
    maxWidth: "100%",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",

    [theme.breakpoints.down("sm")]: {
      borderRadius: 20
    }
  },
  progressAmountFull: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    lineHeight: "42px",
    transition: "width 1s ease-out",
    textAlign: "right",
    paddingRight: 20,
    maxWidth: "100%",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",

    [theme.breakpoints.down("sm")]: {
      borderRadius: 20
    }
  },
  investInfo: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    textAlign: "center"
  },
  landingBody: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(16)
  },
  faqHeader: {
    fontSize: 12,
    fontWeight: "bold"
  },
  faqContent: {
    fontSize: 11,
    fontWeight: "normal"
  },
  bullets: {
    ...theme.typography.body1,

    padding: 0
  },

  mrminus8: {
    marginLeft: "-8px",
    justifyContent: "left"
  },

  spaceInMobile: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  },
  mbhead: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem"
    }
  },
  faqbtn: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  bpcover: {
    background: `url(${headerBG}) no-repeat top center / cover`,
    height: 360,
    position: "relative",
    zIndex: "2",

    [theme.breakpoints.down("sm")]: {
      background: `url(${headerBGMobile}) no-repeat center top  / cover`
    }
  },
  daysleft: {
    color: "#FFF",
    position: "absolute",
    right: "174px",
    top: "290px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: 125,
      top: "85%",
      position: "absolute",
      left: "50%",

      transform: "translate(-50%, -50%)"
    }
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      investedAmount: "",
      enableInvest: false,
      zopimElement: !!document.getElementsByClassName("zopim")[0]
    };

    this.handleAmmountChange = this.handleAmmountChange.bind(this);
    this.handleAmmountBlur = this.handleAmmountBlur.bind(this);
    this.openFAQ = this.openFAQ.bind(this);
  }

  handleOpenModal() {
    if (this.state.investedAmount == "") {
      alert("Informe o Valor a ser investido");
      return false;
    }
    this.setState({ modalOpen: true });
    this.props.history.push("/dashboard/investir");
  }

  handleCloseModal() {
    this.setState({ modalOpen: false });
    this.setState({ showFAQ: false });
  }

  handleAmmountBlur(evt) {
    if (!evt.target.value) return;

    console.log("before", evt.target.value);
    let value = evt.target.value.replace(".", "");
    value = value.replace(",", "");
    value = parseFloat(value).toFixed(2);
    var formatter = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2
    });
    console.log("after", value, isNaN(value));
    if (value < 5000 || value > 50000) {
      alert("O Valor do Investimento deve estar entre R$ 5.000 e R$ 50.000");
      this.setState({
        investedAmount: "",
        enableInvest: false
      });
    } else {
      if (isNaN(value)) {
        alert("Somente Números");
        this.setState({
          investedAmount: "",
          enableInvest: false
        });
      } else {
        this.setState({
          investedAmount: formatter.format(value),
          enableInvest: true
        });
      }
    }
  }
  handleAmmountChange(evt) {
    let value = evt.target.value;

    this.setState({
      investedAmount: value
    });
  }

  openFAQ() {
    this.setState({ showFAQ: true });
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
        <Box className={classes.bpcover}>
          {this.state.data && (
            <div className={classes.daysleft}>
              <Typography variant="h5">{this.state.data.daysLeft}</Typography>
              <Typography variant="body1">dias restantes</Typography>
            </div>
          )}
        </Box>
        <Container maxWidth="lg">
          <Hidden smDown>
            {!this.state.zopimElement && (
              <ReactZenDeskChat appID="3OwNspqe8v1oU5lMSBXbbEDxGx1QLxTA" />
            )}
          </Hidden>
          <Grid
            className={classes.cover}
            container
            justify="flex-start"
            alignItems="center"
            spacing={1}>
            <Grid item md={2} sm={12} xs={12}>
              <Hidden smDown>
                <Box className={classes.avatar}>
                  <img
                    className={classes.logoGreen}
                    src={guruLogoGreen}
                    alt="GUru"
                  />
                </Box>
              </Hidden>
            </Grid>
            <Grid item md={5} sm={12} xs={12} className={classes.order3sm}>
              <Box className={classes.progressBar}>
                <p
                  className={
                    this.state.data &&
                    parseFloat(this.state.data.fundingPercent) >= 100
                      ? classes.progressAmountFull
                      : classes.progressAmount
                  }
                  style={{
                    width: this.state.data
                      ? `${parseFloat(this.state.data.fundingPercent)}%`
                      : "0%"
                  }}>
                  {this.state.data ? this.state.data.fundingPercent : "0%"}
                </p>
              </Box>
            </Grid>
            <Grid
              item
              container
              md={5}
              xs={12}
              alignItems="flex-start"
              style={{ marginTop: 20 }}>
              <Grid item md={6} xs={7}>
                <TextField
                  id="investedAmount"
                  name="investedAmount"
                  margin="none"
                  variant="outlined"
                  value={this.state.investedAmount}
                  onChange={this.handleAmmountChange}
                  onBlur={this.handleAmmountBlur}
                  type="tel"
                  helperText="Mín R$ 5.000 / Máx R$ 50.000"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item md={1} />
              <Grid item md={4} xs={4}>
                <Button
                  className={classes.investButton}
                  color="primary"
                  variant="contained"
                  style={{ color: "#FFF" }}
                  // disabled={!this.state.enableInvest}
                  onClick={() => this.handleOpenModal()}>
                  Investir
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className={classes.investInfo}
            container
            justify="center"
            alignItems="center">
            <Grid item md={3} xs={6} className={classes.spaceInMobile}>
              <Typography
                color="primary"
                variant="h4"
                className={classes.mbhead}>
                {this.state.data && this.state.data.fundingAmount}
              </Typography>
              <Typography variant="body2">Investido</Typography>
            </Grid>
            <Grid md={3} item xs={6} className={classes.spaceInMobile}>
              <Typography variant="h4" className={classes.mbhead}>
                <FavoriteIcon color="primary" />
                &nbsp;
                {this.state.data && this.state.data.investors}
              </Typography>
              <Typography variant="body2">Investidores</Typography>
            </Grid>
            <Grid md={2} item xs={6} className={classes.spaceInMobile}>
              <Typography variant="h6">
                {this.state.data && this.state.data.target}
                <Typography variant="body2">Objetivo</Typography>
              </Typography>
            </Grid>
            <Grid md={2} item xs={6} className={classes.spaceInMobile}>
              <Typography variant="h6">
                {this.state.data && this.state.data.equity}
                <Typography variant="body2">Equity</Typography>
              </Typography>
            </Grid>
            <Grid md={2} item xs={6} className={classes.spaceInMobile}>
              <Typography variant="h6">
                {this.state.data && this.state.data.pre_money_valuation}
                <Typography variant="body2">Pre-Money Valuation</Typography>
              </Typography>
            </Grid>
          </Grid>

          <Grid container className={classes.landingBody}>
            {this.state.data && (
              <>
                <Grid item md={6}>
                  <Typography variant="body1">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.state.data.landing_text
                      }}
                    />
                  </Typography>

                  <br />
                </Grid>

                <Grid item md={1} />
                <Grid item md={5} xs={12}>
                  <div
                    className={classes.bullets}
                    dangerouslySetInnerHTML={{
                      __html: this.state.data.landing_bullets
                    }}
                  />
                  <Button
                    className={classes.faqbtn}
                    variant="outlined"
                    href={this.state.data.pitchdeck_link}
                    target="_blank"
                    color="primary">
                    BAIXAR PITCH DECK
                  </Button>
                  <br />
                  <br />
                  <Button
                    className={classes.faqbtn}
                    variant="outlined"
                    color="primary"
                    onClick={this.openFAQ}>
                    F.A.Q
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
          <InvestModal
            open={this.state.modalOpen}
            onClose={() => this.handleCloseModal()}
            investedamount={this.state.investedAmount}
          />

          <Dialog
            open={this.state.showFAQ}
            onClose={() => this.handleCloseModal()}>
            <DialogTitle>Perguntas Frequentes</DialogTitle>

            <DialogContent>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Qual o risco do investimento?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    O investimento em startups é considerado de alto risco, pois
                    as empresas operam em ambiente de extrema incerteza. Nunca
                    invista um dinheiro que você pode precisar no curto prazo.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Qual a liquidez do meu investimento?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    Dificilmente você poderá vender a sua participação no curto
                    prazo. Em geral, a opção de saída do investidor anjo aparece
                    com a entrada de grandes fundos, com a venda da empresa ou
                    abertura de capital na Bolsa.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    O que acontece se os valores investidos superarem a meta da rodada de R$500.000?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    Poderá haver um rateio entre os investidores ou aumentarmos
                    o tamanho do rodada para acomodar a todos.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Qual é o tamanho da rodada de investimento?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    O valor total da captação é de R$ 2.500.000. O restante do
                    investimento virá de fundos de venture capital, parceiros
                    estratégicos e investidores profissionais.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Qual percentual da empresa eu vou ter?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    Dinheiro investido ÷ (Valuation Pre-Money + Captação da Rodada).
                    Ex: se você investir R$ 50.000 terá 0,4% da empresa
                    (50.000 ÷ 10.000.000+2.500.000).
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Qual a data de lançamento?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    Estimamos o lançamento de uma versão beta para 03/2020 e o
                    lançamento oficial para 06/2020.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Como faço para transferir o dinheiro do investimento?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    O investidor terá que fazer uma TED do valor comprometido
                    para a conta da Guru em até 5 dias úteis após a assinatura
                    do contrato
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Qual será o instrumento do investimento?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    O investimento será realizado por meio de um Instrumento de
                    Mútuo Conversível. Essa é a prática mais comum para
                    investimentos em startups, uma vez que esse tipo de contrato
                    protege o investidor de riscos associados ao estágio inicial
                    da empresa.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Como vou ser informado sobre a evolução da empresa?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    Vamos fazer um report mensal com os principais acontecimentos
                    e KPI’s por email para todos os investidores.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.faqHeader}>
                    Para quem quiser aprender mais sobre investimentos em startups
                    sugerimos a leitura do material no link abaixo (em inglês).
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography className={classes.faqContent}>
                    https://fundersclub.com/learn/guides/vc-101/
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </DialogContent>
          </Dialog>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(classes)(Dashboard);
