import React from "react";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import Search from "@material-ui/icons/Search";

import {
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Typography
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import * as Yup from "yup";

import { getCEP, countries } from "./../../helpers/services";

const InvestModalSchema = Yup.object({
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
      currentStep: 1
    };
    // const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    this.handleCEP = this.handleCEP.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isCurrentStep = this.isCurrentStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCEP(cep) {
    if (!cep) return;

    console.log("opa");
  }

  isCurrentStep(step) {
    if (this.state.currentStep === step) return true;
    return false;
  }

  prevStep() {
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  nextStep() {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  render() {
    return (
      <Dialog
        {...this.props}
        fullWidth={true}
        fullScreen={this.props.fullScreen}
        maxWidth="sm">
        <DialogTitle>
          <Typography variant="h4">
            Valor Investido: <br /> R$ {this.props.investedamount}
          </Typography>
        </DialogTitle>

        <DialogContent>
          {/* <DialogContentText>Valor investido: R$ 50.000,00</DialogContentText> */}

          <Formik
            validationSchema={InvestModalSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
              console.log("AIAI");
            }}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              setFieldValue,
              isSubmitting
            }) => (
              <Form>
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
                <DialogActions>
                  <Button color="primary" onClick={this.prevStep}>
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}>
                    Próximo
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withMobileDialog()(InvestModal);
