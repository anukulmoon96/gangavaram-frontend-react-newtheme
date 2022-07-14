import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Copyright(props) {

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
let BASE_URL = process.env.REACT_APP_BACKEND_URL;

export default function LoginPage() {

  document.body.style.overflow = "hidden";


 	const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const navigate = useNavigate();
	const handleLogin = (e) => {
    e.preventDefault();
		console.log("Login is clicked");

		let url = `https://gangavaram.app-assertai.com:5000/api/users/login`;
		console.log(url);
		const responseData = axios.post(
			url,
	   	{
				email: email, //gave the values directly for testing
				password: password,
			},
		);
		responseData
			.then((res) => {
				console.log(res);
				if (res.status == 200) {
					window.localStorage.setItem("token", res.data.token);
					window.location.href="/alerts";
				} else {
					setError(true);
				}
				// if (res.data === "authenticated") {
				// 	console.log(res);
				// 	// setAlertContent(res.data);
				// 	// setAlert(true);
				// 	window.localStorage.setItem("token", "LoginToken");
				// 	navigate("/Dashboard");
				// } else if (res.data === "Incorrect Username and/or Password!") {
				// 	setAlertContent(res.data);
				// 	setAlert(true);
				// }
			})
			.catch(function (err) {
				if (err) {
					setError(true);
				}
			});
	};
	const handleChangeEmail = (e) => {
		e.preventDefault();
		// console.log(e.target.value);
		setEmail(e.target.value);
	};
	const handleChangePassword = (e) => {
		e.preventDefault();
		// console.log(e.target.value);
		setPassword(e.target.value);
	};

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://images.unsplash.com/photo-1653549679643-f86222147634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1NTM3NzA4Nw&ixlib=rb-1.2.1&q=80&w=1080)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && (
						<p style={{ marginLeft: "2%", color: "red" }}>
							Invalid Credentials!{" "}
						</p>
					)}
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChangeEmail}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChangePassword}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
