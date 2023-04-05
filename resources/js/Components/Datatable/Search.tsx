import React from "react";
import FloatingInput from "../Form/FloatingInput";

type Props = {
    current: string;
    onChange: (search: string) => void;
};

function Search(props: Props) {
    return (
        <FloatingInput className="py-2">
            <FloatingInput.Field
                id="search-box"
                value={props.current}
                onChange={(e) => props.onChange(e.target.value)}
            />

            <FloatingInput.Label
                htmlFor="search-box"
                backgroundClassName="bg-white dark:bg-gray-900"
            >
                Search
            </FloatingInput.Label>
        </FloatingInput>
    );
}

export default Search;
