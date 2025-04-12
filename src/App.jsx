import React from "react";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>
          Filefolio | Share Files, Code & Images Instantly - No Logins
        </title>
        <meta
          name="description"
          content="Instantly share files, code, and images with custom URLs. No login required. Just create, upload, and share."
        />
        <meta
          name="keywords"
          content="Share files, Share code, Share images, Free file sharing, Instant file sharing, No login file upload, Share documents, Share code"
        />
        <meta property="og:title" content="Filefolio – Instant File Sharing" />
        <meta
          property="og:description"
          content="No login. No fuss. Share files, images, or code instantly via custom URLs."
        />
        <meta property="og:url" content="https://filefolio.netlify.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://filefolio.netlify.app/preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://filefolio.netlify.app/preview.png"
        />
      </Helmet>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </>
  );
}

export default App;
