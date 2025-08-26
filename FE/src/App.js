import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.scss";

import Home from "./features/components/Home/Home";
import Jobs from "./features/components/Jobs/Jobs";
import { checkBar } from "./features/container/Functionjs";
import DetailJob from "./features/components/DetailJob/DetailJob";
import ListNews from "./features/components/ListNews/ListNews";
import DetailNew from "./features/components/DetailNew/DetailNew";
import Company from "./features/components/company/Company";
import DetailCompany from "./features/components/DetailCompany/DetailCompany";
import Candidates from "./features/components/Candidates/Candidates";
import DetailCandidate from "./features/components/DetailCandidate/DetailCandidate";
import Login from "./features/components/Login/Login";
import Register from "./features/components/Register/Register";
import InforCompany from "./features/components/inforCompany/InforCompany";
import InforUser from "./features/components/inforUser/InforUser";
import DetailFormCV from "./features/components/DetaiFormCV/DetaiFormCV";
import InforCV from "./features/components/CreateCv/InforCV/InforCV";
import Empty from "./features/components/Empty/Empty";

import AdminLayout from "./app/Admin"; // Nav layout
import checkLoginApi from "./api/checkLogin";

function App() {
  const [adminElement, setAdminElement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkBar();
  }, []);

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        const res = await checkLoginApi.checkLogin();
        const message = res?.message;

        if (message === "token loi roi" || message === "UN") {
          setAdminElement(<Route path="/admin/*" element={<Empty />} />);
        } else {
          const role = res?.data?.user?.role;
          if (role === "admin") {
            setAdminElement(<Route path="/admin/*" element={<AdminLayout />} />);
          } else {
            setAdminElement(<Route path="/admin/*" element={<Empty />} />);
          }
        }
      } catch (err) {
        console.error("Lỗi khi kiểm tra quyền:", err);
        setAdminElement(<Route path="/admin/*" element={<Empty />} />);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogin();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/news" element={<ListNews />} />
          <Route path="/news/detailNew/:id" element={<DetailNew />} />
          <Route path="/jobs/work/:id" element={<DetailJob />} />
          <Route path="/companys" element={<Company />} />
          <Route path="/companys/:id" element={<DetailCompany />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/:id" element={<DetailCandidate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inforCompany" element={<InforCompany />} />
          <Route path="/inforUser" element={<InforUser />} />
          <Route path="/detaiFormCV/:id" element={<DetailFormCV />} />
          <Route path="/inforCV" element={<InforCV />} />
          {!isLoading && adminElement}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
