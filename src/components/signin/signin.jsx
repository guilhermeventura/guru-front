import React from "react";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import {
  customerLogin,
  createCustomerBasic,
  getToken
} from "./../../helpers/services";
import { useInput } from "./../../helpers/hooks";
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

function SignIn(props) {
  const classes = useStyles();

  const { value: email, bind: bindemail, reset: resetemail } = useInput("");
  const {
    value: password,
    bind: bindpassword,
    reset: resetpassword
  } = useInput("");

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const doLogin = () => {
    if (email == "") {
      setEmailError(true);
      return false;
    }
    if (password == "") {
      setPasswordError(true);
      return false;
    }
    setEmailError(false);
    setPasswordError(false);
    setSpinner(true);

    const data = {
      email: email,
      token: btoa(password)
    };

    const cData = {
      email: email,
      password: btoa(password)
    };

    customerLogin(data)
      .then(res => {
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
        }
      })
      .catch(error => {
        setOpenSnackbar(true);
        setSpinner(false);
      });
  };

  const goToDashboard = () => {
    setTimeout(() => {
      props.history.push("/dashboard");
    }, 3000);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Bem vindx ao crowdfunding dos amig(x)s do Guru. Aqui você vai poder
          dizer o quanto quer investir, acessar documentos/informações e
          acompanhar a evolução da rodada de investimentos. Não se preocupe, não
          vamos coletar nenhum dado financeiro e nem realizar qualquer tipo de
          transação.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={emailError}
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            {...bindemail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={passwordError}
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            {...bindpassword}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={doLogin}>
            {spinner == true ? (
              <CircularProgress className={classes.spinner} />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignIn);
