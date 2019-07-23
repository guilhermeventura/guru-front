import React from "react";

import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Snackbar from "@material-ui/core/Snackbar";
import { Form, Field, Formik } from "formik";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, Link } from "@material-ui/core";
import * as Yup from "yup";
import {
  customerLogin,
  createCustomerBasic,
  getToken
} from "./../../helpers/services";
import logo from "./../../assets/guru-logo.png";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  close: {
    padding: theme.spacing(0.5)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600"
  },
  snackError: {
    backgroundColor: theme.palette.error.dark
  },

  spinner: {
    color: "#fff"
  },
  logo: {
    height: 80,
    marginBottom: theme.spacing(2)
  }
}));

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("Obrigatório"),
  password: Yup.string().required("Obrigatório")
});

function SignIn(props) {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);

  const doLogin = values => {
    setSpinner(true);

    const data = {
      email: values.email,
      token: btoa(values.password)
    };

    const cData = {
      email: values.email,
      password: btoa(values.password)
    };

    customerLogin(data).then(res => {
      if (res === true) {
        goToDashboard();
      } else {
        let apiToken = "";
        getToken().then(res => {
          apiToken = res;

          if (apiToken === cData.password) {
            createCustomerBasic(cData).then(res => {
              if (res === true) {
                goToDashboard();
              }
            });
          }
        });

        setSpinner(false);
        setOpenSnackbar(true);
      }
    });
  };

  const goToDashboard = () => {
    setTimeout(() => {
      props.history.push("/dashboard");
    }, 3000);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        className={classes.snackError}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">ERRO! Email e/ou senha Inválidos</span>}
      />

      <div className={classes.paper}>
        <img src={logo} alt="Guru Logo" className={classes.logo} />
        <Typography component="h3" variant="body2" align="center">
          Bem-vindo ao crowdfunding dos amigos do Guru. Aqui você vai poder
          dizer o quanto quer investir, acessar documentos/informações e 
          acompanhar a evolução da rodada de investimentos. Não se
          preocupe, não vamos coletar nenhum dado financeiro.
        </Typography>
        <Container maxWidth={"xs"}>
          <Formik
            validationSchema={SignInSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              doLogin(values);

              setSubmitting(false);
            }}>
            {({ handleSubmit }) => (
              <Form>
                <Field
                  variant="outlined"
                  margin="normal"
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  fullWidth
                  component={TextField}
                />
                <Field
                  variant="outlined"
                  margin="normal"
                  id="email"
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  fullWidth
                  component={TextField}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}>
                  {spinner == true ? (
                    <CircularProgress className={classes.spinner} />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              Essa página é só para amigos convidados, por favor não envie para 
              terceiros. Qualquer dúvida é só chamar no email&nbsp;
              <Link color="primary" href="https://material-ui.com/">
                felipe@guru.com.vc
              </Link>
            </Typography>
          </Box>
        </Container>
      </div>
    </Container>
  );
}

export default withRouter(SignIn);
