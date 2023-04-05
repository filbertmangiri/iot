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

type Props = {
    logs: any;
};

const columns = [
    { name: "ID", sort: "id" },
    { name: "Device", sort: "device" },
    { name: "Serial Number", sort: "serial_number" },
    { name: "Password", sort: "password" },
    { name: "Latitude", sort: "latitude" },
    { name: "Longitude", sort: "longitude" },
    { name: "Temperature", sort: "temperature" },
    { name: "Runtime", sort: "runtime" },
    { name: "Stoptime", sort: "stoptime" },
    { name: "Status", sort: "status" },
    { name: "LED 01", sort: "led_01" },
    { name: "LED 02", sort: "led_02" },
    { name: "Time", sort: "time" },
    { name: "Date", sort: "date" },
];

function Index(props: Props) {
    const { data: logs, meta, queries } = props.logs;

    const [params, setParams] = useState(queries);

    const [sortColumn, sortDirection] = params.sort.split("-");

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

            <div className="flex h-full w-full flex-col gap-y-3 rounded-lg bg-white shadow-md px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <PerPage
                        current={params.per_page}
                        onChange={(per_page) =>
                            setParams({ ...params, per_page })
                        }
                        meta={meta}
                    />

                    <Search
                        current={params.search}
                        onChange={(search) => setParams({ ...params, search })}
                    />
                </div>

                {/* Table */}
                <div className="flex-grow overflow-y-auto -mx-4">
                    <div className="custom-scrollbar h-full overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-400">
                                <tr>
                                    {columns.map((column, key) => (
                                        <th
                                            key={`header-column-${key}`}
                                            className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-white"
                                        >
                                            <button
                                                onClick={
                                                    column?.sort
                                                        ? () => {
                                                              setParams({
                                                                  ...params,
                                                                  sort: `${
                                                                      column.sort
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
                                                    column?.sort
                                                        ? "cursor-pointer"
                                                        : "cursor-default"
                                                )}
                                            >
                                                {column.name}
                                                {column?.sort && (
                                                    <span
                                                        className={twMerge(
                                                            "ml-2 flex-none rounded text-gray-400",
                                                            sortColumn !==
                                                                column.sort &&
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
                                            className="odd:bg-gray-100 dark:odd:bg-gray-700 hover:bg-gray-100 odd:hover:bg-gray-200"
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
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.device}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.serial_number}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.password}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.latitude}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.longitude}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.temperature}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.runtime}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.stoptime}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.status}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.led_01}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.led_02}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                                                {log.time}
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {log.date}
                                            </td>
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
                <div className="flex items-center justify-between">
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
