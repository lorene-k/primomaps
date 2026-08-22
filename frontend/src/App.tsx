import { MapView } from "./components/MapView.tsx";

function App() {
    return (
        <div className="h-screen text-slate-100 p-6">
            <div className="h-full flex flex-col gap-6">
                <header>
                    <h1 className="text-2xl font-bold">PRIMOMAPS</h1>
                    <p className="text-sm text-slate-400">
                        Prix médian au m² · Hauts-de-Seine
                    </p>
                </header>

                <MapView />

                <footer className="shrink-0 flex justify-between text-xs mt-5 text-slate-600">
                    <span>Données DVF Etalab 2025</span>
                    <span>
                        Site réalisé par{" "}
                        <a
                            href="https://github.com/lorene-k"
                            className="underline"
                        >
                            lorene-k
                        </a>
                    </span>
                </footer>
            </div>
        </div>
    );
}

export default App;
