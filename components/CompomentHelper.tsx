import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ApiRequest from "../utils/api/Main/ApiRequest";

export const ProvinceShow = ({ id, token }: { id: string; token: string }) => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    ApiRequest.getDetailProvince(token, id).then((res) => setName(res));
  }, [token, id]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{name}</Text>
    </View>
  );
};
export const DistrictShow = ({ id, token }: { id: string; token: string }) => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    ApiRequest.getDetailDistrict(token, id).then((res) => setName(res));
  }, [token, id]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{name}</Text>
    </View>
  );
};
export const WardShow = ({ id, token }: { id: string; token: string }) => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    ApiRequest.getDetailWard(token, id).then((res) => setName(res));
  }, [token, id]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{name}</Text>
    </View>
  );
};
export const TollAreaShow = ({ id, token }: { id: string; token: string }) => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    ApiRequest.TollAreaDetail(token, id).then((res) =>
      setName(res.result.name)
    );
  }, [token, id]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{name}</Text>
    </View>
  );
};
export const UnitTypeShow = ({ id, token }: { id: string; token: string }) => {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    ApiRequest.UnitTypeDetail(token, id).then((res) =>
      setName(res.result.name)
    );
  }, [token, id]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>{name}</Text>
    </View>
  );
};

