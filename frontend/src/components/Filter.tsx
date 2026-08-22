import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const items = [
    { label: "Tout", value: "Tout" },
    { label: "Appartement", value: "Appartement" },
    { label: "Maison", value: "Maison" },
];

export function Filter({
    onFilterChange,
    value,
}: {
    onFilterChange: (type: string | null) => void;
    value: string | null;
}) {
    return (
        <Select
            value={value ?? "Tout"}
            onValueChange={(v: string | null) =>
                onFilterChange(v === "Tout" ? null : v)
            }
        >
            <SelectTrigger className="h-full w-full rounded-md border border-slate-400 p-4">
                <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent
                alignItemWithTrigger={false}
                className="bg-slate-200/20 text-slate-100 backdrop-blur-md"
            >
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem
                            key={item.value}
                            value={item.value}
                            className="transition-colors duration-200 focus:bg-slate-200/20 focus:text-slate-100"
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
