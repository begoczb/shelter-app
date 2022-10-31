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
import BackgroundLetterAvatars from "../components/BackgroundLettersAvatar";
import EditIcon from "@mui/icons-material/Edit";
import "./ProfilePage.css";

const listingThumbStyle = {
  height: "85px",
  background: "#FDF2F5",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "15px",
  justifyContent: "space-between",
  marginBottom: "2px",
  display: "flex",
  paddingLeft: "0",
  paddingRight: "0.5rem",
  overflowY: "auto",
};

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
      <main id="profile-page" style={backgroundStyleGen}>
        <Container
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0",
            margin: "0",
            height: "100vh",
            alignSelf: "center",
            alignContent: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "2rem",
              margin: "0",
            }}
          >
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <h3>My profile</h3>
              <span style={informationLabel}>
                {hostInfo.firstName}

                <EditIcon sx={{ alignSelf: "end" }} />
              </span>
              <span style={informationLabel}>
                {hostInfo.lastName}
                <EditIcon sx={{ alignSelf: "end" }} />
              </span>
              <span style={informationLabel}>
                {hostInfo.email}
                <EditIcon sx={{ alignSelf: "end" }} />
              </span>
            </Container>
            <BackgroundLetterAvatars
              string={`${hostInfo.firstName} ${hostInfo.lastName}`}
            />
          </Container>
          <BasicModal hostRooms={hostRooms} setHostRooms={setHostRooms} />
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: "0",
              overflowY: "auto",
              padding: "0",
              paddingLeft: "0.3rem",
              width: "100%",
            }}
          >
            <h3>My listings:</h3>
            <Container
              sx={{
                Height: "100%",
                padding: "0.2rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {hostRooms.map((elem) => (
                <Link
                  key={elem._id}
                  to={`/room/${elem._id}`}
                  state={{ hostInfo: hostInfo, roomInfo: elem }}
                >
                  <ListingThumbnail listing={elem} style={listingThumbStyle} />
                </Link>
              ))}
            </Container>
          </Container>
        </Container>
      </main>
    </>
  ) : (
    <>
      <main id="profile-page" style={backgroundStyleGen}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",

            alignSelf: "center",
            alignContent: "flex-start",
            justifyContent: "center",
          }}
        >
          <Container sx={{ display: "flex", flexDirection: "row" }}>
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <h3>My profile</h3>
              <span style={informationLabel}>
                {guestInfo.firstName}
                <EditIcon sx={{ alignSelf: "end" }} />
              </span>
              <span style={informationLabel}>
                {guestInfo.lastName}
                <EditIcon sx={{ alignSelf: "end" }} />
              </span>
              <span style={informationLabel}>
                {guestInfo.email}
                <EditIcon sx={{ alignSelf: "end" }} />
              </span>
            </Container>
            <BackgroundLetterAvatars
              string={`${guestInfo.firstName} ${guestInfo.lastName}`}
              sx={{ height: "56px", width: "56px" }}
            />
          </Container>
        </Container>
      </main>
    </>
  );
};

export default ProfilePage;
