import AppLayout from "@/Layouts/AppLayout";
import {
    ExclamationTriangleIcon,
    HeartIcon,
    PauseIcon,
    PlayIcon,
} from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Map } from "react-map-gl";

type Props = {
    log: any;
};

function Dashboard(props: Props) {
    const { data: log } = props.log;

    const stats = [
        {
            id: 1,
            name: "Temperature",
            stat: log.temperature,
            icon: ExclamationTriangleIcon,
        },
        {
            id: 2,
            name: "Run Time",
            stat: log.runtime,
            icon: PlayIcon,
        },
        {
            id: 3,
            name: "Stop Time",
            stat: log.stoptime,
            icon: PauseIcon,
        },
        {
            id: 4,
            name: "Device Condition",
            stat: log.status,
            icon: HeartIcon,
        },
    ];

    const [viewport, setViewport] = useState({
        latitude: log.latitude,
        longitude: log.longitude,
        width: "100%",
        height: "100%",
        zoom: 10,
    });

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-col lg:flex-row gap-x-8 gap-y-16 h-fit lg:h-full">
                <div className="h-full flex flex-col">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Device Monitoring
                    </h3>

                    <dl className="mt-5 grid grid-cols-1 gap-5 lg:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 flex-grow">
                        {stats.map((item) => (
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-lg border bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
                            >
                                <dt>
                                    <div className="absolute rounded-md bg-indigo-500 p-3">
                                        <item.icon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                        {item.name}
                                    </p>
                                </dt>
                                <dd className="ml-16 flex items-baseline">
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {item.stat}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="lg:flex-grow flex flex-col">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Device Location
                    </h3>

                    <div className="w-full aspect-square lg:flex-grow mt-5">
                        <Map
                            initialViewState={{
                                longitude: log.longitude,
                                latitude: log.latitude,
                                zoom: 9,
                            }}
                            style={{ width: "100%", height: "100%" }}
                            mapStyle={import.meta.env.VITE_MAPBOX_STYLE}
                            mapboxAccessToken={
                                import.meta.env.VITE_MAPBOX_TOKEN
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: ReactNode) => (
    <AppLayout children={page} header="Dashboard" />
);

export default Dashboard;
