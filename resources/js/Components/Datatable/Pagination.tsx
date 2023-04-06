import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    onChange: (page: number | string | null) => void;
    meta: any;
};

function Pagination(props: Props) {
    return (
        props.meta.links && (
            <div className="flex gap-x-1">
                {props.meta.links.map((link: any, key: number) => (
                    <button
                        key={`link-${key}`}
                        type="button"
                        disabled={link.active || !link.url}
                        onClick={() => {
                            props.onChange(
                                new URL(link.url).searchParams.get("page")
                            );
                        }}
                        className={twMerge(
                            "flex items-center whitespace-nowrap rounded px-3 py-2 text-xs font-medium text-black",
                            link.active
                                ? "bg-indigo-600 text-white"
                                : link.url
                                ? "hover:bg-indigo-500 hover:text-white"
                                : "",
                            !link.url && "text-gray-500"
                        )}
                        dangerouslySetInnerHTML={{
                            __html: link.label,
                        }}
                    />
                ))}
            </div>
        )
    );
}

export default Pagination;
