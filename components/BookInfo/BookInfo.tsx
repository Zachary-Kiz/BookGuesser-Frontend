interface Info {
    level: number;
    name: string;
    value: string | number;
}

export default function BookInfo({level, name, value} : Info) {
    return (
        <div className="flex flex-row gap-1">
            <div>{name}:</div>
            <div>{level > 2 ? value : "???"}</div>
        </div>
    )
}