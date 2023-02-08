import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__font">
        <Link to="no-data" className="header__font-logo">
          Giới thiệu môn học
        </Link>
        <Link to="no-data">Tài liệu tham khảo</Link>
        <Link to="no-data">Liên hệ</Link>
        <Link to="theo-doi-cam-bien">Theo dõi cảm biến</Link>
      </div>
    </div>
  );
};

export default Header;
