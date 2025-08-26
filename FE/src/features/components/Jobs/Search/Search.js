import React, { useState, useEffect } from 'react';
import "../../../scss/SearchJobs/SearchJobs.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

function Search({ onchange }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const nameQuery = queryParams.get("name") || "";
  const addressQuery = queryParams.get("address") || "";

  // 👉 Gán giá trị ban đầu từ query
  const [state, setState] = useState({
    name: nameQuery,
    address: addressQuery,
  });

  const { name, address } = state;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onok = (e) => {
    e.preventDefault();
    onchange({ name, address });
  };

  return (
    <div className="searchJobs">
      <div className="container">
        <form onSubmit={onok}>
          <div className="row">
            <div className="col-md-6">
              <div className="key">
                <div className="key__title">Tên việc làm</div>
                <input
                  name="name"
                  value={name}
                  type="text"
                  onChange={handleOnChange}
                  placeholder="Tên việc làm"
                />
                <i className="fas fa-search text-silver"></i>
              </div>
            </div>
            <div className="col-md-3">
              <div className="address">
                <div className="address__title">Địa điểm</div>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleOnChange}
                  placeholder="Địa điểm"
                />
                <i className="fas fa-map-marker-alt text-silver"></i>
              </div>
            </div>
            <div className="col-md-3">
              <div className="btn">
                <button type="submit">Tìm việc làm</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

Search.propTypes = {
  onchange: PropTypes.func.isRequired,
};

export default Search;
