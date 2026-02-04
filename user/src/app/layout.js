import "src/styles/global.css";
import {
  UserProvider,
  AuthProvider,
  FilesProvider,
  VaultsProvider,
  ErrorDisplayProvider,
  KeyManagementProvider,
} from "src/contexts";

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
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ErrorDisplayProvider>
          <AuthProvider>
            <UserProvider>
              <KeyManagementProvider>
                <VaultsProvider>
                  <FilesProvider>{children}</FilesProvider>
                </VaultsProvider>
              </KeyManagementProvider>
            </UserProvider>
          </AuthProvider>
        </ErrorDisplayProvider>
      </body>
    </html>
  );
};

export default RootLayout;
