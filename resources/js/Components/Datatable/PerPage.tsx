import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
    current: number;
    onChange: (perPage: number) => void;
    meta: any;
};

function PerPage(props: Props) {
    const [perPages, setPerPages] = useState<Array<number>>([]);

    useEffect(() => {
        let numbers = [];

        for (
            let i = props.meta.default_per_page;
            i <= props.meta.total;
            i += props.meta.default_per_page
        ) {
            if (i > 50) break;

            numbers.push(i);
        }

        setPerPages(numbers);
    }, [props.meta.total]);

    return (
        <Dropdown>
            <Dropdown.Button className="flex items-center gap-x-2 rounded-md border border-gray-400 px-1.5 py-2 transition hover:bg-gray-100">
                <span className="text-sm">
                    {props.current || props.meta.default_per_page}
                </span>
                <ChevronDownIcon className="h-4 w-4" />
            </Dropdown.Button>

            <Dropdown.Items className="left-0 z-10 text-xs">
                {perPages.map((perPage) => (
                    <Dropdown.Item
                        key={`per-page-${perPage}`}
                        onClick={() => props.onChange(perPage)}
                        selected={
                            perPage ==
                            (props.current || props.meta.default_per_page)
                        }
                        preventClose={
                            perPage ==
                            (props.current || props.meta.default_per_page)
                        }
                    >
                        {perPage}
                    </Dropdown.Item>
                ))}
            </Dropdown.Items>
        </Dropdown>
    );
}

export default PerPage;
