import AppLayout from "@/Layouts/AppLayout";
import { MapPinIcon } from "@heroicons/react/20/solid";
import {
    ExclamationTriangleIcon,
    HeartIcon,
    PauseIcon,
    PlayIcon,
} from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";
import { Map, Marker } from "react-map-gl";

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

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-fit flex-col gap-x-8 gap-y-16 lg:h-full lg:flex-row">
                <div className="flex h-full flex-col">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Device Monitoring
                    </h3>

                    <dl className="mt-5 grid flex-grow grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 lg:gap-3">
                        {stats.map((item) => (
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-lg border bg-white px-4 py-5 shadow-md sm:px-6 sm:py-6"
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

                <div className="flex flex-col lg:flex-grow">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Device Location
                    </h3>

                    <div className="mt-5 aspect-square w-full overflow-hidden rounded-lg border bg-white shadow-md lg:flex-grow">
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
                        >
                            <Marker
                                longitude={log.longitude}
                                latitude={log.latitude}
                                anchor="bottom"
                            >
                                <MapPinIcon className="h-7 w-7 text-red-500" />
                            </Marker>
                        </Map>
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
