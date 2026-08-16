import { MapView } from './components/MapView.tsx'

function App() {
    return (
        <div className="h-screen text-slate-100 p-6">
            <div className="h-full flex flex-col gap-6">
                <header>
                    <h1 className="text-2xl font-bold">PRIMOMAPS</h1>
                    <p className="text-sm text-slate-400">Prix médian au m² · Hauts-de-Seine</p>
                </header>

                <MapView />

                <footer className="shrink-0 min-h-10">...</footer>
            </div>
        </div>
    )
}

export default App