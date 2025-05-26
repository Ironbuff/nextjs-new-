'use client'

import { Provider } from "react-redux";
import { store } from "@/store/Store";
import Navbar from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
      <Footer />
    </Provider>
  );
}
