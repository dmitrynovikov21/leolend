import Image from "next/image"

export function Logo() {
    return (
        <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex items-center justify-center">
                <Image
                    src="/leoiconlev.png"
                    alt="LeoAgent Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                />
            </div>

            {/* Text */}
            <span className="text-3xl font-[800] leading-none tracking-tighter text-zinc-900" style={{ fontFamily: 'var(--font-outfit)' }}>
                leoagent
            </span>
        </div>
    )
}
