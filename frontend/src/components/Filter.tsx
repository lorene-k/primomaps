import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const items = [
    { label: "Tout", value: "Tout" },
    { label: "Appartement", value: "Appartement" },
    { label: "Maison", value: "Maison" },
]

export function Filter({ onFilterChange, value }: {
    onFilterChange: (type: string | null) => void; value: string | null
}) {
    return (

        <Select
            value={value ?? "Tout"}
            onValueChange={(v: string) => onFilterChange(v === "Tout" ? null : v)}>
            <SelectTrigger className="w-full p-4 rounded-md h-full border border-slate-400">
                <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="bg-slate-200/20 backdrop-blur-md text-slate-100 ">
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem
                            key={item.value}
                            value={item.value}
                            className="focus:text-slate-100 focus:bg-slate-200/20 transition-colors duration-200"
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}