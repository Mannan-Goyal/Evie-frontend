import React, { useState } from "react";
import "./styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventProfile from "../../components/EventProfile";
import { useHistory } from "react-router-dom";
import eventFormSchema from "../../validation/eventform.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postEvent } from "../../api/Request";

const EventForm = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEndDate] = useState(new Date());
  const [img, setImg] = useState("https://i.imgur.com/rnyUp4J.gif");
  const [org, setOrg] = useState("Club/Chapter");
  const [title, setTitle] = useState("Event Title");
  const [cname, setCname] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("Description of the Event");
  const [url, setURL] = useState("URL of the Event");
  const [textColor, setTextColor] = useState("#ffffff");
  const [backgroundColor, setbackgroundColor] = useState("#383844");
  const history = useHistory();
  const routeChange = (path) => {
    history.push(path);
  };
  const validate = async () => {
    const eventDetails = {
      title,
      cname,
      email,
      desc,
      url,
      img,
      org,
      backgroundColor,
      textColor,
      start,
      end,
    };
    const { error } = eventFormSchema.validate(eventDetails);

    if (error) {
      toast.error(error.message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let res = await postEvent(eventDetails);
      if (res.code === 1) {
        routeChange("/verify");
      } else {
        toast.error("Submission Failed! Please retry.", {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0">
      <ToastContainer />
      <div
        className="px-4 pt-5 pb-4 sm:pt-5 sm:px-12"
        style={{ backgroundColor: "#16151C" }}
      >
        <div className="sm:flex sm:items-start">
          <div className="mt-3 w-full sm:mt-0 sm:text-left">
            <button
              type="button"
              className="w-full inline-flex justify-center text-white outline-none sm:w-auto sm:text-sm goback-button fc-button"
              onClick={() => {
                routeChange("/");
              }}
            >
              Go Back
            </button>
            <div className="mt-2 container">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row w-full">
                  <div
                    className="w-full sm:w-2/5 sm:pr-16 formdiv"
                    style={{ top: "100%" }}
                  >
                    <div className="row">
                      <h2 className="EventDetails mb-8 mt-6 sm:mt-0">
                        Event Details
                      </h2>
                      <div className="input-group">
                        <h4>Event Name</h4>
                        <input
                          type="text"
                          placeholder="Event Name"
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <h4>Club/Chapter</h4>
                        <input
                          type="text"
                          placeholder="Club/Chapter Name"
                          name="org"
                          onChange={(e) => setOrg(e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <h4>Coordinator's Name</h4>
                        <input
                          type="text"
                          placeholder="Coordinator's Name"
                          name="cname"
                          onChange={(e) => setCname(e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <h4>Email</h4>
                        <input
                          placeholder="Email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <h4>Event Description</h4>
                      <div className="input-icon">
                        <i className="fa fa-user"></i>
                      </div>
                      <div rows="10" cols="58">
                        <textarea
                          placeholder="Event Description"
                          name="desc"
                          id="scroll-bar"
                          className="description w-full px-4 pt-4 resize:none"
                          maxLength="500"
                          onChange={(e) => setDesc(e.target.value)}
                        />
                        <h2 className="text-white text-right">{`${desc.length}/500`}</h2>
                      </div>
                    </div>

                    <div className="col h-16 mb-6">
                      <h4>Label Color </h4>
                      <div className="flex flex-row">
                        <input
                          className="input label-color"
                          type="color"
                          value={backgroundColor}
                          placeholder="Label Color"
                          name="backgroundColor"
                          style={{ height: "60px", width: "50%" }}
                          onChange={(e) => setbackgroundColor(e.target.value)}
                        />
                        <input
                          className="input w-1/2 mt-2"
                          style={{ height: "60px" }}
                          placeholder="#383844"
                          value={backgroundColor}
                          onChange={(e) => setbackgroundColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-full mt-8">
                      <h4>Text Color </h4>
                      <div className="flex flex-row">
                        <input
                          className="input w-1/2 text-color"
                          type="color"
                          placeholder="Text Color"
                          name="textColor"
                          value={textColor}
                          style={{ height: "60px", width: "50%" }}
                          onChange={(e) => setTextColor(e.target.value)}
                        />
                        <input
                          className="input w-1/2 mt-2"
                          style={{ height: "60px" }}
                          placeholder="#ffffff"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-full mt-6">
                      <h4>Start Date and Time</h4>
                      <div>
                        <DatePicker
                          selected={start}
                          onChange={(date) => setStart(date)}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy hh:mm aa"
                          showTimeInput
                          name="start"
                          className="my-2 "
                        />
                      </div>
                    </div>
                    <div className="col-full">
                      <h4>End Date and Time</h4>
                      <div>
                        <div className="col-full">
                          <DatePicker
                            selected={end}
                            onChange={(date) => setEndDate(date)}
                            timeInputLabel="Time:"
                            dateFormat="dd/MM/yyyy hh:mm aa"
                            showTimeInput
                            name="end"
                            minDate={start}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-full mt-6">
                      <h4>Image/GIF URL</h4>
                      <input
                        type="text"
                        placeholder="https://example.com/img.(jpg/gif/png/jpeg)"
                        name="img"
                        onChange={(e) => setImg(e.target.value)}
                      />
                    </div>
                    <div className="col-full mt-6">
                      <h4>Event URL</h4>
                      <input
                        type="text"
                        placeholder="https://example.com/register"
                        name="url"
                        onChange={(e) => setURL(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="invisible sm:visible sm:w-full sm:mt-8 text-white font-bold 
                transition ease-in duration-200 text-center text-base
                focus:outline-none fc-button goback-button whitespace-nowrap submit"
                      // className="w-full inline-flex justify-center mb-11 sm:mb-0 text-white outline-none sm:w-auto sm:text-sm goback-button fc-button"
                    >
                      Submit Event For Approval
                    </button>
                  </div>
                  <div className="flex sm:w-3/5 items-top">
                    <div className="w-full flex-row sm:flex-col">
                      <div className="previewDiv sm:w-1/2">
                      <h2 className="preview mb-8">Preview</h2>
                      <div className="eventprofile mb-8">
                        <EventProfile
                          className="eventprofile-card"
                          todayChecker={true}
                          id="livepreview"
                          img={img}
                          org={org}
                          title={title}
                          start={start}
                          end={end}
                          email={email}
                          desc={desc}
                          url={url}
                          textColor={textColor}
                          backgroundColor={backgroundColor}
                        />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="visible sm:invisible w-full sm:mt-8 text-white font-bold 
                transition ease-in duration-200 text-center text-base
                focus:outline-none fc-button goback-button whitespace-nowrap submit"
                >
                  Submit Event For Approval
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
