import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import BasicModal from "../components/Modal";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { backgroundStyleGen, informationLabel } from "../utils/globalStyles";
import ListingThumbnail from "../components/ListingThumbnail";
import { Container } from "@mui/system";

const ProfilePage = () => {
  const { user, getToken } = useContext(AuthContext);
  // console.log(user);

  const [hostInfo, setHostInfo] = useState("");
  const [hostRooms, setHostRooms] = useState([]);
  const [guestInfo, setGuestInfo] = useState("");

  useEffect(() => {
    if (user.userType === "host") {
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
    } else {
      const getGuestInfo = async () => {
        const token = getToken();
        const { data } = await axios({
          method: "get",
          baseURL: API_URL,
          url: "guest",
          headers: { Authorization: `Bearer ${token}` },
        });
        setGuestInfo(data.guestInfo);
      };

      getGuestInfo();
    }
  }, []);

  return user.userType === "host" ? (
    <>
      <main style={backgroundStyleGen}>
        <h3>My profile</h3>

        <Container
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "60%",
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "space-evenly",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <span style={informationLabel}>{hostInfo.firstName}</span>
          <span style={informationLabel}>{hostInfo.lastName}</span>
          <span style={informationLabel}>{hostInfo.email}</span>
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
        </Container>
      </main>
    </>
  ) : (
    <>
      <main style={backgroundStyleGen}>
        <h3>My profile</h3>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            // height: "60%",
            alignSelf: "center",
            alignContent: "flex-start",
            justifyContent: "center",
            // top: "50%",
            // transform: "translateY(-50%)",
          }}
        >
          <span style={informationLabel}>{guestInfo.firstName}</span>
          <span style={informationLabel}>{guestInfo.lastName}</span>
          <span style={informationLabel}>{guestInfo.email}</span>
        </Container>
      </main>
    </>
  );
};

export default ProfilePage;
