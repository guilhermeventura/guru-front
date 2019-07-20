import React from "react";

import Search from "@material-ui/icons/Search";

import {
  IconButton,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Box,
  Typography,
  withStyles,
  DialogTitle
} from "@material-ui/core";
import { Form, Field, withFormik } from "formik";
import { TextField } from "formik-material-ui";

import CloseIcon from "@material-ui/icons/Close";
import * as Yup from "yup";
import congratsIMG from "./../../assets/congrats.png";

import {
  getCEP,
  countries,
  createCustomerPersonal,
  customerConfirmInvest
} from "./../../helpers/services";

const classes = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  modalTitle: {
    textAlign: "center",
    margin: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      fontSize: 18,
      margin: theme.spacing(2)
    }
  },
  modalAmount: {
    color: theme.palette.primary.main
  },
  finalButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2)
  },
  backButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2)
  },
  congrats: {
    backgroundColor: "#00e385",
    textAlign: "center",
    padding: 0
  },

  paper: {
    margin: theme.spacing(2)
  }
});

const InvestModalSchema = Yup.object().shape({
  fullname: Yup.string().required("Obrigatório"),
  telephone: Yup.string().required("Obrigatório"),
  registrationNumber: Yup.number()
    .typeError("Somente Números")

    .required("Obrigatório"),
  documentNumber: Yup.number()
    .typeError("Somente Números")
    .required("Obrigatório"),
  country: Yup.string().required(),
  address: Yup.string().required("Obrigatório"),
  number: Yup.string().required("Obrigatório"),
  neighborhood: Yup.string().required("Obrigatório"),
  city: Yup.string().required("Obrigatório"),
  state: Yup.string().required("Obrigatório"),
  zipcode: Yup.number()
    .typeError("Somente Números")
    .required("Obrigatório")
});

class InvestModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      values: props.initialValues
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
  }

  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  handlePrev() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  renderNextButton() {
    const { activeStep } = this.state;
    const { values } = this.props;
    let disabled = false;
    switch (activeStep) {
      case 1:
        disabled = values.fullname && values.telephone ? false : true;
        return (
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={disabled}
            onClick={this.handleNext}>
            Próximo
          </Button>
        );
      case 2:
        disabled =
          values.documentNumber && values.registrationNumber ? false : true;
        return (
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={disabled}
            onClick={this.handleNext}>
            Próximo
          </Button>
        );

      case 3:
        disabled =
          values.country && values.zipcode && values.state && values.city
            ? false
            : true;
        return (
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={disabled}
            onClick={this.handleNext}>
            Próximo
          </Button>
        );
      case 4:
        disabled =
          values.address && values.number && values.neighborhood ? false : true;
        return (
          <Button
            variant="contained"
            color="primary"
            type="button"
            disabled={disabled}
            onClick={this.handleNext}>
            Próximo
          </Button>
        );
      default:
        return false;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status.success === true) {
        this.setState({ activeStep: 6 });
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    const {
      handleSubmit,
      handleChange,
      values,
      setFieldValue,
      isSubmitting
    } = this.props;

    return (
      <Dialog
        {...this.props}
        fullWidth={true}
        fullScreen={this.props.fullScreen}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="sm">
        {activeStep !== 6 && (
          <DialogTitle>
            {this.props.onClose ? (
              <IconButton
                aria-label="Close"
                className={classes.closeButton}
                onClick={this.props.onClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        )}
        <DialogContent className={activeStep === 6 ? classes.congrats : ""}>
          {/* <DialogContentText>Valor investido: R$ 50.000,00</DialogContentText> */}
          <Box className={classes.paper}>
            {activeStep < 5 && (
              <Typography variant="h5" className={classes.modalTitle}>
                Valor Investido:{" "}
                <span className={classes.modalAmount}>
                  R$ {this.props.investedamount}
                </span>
              </Typography>
            )}
            {activeStep === 1 && (
              <Typography variant="h5" className={classes.modalTitle}>
                Precisamos de alguns dados para agilizar o contrato que será
                enviado ao final da rodada:
              </Typography>
            )}
          </Box>

          <Form>
            {activeStep === 1 && (
              <Grid container>
                <Grid item xs={12}>
                  <Field
                    id="fullname"
                    name="fullname"
                    label="Nome Completo(igual ao CPF)"
                    variant="outlined"
                    autoFocus
                    fullWidth
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="telephone"
                    name="telephone"
                    label="Tel(DDD)"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid container>
                <Grid item xs={12}>
                  <Field
                    id="documentNumber"
                    name="documentNumber"
                    label="RG"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="registrationNumber"
                    name="registrationNumber"
                    label="CPF"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    margin="normal"
                    helperText="Somente números"
                    component={TextField}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 3 && (
              <Grid container>
                <Grid item xs={12}>
                  <Field
                    id="country"
                    name="country"
                    label="País"
                    select
                    SelectProps={{
                      native: true
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={handleChange("country")}
                    InputLabelProps={{ shrink: true }}
                    component={TextField}>
                    <option value="">Selecione</option>
                    {countries.map(option => (
                      <option value={option.code}>{option.name}</option>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="zipcode"
                    name="zipcode"
                    label="CEP"
                    variant="outlined"
                    fullWidth
                    type="tel"
                    margin="normal"
                    helperText="Somente números"
                    component={TextField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="Toggle password visibility"
                            onClick={() => {
                              getCEP(values.zipcode).then(data => {
                                setFieldValue("address", data.logradouro);
                                setFieldValue("neighborhood", data.bairro);
                                setFieldValue("city", data.localidade);
                                setFieldValue("state", data.uf);
                              });
                            }}>
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="state"
                    name="state"
                    select
                    label="Estado"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    component={TextField}
                    onChange={handleChange("state")}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                      native: true
                    }}>
                    <option value="">Selecione...</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field
                    id="city"
                    name="city"
                    label="Cidade"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 4 && (
              <Grid container>
                <Grid item xs={12} md={8}>
                  <Field
                    id="address"
                    name="address"
                    label="Endereço"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
                <Grid item md={1} />
                <Grid item xs={12} md={3}>
                  <Field
                    id="number"
                    name="number"
                    label="Número"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Field
                    id="neighborhood"
                    name="neighborhood"
                    label="Bairro"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
                <Grid item md={1} />
                <Grid item xs={12} md={3}>
                  <Field
                    id="place"
                    name="place"
                    label="Complemento"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    component={TextField}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 5 && (
              <Box>
                <Typography variant="h5" className={classes.modalTitle}>
                  {values.fullname}
                </Typography>
                <Typography variant="h5" className={classes.modalTitle}>
                  Valor Investido: <br />
                  <span className={classes.modalAmount}>
                    R$ {this.props.investedamount}
                  </span>
                </Typography>
              </Box>
            )}

            {activeStep === 6 && (
              <>
                <Box
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    color: "#FFF"
                  }}>
                  <Typography variant="h5">PARABÉNS!</Typography>
                  <img
                    src={congratsIMG}
                    alt="Parabéns"
                    style={{ maxWidth: 250 }}
                  />
                  <Typography variant="h5">
                    Você é o mais novo sócio do GURU.
                  </Typography>
                </Box>
                <Box
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    color: "black",
                    padding: 20,
                    marginTop: 10
                  }}>
                  <Typography variant="h5" className={classes.modalTitle}>
                    Assim que a rodada de investimento fechar, você receberá um
                    email com mais informações sobre o contrato e próximos
                    passos.
                  </Typography>

                  <Button
                    style={{ marginTop: 20 }}
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.reload()}>
                    OK! Entendi
                  </Button>
                </Box>
              </>
            )}

            <DialogActions style={{ padding: activeStep === 6 ? 0 : "8px" }}>
              {activeStep > 1 && activeStep < 5 && (
                <Button color="primary" onClick={this.handlePrev}>
                  Voltar
                </Button>
              )}
              {activeStep < 5 && this.renderNextButton()}
            </DialogActions>
            {activeStep === 5 && (
              <>
                <Button
                  className={classes.finalButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={handleSubmit}>
                  {isSubmitting ? "Processando..." : "Confirmar"}
                </Button>
                <Button
                  className={classes.backButton}
                  variant="contained"
                  fullWidth
                  onClick={this.handlePrev}>
                  Voltar
                </Button>
              </>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
}
export default withStyles(classes)(
  withFormik({
    validationSchema: InvestModalSchema,

    handleSubmit: (values, { props, state, setStatus }) => {
      let sv = values;
      sv.email = localStorage.getItem("guruEmail");
      sv.place = values.place || "";

      delete sv.classes;
      delete sv.investedamount;
      delete sv.open;
      delete sv.width;
      delete sv.fullScreen;

      createCustomerPersonal(sv).then(res => {
        let nmzv = props.investedamount.replace(",", "");
        nmzv = nmzv.replace(".", "");
        nmzv = parseFloat(nmzv / 100).toFixed(0);
        const cci = {
          email: sv.email,
          value: nmzv,
          status: "Confirmado"
        };
        customerConfirmInvest(cci).then(res => {
          setStatus({ success: true });
        });
      });
    }
  })(InvestModal)
);
