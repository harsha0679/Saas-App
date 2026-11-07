
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("topic") || "";

    const [searchquery, setSearchquery] = useState(query);

    useEffect(() => {
        const debounced = setTimeout(() => {
            const params = searchParams.toString();

            let newUrl = "";

            if (searchquery.trim()) {
                newUrl = formUrlQuery({
                    params,
                    key: "topic",
                    value: searchquery.trim(),
                });
            } else {
                newUrl = removeKeysFromUrlQuery({
                    params,
                    keysToRemove: ["topic"],
                });
            }

            if (newUrl !== `${pathname}${params ? `?${params}` : ""}`) {
                router.replace(newUrl, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(debounced);

    }, [searchquery, pathname, router, searchParams]);

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <img src="/icons/search.svg" alt="search" width="15" height="15" />

            <input
                className="outline-none"
                placeholder="Search..."
                value={searchquery}
                onChange={(e) => setSearchquery(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
