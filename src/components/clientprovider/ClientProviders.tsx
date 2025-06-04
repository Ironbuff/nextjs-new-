'use client'

import { Provider } from "react-redux";
import { store } from "@/store/Store";
import Navbar from "@/components/navbar/Navbar";
// import { Footer } from "@/components/footer";
import { Bounce, ToastContainer } from "react-toastify";



export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  


  return (


    <Provider store={store}>

      <Navbar />
      {children}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        transition={Bounce}
      />
      {/* <Footer /> */}
    </Provider>
  );
}
