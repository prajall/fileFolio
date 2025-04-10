import React from "react";
import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Filefolio | Easiest way to share your files</title>
        <meta
          name="description"
          content="Filefolio lets you share files, code, and images instantly.Just create your URL and start sharing!"
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
      </Helmet>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </>
  );
}

export default App;
