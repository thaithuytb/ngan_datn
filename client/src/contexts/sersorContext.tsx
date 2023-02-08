import { createContext, ReactNode, useEffect, useState } from "react";
import sensorApi from "../api/sensorApi";

interface IAuthContextProviderProps {
  children: ReactNode;
}
interface ISensor {
  id: number;
  idSensor: string;
  description: string;
  value: number;
  lastUpdate: string;
}

interface IDataSensor {
  sensors: ISensor[] | [];
  totalPage: number;
}

const sensorsDefault = {
  dataSensors: {
    sensors: [],
    totalPage: 0,
  },
};

interface ISensorContext {
  dataSensors: IDataSensor;
  currentPage: number;
  perPage: number;
  getSensors: (params: any) => void;
  setCurrentPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  getAllSensors: () => any;
}

export const SensorContext = createContext<ISensorContext>(
  sensorsDefault as ISensorContext
);

const SensorContextProvider = ({ children }: IAuthContextProviderProps) => {
  const [sensorState, setSensorState] = useState(sensorsDefault);

  const [currentPage, setCurrentPage] = useState(1);

  const [perPage, setPerPage] = useState(20);

  const getSensors = async (params: any) => {
    const { getSensors } = sensorApi;
    try {
      const response = await getSensors(params);
      if (response.data.success) {
        const { data } = response.data;
        setSensorState({
          ...sensorState,
          dataSensors: data,
        });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSensors = async () => {
    const { getAllSensors } = sensorApi;

    try {
      const response = await getAllSensors();
      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    ...sensorState,
    getSensors,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    getAllSensors,
  };

  return (
    <SensorContext.Provider value={data}>{children}</SensorContext.Provider>
  );
};

export default SensorContextProvider;
