import React from "react";
import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useInput } from "./../../helpers/hooks";
import { createCustomerBasic } from "./../../helpers/services";

import logo from "./../../assets/guru-logo.png";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const { value: name, bind: bindname, reset: resetname } = useInput("");
  const { value: surname, bind: bindsurname, reset: resetsurname } = useInput(
    ""
  );
  const { value: email, bind: bindemail, reset: resetemail } = useInput("");
  const {
    value: password,
    bind: bindpassword,
    reset: resetpassword
  } = useInput("");

  const classes = useStyles();
  const createCustomer = () => {
    const data = {
      name: name,
      surname: surname,
      email: email,
      password: btoa(password)
    };

    createCustomerBasic(data);
  };
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} alt="Guru Logo" />
        <Typography component="h3" variant="body2" align="center">
          Bem-vindo ao Guru. Aqui você vai poder acessar 
          documentos/informações e acompanhar a evolução do projeto.
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                {...bindname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surname"
                label="Sobrenome"
                name="surname"
                autoComplete="lname"
                {...bindsurname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                {...bindemail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha-Convite"
                type="password"
                id="password"
                autoComplete="current-password"
                {...bindpassword}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={createCustomer}
            className={classes.submit}>
            Tô Dentro!
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/signin">
                <Link href="#" variant="body2">
                  Já tem uma conta? Faça Login
                </Link>
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
              Essa página é só para amigos convidados, por favor não envie para 
              terceiros
            </Typography>
      </Box>
    </Container>
  );
}
