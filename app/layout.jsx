import { CssBaseline, Container } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ReduxProvider } from "./Providers";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SearchProvider } from "@/Components/Context/SearchContext";

export const metadata = {
  title: "Eposh",
  description: "E-commerce Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SearchProvider>
            <CssBaseline />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SearchProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
