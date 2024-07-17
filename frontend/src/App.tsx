import { TonConnectButton, TonConnectUIProvider } from "@tonconnect/ui-react";
import { manifestUrl } from "./constants";
import { SendingTransaction } from "./components/SendingTransaction";

function App() {
    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <div className="flex justify-center">
                <div className="flex-col text-center">
                    <TonConnectButton />
                    <SendingTransaction />
                </div>
            </div>
        </TonConnectUIProvider>
    );
}

export default App;
