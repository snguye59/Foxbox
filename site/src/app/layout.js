import "src/styles/global.css";
import { ErrorDisplayProvider } from "src/contexts";

export const metadata = {
  icons: {
    icon: [
      {
        url: "/images/logos/foxbox.svg",
        type: "image/svg+xml",
        sizes: "32x32",
      },
      { url: "/images/logos/foxbox-32x32.png" },
      { url: "/images/logos/foxbox-16x16.png" },
    ],
  },
  openGraph: {
    title: "Foxbox | Secure Your Digital Life",
    description:
      "Effortlessly manage your passwords with Foxbox. Start your free trial today.",
    images: [
      {
        url: "",
        width: 0,
        height: 0,
      },
    ],
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <ErrorDisplayProvider>
        <body>{children}</body>
      </ErrorDisplayProvider>
    </html>
  );
};

export default RootLayout;
