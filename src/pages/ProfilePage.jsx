import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import BasicModal from "../components/Modal";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { backgroundStyleGen } from "../utils/globalStyles";
import ListingThumbnail from "../components/ListingThumbnail";

const ProfilePage = () => {
  const { user, getToken } = useContext(AuthContext);
  // console.log(user);

  const [hostInfo, setHostInfo] = useState("");
  const [hostRooms, setHostRooms] = useState([]);

  useEffect(() => {
    const getHostInfo = async () => {
      const token = getToken();
      const { data } = await axios({
        method: "get",
        baseURL: API_URL,
        url: "host",
        headers: { Authorization: `Bearer ${token}` },
      });
      setHostInfo(data.hostInfo);
      setHostRooms(data.roomInfo);
    };

    getHostInfo();
  }, []);

  return (
    <>
      <main style={backgroundStyleGen}>
        <h3>Hello {user.name} </h3>
        <h4>{user.userType}</h4>

        <div>
          <span>{hostInfo.firstName}</span>
          <span>{hostInfo.lastName}</span>
          <span>{hostInfo.email}</span>
          <BasicModal hostRooms={hostRooms} setHostRooms={setHostRooms} />
          <ul>
            {hostRooms.map((elem) => (
              <Link
                key={elem._id}
                to={`/room/${elem._id}`}
                state={{ hostInfo: hostInfo, roomInfo: elem }}
              >
                <ListingThumbnail listing={elem} />
              </Link>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
