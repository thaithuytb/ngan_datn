import "./monitoring.css";
import Pagination from "../../components/pagination";
import { Form } from "react-bootstrap";
import { SensorContext } from "../../contexts/sersorContext";
import { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function Monitoring() {
  const [inputSearch, setInputSearch] = useState({
    idSensor: "",
    description: "",
    value: "",
    // lastUpdate: "",
  });

  const [nameFile, setNameFile] = useState({
    nameFile: "",
  });

  const [selectFile, setSelectFile] = useState(1);
  // const [statusAjax, setStatusAjax] = useState(1);
  const [showExcel, setShowExcel] = useState(0);
  const {
    getSensors,
    perPage,
    dataSensors,
    setCurrentPage,
    currentPage,
    getAllSensors,
  } = useContext(SensorContext);

  const onChangeValueSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch({ ...inputSearch, [e.target.name]: e.target.value });
  };

  const onChangeNameFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFile({ ...nameFile, [e.target.name]: e.target.value });
  };

  const onChangeSelectFile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFile(+e.target.value);
  };

  const submitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      getSensors({
        ...inputSearch,
        page: 1,
        limit: perPage,
      });

      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSensors({ page: 1, limit: 20 });
  }, []);

  const handleExportFile = async () => {
    try {
      const wb = XLSX.utils.book_new();
      let ws;
      if (selectFile === 1) {
        ws = XLSX.utils.json_to_sheet(dataSensors.sensors);
      } else {
        const data = await getAllSensors();
        ws = XLSX.utils.json_to_sheet(data);
      }

      XLSX.utils.book_append_sheet(wb, ws, "sensors");
      let name;
      if (nameFile.nameFile === "") {
        name = "sensor";
      } else {
        name = nameFile.nameFile;
      }
      XLSX.writeFile(wb, `${name}.xlsx`);

      setNameFile({
        nameFile: "",
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div
        className={showExcel ? "over" : ""}
        onClick={() => {
          if (showExcel === 1) {
            setShowExcel(0);
          }
        }}
      />
      <div className="monitoring__filter">
        <div className="wp__filter">
          <div className="filter">
            <span>Bộ lọc</span>
            <Form className="form__filter" onSubmit={submitSearch}>
              <Form.Group className="filter__group">
                <label className="filter__label">idSensor:</label>
                <input
                  type="text"
                  name="idSensor"
                  placeholder="VD: abc"
                  onChange={onChangeValueSearch}
                />
              </Form.Group>
              <Form.Group className="filter__group">
                <label className="filter__label">description:</label>
                <input
                  type="text"
                  name="description"
                  placeholder="VD: abc"
                  onChange={onChangeValueSearch}
                />
              </Form.Group>
              <Form.Group className="filter__group">
                <label className="filter__label">value (lấy lơn hơn):</label>
                <input
                  type="text"
                  name="value"
                  placeholder="VD: 10"
                  onChange={onChangeValueSearch}
                />
              </Form.Group>
              {/* <Form.Group className="filter__group">
                <label className="filter__label">lastUpdate:</label>
                <input
                  type="text"
                  name="lastUpdate"
                  placeholder="abc"
                  onChange={onChangeValueSearch}
                />
              </Form.Group> */}
              <button type="submit" className="filter__submit">
                Tìm kiếm
              </button>
            </Form>
          </div>
          <div className="excel" onClick={() => setShowExcel(1)}>
            Xuất file excel
          </div>
          <div
            className={showExcel ? "label__excel show" : "label__excel disable"}
          >
            <div className="excel__close" onClick={() => setShowExcel(0)}>
              x
            </div>
            <div className="excel__select">
              <span className="first">Dữ liệu muốn lưu</span>
              <span className="last">
                Mặc định: dữ liệu đang hiển thị ({dataSensors.sensors.length})
              </span>
              <select
                name="type"
                value={selectFile}
                onChange={onChangeSelectFile}
              >
                <option value={1}>Xuất dữ liệu đang hiển thị</option>
                <option value={2}>Xuất tất cả dữ liệu</option>
              </select>
            </div>
            <div className="nameFile">
              <label>Tên file muốn lưu</label>
              <span>Mặc định : sensor</span>
              <input
                type="text"
                name="nameFile"
                placeholder="Tên file"
                onChange={onChangeNameFile}
              />
            </div>
            <div className="excel__export" onClick={() => handleExportFile()}>
              Xuất file
            </div>
          </div>
        </div>
      </div>
      <div className="monitoring">
        <table>
          <tr>
            <th>Stt</th>
            <th>IdSensor</th>
            <th>Description</th>
            <th>Value</th>
            <th>LateUpdate</th>
          </tr>
          {dataSensors?.sensors?.map((sensor) => {
            return (
              <tr key={sensor.id}>
                <td>{sensor.id}</td>
                <td>{sensor.idSensor}</td>
                <td>{sensor.description}</td>
                <td>{sensor.value}</td>
                <td>{sensor.lastUpdate}</td>
              </tr>
            );
          })}
        </table>
        <Pagination page={dataSensors?.totalPage || 0} search={inputSearch} />
      </div>
    </>
  );
}
