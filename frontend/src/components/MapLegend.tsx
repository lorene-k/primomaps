const PRICE_COLORS = {
    "< 5000": "#FD8D3C",
    "5000-7000": "#FC4E2A",
    "7000-9000": "#E31A1C",
    "9000-12000": "#BD0026",
    "> 12000": "#800026",
};

export function MapLegend() {
    return (
        <div className="bottom-4 rounded shadow">
            <div className="flex flex-col gap-1 md:flex-row md:gap-4 lg:flex-row lg:text-xl">
                {Object.entries(PRICE_COLORS).map(([range, color]) => (
                    <div key={range} className="flex items-center gap-2">
                        <div
                            className="h-4 w-4 rounded"
                            style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-sm">{range} €/m²</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
