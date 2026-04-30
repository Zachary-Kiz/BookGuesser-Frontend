import Link from "next/link";

type PuzzleLinkType = {
    day : number;
}

export default function PuzzleLink({day} : PuzzleLinkType) {
    return (
        <Link href={`/puzzle/${day}`} className="flex w-2xs h-12 bg-(--dark-brown) text-white items-center justify-center rounded-2xl">
            <div className="text-2xl">
                {day}
            </div>
        </Link>
    )
}