"use client";

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const query = searchParams.get("subject") || "all";

    const [subject, setSubject] = useState(query);

  
useEffect(() => {
    const params = searchParams.toString();

    let newUrl = "";

    if (subject === "all") {
        newUrl = removeKeysFromUrlQuery({
            params,
            keysToRemove: ["subject"],
        });
    } else {
        newUrl = formUrlQuery({
            params,
            key: "subject",
            value: subject,
        });
    }

    const currentUrl = `${window.location.pathname}${params ? `?${params}` : ""}`;

    if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
    }

}, [subject, searchParams, router]);


return (
    <div className="w-full sm:w-[250px]">
        <Select
            value={subject}
            onValueChange={(value) => {
                if (value !== null) {
                    setSubject(value);
                }
            }}
        >
            <SelectTrigger className="input capitalize w-full">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>

                {subjects.map((subject) => (
                    <SelectItem
                        key={subject}
                        value={subject}
                        className="capitalize"
                    >
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);
};

export default SubjectFilter;