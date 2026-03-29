import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Report, formatReportedAt, isValidMapCoordinate } from "../lib/reportAdapter";

const defaultMarkerIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultMarkerIcon;

interface ReportMapProps {
  reports: Report[];
  isLoading?: boolean;
}

export function ReportMap({ reports, isLoading = false }: ReportMapProps) {
  const validReports = reports.filter(isValidMapCoordinate);

  if (isLoading) {
    return (
      <MapPlaceholder
        title="Loading map"
        description="Fetching trash report locations from the backend."
      />
    );
  }

  if (validReports.length === 0) {
    return (
      <MapPlaceholder
        title="Interactive Map"
        description="No valid report locations are available yet."
      />
    );
  }

  const center = getMapCenter(validReports);

  return (
    <div className="h-full min-h-[32rem]">
      <MapContainer
        key={`${center[0]}-${center[1]}-${validReports.length}`}
        center={center}
        zoom={16.5}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validReports.map((report) => (
          <Marker key={report.id} position={[report.latitude, report.longitude]}>
            <Popup>
              <div className="space-y-1">
                <div><strong>{report.trashType}</strong></div>
                <div>{report.username}</div>
                <div>{formatReportedAt(report.reportedAt)}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function getMapCenter(reports: Report[]) {
  const totals = reports.reduce(
    (accumulator, report) => ({
      latitude: accumulator.latitude + report.latitude,
      longitude: accumulator.longitude + report.longitude,
    }),
    { latitude: 0, longitude: 0 },
  );

  return [
    totals.latitude / reports.length,
    totals.longitude / reports.length,
  ] as [number, number];
}

function MapPlaceholder({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="h-full min-h-[32rem] flex items-center justify-center p-8">
      <div className="text-center">
        <h2 style={{ color: "var(--fern)" }} className="mb-4">
          {title}
        </h2>
        <p style={{ color: "var(--charcoal-brown)" }}>{description}</p>
      </div>
    </div>
  );
}
