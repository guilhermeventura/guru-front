import React from "react";
import { makeStyles, withTheme, createStyles } from "@material-ui/core/styles";
import withMobileDialog, {
  InjectedProps
} from "@material-ui/core/withMobileDialog";

import {
  useMediaQuery,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Fade
} from "@material-ui/core";

import { getCEP, countries } from "./../../helpers/services";

class InvestModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      telephone: "",
      registrationNumber: "",
      documentNumber: "",
      country: "",
      address: "",
      zipcode: "",
      number: "",
      neighborhood: "",
      city: "",
      place: "",
      state: "",

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

  handleCEP(evt) {
    let cep = evt.target.value;

    getCEP(cep).then(data => {
      this.setState({
        address: data.logradouro,
        zipcode: data.cep,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      });
    });
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
        disableBackdropClick
        disableEscapeKeyDown
        {...this.props}
        fullWidth={true}
        fullScreen={this.props.fullScreen}
        maxWidth="sm">
        <DialogTitle>
          Valor Investido: R$ {this.props.investedamount}
        </DialogTitle>

        <DialogContent>
          {/* <DialogContentText>Valor investido: R$ 50.000,00</DialogContentText> */}

          <Fade in={this.isCurrentStep(1)}>
            <Grid
              container
              style={{
                display: !this.isCurrentStep(1) ? "none" : "block"
              }}
              step={1}>
              <Grid item xs={12}>
                <TextField
                  id="fullname"
                  name="fullname"
                  label="Nome Completo(igual ao CPF)"
                  variant="outlined"
                  autoFocus
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="tel"
                  name="tel"
                  label="Tel(DDD)"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Fade>

          <Fade in={this.isCurrentStep(2)}>
            <Grid
              container
              style={{
                display: !this.isCurrentStep(2) ? "none" : "block"
              }}
              step={2}>
              <Grid item xs={12}>
                <TextField
                  id="rg"
                  name="rg"
                  label="RG"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="cpf"
                  name="cpf"
                  label="CPF"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  margin="normal"
                  helperText="Somente números"
                />
              </Grid>
            </Grid>
          </Fade>
          <Fade in={this.isCurrentStep(3)}>
            <Grid
              container
              style={{
                display: !this.isCurrentStep(3) ? "none" : "block"
              }}
              step={3}>
              <Grid item xs={12}>
                <TextField
                  id="country"
                  name="country"
                  onChange={this.handleInputChange}
                  value={this.state.country}
                  label="País"
                  select
                  variant="outlined"
                  fullWidth
                  margin="normal">
                  <option value="">Selecione</option>
                  {countries.map(option => (
                    <option value={option.code}>{option.name}</option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="zipcode"
                  name="zipcode"
                  onBlur={this.handleCEP}
                  label="CEP"
                  onChange={this.handleInputChange}
                  value={this.state.zipcode}
                  variant="outlined"
                  fullWidth
                  type="tel"
                  margin="normal"
                  helperText="Somente números"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="state"
                  select
                  label="Estado"
                  onChange={this.handleInputChange}
                  value={this.state.state}
                  variant="outlined"
                  fullWidth
                  margin="normal"
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
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="city"
                  name="city"
                  label="Cidade"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={this.handleInputChange}
                  value={this.state.city}
                />
              </Grid>
            </Grid>
          </Fade>
          <Fade in={this.isCurrentStep(4)}>
            <Grid
              container
              style={{
                display: !this.isCurrentStep(4) ? "none" : "block"
              }}
              step={4}>
              <Grid item xs={12} md={12}>
                <TextField
                  id="address"
                  name="address"
                  label="Endereço"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={this.handleInputChange}
                  value={this.state.address}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  id="number"
                  name="number"
                  label="Número"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={this.handleInputChange}
                  value={this.state.number}
                />
              </Grid>
              <Grid item md={1} />
              <Grid item xs={12} md={6}>
                <TextField
                  id="neighborhood"
                  name="neighborhood"
                  label="Bairro"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={this.handleInputChange}
                  value={this.state.neighborhood}
                />
              </Grid>
            </Grid>
          </Fade>
          <DialogActions>
            <Button color="primary" onClick={this.prevStep}>
              Voltar
            </Button>
            <Button variant="contained" color="primary" onClick={this.nextStep}>
              Próximo
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withMobileDialog()(InvestModal);
