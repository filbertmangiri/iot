import PerPage from "@/Components/Datatable/PerPage";
import Dropdown from "@/Components/Dropdown";
import AppLayout from "@/Layouts/AppLayout";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { debounce, pickBy } from "lodash";
import { twMerge } from "tailwind-merge";
import FloatingInput from "@/Components/Form/FloatingInput";
import Pagination from "@/Components/Datatable/Pagination";
import Search from "@/Components/Datatable/Search";
import { ArrowDownTrayIcon, EnvelopeIcon } from "@heroicons/react/20/solid";

type Props = {
    logs: any;
};

const columns = [
    { name: "ID", field: "id" },
    { name: "Device", field: "device" },
    { name: "Serial Number", field: "serial_number" },
    { name: "Password", field: "password" },
    { name: "Latitude", field: "latitude" },
    { name: "Longitude", field: "longitude" },
    { name: "Temperature", field: "temperature" },
    { name: "Runtime", field: "runtime" },
    { name: "Stoptime", field: "stoptime" },
    { name: "Status", field: "status" },
    { name: "LED 01", field: "led_01" },
    { name: "LED 02", field: "led_02" },
    { name: "Sent At", field: "sent_at" },
];

function Index(props: Props) {
    const { data: logs, meta, queries } = props.logs;

    const [params, setParams] = useState(queries);

    const [sortColumn, sortDirection] = (
        params.sort || meta.default_sort
    ).split("-");

    /* Prevent page overload */
    const oldQueries = useRef({
        per_page: meta.default_per_page,
        sort: meta.default_sort,
        search: "",
    });

    const reload = useCallback(
        debounce((query) => {
            /* Prevent page overload */
            if (
                oldQueries.current.per_page < query.per_page ||
                oldQueries.current.search !== query.search
            ) {
                query.page = 1;
            }

            oldQueries.current.per_page = query.per_page;
            oldQueries.current.search = query.search;

            router.get(route("log.index"), pickBy(query), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 250),
        []
    );

    const initialMount = useRef(true);

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
            return;
        }

        reload(params);
    }, [params]);

    return (
        <>
            <Head title="Logs" />

            <div className="flex h-full w-full flex-col gap-y-3 rounded-lg bg-white py-3 shadow-md dark:border-gray-700 dark:bg-gray-900">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 px-3 max-sm:flex-col max-sm:items-stretch">
                    <div className="flex items-center justify-between gap-x-3">
                        <PerPage
                            current={params.per_page}
                            onChange={(per_page) =>
                                setParams({ ...params, per_page })
                            }
                            meta={meta}
                        />

                        <a
                            href={route("log.export")}
                            className="flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <ArrowDownTrayIcon
                                className="-ml-1 mr-2 h-5 w-5"
                                aria-hidden="true"
                            />
                            Export
                        </a>
                    </div>

                    <div className="flex items-center justify-between gap-x-3">
                        <Search
                            current={params.search}
                            onChange={(search) =>
                                setParams({ ...params, search })
                            }
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="flex-grow overflow-y-auto">
                    <div className="custom-scrollbar h-full overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 border-b border-gray-400 bg-white dark:bg-gray-900">
                                <tr>
                                    {columns.map((column, key) => (
                                        <th
                                            key={`header-column-${key}`}
                                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
                                        >
                                            <button
                                                onClick={
                                                    column?.field
                                                        ? () => {
                                                              setParams({
                                                                  ...params,
                                                                  sort: `${
                                                                      column.field
                                                                  }-${
                                                                      sortDirection ===
                                                                      "asc"
                                                                          ? "desc"
                                                                          : "asc"
                                                                  }`,
                                                              });
                                                          }
                                                        : () => {}
                                                }
                                                className={twMerge(
                                                    "group inline-flex",
                                                    column?.field
                                                        ? "cursor-pointer"
                                                        : "cursor-default"
                                                )}
                                            >
                                                {column.name}
                                                {column?.field && (
                                                    <span
                                                        className={twMerge(
                                                            "ml-2 flex-none rounded text-gray-400",
                                                            sortColumn !==
                                                                column.field &&
                                                                "invisible group-hover:visible"
                                                        )}
                                                    >
                                                        {sortDirection ===
                                                        "asc" ? (
                                                            <ChevronDownIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <ChevronUpIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </span>
                                                )}
                                            </button>
                                        </th>
                                    ))}

                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {logs.length > 0 ? (
                                    logs.map((log: any, key: number) => (
                                        <tr
                                            key={`log-${key}`}
                                            className="odd:bg-gray-100 hover:bg-gray-100 odd:hover:bg-gray-200 dark:odd:bg-gray-700"
                                        >
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                <Link
                                                    href={route(
                                                        "log.show",
                                                        log
                                                    )}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    {log.id}
                                                </Link>
                                            </td>
                                            {columns
                                                .slice(1)
                                                .map((column, index) => (
                                                    <td
                                                        key={index}
                                                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                                                    >
                                                        {log[column.field]}
                                                    </td>
                                                ))}
                                            <td className="whitespace-nowrap px-4 py-2 font-medium">
                                                <Link
                                                    href={route(
                                                        "log.show",
                                                        log
                                                    )}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-2 text-center text-gray-700 dark:text-gray-200"
                                        >
                                            No records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-3">
                    <span className="text-sm">
                        Showing {meta.from} to {meta.to} of {meta.total} entries
                    </span>

                    <Pagination
                        onChange={(page) => setParams({ ...params, page })}
                        meta={meta}
                    />
                </div>
            </div>
        </>
    );
}

Index.layout = (page: ReactNode) => <AppLayout children={page} header="Logs" />;

export default Index;
