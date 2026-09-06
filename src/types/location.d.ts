interface LocationData {
  country: string;
  region: string;
  timezone: string;
  city: string;
}

interface ApiResponse {
  data: LocationData[];
}
