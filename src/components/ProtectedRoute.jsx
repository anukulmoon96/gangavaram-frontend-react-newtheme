import React from "react";
import {
	Routes,
	Route,
	BrowserRouter,
	Link,
	Navigate,
	Outlet,
} from "react-router-dom";

export default function ProtectedRoute({ children }) {
	const auth = window.localStorage.getItem("token");
	return auth ? children : window.location.href='/';
}
