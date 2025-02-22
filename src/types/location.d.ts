interface TimeData {
  utc: string;
}

interface LocationData {
  country: string;
  region: string;
  timezone: string;
  city: string;
  time: TimeData;
}

interface ApiResponse {
  data: LocationData[];
}
