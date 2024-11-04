import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import "@/css/global.css"
import {meta, config} from '@@/meta-config'
import App from '@/app/App';
import {Helmet} from "react-helmet";
import {Auth0Provider} from "@auth0/auth0-react";
import store from "@/lib/redux/store";
import {Provider} from "react-redux"
import {ThemeProvider, type Theme} from "@/components/theme/theme-provider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <Helmet
      htmlAttributes={{
        lang: `${meta.language}`,
      }}
    >
      <title>{meta.title}</title>
      <meta name="description" content={meta.description}/>
      <link rel="apple-touch-icon" sizes="180x180" href={`/favicon/apple-touch-icon.png`}/>
      <link rel="icon" type="image/png" sizes="32x32" href={`/favicon/favicon-32x32.png`}/>
      <link rel="icon" type="image/png" sizes="16x16" href={`/favicon/favicon-16x16.png`}/>
      <link rel="manifest" href={`/favicon/site.webmanifest`}/>
    </Helmet>
    <ThemeProvider defaultTheme={meta.theme as Theme || "system"} storageKey="react-ui-theme">
      <Provider store={store}>
        <Auth0Provider
          domain={config["auth-domain"]}
          clientId={config["auth-client-id"]}
          authorizationParams={{
            redirect_uri: config["auth-redirect-url"],
            audience: config["auth-audience"]
          }}
          cacheLocation={`localstorage`}
        >
          <App/>
        </Auth0Provider>
      </Provider>
    </ThemeProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
