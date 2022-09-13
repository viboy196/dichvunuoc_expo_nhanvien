export { _Location } from "../../screens/AreaMap";
export const getLocation = (
  strLocation: string,
  name: string
): { location: { lat: number; long: number }; name: string } => {
  const arrStr = strLocation.split(",");
  console.log(arrStr);
  const lat = Number(arrStr[0]);
  const long = Number(arrStr[1]);
  return { location: { lat, long }, name: name };
};
