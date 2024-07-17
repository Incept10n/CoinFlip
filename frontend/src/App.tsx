import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { manifestUrl } from "./constants";
import Application from "./components/Application";

function App() {
    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <Application />
        </TonConnectUIProvider>
    );
}

export default App;
