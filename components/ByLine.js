import Link from "next/link";

export function ByLine() {
  return(
    <div className="flex items-center justify-between gap-x-4 p-3.5 lg:px-5 lg:py-3">
      <div className="flex items-center gap-x-1.5">
        <div className="text-xs text-gray-400 lg:text-sm">By</div>
        <div className="text-xs text-gray-600 w-28 lg:text-sm lg:w-32">
          <Link href={"/"}>
            audio-to-text.com
          </Link>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-right lg:text-sm">
        © 2021-2023 Copyright AI Platform, Inc.
      </div>
    </div>
  )
}