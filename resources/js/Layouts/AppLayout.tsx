import { Dialog, Transition } from "@headlessui/react";
import {
    Bars3CenterLeftIcon,
    HomeIcon,
    NewspaperIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { ComponentProps, Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"div"> & {
    header?: string;
};

function AppLayout(props: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigations = [
        {
            name: "Dashboard",
            href: route("dashboard"),
            icon: HomeIcon,
            current: route().current("dashboard"),
        },
        {
            name: "Logs",
            href: route("log.index"),
            icon: NewspaperIcon,
            current: route().current("log.*"),
        },
    ];

    return (
        <div className={twMerge("h-screen", props.className)}>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex flex-shrink-0 justify-center items-center px-4">
                                    <img
                                        className="h-8 w-auto"
                                        src="/img/intecs.png"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto custom-scrollbar">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {navigations.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() =>
                                                        setSidebarOpen(false)
                                                    }
                                                    className={twMerge(
                                                        item.current
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                                                        "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? "page"
                                                            : undefined
                                                    }
                                                >
                                                    <item.icon
                                                        className={twMerge(
                                                            item.current
                                                                ? "text-gray-500"
                                                                : "text-gray-400 group-hover:text-gray-500",
                                                            "mr-3 flex-shrink-0 h-6 w-6"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>

                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:py-3">
                <div className="flex flex-shrink-0 items-center justify-center px-6">
                    <img
                        className="h-8 w-auto"
                        src="/img/intecs.png"
                        alt="Your Company"
                    />
                </div>

                <div className="mt-2 flex h-0 flex-1 flex-col overflow-y-auto custom-scrollbar pt-1">
                    {/* Navigation */}
                    <nav className="mt-6 px-3">
                        <div className="space-y-1">
                            {navigations.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={twMerge(
                                        item.current
                                            ? "bg-gray-200 text-gray-900"
                                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    <item.icon
                                        className={twMerge(
                                            item.current
                                                ? "text-gray-500"
                                                : "text-gray-400 group-hover:text-gray-500",
                                            "mr-3 flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main column */}
            <div className="flex flex-col lg:pl-64 h-full">
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
                    <button
                        type="button"
                        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3CenterLeftIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                        />
                    </button>
                    {props.header && (
                        <div className="flex flex-1 items-center justify-between px-4 sm:px-6 lg:px-8">
                            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                                {props.header}
                            </h1>
                        </div>
                    )}
                </div>
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Page title & actions */}
                    {props.header && (
                        <div className="hidden border-b border-gray-300 px-4 py-4 lg:flex lg:items-center lg:justify-between lg:px-8">
                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl font-semibold leading-6 text-gray-900 lg:truncate">
                                    {props.header}
                                </h1>
                            </div>
                        </div>
                    )}

                    <div className="py-8 px-4 sm:px-6 lg:px-8 flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
                        {props.children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
