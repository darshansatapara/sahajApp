import { useEffect, useState } from "react";
import "../global.css";
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/admin/login"  />;
}
